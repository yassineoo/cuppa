import express from 'express';
import Authorization from '../../../middlewares/auth';
import commandesController from '../contollers/commandes.controller';

const commandesRouter = express.Router();


//create a new commande
commandesRouter.post('/', commandesController.create);

//get instructions to prepare commande
commandesRouter.get('/:id/instructions',  commandesController.getInstructions);

//get commande info for paiement purposes 
commandesRouter.get('/:id',  commandesController.getByID);


//update commande info
commandesRouter.put('/:id', commandesController.update);


//get list of commandes 
commandesRouter.get('/', Authorization(['AC']), commandesController.getAll);

//get list of commandes par etat
commandesRouter.get('/etat/:etat', Authorization(['AC']), commandesController.getByState);

//get list of commandes in a period of time
commandesRouter.get('/:period/:when' , Authorization(['AC']), commandesController.getByPeriod);





export default commandesRouter
