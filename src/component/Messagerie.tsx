import React, { useEffect, useState } from 'react';

export default function Messagerie() {
    const [messages, setMessages] = useState([]);
    const currentTime: Date = new Date();
    const isoString: string = currentTime.toISOString();

    const postMessage = async (event) => { {
        event.preventDefault();
        let message = event.target.message.value;
        
        try {
            const response = await fetch('http://localhost:5000/api/createMessage ', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id_user: "1018820439746478081", 
                    message: message,
                    time: isoString, 
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
            setMessages(data);
            //console.log(data);

            setTimeout(() => {
                getMessages();
            }, 10000);
    };}

    useEffect(() => {
        getMessages();
    }, []);

    return (
        <section>
            <div className="boxMessagerie">
                {messages.length > 0 ? (
                    messages.map((message, index) => (
                        <p key={index}>{message.username} : {message.message}</p> 
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