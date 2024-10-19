import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
require('dotenv').config();

const app = express();
app.use(
  cors({
    credentials: true,
  })
);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser());

const server = http.createServer(app);
server.listen(process.env.PORT, () => {
  console.log(`server run on port ${process.env.PORT}`);
});


const MONGO_URL = process.env.ATLAS_HOST
