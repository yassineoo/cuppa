var DataTypes = require("sequelize").DataTypes;
var _afficher_dans_region = require("./afficher_dans_region");
var _annonce = require("./annonce");
var _annonceur = require("./annonceur");
var _boisson = require("./boisson");
var _categorie = require("./categorie");
var _client = require("./client");
var _commande = require("./commande");
var _commune = require("./commune");
var _consommateur = require("./consommateur");
var _dans_region = require("./dans_region");
var _detection_vol = require("./detection_vol");
var _distributeur = require("./distributeur");
var _outils_preparation_boisson = require("./outils_preparation_boisson");
var _paiement = require("./paiement");
var _panne = require("./panne");
var _pays = require("./pays");
var _preparer_avec = require("./preparer_avec");
var _profil = require("./profil");
var _reclamation = require("./reclamation");
var _region = require("./region");
var _region_dynamique = require("./region_dynamique");
var _role = require("./role");
var _tache = require("./tache");
var _utilisateur = require("./utilisateur");
var _wilaya = require("./wilaya");

function initModels(sequelize) {
  var afficher_dans_region = _afficher_dans_region(sequelize, DataTypes);
  var annonce = _annonce(sequelize, DataTypes);
  var annonceur = _annonceur(sequelize, DataTypes);
  var boisson = _boisson(sequelize, DataTypes);
  var categorie = _categorie(sequelize, DataTypes);
  var client = _client(sequelize, DataTypes);
  var commande = _commande(sequelize, DataTypes);
  var commune = _commune(sequelize, DataTypes);
  var consommateur = _consommateur(sequelize, DataTypes);
  var dans_region = _dans_region(sequelize, DataTypes);
  var detection_vol = _detection_vol(sequelize, DataTypes);
  var distributeur = _distributeur(sequelize, DataTypes);
  var outils_preparation_boisson = _outils_preparation_boisson(sequelize, DataTypes);
  var paiement = _paiement(sequelize, DataTypes);
  var panne = _panne(sequelize, DataTypes);
  var pays = _pays(sequelize, DataTypes);
  var preparer_avec = _preparer_avec(sequelize, DataTypes);
  var profil = _profil(sequelize, DataTypes);
  var reclamation = _reclamation(sequelize, DataTypes);
  var region = _region(sequelize, DataTypes);
  var region_dynamique = _region_dynamique(sequelize, DataTypes);
  var role = _role(sequelize, DataTypes);
  var tache = _tache(sequelize, DataTypes);
  var utilisateur = _utilisateur(sequelize, DataTypes);
  var wilaya = _wilaya(sequelize, DataTypes);

  preparer_avec.belongsTo(outils_preparation_boisson, { foreignKey: 'id_ingredient' });
  outils_preparation_boisson.hasMany(preparer_avec, { foreignKey: 'id_ingredient' });

  return {
    afficher_dans_region,
    annonce,
    annonceur,
    boisson,
    categorie,
    client,
    commande,
    commune,
    consommateur,
    dans_region,
    detection_vol,
    distributeur,
    outils_preparation_boisson,
    paiement,
    panne,
    pays,
    preparer_avec,
    profil,
    reclamation,
    region,
    region_dynamique,
    role,
    tache,
    utilisateur,
    wilaya,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
