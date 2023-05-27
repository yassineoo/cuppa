const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('utilisateur', {
    id_utilisateur: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    username_utilisateur: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    password_utilisateur: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    mail_utilisateur: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    registration_token: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    supervisor_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'utilisateur',
        key: 'id_utilisateur'
      }
    },
    id_client: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'client',
        key: 'id_client'
      }
    },
    id_role: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'role',
        key: 'id_role'
      }
    }
  }, {
    sequelize,
    tableName: 'utilisateur',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_utilisateur" },
        ]
      },
      {
        name: "supervisor_id",
        using: "BTREE",
        fields: [
          { name: "supervisor_id" },
        ]
      },
      {
        name: "id_client",
        using: "BTREE",
        fields: [
          { name: "id_client" },
        ]
      },
      {
        name: "id_role",
        using: "BTREE",
        fields: [
          { name: "id_role" },
        ]
      },
    ]
  });
};
