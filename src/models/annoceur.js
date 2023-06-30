const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('annoceur', {
    id_annonceur: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nom_annonceur: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    prenom_annonceur: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    type_annonceur: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    path_annonceur: {
      type: DataTypes.STRING(160),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'annoceur',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_annonceur" },
        ]
      },
    ]
  });
};
