const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('am_avoir_tache', {
    id_tache: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'tache',
        key: 'id_tache'
      }
    },
    id_utilisateur: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'utilisateur',
        key: 'id_utilisateur'
      }
    }
  }, {
    sequelize,
    tableName: 'am_avoir_tache',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_tache" },
          { name: "id_utilisateur" },
        ]
      },
      {
        name: "id_utilisateur",
        using: "BTREE",
        fields: [
          { name: "id_utilisateur" },
        ]
      },
    ]
  });
};
