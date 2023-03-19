const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('faire_commande', {
    id_consommateur: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'consommateur',
        key: 'id_consommateur'
      }
    },
    id_distributeur: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'distributeur',
        key: 'id_distributeur'
      }
    },
    id_cmd: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'commande',
        key: 'id_cmd'
      }
    }
  }, {
    sequelize,
    tableName: 'faire_commande',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_consommateur" },
          { name: "id_distributeur" },
          { name: "id_cmd" },
        ]
      },
      {
        name: "id_distributeur",
        using: "BTREE",
        fields: [
          { name: "id_distributeur" },
        ]
      },
      {
        name: "id_cmd",
        using: "BTREE",
        fields: [
          { name: "id_cmd" },
        ]
      },
    ]
  });
};
