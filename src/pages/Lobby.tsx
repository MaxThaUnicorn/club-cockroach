import React, { useEffect } from 'react';
import Personnage from '../component/Personnage';
import initializePositions from '../component/Positions';

const Lobby: React.FC = () => {
  var currentUserId = '1018820439746478081';

  useEffect(() => {
    initializePositions();
  }, []);
  return (
    <div className='conteneur-jeu'>
      <div className='contenu-jeu imageBackgroundLobby'>
        <Personnage userId={currentUserId} />
      </div>
    </div>
  );
};

export default Lobby;