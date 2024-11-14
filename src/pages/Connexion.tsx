import React, { useState } from 'react';

const Connexion: React.FC = () => {
    const [responseFetch, setResponseFetch] = useState(null);

    function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        fetch('http://localhost:3000/api/connexion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept' : 'application/json',
            },
            body: JSON.stringify({
                formData
            })
        })
        .then(response => response.json())
        .then(data => {
            setResponseFetch(data);
            console.log(data); 
        })
        .catch(error => {
            console.error('Erreur lors de la requête:', error);
        });
    }

    return (
        <div className='backgroundConnexion'>
            <div className='formConnexion'>
                <h1>Connexion</h1>
                <p>Page de connexion</p>
                <form method="post" onSubmit={handleSubmit}>
                    <p>
                        <label>Username:</label>
                        <input type="text" name='username' />
                    </p>
                    <p>
                        <label>Password:</label>
                        <input type="password" name='password' />
                    </p>
                    <button type="submit">Connexion</button>
                </form>
                {responseFetch && <p>Réponse: {JSON.stringify(responseFetch)}</p>}
            </div>
        </div>
    );
};

export default Connexion;
