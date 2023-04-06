const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('boisson_ing', {
    id_boisson: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_outil: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    quantite_preparation: {
      type: DataTypes.DOUBLE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'boisson_ing',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_boisson" },
          { name: "id_outil" },
        ]
      },
      {
        name: "id_outil",
        using: "BTREE",
        fields: [
          { name: "id_outil" },
        ]
      },
    ]
  });
};
