
import Models from './../../../models/singlton'

// Initialize the models
const user = Models.getUtilisateur();


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

		if (user ===  'sadm') {

            if (role === 'adm') {
				accountModel = Models.getUtilisateur();
				let account = await accountModel.findOne({ where: { id_utilisateur:id } });

		        if (!account) {
			    throw new Error(`Account with id ${id} not found`);
		        }
				
		        await account.destroy();
			
		        return { message: `Account with id ${id} deleted successfully` };;
			} else {	
				throw new Error(`You are not authorized to delete this account`);
			} 

		
		} else if (user ===  'adm') {

            if (role === 'am' || role === 'ac' || role === 'decideur') {

				accountModel = Models.getUtilisateur();
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

		let accountModel = Models.getUtilisateur();

		if (modifierRole ===  'adm') {

                if (role === 'am' || role === 'ac' || role === 'decideur') {
			
				let account = await user.findOne({ where: { id_utilisateur:id } });
				if (!account) {
					throw new Error(`Account with id ${id} not found`);
				}
		
				let updatedUser = { ...account.toJSON(), ...body };
				// Save changes to database
				await account.update(updatedUser);
                return account.toJSON();

			} else {
				throw new Error(`You are not authorized to modify this account`);
			}
			

		} else if(modifierRole ===  'am') {

			if (role === 'am') {

				accountModel = Models.getUtilisateur();
				let account = await accountModel.findOne({ where: { id_utilisateur:id } });

				if (!account) {
					throw new Error(`Account with id ${id} not found`);
				}

				let updatedUser = { ...account.toJSON(), ...body };
				// Save changes to database
				await account.update(updatedUser);
                return account.toJSON();

			} else {
				throw new Error(`You are not authorized to modify this account`);
			}

		} else if(modifierRole ===  'ac') {

			if (role === 'ac') {

				accountModel = Models.getUtilisateur();
				let account = await accountModel.findOne({ where: { id_utilisateur:id } });

				if (!account) {
					throw new Error(`Account with id ${id} not found`);
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

				accountModel = Models.getUtilisateur();
				let account = await accountModel.findOne({ where: { id_utilisateur:id } });

				if (!account) {
					throw new Error(`Account with id ${id} not found`);
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
		if (getRole==="adm") {
			switch (role) {

				case 'am':
					accounts = await user.findAll({ where: { id_role: 5 } });
					break;
				case 'ac':
					accounts = await user.findAll({ where: { id_role: 4 } });
					break;
				case 'decideur':
					accounts = await user.findAll({ where: { id_role: 6 } });
					break;
				default:
					throw new Error(`Invalid role: ${role}`);
			
			}
			return accounts;
		} else {
			throw new Error(`You are not authorized to get accounts with this role`);
		}
	
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


			if (createrRole ===  'adm') {
	
					if (role === 'am' || role === 'ac' || role === 'decideur') {
	
					accountModel = Models.getUtilisateur();
					let account = await accountModel.findOne({ where: { id_utilisateur:createrId } });
	
					if (!account) {
						throw new Error(`Account with id ${createrId} not found`);
					}
			
					await user.create({...body});
					return { message: `Account created successfully` };
	
				} else {
					throw new Error(`You are not authorized to create this account`);
				}
	
			} else if (createrRole ===  'sadm'){

	
				if (role === 'adm') {
	
					accountModel = Models.getUtilisateur();
					let account = await accountModel.findOne({ where: { id_utilisateur:createrId } });
	
					if (!account) {
						throw new Error(`Account with id ${createrId} not found`);
					}
			
					await user.create({...body});
			        return { message: `Account created successfully` };
	
				} else {
					throw new Error(`You are not authorized to create this account`);
				}	   
	
			} else {

				throw new Error(`You are not authorized to create this account`);

			}
	
		};



	
	

}


  
export default AccountManagmentService;