import express ,{ Response, Request}from 'express';


import { body, validationResult } from "express-validator";
import { WebSocketServer } from "ws";



import dotenv from 'dotenv';
import  loginRoute from './services/service-authentification/routes/auth.Route';
import paymentRoute from './services/service-paiement/routes/payment.Route';
import parser from './middlewares/parser';
import LoggingService from './services/service-logging/logging';
import reclamation from './services/service-reclamation/routes/routes.reclmation'
import maintenanceRouter from "./services/service-maintenance/routes/maintenance.routes";

import distributeursRouter from './services/service-distributeurs/routes/distributeurs.routes';
import commandesRouter from './services/service-commandes/routes/commandes.routes';
import accountRoutes from './services/account.management/routes/account.route';
import notificationRoutes from './services/notification.management/routes/notification.route';
import advertisementRoutes from './services/advertisement.management/routes/advertisement.route';
import cors from 'cors';
import boissonRouter from './services/service-boissons/routes/boissons.routes';

const loggingService = new LoggingService();


// exemple of test 
loggingService.log(
    'info',
    'Hello distributed log files!',
    {date:'someRandom'}
);
  


dotenv.config();
//const PORT = process.env.PORT || 5000;
const app = express();

const port = 5000;

/*const server = http.createServer(app)
const io = socketIo(server);*/
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
app.use('/boissons',boissonRouter)
app.use('/commandes', commandesRouter);
app.use('/maintenance', maintenanceRouter);




app.get('/', (req : Request, res : Response) => {
    res.send('Hello here is the entry point');
});

//const PORT: number = parseInt(process.env.PORT as string, 10);
const server = app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});

 // WebSocket server
 const wss = new WebSocketServer({ server });

 console.log(`WebSocket server listening on port ${port}`);
  
 // Keep track of WebSocket connections and their idCommands
 const clients = new Map();
 
 wss.on("connection", (ws) => {
    ws.on("message", (data) => {
      console.log(data); // Assuming 'data' is the received message
      const messageString = data.toString();
      const messageJSON = JSON.parse(messageString);
      console.log(messageJSON);
  
      // Extract the idCommand from the received message
      const idCommand = messageJSON.id_command;
  
      // Store the WebSocket connection with its idCommand
      clients.set(idCommand, ws);
 
    });

  
    ws.send("hello you :) !");
  
    // Clean up the WebSocket connection and remove the client from the map when the WebSocket connection is closed
    ws.on("close", () => {
      // Find and remove the client from the map
      clients.forEach((client, key) => {
        if (client === ws) {
          clients.delete(key);
        }
      });
  
      console.log("Disconnected from WebSocket server");
    });
  });

  app.post("/test/:orderId", (request: Request, response: Response) => {
    const idCommand  = request.params.orderId;
  
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
  
    try {
      
      const data = {
        idCommand,
      };
  
      // Get the WebSocket connection for the specified idCommand
      const client = clients.get(idCommand);
  
      if (client) {
        // Convert the data to JSON string and send it to the client
        client.send(JSON.stringify(data));
      }
  
      return response
        .status(200)
        .json({ message: "ok" });
    } catch (error: any) {
      return response.status(500).json({ error: error.message });
    }
  });
