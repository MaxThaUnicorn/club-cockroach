import React from 'react';
import {Link} from 'react-router-dom';

const Accueil: React.FC = () => {
  return (
    <div className="Accueil flex-grow">
      <h1 className='AccueilStyle'>Bienvenue sur Club Cockroach</h1>
      
      <div className='flex-column'>
        <Link className='AccueilStyle' to="/connexion">Connexion</Link>

        <Link className='AccueilStyle' to="/propos">À propos</Link>
      </div>
      
    </div>
  );
};

export default Accueil;