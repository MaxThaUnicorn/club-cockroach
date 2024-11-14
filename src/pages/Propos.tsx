import React from 'react';
import Messagerie from '../component/Messagerie';

const Propos: React.FC = () => {
  return (
    <div className="flex-grow gris">
      <h1>À propos</h1>
      <Messagerie titre="bonjour"></Messagerie>
    </div>
  );
};

export default Propos;