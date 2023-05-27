const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('outils_preparation_boisson', {
    id_ingredient: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    libelle_ingredient: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    quantite_restante_ingredient: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    goblet_restant: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'outils_preparation_boisson',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_ingredient" },
        ]
      },
    ]
  });
};
