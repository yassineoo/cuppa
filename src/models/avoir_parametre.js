const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('avoir_parametre', {
    id_distributeur: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'distributeur',
        key: 'id_distributeur'
      }
    },
    localisation_dynamique_distributeur: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'parametre',
        key: 'localisation_dynamique_distributeur'
      }
    }
  }, {
    sequelize,
    tableName: 'avoir_parametre',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_distributeur" },
          { name: "localisation_dynamique_distributeur" },
        ]
      },
      {
        name: "localisation_dynamique_distributeur",
        using: "BTREE",
        fields: [
          { name: "localisation_dynamique_distributeur" },
        ]
      },
    ]
  });
};
