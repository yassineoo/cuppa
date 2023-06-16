
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
    }
}

export default maintenaceController
