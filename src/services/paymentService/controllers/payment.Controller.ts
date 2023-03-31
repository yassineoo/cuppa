/* eslint-disable @typescript-eslint/no-namespace */
import { Request, Response } from 'express';
import PaymentService from '../payment';

class PaymentController {

	/**

		Create Stripe account endpoint that creates a new Stripe account.
		@param {Object} req - The HTTP request object.
		@param {Object} res - The HTTP response object.
		@returns {Promise<void>} - A Promise that resolves with the newly created account object or rejects with an error.
		@throws {Error} - Throws an error if the Stripe API key is invalid or if there is an error creating the account.
	*/
	static createAccount = async (req : Request, res : Response) => {
		try {
			const { email, country , clientId,card } = req.body;
			const account = await PaymentService.createAccount(email, country,clientId,card);
			res.status(200).json({ success: true, data: account });
		} catch (error) {
			res.status(500).json({ success: false, error: error.message });
		}
	};

	static createPaymentIntent = async (req : Request, res : Response) => {
		try {
			const paymentIntent = await PaymentService.createPaymentIntent(req.body);
			res.status(200).json({ paymentIntent });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Failed to create payment intent' });
		}
	};


	static  handleWebhook = async (req, res) =>  {
		try {
			const event = req.body;
			const signature = req.headers['stripe-signature'];
			await PaymentService.handleWebhook(event,signature);
			res.status(200).send();
		} catch (err) {
			console.error(`Error handling webhook: ${err}`);
			res.status(400).send(`Webhook Error: ${err.message}`);
		}
	};







}

  
export default PaymentController ;
