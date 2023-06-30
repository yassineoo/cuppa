const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('paiement', {
    id_paiement: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    date_paiement: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    heure_paiement: {
      type: DataTypes.TIME,
      allowNull: false
    },
    id_cmd: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'commande',
        key: 'id_cmd'
      },
      unique: "paiement_ibfk_1"
    }
  }, {
    sequelize,
    tableName: 'paiement',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_paiement" },
        ]
      },
      {
        name: "id_cmd",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_cmd" },
        ]
      },
    ]
  });
};
