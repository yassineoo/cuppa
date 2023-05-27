import stripe from '../../../services/service-paiement/paymentConfig';

import PaymentService from '../../../services/service-paiement/payment';
import models from '../../../models/sequelize';

const Consommateur = models.consommateur;
const Client = models.client;

describe('Payment Service', () => {
	describe('createAccount', () => {
		let clientId: number;
		let email: string;
		let country: string;
		let fName: string;
		let lName: string;
		let dob: string;
		let phoneNumber: string;
 
		beforeEach(() => {
			clientId = 1;
			email = 'test@example.com';
			country = 'US';
			fName = 'John';
			lName = 'Doe';
			dob = '1990-01-01';
			phoneNumber = '+1 555-555-5555';
		});

		it('should create a Stripe account', async () => {
			spyOn(stripe.accounts, 'create').and.returnValue(
				{ id: 'acct_123' } as any);
				
			spyOn(stripe.accounts, 'createExternalAccount').and.returnValue(
				Promise.resolve({} as any)
			);
			spyOn(stripe.accounts, 'update').and.returnValue(Promise.resolve({} as any));
 
			await PaymentService.createAccount(
				email,
				country,
				clientId,
				fName,
				lName,
				dob,
				phoneNumber,
				
			);
			expect(stripe.accounts.create).toHaveBeenCalledWith({
				country: country,
				type: 'custom',
				capabilities: { card_payments: { requested: true }, transfers: { requested: true } },
				email: email,
			} as any);
		});
		it('should throw an error if Stripe account creation fails', async () => {
			spyOn(stripe.accounts, 'create').and.throwError('Stripe error');
	
			await expectAsync(
				PaymentService.createAccount(
					email,
					country,
					clientId,
					fName,
					lName,
					dob,
					phoneNumber,
					
				)
			).toBeRejectedWithError('Stripe error');
		});
	});
});
