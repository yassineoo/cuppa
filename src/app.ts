import express from 'express';
import dotenv from 'dotenv';
import loginRoute from './services/authService/routes/auth.Route';
import paymentRoute from './services/paymentService/routes/payment.Route';
import bodyParser from 'body-parser';
import stripe from './services/paymentService/paymentConfig';
import Stripe from 'stripe';

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

//app.use(bodyParser.urlencoded({ extended: true }));
//app.use('/payment2/webhook', bodyParser.raw({type: '*/*'}));


// Use JSON parser for all non-webhook routes
app.use(
	(
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	): void => {
		if (req.originalUrl === '/payment/webhook') {
			next();
			console.log('hiiiii webhook');
			
		} else {
			console.log('hiiiii other');
			express.json()(req, res, next);
		}
	}
);
  

//app.use(express.json());
app.use('/login', loginRoute);
app.use('/payment', paymentRoute);
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
	res.send('koko');
});

app.listen(PORT, () => {
	console.log(`Application started on this port ${PORT}!`);
});
