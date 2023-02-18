import env from './middleware/dotenv.js';
import sequelize from './models/database.js';
import bodyParser from 'body-parser';
import user from './routes/user.js';
import express from "express";
import helmet from "helmet";

const app = express();

// All Used External Middlewares
app.use('/static', express.static('public'))
app.use(bodyParser.json());
app.use(helmet());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// All Express Routes
app.use('/user', user);

app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    res.status(status).json({ message: error.message, data: error.data });
});

sequelize
    .sync()
    .then(() => {
        app.listen(env.PORT, () => console.log(`Server started on port ${env.PORT}`)); 
    })
    .catch(err => {
        console.log(err);
    });







