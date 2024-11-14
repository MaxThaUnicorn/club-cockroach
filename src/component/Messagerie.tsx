interface MessagerieProps {
    titre : string
}

export default function Messagerie({ titre } : MessagerieProps) {

    const postMessage = async (event) => { {
        event.preventDefault();
        
        try {
            const response = await fetch('/api/createMessage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id_user: userId, // Assurez-vous que l'ID utilisateur est correct
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
                <input type="text" placeholder=" Message"/>
                <button>Envoyer</button>
            </form>
        </section>
    )
}