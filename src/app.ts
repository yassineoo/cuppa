import express ,{Express, Response, Request, NextFunction}from 'express';
import dotenv from 'dotenv';
import  loginRoute from './services/authService/routes/auth.Route';
import paymentRoute from './services/paymentService/routes/payment.Route';
import parser from './middlewares/parser';
import LoggingService from './services/loggingService/logging';


import distributeursRouter from './services/service-distributeurs/routes/distributeurs.routes';
import commandesRouter from './services/service-commandes/routes/commandes.routes';


import accountRoutes from './services/account.management/routes/account.route';
import notificationRoutes from './services/notification.management/routes/notification.route';

const loggingService = new LoggingService();


// exemple of test 
loggingService.log(
	'info',
	'Hello distributed log files!',
	{date:'someRandom'}
);
  


dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

// Use JSON parser for all non-webhook routes
app.use(parser);
  

//app.use(express.json());
app.use('/login', loginRoute);
app.use('/payment', paymentRoute);
app.use(express.urlencoded({ extended: false }));


app.use('/api/account.management', accountRoutes);

app.use('/api/notification.management', notificationRoutes);
app.get('/', (req, res) => {
	res.send('koko');
});



app.get('/', (req : Request, res : Response) => {
	res.send('Hello here is the entry point');
});

app.use('/distributeurs', distributeursRouter);

app.use('/commandes', commandesRouter);

app.use((req : Request, res : Response) => {
	res.type('text/plain');
	res.status(404);
	res.send('404 not found');
});

app.use((err : Error, req : Request, res : Response) => {
	console.error(err.message);
	res.type('text/plain');
	res.status(500);
	res.send('500 server error');
});



app.listen(PORT, () => {
	console.log(`Application started on this port ${PORT}!`);
});