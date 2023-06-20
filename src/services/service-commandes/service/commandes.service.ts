
import boisson from "../../../models/boisson";
import models from "../../../models/sequelize";
import commandesLogic from "./commandes.logic";

  type CommandeModel = typeof models.commande;
  type BoissonModel = typeof models.boisson;


const commandesService = {
    add :async (info : any) : Promise<Number>=> {
        try  {
            info.etat_cmd = "initialisée"
            const commande : CommandeModel = await models.commande.create(info)
            return commande.id_cmd 
        } catch(err : any) {
            throw err
        }
        
    },

    getByID : async(id : string) : Promise<CommandeModel | null> => {
      try {
        const commande = await models.commande.findOne({
          where : {id_cmd :Number(id)} ,
          include : { 
            model : models.boisson ,
            as : "id_boisson_boisson"
          }
        })
        
        const y = {...commande.toJSON(),libelle_boisson:commande.id_boisson_boisson.libelle_boisson,path_image_boisson:commande.id_boisson_boisson.path_image_boisson}    
        return y ;
      } catch(err) {
        throw err
      }
    },


    getInstructions : async function(id : string) : Promise<string[]> {
        
        try {
            //Get commande 
            const commande : CommandeModel = await this.getByID(id) 
            
            if(!commande) {
              throw new Error(`La commande identifiée par ${id} is not found`)
            }

            const sucre = commande.quantite_sucre;
            const size = commande.taille_goblet;
            
            

            const ingredients : any[] = await models.preparer_avec.findAll({
              where : {
                id_boisson : commande.id_boisson
              }, 
              include : [{
                  model : models.outils_preparation_boisson,
                  as : "id_ingredient_outils_preparation_boisson",
                  attributes: ['libelle_ingredient']
                }], 
                attributes : ['quantite_preparation']
            })
            
            if(ingredients.length !== 0) {
              let instructions = new Map<string, string>()
              ingredients.forEach((ingredient : any) => {
                const quantity = ingredient.quantite_preparation;
                console.log(ingredient);
                const toolLabel = ingredient?. id_ingredient_outils_preparation_boisson?.libelle_ingredient;
                instructions.set(toolLabel, quantity);
                
              });
             // console.log(ingrediants);
              


              return commandesLogic.translate(instructions, sucre, size)
  
            } else {
              throw new Error(`empty instructions for boisson ${commande.id_boisson}`)
            }
        } catch (err : any){
            throw err
        }
    },

    update : async function(id : string, info : any) : Promise<CommandeModel> {
      try {
        let commande : CommandeModel = await this.getByID(id) 
            
        if(!commande) {
          throw new Error(`La commande identifiée par ${id} is not found`)
        }

      /*  commande = await models.commande.update(info)
        let commandes = commandes.map(commande => {
          return {...commande , 

          }
        })
        */
        return commande

      } catch(err) {
        throw err
      }
    },

    getAllByClient :async (id : string) => {
      try {
        //find client of user
        const user = await models.utilisateur.findByPk(id)
        if(!user) {
          throw new Error("User doesn't exist")
        }    
        const commandes : CommandeModel[] = await models.commande.findAll({
          include: [
            {
              model: models.distributeur,
              where : {id_client : user.id_client}
            }
          ],
        });
        return commandes

      } catch (error) {
          throw error
      }
    }, 

    getByState :async (id : string, etat : string) => {
        try {
          //find client of user
          const user = await models.utilisateur.findByPk(id)
          if(!user) {
            throw new Error("User doesn't exist")
          }    
        
          const commandes : CommandeModel[] = await models.commande.findAll({
            where: {
              etat_cmd: etat
            },
            include: [
              {
                model: models.distributeur,
                where : {id_client : user.id_client}
              }
            ],
          });
          return commandes

        } catch (error) {
            throw error
        }
      }, 
      getByPeriod :async (id: string, period : string, when : string) => {

      }
    }


export default commandesService