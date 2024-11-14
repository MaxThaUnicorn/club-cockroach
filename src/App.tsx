import React from 'react';
import { Route, Routes, Link, useLocation} from 'react-router-dom';
import { ROUTES } from './routes';
import Accueil from './pages/Accueil';
import Connexion from './pages/Connexion';
import Page404 from './pages/Page404';
import Propos from './pages/propos';
import Personnage from './pages/Personnage';
import Lobby from './pages/Lobby';

const App: React.FC = () => {
  const location = useLocation();
  const pageAccueil = location.pathname === '/';

  return (
    <div className='h-100 flex-column'>
      <nav style={{ display: pageAccueil ? 'none' : 'block' }}>
        <ul>
          <li><Link to="/">Accueil</Link></li>
          <li><Link to="/connexion">Connexion</Link></li>
          <li><Link to="/personnage">Personnage</Link></li>
          <li><Link to="/lobby">Lobby</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path={ROUTES.ACCUEIL} element={<Accueil />} />
        <Route path={ROUTES.CONNEXION} element={<Connexion />} />
        <Route path={ROUTES.PROPOS} element={<Propos />} />
        <Route path={ROUTES.PERSONNAGE} element={<Personnage />} />
        <Route path={ROUTES.LOBBY} element={<Lobby />} />

        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
};

export default App;