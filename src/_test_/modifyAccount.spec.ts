
//import { modifyAccount } from '../services/account.management/controllers/account.controller';
import AccountManagmentService from "./../services/account.management/service/account.management";
import Models from './../models/sequelize';
const bcrypt = require('bcrypt');

describe('modifyAccount', () => {

  it('should modify an account if the user is authorized', async () => {

    // Arrange
    const id = '1';
    const body = { username_utilisateur: 'A',password_utilisateur: 'AAA',mail_utilisateur: 'AAA',id_role:1 };
    const role = 'am';
    const modifierRole = 'adm';
    const expectedResponse = { id_utilisateur: '1',  username_utilisateur: 'A',password_utilisateur: 'AAA',mail_utilisateur: 'AAA',id_role:1 };

    // Mock the Models.utilisateur method
    spyOn(Models, 'utilisateur').and.returnValue({
      findOne: () => Promise.resolve({ id_utilisateur: '1', role: 'am' }),
      save: () => Promise.resolve()

    });
      
    //hash the password
    body.password_utilisateur = await bcrypt.hash(body.password_utilisateur, 10);
    expectedResponse.password_utilisateur = body.password_utilisateur;

    // Act
    const response = await AccountManagmentService.modifyAccount(id, body, role, modifierRole);

    // Assert
    expect(response).toEqual(expectedResponse);

  });

  it('should throw an error if the user is not authorized to modify the account', async () => {

    // Arrange
    const id = '123';
    const body = { username_utilisateur: 'AAA',password_utilisateur: 'AAA',mail_utilisateur: 'AAA',id_role:1 };
    const role = 'am';
    const modifierRole = 'ac';
    body.password_utilisateur = await bcrypt.hash(body.password_utilisateur, 10);

    // Mock the Models.utilisateur method
    spyOn(Models, 'utilisateur').and.returnValue({
      findOne: () => Promise.resolve({ id_utilisateur: '123', role: 'am' }),
      save: () => Promise.resolve()
    });

    // Act and Assert
    await expectAsync(AccountManagmentService.modifyAccount(id, body, role, modifierRole)).toBeRejectedWithError('You are not authorized to modify this account');

  });

  it('should throw an error if the account with the given id is not found', async () => {

    // Arrange
    const id = '456';
    const body = { username_utilisateur: 'AAA',password_utilisateur: 'AAA',mail_utilisateur: 'AAA',id_role:1 };
    const role = 'am';
    const modifierRole = 'adm';
    body.password_utilisateur = await bcrypt.hash(body.password_utilisateur, 10);

    // Mock the Models.utilisateur method to return null
    spyOn(Models, 'utilisateur').and.returnValue({
      findOne: () => Promise.resolve(null)
    });

    // Act and Assert
    await expectAsync(AccountManagmentService.modifyAccount(id, body, role, modifierRole)).toBeRejectedWithError(`Account with id ${id} not found`);

  });

});
