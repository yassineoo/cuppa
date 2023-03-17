import express, { Request, Response, Router } from "express";
import authorize from "./distributeurs.autorisation";
import distributeursController from "./distributeurs.controller";


const distributeursRouter = express.Router();

//Retrieve the list of les distributeurs 
distributeursRouter.get("/distributeurs", authorize, distributeursController.getAll)

//Retrieve le distributeur ayant l'identifiant id
distributeursRouter.get("/distributeurs/:id", distributeursController.getById)

//Add a new distributeur 
distributeursRouter.post("/distributeurs", distributeursController.create)

//Modify the information du distributeur ayant l'identifiant id
distributeursRouter.put("/distributeurs/:id", distributeursController.updateById)

//Delete le distributeur ayant l'identifiant id
distributeursRouter.delete("/distributeurs/:id", distributeursController.deleteById)


export default distributeursRouter 