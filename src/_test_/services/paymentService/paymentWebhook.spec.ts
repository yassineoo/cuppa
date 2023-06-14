

import stripe from '../../../services/service-paiement/paymentConfig';
import PaymentService from '../../../services/service-paiement/payment';
import models from '../../../models/sequelize';
import { buffer } from 'stream/consumers';
import Facture from '../../../services/service-paiement/facture';
const Paiement = models.paiement;

describe('Payment Service', () => {
	describe('handel payment webhook', () => {

		
		/*

		
		it('should handle payment_intent.succeeded event and update database', async () => {
			// Mock webhook event data
			const event = {
				id: 'evt_1234567890',
				type: 'payment_intent.succeeded',
				data: {
					object: {
						id: 'pi_1234567890',
						amount: 1000,
						currency: 'usd',
						customer: 'cus_1234567890',
						metadata: {
							orderId: 1, 
							paymentId: 2,
							customerId:4,
							currency:'dzd'
						}
					}
				}
			};
			const raw =Buffer.from(event.toString()); 
			// Mock webhook signature
			const signature = 'test_signature';
  
  
			// Spy on Stripe API methods
			spyOn(JSON,'parse').and.returnValue(event );
			spyOn(stripe.webhooks, 'constructEvent').and.returnValue(event as any);
			spyOn(Paiement, 'update').and.returnValue(Promise.resolve());
			spyOn(Facture, 'create').and.returnValue('FacurePath');
  
			// Call the handleWebhook method
			await PaymentService.handleWebhook(raw, signature);
  
			// Verify that constructEvent was called with the correct parameters
			/*	expect(stripe.webhooks.constructEvent).toHaveBeenCalledWith(
				raw,
				signature,
				'whsec_VIrLM1dRxjhLMM95LzEocepX1zaEeH48'
			);
			
  
			// Verify that update was called with the correct parameters
		/*	expect(Paiement.update).toHaveBeenCalledWith(
				{ status: 'succeeded' },
				{ where: { id_paiment: 2 } }
			);
			*/
			/*
			expect(Facture.create).toHaveBeenCalledWith(
				'koko','factue','sa','as'
			);
			


  
		});

		

		it('should handle payment_intent.payment_failed event and update database', async () => {
			// Mock webhook event data
			const event = {
				id: 'evt_1234567890',
				type: 'payment_intent.payment_failed',
				data: {
					object: {
						id: 'pi_1234567890',
						amount: 1000,
						currency: 'usd',
						customer: 'cus_1234567890',
						metadata: {
							orderId: 1, 
							paymentId: 2,
							customerId: 4,
							currency:'dzd'
						}
					}
				}
			};
			const raw =Buffer.from(event.toString()); 
          
			// Mock webhook signature
			const signature = 'test_signature';
          
			// Spy on Stripe API methods
			
			spyOn(stripe.webhooks, 'constructEvent').and.returnValue(event as any);
			spyOn(Paiement, 'update').and.returnValue(Promise.resolve() as any);
			spyOn(JSON,'parse').and.returnValue(event as any);
          
			// Call the handleWebhook method
			await PaymentService.handleWebhook(raw, signature);
          
			// Verify that constructEvent was called with the correct parameters
			/*	expect(stripe.webhooks.constructEvent).toHaveBeenCalledWith(
				raw,
				signature,
				'whsec_VIrLM1dRxjhLMM95LzEocepX1zaEeH48'
			);
          */
			// Verify that update was called with the correct parameters
		/*	expect(Paiement.update).toHaveBeenCalledWith(
				{ status: 'failed' },
				{ where: { id_paiment: 2 } }
			);

			
		});
		
  */
	});
});

