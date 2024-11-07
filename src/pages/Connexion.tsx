import React from 'react';
const Connexion: React.FC = () => {

    function handleSubmit(e) {
      e.preventDefault();
      alert('Vous avez cliquer');
    }

  return (
    <div>
      <div className='formConnexion'>
      <h1>Connexion</h1>
      <p>Page de connexion</p>
        <form onSubmit={handleSubmit}>
          <p>
            <label htmlFor="">Username:</label>
            <input type="text" name='username'/>
          </p>
          
          <p>
            <label htmlFor="">Password:</label>
            <input type="text" name='password'/>
          </p>
          <button>Connexion</button>
        </form>
      </div>
    </div>
  );
};

export default Connexion;
