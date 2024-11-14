import React, { useState } from 'react';

const Connexion: React.FC = () => {
    const [responseFetch, setResponseFetch] = useState(null);

    const ConnectUser = async (e)=> { {
        e.preventDefault();
        const username =  e.target.username.value;
        const password = e.target.password.value;

        try{
            const response = await fetch('http://localhost:5000/api/connexion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username : username,
                    password : password,
                }),
            })
            if (response.ok) {
                const data = await response.json();
                console.log(data);
            } else {
                console.error('Erreur:', response.statusText);
            }
            
        }catch(e){
            console.error('Error', e)
        }   
            
    };}

    return (
        <div className='backgroundConnexion'>
            <div className='formConnexion'>
                <h1>Connexion</h1>
                <p>Page de connexion</p>
                <form method="post" onSubmit={ConnectUser}>
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
