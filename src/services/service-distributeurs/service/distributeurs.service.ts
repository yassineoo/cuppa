import models from "../../../models/sequelize";

  type DistributeurModel = typeof models.distributeur

const distributeursService = {
    getByID : async(id : string) : Promise<DistributeurModel> => {
        const distributeur : DistributeurModel = await models.distributeur.findByPk(id)
       // console.log(`id: ${distributeur.id_distributeur}, serie: ${distributeur.numero_serie_distributeur}`);
        return distributeur
    },


    getAll :async () : Promise<DistributeurModel[]>=> {
        const distributeurs : DistributeurModel[] = await models.distributeur.findAll()
        /*distributeurs.forEach(distributeur => {
            console.log(`id: ${distributeur.id_distributeur}, serie: ${distributeur.numero_serie_distributeur}`);
          });*/
        return distributeurs
    }, 

    getAllByClientID :async (id_client : string) : Promise<DistributeurModel[]> => {
            const distributeurs : DistributeurModel[] = await models.distributeur.findAll({where : {id_client : id_client}})
            
            return distributeurs
        
    },

    add :async (info : any) : Promise<DistributeurModel>=> {
        const distributeur : DistributeurModel = await models.distributeur.create(info)
        //log the new distributeur
        //console.log(`id: ${distributeur.id_distributeur}, serie: ${distributeur.numero_serie_distributeur}`)
        return distributeur
        
        
    }, 
    update : async (info : any, distributeur : DistributeurModel) : Promise<DistributeurModel>=> {

        distributeur = await distributeur.update(info)
        return distributeur

    }, 

    delete :  async(distributeur : DistributeurModel) => {
        await distributeur.destroy();
    }
}

export default distributeursService