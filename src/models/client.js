const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('client', {
    id_client: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nom_client: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    prenom_client: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    type_client: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    ccp_client: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    libelle_role: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'client',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_client" },
        ]
      },
      {
        name: "libelle_role",
        using: "BTREE",
        fields: [
          { name: "libelle_role" },
        ]
      },
    ]
  });
};
