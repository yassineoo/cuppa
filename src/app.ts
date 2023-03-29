import express, {Express, Response, Request, NextFunction} from "express"


import distributeursRouter from "./services/service-distributeurs/routes/distributeurs.routes"
const port = 8000

const app : Express = express()

app.use(express.json());


app.get("/", (req : Request, res : Response) => {
    res.send("Hello here is the entry point")
})

app.use('/distributeurs', distributeursRouter);

app.use((req : Request, res : Response) => {
    res.type('text/plain')
    res.status(404)
    res.send('404 not found')
})

app.use((err : Error, req : Request, res : Response) => {
    console.error(err.message)
    res.type('text/plain')
    res.status(500)
    res.send('500 server error')
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})