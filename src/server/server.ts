import express from 'express';
import { client, connectDB, disconnectDB } from './db';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from "cors";
import bcrypt from "bcrypt";

dotenv.config();

const app = express();


app.use(cors({
  origin: 'http://localhost:' + process.env.PORT,
  methods: ['GET', 'POST', 'DELETE'],
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
    const result = await client.query('SELECT * FROM positions WHERE user_id = ($1)', [req.body.user_id]);

    if (result.rowCount > 0) {
      await client.query('UPDATE positions SET position_x = ($1), position_y = ($2) WHERE user_id = ($3)', [req.body.position_x, req.body.position_y, req.body.user_id]);
      res.status(201).json({ message: 'Position mise à jour avec succès!' });
    }
    else {
      await client.query('INSERT INTO positions (position_x, position_y, user_id) VALUES ($1, $2, $3)', [req.body.position_x, req.body.position_y, req.body.user_id]);
      res.status(201).json({ message: 'Position mise à jour avec succès!' });
    }
  } catch (err) {
    console.error('Erreur:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//Select tous les messages
app.get('/api/messages', async (req, res) => {
  try {
    const result = await client.query('SELECT messages.id, messages.message, messages.user_id, messages.time, users.username FROM messages INNER JOIN users ON messages.user_id = users.id ORDER BY time');
    if (result) {
      res.json(result.rows);
    } else {
      return;
    }
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

//delete message
app.delete('/api/deleteMessage', bodyParser.json(), async (req, res) => {
  let id_message = req.body.id_message;

  try {
    if (await client.query('SELECT * FROM messages WHERE id = $1', [id_message])) {
      await client.query('DELETE FROM messages WHERE id = $1', [id_message]);
      res.status(201).json({ message: 'Data inserted successfully!' });
    } else {
      return;
    }
  } catch (err) {
      console.error('Erreur:', err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

//Enregistre un user
app.post('/api/register', bodyParser.json(), async (req, res) => {

    const { username, email, password } = req.body;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    try {
        await client.query('INSERT INTO users (username, email, user_password) VALUES ($1 , $2, $3)', [username, email, passwordHash]);
        res.status(201).json({ message: 'Votre compte a été créé avec succès.' });
    } catch (err) {
        console.error('Erreur:', err);
        res.status(500).json({ error: 'Internal Server Error' });

    }
})


//Connecte un user
app.post('/api/connexion', bodyParser.json(), async (req, res) => {
    const { username, password } = req.body;
    
    try {
        // On vérifie si le username existe dans la base de données
        const result = await client.query('SELECT * FROM users WHERE username = $1', [username]);
        
        if (result.rows.length === 0) {

            return res.status(401).json({ error: 'Aucun utilisateur ne correspond a ce compte.' });
        }
        
        //On retourne le user
        const user = result.rows[0];
    
        // On vérifiez le mot de passe du user à celui envoyé depuis le formulaire
        const isPasswordValid = await bcrypt.compare(password, user.user_password);

        if (!isPasswordValid) {
          return res.status(401).json({ error: 'Nom d\'utilisateur ou mot de passe incorrect' });
        }
    
        res.status(200).json({ message: 'Connexion réussie', user: { id: user.id, username: user.username, email: user.email } });

    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
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
