import React, { useEffect } from 'react';
import Personnage from '../component/Personnage';

const Lobby: React.FC = () => {
  const updatePosition = async () => {
    let data = await fetch('http://localhost:5000/api/positions', {
      method: 'GET',
      headers: {
        'Accept': 'application/json; charset=utf-8',
        'Content-Type': 'application/json; charset=utf-8'
      }
    });

    console.log(data);
  }

  useEffect(() => {
    updatePosition();
  }, []);
  return (
    <div className='conteneur-jeu'>
      <div className='contenu-jeu imageBackgroundLobby'>
        <Personnage />
      </div>
    </div>
  );
};

export default Lobby;