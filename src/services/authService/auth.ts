/* eslint-disable @typescript-eslint/no-namespace */
const   jwt =  require ('jsonwebtoken');
import { Sequelize } from 'sequelize-typescript';
import singleton from '../../models/singleton';
const bcrypt  =  require ('bcryptjs');
interface User {
  id: string;
  role: string;
}


  
  interface LoginData {
	username: string;
	password: string;
	userRole: string;
	email:String
  }



const utilisateur = singleton.getUtilisateur();
const role = singleton.getRole();

class  Authentication {

	private static jwtSecret = process.env.JWT_SECRET || 'secret';


	static verifyToken = async (token: string):Promise<User | null> => {

		try {
			const decodedToken = await jwt.verify(token, this.jwtSecret) ;
	
			// Check if the token has expired
			if (Date.now() >= decodedToken.exp * 1000) {
				throw new Error('Token expired');
			}


	
			// Return the decoded user object if everything is valid
			return decodedToken;
	
		} catch (error) {
			// Return null if there's any error
			throw error;
		}
	
	}
	


	static  login = async (loginData: LoginData): Promise<string> => {

		const { username, password, userRole , email } = loginData;
		
		// Find user by username
		const user = await utilisateur.findAll({
			attributes: ['id_utilisateur', 'id_role','password_utilisateur'], // SELECT id_utilisateur, id_role
			include: {
			  model: role,
			  attributes: [], // Exclude all columns from the Role table except id_role
			  where: { libell_role: userRole } // AND libell_role = userRole
			},
			where: Sequelize.and(
			  Sequelize.or(
				{ username: username }, // (username = username
				{ email: email } // OR email = email)
			  ),
			  Sequelize.where(Sequelize.col('role.id_role'), '=', Sequelize.col('utilisateur.id_role')) // AND utilisateur.id_role = role.id_role
			)
		  });
		  
		if (!user) {

			throw new Error('Invalid credentials:username');
		
		}
		// Check password
		const passwordMatch = await bcrypt.compare(password, user.password_utilisateur);
		if (!passwordMatch) {

			throw new Error('Invalid credentials:password');
		
		}

		// Create JWT
		
		const token = jwt.sign({ id: user.id, role: role }, this.jwtSecret, { expiresIn: '1d' });

		return token;
	
	};


}

export  default  Authentication;