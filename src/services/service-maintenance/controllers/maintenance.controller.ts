
import { Request, Response } from "express";
import maintenanceService from "../services/maintenance.service";
const maintenaceController = {
    createPanne :async (req : Request, res : Response) => {
        try {
            const panne_id = await maintenanceService.addPanne(req.body)
            res.status(201).json({"panne_id" : panne_id})
        } catch (err :any) {
            res.status(500).send(err.message)
        }
    },

    createTache :async (req : Request, res : Response) => {
        try {
            const tache_id = await maintenanceService.addTask(req.body)
            res.status(201).json({"tache_id" : tache_id})
        } catch (err :any) {
            res.status(500).send(err.message)
        }
    },

    getTaskById : async(req : Request, res : Response) => {
        try {
            const task = await maintenanceService.getTaskByID(req.params.id)

            if(!task) {
                throw new Error("Task not found")
            } else  {
                res.status(200).json(task)
            }

        } catch (err : any){
            res.status(500).send(err.message)
        }
    },

    getPanneById : async(req : Request, res : Response) => {
        try {
            const panne = await maintenanceService.getPanneByID(req.params.id)

            if(!panne) {
                throw new Error("Panne not found")
            } else  {
                res.status(200).json(panne)
            }

        } catch (err : any){
            res.status(500).send(err.message)
        }
    },

}

export default maintenaceController
