
import Models from './../../../models/sequelize'
import * as nodemailer from 'nodemailer';



// Initialize the models
const Utilisateur = Models.utilisateur;
const Role = Models.role;
const Panne = Models.panne;
const DetectionVol = Models.detection_vol;
const Distributeur = Models.distributeur;
const Tache = Models.tache;


//fcm
const admin = require('firebase-admin');
// Initialize the Firebase app with the service account key
const serviceAccount = require('./../../../../smartbev-backend-firebase-adminsdk-bzrv6-31fb154cc0.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
 });



class NotificationManagementService {
 
  async notifyADMAndAMOfVolAttempt(numero_serie_distributeur : string, description: string): Promise<void> {
    const distributeur = await Distributeur.findOne({ where: { numero_serie_distributeur:numero_serie_distributeur } });
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
        token: adm.regestration_token
        }

     await this.sendNotification(message);
    }

    for (const am of amList) {
      const message = {
        notification: {
          title: `Tentative de vol sur le distributeur ${distributeur.numero_serie_distributeur}`,
          body : `Le système a détecté une tentative de vol sur le distributeur ${distributeur.numero_serie_distributeur} situé à ${distributeur.localisation_statique_distributeur}.`,
        },
        token: am.regestration_token
        }

      await this.sendNotification(message);
    }

    await this.saveDetectionVol(numero_serie_distributeur,description);
  }

  async notifyAMOfPanne(numero_serie_distributeur : string, description: string,etat:string,object:string,role:string): Promise<void> {
	const distributeur = await Distributeur.findOne({ where: { numero_serie_distributeur:numero_serie_distributeur  } });
	const amRole = await Role.findOne({ where: {libelle_role: 'AM'} });
    const amList = await Utilisateur.findAll({ where: { id_role: amRole.id_role } });


    for (const am of amList) {
      const message = {
        notification: {
          title: `Panne sur le distributeur ${distributeur.numero_serie_distributeur}`,
          body : `Le système a détecté une panne sur le distributeur ${distributeur.numero_serie_distributeur} situé à ${distributeur.localisation_statique_distributeur}. Description de la panne : ${description}.`,
        },
        token: am.regestration_token
        }

      await this.sendNotification(message);

    }

    await this.savePanne(numero_serie_distributeur, description,etat,object,role);
  }

  async notifyAMOfInterventionTask(numero_serie_distributeur : string, etat:string,description: string): Promise<void> {
    const distributeur = await Distributeur.findOne({ where: { numero_serie_distributeur:numero_serie_distributeur  } });
	const amRole = await Role.findOne({ where: {libelle_role: 'AM'} });
    const amList = await Utilisateur.findAll({ where: { id_role: amRole.id_role } });

  
    for (const am of amList) {
      const message = {
        notification: {
          title: `Intervention requise sur le distributeur ${distributeur.numero_serie_distributeur}`,
          body : `Le système a détecté une anomalie sur le distributeur ${distributeur.numero_serie_distributeur} situé à ${distributeur.localisation_statique_distributeur}. Description de l'anomalie : ${description}. Veuillez intervenir pour dépanner le distributeur.`,
        },
        token: am.regestration_token
        }

      await this.sendNotification(message);
    }

    //await this.saveInterventionTask(numero_serie_distributeur,etat,description);
  }

  async sendNotification(message: any): Promise<void> {

   // The device registration token you want to send the notification to

   //const regestration_token = "dQieF9YRQR21XiAEtyMdEm:APA91bEHss6hz2NvDkU5j-2BLQSafYVGmEaE-glK0tdhDKi4FQToifl38-UE1i4XoImClPIGRrX0wZUKdvLKCQ-MFW0BQWqh3v02glal9KucfYbmhKBID0VTQBfNjxHT0HAsXkbolrcx";



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


  async saveDetectionVol(numero_serie_distributeur : string, descriptionVol: string): Promise<void> {
    const detectionVol = Models.detection_vol;
    detectionVol.date_vol = new Date();
    detectionVol.heure_vol = detectionVol.date_vol.toLocaleTimeString();
    detectionVol.description_vol = descriptionVol;
    detectionVol.numero_serie_distributeur = numero_serie_distributeur ;
	await DetectionVol.create(detectionVol);
}

  async savePanne(numero_serie_distributeur : string, description: string,etat:string,object:string,role:string): Promise<void> {
    const panne = Models.panne;
    panne.etat_panne = etat;
    panne.objet_panne = object;
    panne.libelle_role = role;
    panne.date_panne = new Date();
  	panne.heure_panne = panne.date_panne.toLocaleTimeString();
    panne.description_panne = description;
    panne.numero_serie_distributeur = numero_serie_distributeur;
    await Panne.create(panne);
  }

  
  async saveInterventionTask(numero_serie_distributeur : string, etat:string,description: string): Promise<void> {

    // Ici, on peut sauvegarder la tâche dans une table tâche
   
	  const tache = Models.tache;
    tache.description_tache = description;
    tache.etat_tache = etat;
    await Tache.create(tache);

    console.log(`Tâche d'intervention créée pour le distributeur ${numero_serie_distributeur } : ${description}`);
  }



  async sendBill(name: string, email: string, path: string): Promise<void> {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port:587,
      secure:false,
		  auth:{
			  user:'aissanyris84',
			  pass:'fluccvroupxcmrdv',
		  },
		  tls: {
		  	rejectUnauthorized: true
		  }
    });
  
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: 'aissanyris84',// sender mail
      to: email, // list of receivers
      subject: "Your Bill", // Subject line
      html: `
        <p>Dear ${name},</p>
        <p>Please find attached your bill.</p>
        <p>Thank you for your business.</p>
      `, // HTML body
      attachments: [
        {
          filename: "bill.pdf",
          path: path,
        },
      ],
    });
  
    console.log(`Message sent: ${info.messageId}`);
  }
  

  async notifyReclamationAnswer(email: string, description: string): Promise<void> {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port:587,
      secure:false,
		  auth:{
			  user:'aissanyris84',
			  pass:'fluccvroupxcmrdv',
		  },
		  tls: {
		  	rejectUnauthorized: true
		  }
    });
  
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: 'aissanyris84',// sender mail
      to: email, // list of receivers
      subject: "Reclamation response", // Subject line
      html: `
        <p>${description}</p>
      `, // HTML body
    });
  
    console.log(`Message sent: ${info.messageId}`);
  }
}
  
export default NotificationManagementService;