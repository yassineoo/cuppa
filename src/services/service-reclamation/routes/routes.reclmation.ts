import express from 'express';
import {
  createReclamation,
  getReclamation,
  getAllReclamations,
  valider,
  deleteReclamation
} from '../controllers/reclamation.controller';

const router = express.Router();

// Get all reclamations
router.get('/getAllReclamations', getAllReclamations);


// Get by ID 
router.get('/:id/getReclamation', getReclamation);


// Create a new reclamation
router.post('/createReclamation', createReclamation);

// Update a reclamation
router.post('/reclamations/:id', valider);

// Delete a reclamation
router.post('/reclamations/:id', deleteReclamation);

export default router;
