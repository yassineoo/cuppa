"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequilize_1 = __importDefault(require("../config/sequilize"));
const sequelize_1 = require("sequelize");
const client_1 = __importDefault(require("./client"));
const distributeur_1 = __importDefault(require("./distributeur"));
const type_paiement_1 = __importDefault(require("./type_paiement"));
const commande_1 = __importDefault(require("./commande"));
const paiement_1 = __importDefault(require("./paiement"));
const pays_1 = __importDefault(require("./pays"));
const region_1 = __importDefault(require("./region"));
const commune_1 = __importDefault(require("./commune"));
const wilaya_1 = __importDefault(require("./wilaya"));
const boisson_1 = __importDefault(require("./boisson"));
const panne_1 = __importDefault(require("./panne"));
const detection_vol_1 = __importDefault(require("./detection_vol"));
const annoceur_1 = __importDefault(require("./annoceur"));
const annoce_1 = __importDefault(require("./annoce"));
const reclamation_1 = __importDefault(require("./reclamation"));
const preperer_avec_1 = __importDefault(require("./preperer_avec"));
const am_avoir_tache_1 = __importDefault(require("./am_avoir_tache"));
const tache_1 = __importDefault(require("./tache"));
const utilisateur_1 = __importDefault(require("./utilisateur"));
const role_1 = __importDefault(require("./role"));
const profil_1 = __importDefault(require("./profil"));
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
        this.profil = (0, profil_1.default)(sequilize_1.default, sequelize_1.Sequelize);
        this.utilisateur = (0, utilisateur_1.default)(sequilize_1.default, sequelize_1.Sequelize);
        this.role = (0, role_1.default)(sequilize_1.default, sequelize_1.Sequelize);
        this.am_avoir_tache = (0, am_avoir_tache_1.default)(sequilize_1.default, sequelize_1.Sequelize);
        this.distributeur = (0, distributeur_1.default)(sequilize_1.default, sequelize_1.Sequelize);
        this.client = (0, client_1.default)(sequilize_1.default, sequelize_1.Sequelize);
        this.typePaiement = (0, type_paiement_1.default)(sequilize_1.default, sequelize_1.Sequelize);
        this.commande = (0, commande_1.default)(sequilize_1.default, sequelize_1.Sequelize);
        this.paiement = (0, paiement_1.default)(sequilize_1.default, sequelize_1.Sequelize);
        this.pays = (0, pays_1.default)(sequilize_1.default, sequelize_1.Sequelize);
        this.region = (0, region_1.default)(sequilize_1.default, sequelize_1.Sequelize);
        this.commune = (0, commune_1.default)(sequilize_1.default, sequelize_1.Sequelize);
        this.willaya = (0, wilaya_1.default)(sequilize_1.default, sequelize_1.Sequelize);
        this.boissons = (0, boisson_1.default)(sequilize_1.default, sequelize_1.Sequelize);
        this.panne = (0, panne_1.default)(sequilize_1.default, sequelize_1.Sequelize);
        this.detectionVol = (0, detection_vol_1.default)(sequilize_1.default, sequelize_1.Sequelize);
        this.annonceur = (0, annoceur_1.default)(sequilize_1.default, sequelize_1.Sequelize);
        this.annonce = (0, annoce_1.default)(sequilize_1.default, sequelize_1.Sequelize);
        this.reclamation = (0, reclamation_1.default)(sequilize_1.default, sequelize_1.Sequelize);
        this.preparerAvec = (0, preperer_avec_1.default)(sequilize_1.default, sequelize_1.Sequelize);
        this.tache = (0, tache_1.default)(sequilize_1.default, sequelize_1.Sequelize);
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
//# sourceMappingURL=singleton.js.map