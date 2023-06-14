
import { profile } from 'console';
import Models from './../../../models/sequelize';
const bcrypt = require('bcrypt');

// Initialize the models
const user = Models.utilisateur;
const profil = Models.profil;
const client = Models.client;
const consommateur = Models.consommateur;

// Define the association between the models
profil.belongsTo(user, { foreignKey: 'id_utilisateur' }); // Each profile belongs to one user
user.hasOne(profil, { foreignKey: 'id_utilisateur' }); // Each user has one profile

class AccountManagmentService {


   /**
   * @description delete an account in the database of the corresponding role
   * @param user {string} role of the user who deleted the account
   * @param id {string} id of the user whose account is going to be deleted
   * @param role {string} role of the user whose account is going to be deleted
   * @returns {object} Return object with only the whitelisted keys
   */

	static deleteAccount = async (id: string, role: string, user: string) => {
		let accountModel;

		if (user ===  'SADM') {

            if (role === 'ADM') {
				accountModel = Models.utilisateur;
				let account = await accountModel.findOne({ where: { id_utilisateur:id } });

		        if (!account) {
			    throw new Error(`Account with id ${id} not found`);
		        }
				
		        await account.destroy();
			
		        return { message: `Account with id ${id} deleted successfully` };;
			} else {	
				throw new Error(`You are not authorized to delete this account`);
			} 

		
		} else if (user ===  'ADM') {

            if (role === 'AM' || role === 'AC' || role === 'decideur') {

				accountModel = Models.utilisateur;
				let account = await accountModel.findOne({ where: { id_utilisateur:id } });

				if (!account) {
					throw new Error(`Account with id ${id} not found`);
				}
		
				await account.destroy();
		
				return { message: `Account with id ${id} deleted successfully` };

			} else {
				throw new Error(`You are not authorized to delete this account`);
			}

		} else {
			throw new Error(`You are not authorized to delete this account`);
		}

	};


	/**
   * @description modify an account in the database of the corresponding role
   * @param body {object} contain all the necessary information for modification of the Account
   * @param role {string} role is the type of the account modified
   * @param id {string} id of the one whose account is going to be modified
   * @param modifierId {string} id of the one who modified the account
   * @param modifierRole {string} role of the one who modified the account
   * @returns {object} Return object with only the whitelisted keys
   */

	static async modifyAccount(id: string, body: any, role: string, modifierRole: string) {

		let accountModel = Models.utilisateur;

		if (modifierRole ===  'ADM') {

                if (role === 'AM' || role === 'AC' || role === 'decideur') {
			
				let account = await user.findOne({ where: { id_utilisateur:id } });
				if (!account) {
					throw new Error(`Account with id ${id} not found`);
				}
		
				 // Hash the password before updating the account in the database
				 if (body.password_utilisateur) {
					const hashedPassword = await bcrypt.hash(body.password_utilisateur, 10);
					body.password_utilisateur = hashedPassword;
				}
				
				let updatedUser = { ...account.toJSON(), ...body };
				// Save changes to database
				await account.update(updatedUser);
                return account.toJSON();

			} else {
				throw new Error(`You are not authorized to modify this account`);
			}
			

		} else if(modifierRole ===  'AM') {

			if (role === 'AM') {

				accountModel = Models.utilisateur;
				let account = await accountModel.findOne({ where: { id_utilisateur:id } });

				if (!account) {
					throw new Error(`Account with id ${id} not found`);
				}

				 // Hash the password before updating the account in the database
				 if (body.password_utilisateur) {
					const hashedPassword = await bcrypt.hash(body.password_utilisateur, 10);
					body.password_utilisateur = hashedPassword;
				}

				let updatedUser = { ...account.toJSON(), ...body };
				// Save changes to database
				await account.update(updatedUser);
                return account.toJSON();

			} else {
				throw new Error(`You are not authorized to modify this account`);
			}

		} else if(modifierRole ===  'AC') {

			if (role === 'AC') {

				accountModel = Models.utilisateur;
				let account = await accountModel.findOne({ where: { id_utilisateur:id } });

				if (!account) {
					throw new Error(`Account with id ${id} not found`);
				}
		
				 // Hash the password before updating the account in the database
				 if (body.password_utilisateur) {
					const hashedPassword = await bcrypt.hash(body.password_utilisateur, 10);
					body.password_utilisateur = hashedPassword;
				}

				// Update account properties
		        let updatedUser = { ...account.toJSON(), ...body };
				// Save changes to database
				await account.update(updatedUser);
                return account.toJSON();

			} else {
				throw new Error(`You are not authorized to modify this account`);
			}

		} else if(modifierRole ===  'decideur') {

			if (role === 'decideur') {

				accountModel = Models.utilisateur;
				let account = await accountModel.findOne({ where: { id_utilisateur:id } });

				if (!account) {
					throw new Error(`Account with id ${id} not found`);
				}
		
				 // Hash the password before updating the account in the database
				 if (body.password_utilisateur) {
					const hashedPassword = await bcrypt.hash(body.password_utilisateur, 10);
					body.password_utilisateur = hashedPassword;
				}

				let updatedUser = { ...account.toJSON(), ...body };
				// Save changes to database
				await account.update(updatedUser);
                return account.toJSON();

			} else {
				throw new Error(`You are not authorized to modify this account`);
			}

		} else {

            throw new Error(`You are not authorized to modify this account`);

        }

	};




	/**
   * @description get accounts in the database of the corresponding role
   * @param getRole {string} role of the one who got the accounts
   * @param role {string} role of the accounts
   * @returns {object} Return object with only the whitelisted keys
   */

	static getAccounts = async (role: string, getRole: string) => {

		let accounts;
		if (getRole==='ADM') {
			switch (role) {

				case 'AM':
					accounts = await user.findAll({
						where: { id_role: 5 },
						include: profil
					  });
					break;
				case 'AC':
					accounts = await user.findAll({
						where: { id_role: 4 },
						include: profil
					  });
					break;
				case 'decideur':
					accounts = await user.findAll({
						where: { id_role: 6 },
						include: profil
					  });
					break;
				default:
					throw new Error(`Invalid role: ${role}`);
			
			}
			return accounts;
		} else {
			throw new Error(`You are not authorized to get accounts with this role`);
		}
	
	};
      
	

	static getProfile = async (id: string) => {

		
		let account;

		account = await user.findOne({
			where: { id_utilisateur: id },
			include: [ {model :  profil  }, {model : client ,as : 'id_client_client'}]
		});

		return account;
	};



 /**
 * @description create an account in the database of the corresponding role
 * @param body {object} contain all the necessary information for creation of the Account
 * @param role {string} role is the type of the account created
 * @param createrId {string} id of the one who created the account
 * @param createrRole {string} role of the one who created the account
 * @returns {object} Return object with only the whitelisted keys
 */

static async createAccount(body: any, role: string, createrId: string, createrRole: string) {

    let accountModel;

    if (createrRole === 'ADM') {

        if (role === 'AM' || role === 'AC' || role === 'decideur') {

            accountModel = Models.utilisateur;
            let account = await accountModel.findOne({ where: { id_utilisateur: createrId } });

            if (!account) {
                throw new Error(`Account with id ${createrId} not found`);
            }

            // Hash the password using bcrypt
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(body.password_utilisateur, saltRounds);

            // Set the hashed password in the body before creating the account
            body.password_utilisateur = hashedPassword;

            await user.create({ ...body });
            return { message: `Account created successfully` };

        } else {
            throw new Error(`You are not authorized to create this account`);
        }

    } else if (createrRole === 'SADM') {

        if (role === 'ADM') {

            accountModel = Models.utilisateur;
            let account = await accountModel.findOne({ where: { id_utilisateur: createrId } });

            if (!account) {
                throw new Error(`Account with id ${createrId} not found`);
            }

            // Hash the password using bcrypt
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(body.password_utilisateur, saltRounds);

            // Set the hashed password in the body before creating the account
            body.password_utilisateur = hashedPassword;

            await user.create({ ...body });
            return { message: `Account created successfully` };

        } else {
            throw new Error(`You are not authorized to create this account`);
        }

    } else {

        throw new Error(`You are not authorized to create this account`);

    }

};


static async createClientAccount(body: any, createrId: string, createrRole: string) {

    let accountModel;

    if (createrRole === 'SADM') {

            accountModel = Models.utilisateur;
            let account = await accountModel.findOne({ where: { id_utilisateur: createrId } });

            if (!account) {
                throw new Error(`Account with id ${createrId} not found`);
            }


            await client.create({ ...body });
            return { message: `Account created successfully` };
	
    } else {

        throw new Error(`You are not authorized to create this account`);

    }

};


static async createConsommateurAccount(body: any) {

	         // Hash the password using bcrypt
			 const saltRounds = 10;
			 const hashedPassword = await bcrypt.hash(body.password_consommateur, saltRounds);
 
			 // Set the hashed password in the body before creating the account
			 body.password_consommateur = hashedPassword;
            await consommateur.create({ ...body });
            return { message: `Account created successfully` };
	
};

	
	

}


  
export default AccountManagmentService;