const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('dans_region', {
    id_region: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_annonce: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'dans_region',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_region" },
          { name: "id_annonce" },
        ]
      },
      {
        name: "id_annonce",
        using: "BTREE",
        fields: [
          { name: "id_annonce" },
        ]
      },
    ]
  });
};
