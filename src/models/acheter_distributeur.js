const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
     return sequelize.define(
          'acheter_distributeur',
          {
               numero_serie_distributeur: {
                    type: DataTypes.STRING(50),
                    allowNull: false,
                    primaryKey: true,
               },
               date_achat: {
                    type: DataTypes.DATE,
                    allowNull: true,
               },
               id_client: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
               },
          },
          {
               sequelize,
               tableName: 'acheter_distributeur',
               timestamps: false,
               indexes: [
                    {
                         name: 'PRIMARY',
                         unique: true,
                         using: 'BTREE',
                         fields: [{ name: 'numero_serie_distributeur' }],
                    },
                    {
                         name: 'id_client',
                         using: 'BTREE',
                         fields: [{ name: 'id_client' }],
                    },
               ],
          }
     );
};
