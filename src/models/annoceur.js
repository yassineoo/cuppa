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
    libelle_role: {
      type: DataTypes.STRING(50),
      allowNull: false
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
        name: "libelle_role",
        using: "BTREE",
        fields: [
          { name: "libelle_role" },
        ]
      },
    ]
  });
};
