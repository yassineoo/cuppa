import express from "express";
import authorize from "../../../middlewares/autorisation";
import maintenaceController from "../controllers/maintenance.controller";


const maintenanceRouter = express.Router();

/** 
@route POST maintenance/pannes
@desc create a new panne
@access any
*/
maintenanceRouter.post("/pannes/", maintenaceController.createPanne)

export default maintenanceRouter 