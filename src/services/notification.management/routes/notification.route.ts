import express from 'express';
import { notifyADMAndAMOfVolAttempt, notifyAMOfInterventionTask, notifyAMOfPanne } from '../controllers/notification.controller';

const Authorization = require('./../middlewares/auth');

const router = express.Router();


router.post('/notify-adm-am-of-vol-attempt',Authorization(['adm','am']), notifyADMAndAMOfVolAttempt);


router.post('/notify-am-of-panne',Authorization(['am']), notifyAMOfPanne);



router.post('/notify-am-of-intervention-task',Authorization(['am']), notifyAMOfInterventionTask);


export default router;