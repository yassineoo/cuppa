const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('am_avoir_tache', {
    id_tache: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    libelle_role: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
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
          { name: "libelle_role" },
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
