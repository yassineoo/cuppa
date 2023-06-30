import { Request, Response } from 'express';
import ReclamationService from '../reclamationService';

const reclamationService = new ReclamationService();

// Get all reclamations
export const getAllReclamations = async (req: any  , res: Response) => {
  try {
    const id = Number(req.user.id );
    const reclamations = await reclamationService.getAllReclamationsByClient(id);
    res.json(reclamations);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' ,message : error.message });
  }
};

// Get a specific reclamation by ID
export const getReclamation = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const reclamation = await reclamationService.getReclamation(id);
    if (reclamation) {
      res.send(reclamation);
    } else {
      res.status(404).json({ error: 'Reclamation not found' });
    }
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new reclamation
export const createReclamation = async (req: Request, res: Response) => {
  try {
    const data= req.body;
    const newReclamation = await reclamationService.createReclamation(data);
    res.status(201).json(newReclamation);
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a reclamation
export const valider = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = req.body;
    const updatedReclamation = await reclamationService.valider(id, data);
    if (updatedReclamation) {
      res.json(updatedReclamation);
    } else {
      res.status(404).json({ error: 'Reclamation not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a reclamation
export const deleteReclamation = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const deletedReclamation = await reclamationService.deleteReclamation(id);
    if (deletedReclamation) {
      res.json({ message: 'Reclamation deleted successfully' });
    } else {
      res.status(404).json({ error: 'Reclamation not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
