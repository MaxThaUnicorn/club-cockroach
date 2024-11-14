import React from 'react';

const Lobby: React.FC = () => {
  return (
    <div className='conteneur-jeu'>
      <div className='contenu-jeu imageBackgroundLobby'>
        <div style={{top: '5%', left: '5%'}} className='personnage'></div>
      </div>
    </div>
  );
};

export default Lobby;