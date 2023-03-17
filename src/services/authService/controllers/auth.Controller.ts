import { Request, Response, NextFunction } from 'express';
const  Authentication= require('../auth');

  
interface LoginData {
	username: string;
	password: string;
	userRole: string;
	email:String
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


 static login = async (req: Request, res: Response,next:NextFunction) => {
    try {
      const loginData: LoginData = req.body;
      const token = await  Authentication.login(loginData);
      next();
    } catch (error:any) {
      if (error.message === 'Invalid credentials:username') {
        res.status(401).json({ message: 'Invalid username or email' });
      } else if (error.message === 'Invalid credentials:password') {
        res.status(401).json({ message: 'Invalid password' });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }
}

  
export default LoginController ;
