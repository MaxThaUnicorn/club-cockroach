import React, { useEffect, useRef, useState } from 'react';
import Background from '../../assets/img/vieux-plancher-sale.jpg';
import initializePositions from '../../component/Positions';
import Messagerie from '../../component/Messagerie';
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

        const userId = target.id; 
        const username = target.querySelector('.nomPersonnage')?.textContent || '';

        if (target.classList.contains('personnage')) {
            setModalVisible(true); 
            setSelectedPersonnage({ userId, username });
        }
    };

    const closeModal = () => {
        setModalVisible(false); 
    };

    return (
        <div className='conteneur-jeu' >
        <div className='contenu-jeu' style={{backgroundImage: `url(${Background})`}}  onClick={(event)=>handleClick(event)}>
            <Modal isVisible={isModalVisible} onClose={closeModal} valuePersonne={selectedPersonnage}/>
            <Messagerie />
        </div>
            <Emotes />
        </div>
    );
};

export default Lobby;