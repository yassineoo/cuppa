import express from 'express';
import dotenv from 'dotenv';
import  loginRoute from './services/authService/routes/auth.Route';
import bodyParser from 'body-parser';

import LoggingService from './services/loggingService/logging';

const loggingService = new LoggingService();


// exemple of test 
loggingService.log(
	'info',
	'Hello distributed log files!',
	{date:'someRandom'}
);
  
import paymentRoute from './services/paymentService/routes/payment.Route';
import parser from './middlewares/parser';

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

// Use JSON parser for all non-webhook routes
app.use(parser);
  

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
