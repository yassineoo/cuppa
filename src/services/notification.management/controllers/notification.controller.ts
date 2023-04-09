import { Request, Response } from 'express';
import NotificationManagementService from './../service/notification.management';

const notificationManagementService = new NotificationManagementService();



//Increasing the timeout interval for Jasmine test suite, because the methods take longer than the specified timeout interval to complete
//jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;


export async function notifyADMAndAMOfVolAttempt(req: Request, res: Response): Promise<void> {
  const { distributeurId, description } = req.body;

  try {
    await notificationManagementService.notifyADMAndAMOfVolAttempt(distributeurId, description);
    res.status(200).json({ message: 'Notification sent successfully' });
  } catch (err:any) {
    res.status(500).json({ message: err.message });
  }
}

export async function notifyAMOfPanne(req: Request, res: Response): Promise<void> {
  const { distributeurId, description } = req.body;

  try {
    await notificationManagementService.notifyAMOfPanne(distributeurId, description);
    res.status(200).json({ message: 'Notification sent successfully' });
  } catch (err:any) {
    res.status(500).json({ message: err.message });
  }
}

export async function notifyAMOfInterventionTask(req: Request, res: Response): Promise<void> {
  const { distributeurId, description } = req.body;

  try {
    await notificationManagementService.notifyAMOfInterventionTask(distributeurId, description);
    res.status(200).json({ message: 'Notification sent successfully' });
  } catch (err:any) {
    res.status(500).json({ message: err.message });
  }
}
