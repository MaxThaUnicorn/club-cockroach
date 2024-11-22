import React, { useEffect, useRef } from 'react';
import circleLeftEmote from '../assets/img/circle-left-emote.svg';
import circleRightEmote from '../assets/img/circle-right-emote.svg';

export default function Emotes() {
    var emotes = document.getElementsByClassName('imgEmote');
    //const currentPersonnage = useRef<HTMLElement | null>(null);

    useEffect(() => {
        /*const idPersonnage = sessionStorage.getItem('id');
        if(idPersonnage) {
            currentPersonnage.current = document.getElementById(idPersonnage) as HTMLElement;
        }*/

        setEmotes();
    }, []);

    const setEmotes = async () => {
        if(emotes) {
            for (var i = 0; i < emotes.length; i++) {
                emotes[i].addEventListener('click', doEmote);
            }
        }
    }
    
    const doEmote = (event : Event) => {
        var currentPersonnage = document.getElementById(sessionStorage.getItem('id'));
        if (currentPersonnage) {
            switch (event.target.id) {
                case "circleLeft":
                    currentPersonnage.style.transform += `rotate(-360deg)`
                    break;
                case "circleRight":
                    currentPersonnage.style.transform += "rotate(360deg)"
                    break;
            }
        }
    }

    return (
        <section className="sectionEmote">
            <h2 className='titleEmote'>Emotes</h2>

            <img className='imgEmote' id='circleLeft' src={circleLeftEmote} alt="Circle Left Emote" />
            <img className='imgEmote' id='circleRight' src={circleRightEmote} alt="Circle Right Emote" />
        </section>
    )
}