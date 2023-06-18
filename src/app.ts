import express ,{ Response, Request}from 'express';




import dotenv from 'dotenv';
import  loginRoute from './services/service-authentification/routes/auth.Route';
import paymentRoute from './services/service-paiement/routes/payment.Route';
import parser from './middlewares/parser';
import LoggingService from './services/service-logging/logging';
import reclamation from './services/service-reclamation/routes/routes.reclmation'

import distributeursRouter from './services/service-distributeurs/routes/distributeurs.routes';
import commandesRouter from './services/service-commandes/routes/commandes.routes';
import maintenanceRouter from "./services/service-maintenance/routes/maintenance.routes";
import accountRoutes from './services/account.management/routes/account.route';
import notificationRoutes from './services/notification.management/routes/notification.route';
import advertisementRoutes from './services/advertisement.management/routes/advertisement.route';
import drinksRouter from './services/service-boissons/routes/boissons.routes'
import cors from 'cors';
import { Socket } from 'socket.io';


const WebSocket = require('ws');


const socketIo = require('socket.io');
const http = require('http');

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

const port = 5000;

const server = http.createServer(app)
const io = socketIo(server);
app.use(express.static('src/uploads'));
// Use JSON parser for all non-webhook routes
app.use(parser);
app.use(cors());

//app.use(express.json());
app.use('/login', loginRoute);
app.use('/payment', paymentRoute);
app.use('/reclamation', reclamation);
app.use(express.urlencoded({ extended: false }));


app.use('/api/account.management', accountRoutes);
app.use('/api/ads',advertisementRoutes);
app.use('/api/notification.management', notificationRoutes);




app.use('/distributeurs', distributeursRouter);
app.use('/boissons', drinksRouter);
app.use('/commandes', commandesRouter);

app.use('/images', express.static("./images"));


app.get('/ko', (req : Request, res : Response) => {
	res.send('Hello here is the entry point');
});


app.get('/', (req : Request, res : Response) => {
	res.send('Hello here is the entry point');
});













const clients: { client: Socket; idCommand: number }[] = [];

let client1;

//channel 
io.on("connection",(client)=>{
  console.log("new client connected!")
       console.log(client.id)
      //  client.emit('msg', "OK")
      console.log(client);
	  client1 =client;
	  client.on('id_command',(data) =>{
         console.log(data);
		 let y = {client :client1 , idCommand : Number (data)} as any;
		 clients.push(y)
		 
	  })
	
      
}) 


app.get('/confirme/:orderId', (req, res) => {
	const orderId =Number (req.params.orderId);
	let foundClient ;
  
	for (const clientData of clients) {
	  if (clientData.idCommand == orderId) {
		foundClient = clientData.client;
		break;
	  }
	}
  
	if (foundClient) {
	  // Emit the 'msg' event with the "OK" message to the found client
	  foundClient.emit('msg', 'OK');
	  res.send('Message sent');
	} else {
	  res.send('No client connected with the given order ID');
	}
  });
  


server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
