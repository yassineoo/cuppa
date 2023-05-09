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

  annoce.belongsToMany(region, { as: 'id_region_regions', through: dans_region, foreignKey: "id_annonce", otherKey: "id_region" });
  annoce.belongsToMany(region_dynamique, { as: 'id_region_dynamique_region_dynamiques', through: afficher_dans_region, foreignKey: "id_annonce", otherKey: "id_region_dynamique" });
  boisson.belongsToMany(categorie, { as: 'id_categorie_categories', through: categ_boisson, foreignKey: "id_boisson", otherKey: "id_categorie" });
  boisson.belongsToMany(outil, { as: 'id_outil_outils', through: boisson_ing, foreignKey: "id_boisson", otherKey: "id_outil" });
  categorie.belongsToMany(boisson, { as: 'id_boisson_boisson_categ_boissons', through: categ_boisson, foreignKey: "id_categorie", otherKey: "id_boisson" });
  distributeur.belongsToMany(parametre, { as: 'localisation_dynamique_distributeur_parametres', through: avoir_parametre, foreignKey: "numero_serie_distributeur", otherKey: "localisation_dynamique_distributeur" });
  distributeur.belongsToMany(utilisateur, { as: 'id_utilisateur_utilisateur_am_maintenir_distributeurs', through: am_maintenir_distributeur, foreignKey: "numero_serie_distributeur", otherKey: "id_utilisateur" });
  outil.belongsToMany(boisson, { as: 'id_boisson_boissons', through: boisson_ing, foreignKey: "id_outil", otherKey: "id_boisson" });
  parametre.belongsToMany(distributeur, { as: 'numero_serie_distributeur_distributeur_avoir_parametres', through: avoir_parametre, foreignKey: "localisation_dynamique_distributeur", otherKey: "numero_serie_distributeur" });
  region.belongsToMany(annoce, { as: 'id_annonce_annoce_dans_regions', through: dans_region, foreignKey: "id_region", otherKey: "id_annonce" });
  region_dynamique.belongsToMany(annoce, { as: 'id_annonce_annoces', through: afficher_dans_region, foreignKey: "id_region_dynamique", otherKey: "id_annonce" });
  tache.belongsToMany(utilisateur, { as: 'id_utilisateur_utilisateurs', through: am_avoir_tache, foreignKey: "id_tache", otherKey: "id_utilisateur" });
  utilisateur.belongsToMany(distributeur, { as: 'numero_serie_distributeur_distributeurs', through: am_maintenir_distributeur, foreignKey: "id_utilisateur", otherKey: "numero_serie_distributeur" });
  utilisateur.belongsToMany(tache, { as: 'id_tache_taches', through: am_avoir_tache, foreignKey: "id_utilisateur", otherKey: "id_tache" });
  afficher_dans_region.belongsTo(annoce, { as: "id_annonce_annoce", foreignKey: "id_annonce"});
  annoce.hasMany(afficher_dans_region, { as: "afficher_dans_regions", foreignKey: "id_annonce"});
  dans_region.belongsTo(annoce, { as: "id_annonce_annoce", foreignKey: "id_annonce"});
  annoce.hasMany(dans_region, { as: "dans_regions", foreignKey: "id_annonce"});
  annoce.belongsTo(annoceur, { as: "id_annonceur_annoceur", foreignKey: "id_annonceur"});
  annoceur.hasMany(annoce, { as: "annoces", foreignKey: "id_annonceur"});
  boisson_ing.belongsTo(boisson, { as: "id_boisson_boisson", foreignKey: "id_boisson"});
  boisson.hasMany(boisson_ing, { as: "boisson_ings", foreignKey: "id_boisson"});
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
  am_maintenir_distributeur.belongsTo(distributeur, { as: "numero_serie_distributeur_distributeur", foreignKey: "numero_serie_distributeur"});
  distributeur.hasMany(am_maintenir_distributeur, { as: "am_maintenir_distributeurs", foreignKey: "numero_serie_distributeur"});
  avoir_parametre.belongsTo(distributeur, { as: "numero_serie_distributeur_distributeur", foreignKey: "numero_serie_distributeur"});
  distributeur.hasMany(avoir_parametre, { as: "avoir_parametres", foreignKey: "numero_serie_distributeur"});
  commande.belongsTo(distributeur, { as: "numero_serie_distributeur_distributeur", foreignKey: "numero_serie_distributeur"});
  distributeur.hasMany(commande, { as: "commandes", foreignKey: "numero_serie_distributeur"});
  detection_vol.belongsTo(distributeur, { as: "numero_serie_distributeur_distributeur", foreignKey: "numero_serie_distributeur"});
  distributeur.hasMany(detection_vol, { as: "detection_vols", foreignKey: "numero_serie_distributeur"});
  panne.belongsTo(distributeur, { as: "numero_serie_distributeur_distributeur", foreignKey: "numero_serie_distributeur"});
  distributeur.hasMany(panne, { as: "pannes", foreignKey: "numero_serie_distributeur"});
  boisson_ing.belongsTo(outil, { as: "id_outil_outil", foreignKey: "id_outil"});
  outil.hasMany(boisson_ing, { as: "boisson_ings", foreignKey: "id_outil"});
  avoir_parametre.belongsTo(parametre, { as: "localisation_dynamique_distributeur_parametre", foreignKey: "localisation_dynamique_distributeur"});
  parametre.hasMany(avoir_parametre, { as: "avoir_parametres", foreignKey: "localisation_dynamique_distributeur"});
  wilaya.belongsTo(pays, { as: "id_pays_pay", foreignKey: "id_pays"});
  pays.hasMany(wilaya, { as: "wilayas", foreignKey: "id_pays"});
  dans_region.belongsTo(region, { as: "id_region_region", foreignKey: "id_region"});
  region.hasMany(dans_region, { as: "dans_regions", foreignKey: "id_region"});
  afficher_dans_region.belongsTo(region_dynamique, { as: "id_region_dynamique_region_dynamique", foreignKey: "id_region_dynamique"});
  region_dynamique.hasMany(afficher_dans_region, { as: "afficher_dans_regions", foreignKey: "id_region_dynamique"});
  utilisateur.belongsTo(role, { as: "id_role_role", foreignKey: "id_role"});
  role.hasMany(utilisateur, { as: "utilisateurs", foreignKey: "id_role"});
  am_avoir_tache.belongsTo(tache, { as: "id_tache_tache", foreignKey: "id_tache"});
  tache.hasMany(am_avoir_tache, { as: "am_avoir_taches", foreignKey: "id_tache"});
  paiement.belongsTo(type_paiement, { as: "id_type_paiement_type_paiement", foreignKey: "id_type_paiement"});
  type_paiement.hasMany(paiement, { as: "paiements", foreignKey: "id_type_paiement"});
  am_avoir_tache.belongsTo(utilisateur, { as: "id_utilisateur_utilisateur", foreignKey: "id_utilisateur"});
  utilisateur.hasMany(am_avoir_tache, { as: "am_avoir_taches", foreignKey: "id_utilisateur"});
  am_maintenir_distributeur.belongsTo(utilisateur, { as: "id_utilisateur_utilisateur", foreignKey: "id_utilisateur"});
  utilisateur.hasMany(am_maintenir_distributeur, { as: "am_maintenir_distributeurs", foreignKey: "id_utilisateur"});
  panne.belongsTo(utilisateur, { as: "id_utilisateur_utilisateur", foreignKey: "id_utilisateur"});
  utilisateur.hasMany(panne, { as: "pannes", foreignKey: "id_utilisateur"});
  profil.belongsTo(utilisateur, { as: "id_utilisateur_utilisateur", foreignKey: "id_utilisateur"});
  utilisateur.hasOne(profil, { as: "profil", foreignKey: "id_utilisateur"});
  utilisateur.belongsTo(utilisateur, { as: "supervisor", foreignKey: "supervisor_id"});
  utilisateur.hasMany(utilisateur, { as: "utilisateurs", foreignKey: "supervisor_id"});
  commune.belongsTo(wilaya, { as: "id_wilaya_wilaya", foreignKey: "id_wilaya"});
  wilaya.hasMany(commune, { as: "communes", foreignKey: "id_wilaya"});

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
