
/* eslint-disable @typescript-eslint/no-namespace */
import jwt from 'jsonwebtoken';
import singlton from '../../models/singlton';
import bcrypt from 'bcryptjs';
interface User {
  id: string;
  role: string;
}


declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

  
  interface LoginData {
	username: string;
	password: string;
	role: string;
  }

const sadm = singlton.getSadm();
const adm = singlton.getAdm();
const ac = singlton.getAc();
const am = singlton.getAm();
const decideur = singlton.getDecideur();



class  Authentication {

	private static jwtSecret = process.env.JWT_SECRET || 'secret';


	static verifyToken(token: string): User | null {

		try {

			return  jwt.verify(token, this.jwtSecret) as User;
		
		} catch (error) {

			return null;
		
		}

	}


	static  login = async (loginData: LoginData): Promise<string> => {

		const { username, password, role } = loginData;

		// Find user by username
		let user;

		if (role === 'SuperAdmin') {

			user = await sadm.findOne({ where: { username } });
			if (user) user.id = user.id_adm;
		
		} else if (role === 'Admin') {

			user = await adm.findOne({ where: { username } });
			if (user) user.id = user.id_adm;
		
		} else if (role === 'Commercial') {

			user = await ac.findOne({ where: { username } });
			if (user) user.id = user.id_ac;
		
		} else if (role === 'Maintenance') {

			user = await am.findOne({ where: { username } });
			if (user) user.id = user.id_am;
		
		} else if (role === 'Decider') {

			user = await decideur.findOne({ where: { username } });
			if (user) user.id = user.id_decideur;
		
		}

		if (!user) {

			throw new Error('Invalid credentials:username');
		
		}

		// Check password
		const passwordMatch = await bcrypt.compare(password, user.password);
		if (!passwordMatch) {

			throw new Error('Invalid credentials:password');
		
		}

		// Create JWT
		
		const token = jwt.sign({ id: user.id, role: role }, this.jwtSecret, { expiresIn: '1d' });

		return token;
	
	};


}

export  default  Authentication;