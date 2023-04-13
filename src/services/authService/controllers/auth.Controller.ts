/* eslint-disable @typescript-eslint/no-namespace */
import { Request, Response } from 'express';
import  Authentication from '../auth';


  
interface LoginData {
	username: string;
	password: string;
	userRole: string;
	email:string
  }

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

class LoginController {


	/**
 * Login endpoint that verifies user credentials and returns a JWT token.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {Promise<void>} - A Promise that resolves with the token or rejects with an error.
 */
	static login = async (req:Request, res:Response) => {

		try {
            console.log(req.body);
			// Extract login data from the request body
			const loginData :LoginData = req.body;

			// Attempt to login and retrieve a JWT token
			const token = await Authentication.login(loginData);
			
			// Send the token back in the response
			res.status(200);
			return res.json(token);
		
		} catch (error) {

			// Handle any errors that occur during the login process
			if (error.message === 'Invalid credentials: username or email') {
				res.status(401);
				return res.json({ message: 'Invalid credentials: username or email' });
			
			} else if (error.message === 'Invalid credentials:password') {

				res.status(401);
				return res.json({ message: 'Invalid password' });
			
			} else {

				//	console.log(error);
				res.status(500);
				res.json({ error:error.message });
			
			}
		
		}

	};






}

  
export default LoginController ;