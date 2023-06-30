const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('region_dynamique', {
    id_region_dynamique: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    centre_y: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    diametre: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    centre_x: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'region_dynamique',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_region_dynamique" },
        ]
      },
    ]
  });
};
