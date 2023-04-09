
import Models from './../../../models/singlton'
//import * as nodemailer from 'nodemailer';



// Initialize the models
const Utilisateur = Models.getUtilisateur();
const Role = Models.getRole();
const Panne = Models.getPanne();
const DetectionVol = Models.getDetectionVol();
const Distributeur = Models.getDistributeur();
const Tache = Models.getTache();


//fcm
const admin = require('firebase-admin');
// Initialize the Firebase app with the service account key
const serviceAccount = require('./../../../../smartbev-backend-firebase-adminsdk-bzrv6-31fb154cc0.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
 });



class NotificationManagementService {
 
  async notifyADMAndAMOfVolAttempt(distributeurId: number, description: string): Promise<void> {
    const distributeur = await Distributeur.findOne({ where: { id_distributeur:distributeurId } });
    const admRole = await Role.findOne({ where: {libelle_role: 'ADM'} });
    const amRole = await Role.findOne({ where: {libelle_role: 'AM'} });

    const admList = await Utilisateur.findAll({ where: { id_role: admRole.id_role } });
    const amList = await Utilisateur.findAll({ where: { id_role: amRole.id_role } });
    

    for (const adm of admList) { 
      const message = {
        notification: {
          title: `Tentative de vol sur le distributeur ${distributeur.numero_serie_distributeur}`,
          body : `Le système a détecté une tentative de vol sur le distributeur ${distributeur.numero_serie_distributeur} situé à ${distributeur.localisation_statique_distributeur}.`,
        },
        token: adm.registration_token
        }

     await this.sendNotification(message);
    }

    for (const am of amList) {
      const message = {
        notification: {
          title: `Tentative de vol sur le distributeur ${distributeur.numero_serie_distributeur}`,
          body : `Le système a détecté une tentative de vol sur le distributeur ${distributeur.numero_serie_distributeur} situé à ${distributeur.localisation_statique_distributeur}.`,
        },
        token: am.registration_token
        }

      await this.sendNotification(message);
    }

    await this.saveDetectionVol(distributeurId,description);
  }

  async notifyAMOfPanne(distributeurId: number, description: string): Promise<void> {
	const distributeur = await Distributeur.findOne({ where: { id_distributeur:distributeurId } });
	const amRole = await Role.findOne({ where: {libelle_role: 'AM'} });
    const amList = await Utilisateur.findAll({ where: { id_role: amRole.id_role } });


    for (const am of amList) {
      const message = {
        notification: {
          title: `Panne sur le distributeur ${distributeur.numero_serie_distributeur}`,
          body : `Le système a détecté une panne sur le distributeur ${distributeur.numero_serie_distributeur} situé à ${distributeur.localisation_statique_distributeur}. Description de la panne : ${description}.`,
        },
        token: am.registration_token
        }

      await this.sendNotification(message);

    }

    await this.savePanne(distributeurId, description);
  }

  async notifyAMOfInterventionTask(distributeurId: number, description: string): Promise<void> {
    const distributeur = await Distributeur.findOne({ where: { id_distributeur:distributeurId } });
	const amRole = await Role.findOne({ where: {libelle_role: 'AM'} });
    const amList = await Utilisateur.findAll({ where: { id_role: amRole.id_role } });

  
    for (const am of amList) {
      const message = {
        notification: {
          title: `Intervention requise sur le distributeur ${distributeur.numero_serie_distributeur}`,
          body : `Le système a détecté une anomalie sur le distributeur ${distributeur.numero_serie_distributeur} situé à ${distributeur.localisation_statique_distributeur}. Description de l'anomalie : ${description}. Veuillez intervenir pour dépanner le distributeur.`,
        },
        token: am.registration_token
        }

      await this.sendNotification(message);
    }

    await this.saveInterventionTask(distributeurId, description);
  }

  async sendNotification(message: any): Promise<void> {

   // The device registration token you want to send the notification to

   //const registrationToken = "dQieF9YRQR21XiAEtyMdEm:APA91bEHss6hz2NvDkU5j-2BLQSafYVGmEaE-glK0tdhDKi4FQToifl38-UE1i4XoImClPIGRrX0wZUKdvLKCQ-MFW0BQWqh3v02glal9KucfYbmhKBID0VTQBfNjxHT0HAsXkbolrcx";



  await admin.messaging().send(message).then((response:any) => {
    console.log('Successfully sent message:', response);
  })
  .catch((error:any) => {
    console.error('Error sending message:', error);
    if (error.code === 'messaging/invalid-registration-token') {
      console.error('Invalid registration token. Check that the token is correct and not expired.');
    }
  });
    
  }


  async saveDetectionVol(distributeurId: number, descriptionVol: string): Promise<void> {
    const detectionVol = Models.getDetectionVol();
    detectionVol.date_vol = new Date();
    detectionVol.heure_vol = detectionVol.date_vol.toLocaleTimeString();
    detectionVol.description_vol = descriptionVol;
    detectionVol.id_distributeur = distributeurId;
	await DetectionVol.create(detectionVol);
}

  async savePanne(distributeurId: number, description: string): Promise<void> {
    const panne = Models.getPanne();
    panne.date_panne = new Date();
	panne.heure_panne = panne.date_panne.toLocaleTimeString();
    panne.description_panne = description;
    panne.id_distributeur = distributeurId;
    await Panne.create(panne);
  }

  
  async saveInterventionTask(distributeurId: number, description: string): Promise<void> {

    // Ici, on peut sauvegarder la tâche dans une table tâche
   
	const tache = Models.getTache();
    tache.description_tache = description;
    await Tache.create(tache);

    console.log(`Tâche d'intervention créée pour le distributeur ${distributeurId} : ${description}`);
  }

}
  
export default NotificationManagementService;