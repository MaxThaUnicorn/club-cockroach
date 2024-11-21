import React, { useEffect, useRef } from 'react';
import Personnage from '../../component/Personnage';
import Background from '../../assets/img/vieux-plancher-sale.jpg';
import initializePositions from '../../component/Positions';
import Messagerie from '../../component/Messagerie';
import { useCookies } from 'react-cookie';

const Lobby: React.FC = () => {
    const [cookies] = useCookies();

  useEffect(() => {
    initializePositions(cookies.id);
  }, [cookies]);
  
  return (
    <div className='conteneur-jeu'>
      <div className='contenu-jeu' style={{backgroundImage: `url(${Background})`}}>
        <Personnage userId={cookies.id}/>
        <Messagerie></Messagerie>
      </div>
    </div>
  );
};

export default Lobby;