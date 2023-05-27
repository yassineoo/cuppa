import jwt from 'jsonwebtoken';
import  Authentication from '../../../services/service-authentification/auth';


describe('verifyToken', () => {

	const jwtSecret = 'secret';

	it('should return the decoded token if it is valid', async () => {

		const token = jwt.sign({ id: 'user1',role:'userRole' }, jwtSecret, { expiresIn: '1h' });
		const decodedToken = await Authentication.verifyToken(token);
		expect(decodedToken?.id).toBe('user1');
	
	});

	it('should throw an error if the token is expired', async () => {

		const token = jwt.sign({ username: 'user1' }, jwtSecret, { expiresIn: '-1h' });
		try {

			await Authentication.verifyToken(token);
			fail('Expected an error to be thrown');
		
		} catch (error :any) {

			expect(error.message).toBe('jwt expired');
		
		}
	
	});

	it('should throw an error if the token is invalid', async () => {

		const token = 'invalid_token';
		try {

			await Authentication.verifyToken(token);
			fail('Expected an error to be thrown');
		
		} catch (error :any) {

			expect(error.message).toBe('jwt malformed');
		
		}
	
	});

	it('should rethrow any error that occurs during token verification', async () => {

		spyOn(jwt, 'verify').and.throwError('Something went wrong');
		const token = jwt.sign({ username: 'user1' }, jwtSecret, { expiresIn: '1h' });
		try {

			await Authentication.verifyToken(token);
			fail('Expected an error to be thrown');
		
		} catch (error :any) {

			expect(error.message).toBe('Something went wrong');
		
		}
	
	});

});

