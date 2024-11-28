import {Link} from 'react-router-dom';

export default function Salles() {


    return (
        <section className="sectionEmote">
            <h2 className='titleEmote'>Salles</h2>
            <Link className='titreSalle' to="/salle/lobby">Lobby</Link>
            <Link className='titreSalle' to="/salle/garage">Garage</Link>
            <Link className='titreSalle' to="/salle/salle-bain">Salle de bain</Link>
            <Link className='titreSalle' to="/salle/terrain-ext">Terrain extérieur</Link>
        </section>
    )
}