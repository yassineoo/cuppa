const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('wilaya', {
    id_wilaya: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    numero_wilaya: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nom_wilaya: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    id_pays: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'pays',
        key: 'id_pays'
      }
    }
  }, {
    sequelize,
    tableName: 'wilaya',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_wilaya" },
        ]
      },
      {
        name: "id_pays",
        using: "BTREE",
        fields: [
          { name: "id_pays" },
        ]
      },
    ]
  });
};
