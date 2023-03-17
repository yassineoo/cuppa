var DataTypes = require("sequelize").DataTypes;
var _distributeur = require("./distributeur");

function initModels(sequelize) {
  var distributeur = _distributeur(sequelize, DataTypes);


  return {
    distributeur,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
