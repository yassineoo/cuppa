import express from 'express';
import {
  createReclamation,
  getReclamation,
  getAllReclamations,
  valider,
  deleteReclamation
} from '../controllers/reclamation.Controller';
import Authorization from '../../../middlewares/auth';
const router = express.Router();

// Get all reclamations
router.get('/getAllReclamations',Authorization(['AC']), getAllReclamations);


// Get by ID 
router.get('/:id/getReclamation',Authorization(['AC']), getReclamation);


// Create a new reclamation
router.post('/createReclamation', createReclamation);

// Update a reclamation
router.post('/reclamations/:id', valider);


export default router;
