const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Bonjour, je suis Félix Barré. Bienvenue sur mon application avec Node.Js');
});

app.listen(3000, () => console.log('Mon app écoute bien sur le port 3000.'));
/*
import express from "express";
import cockroachdb from "cockroachdb";

import 'dotenv/config'

const app = express();
const pool = new cockroachdb.Pool(process.env);

app.use(express.json());

app.get('/', (req, res) => {
    console.log(process.env);
    res.send('Route par défaut');
});

app.listen(3000);
*/