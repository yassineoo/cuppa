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
        
    }
}


export default distributeursLogic