import stripe from './paymentConfig';
//import Stripe from 'stripe';


import models from '../../models/sequilize';
import Facture from './facture';


const Consommateur = models.consommateur;
const Client = models.client;
const Paiement = models.paiement;

class PaymentService {
	/**
		* Creates a new custom account for a seller using the Stripe API.
		* @param {string} email - The email address associated with the seller's account.
		* @param {string} country - The ISO country code for the country in which the seller is located.
		* @param {number} clientId - The ID of the client associated with the seller's account.
		* @param {string} fName - The first name of the seller.
		* @param {string} lName - The last name of the seller.
		* @param {object} dob - The date of birth of the seller, in the format {day: number, month: number, year: number}.
		* @param {string} phoneNumber - The phone number of the seller, including the country code.
		* @returns {Promise<void>} - A Promise that resolves with the created account object or rejects with an error.
		* @throws {Error} - If the account creation request fails, an error will be thrown with the error message.
		*/

	static createAccount = async (email, country, clientId, fName,lName,dob,phoneNumber) => {
		try {	
			const account = await stripe.accounts.create({
				country: country,
				type: 'custom',
				capabilities: {card_payments: {requested: true}, transfers: {requested: true}},
				email: email,
			});
			
			
			const bankAccountToken = await stripe.tokens.create({
				bank_account: {
					country: 'US',
					currency: 'usd',
					account_holder_name: `${fName} ${lName}`,
					account_holder_type: 'individual',
					routing_number: '110000000',
					account_number: '000123456789',
			
				}
			});
			console.log(bankAccountToken);
	
			await stripe.accounts.createExternalAccount(
				account.id,
				{ external_account: bankAccountToken.id });

			

			// Update the account with additional information
			await stripe.accounts.update(account.id, {

				tos_acceptance: {date: Math.floor(Date.now() / 1000), ip: '8.8.8.8'},
				// Replace with the information you want to add to the account
				business_type: 'individual',
				business_profile: {
					url: 'https://cuppa.com', // Replace with the company website URL
					
					mcc: '7299', // Replace with the business category code (MCC) that corresponds to the business category you want to set
					name: `${fName} ${lName}`,
				},
				individual: {
					first_name: fName,
					last_name: lName,
					email: email,
					address: {
						line1: '123 Rue de la Paix',
						line2: 'Appartement 1',
						city: 'Paris',
						state: '',
						postal_code: '75008',
						country: 'FR',
					},
					dob:dob,
					
					phone: phoneNumber,
				
				},
				
			});
			
			// Update the client record with the Stripe account ID
			await Client.update(
				{ externel_account_id: account.id },
				{ where: { id: clientId } }
			);
		} catch (error) {
			//console.log(error);
			throw new Error(error.message);
		}
	};

	
	static  createPaymentIntent = async (data) => {
		
		try {

	
		
			const { amount, currency, paymentMethodId, customerId ,seller_account_id ,orderId } = data;

			let paymentId = paymentMethodId;
			// If paymentMethodId is not set, it's the first payment of the customer.
			// We need to create a new PaymentMethod and attach it to the customer.
			if (!paymentMethodId) {
				// Retrieve the customer from our local database.
				const customer = await Consommateur.findByPk(customerId);
				if (!customer) {
					//throw new Error(`Customer with id ${customerId} not found`);
				}
				paymentId = customer.payment_method_id;
			}
			else {
				await Consommateur.update(
					{ payment_method_id: paymentMethodId },
					{ where: { id: customerId } }
				);
			}

			//const payment = Paiement.create({date_paiement:new Date().toLocaleDateString() ,heure_paiement : new Date().toLocaleTimeString(),  id_cmd :orderId });
			/*
			for testing */
			const paymentMethodo = await stripe.paymentMethods.create({
				type: 'card',
				card: {
					number: '4242424242424242',
					exp_month: 12,
					exp_year: 2024,
					cvc: '123',
				},
			});
			
		
			const paymentIntent = await stripe.paymentIntents.create({
				amount,
				currency,
				payment_method:paymentMethodo.id,
				confirmation_method: 'manual',
				on_behalf_of: seller_account_id,
				transfer_data: {
					destination: seller_account_id,
				},
				metadata: {
					paymentId: 1,
					orderId ,
					customerId

					// Add your payment ID here
				},

			}, {
				stripeAccount: 'acct_1MoidVHNNef0nI46',
			});
			const paymentIntentoio = await stripe.paymentIntents.confirm(paymentIntent.id);

		
			return paymentIntent.client_secret;

		} catch (error) {
			//			console.log(error);
			throw new Error(error.message);
		}
	};

	static  handleWebhook = async (event,signature) => {
		try {
     
			// Verify the webhook signature to ensure it was sent by Stripe
			const verifiedEvent = stripe.webhooks.constructEvent(event, signature, 'whsec_VIrLM1dRxjhLMM95LzEocepX1zaEeH48');
			const jsonString = event.toString();
			const objEvent = JSON.parse(jsonString);
			let facturePath;
			
			// Handle the event based on its type
			switch (verifiedEvent.type) {
			case 'payment_intent.succeeded':
						
				// Payment succeeded, update your database and send notification to cammand service
				Paiement.update({ status: 'succeeded' },
					{ where: { id_paiment: objEvent.data.object.metadata.paymentId} });
				// get the customer Info 
				//Consommateur.findByPk(objEvent.data.object.metadata.customerId);
				
				Facture.create('sda','asd','asda','asd');
				//facturePath = Facture.create(Consommateur.name ,'Facture for coffee',objEvent.data.object.metadata.amount,'koko');
				//send it to the user via notif 
				// notif.send(facturePath)
				break;
			case 'payment_intent.payment_failed':
			// Payment failed, handle errors and notify the customer
				Paiement.update({ status: 'failed' },
					{ where: { id_paiment: objEvent.data.object.metadata.paymentId} });

				break;
		
			}
		} catch (err) {
			console.error(`Error handling webhook: ${err}`);
			throw new Error(`Webhook Error: ${err.message}`);
		}
	};


	static  refundPayment = async (paymentId, amount,reason) =>  {
		
		try {
			const paiement = Paiement.findByPk(paymentId);
			
			const payment = await stripe.refunds.create({
				payment_intent: paiement.paymentIntentId,
				amount,
				reason
			});
			
			// Retrieve all transfers associated with PaymentIntent using transfer_group
			const transfers = await stripe.transfers.list({ transfer_group: `group_${paiement.paymentIntentId}`  });
			console.log(transfers);


			// Reverse the transfer
			const reversal = await stripe.transfers.createReversal(
				transfers.data[0].id,
				{ 
					description: `Reversal for transfer (${reason})`,
					refund_application_fee: true // whether to refund the application fee as well
				}
			);
			return payment;
		}
		catch (error) {
		//	console.error(error);
			throw new Error('Error processing refund');
		}
	};

}


export default PaymentService;
