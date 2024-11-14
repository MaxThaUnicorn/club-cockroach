import React, { useEffect } from 'react';
import Personnage from '../component/Personnage';

const Lobby: React.FC = () => {
  var currentUserId = '1018820439746478081';

  const updatePosition = async () => {
    fetch('http://localhost:5000/api/positions', {
      method: 'GET',
      headers: {
        'Accept': 'application/json; charset=utf-8',
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
    .then(res => res.json())
    .then(data => {
      for (const user of data) {
        let userElement = document.getElementById(user.user_id);

        if (userElement) {
          userElement.style.top = user.position_y + '%';
          userElement.style.left = user.position_x + '%';
        }
      }
    });

    setTimeout(updatePosition, 10000);
  }

  useEffect(() => {
    updatePosition();

    document.getElementsByClassName('contenu-jeu')[0].addEventListener('click', (event) => {
      let currentUser = document.getElementById(currentUserId);

      const rect = event.currentTarget.getBoundingClientRect();

      let posX = (event.clientX - rect.left) / rect.width * 100 - ((currentUser.offsetWidth / rect.width) * 100 / 2);
      let posY = (event.clientY - rect.top) / rect.height * 100 - ((currentUser.offsetHeight / rect.height) * 100 / 2);

      if (currentUser) {
        currentUser.style.left = posX + '%';
        currentUser.style.top = posY + '%';
      }

      fetch('http://localhost:5000/api/position', {
        method: 'POST',
        headers: {
          'Accept': 'application/json; charset=utf-8',
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
          user_id: currentUserId,
          position_x: posX | 0,
          position_y: posY | 0
        })
      })
      .then(res => res.json());
    });
  }, []);
  return (
    <div className='conteneur-jeu'>
      <div className='contenu-jeu imageBackgroundLobby'>
        <Personnage userId={currentUserId} />
      </div>
    </div>
  );
};

export default Lobby;