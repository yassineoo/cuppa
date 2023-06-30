const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('panne', {
    id_panne: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    objet_panne: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    date_panne: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    heure_panne: {
      type: DataTypes.TIME,
      allowNull: false
    },
    description_panne: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    etat_panne: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    id_utilisateur: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'utilisateur',
        key: 'id_utilisateur'
      }
    },
    numero_serie_distributeur: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'distributeur',
        key: 'numero_serie_distributeur'
      }
    }
  }, {
    sequelize,
    tableName: 'panne',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_panne" },
        ]
      },
      {
        name: "id_utilisateur",
        using: "BTREE",
        fields: [
          { name: "id_utilisateur" },
        ]
      },
      {
        name: "numero_serie_distributeur",
        using: "BTREE",
        fields: [
          { name: "numero_serie_distributeur" },
        ]
      },
    ]
  });
};
