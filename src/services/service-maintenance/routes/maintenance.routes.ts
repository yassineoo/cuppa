import express from "express";
import maintenaceController from "../controllers/maintenance.controller";

import Authorization from '../../../middlewares/auth';

const maintenanceRouter = express.Router();

/** 
@route POST maintenance/pannes
@desc create a new panne
@access any
*/
maintenanceRouter.post("/pannes/", maintenaceController.createPanne)

/** 
@route POST maintenance/taches
@desc create a new task
@access any
*/
maintenanceRouter.post("/taches/", maintenaceController.createTache)

/** 
@route GET maintenance/taches/:id
@desc get a task by id
@access any
*/

maintenanceRouter.get('/taches/:id',  maintenaceController.getTaskById)

/** 
@route GET maintenance/pannes/:id
@desc get a panne by id
@access any
*/

maintenanceRouter.get('/pannes/:id',  maintenaceController.getPanneById)



export default maintenanceRouter 