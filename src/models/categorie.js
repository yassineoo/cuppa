const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('categorie', {
    id_categorie: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    libelle_categorie: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'categorie',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_categorie" },
        ]
      },
    ]
  });
};
