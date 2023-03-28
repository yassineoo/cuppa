import dotenv from 'dotenv';
import axios, { AxiosResponse } from 'axios';
import distributeursService from './distributeurs.service';

import models from "../../models/sequelize";

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
        
    },

    updateClient :async (id_dist : string, info : string) => {
        const distributeur : DistributeurModel = await distributeursService.getByID(id_dist)
        if(!distributeur) {
            throw new Error(`Distributeur with id ${id_dist} does not exist.`);
        } else {
            if(!distributeur.id_client) {
                try{
                   return  distributeursService.update(info, distributeur)
                } catch (err : any ){
                    throw new Error(err.message)
                }
            }
            else {
                throw new Error(`Distributeur ${id_dist} already belongs to a client ${distributeur.id_client}`);
            }
        }
    },

    updateInstallationDate:async (id : string, user_id: string, info : any) => {
        try {
            //find client of user
           const response = await axios.get(process.env.URL + `getAccount/${user_id}`) 
           const user_client = response.data.id_client

           const distributeur = await distributeursService.getByID(id)
           if(user_client == distributeur.id_client) {
                    return  distributeursService.update(info, distributeur)
            } else {
                    return null
            }
        
        } catch (error : any) {
            throw new Error(error.message)
        }
        
        
    }
}


export default distributeursLogic