const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('am_maintenir_distributeur', {
    numero_serie_distributeur: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    code_pin: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    libelle_role: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'am_maintenir_distributeur',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "numero_serie_distributeur" },
        ]
      },
      {
        name: "libelle_role",
        using: "BTREE",
        fields: [
          { name: "libelle_role" },
        ]
      },
    ]
  });
};
