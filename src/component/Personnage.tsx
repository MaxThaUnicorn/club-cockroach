import React from 'react';

interface PersonnageProps {
  userId: string
}

const Personnage: React.FC<PersonnageProps> = ({userId}) => {
  return (
    <div id={userId} className='personnage'></div>
  );
};

export default Personnage;