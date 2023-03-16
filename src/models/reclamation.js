const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('reclamation', {
    id_reclamation: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    description_reclamation: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    date_reclamation: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    heure_reclamtion: {
      type: DataTypes.TIME,
      allowNull: false
    },
    id_cmd: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'commande',
        key: 'id_cmd'
      },
      unique: "reclamation_ibfk_1"
    }
  }, {
    sequelize,
    tableName: 'reclamation',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_reclamation" },
        ]
      },
      {
        name: "id_cmd",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_cmd" },
        ]
      },
    ]
  });
};
