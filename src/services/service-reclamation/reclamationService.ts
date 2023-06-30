import axios from 'axios';
import  models from '../../models/sequelize';
import sequelize from 'sequelize';

import dotenv from 'dotenv';

dotenv.config();

const ReclamationModel = models.reclamation;
const CommandeModel = models.commande;
const ConsommateurModel = models.consommateur;
const DistributeurModel = models.distributeur;
const ClientModel = models.client;
const utilisateurModel = models.utilisateur;
class ReclamationService {
  // Get all reclamations
  async getAllReclamations() {
    try {

      const reclamations = await ReclamationModel.findAll();
      return reclamations;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to retrieve reclamations');
    }
  }

    // Get all reclamations
    async getAllReclamationsByClient(id: number) {

      try {
      const user = await utilisateurModel.findByPk(id);
      const reclamations = await ReclamationModel.findAll({
        include: [
          {   model: CommandeModel, as:'id_cmd_commande',
              where: { 
              id: sequelize.col('id_cmd_commande.id_cmd') },  
              attributes:[],
              include: [ 
                   { 
                    model:DistributeurModel , 
                    as: 'numero_serie_distributeur_distributeur', 
                    where : {
                       id: sequelize.col('id_cmd_commande.numero_serie_distributeur_distributeur.numero_serie_distributeur') } ,
                    include: [ 
                      { model: ClientModel ,
                         as: 'id_client_client' ,
                         where: { id: sequelize.col('id_cmd_commande.numero_serie_distributeur_distributeur.id_client_client.id_client') 
                         ,id_client : user.id_client }
                          }  ]   
                    , 
                  }  ]
        }
        ]
      })  
       
        return reclamations;
      } catch (error) {
        console.log(error);
        throw new Error('Failed to retrieve reclamations');
      }
    }

  // Get a specific reclamation by ID
  async getReclamation(id: number) {
    try {
      let reclamation = await ReclamationModel.findOne({
        where: { id_reclamation: id },
        include: [
          {
            model: CommandeModel,
            as:'id_cmd_commande',
            include: [
              {
                model: ConsommateurModel,
                as: 'id_consommateur_consommateur',
                where: { id: sequelize.col('id_cmd_commande.id_consommateur') }
              }
            ]
          }
        ]
      });
       reclamation = 
        {...reclamation.dataValues,id_cmd_commande:null , 
          ... reclamation.dataValues.id_cmd_commande.dataValues , id_consommateur_consommateur :null,
            ...reclamation.dataValues.id_cmd_commande.dataValues.id_consommateur_consommateur.dataValues   } ;
       
       
      const result = await ConsommateurModel.findOne({
        where: { id_consommateur: reclamation.id_consommateur },
        attributes: [
          [sequelize.fn('COUNT', sequelize.col('commandes.id_cmd')), 'numberOfCommande'],
          [sequelize.fn('COUNT', sequelize.col('commandes->reclamation.id_reclamation')), 'numberOfReclamation']
        ],
        include: [
          {
            model: CommandeModel,
            as: 'commandes',
            attributes: [] ,
            include: [
              {
                model: ReclamationModel,
                as: 'reclamation',
                attributes: []
              }
            ]
          },
      
        ]
      });
      
      const numberOfCommande =  result.get('numberOfCommande');
      const numberOfReclamation = result.get('numberOfReclamation');

      return { ... reclamation,numberOfCommande,numberOfReclamation };
    } catch (error) {
      
      console.log(error);
      
      throw new Error('Failed to retrieve the reclamation');
    }
  }

  // Create a new reclamation
  async createReclamation(data: any) {
    try {
      const commande = CommandeModel.findByPk(data.id_cmd);
      if (!commande) {
        throw new Error('Commande not found');
      }

      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split('T')[0]; // Get the date part
      const formattedTime = currentDate.toISOString().split('T')[1].slice(0, 8); // Get the time part

      const reclamation = await ReclamationModel.create({...data, date_reclamation: formattedDate, heure_reclamtion: formattedTime });
      return reclamation;
    } catch (error) {
      console.log(error);
      
      throw new Error('Failed to create the reclamation');
    }
  }


  // Delete a reclamation
  async deleteReclamation(id: number) {
    try {
      const reclamation = await ReclamationModel.findByPk(id);
      if (reclamation) {
        await reclamation.destroy();
        return reclamation;
      }
      return null;
    } catch (error) {
      throw new Error('Failed to delete the reclamation');
    }
  }

  async valider (id,data) {
    try {
      const reclamation = await ReclamationModel.findByPk(id);
      console.log(data);
      
      if (reclamation) {
        let description :String;
        let status :String ="avant23";

        if (( reclamation.type_reclamation == 'Commande non reçue' ) || ( reclamation.type_reclamation== 'Commande non complete' )) {
         
          if (data.validate){
        /*    await axios.post(`${process.env.URL}/payment/refund`, {
              paymentId : reclamation.description , amount : data.amount ,reason: reclamation.description
            })
            */
          description = `Bonjour Monsieur/Madame ${data.name} \n votre réclamation a été validée et vous avez récu un remboursement de ${data.amount} DZ`
          status = 'Remboursée';
          }
          else {
          description = `Bonjour Monsieur/Madame ${data.name} \n votre réclamatione n'a pas été validée  `
          status = 'Non-Remboursée';
            
          }

          // send email to the consumer 
        /*  await axios.post(`${process.env.URL}api/notification.management/consumer`,
					{
						email :data.email,
            description:description

					}
				);*/
       
      } 
        else if ( reclamation.type_reclamation == 'Commande insatisfaisante' ) {
          // send email to the consumer 
          /*await axios.post(`${process.env.URL}api/notification.management/consumer`,{
            email :data.email,
            description: data.description
          });*/
           status = 'Traitée Email-Envoyé';

        }

        await reclamation.update({ etat_reclamation: status });
        return reclamation;
      }
      return reclamation;
    }
    catch (error) {
      throw new Error('Failed to validate the reclamation');
    }
  }
}

export default ReclamationService;
