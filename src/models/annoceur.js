const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('annoceur', {
    id_annonceur: {
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
    sexe_annonceur: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    path_annonceur: {
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
