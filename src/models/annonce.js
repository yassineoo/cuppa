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
    age_min: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    age_max: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    path_video: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    tarif_annonce: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    nom_annonce: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    etat_annonce: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    date_debut: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    },
    nombre_affichage: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_annonceur: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sexe_cible: {
      type: DataTypes.STRING(50),
      allowNull: false
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
