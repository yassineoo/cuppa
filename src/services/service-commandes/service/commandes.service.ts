import models from "../../../models/sequelize";
import commandesLogic from "./commandes.logic";

  type CommandeModel = typeof models.commande


const commandesService = {
    add :async (info : any) : Promise<Number>=> {
        try  {
            info.etat_cmd = "intialisée"
            const commande : CommandeModel = await models.commande.create(info)
            return commande.id_cmd 
        } catch(err : any) {
            throw err
        }
    },

    getByID : async(id : string) : Promise<CommandeModel | null> => {
      try {
        const commande = await models.commande.findByPk(Number(id))
        return commande
      } catch(err) {
        throw err
      }
    },


    getInstructions : async function(id : string) : Promise<string> {
        
        try {
            //Get commande 
            const commande : CommandeModel = await this.getByID(id) 
            
            if(!commande) {
              throw new Error(`La commande identifiée par ${id} is not found`)
            }
            
              //to test only, later we will be making requests + maybe keep some sort of cache? 
              //join boisson_ing (where id_boisson = commande.id_boisson) and ingredient (outil)
            const boisson = await models.boisson.findByPk(commande.id_boisson, {
                include: [{
                  model: models.outil,
                  attributes: ['libelle_outil']
                }]
            })

            if(!boisson) {
              throw new Error(`La boisson identifiée par ${commande.id_boisson} is not found`)
            }
              
            //map the name of the ingredient to the quantite_preparation
            let ingredients = new Map<string, string>()
            boisson.outils.forEach((outil: any) => {
              ingredients.set(outil.libelle_outil, outil.boisson_ing.quantite_preparation);
            });

            ingredients.set("sucre", commande.quantite_sucre)
            ingredients.set("taille", commande.taille_goblet)
                
                
            return commandesLogic.translate(ingredients)
              
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

        commande = await commande.update(info)
        return commande

      } catch(err) {

      }
    }


}

export default commandesService