var DataTypes = require("sequelize").DataTypes;
var _boisson = require("./boisson");
var _boisson_ing = require("./boisson_ing");
var _commande = require("./commande");
var _distributeur = require("./distributeur");
var _outil = require("./outil");

function initModels(sequelize) {
  var boisson = _boisson(sequelize, DataTypes);
  var boisson_ing = _boisson_ing(sequelize, DataTypes);
  var commande = _commande(sequelize, DataTypes);
  var distributeur = _distributeur(sequelize, DataTypes);
  var outil = _outil(sequelize, DataTypes);

// Define the associations
  boisson.belongsToMany(outil, { through: boisson_ing, foreignKey: 'id_boisson' });
  outil.belongsToMany(boisson, { through: boisson_ing, foreignKey: 'id_outil' });

  return {
    boisson,
    boisson_ing,
    commande,
    distributeur,
    outil,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
