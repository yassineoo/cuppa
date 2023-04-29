const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
     return sequelize.define(
          'panne',
          {
               id_panne: {
                    type: DataTypes.STRING(50),
                    allowNull: false,
                    primaryKey: true,
               },
               objet_panne: {
                    type: DataTypes.STRING(50),
                    allowNull: false,
               },
               date_panne: {
                    type: DataTypes.DATEONLY,
                    allowNull: false,
               },
               heure_panne: {
                    type: DataTypes.TIME,
                    allowNull: false,
               },
               description_panne: {
                    type: DataTypes.STRING(50),
                    allowNull: true,
               },
               etat_panne: {
                    type: DataTypes.STRING(50),
                    allowNull: false,
               },
               libelle_role: {
                    type: DataTypes.STRING(50),
                    allowNull: false,
               },
               numero_serie_distributeur: {
                    type: DataTypes.STRING(50),
                    allowNull: false,
               },
          },
          {
               sequelize,
               tableName: 'panne',
               timestamps: false,
               indexes: [
                    {
                         name: 'PRIMARY',
                         unique: true,
                         using: 'BTREE',
                         fields: [{ name: 'id_panne' }],
                    },
                    {
                         name: 'libelle_role',
                         using: 'BTREE',
                         fields: [{ name: 'libelle_role' }],
                    },
                    {
                         name: 'numero_serie_distributeur',
                         using: 'BTREE',
                         fields: [{ name: 'numero_serie_distributeur' }],
                    },
               ],
          }
     );
};
