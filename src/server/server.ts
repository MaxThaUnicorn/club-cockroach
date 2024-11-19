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

//Enregistrer un user
app.post('/api/register', bodyParser.json(), async (req, res) => {
  const { username, password } = req.body;
  console.log('Enregistré');
  console.log(username, password);
})


//Connecte un user
app.post('/api/connexion', bodyParser.json(), async (req, res) => {
    const { username, password } = req.body;
    
    try {
        // On vérifie si le username existe dans la base de données
        const result = await client.query('SELECT * FROM users WHERE username = $1', [username]);
        
        if (result.rows.length === 0) {
            console.log("utilisateur non trouvé")
            return res.status(401).json({ error: 'Utilisateur non trouvé' });
        }else{
            console.log("Utilisateur trouvé")
        }
        
        //on retourne le user
        const user = result.rows[0];
    
        // Vérifiez le mot de passe du user à celui envoyé depuis le formulaire
        const isPasswordValid = await bcrypt.compare("$2y$12$2YSOb8Lp1UfjnKm9n2thYuW.Cdf.x39a96zP8g.ifMHtjVOBDlilS", user.user_password);
        console.log(isPasswordValid)
        if (!isPasswordValid) {
            console.log("Mot de passe incorrect")
            console.log(user.user_password)
          return res.status(401).json({ error: 'Mot de passe incorrect' });
        }
    
        res.status(200).json({ message: 'Connexion réussie', user: { id: user.id, username: user.username } });

    } catch (err) {
        console.error('Erreur:', err);
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
