import express, {Express, Response, Request} from "express";
import accountRoutes from './services/account.management/routes/account.route';

const port = 8000;

const app : Express = express();

app.get("/", (req : Request, res : Response) => {
    res.send("Hello here is the entry point")
});

app.use('/api/account.management', accountRoutes);

app.listen(port, () => {
    console.log(`listening on port ${port}`)
});