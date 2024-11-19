import React, { useState } from 'react';
import {Link} from 'react-router-dom';

const Register: React.FC = () => {

    type ResponseType = {
        id : number, 
        username : string;
        password : string,
        message : string
    };
    

    const [responseFetch, setResponseFetch] = useState<ResponseType | null>(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const CreateUser = async (e)=> { {
        e.preventDefault();
        try{
            const response = await fetch('http://localhost:5000/api/register', {
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

    return(
        <div className='backgroundConnexion'>
            { responseFetch ? (<div>{responseFetch.username} {responseFetch.message}</div>) : ('') }
            <div className='formConnexion'>
                <h1>Créer un nouveau compte</h1>
                <p>Créer un compte pour pouvoir acceder à l'application. </p>
                <form method="post" onSubmit={CreateUser}>
                    <p>
                        <label>Username:</label>
                        <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} name='username' />
                    </p>
                    <p>
                        <label>Password:</label>
                        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} name='password' />
                    </p>
                    <button type="submit">Créer un compte</button>
                </form>
            </div>
        </div>
    );
};

export default Register;