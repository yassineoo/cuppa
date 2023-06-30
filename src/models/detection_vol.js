const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('detection_vol', {
    id_vol: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    date_vol: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    heure_vol: {
      type: DataTypes.TIME,
      allowNull: false
    },
    description_vol: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    numero_serie_distributeur: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'distributeur',
        key: 'numero_serie_distributeur'
      }
    }
  }, {
    sequelize,
    tableName: 'detection_vol',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_vol" },
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
