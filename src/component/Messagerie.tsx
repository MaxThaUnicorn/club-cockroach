interface MessagerieProps {
    titre : string
}

export default function Messagerie({ titre } : MessagerieProps) {

    const postMessage = async (event) => { {
        event.preventDefault();
        let message = event.target.message.value;
        
        try {
            const response = await fetch('http://localhost:3000/api/createMessage ', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id_user: "1018820439746478081", 
                    message: message,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.message);
            } else {
                console.error('Erreur:', response.statusText);
            }
        } catch (error) {
            console.error('Erreur:', error);
        }
    };}

    return (
        <section>
            <div className="boxMessagerie">
                <p>{titre}</p>
            </div>
            <form className="formMessagerie" onSubmit={postMessage}>
                <input name="message" type="text" placeholder=" Message"/>
                <button>Envoyer</button>
            </form>
        </section>
    )
}