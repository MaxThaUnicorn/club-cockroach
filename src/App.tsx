import React from 'react';
import { Route, Routes, Link, useLocation, useNavigate} from 'react-router-dom';
import { ROUTES } from './routes';
import Accueil from './pages/Accueil';
import Connexion from './pages/Connexion';
import Page404 from './pages/Page404';
import Propos from './pages/Propos';
import cockroachImg from './assets/img/icon.png';
import Lobby from './pages/Salles/Lobby';
import Register from './pages/Register';

import Garage from './pages/Salles/Garage';
import SalleBain from './pages/Salles/SalleBain';
import TerrainExt from './pages/Salles/TerrainExt';

const App: React.FC = () => { 
  const location = useLocation();
  const pageAccueil = location.pathname === '/';
  const navigate = useNavigate(); 

  const handleLogout = () => {
    navigate('/connexion'); 
  };

  return (
    <div className='h-100 flex-column'>
    
        <nav style={{ display: pageAccueil ? 'none' : 'flex' }}>
            <div>
            <Link to="/"><img src={cockroachImg} alt="icone" /></Link>
            <Link to="/">Accueil</Link>
            <Link to="/propos">À propos</Link>
            <Link to="/salle/lobby">Lobby</Link>
            </div>
            {sessionStorage.getItem('username') ? 
            (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span>Bienvenue, {sessionStorage.getItem('username')}!</span>
                
                    <button onClick={handleLogout} style={{ border: 'none', background: 'none', color:'#fff', cursor: 'pointer' }}>
                    Déconnexion
                    </button>
                </div>
            ) : (
                <Link to="/connexion">Connexion</Link>
            )}
        </nav>

        <Routes>
            <Route path={ROUTES.ACCUEIL} element={<Accueil />} />
            <Route path={ROUTES.CONNEXION} element={<Connexion />} />
            <Route path={ROUTES.PROPOS} element={<Propos />} />
            <Route path={ROUTES.GARAGE} element={<Garage />} />
            <Route path={ROUTES.LOBBY} element={<Lobby />} />
            <Route path={ROUTES.REGISTER} element={<Register />} />
            <Route path={ROUTES.SALLEBAIN} element={<SalleBain />} />
            <Route path={ROUTES.TERRAINEXT} element={<TerrainExt />} />

            <Route path="*" element={<Page404 />} />
        </Routes>
    </div>
  );
};

export default App;