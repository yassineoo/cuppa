import  Authentication from '../../../services/authService/auth';
const   jwt =  require ('jsonwebtoken');
import { Sequelize } from 'sequelize-typescript';
import singleton from '../../../models/singleton';
const bcrypt  =  require ('bcryptjs');

const utilisateur = singleton.getUtilisateur();
const role = singleton.getRole();




describe('Authentication',async () => {
   
  interface LoginData {
	username: string;
	password: string;
	userRole: string;
	email:String
  } 
  const mockJwtSecret = 'test-secret';
  const mockUser = {
    id_utilisateur: 1,
    id_role: 1,
    password_utilisateur: 'hashed-password',
  };
  const mockLoginData: LoginData = {
    username: 'testuser',
    password: 'testpassword',
    userRole: 'admin',
    email: 'testuser@example.com',
  };


  describe('login', async() => {
      it('should return a JWT token on successful login', async () => {
      // Mock the Sequelize `findAll` method to return the mock user object
      spyOn(utilisateur, 'findAll').and.returnValue(Promise.resolve([mockUser]));

      // Mock the `compare` method of the `bcrypt` library to always return `true`
      spyOn(bcrypt, 'compare').and.returnValue(Promise.resolve(true));

      // Mock the `sign` method of the `jsonwebtoken` library to return a mock token
      spyOn(jwt, 'sign').and.returnValue('mock-token');

      const token = await Authentication.login(mockLoginData);

      expect(token).toEqual('mock-token');
      expect(utilisateur.findAll).toHaveBeenCalled();
      expect(bcrypt.compare).toHaveBeenCalled();
      expect(jwt.sign).toHaveBeenCalled();
    });

    it('should throw an error with "Invalid credentials:username" message if user does not exist', async () => {
      // Mock the Sequelize `findAll` method to return an empty array
      spyOn(utilisateur, 'findAll').and.returnValue(Promise.resolve(false));

      try {
        await Authentication.login(mockLoginData);
        fail('Expected an error to be thrown');
      } catch (error) {
        expect(error.message).toEqual('Invalid credentials:username');
        expect(utilisateur.findAll).toHaveBeenCalled();
      }
    });

    it('should throw an error with "Invalid credentials:password" message if password is incorrect', async () => {
      // Mock the Sequelize `findAll` method to return the mock user object
      spyOn(utilisateur, 'findAll').and.returnValue(Promise.resolve([mockUser]));

      // Mock the `compare` method of the `bcrypt` library to always return `false`
      spyOn(bcrypt, 'compare').and.returnValue(Promise.resolve(false));

      try {
        await Authentication.login(mockLoginData);
        fail('Expected an error to be thrown');
      } catch (error) {
        expect(error.message).toEqual('Invalid credentials:password');
        expect(utilisateur.findAll).toHaveBeenCalled();
        expect(bcrypt.compare).toHaveBeenCalled();
      }
    });
  });
});
