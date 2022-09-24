const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors')
require('dotenv').config({ path: './config/.env' })

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET, HEAD, PUT, PATCH, POST, DELETE',
    'preflightContinue': false
};

app.use(cors(corsOptions));


//Routes
const userRouter = require('./routes/userRouter');
app.use('/api/users', userRouter);

const produitRouter = require('./routes/productRouter');
app.use('/api/products', produitRouter);

const categoryRouter = require('./routes/categoryRouter');
app.use('/api/categories', categoryRouter);

const loginRouter = require('./routes/LoginRouter');
app.use('/api/user/login', loginRouter);

app.listen(process.env.PORT, () => console.log('Le serveur démarre sur le port : ', process.env.PORT));