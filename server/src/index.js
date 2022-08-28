require('dotenv').config({
    path: './.env'
});
require('./db/db'); //init database connection

const express = require('express');
const rateLimit = require('express-rate-limit');
const MemoryStore = rateLimit.MemoryStore;
const path = require('path');


const PORT = process.env.PORT;

const app = express();

let store = new MemoryStore();
const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 120,
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccesfulRequests: true,
    store,
    message: (req, res) => {
        return JSON.stringify({
            resetTime: store.resetTime,
            window: store.windowMs,
        });
    }
});

app.use(express.static(path.join(__dirname, '../static/')));
app.use(express.json());
app.use('/', require('./routes/pages'));
app.use('/api', limiter, require('./routes/api'));

app.listen(PORT, () => {
    console.info(`Listening on port \x1b[32m\x1b[4m${PORT}\x1b[0m!`);
});