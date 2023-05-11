const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('annoce', {
    id_annonce: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    duree_affichage: {
      type: DataTypes.STRING(50),
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
      allowNull: false
    },
    prix_annonce: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    id_annonceur: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'annoceur',
        key: 'id_annonceur'
      }
    }
  }, {
    sequelize,
    tableName: 'annoce',
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
