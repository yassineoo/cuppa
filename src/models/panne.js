const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {

	return sequelize.define('panne', {
		id_panne: {
			type: DataTypes.STRING(50),
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
			type: DataTypes.STRING(50),
			allowNull: true
		},
		etat_panne: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		id_role: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'role',
				key: 'id_role'
			}
		},
		id_distributeur: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'distributeur',
				key: 'id_distributeur'
			}
		}
	}, {
		sequelize,
		tableName: 'panne',
		timestamps: false,
		indexes: [
			{
				name: 'PRIMARY',
				unique: true,
				using: 'BTREE',
				fields: [
					{ name: 'id_panne' },
				]
			},
			{
				name: 'id_role',
				using: 'BTREE',
				fields: [
					{ name: 'id_role' },
				]
			},
			{
				name: 'id_distributeur',
				using: 'BTREE',
				fields: [
					{ name: 'id_distributeur' },
				]
			},
		]
	});

};
