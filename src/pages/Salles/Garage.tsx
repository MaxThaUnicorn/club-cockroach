import React, { useEffect } from 'react';
import Background from '../../assets/img/plancher-garage.jpg';
import initializePositions from '../../component/Positions';

const Garage: React.FC = () => {
  useEffect(() => {
    initializePositions(sessionStorage.getItem('id'), '1024513501450010625');
  }, []);
  
  return (
    <div className='conteneur-jeu'>
      <div className='contenu-jeu' style={{backgroundImage: `url(${Background})`}}>

      </div>
    </div>
  );
};

export default Garage;