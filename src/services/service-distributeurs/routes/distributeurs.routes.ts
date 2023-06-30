import express from "express";
import Authorization from "../../../middlewares/auth";
import distributeursController from "../controllers/distributeurs.controller";


const distributeursRouter = express.Router();

/**
@route GET distributeurs/
@desc retrieve the list of distributeurs
@access ADM, SADM, AC, AM
*/
distributeursRouter.get("/", distributeursController.getAll)
/**
@route GET distributeurs by client/
@desc retrieve the list of distributeurs
@access ADM, SADM, AC, AM
*/
distributeursRouter.get("/getAllByClient/:id", distributeursController.getAllByClient)


/**
@route GET distributeur/:id
@desc retrieve one distributeur
@access ADM, SADM, AC, AM
*/
distributeursRouter.get("/:id",  Authorization(['AM', 'ADM', 'SADM', 'AC']), distributeursController.getById)


/**
@route POST distributeurs/
@desc create a new one
@access SADM
*/
distributeursRouter.post("/",  Authorization(['SADM']), distributeursController.create)


/**
@route PUT distributeurs/:id/client
@desc affecter le distributeur à un client 
@access SADM
*/
distributeursRouter.post("/:id/client",  Authorization(['SADM']), distributeursController.updateClient)


/**
@route PUT distributeurs/:id
@desc changer les informations d'un distributeur
@access SADM, ADM, AM
*/

distributeursRouter.post("/:id",  Authorization(['SADM', 'ADM', 'AM']), distributeursController.updateById)

/**
@route DELETE distributeurs/
@desc delete un distributeur
@access SADM
*/
distributeursRouter.post("/delete/:id", Authorization(['SADM']), distributeursController.deleteById)


export default distributeursRouter 