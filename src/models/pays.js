const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pays', {
    id_pays: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nom_pays: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'pays',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_pays" },
        ]
      },
    ]
  });
};
