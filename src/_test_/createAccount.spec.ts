
//import { createAccount } from '../services/account.management/controllers/account.controller';
import AccountManagmentService from "./../services/account.management/service/account.management";
const bcrypt = require('bcrypt');

describe('createAccount', () => {
  let req:any;
  let res:any;
  let statusSpy:any;
  let jsonSpy:any;

  beforeEach(() => {
    req = {
      params: {
        role: 'adm'
      },
      user: {
        id: '123',
        role: 'sadm'
      },
      body: {
        id_utilisateur: '13',
        username_utilisateur: 'A',
        password_utilisateur: 'AAA',
        mail_utilisateur: 'AAA',
        id_role:1
      }
    };
    statusSpy = jasmine.createSpy('status');
    jsonSpy = jasmine.createSpy('json');
    res = {
      status: statusSpy.and.returnValue({ json: jsonSpy }),
      json: jsonSpy
    };
  });

  it('should create account successfully for sadm user and adm role', async () => {
     //hash the password with bcrypt
     req.body.password_utilisateur =  await bcrypt.hash('AAA', 10);
     const createAccountMessage = await AccountManagmentService.createAccount(req.body, req.params.role, req.user.id, req.user.role);
    
     // Assert
     expect(createAccountMessage).toEqual({ message: `Account created successfully` });
  });

  
});
