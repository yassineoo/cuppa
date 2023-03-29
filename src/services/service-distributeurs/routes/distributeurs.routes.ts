import express, { Request, Response, Router } from "express";
import authorize from "../middlwares/distributeurs.autorisation";
import distributeursController from "../controllers/distributeurs.controller";


const distributeursRouter = express.Router();

/**
@route GET distributeurs/
@desc retrieve the list of distributeurs
@access ADM, SADM, AC, AM
*/
distributeursRouter.get("/", authorize(['AM', 'ADM', 'SADM', 'AC']), distributeursController.getAll)


/**
@route GET distributeur/:id
@desc retrieve one distributeur
@access ADM, SADM, AC, AM
*/
distributeursRouter.get("/:id",  authorize(['AM', 'ADM', 'SADM', 'AC']), distributeursController.getById)


/**
@route POST distributeurs/
@desc create a new one
@access SADM
*/
distributeursRouter.post("/",  authorize(['SADM']), distributeursController.create)


/**
@route PUT distributeurs/:id/client
@desc affecter le distributeur à un client 
@access SADM
*/
distributeursRouter.put("/:id/client",  authorize(['SADM']), distributeursController.updateClient)


/**
@route PUT distributeurs/:id
@desc changer les informations d'un distributeur
@access SADM, ADM, AM
*/

distributeursRouter.put("/:id",  authorize(['SADM', 'ADM', 'AM']), distributeursController.updateById)

/**
@route DELETE distributeurs/
@desc delete un distributeur
@access SADM
*/
distributeursRouter.delete("/:id", authorize(['SADM']), distributeursController.deleteById)


export default distributeursRouter 