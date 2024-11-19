import React, { useState } from 'react';
import {Link} from 'react-router-dom';

const Connexion: React.FC = () => {
    type ResponseType = {
        id : number, 
        username : string;
        password : string,
        message : string
    };
    
    const [responseFetch, setResponseFetch] = useState<ResponseType | null>(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const ConnectUser = async (e)=> { {
        e.preventDefault();
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
                setResponseFetch(data);
                setUsername('');
                setPassword('');
                console.log(responseFetch)
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
                <p>{ responseFetch ? (<div>{responseFetch.username} {responseFetch.message}</div>) : ('') }</p>
                <form method="post" onSubmit={ConnectUser}>
                    <p>
                        <label>Username:</label>
                        <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} name='username' />
                    </p>
                    <p>
                        <label>Password:</label>
                        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} name='password' />
                    </p>
                    <button type="submit">Connexion</button>
                </form>

                <Link to="/register">Créer un compte</Link>        
            </div>
        </div>

    );
};

export default Connexion;
