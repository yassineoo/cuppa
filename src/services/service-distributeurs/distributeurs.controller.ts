import { Request, Response } from "express";
import distributeursService from "./distributeurs.service";


const distributeursController = {
    getAll : async(req : Request, res : Response) => {
        try {
            const distributeurs = await distributeursService.getAll()
            res.status(200).json(distributeurs)
        } catch (err : any){
            res.status(500).send('Internal server error')
        }
    },
    getById : async(req : Request, res : Response) => {
        try {
            const distributeur = await distributeursService.getByID(Number(req.params.id))
            if(!distributeur) {
                res.status(404).send("Distributeur not found")
            }
            res.status(200).json(distributeur)
        } catch (err : any){
            console.log(err) //to be logged later 
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
            await distributeursService.delete(Number(req.params.id))
            res.status(200).send(`deleted`)
        } catch (err : any){
            res.status(500).send('Internal server error')
        }
    },
}

export default distributeursController