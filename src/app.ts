import express, {Express, Response, Request} from "express"

const port = 8000

const app : Express = express()

app.get("/", (req : Request, res : Response) => {
    res.send("Hello here is the entry point")
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})