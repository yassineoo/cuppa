const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('commune', {
    id_commune: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    numero_commune: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nom_commune: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    id_wilaya: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'wilaya',
        key: 'id_wilaya'
      }
    }
  }, {
    sequelize,
    tableName: 'commune',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_commune" },
        ]
      },
      {
        name: "id_wilaya",
        using: "BTREE",
        fields: [
          { name: "id_wilaya" },
        ]
      },
    ]
  });
};
