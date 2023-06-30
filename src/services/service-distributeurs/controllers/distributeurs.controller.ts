import { Request, response, Response } from "express";
import distributeursService from "../service/distributeurs.service";

import distributeursLogic from "../service/distributeurs.logic";




const distributeursController = {
    
    getAll : async(req : Request, res : Response) => {
        try {
            let distributeurs;
            if(!req.user) {
                //it's SADM
                
                distributeurs = await distributeursService.getAll()
                
            } else {
                //console.log(req.user)
                distributeurs = await distributeursLogic.getAllByClient(req.user.id)
            }

            res.status(200).json(distributeurs)
        } catch (err : any){
            res.status(500).json(err)
        }
    },

    getAllByClient : async(req : Request, res : Response) => {
        try {
            let distributeurs;
                 const id = req.params.id
                //console.log(req.user)
                distributeurs = await distributeursLogic.getAllByClient2(id)
            

            res.status(200).json(distributeurs)
        } catch (err : any){
            res.status(500).json(err)
        }
    },
    
    getById : async(req : Request, res : Response) => {
        try {
            let distributeur;    
            if(!req.user) {
                //return all 
                distributeur = await distributeursService.getByID(req.params.id)
            } else {
                distributeur = await distributeursLogic.getOneByClient(req.params.id, req.user.id)
 
            }

            if(!distributeur) {
                res.status(404).send("Distributeur not found")
            } else  {
                res.status(200).json(distributeur)
            }

        } catch (err : any){
            res.status(500).send(err.message)
        }
    },



    create : async(req : Request, res : Response) => {
        try {
            console.log(req.body)
            const distributeur = await distributeursService.add(req.body)
            res.status(201).json(distributeur)
        } catch (err : any){
            res.status(500).send(err.message)
        }
    },

    updateById : async(req : Request, res : Response) => {
        
        try {
            let user_id :string = ""
            if(req.body.id) {
                user_id = req.body.id
            }
           const  distributeur = await distributeursLogic.update(req.body, req.params.id, user_id) 
            res.status(201).json(distributeur)

        } catch (err : any){
            res.status(500).send(err.message)
        }
    },

    updateClient : async(req : Request, res : Response) => {
        try {
            const distributeur = await distributeursLogic.updateClient(req.params.id, req.body)
            res.status(201).json(distributeur)
        } catch(err : any) {
            res.status(500).send("Erreur de mise à jour : " + err.message)
        }
    },


    deleteById : async(req : Request, res : Response) => {
        try {
            await distributeursLogic.delete(req.params.id)
            res.status(200).send(`deleted`)
        } catch (error : any){
            res.status(500).send(error.message)
        }
    },
}

export default distributeursController