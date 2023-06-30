const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('client', {
    id_client: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nom_client: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    type_client: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    externel_account_id: {
      type: DataTypes.STRING(100),
      allowNull: true,
      unique: "externel_account_id"
    },
    ccp_client: {
      type: DataTypes.STRING(100),
      allowNull: true
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
        name: "externel_account_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "externel_account_id" },
        ]
      },
    ]
  });
};
