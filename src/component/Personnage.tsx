import React, { useEffect, useRef } from 'react';

interface PersonnageProps {
  userId: string,
  username: string,
  onClick: () => void;
}


const Personnage: React.FC<PersonnageProps> = ({userId, username, onClick}) => {

    return (

        <div id={userId} className='personnage' onClick={onClick}>     
        <p className='nomPersonnage' >{username}</p>
        </div>
    );

};

export default Personnage;