import stripe from '../../../services/paymentService/paymentConfig';

import PaymentService from '../../../services/paymentService/payment';
import singleton from '../../../models/singleton';

const Consommateur = singleton.getConsommateur();
const Client = singleton.getClient();

describe('Payment Service', () => {
	describe('createAccount', () => {
		it('should create a new account and update the client record', async () => {
			// Create a spy for the stripe.accounts.create method
			spyOn(stripe.accounts, 'create').and.returnValue(Promise.resolve({ id: 'acct_1234567890', email: 'test@example.com' }) as any);

			// Create a spy for the stripe.tokens.create method
			spyOn(stripe.tokens, 'create').and.returnValue(Promise.resolve({ id: 'tok_1234567890' }) as any);

			// Create a spy for the stripe.accounts.createExternalAccount method
			spyOn(stripe.accounts, 'createExternalAccount').and.returnValue(Promise.resolve() as any);

			// Create a spy for the Client.update method
			spyOn(Client, 'update').and.returnValue(Promise.resolve());

			// Call the createAccount method with a card
			await PaymentService.createAccount('test@example.com', 'US', 1, {
				number: '4242424242424242',
				exp_month: 12,
				exp_year: 2022,
				cvc: '123'
			});

			// Verify that the stripe.accounts.create method was called with the correct parameters
			expect(stripe.accounts.create).toHaveBeenCalledWith({
				country: 'US',
				type: 'custom',
				capabilities: { card_payments: { requested: true }, transfers: { requested: true } },
				email: 'test@example.com'
			} as any);

			// Verify that the stripe.tokens.create method was called with the correct parameters
			expect(stripe.tokens.create).toHaveBeenCalledWith({
				card: {
					number: '4242424242424242',
					exp_month: 12,
					exp_year: 2022,
					cvc: '123'
				}
			} as any);

			// Verify that the stripe.accounts.createExternalAccount method was called with the correct parameters
			expect(stripe.accounts.createExternalAccount).toHaveBeenCalledWith('acct_1234567890', { external_account: 'tok_1234567890' });

			// Verify that the Client.update method was called with the correct parameters
			expect(Client.update).toHaveBeenCalledWith(
				{ receiverId: 'acct_1234567890' },
				{ where: { id: 1 } }
			);
		});

		it('should throw an error if the account creation fails', async () => {
			// Create a spy for the stripe.accounts.create method
			spyOn(stripe.accounts, 'create').and.returnValue(Promise.reject(new Error('Test error')));

			// Call the createAccount method and verify that it throws an error
			await expectAsync(PaymentService.createAccount('test@example.com', 'US', 1, {
				number: '4242424242424242',
				exp_month: 12,
				exp_year: 2022,
				cvc: '123'
			})).toBeRejectedWithError(
				'Test error'
			);
		});
	});
});
