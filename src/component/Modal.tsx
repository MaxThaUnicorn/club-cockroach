import React, { useEffect, useRef } from 'react';

interface ModalProps {
    isVisible: boolean;
    onClose: () => void;
    valuePersonne: { userId: string; username: string } | null;
  }

  const Modal: React.FC<ModalProps> = ({ isVisible, onClose, valuePersonne }) => {

    const modalRef = useRef<HTMLDivElement | null>(null);
    const btnCloseRef = useRef <HTMLSpanElement | null>(null);
 
   
    const closeModal = () => {
        const blocPersonnage = document.querySelector('.personnage');
        blocPersonnage?.classList.remove('hidden');
        onClose();
    }

    useEffect(() => {

        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && event.target === modalRef.current) {
                onClose()       
            }
          };

        window.addEventListener('click', handleClickOutside);

        return () => window.removeEventListener('click', handleClickOutside); 
        
    },[onClose])
    
    if (!isVisible) return null;

    return (
    <div id='myModal' className='{modal}' ref={modalRef}>
            <div className="modal-content">
                <span ref={btnCloseRef} className="close" onClick={closeModal}>&times;</span>
                <div>
                    <h4>Invitation</h4>
                    <p>Voulez vous envoyer une demande d'ami à {valuePersonne?.username} ?</p>
                    <button onClick={closeModal}>Envoyer</button>
                </div>
                
            </div>
        </div>
    )
}

export default Modal;