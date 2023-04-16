const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('role', {
    libelle_role: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    libelle_role_user1_gere_user2: {
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: "libelle_role_user1_gere_user2"
    }
  }, {
    sequelize,
    tableName: 'role',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "libelle_role" },
        ]
      },
      {
        name: "libelle_role_user1_gere_user2",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "libelle_role_user1_gere_user2" },
        ]
      },
    ]
  });
};
