const express = require('express');
const cockdb = require('cockroachdb');

import 'dotenv/config'

const app = express();
const pool = new cockdb.Pool(process.env);

app.use(express.json());

app.get('/', (req, res) => {
    console.log(process.env);
    res.send('Route par défaut');
});

app.listen(3000);