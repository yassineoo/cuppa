import { Request,Response,NextFunction } from 'express';
import express  from 'express';
const parser = (req:Request,res:Response,next:NextFunction) => {
	if (req.originalUrl == '/payment/webhook'){
		next();
		console.log('--------------------------------------------------');
		console.log(req.originalUrl);

		console.log('webhook');
		console.log('--------------------------------------------------');
		
		
	}
	else {
		express.json()(req, res, next);
		console.log('--------------------------------------------------');

		console.log(req.originalUrl);
		console.log('others');
		console.log('--------------------------------------------------');
		
	}

};
export default parser;