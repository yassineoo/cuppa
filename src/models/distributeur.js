const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('distributeur', {
    numero_serie_distributeur: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    etat_distributeur: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Date_installation_distributeur: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    localisation_statique_distributeur: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    id_utilisateur: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'distributeur',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "numero_serie_distributeur" },
        ]
      },
      {
        name: "id_utilisateur",
        using: "BTREE",
        fields: [
          { name: "id_utilisateur" },
        ]
      },
    ]
  });
};
