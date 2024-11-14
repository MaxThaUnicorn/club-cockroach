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

app.post('/api/position', bodyParser.json(), async (req, res) => {
  try {
    await client.query('UPDATE positions SET position_x = ($1), position_y = ($2) WHERE user_id = ($3)', [req.body.position_x, req.body.position_y, req.body.user_id]);
    res.status(201).json({ message: 'Position mise à jour avec succès!' });
  } catch (err) {
    console.error('Erreur:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//Select tous les messages
app.get('/api/messages', async (req, res) => {
  try {
    const result = await client.query('SELECT messages.id, messages.message, messages.user_id, messages.time, users.username FROM messages INNER JOIN users ON messages.user_id = users.id ORDER BY time');
    res.json(result.rows);
  } catch (err) {
    console.error('Erreur:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//Post un message
app.post('/api/createMessage', bodyParser.json(), async (req, res) => {
  let user = req.body.id_user;
  let message = req.body.message;
  let time = req.body.time
  try {
    await client.query('INSERT INTO messages (user_id, message, time) VALUES ($1 , $2, $3)', [user, message, time]);
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
