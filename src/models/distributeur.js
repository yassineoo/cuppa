const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('distributeur', {
    id_distributeur: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    numero_serie_distributeur: {
      type: DataTypes.STRING(50),
      allowNull: false
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
    id_role: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'role',
        key: 'id_role'
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
          { name: "id_distributeur" },
        ]
      },
      {
        name: "id_role",
        using: "BTREE",
        fields: [
          { name: "id_role" },
        ]
      },
    ]
  });
};
