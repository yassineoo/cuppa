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
@route PUT distributeurs/:id
@desc update one distributeur
@access ADM, SADM, AC, AM
*/
distributeursRouter.put("/:id",  authorize(['AM', 'ADM', 'SADM', 'AC']), distributeursController.updateById)


/**
@route delete distributeurs/
@desc delete one distributeur
@access SADM
*/
distributeursRouter.delete("/:id", authorize(['SADM']), distributeursController.deleteById)


export default distributeursRouter 