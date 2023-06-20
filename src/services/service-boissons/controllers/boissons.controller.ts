
import { Request, Response } from 'express';
import { BoissonsService } from '../service/boissons.service';
import multer from 'multer';

import path from "path";






export class BoissonsController {

 
  

  static async getAll(req: Request, res: Response) {
    try {
      const boissons = await BoissonsService.getAll();
      res.status(200).json( boissons);
    } catch (err) {
      console.error(err);
      
    }
  }
  static async getAllWithIng(req: Request, res: Response) {
    try {
      const boissons = await BoissonsService.getAllWithIng();
      res.status(200).json( boissons);
    } catch (err) {
      console.error(err);
      
    }
  }
  static async getAllIngrediants(req: Request, res: Response) {
    try {
      const boissons = await BoissonsService.getAllIngrediants();
      res.status(200).json( boissons);
    } catch (err) {
      console.error(err);
      
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const boisson = await BoissonsService.getById(id);
      if (boisson) {
        res.status(200).json( boisson );
      } else {
          res.status(404).json( { error:'Boisson non trouvée' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({error: 'Une erreur est survenue lors de la récupération de la boisson' });
    }
  }


  static async deleteById(req: Request, res: Response) {
  
    const id: number = Number(req.params.id);

    try {
      const result = await BoissonsService.deleteById(id);
      if (result) {
        res.status(204).send();
      } else {
        res.status(404).json({  error: "La boisson demandée n'a pas été trouvée." });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({  error: "Une erreur s'est produite lors de la suppression de la boisson." });
    }
  }


 
  static async add(req, res: Response): Promise<void> {
    // handle the uploaded image file using Multer
  
  
      try {
       
        const imagePath = req.file?.path; // the path of the uploaded image
        const boisson_id = await BoissonsService.create(req.body, imagePath);

        res.status(201).json( {"boisson_id": boisson_id} );
      } catch (error) {
        console.error(error);
        res.status(500).json({ error : 'Une erreur est survenue lors de la création de la boisson' });
      }
  
  }
  


    static async edit(req, res: Response): Promise<void> {
      try {
        const id = parseInt(req.params.id);
        const imagePath = req.file?.path; // the path of the uploaded image
        const updatedBoisson = await BoissonsService.update(id, req.body, imagePath);
      
        res.status(200).send();
      } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Une erreur est survenue lors de la modification de la boisson' });
      }
    }

     static storage = multer.diskStorage({
      destination: (req, file, cb) => {
          cb(null, 'images')
      },
      filename: (req, file, cb) => {
          cb(null, Date.now() + path.extname(file.originalname))
      }
    })
    
    static  upload = multer({
      storage: this.storage,
      limits: { fileSize: 100000000 },
      fileFilter: (req, file, cb) => {
          const fileTypes = /jpeg|jpg|png/
          const mimeType = fileTypes.test(file.mimetype)  //check the mimetype of the file
          const extname = fileTypes.test(path.extname(file.originalname)) //
    
          if(mimeType && extname) { 
              return cb(null, true)
          }
          // cb('Give proper files formate to upload')
      }
    }).single('path_image_boisson') //the name in frontend 


}





