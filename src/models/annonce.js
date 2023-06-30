const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('annonce', {
    id_annonce: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    duree_affichage: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ageMin: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ageMax: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    path_video: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    tarif_annonce: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    nom_annonce: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    type_forfait: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    etat_annonce: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    date_debut: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    nombre_affichage: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    id_annonceur: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'annonceur',
        key: 'id_annonceur'
      }
    },
    sexe_cible: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "_utf8mb4\\'b\\'"
    }
  }, {
    sequelize,
    tableName: 'annonce',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_annonce" },
        ]
      },
      {
        name: "id_annonceur",
        using: "BTREE",
        fields: [
          { name: "id_annonceur" },
        ]
      },
    ]
  });
};
