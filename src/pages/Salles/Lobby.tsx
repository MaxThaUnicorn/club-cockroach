import React, { useEffect, useRef } from 'react';
import Background from '../../assets/img/vieux-plancher-sale.jpg';
import initializePositions from '../../component/Positions';
import Messagerie from '../../component/Messagerie';
import Emotes from '../../component/emotes';
import Salles from '../../component/Salles';

const Lobby: React.FC = () => {
  useEffect(() => {
    initializePositions(sessionStorage.getItem('id'));
  }, []);
  
  return (
    <div className='conteneur-jeu'>
      <Salles/>
      <div className='contenu-jeu' style={{backgroundImage: `url(${Background})`}}>
        <Messagerie />
      </div>
        <Emotes />
    </div>
  );
};

export default Lobby;