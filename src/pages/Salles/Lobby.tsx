import React, { useEffect, useRef, useState } from 'react';
import Background from '../../assets/img/vieux-plancher-sale.jpg';
import initializePositions from '../../component/Positions';
import Messagerie from '../../component/Messagerie';
import Salles from '../../component/Salles';
import Emotes from '../../component/Emotes';
import Modal from '../../component/Modal';


const Lobby: React.FC = () => {

    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedPersonnage, setSelectedPersonnage] = useState<{ userId: string; username: string } | null>(null);

    useEffect(() => {
        initializePositions(sessionStorage.getItem('id'));
    }, []);

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.target as HTMLElement;
  

        if (target.classList.contains('personnage')) {
            const userId = target.id; 
            const username = target.querySelector('.nomPersonnage')?.textContent || '';
            const sessionId = sessionStorage.getItem('id');

            if (sessionId !== userId) {
                const cockroch = document.querySelector('.personnage');
                setModalVisible(true); 
                setSelectedPersonnage({ userId, username });
                cockroch?.classList.add('hidden');
            }
        }
    };

    const closeModal = () => {
        setModalVisible(false); 
    };

    return (
        <div className='conteneur-jeu' >
            <Salles/>
            <input type="hidden" id="currentSalleId" value={'1024768741816664065'} />
            <div className='contenu-jeu' style={{backgroundImage: `url(${Background})`}}  onClick={(event)=>handleClick(event)}>
                <Modal isVisible={isModalVisible} onClose={closeModal} valuePersonne={selectedPersonnage}/>
                <Messagerie />
            </div>
            <Emotes />
        </div>
    );
};

export default Lobby;