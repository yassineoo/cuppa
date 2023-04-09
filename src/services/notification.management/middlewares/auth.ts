/* eslint-disable @typescript-eslint/no-namespace */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
const Singlton = require('./../../../models/singlton');
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




const Authorization = (allowedRoles: string[]) => {

	return async (req: Request, res: Response, next: NextFunction) => {

		try {
     
			const token = req.header('Authorization')?.replace('Bearer ', '');


			
			if (!token) {

				res.status(401);
				return res.json({ error: 'Access denied. No token provided.' });
			
			}
   

			const decoded = jwt.verify(token,'secret') as User;
      
			req.user = {id:decoded.id,role:decoded.role};

			if (!allowedRoles.includes(decoded.role)) {

				res.status(403);
				return res.json({ error: 'Access denied. You are not authorized to access this resource.' });
			
			}

			next();
		
		} catch (error) {

			res.status(500);
			return res.json({ error: 'Access denied. Invalid token.' });
		
		}
	
	};

};


export {Authorization};