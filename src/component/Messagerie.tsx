interface MessagerieProps {
    titre : string
}

export default function Messagerie({ titre } : MessagerieProps) {
    return (
        <div className="boxMessagerie">
            <p>{titre}</p>
        </div>
    )
}