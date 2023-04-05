
import boisson from "../../../models/boisson";
import models from "../../../models/sequelize";
import commandesLogic from "./commandes.logic";

  type CommandeModel = typeof models.commande


const commandesService = {
    add :async (info : any) : Promise<Number>=> {
        try  {
            const commande : CommandeModel = await models.commande.create(info)
            return commande.id_cmd 
        } catch(err : any) {
            throw err
        }
    },

    getInstructions :async (id : String) : Promise<any>=> {
        
        try {
            //to test only, later we will be making requests + maybe keep some sort of cache? 

            //join boisson_ing (where id_boisson = id) and ingredient (outil)
            const boisson = await models.boisson.findByPk(id, {
                include: [{
                  model: models.outil,
                  attributes: ['libelle_outil']
                }]
              })

            if(!boisson) {
              throw new Error(`La boisson identifiée par ${id} is not found`)
            }
            else {
              //map the name of the ingredient to the quantite_preparation
              let ingredients = new Map<string, string>()
              boisson.outils.forEach((outil: any) => {
                ingredients.set(outil.libelle_outil, outil.boisson_ing.quantite_preparation);
              });
              
              return commandesLogic.translate(ingredients)
            }

            
        } catch (err : any){
            throw err
        }
    }
}

export default commandesService