import { Request, Response } from 'express';
import NotificationManagementService from './../service/notification.management';

const notificationManagementService = new NotificationManagementService();



//Increasing the timeout interval for Jasmine test suite, because the methods take longer than the specified timeout interval to complete
//jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;


export async function notifyADMAndAMOfVolAttempt(req: Request, res: Response): Promise<void> {
  const { numero_serie_distributeur, description } = req.body;

  try {
    await notificationManagementService.notifyADMAndAMOfVolAttempt(numero_serie_distributeur, description);
    res.status(200).json({ message: 'Notification sent successfully' });
  } catch (err:any) {
    res.status(500).json({ message: err.message });
  }
}

export async function notifyAMOfPanne(req: Request, res: Response): Promise<void> {
  const { numero_serie_distributeur,description,etat,object,role} = req.body;

  try {
    await notificationManagementService.notifyAMOfPanne(numero_serie_distributeur,description,etat,object,role);
    res.status(200).json({ message: 'Notification sent successfully' });
  } catch (err:any) {
    res.status(500).json({ message: err.message });
  }
}

export async function notifyAMOfInterventionTask(req: Request, res: Response): Promise<void> {
  const { numero_serie_distributeur,description,etat} = req.body;

  try {
    await notificationManagementService.notifyAMOfInterventionTask(numero_serie_distributeur ,etat, description);
    res.status(200).json({ message: 'Notification sent successfully' });
  } catch (err:any) {
    res.status(500).json({ message: err.message });
  }
}

export async function sendBill(req: Request, res: Response): Promise<void> {
  const { name, path, email} = req.body;
 
  try {
    await notificationManagementService.sendBill(name, email, path);
    res.status(200).json({ message: 'Bill sent successfully' });
  } catch (err:any) {
    res.status(500).json({ message: err.message });
  }
}

export async function notifyReclamationAnswer(req: Request, res: Response): Promise<void> {
  const {email,description} = req.body;

  try {
    await notificationManagementService.notifyReclamationAnswer(email, description);
    res.status(200).json({ message: 'Response sent successfully' });
  } catch (err:any) {
    res.status(500).json({ message: err.message });
  }
}