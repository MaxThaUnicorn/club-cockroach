import React, { useEffect, useRef } from 'react';

interface ModalProps {
    isVisible: boolean;
    onClose: () => void;
    valuePersonne: { userId: string; username: string } | null;
  }

  const Modal: React.FC<ModalProps> = ({ isVisible, onClose, valuePersonne }) => {

    const modalRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {

        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && event.target === modalRef.current) {
              onClose();
            }
          };

        window.addEventListener('click', handleClickOutside);

        return () => window.removeEventListener('click', handleClickOutside); 
        
    },[onClose])
    
    if (!isVisible) return null;

    console.log(valuePersonne);
    return (
        <div id='myModal' className='{modal}' ref={modalRef}>
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <div>
                    <h4>Invitation</h4>
                    <p>Voulez vous envoyer une demande d'ami à {valuePersonne?.username} ?</p>
                    <button>Envoyer</button>
                </div>
                
            </div>
        </div>
    )
}

export default Modal;