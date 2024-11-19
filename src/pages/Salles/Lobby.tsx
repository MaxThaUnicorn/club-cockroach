import React, { useEffect } from 'react';
import Personnage from '../../component/Personnage';
import Background from '../../assets/img/vieux-plancher-sale.jpg';
import initializePositions from '../../component/Positions';
import Messagerie from '../../component/Messagerie';

const Lobby: React.FC = () => {
  var currentUserId = '1018820439746478081';

  useEffect(() => {
    initializePositions();
  }, []);
  
  return (
    <div className='conteneur-jeu'>
      <div className='contenu-jeu' style={{backgroundImage: `url(${Background})`}}>
        <Personnage userId={currentUserId} />
        <Messagerie></Messagerie>
      </div>
    </div>
  );
};

export default Lobby;