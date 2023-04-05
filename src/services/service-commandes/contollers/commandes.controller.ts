import {Request, Response} from "express"
import commandesService from "../service/commandes.service"

const commandesController = {
    create :async (req : Request, res : Response) => {
        try {
            const cmd_id = await commandesService.add(req.body)
            res.status(201).json({"cmd_id" : cmd_id})
        } catch (err :any) {
            res.status(500).send(err.message)
        }
    },

    getInstructions :async (req : Request, res : Response) => {
        try {
            //get translated instructions
            const instructions : Map<string, string> = await commandesService.getInstructions(req.params.id)
            //update the state of the order to : payed 

            //return result
            res.status(200).send(Object.fromEntries(instructions.entries()))
        } catch (err : any) {
            res.status(500).send(err.message)
        }
    },

    getById :async (req : Request, res : Response) => {
        
    },

    update :async (req : Request, res : Response) => {
        
    },

    getAll :async (req : Request, res : Response) => {
        
    },

    getByState :async (req : Request, res : Response) => {
        
    },

    getByPeriod :async (req : Request, res : Response) => {
        
    },
}

export default commandesController 