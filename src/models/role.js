const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('role', {
    id_role: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    libelle_role: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    id_role_ADM_gere_AC: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'role',
        key: 'id_role'
      }
    },
    id_role_ADM_gere_decideur: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'role',
        key: 'id_role'
      },
      unique: "role_ibfk_2"
    },
    id_role_ADM_gere_AM: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'role',
        key: 'id_role'
      },
      unique: "role_ibfk_3"
    },
    id_role_SADM_gere_ADM: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'role',
        key: 'id_role'
      }
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
          { name: "id_role" },
        ]
      },
      {
        name: "id_role_ADM_gere_decideur",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_role_ADM_gere_decideur" },
        ]
      },
      {
        name: "id_role_ADM_gere_AM",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_role_ADM_gere_AM" },
        ]
      },
      {
        name: "id_role_ADM_gere_AC",
        using: "BTREE",
        fields: [
          { name: "id_role_ADM_gere_AC" },
        ]
      },
      {
        name: "id_role_SADM_gere_ADM",
        using: "BTREE",
        fields: [
          { name: "id_role_SADM_gere_ADM" },
        ]
      },
    ]
  });
};
