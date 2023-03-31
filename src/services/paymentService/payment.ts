import stripe from './paymentConfig';
import singleton from '../../models/singleton';


const Consommateur = singleton.getConsommateur();
const Client = singleton.getClient();
const Paiement = singleton.getPaiement();

class PaymentService {
	/**
	 * Creates a new custom account for a seller using the Stripe API.
	* @param {string} email - The email address associated with the seller's account.
	* @param {string} country - The ISO country code for the country in which the seller is located.
	* @param {number} clientId - The ID of the client associated with the seller's account.
	* @returns {Promise<void>} - A Promise that resolves with the created account object or rejects with an error.
	* @throws {Error} - If the account creation request fails, an error will be thrown with the error message.
	*/

	static createAccount = async (email, country, clientId, card) => {
		try {
		// Create the Stripe account with the provided email and country
			const account = await stripe.accounts.create({
				country: country,
				type: 'custom',
				capabilities: {card_payments: {requested: true}, transfers: {requested: true}},
				email: email,
			});
			console.log('Test account created:', account);
 
			// Attach the card to the Stripe account
			const cardToken = await stripe.tokens.create({ card: card });
			await stripe.accounts.createExternalAccount(account.id, { external_account: cardToken.id });

			// Update the client record with the Stripe account ID
			await Client.update(
				{ receiverId: account.id },
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
					throw new Error(`Customer with id ${customerId} not found`);
				}
				paymentId = customer.paymentMethodId;
			}
			else {
				await Consommateur.update(
					{ paymentMethodeId: paymentMethodId },
					{ where: { id: customerId } }
				);
			}

			const payment = Paiement.create({date_paiement:new Date().toLocaleDateString() ,heure_paiement : new Date().toLocaleTimeString(),  id_cmd :orderId });
	
			
		
			const paymentIntent = await stripe.paymentIntents.create({
				amount,
				currency,
				payment_method:paymentId,
				transfer_data: {
					destination: seller_account_id,
				},
				metadata: {
					paymentId: payment.id_paiement,
					orderId ,
					customerId
					// Add your payment ID here
				},

			}, {
				stripe_account: 'acct_1MoidVHNNef0nI46',
			});

		
			return paymentIntent.client_secret;

		} catch (error) {
			//			console.log(error);
			throw new Error(error.message);
		}
	};

	static  handleWebhook = async (event,signature) => {
		try {
		// Verify the webhook signature to ensure it was sent by Stripe
			const verifiedEvent = stripe.webhooks.constructEvent(event, signature, 'your_webhook_secret');

			// Handle the event based on its type
			switch (verifiedEvent.type) {
			case 'payment_intent.succeeded':


				
				// Payment succeeded, update your database and send notification to cammand service
				Paiement.update({ statut_paiement: 'succeeded' },
					{ where: { id_paiment: event.data.object.metadata.paymentId} });

				break;
			case 'payment_intent.payment_failed':
			// Payment failed, handle errors and notify the customer
				Paiement.update({ statut_paiement: 'failed' },
					{ where: { id_paiment: event.data.object.metadata.paymentId} });

				break;
			default:
				console.log(`Unhandled event type ${verifiedEvent.type}`);
			}
		} catch (err) {
			console.error(`Error handling webhook: ${err}`);
			throw new Error(`Webhook Error: ${err.message}`);
		}
	};

}


export default PaymentService;
