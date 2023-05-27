const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('consommateur', {
    id_consommateur: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    prenom_consommateur: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    nom_consommateur: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    sexe_consommateur: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    path_consommateur: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    mail_consommateur: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    password_consommateur: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    payment_methode_id: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'consommateur',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_consommateur" },
        ]
      },
    ]
  });
};
