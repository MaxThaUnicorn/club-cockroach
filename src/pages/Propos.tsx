import React from 'react';
import Messagerie from '../component/Messagerie';

const Propos: React.FC = () => {
  return (
    <div className="flex-grow gris">
      <h1>À propos</h1>
      <Messagerie titre="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."></Messagerie>
    </div>
  );
};

export default Propos;