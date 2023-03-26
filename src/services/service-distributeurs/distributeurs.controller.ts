import { Request, response, Response } from "express";
import distributeursService from "./distributeurs.service";

import distributeursLogic from "./distributeurs.logic";




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
            res.status(500).send('Internal server error')
        }
    },
    getById : async(req : Request, res : Response) => {
        try {
            let distributeur;    
            if(!req.user) {
                //return all 
                distributeur = await distributeursService.getByID(req.params.id)
                res.status(200).json(distributeur)
            } else {
                distributeur = await distributeursLogic.getOneByClient(req.params.id, req.user.id)
 
            }

            if(!distributeur) {
                res.status(404).send("Distributeur not found")
            } res.status(200).json(distributeur)

        } catch (err : any){
            console.log(err) 
            res.status(500).send('Internal server error')
        }
    },

    create : async(req : Request, res : Response) => {
        try {
            console.log(req.body)
            const distributeur = await distributeursService.add(req.body)
            console.log("no error babe")
            res.status(201).json(distributeur)
        } catch (err : any){
            res.status(500).send('Internal server error')
        }
    },
    updateById : async(req : Request, res : Response) => {
        try {
            const distributeur = await distributeursService.update(req.body, Number(req.params.id))
            res.status(201).json(distributeur)
        } catch (err : any){
            res.status(500).send('Internal server error')
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