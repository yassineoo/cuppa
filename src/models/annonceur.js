const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('annonceur', {
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
    type_annonceur: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    path_annonceur: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    id_client: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'client',
        key: 'id_client'
      }
    },
    telephone_annonceur: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    rcs_annonceur: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    fiscal_annonceur: {
      type: DataTypes.INTEGER,
      allowNull: true
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
