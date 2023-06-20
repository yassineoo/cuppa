import { Router } from 'express';
import { BoissonsController } from '../controllers/boissons.controller';
//import authorize from '../../../middlewares/autorisation';

const router = Router();

router.get('/', BoissonsController.getAll);
router.get('/with', BoissonsController.getAllWithIng);
router.get('/ing', BoissonsController.getAllIngrediants);
router.delete('/:id', BoissonsController.deleteById);
router.post('/', BoissonsController.upload,BoissonsController.add);
router.put('/:id', BoissonsController.upload, BoissonsController.edit);
router.get('/:id', BoissonsController.getById);



export default router;



