import express from 'express';
import { client, connectDB, disconnectDB } from './db';
import dotenv from 'dotenv';
import cors from "cors";
dotenv.config();

const app = express();


app.use(cors); 
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

app.post('/api/connexion', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  res.status(201).json({ username, password});

})

const PORT_API = process.env.PORT_API;
app.listen(PORT_API, () => {
  console.log(`Server running on port ${PORT_API}`);
});

process.on('SIGINT', async () => {
  await disconnectDB();
  process.exit();
});
