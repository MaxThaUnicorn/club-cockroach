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
        intatiatePersonnage(user.user_id);
      }
    }
  });

  setTimeout(updatePosition, 10000);
}

const intatiatePersonnage = (userId: string) => {
  let containerJeu = document.getElementsByClassName('contenu-jeu')[0];

  const nouveauDivPersonnage = document.createElement('div');

  ReactDOM.createRoot(nouveauDivPersonnage).render(<Personnage userId={userId}/>);

  if (nouveauDivPersonnage.firstElementChild) {
    containerJeu.appendChild(nouveauDivPersonnage.firstElementChild);
  }
}

const initializePositions = (currentUserId: string) => {
  intatiatePersonnage(currentUserId);

  updatePosition();

  let containerJeu = document.getElementsByClassName('contenu-jeu')[0];

  containerJeu.addEventListener('click', (event) => {
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
}

export default initializePositions;