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
    date_installation_distributeur: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    localisation_statique_distributeur: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    id_client: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'client',
        key: 'id_client'
      }
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
        name: "id_client",
        using: "BTREE",
        fields: [
          { name: "id_client" },
        ]
      },
    ]
  });
};
