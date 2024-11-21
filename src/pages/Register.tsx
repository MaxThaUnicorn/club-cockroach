import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';


const Register: React.FC = () => {
    const navigate = useNavigate();

    type ResponseType = {
        id : number, 
        username : string;
        password : string,
        message : string
    };
    
    const [responseFetch, setResponseFetch] = useState<ResponseType | null>(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
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
                    email : email,
                    password : password,
                }),
            })
            if (response.ok) {
                const data = await response.json();
                setResponseFetch(data);
                setUsername('');
                setEmail('');
                setPassword('');
                //navigate('/connexion');
            } else {
                console.error('Erreur:', response.statusText);
            }
            
        }catch(e){
            console.error('Error', e)
        }   
            
    };}

    console.log(responseFetch);

    return(
        <div className='backgroundConnexion'>
            <h1>Créer un nouveau compte</h1>
            <p>Remplissez les champs correctement.</p>
            <div className='formConnexion'>
                <p>{ responseFetch ? (<div>{responseFetch.username} {responseFetch.message}</div>) : ('') }</p>
                <form method="post" onSubmit={CreateUser}>
                    <p>
                        <label>Username:</label>
                        <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} name='username' required/>
                    </p>
                    <p>
                        <label>Email:</label>
                        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} name='email' required/>
                    </p>
                    <p>
                        <label>Password:</label>
                        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} name='password' required/>
                    </p>
                    <button type="submit">Créer un compte</button>
                </form>
            </div>
        </div>
    );
};

export default Register;