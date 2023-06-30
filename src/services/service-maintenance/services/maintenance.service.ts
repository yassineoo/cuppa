import models from "../../../models/sequelize";
import axios from "axios";

  type panneModel = typeof models.panne
  type tacheModel = typeof models.tache

const maintenanceService = {
    addTask :async (info : any) => {
       try {
        const tache : tacheModel = await models.tache.create(info)
        await axios.post("localhost:8000/api/notification.management/notify-am-of-intervention-task", {
            numero_serie_distributeur : info.numero_serie_distributeur,
            description : info.description_tache,
            etat : info.etat_tache,
        })
        return tache.id_tache
       } catch(err : any) {
        throw err
       }
    },

    addPanne :async (info : any) : Promise<Number>=> {
        try  {
            const panne : panneModel = await models.panne.create(info)

            await axios.post("localhost:8000/api/notification.management/notify-am-of-panne", {
                numero_serie_distributeur : info.numero_serie_distributeur,
                description : info.description_panne,
                etat : info.etat_panne,
                objet : info.objet_panne,
                role : info.id_utilisateur
            })
            return panne.id_panne
        } catch(err : any) {
            throw err
        }
    },

    getTaskByID :async (id : string) : Promise<tacheModel>=> {
        try {
            const task = await models.tache.findByPk(Number(id))
            return task
        } catch (err : any) {
            throw err
        }
    }, 

    getPanneByID :async (id : string) : Promise<panneModel>=> {
        try {
            const panne = await models.panne.findByPk(Number(id))
            return panne
        } catch (err : any) {
            throw err
        }
    }
    
}

export default maintenanceService