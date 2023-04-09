
//import { deleteAccount } from '../services/account.management/controllers/account.controller';
import AccountManagmentService from "./../services/account.management/service/account.management";


describe('deleteAccount method', () => {

  it('should throw an error if account is not found', async () => {
    // Arrange
    const id = '2';
    const role = 'adm';
    const user = 'sadm';

    // Act & Assert
    await expectAsync(AccountManagmentService.deleteAccount(id, role, user)).toBeRejectedWithError(`Account with id ${id} not found`);
  });

  it('should delete account successfully for sadm user and adm role', async () => {
    const id = '1';
    const role = 'adm';
    const user = 'sadm';
    

    // Act
    const result = await AccountManagmentService.deleteAccount(id, role, user);

    // Assert
    expect(result.message).toBe(`Account with id ${id} deleted successfully`);

  
  });

  it('should delete account successfully for adm user and authorized role', async () => {
    // Arrange
    const id = '1';
    const role = 'am';
    const user = 'adm';

    // Act
    const result = await AccountManagmentService.deleteAccount(id, role, user);

    // Assert
    expect(result).toEqual({ message: `Account with id ${id} deleted successfully` });
  });
});
