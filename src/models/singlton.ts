import sequelize from '../config/sequelizer';
import { Sequelize } from 'sequelize';


const clientModel = require('./client.js');
const distributeurModel = require('./distributeur.js');

const typePaiementModel = require('./type_paiement.js');
const commandeModel = require('./commande.js');
const paiementModel = require('./paiement.js');
const paysModel = require('./pays.js');
const regionModel = require('./region.js');
const communeModel = require('./commune.js');
const willayaModel = require('./wilaya.js');

const boissonsModel = require('./boisson.js');

const panneModel = require('./panne.js');
const detectionVolModel = require('./detection_vol.js');
const annonceurModel = require('./annoceur.js');
const annonceModel = require('./annoce.js');
const reclamationModel = require('./reclamation.js');

const preparerAvecModel = require('./preperer_avec.js');
const am_avoir_tacheModel = require('./am_avoir_tache.js');


const tacheModel = require('./tache.js');
const utilisateurModel = require('./utilisateur.js');
const roleModel = require('./role.js');
const profilModel = require('./profil.js');


class Models {
private utilisateur :any=null;
private role:any=null;
private profil:any=null;
private ac: any = null;
private am: any = null;
private decideur: any = null;
private distributeur: any = null;
private client: any = null;
private supplement: any = null;
private typePaiement: any = null;
private commande: any = null;
private paiement: any = null;
private pays: any = null;
private region: any = null;
private commune: any = null;
private willaya: any = null;
private ingredient: any = null;
private boissons: any = null;
private facture: any = null;
private panne: any = null;
private detectionVol: any = null;
private annonceur: any = null;
private annonce: any = null;
private reclamation: any = null;
private avoirModel: any = null;
private preparerAvec: any = null;
private tache: any = null;
private am_avoir_tache: any = null;

	constructor() {
    this.profil = profilModel(sequelize, Sequelize);
	this.utilisateur = utilisateurModel(sequelize, Sequelize);
	this.role = roleModel(sequelize, Sequelize);

	this.am_avoir_tache = am_avoir_tacheModel(sequelize, Sequelize);

	this.distributeur = distributeurModel(sequelize, Sequelize);
	this.client = clientModel(sequelize, Sequelize);
	this.typePaiement = typePaiementModel(sequelize, Sequelize);
	this.commande = commandeModel(sequelize, Sequelize);
	this.paiement = paiementModel(sequelize, Sequelize);
	this.pays = paysModel(sequelize, Sequelize);
	this.region = regionModel(sequelize, Sequelize);
	this.commune = communeModel(sequelize, Sequelize);
	this.willaya = willayaModel(sequelize, Sequelize);

	this.boissons = boissonsModel(sequelize, Sequelize);

	this.panne = panneModel(sequelize, Sequelize);
	this.detectionVol = detectionVolModel(sequelize, Sequelize);
	this.annonceur = annonceurModel(sequelize, Sequelize);
	this.annonce = annonceModel(sequelize, Sequelize);
    this.reclamation=reclamationModel(sequelize, Sequelize);

	this.preparerAvec=preparerAvecModel(sequelize, Sequelize);
	this.tache=tacheModel(sequelize, Sequelize);
	}

	getProfil() {
		return this.profil;
	}

	getUtilisateur() {
		return this.utilisateur;
	}

	getRole() {
		return this.role;
	}


	getAm_avoir_tache() {
     return this.am_avoir_tache;
	}

	
	getDistributeur () {

		return this.distributeur;
	
	}
	getClient () {

		return this.client;
	
	}


getTypePaiement() {

	return this.typePaiement;

}

getCommande() {

	return this.commande;

}

getPaiement() {

	return this.paiement;

}

getPays() {

	return this.pays;

}

getRegion() {

	return this.region;

}

getCommune() {

	return this.commune;

}

getWillaya() {

	return this.willaya;

}


getBoissons() {

	return this.boissons;

}



getPanne() {

	return this.panne;

}

getDetectionVol() {

	return this.detectionVol;

}

getAnnonceur() {

	return this.annonceur;

}

getAnnonce() {

	return this.annonce;

}

getReclamation(){

	return this.reclamation;
}


getPreparerAvec(){

	return this.preparerAvec;
}

getTache() {

	return this.tache;

}
}

let models: Models | null = null;

function getModels(): Models {

	if (models === null) {

		models = new Models();
	
	}
	return models;

}

export default getModels();
