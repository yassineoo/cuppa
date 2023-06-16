const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('preparer_avec', {
    id_boisson: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_ingredient: {
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
    tableName: 'preparer_avec',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_boisson" },
          { name: "id_ingredient" },
        ]
      },
      {
        name: "id_ingredient",
        using: "BTREE",
        fields: [
          { name: "id_ingredient" },
        ]
      },
    ]
  });
};
