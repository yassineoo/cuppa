"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelizer_1 = __importDefault(require("../config/sequelizer"));
const sequelize_1 = require("sequelize");
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
    constructor() {
        this.utilisateur = null;
        this.role = null;
        this.profil = null;
        this.ac = null;
        this.am = null;
        this.decideur = null;
        this.distributeur = null;
        this.client = null;
        this.supplement = null;
        this.typePaiement = null;
        this.commande = null;
        this.paiement = null;
        this.pays = null;
        this.region = null;
        this.commune = null;
        this.willaya = null;
        this.ingredient = null;
        this.boissons = null;
        this.facture = null;
        this.panne = null;
        this.detectionVol = null;
        this.annonceur = null;
        this.annonce = null;
        this.reclamation = null;
        this.avoirModel = null;
        this.preparerAvec = null;
        this.tache = null;
        this.am_avoir_tache = null;
        this.profil = profilModel(sequelizer_1.default, sequelize_1.Sequelize);
        this.utilisateur = utilisateurModel(sequelizer_1.default, sequelize_1.Sequelize);
        this.role = roleModel(sequelizer_1.default, sequelize_1.Sequelize);
        this.am_avoir_tache = am_avoir_tacheModel(sequelizer_1.default, sequelize_1.Sequelize);
        this.distributeur = distributeurModel(sequelizer_1.default, sequelize_1.Sequelize);
        //this.client = clientModel(sequelize, Sequelize);
        this.typePaiement = typePaiementModel(sequelizer_1.default, sequelize_1.Sequelize);
        this.commande = commandeModel(sequelizer_1.default, sequelize_1.Sequelize);
        this.paiement = paiementModel(sequelizer_1.default, sequelize_1.Sequelize);
        this.pays = paysModel(sequelizer_1.default, sequelize_1.Sequelize);
        this.region = regionModel(sequelizer_1.default, sequelize_1.Sequelize);
        this.commune = communeModel(sequelizer_1.default, sequelize_1.Sequelize);
        this.willaya = willayaModel(sequelizer_1.default, sequelize_1.Sequelize);
        this.boissons = boissonsModel(sequelizer_1.default, sequelize_1.Sequelize);
        this.panne = panneModel(sequelizer_1.default, sequelize_1.Sequelize);
        this.detectionVol = detectionVolModel(sequelizer_1.default, sequelize_1.Sequelize);
        this.annonceur = annonceurModel(sequelizer_1.default, sequelize_1.Sequelize);
        this.annonce = annonceModel(sequelizer_1.default, sequelize_1.Sequelize);
        this.reclamation = reclamationModel(sequelizer_1.default, sequelize_1.Sequelize);
        this.preparerAvec = preparerAvecModel(sequelizer_1.default, sequelize_1.Sequelize);
        this.tache = tacheModel(sequelizer_1.default, sequelize_1.Sequelize);
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
    getDistributeur() {
        return this.distributeur;
    }
    getClient() {
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
    getReclamation() {
        return this.reclamation;
    }
    getPreparerAvec() {
        return this.preparerAvec;
    }
    getTache() {
        return this.tache;
    }
}
let models = null;
function getModels() {
    if (models === null) {
        models = new Models();
    }
    return models;
}
exports.default = getModels();
//# sourceMappingURL=singlton.js.map