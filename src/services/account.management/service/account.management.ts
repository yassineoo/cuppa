
import { profile } from 'console';
import Models from './../../../models/sequelize';
const bcrypt = require('bcrypt');
import sequelize from 'sequelize';

// Initialize the models
const user = Models.utilisateur;
const profil = Models.profil;
const client = Models.client;
const consommateur = Models.consommateur;
const role = Models.role;
const distributeur = Models.distributeur;

// Define the association between the models
profil.belongsTo(user, { foreignKey: 'id_utilisateur' }); // Each profile belongs to one user
user.hasOne(profil, { foreignKey: 'id_utilisateur' }); // Each user has one profile
user.belongsTo(client, { foreignKey: 'id_client' }); // Each user belongs to one client
client.hasMany(user, { foreignKey: 'id_client' }); // Each client can have multiple users
user.belongsTo(role, { foreignKey: 'id_role' }); // Each user belongs to one role
role.hasMany(user, { foreignKey: 'id_role' }); // Each role can have multiple users

// Define the association between utilisateur and supervisor
user.belongsTo(user, { foreignKey: 'supervisor_id', as: 'Supervisor' });

client.hasMany(distributeur, { foreignKey: 'id_client' }); // Each client can have multiple distributeurs
distributeur.belongsTo(client, { foreignKey: 'id_client' }); // Each distributeur belongs to one client



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
				let profil = await  Models.profil.findOne({ where: { id_utilisateur:id } });
				await profil.destroy();
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
				let profilUser = await  profil.findOne({ where: { id_utilisateur:id } });

				if (!account) {
					throw new Error(`Account with id ${id} not found`);
				}
		
				 // Hash the password before updating the account in the database
				 if (body.password_utilisateur) {
					const hashedPassword = await bcrypt.hash(body.password_utilisateur, 10);
					body.password_utilisateur = hashedPassword || account.password_utilisateur;
				}
				
				let updatedUser = { ...account.toJSON(), ...body };
				await profilUser.update({ ... profilUser ,...body});
				// Save changes to database
				await account.update(updatedUser);
                return account.toJSON();

			} else {
				throw new Error(`You are not authorized to modify this account`);
			}
			

		} else if(modifierRole ===  role) {
		
				accountModel = Models.utilisateur;
				let account = await accountModel.findOne({ where: { id_utilisateur:id } });
			
				if (!account) {
					throw new Error(`Account with id ${id} not found`);
				}

				 // Hash the password before updating the account in the database
				 if (body.password_utilisateur) {
					const hashedPassword = await bcrypt.hash(body.password_utilisateur, 10);
					body.password_utilisateur = hashedPassword || account.password_utilisateur;
				}
				console.log('--body--');
				
				console.log(body);
				console.log('--body--');

				
				let updatedUser = { ...account.toJSON(), ...body };
				// Save changes to database
				await account.update(updatedUser);
                return account.toJSON();

		

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
	//*************************  yassin last add---------------*/

	static getEmployees = async (idAdm) => {
		let accounts;
         console.log("idAdm",idAdm);
		 
		try {

			accounts = await user.findAll({
				where: { supervisor_id: idAdm },
				include: profil
			  });
			  return accounts;

		} catch (error) {
			
		}
	
	};

	//*************************  yassin last add---------------*/

      
	

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

            const newUser=   await user.create({ ...body ,supervisor_id :createrId ,id_client:account.id_client});
			await profil.create({ ...body , id_utilisateur : newUser.id_utilisateur  });
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
			

            const clientInfo = await client.create({ ...body });
			const password = await bcrypt.hash(clientInfo.nom_client, 10);
			console.log("password",password);
			
			const ADM = await accountModel.create({ username_utilisateur :clientInfo.nom_client,password_utilisateur :password ,id_client : clientInfo.id_client ,id_role : 3});
			const ADMProfil = await Models.profil.create({ nom_utilisateur :"ADMIN", prenom_utilisateur :"ADMIN",sexe_utilisateur:"Not specified" ,id_client : clientInfo.id_client ,id_utilisateur:ADM.id_utilisateur});
            


			
			return { message: `Account created successfully` ,data:clientInfo };
	
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
            const consumer  = await consommateur.create({ ...body });
            return consumer;
	
};

	
static getAllClients = async () => {
	try {
	  const clients = await client.findAll({
		attributes: ['id_client', 'nom_client', 'type_client', 'ccp_client', 'externel_account_id'],
		include: [
		  {
			model: distributeur,
			attributes: [[sequelize.fn('COUNT', sequelize.col('distributeurs.numero_serie_distributeur')), 'distributor_count']],
			as: 'distributeurs',
		  },
		],
		group: ['client.id_client'],
	  });

	  return clients;
	} catch (error) {
	  return {
		success: false,
		error: error.message,
	  };
	}
  };
  


static getClientByID = async (id) => {
    const clientData = await client.findOne({ where: { id_client: id } });
    if (!clientData) {
      throw new Error(`Client with id ${id} not found`);
    }
    return clientData;
  };

  static getUtilisateurByClientID = async (clientID) => {
	const utilisateurs = await user.findAll({
	  where: { id_client: clientID },
	  include: [
		{
		  model: profil,
		  include: [
			{
			  model: user,
			  where: { id_client: clientID },
			},
		  ],
		},
	  ],
	});
	return utilisateurs;
  };

  
  static getProfilWithClient = async (id) => {
	try {
	  const account = await user.findOne({
		where: { id_utilisateur: id },
		include: [
		  {
			model: profil,
			attributes: ['id_profil', 'nom_utilisateur', 'prenom_utilisateur', 'path_image_utilisateur', 'sexe_utilisateur'],
		  },
		  {
			model: client,
			attributes: ['id_client', 'nom_client', 'type_client', 'ccp_client', 'externel_account_id'],
		  },
		  {
			model: role,
			attributes: ['libelle_role'],
		  },
		  {
			model: user,
			as: 'Supervisor',
			attributes: ['id_utilisateur', 'username_utilisateur', 'password_utilisateur', 'mail_utilisateur', 'supervisor_id', 'registration_token', 'id_role', 'id_client'],
			include: [
			  {
				model: profil,
				attributes: ['id_profil', 'nom_utilisateur', 'prenom_utilisateur', 'path_image_utilisateur', 'sexe_utilisateur'],
			  },
			  {
				model: client,
				attributes: ['id_client', 'nom_client', 'type_client', 'ccp_client', 'externel_account_id'],
			  },
			],
		  },
		],
		attributes: ['id_utilisateur', 'username_utilisateur', 'password_utilisateur', 'mail_utilisateur', 'supervisor_id', 'registration_token', 'id_role', 'id_client'],
	  });
  
	  if (!account) {
		throw new Error(`User with ID ${id} not found`);
	  }
  
	  if (!account.profil) {
		throw new Error(`Profile information not found for user with ID ${id}`);
	  }
  
	  const { id_utilisateur, username_utilisateur, password_utilisateur, mail_utilisateur, supervisor_id, registration_token, id_role, profil: userProfil, client: userClient, role: userRole, Supervisor } = account;
	  const {
		id_profil,
		nom_utilisateur,
		prenom_utilisateur,
		path_image_utilisateur,
		sexe_utilisateur,
	  } = userProfil;
  
	  const {
		id_client,
		nom_client,
		
		type_client,
		ccp_client,
		externel_account_id,
	  } = userClient;
  
	  const { libelle_role } = userRole;
  
	  let supervisor;
	  if (Supervisor) {
		const {
		  id_utilisateur: supervisorId,
		  username_utilisateur: supervisorUsername,
		  password_utilisateur: supervisorPassword,
		  mail_utilisateur: supervisorMail,
		  supervisor_id: supervisorSupervisorId,
		  registration_token: supervisorRegestrationToken,
		  id_role: supervisorRoleId,
		  id_client: supervisorClientId,
		  profil: supervisorProfil,
		  client: supervisorClient,
		} = Supervisor;
  
		const {
		  id_profil: supervisorProfilId,
		  nom_utilisateur: supervisorNomUtilisateur,
		  prenom_utilisateur: supervisorPrenomUtilisateur,
		  path_image_utilisateur: supervisorPathImageUtilisateur,
		  sexe_utilisateur: supervisorSexeUtilisateur,
		} = supervisorProfil;
  
		const {
		  id_client: supervisorClientID,
		  nom_client: supervisorNomClient,
		 
		  type_client: supervisorTypeClient,
		  ccp_client: supervisorCcpClient,
		  externel_account_id: supervisorExternelAccountId,
		} = supervisorClient;
  
		supervisor = {
		  id_utilisateur: supervisorId,
		  username_utilisateur: supervisorUsername,
		  password_utilisateur: supervisorPassword,
		  mail_utilisateur: supervisorMail,
		  supervisor_id: supervisorSupervisorId,
		  registration_token: supervisorRegestrationToken,
		  id_role: supervisorRoleId,
		  id_client: supervisorClientId,
		  profil: {
			id_profil: supervisorProfilId,
			nom_utilisateur: supervisorNomUtilisateur,
			prenom_utilisateur: supervisorPrenomUtilisateur,
			path_image_utilisateur: supervisorPathImageUtilisateur,
			sexe_utilisateur: supervisorSexeUtilisateur,
		  },
		  client: {
			id_client: supervisorClientId,
			nom_client: supervisorNomClient,
		
			type_client: supervisorTypeClient,
			ccp_client: supervisorCcpClient,
			externel_account_id: supervisorExternelAccountId,
		  },
		};
	  }
  
	  return {
		id_utilisateur,
		username_utilisateur,
		password_utilisateur,
		mail_utilisateur,
		supervisor_id,
		registration_token,
		id_role,
		id_client,
		profil: {
		  id_profil,
		  nom_utilisateur,
		  prenom_utilisateur,
		  path_image_utilisateur,
		  sexe_utilisateur,
		},
		client: {
		  id_client,
		  nom_client,
		
		  type_client,
		  ccp_client,
		  externel_account_id,
		},
		role: {
		  libelle_role,
		},
		supervisor,
	  };
	} catch (error) {
	  return {
		success: false,
		error: error.message,
	  };
	}
  };
  
  
  
  

}




  
export default AccountManagmentService;