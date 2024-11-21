import React, { useEffect } from 'react';
import Personnage from '../../component/Personnage';
import Background from '../../assets/img/plancher-terrain-exterieur.jpg';
import initializePositions from '../../component/Positions';
import { useCookies } from 'react-cookie';

const TerrainExt: React.FC = () => {
  const [cookies] = useCookies();

  useEffect(() => {
    initializePositions(cookies.id);
  }, [cookies]);
  
  return (
    <div className='conteneur-jeu'>
      <div className='contenu-jeu' style={{backgroundImage: `url(${Background})`}}>

      </div>
    </div>
  );
};

export default TerrainExt;