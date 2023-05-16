import express from "express";
import authorize from "../../../middlewares/autorisation";
import commandesController from "../contollers/commandes.controller";

const commandesRouter = express.Router()


//create a new commande
commandesRouter.post('/', commandesController.create)

//get instructions to prepare commande
commandesRouter.get('/:id/instructions',  commandesController.getInstructions)

//get commande info for paiement purposes 
commandesRouter.get('/:id',  commandesController.getByID)


//update commande info
commandesRouter.put('/:id', commandesController.update)


//get list of commandes 
commandesRouter.get('/', authorize(['AC']), commandesController.getAll)

//get list of commandes par etat
commandesRouter.get('/etat/:etat', authorize(['AC']), commandesController.getByState)

//get list of commandes in a period of time
commandesRouter.get('/:period/:when' , authorize(['AC']), commandesController.getByPeriod)





export default commandesRouter