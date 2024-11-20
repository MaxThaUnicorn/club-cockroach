import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Connexion: React.FC = () => {
    type ResponseType = {
        user: {
            id: number;
            username: string;
            email: string;
        } | null;
        message: string;
    };

    const [responseFetch, setResponseFetch] = useState<ResponseType | null>(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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
                setResponseFetch(data);
                setUsername('');
                setPassword('');
            } else {
                const errorData = await response.json();
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
