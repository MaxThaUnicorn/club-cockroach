import React, { useEffect } from 'react';
import Personnage from '../component/Personnage';

const Lobby: React.FC = () => {
  const updatePosition = async () => {
    let data = await fetch('http://localhost:5000/api/positions', {
      method: 'GET'
    });

    console.log(data);
  }

  useEffect(() => {
    updatePosition();
  }, []);
  return (
    <div className='conteneur-jeu'>
      <div className='contenu-jeu imageBackgroundLobby'>
        <div style={{top: '5%', left: '5%'}} className='personnage'></div>
      </div>
    </div>
  );
};

export default Lobby;