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

  annonce.belongsToMany(region, { as: 'id_region_regions', through: dans_region, foreignKey: "id_annonce", otherKey: "id_region" });
  annonce.belongsToMany(region_dynamique, { as: 'id_region_dynamique_region_dynamiques', through: afficher_dans_region, foreignKey: "id_annonce", otherKey: "id_region_dynamique" });
  boisson.belongsToMany(outils_preparation_boisson, { as: 'id_ingredient_outils_preparation_boissons', through: preparer_avec, foreignKey: "id_boisson", otherKey: "id_ingredient" });
  outils_preparation_boisson.belongsToMany(boisson, { as: 'id_boisson_boissons', through: preparer_avec, foreignKey: "id_ingredient", otherKey: "id_boisson" });
  region.belongsToMany(annonce, { as: 'id_annonce_annonce_dans_regions', through: dans_region, foreignKey: "id_region", otherKey: "id_annonce" });
  region_dynamique.belongsToMany(annonce, { as: 'id_annonce_annonces', through: afficher_dans_region, foreignKey: "id_region_dynamique", otherKey: "id_annonce" });
  afficher_dans_region.belongsTo(annonce, { as: "id_annonce_annonce", foreignKey: "id_annonce"});
  annonce.hasMany(afficher_dans_region, { as: "afficher_dans_regions", foreignKey: "id_annonce"});
  dans_region.belongsTo(annonce, { as: "id_annonce_annonce", foreignKey: "id_annonce"});
  annonce.hasMany(dans_region, { as: "dans_regions", foreignKey: "id_annonce"});
  annonce.belongsTo(annonceur, { as: "id_annonceur_annonceur", foreignKey: "id_annonceur"});
  annonceur.hasMany(annonce, { as: "annonces", foreignKey: "id_annonceur"});
  commande.belongsTo(boisson, { as: "id_boisson_boisson", foreignKey: "id_boisson"});
  boisson.hasMany(commande, { as: "commandes", foreignKey: "id_boisson"});
  preparer_avec.belongsTo(boisson, { as: "id_boisson_boisson", foreignKey: "id_boisson"});
  boisson.hasMany(preparer_avec, { as: "preparer_avecs", foreignKey: "id_boisson"});
  boisson.belongsTo(categorie, { as: "id_categorie_categorie", foreignKey: "id_categorie"});
  categorie.hasMany(boisson, { as: "boissons", foreignKey: "id_categorie"});
  annonceur.belongsTo(client, { as: "id_client_client", foreignKey: "id_client"});
  client.hasMany(annonceur, { as: "annonceurs", foreignKey: "id_client"});
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
  preparer_avec.belongsTo(outils_preparation_boisson, { as: "id_ingredient_outils_preparation_boisson", foreignKey: "id_ingredient"});
  outils_preparation_boisson.hasMany(preparer_avec, { as: "preparer_avecs", foreignKey: "id_ingredient"});
  wilaya.belongsTo(pays, { as: "id_pays_pay", foreignKey: "id_pays"});
  pays.hasMany(wilaya, { as: "wilayas", foreignKey: "id_pays"});
  dans_region.belongsTo(region, { as: "id_region_region", foreignKey: "id_region"});
  region.hasMany(dans_region, { as: "dans_regions", foreignKey: "id_region"});
  afficher_dans_region.belongsTo(region_dynamique, { as: "id_region_dynamique_region_dynamique", foreignKey: "id_region_dynamique"});
  region_dynamique.hasMany(afficher_dans_region, { as: "afficher_dans_regions", foreignKey: "id_region_dynamique"});
  utilisateur.belongsTo(role, { as: "id_role_role", foreignKey: "id_role"});
  role.hasMany(utilisateur, { as: "utilisateurs", foreignKey: "id_role"});
  panne.belongsTo(utilisateur, { as: "id_utilisateur_utilisateur", foreignKey: "id_utilisateur"});
  utilisateur.hasMany(panne, { as: "pannes", foreignKey: "id_utilisateur"});
  profil.belongsTo(utilisateur, { as: "id_utilisateur_utilisateur", foreignKey: "id_utilisateur"});
  utilisateur.hasOne(profil, { as: "profil", foreignKey: "id_utilisateur"});
  tache.belongsTo(utilisateur, { as: "id_utilisateur_utilisateur", foreignKey: "id_utilisateur"});
  utilisateur.hasMany(tache, { as: "taches", foreignKey: "id_utilisateur"});
  utilisateur.belongsTo(utilisateur, { as: "supervisor", foreignKey: "supervisor_id"});
  utilisateur.hasMany(utilisateur, { as: "utilisateurs", foreignKey: "supervisor_id"});
  commune.belongsTo(wilaya, { as: "id_wilaya_wilaya", foreignKey: "id_wilaya"});
  wilaya.hasMany(commune, { as: "communes", foreignKey: "id_wilaya"});

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
