import React, { useEffect, useRef } from 'react';
import { useCookies } from 'react-cookie';

interface PersonnageProps {
  userId: string
}


const Personnage: React.FC<PersonnageProps> = ({userId}) => {

  const personne = useRef<HTMLDivElement | null>(null);

    const handlePersonClick = () => {
        alert(userId);
    };

    useEffect(() => {
        personne.current?.addEventListener("click", handlePersonClick);
    }, []);


  return (
    <div id={userId} className='personnage' ref={personne} >
      <p className='nomPersonnage' onClick={handlePersonClick}></p>
    </div>
  );
};

export default Personnage;