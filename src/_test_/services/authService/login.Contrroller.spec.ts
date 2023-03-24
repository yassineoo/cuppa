import LoginController from '../../../services/authService/controllers/auth.controller';
import Authentication from '../../../services/authService/auth';
import {Response,Request} from 'express';

let  req: Partial<Request> ;
let  res: Partial<Response> ;


describe('login', () => {
	beforeEach(() => {
		// mohim chofi hna before each i mock it again so each case dos=esnt  effect the other 
		req =  {
			body: {
				username: 'testuser',
				password: 'testpassword',
				role: 'SuperAdmin',
			},
		} ;
		res = {
			status: jasmine.createSpy('status'),
			json: jasmine.createSpy('json')
		};
	});
	

	it('should return a JWT token on successful login', async () => {
   
		spyOn(Authentication, 'login').and.returnValue(Promise.resolve('testtoken'));
  
		await LoginController.login(req as Request, res as Response);
  
		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith('testtoken');
	});

	it('should return a 401 status code for invalid credentials', async () => {
  
		spyOn(Authentication, 'login').and.throwError('Invalid credentials: username or email');
  
		await LoginController.login(req as Request, res as Response);
  
		expect(res.status).toHaveBeenCalledWith(401);
		expect(res.json).toHaveBeenCalledWith({message:'Invalid credentials: username or email'});
	});
  
	it('should return a 500 status code for unexpected errors', async () => {
 
		spyOn(Authentication, 'login').and.throwError('Unexpected error');
  
		await LoginController.login(req as Request, res as Response);

  
		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.json).toHaveBeenCalledWith({error:'Unexpected error'});
	});
    
});
    