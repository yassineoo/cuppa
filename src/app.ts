import express, {Express, Response, Request} from "express";
import accountRoutes from './services/account.management/routes/account.route';
import notificationRoutes from './services/notification.management/routes/notification.route';

const port = 8000;

const app : Express = express();

app.use(express.json());

app.get("/", (req : Request, res : Response) => {
    res.send("Hello here is the entry point")
});

app.use('/api/account.management', accountRoutes);

app.use('/api/notification.management', notificationRoutes);

app.listen(port, () => {
    console.log(`listening on port ${port}`)
});