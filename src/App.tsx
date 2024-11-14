import React from 'react';
import { Route, Routes, Link, useLocation} from 'react-router-dom';
import { ROUTES } from './routes';
import Accueil from './pages/Accueil';
import Connexion from './pages/Connexion';
import Page404 from './pages/Page404';
import Propos from './pages/Propos';
import cockroachImg from './assets/img/cockroach.png';

const App: React.FC = () => {
  const location = useLocation();
  const pageAccueil = location.pathname === '/';

  return (
    <div className='h-100 flex-column'>
      <nav style={{ display: pageAccueil ? 'none' : 'flex' }}>
        <div>
          <Link to="/"><img src={cockroachImg} alt="icone" /></Link>
          <Link to="/">Accueil</Link>
          <Link to="/propos">À propos</Link>
        </div>
          <Link to="/connexion">Connexion</Link>
      </nav>

      <Routes>
        <Route path={ROUTES.ACCUEIL} element={<Accueil />} />
        <Route path={ROUTES.CONNEXION} element={<Connexion />} />
        <Route path={ROUTES.PROPOS} element={<Propos />} />

        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
};

export default App;