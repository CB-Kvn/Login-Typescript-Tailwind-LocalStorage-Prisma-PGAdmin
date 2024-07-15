import express from "express";
import http from 'http';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";

import { router as authentication } from './src/routes/authentication.routes'


const app = express();

app.use(cors({
    credentials: true,
    origin: true,
    preflightContinue: false,
}));

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: '200mb' }));

//Routes
let url_base = process.env.URL_API
app.use(url_base+"process/",authentication)


const server = http.createServer(app);

let port = process.env.PORT

if (!port) {
    process.exit(1)
}

const PORT: number = parseInt(port as string, 10)

server.listen(PORT, () => {
    console.log('Server running on http://localhost:5000/')
})