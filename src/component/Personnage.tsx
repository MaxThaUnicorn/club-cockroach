import React, { useEffect, useRef } from 'react';

interface PersonnageProps {
  userId: string,
  username: string
}


const Personnage: React.FC<PersonnageProps> = ({userId, username}) => {

  const personne = useRef<HTMLDivElement | null>(null);

    const handlePersonClick = () => {
        alert(userId);
        alert(username);
    };

    useEffect(() => {
        personne.current?.addEventListener("click", handlePersonClick);
    }, []);


  return (
    <div id={userId} className='personnage' ref={personne} >
      <p className='nomPersonnage' onClick={handlePersonClick}>{username}</p>
    </div>
  );
};

export default Personnage;