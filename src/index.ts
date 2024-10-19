import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import router from './router';
import database from './db/connector'; // Adjust path as needed
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT as string;

// Middleware setup
const allowedOrigins = [
    'http://localhost:5173',  // Local development
    'https://react-demo-38cb3.web.app', // Production frontend
];

const corsOptions = {
    origin: (origin: string | undefined, callback: (error: Error | null, allow?: boolean) => void) => {
        // Allow requests with no origin (like mobile apps or Postman)
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Allow credentials such as cookies
};

// Apply CORS middleware
app.use(cors(corsOptions));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

// Create HTTP server
const server = http.createServer(app);

// Connect to the database
async function startServer() {
    try {
        await database.connect();
        console.log('Connected to the database');

        // Start the server
        server.listen(port, () => {
            console.log(`Server active on http://localhost:${port}/`);
        });
    } catch (error) {
        console.error('Error connecting to the database:', error);
        process.exit(1); // Exit if the database connection fails
    }
}

// Use the router
app.use('/', router());

// Start the server
startServer();
