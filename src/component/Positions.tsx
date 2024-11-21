import ReactDOM from 'react-dom/client';
import Personnage from '../component/Personnage';

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
      else {
        intatiatePersonnage(user.user_id, "default");
      }
    }
  });

  setTimeout(updatePosition, 2000);
}

const intatiatePersonnage = (userId: string, username: string) => {
  let containerJeu = document.getElementsByClassName('contenu-jeu')[0];

  const nouveauDivPersonnage = document.createElement('div');

  ReactDOM.createRoot(nouveauDivPersonnage).render(<Personnage userId={userId} username={username}/>);

  containerJeu.appendChild(nouveauDivPersonnage);
}

const initializePositions = (currentUserId: string) => {
  intatiatePersonnage(currentUserId, sessionStorage.getItem('username'));

  updatePosition();

  let containerJeu = document.getElementsByClassName('contenu-jeu')[0];

  containerJeu.addEventListener('click', (event) => {
    let currentUser = document.getElementById(currentUserId);

    if (!currentUser) {
      console.error("Erreur lors de la récupération de l'utilisateur") 
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();

    let posX = (event.clientX - rect.left) / rect.width * 100 - ((currentUser.offsetWidth / rect.width) * 100 / 2);
    let posY = (event.clientY - rect.top) / rect.height * 100 - ((currentUser.offsetHeight / rect.height) * 100 / 2);

    var currentX = parseFloat(currentUser.style.left);
    var currentY = parseFloat(currentUser.style.top);

    if(isNaN(currentX)){
      currentX = 0;
    }
    
    if(isNaN(currentY)){
      currentY = 0;
    }

    const direction = calculAngleDirection(currentX, currentY, posX, posY);

    currentUser.style.transform = `rotate(${direction}deg)`;

    currentUser.style.left = `${posX}%`;
    currentUser.style.top = `${posY}%`;

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
}

const calculAngleDirection = (posX: number, posY: number, targetX: number, targetY: number) => {
  const deltaX = targetX - posX;
  const deltaY = targetY - posY;

  let angle = (Math.atan2(deltaY, deltaX) * (180 / Math.PI));

  return angle;
}

export default initializePositions;