var DataTypes = require("sequelize").DataTypes;
var _distributeur = require("./distributeur");
var _utilisateur = require("./utilisateur");

function initModels(sequelize) {
  var distributeur = _distributeur(sequelize, DataTypes);
  var utilisateur = _utilisateur(sequelize, DataTypes);


  return {
    distributeur,
    utilisateur,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
