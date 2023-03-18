import { Request, Response } from 'express';
import  Authentication from '../auth';


  
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


 static login = async (req: Request, res: Response) => {
    try {
      const loginData: LoginData = req.body;
      console.log(' .............................done 1');
      
      const token = await  Authentication.login(loginData);
      console.log(' .............................done ');
      res.status(200).json(token)
    } catch (error) {
      if (error.message === 'Invalid credentials:username') {
        res.status(401).json({ message: 'Invalid username or email' });
      } else if (error.message === 'Invalid credentials:password') {
        res.status(401).json({ message: 'Invalid password' });
      } else {
        console.log(error);
        
        res.status(500).json({ error});
      }
    }
  }
}

  
export default LoginController ;
