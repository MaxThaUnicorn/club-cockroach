import React, { useEffect, useRef } from 'react';
import Personnage from '../../component/Personnage';
import Background from '../../assets/img/vieux-plancher-sale.jpg';
import initializePositions from '../../component/Positions';
import Messagerie from '../../component/Messagerie';

const Lobby: React.FC = () => {
  useEffect(() => {
    initializePositions(sessionStorage.getItem('id'));
  }, []);
  
  return (
    <div className='conteneur-jeu'>
      <div className='contenu-jeu' style={{backgroundImage: `url(${Background})`}}>
        <Messagerie></Messagerie>
      </div>
    </div>
  );
};

export default Lobby;