const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('annonceur', {
    id_annonceur: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nom_annonceur: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    type_annonceur: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    telephone_annonceur: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    fiscal_annonceur: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    rcf_annonceur: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    id_client: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'annonceur',
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
        name: "id_client",
        using: "BTREE",
        fields: [
          { name: "id_client" },
        ]
      },
    ]
  });
};
