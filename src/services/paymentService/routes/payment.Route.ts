import express from 'express';
//import Authorization from '../../../middlewares/auth';
//import LoginController from '../controllers/auth.Controller';
import PaymentService from '../payment';
import Stripe from 'stripe';
import PaymentController from '../controllers/payment.Controller';
import stripe from '../paymentConfig';


const route = express.Router();
// route for testing 
route.get('/', (req,res) => res.send('login'));


/**
 * @route   POST api/login
 * @desc    Login a user and return a JWT token
 * @access  Public
*/


route.post('/create-account', PaymentController.createAccount);
route.post('/create-payment-intent', PaymentController.createPaymentIntent);
route.post('/webhook',express.raw({type: 'application/json'}), PaymentController.handleWebhook);

  
  


export default route;