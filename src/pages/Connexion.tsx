import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Connexion: React.FC = () => {
    type ResponseType = {
        user: {
            id: number;
            username: string;
            email: string;
        } | null;
        message: string;
    };

    const [cookies, setCookie] = useCookies();
    const [responseFetch, setResponseFetch] = useState<ResponseType | null>(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const ConnectUser = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/connexion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setCookie('username', data.user.username, { path: '/', maxAge: 3600 });
                setCookie('email', data.user.email, { path: '/', maxAge: 3600 });
                setCookie('id', data.user.id, { path: '/', maxAge: 3600 });
                setResponseFetch(data);
                setUsername('');
                setPassword('');
                navigate('/salle/lobby');
            } else {
                const errorData = await response.json();
                setError(errorData.error);
                setResponseFetch({ user: null, message: errorData.error });
            }
        } catch (e) {
            console.error('Erreur:', e);
        }
    };

    return (
        <div className="backgroundConnexion">
            <h1>Connexion</h1>
            <p>Page de connexion</p>

            {responseFetch?.user && (
                <div>
                    <p>ID: {responseFetch.user.id}</p>
                    <p>Username: {responseFetch.user.username}</p>
                    <p>Email: {responseFetch.user.email}</p>
                </div>
            )}
            
            <div className="formConnexion">
                <p>{responseFetch ? <div>{responseFetch.message}</div> : ''}</p>
                <form method="post" onSubmit={ConnectUser}>
                    <p>
                        <label>Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            name="username"
                        />
                    </p>
                    <p>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            name="password"
                        />
                    </p>
                    <button type="submit">Connexion</button>
                </form>
                <div className="flex-link">
                    <Link to="/register">Créer un compte</Link>
                </div>
            </div>
        </div>
    );
};

export default Connexion;
