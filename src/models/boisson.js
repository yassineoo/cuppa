const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('boisson', {
    id_boisson: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    duree_preparation_boisson: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    libelle_boisson: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    description_boisson: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    prix_boisson: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    id_client: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'client',
        key: 'id_client'
      }
    },
    path_image_boisson: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'boisson',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_boisson" },
        ]
      },
      {
        name: "id_client",
        using: "BTREE",
        fields: [
          { name: "id_client" },
        ]
      },
    ]
  });
};
