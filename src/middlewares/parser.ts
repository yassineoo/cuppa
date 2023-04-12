import { Request,Response,NextFunction } from 'express';
import express  from 'express';
const parser = (req:Request,res:Response,next:NextFunction) => {
	if (req.originalUrl == 'payment/webhook'){
		next();
	}
	else {
		express.json();
		next();

	}

};
export default parser;