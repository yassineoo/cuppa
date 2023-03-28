import express, { Request, Response, Router } from "express";
import authorize from "./distributeurs.autorisation";
import distributeursController from "./distributeurs.controller";


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
@route PUT distributeurs/:id/etat
@desc changer l'état d'un distributeur
@access SADM, ADM, AM
*/

distributeursRouter.put("/:id/etat",  authorize(['SADM', 'ADM', 'AM']), distributeursController.updateState)


/**
@route PUT distributeurs/:id/localisation
@desc changer la localisation statique d'un distributeur
@access ADM, AM
*/
//distributeursRouter.put("/:id/localisation",  authorize(['ADM', 'AM']), distributeursController.updateById)


/**
@route PUT distributeurs/:id/installation
@desc changer la data d'installation d'un distributeur
@access SADM, ADM
*/
distributeursRouter.put("/:id/installation",  authorize(['ADM']), distributeursController.updateInstallationDate)


/**
@route delete distributeurs/
@desc delete one distributeur
@access SADM
*/
distributeursRouter.delete("/:id", authorize(['SADM']), distributeursController.deleteById)


export default distributeursRouter 