import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const client = new pg.Client(process.env.DATABASE_URL_CLUBCOCKROACH);

const connectDB = async () => {
  try {
    await client.connect();
    console.log('Connected to CockroachDB');
  } catch (err) {
    console.error('Error connecting to database:', err);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  try {
    await client.end();
    console.log('Disconnected from CockroachDB');
  } catch (err) {
    console.error('Error disconnecting from database:', err);
  }
};

export { client, connectDB, disconnectDB };
