import React, { useEffect } from 'react';
import Background from '../../assets/img/plancher-salle-bain.jpg';
import initializePositions from '../../component/Positions';

const SalleBain: React.FC = () => {
  useEffect(() => {
    initializePositions(sessionStorage.getItem('id'), '1024513501450043393');
  }, []);
  
  return (
    <div className='conteneur-jeu'>
      <div className='contenu-jeu' style={{backgroundImage: `url(${Background})`}}>

      </div>
    </div>
  );
};

export default SalleBain;