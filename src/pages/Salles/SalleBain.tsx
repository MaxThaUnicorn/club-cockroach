import React, { useEffect } from 'react';
import Personnage from '../../component/Personnage';
import Background from '../../assets/img/plancher-salle-bain.jpg';
import initializePositions from '../../component/Positions';

const SalleBain: React.FC = () => {
  var currentUserId = '1018820439746478081';

  useEffect(() => {
    initializePositions();
  }, []);
  
  return (
    <div className='conteneur-jeu'>
      <div className='contenu-jeu' style={{backgroundImage: `url(${Background})`}}>
        <Personnage userId={currentUserId} />
      </div>
    </div>
  );
};

export default SalleBain;