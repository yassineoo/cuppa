const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('region', {
    id_region: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    libelle_region: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    id_commune: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'commune',
        key: 'id_commune'
      }
    }
  }, {
    sequelize,
    tableName: 'region',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_region" },
        ]
      },
      {
        name: "id_commune",
        using: "BTREE",
        fields: [
          { name: "id_commune" },
        ]
      },
    ]
  });
};
