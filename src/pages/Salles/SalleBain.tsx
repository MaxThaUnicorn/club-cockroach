import React, { useEffect } from 'react';
import Personnage from '../../component/Personnage';
import Background from '../../assets/img/plancher-salle-bain.jpg';

const SalleBain: React.FC = () => {
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
      <div className='contenu-jeu' style={{backgroundImage: `url(${Background})`}}>
        <Personnage />
      </div>
    </div>
  );
};

export default SalleBain;