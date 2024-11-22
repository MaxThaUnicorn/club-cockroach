import React, { useEffect, useState } from 'react';

export default function Messagerie() {
    const id_user = sessionStorage.getItem('id');
    const [messages, setMessages] = useState([]);
    const box = document.getElementById('sectMessage');

    if (box) {
        box.addEventListener('click', (event) => {
            event.stopPropagation();
        });
    }

    const postMessage = async (event : Event) => { {
        event.preventDefault();
        let message = event.target.message.value;
        let now = new Date();
        let cinqheuresdemoins = new Date(now.getTime() - 5 * 60 * 60 * 1000)

        try {
            const response = await fetch('http://localhost:5000/api/createMessage ', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id_user: id_user, 
                    message: message,
                    time: cinqheuresdemoins, 
                }),
            });
            event.target.message.value = "";

            if (!response.ok) {
                console.error('Erreur:', response.statusText);
            }
        } catch (error) {
            console.error('Erreur:', error);
        }
    };}

    const getMessages = async () => { {
            const res = await fetch('http://localhost:5000/api/messages ', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const data = await res.json();
            let now = new Date();
            data.forEach(message => {
                if (message) {
                    let message_time = new Date(message.time);
                    var diff = (now.getTime() - message_time.getTime()) / 1000;
                    
                    if (diff > 30) {
                        let p = document.getElementById(message.id);
                        p?.classList.add('fade-out');
                        delMessage(message.id)
                    }
                }
            });
            setMessages(data);

            setTimeout(() => {
                getMessages();
            }, 2000);
    };}

    const delMessage = async (id) => { {
        try {
            const response = await fetch('http://localhost:5000/api/deleteMessage ', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id_message: id,
                }),
            });

            if (!response.ok) {
                console.error('Erreur:', response.statusText);
            }
        } catch (error) {
            console.error('Erreur:', error);
        }
    };}

    useEffect(() => {
        getMessages();
    }, []);

    return (
        <section id="sectMessage">
            <div className="boxMessagerie">
                {messages.length > 0 ? (
                    messages.map((message, index) => (
                        <p id={message.id} key={index}>{message.username} : {message.message}</p> 
                    ))
                ): (
                    <p></p>
                )}
            </div>
            <form className="formMessagerie" onSubmit={postMessage}>
                <input name="message" type="text" placeholder=" Message"/>
                <button>Envoyer</button>
            </form>
        </section>
    )
}