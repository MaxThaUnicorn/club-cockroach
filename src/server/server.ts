import express from 'express';
import { client, connectDB, disconnectDB } from './db';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from "cors";

dotenv.config();

const app = express();


app.use(cors({
  origin: 'http://localhost:' + process.env.PORT,
  methods: ['GET', 'POST'],
})); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

connectDB();

app.get('/api/data', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error('Erreur:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/positions', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM positions');
    res.json(result.rows);
  } catch (err) {
    console.error('Erreur:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/data', async (req, res) => {
  const { name } = req.body;
  try {
    await client.query('INSERT INTO your_table (name) VALUES ($1)', [name]);
    res.status(201).json({ message: 'Data inserted successfully!' });
  } catch (err) {
    console.error('Erreur:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//Post un message
app.post('/api/createMessage', bodyParser.json(), async (req, res) => {
  let user = req.body.id_user;
  let message = req.body.message;
  try {
    await client.query('INSERT INTO messages (user_id, message) VALUES ($1 , $2)', [user, message]);
    res.status(201).json({ message: 'Data inserted successfully!' });
  } catch (err) {
    console.error('Erreur:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/connexion', bodyParser.json(), async (req, res) => {
    const { username, password } = req.body;
    console.log('Reçu:', { username, password });
  try {
    res.status(201).send({ username, password});
  }catch(err){
    res.status(500).send({ error: 'Internal Server Error' });
  }
  

})

const PORT_API = process.env.PORT_API;
app.listen(PORT_API, () => {
  console.log(`Server running on port ${PORT_API}`);
});

process.on('SIGINT', async () => {
  await disconnectDB();
  process.exit();
});
