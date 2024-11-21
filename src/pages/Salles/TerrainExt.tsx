import React, { useEffect } from 'react';
import Background from '../../assets/img/plancher-terrain-exterieur.jpg';
import initializePositions from '../../component/Positions';

const TerrainExt: React.FC = () => {
  useEffect(() => {
    initializePositions(sessionStorage.getItem('id'));
  }, []);
  
  return (
    <div className='conteneur-jeu'>
      <div className='contenu-jeu' style={{backgroundImage: `url(${Background})`}}>

      </div>
    </div>
  );
};

export default TerrainExt;