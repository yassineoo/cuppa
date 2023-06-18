import {Request, Response} from 'express';
import commandesService from '../service/commandes.service';
import commandesLogic from '../service/commandes.logic';
import { error } from 'console';

const commandesController = {
    create :async (req : Request, res : Response) => {
        try {
            const cmd_id = await commandesService.add(req.body)
            res.status(201).json({"cmd_id" : cmd_id})
        } catch (err :any) {
            res.status(500).send(err.message)
            console.log(err.message)
        }
    },

    getInstructions :async (req : Request, res : Response) => {
        try {
            //get translated instructions
            const instructions : string[] = await commandesService.getInstructions(req.params.id)
            //update the state of the order to : payed 

            //return result
            res.status(200).send(instructions)
        } catch (err : any) {
            res.status(500).send(err.message)
        }
    },

	getByID :async (req : Request, res : Response) => {
		try {
			const commande = await commandesService.getByID(req.params.id);
			res.status(201).json(commande);
		} catch (err :any) {
			res.status(500).json(err.message);
		}
	},

	update :async (req : Request, res : Response) => {
		try {
			const commande = await commandesService.update(req.params.id, req.body);
			res.status(201).send(commande);
		} catch (err :any) {
			res.status(500).send(err.message);
		}
	},

	getAll :async (req : Request, res : Response) => {
		try {
			let commandes;
			if(req.user) {
				commandes = await commandesService.getAllByClient(req.user.id);
			} 
			else {
				throw new Error('Authorization required');
			}
            
			res.status(200).json(commandes);
		} catch (err : any){
			res.status(500).send(err.message);
		}
	},

	getByState :async (req : Request, res : Response) => {
		try {
			let commandes;
			if(req.user) {
				commandes = await commandesService.getByState(req.user.id, req.params.etat);
			} 
			else {
				throw new Error('Authorization required');
			}
            
			res.status(200).json(commandes);
		} catch (err : any){
			res.status(500).send(err.message);
		}
	},

	getByPeriod :async (req : Request, res : Response) => {
		try {
			let commandes;
			if(req.user) {
				commandes = await commandesService.getByPeriod(req.user.id, req.params.period, req.params.when);
			} 
			else {
				throw new Error('Authorization required');
			}
            
			res.status(200).json(commandes);
		} catch (err : any){
			res.status(500).send(err.message);
		}
	},
};

export default commandesController; 