import express from 'express';
import PaymentController from '../controllers/payment.Controller';
import Authorization from '../../../middlewares/auth';

const route = express.Router();


/**
 * @route   POST  payment/create-account
 * @desc    Creeate the client account in stripe 
 * @access  SADM 
*/
route.post('/create-account',Authorization(['SADM']), PaymentController.createAccount);

/**
 * @route   POST  payment/create-payment-intent
 * @desc    Creeate the payment and lunch it 
 * @access  Service Commandes
*/
route.post('/create-payment-intent', PaymentController.createPaymentIntent);
/**
 * @route   POST  payment/webhook
 * @desc    Recive the stripe answer about the payment 
 * @access  Service Commandes
*/
route.post('/webhook',express.raw({type: 'application/json'}), PaymentController.handleWebhook);
/**
 * @route   POST  payment/refund
 * @desc    refund the payment  
 * @access  Service Reclamation 
*/
route.post('/refund',PaymentController.refund);
/**
 * @route   POST  payment/refund
 * @desc    refund the payment  
 * @access  Service Reclamation 
*/
route.get('/get-payments/:idConsumer',PaymentController.getPayments);

export default route;