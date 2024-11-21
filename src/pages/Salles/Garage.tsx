import React, { useEffect } from 'react';
import Personnage from '../../component/Personnage';
import Background from '../../assets/img/plancher-garage.jpg';
import initializePositions from '../../component/Positions';
import { useCookies } from 'react-cookie';

const Garage: React.FC = () => {
  const [cookies] = useCookies();

  useEffect(() => {
    initializePositions(cookies.id);
  }, [cookies]);
  
  return (
    <div className='conteneur-jeu'>
      <div className='contenu-jeu' style={{backgroundImage: `url(${Background})`}}>
        <Personnage userId={cookies.id} />
      </div>
    </div>
  );
};

export default Garage;