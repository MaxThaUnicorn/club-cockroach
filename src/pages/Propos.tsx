import React from 'react';

const Propos: React.FC = () => {
  return (
    <div className="flex-grow apropos">
      <h1>À propos</h1>
      <p>Club Cockroach est une petite application visant à ressembler au jeu populaire Club Penguin. 
        Le but de ce projet est d'explorer les technologies de CockroachDB, de React, de Express.js et de Typescript
        dans lesquelles cette application a été crée.
      </p>
      <br></br>
      <p>Les fonctionnalités disponibles sont limitées. Il y a la possibilité de se déplacer, de chatter,
          de changer de salle et de faire des rotations sur soi-même (Emotes).
      </p>
      <br></br>
      <p>
        Ce projet a été fait dans le cadre du cours d'Exploration de nouvelles technologies.
      </p>
    </div>
  );
};

export default Propos;