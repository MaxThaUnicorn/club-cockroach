import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { ROUTES } from './routes';
import Accueil from './pages/Accueil';
import Connexion from './pages/Connexion';
import Page404 from './pages/Page404';

const App: React.FC = () => {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/">Accueil</Link></li>
          <li><Link to="/connexion">Connexion</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path={ROUTES.ACCUEIL} element={<Accueil />} />
        <Route path={ROUTES.CONNEXION} element={<Connexion />} />

        <Route element={<Page404 />} />
      </Routes>
    </div>
  );
};

export default App;