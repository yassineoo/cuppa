const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('type_paiement', {
    id_type_paiement: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    libelle_type_paiement: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'type_paiement',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_type_paiement" },
        ]
      },
    ]
  });
};
