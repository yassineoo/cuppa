/* eslint-disable @typescript-eslint/no-namespace */
import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import models from '../../models/sequelize';
import bcrypt from 'bcryptjs';
import consommateur from '../../models/consommateur';


	interface User {
	id: string;
	role: string;
	exp:number;
	}


  
  interface LoginData {
	username: string;
	password: string;
	
	email :  string;
	consumer : string;
  }



const utilisateur = models.utilisateur;
const role = models.role;
const Consommateur = models.consommateur;

class  Authentication {

	private static jwtSecret = process.env.JWT_SECRET || 'secret';


	/**
 * Verify a JWT token and return the decoded user object if valid
 * @param {string} token - The JWT token to verify
 * @returns {Promise<User | null>} - A promise that resolves to the decoded user object if the token is valid, otherwise null
 */
	static verifyToken = async (token: string): Promise<User | null> => {

		// eslint-disable-next-line no-useless-catch
		try {
			
			

			// Verify the token using the JWT secret
			const decodedToken = await jwt.verify(token, this.jwtSecret) as User ;
			//console.log();
			
			// Check if the token has expired
			if (Date.now() >= decodedToken.exp * 1000) {

				throw new Error('Token expired');
			
			}

			// Return the decoded user object if everything is valid
			return decodedToken;

		} catch (error) {

			// Throw any error that occurs during the token verification
			throw error;
		
		}

	};

	


	/**
 * Logs a user in and returns a JWT token.
 * @async
 * @function
 * @param {Object} loginData - The login data object.
 * @param {string} loginData.username - The user's username.
 * @param {string} loginData.password - The user's password.
 * @param {string} loginData.userRole - The user's role.
 * @param {string} loginData.email - The user's email.
 * @returns {Promise<string>} A Promise that resolves with a JWT token.
 * @throws {Error} If the credentials are invalid.
 */
	static login = async (loginData: LoginData) => {

		// Destructure loginData object
		const { username, password,  email, consumer } = loginData;
 
		let user;
		if(!consumer){
		// Find user by username or email
			user = await utilisateur.findOne({
				attributes: ['id_utilisateur', 'id_role', 'password_utilisateur' ],
				include: [
					{
						model: role,
						as : 'id_role_role',
						attributes: ['id_role', 'libelle_role'],
					
					},
				],
				where: {
					[Op.or]: [
						{ username_utilisateur: username || '' },
						{ mail_utilisateur: email || '' },
					],
				},
			});

		}
		else {
			user = await  Consommateur.findOne({where : {mail_consommateur:email}});

		}
		// Throw error if user not found
		if (!user) {

			throw new Error('Invalid credentials: username or email');
		
		}

		// Check password
		const passwordMatch = await bcrypt.compare(
			password,
			user.password_utilisateur
		);
		if (!passwordMatch) {

			throw new Error('Invalid credentials:password');
		
		}

		// Create JWT
		const token = jwt.sign(
			{ id: user.id_utilisateur, role: user.id_role_role.libelle_role || consumer },
			this.jwtSecret
		);
		const response = {token,name:username ,  role :user?.id_role_role?.libelle_role || consumer };
		return response;

	};


}

export  default  Authentication;