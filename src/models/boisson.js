const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('boisson', {
    id_boisson: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    duree_preparation_boisson: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    libelle_boisson: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    description_boisson: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    prix_boisson: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    path_image_boisson: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    monnaie_prix: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    id_categorie: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'categorie',
        key: 'id_categorie'
      }
    }
  }, {
    sequelize,
    tableName: 'boisson',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_boisson" },
        ]
      },
      {
        name: "id_categorie",
        using: "BTREE",
        fields: [
          { name: "id_categorie" },
        ]
      },
    ]
  });
};
