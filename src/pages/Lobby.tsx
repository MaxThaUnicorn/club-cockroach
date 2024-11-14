import React, { useEffect } from 'react';
import Personnage from '../component/Personnage';

const Propos: React.FC = () => {
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
    <div style={{backgroundColor: "red", display: "inline-block", width: "1080px", height: "720px", margin: "auto"}}>
      <Personnage/>
    </div>
  );
};

export default Propos;