const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('faire_commande', {
    id_consommateur: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    numero_serie_distributeur: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    id_cmd: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'faire_commande',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_consommateur" },
          { name: "numero_serie_distributeur" },
          { name: "id_cmd" },
        ]
      },
      {
        name: "numero_serie_distributeur",
        using: "BTREE",
        fields: [
          { name: "numero_serie_distributeur" },
        ]
      },
      {
        name: "id_cmd",
        using: "BTREE",
        fields: [
          { name: "id_cmd" },
        ]
      },
    ]
  });
};
