var DataTypes = require("sequelize").DataTypes;
var _afficher_dans_region = require("./afficher_dans_region");
var _am_avoir_tache = require("./am_avoir_tache");
var _am_maintenir_distributeur = require("./am_maintenir_distributeur");
var _annoce = require("./annoce");
var _annoceur = require("./annoceur");
var _avoir_parametre = require("./avoir_parametre");
var _boisson = require("./boisson");
var _boisson_ing = require("./boisson_ing");
var _categ_boisson = require("./categ_boisson");
var _categorie = require("./categorie");
var _client = require("./client");
var _commande = require("./commande");
var _commune = require("./commune");
var _consommateur = require("./consommateur");
var _dans_region = require("./dans_region");
var _detection_vol = require("./detection_vol");
var _distributeur = require("./distributeur");
var _outil = require("./outil");
var _paiement = require("./paiement");
var _panne = require("./panne");
var _parametre = require("./parametre");
var _pays = require("./pays");
var _profil = require("./profil");
var _reclamation = require("./reclamation");
var _region = require("./region");
var _region_dynamique = require("./region_dynamique");
var _role = require("./role");
var _tache = require("./tache");
var _type_paiement = require("./type_paiement");
var _utilisateur = require("./utilisateur");
var _wilaya = require("./wilaya");

function initModels(sequelize) {
  var afficher_dans_region = _afficher_dans_region(sequelize, DataTypes);
  var am_avoir_tache = _am_avoir_tache(sequelize, DataTypes);
  var am_maintenir_distributeur = _am_maintenir_distributeur(sequelize, DataTypes);
  var annoce = _annoce(sequelize, DataTypes);
  var annoceur = _annoceur(sequelize, DataTypes);
  var avoir_parametre = _avoir_parametre(sequelize, DataTypes);
  var boisson = _boisson(sequelize, DataTypes);
  var boisson_ing = _boisson_ing(sequelize, DataTypes);
  var categ_boisson = _categ_boisson(sequelize, DataTypes);
  var categorie = _categorie(sequelize, DataTypes);
  var client = _client(sequelize, DataTypes);
  var commande = _commande(sequelize, DataTypes);
  var commune = _commune(sequelize, DataTypes);
  var consommateur = _consommateur(sequelize, DataTypes);
  var dans_region = _dans_region(sequelize, DataTypes);
  var detection_vol = _detection_vol(sequelize, DataTypes);
  var distributeur = _distributeur(sequelize, DataTypes);
  var outil = _outil(sequelize, DataTypes);
  var paiement = _paiement(sequelize, DataTypes);
  var panne = _panne(sequelize, DataTypes);
  var parametre = _parametre(sequelize, DataTypes);
  var pays = _pays(sequelize, DataTypes);
  var profil = _profil(sequelize, DataTypes);
  var reclamation = _reclamation(sequelize, DataTypes);
  var region = _region(sequelize, DataTypes);
  var region_dynamique = _region_dynamique(sequelize, DataTypes);
  var role = _role(sequelize, DataTypes);
  var tache = _tache(sequelize, DataTypes);
  var type_paiement = _type_paiement(sequelize, DataTypes);
  var utilisateur = _utilisateur(sequelize, DataTypes);
  var wilaya = _wilaya(sequelize, DataTypes);


  return {
    afficher_dans_region,
    am_avoir_tache,
    am_maintenir_distributeur,
    annoce,
    annoceur,
    avoir_parametre,
    boisson,
    boisson_ing,
    categ_boisson,
    categorie,
    client,
    commande,
    commune,
    consommateur,
    dans_region,
    detection_vol,
    distributeur,
    outil,
    paiement,
    panne,
    parametre,
    pays,
    profil,
    reclamation,
    region,
    region_dynamique,
    role,
    tache,
    type_paiement,
    utilisateur,
    wilaya,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
