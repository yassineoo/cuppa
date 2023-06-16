import express from 'express';
import { notifyADMAndAMOfVolAttempt, notifyAMOfInterventionTask, notifyAMOfPanne, sendBill,notifyReclamationAnswer } from '../controllers/notification.controller';
//import Authorization from './../middlewares/auth';

const router = express.Router();


router.post('/notify-adm-am-of-vol-attempt',notifyADMAndAMOfVolAttempt);


router.post('/notify-am-of-panne',notifyAMOfPanne);


router.post('/notify-am-of-intervention-task',notifyAMOfInterventionTask);


router.post('/sendBill',sendBill);


router.post('/notifyReclamationAnswer',notifyReclamationAnswer);



export default router;