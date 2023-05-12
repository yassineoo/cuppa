var DataTypes = require("sequelize").DataTypes;
var _annoce = require("./annoce");
var _annoceur = require("./annoceur");
var _boisson = require("./boisson");
var _categ_boisson = require("./categ_boisson");
var _categorie = require("./categorie");
var _client = require("./client");
var _commande = require("./commande");
var _commune = require("./commune");
var _consommateur = require("./consommateur");
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
  var annoce = _annoce(sequelize, DataTypes);
  var annoceur = _annoceur(sequelize, DataTypes);
  var boisson = _boisson(sequelize, DataTypes);
  var categ_boisson = _categ_boisson(sequelize, DataTypes);
  var categorie = _categorie(sequelize, DataTypes);
  var client = _client(sequelize, DataTypes);
  var commande = _commande(sequelize, DataTypes);
  var commune = _commune(sequelize, DataTypes);
  var consommateur = _consommateur(sequelize, DataTypes);
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

  boisson.belongsToMany(categorie, { as: 'id_categorie_categories', through: categ_boisson, foreignKey: "id_boisson", otherKey: "id_categorie" });
  categorie.belongsToMany(boisson, { as: 'id_boisson_boissons', through: categ_boisson, foreignKey: "id_categorie", otherKey: "id_boisson" });
  annoce.belongsTo(annoceur, { as: "id_annonceur_annoceur", foreignKey: "id_annonceur"});
  annoceur.hasMany(annoce, { as: "annoces", foreignKey: "id_annonceur"});
  categ_boisson.belongsTo(boisson, { as: "id_boisson_boisson", foreignKey: "id_boisson"});
  boisson.hasMany(categ_boisson, { as: "categ_boissons", foreignKey: "id_boisson"});
  commande.belongsTo(boisson, { as: "id_boisson_boisson", foreignKey: "id_boisson"});
  boisson.hasMany(commande, { as: "commandes", foreignKey: "id_boisson"});
  categ_boisson.belongsTo(categorie, { as: "id_categorie_categorie", foreignKey: "id_categorie"});
  categorie.hasMany(categ_boisson, { as: "categ_boissons", foreignKey: "id_categorie"});
  boisson.belongsTo(client, { as: "id_client_client", foreignKey: "id_client"});
  client.hasMany(boisson, { as: "boissons", foreignKey: "id_client"});
  distributeur.belongsTo(client, { as: "id_client_client", foreignKey: "id_client"});
  client.hasMany(distributeur, { as: "distributeurs", foreignKey: "id_client"});
  utilisateur.belongsTo(client, { as: "id_client_client", foreignKey: "id_client"});
  client.hasMany(utilisateur, { as: "utilisateurs", foreignKey: "id_client"});
  paiement.belongsTo(commande, { as: "id_cmd_commande", foreignKey: "id_cmd"});
  commande.hasOne(paiement, { as: "paiement", foreignKey: "id_cmd"});
  reclamation.belongsTo(commande, { as: "id_cmd_commande", foreignKey: "id_cmd"});
  commande.hasOne(reclamation, { as: "reclamation", foreignKey: "id_cmd"});
  region.belongsTo(commune, { as: "id_commune_commune", foreignKey: "id_commune"});
  commune.hasMany(region, { as: "regions", foreignKey: "id_commune"});
  commande.belongsTo(consommateur, { as: "id_consommateur_consommateur", foreignKey: "id_consommateur"});
  consommateur.hasMany(commande, { as: "commandes", foreignKey: "id_consommateur"});
  commande.belongsTo(distributeur, { as: "numero_serie_distributeur_distributeur", foreignKey: "numero_serie_distributeur"});
  distributeur.hasMany(commande, { as: "commandes", foreignKey: "numero_serie_distributeur"});
  detection_vol.belongsTo(distributeur, { as: "numero_serie_distributeur_distributeur", foreignKey: "numero_serie_distributeur"});
  distributeur.hasMany(detection_vol, { as: "detection_vols", foreignKey: "numero_serie_distributeur"});
  panne.belongsTo(distributeur, { as: "numero_serie_distributeur_distributeur", foreignKey: "numero_serie_distributeur"});
  distributeur.hasMany(panne, { as: "pannes", foreignKey: "numero_serie_distributeur"});
  wilaya.belongsTo(pays, { as: "id_pays_pay", foreignKey: "id_pays"});
  pays.hasMany(wilaya, { as: "wilayas", foreignKey: "id_pays"});
  utilisateur.belongsTo(role, { as: "id_role_role", foreignKey: "id_role"});
  role.hasMany(utilisateur, { as: "utilisateurs", foreignKey: "id_role"});
  paiement.belongsTo(type_paiement, { as: "id_type_paiement_type_paiement", foreignKey: "id_type_paiement"});
  type_paiement.hasMany(paiement, { as: "paiements", foreignKey: "id_type_paiement"});
  panne.belongsTo(utilisateur, { as: "id_utilisateur_utilisateur", foreignKey: "id_utilisateur"});
  utilisateur.hasMany(panne, { as: "pannes", foreignKey: "id_utilisateur"});
  profil.belongsTo(utilisateur, { as: "id_utilisateur_utilisateur", foreignKey: "id_utilisateur"});
  utilisateur.hasOne(profil, { as: "profil", foreignKey: "id_utilisateur"});
  utilisateur.belongsTo(utilisateur, { as: "supervisor", foreignKey: "supervisor_id"});
  utilisateur.hasMany(utilisateur, { as: "utilisateurs", foreignKey: "supervisor_id"});
  commune.belongsTo(wilaya, { as: "id_wilaya_wilaya", foreignKey: "id_wilaya"});
  wilaya.hasMany(commune, { as: "communes", foreignKey: "id_wilaya"});

  return {
    annoce,
    annoceur,
    boisson,
    categ_boisson,
    categorie,
    client,
    commande,
    commune,
    consommateur,
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
