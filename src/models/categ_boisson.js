const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('categ_boisson', {
    id_boisson: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_categorie: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'categ_boisson',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_boisson" },
          { name: "id_categorie" },
        ]
      },
      {
        name: "id_categorie",
        using: "BTREE",
        fields: [
          { name: "id_categorie" },
        ]
      },
    ]
  });
};
