import React, { useEffect } from 'react';
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

      </div>
    </div>
  );
};

export default Garage;