CREATE DATABASE roachesDB;

CREATE TABLE users (
  id INT8 NOT NULL DEFAULT unique_rowid(),
  username VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL,
  user_password VARCHAR(255) NOT NULL,
  CONSTRAINT users_pkey PRIMARY KEY (id ASC)
);

CREATE TABLE salles (
  id INT8 NOT NULL DEFAULT unique_rowid(),
  nom VARCHAR(255) NULL,
  CONSTRAINT salles_pkey PRIMARY KEY (id ASC)
);

CREATE TABLE messages (
  id INT8 NOT NULL DEFAULT unique_rowid(),
  user_id INT8 NOT NULL,
  message VARCHAR(255) NULL,
  "time" TIMESTAMP NOT NULL,
  CONSTRAINT messages_pkey PRIMARY KEY (id ASC),
  CONSTRAINT messages_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE positions (
  position_x INT8 NOT NULL,
  position_y INT8 NOT NULL,
  user_id INT8 NOT NULL UNIQUE,
  salle_id INT8 NOT NULL,
  rowid INT8 NOT VISIBLE NOT NULL DEFAULT unique_rowid(),
  CONSTRAINT positions_pkey PRIMARY KEY (rowid ASC),
  CONSTRAINT positions_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT positions_salle_id_fkey FOREIGN KEY (salle_id) REFERENCES salles(id)
);

INSERT INTO salles (nom)
VALUES
    ('Lobby'),
    ('Garage'),
    ('Salle de bain'),
    ('Terrain extérieur');