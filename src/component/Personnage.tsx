import React from 'react';

interface PersonnageProps {
  userId: string
}

const Personnage: React.FC<PersonnageProps> = ({userId}) => {
  return (
    <div id={userId} className='personnage'>
      <p className='nomPersonnage'></p>
    </div>
  );
};

export default Personnage;