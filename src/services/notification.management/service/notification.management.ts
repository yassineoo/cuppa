
import Models from './../../../models/singlton'
import * as nodemailer from 'nodemailer';

// Initialize the models
const Utilisateur = Models.getUtilisateur();
const Role = Models.getRole();
const Panne = Models.getPanne();
const DetectionVol = Models.getDetectionVol();
const Distributeur = Models.getDistributeur();
const Tache = Models.getTache();




class NotificationManagementService {
 
  async notifyADMAndAMOfVolAttempt(distributeurId: number, description: string): Promise<void> {
    const distributeur = await Distributeur.findOne({ where: { id_distributeur:distributeurId } });
    const admRole = await Role.findOne({ where: {libelle_role: 'ADM'} });
    const amRole = await Role.findOne({ where: {libelle_role: 'AM'} });

    const admList = await Utilisateur.findAll({ where: { id_role: admRole.id_role } });
    const amList = await Utilisateur.findAll({ where: { id_role: amRole.id_role } });

    const notification = {
      objet: `Tentative de vol sur le distributeur ${distributeur.numero_serie_distributeur}`,
      contenu: `Le système a détecté une tentative de vol sur le distributeur ${distributeur.numero_serie_distributeur} situé à ${distributeur.localisation_statique_distributeur}.`,
    };

    for (const adm of admList) {
      this.sendNotification(adm.mail_utilisateur, notification);
    }

    for (const am of amList) {
      this.sendNotification(am.mail_utilisateur, notification);
    }

    await this.saveDetectionVol(distributeurId,description);
  }

  async notifyAMOfPanne(distributeurId: number, description: string): Promise<void> {
	const distributeur = await Distributeur.findOne({ where: { id_distributeur:distributeurId } });
	const amRole = await Role.findOne({ where: {libelle_role: 'AM'} });
    const amList = await Utilisateur.findAll({ where: { id_role: amRole.id_role } });

    const notification = {
      objet: `Panne sur le distributeur ${distributeur.numero_serie_distributeur}`,
      contenu: `Le système a détecté une panne sur le distributeur ${distributeur.numero_serie_distributeur} situé à ${distributeur.localisation_statique_distributeur}. Description de la panne : ${description}.`,
    };

    for (const am of amList) {
      this.sendNotification(am.mail_utilisateur, notification);
    }

    await this.savePanne(distributeurId, description);
  }

  async notifyAMOfInterventionTask(distributeurId: number, description: string): Promise<void> {
    const distributeur = await Distributeur.findOne({ where: { id_distributeur:distributeurId } });
	const amRole = await Role.findOne({ where: {libelle_role: 'AM'} });
    const amList = await Utilisateur.findAll({ where: { id_role: amRole.id_role } });

    const notification = {
      objet: `Intervention requise sur le distributeur ${distributeur.numero_serie_distributeur}`,
      contenu: `Le système a détecté une anomalie sur le distributeur ${distributeur.numero_serie_distributeur} situé à ${distributeur.localisation_statique_distributeur}. Description de l'anomalie : ${description}. Veuillez intervenir pour dépanner le distributeur.`,
    };

    for (const am of amList) {
      this.sendNotification(am.mail_utilisateur, notification);
    }

    await this.saveInterventionTask(distributeurId, description);
  }

  async sendNotification(destinataire: string, notification: any): Promise<void> {
    // Envoyer la notification par email 
	
    // Ici, on simule l'envoi de la notification en affichant la notification sur la console
	  // Configuration du service SMTP pour l'envoi de mail
	  
	  var transporter = nodemailer.createTransport({
		service:'Gmail',
		auth:{
			user:'aissanyris84@gmail.com',
			pass:'ickcjngahbvaqelh',
		},
		tls: {
			rejectUnauthorized: false
		}

	  });
  
	  
	  // Options du mail à envoyer
	  const mailOptions = {
		from: 'aissanyris84@gmail.com',
		to: destinataire,
		subject: notification.objet,
		text: notification.contenu,
	  };
  
	  // Envoi du mail 
	    transporter.sendMail(mailOptions, function(err) {
		console.log('Message sent!');
	  });
  
    console.log(`Notification envoyée à ${destinataire} :` , notification);
  }


  private async saveDetectionVol(distributeurId: number, descriptionVol: string): Promise<void> {
    const detectionVol = Models.getDetectionVol();
    detectionVol.date_vol = new Date();
    detectionVol.heure_vol = detectionVol.date_vol.toLocaleTimeString();
    detectionVol.description_vol = descriptionVol;
    detectionVol.id_distributeur = distributeurId;
	await DetectionVol.create(detectionVol);
}

  private async savePanne(distributeurId: number, description: string): Promise<void> {
    const panne = Models.getPanne();
    panne.date_panne = new Date();
	panne.heure_panne = panne.date_panne.toLocaleTimeString();
    panne.description_panne = description;
    panne.id_distributeur = distributeurId;
    await Panne.create(panne);
  }

  
  private async saveInterventionTask(distributeurId: number, description: string): Promise<void> {

    // Ici, on peut sauvegarder la tâche dans une table tâche
   
	const tache = Models.getTache();
    tache.description_tache = description;
    await Tache.create(tache);

    console.log(`Tâche d'intervention créée pour le distributeur ${distributeurId} : ${description}`);
  }

}
  
export default NotificationManagementService;