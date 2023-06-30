import stripe from '../../../services/service-paiement/paymentConfig';
import PaymentService from '../../../services/service-paiement/payment';
import modles from '../../../models/sequelize';

const Consommateur = modles.consommateur;
const Paiement = modles.paiement;

describe('Payment Service', () => {
	describe('createPaymentIntent', () => {
		it('should create a new PaymentIntent and return it if the payment methode is set ', async () => {
			// Mock data for the function call
			const data = {
				amount: 1000,
				currency: 'usd',
				paymentMethodId: 'pm_1234567890',
				customerId: '1',
				seller_account_id: 'acct_1234567890',
				orderId: 1,
			};

			// Create a spy for the stripe.paymentIntents.create method
			spyOn(stripe.paymentIntents, 'create').and.returnValue(
				Promise.resolve({ client_secret: 'pi_1234567890'  }) as any
			);

			// Mock the Consommateur.findByPk method to return a customer with paymentMethodId
			spyOn(Consommateur, 'update').and.returnValue(
				Promise.resolve()
			);

			// Mock the Paiement.create method
			spyOn(Paiement, 'create').and.returnValue(
				{ id_paiement: 1 } );

			// Call the createPaymentIntent method
			const paymentIntent = await PaymentService.createPaymentIntent(data);

			// Verify that the Consommateur has been updated correctly
			expect(Consommateur.update).toHaveBeenCalledWith(
				{ payment_method_id: data.paymentMethodId },
				{ where: { id: data.customerId } });

			// Verify that the stripe.paymentIntents.create method was called with the correct parameters
			expect(stripe.paymentIntents.create).toHaveBeenCalledWith({
				amount: data.amount,
				currency: data.currency,
				payment_method: data.paymentMethodId,
				metadata: {
					paymentId: 1,
					orderId:data.orderId  ,
					customerId:data.customerId
					// Add your payment ID here
				},
				transfer_data: {
					destination: data.seller_account_id,
				},
			}, {
				stripe_account: 'acct_1MoidVHNNef0nI46',
			});

			// Verify that the Paiement.create method was called with the correct parameters
			expect(Paiement.create).toHaveBeenCalledWith({
				date_paiement: jasmine.any(String),
				heure_paiement: jasmine.any(String),
				id_cmd: 1,
			});

			// Verify that the paymentIntent object is returned
			expect(paymentIntent).toEqual( 'pi_1234567890' );
		});

		it('should create a new PaymentIntent and return it if the payment method is not set', async () => {
			// Mock data for the function call
			const data = {
				amount: 1000,
				currency: 'usd',
				customerId: '1',
				seller_account_id: 'acct_1234567890',
				orderId: 1,
			};
		
			// Mock the Consommateur.findByPk method to return a customer with paymentMethodId
			spyOn(Consommateur, 'findByPk').and.returnValue(
			Promise.resolve({
				paymentMethodId: 'pm_1234567890',
			}) as any
			);
		
			// Create a spy for the stripe.paymentIntents.create method
			spyOn(stripe.paymentIntents, 'create').and.returnValue(
			Promise.resolve({ client_secret: 'pi_1234567890' }) as any
			);
		
			// Mock the Paiement.create method
			spyOn(Paiement, 'create').and.returnValue({ id_paiement: 1 }  
			);
		
			// Call the createPaymentIntent method
			const paymentIntent = await PaymentService.createPaymentIntent(data);
		
			// Verify that the Consommateur.findByPk method was called with the correct parameters
			expect(Consommateur.findByPk).toHaveBeenCalledWith(data.customerId);
		
			// Verify that the stripe.paymentIntents.create method was called with the correct parameters
			expect(stripe.paymentIntents.create).toHaveBeenCalledWith(
				{
					amount: data.amount,
					currency: data.currency,
					payment_method: 'pm_1234567890',
					metadata: {
						paymentId: 1,
						orderId:data.orderId  ,
						customerId:data.customerId
						// Add your payment ID here
					},
					transfer_data: {
						destination: data.seller_account_id,
					},
				},
				{
					stripe_account: 'acct_1MoidVHNNef0nI46',
				}
			);
		
			// Verify that the Paiement.create method was called with the correct parameters
			expect(Paiement.create).toHaveBeenCalledWith({
				date_paiement: jasmine.any(String),
				heure_paiement: jasmine.any(String),
				id_cmd: 1,
			});
		
			// Verify that the paymentIntent object is returned
			expect(paymentIntent).toEqual('pi_1234567890');
		});

		it('should throw an error if the customer does not exist', async () => {
			// Mock data for the function call
			const data = {
				amount: 1000,
				currency: 'usd',
				paymentMethodId: null,
				customerId: '1',
				seller_account_id: 'acct_1234567890',
				orderId: 1,
			
			};
		
			// Mock the Consommateur.findByPk method to return null
			spyOn(Consommateur, 'findByPk').and.returnValue(Promise.resolve(null));
		
			// Call the createPaymentIntent method and expect it to throw an error
			await expectAsync(PaymentService.createPaymentIntent(data)).toBeRejectedWithError(
				`Customer with id ${data.customerId} not found`
			);
		
			// Verify that the Consommateur.findByPk method was called with the correct parameter
			expect(Consommateur.findByPk).toHaveBeenCalledWith(data.customerId);
		
		});

	
    
	});



	
});