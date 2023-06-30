import dotenv from 'dotenv';
import axios, { AxiosResponse } from 'axios';
import distributeursService from './distributeurs.service';

import models from "../../../models/sequelize";

  type DistributeurModel = typeof models.distributeur

dotenv.config()

const distributeursLogic= {
    getOneByClient :async (id : string, user_id : string) : Promise<DistributeurModel>=> {
        try {
            //find client of user
           const response = await axios.get(process.env.URL + `getAccount/${user_id}`) 
           const user_client = response.data.id_client
           
           //distributeurs du client
           const distributeur = await distributeursService.getByID(id)
           if(user_client == distributeur.id_client) {
                return distributeur} else {
                    return null
                }

        }catch (error) {
                console.error(error)
                return null
            }
    },

    getAllByClient :async (user_id : string) : Promise<DistributeurModel[]> => {
        
        try {
            //find client of user
           const response = await axios.get(process.env.URL + `getAccount/${user_id}`) 
           const user_client = response.data.id_client

           //distributeurs du client
           const distributeurs = await distributeursService.getAllByClientID(user_client)
           return distributeurs
        } catch (error) {

            throw error
        }
        
    },
      getAllByClient2 :async (user_client : string) : Promise<DistributeurModel[]> => {
        
        try {
         
           //distributeurs du client
           const distributeurs = await distributeursService.getAllByClientID(user_client)
           return distributeurs
        } catch (error) {
            console.error(error)
            return []
        }
        
    },

    delete : async(id : string) => {
        const distributeur : DistributeurModel = await distributeursService.getByID(id)
        if(!distributeur) {
            throw new Error(`Distributeur with id ${id} does not exist.`);
        } else {
             //un distributeur peut être supprimé seulement s'il n'est pas affecté à aucun client
            if(!distributeur.id_client) {
                distributeursService.delete(distributeur)
            } else {
                throw new Error(`Failed deletion : Distributeur ${id} already belongs to a client`);
            }
        }
       
    },

    updateState :async () => {
        //states : 
         //en cours d'installation 
         //actif 
         //deconnecté 
         //hors service 
    },

    updateClient :async (id_dist : string, info : any) => {
        const distributeur : DistributeurModel = await distributeursService.getByID(id_dist)
        if(!distributeur) {
            throw new Error(`Distributeur with id ${id_dist} does not exist.`);
        } else {
            if(!distributeur.id_client) {
                try{
                   return  distributeursService.update({id_client : info.id_client}, distributeur)
                } catch (error){
                    throw error
                }
            }
            else {
                throw new Error(`Distributeur ${id_dist} already belongs to a client ${distributeur.id_client}`);
            }
        }
    },


    update :async (info : any, num_serie : string, user_id? : string) => {
        let authorized : boolean = true
        console.log("\n \n \n ", user_id)
        const { date_installation_distributeur, localisation_statique_distributeur, etat_distributeur} = info;
        try {
            const distributeur = await distributeursService.getByID(num_serie)

            if(user_id) {
                const response = await axios.get(process.env.URL + `getAccount/${user_id}`) 
                const user_client = response.data.id_client
                if(user_client != distributeur.id_client) {
                    authorized = false
                }
            }

            if(authorized) {
                return  distributeursService.update(
                    {   date_installation_distributeur: date_installation_distributeur ?? distributeur.date_installation_distributeur,
                        localisation_statique_distributeur: localisation_statique_distributeur ?? distributeur.localisation_statique_distributeur,
                        etat_distributeur: etat_distributeur ?? distributeur.etat_distributeur }, 
                    distributeur)
            } else {
                    return null
            }

        } catch(error : any) {
            throw new error (`Failed update : Distributeur ${num_serie}`);
        }
    },




}


export default distributeursLogic