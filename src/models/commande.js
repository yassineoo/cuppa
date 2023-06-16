const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('commande', {
    id_cmd: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    time_cmd: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    prix_cmd: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    taille_goblet: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    quantite_sucre: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    etat_cmd: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    id_boisson: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_consommateur: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    numero_serie_distributeur: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'commande',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_cmd" },
        ]
      },
      {
        name: "id_boisson",
        using: "BTREE",
        fields: [
          { name: "id_boisson" },
        ]
      },
      {
        name: "id_consommateur",
        using: "BTREE",
        fields: [
          { name: "id_consommateur" },
        ]
      },
      {
        name: "numero_serie_distributeur",
        using: "BTREE",
        fields: [
          { name: "numero_serie_distributeur" },
        ]
      },
    ]
  });
};
