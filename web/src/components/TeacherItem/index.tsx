import React from 'react';
import whatsappIcon from '../../assests/images/icons/whatsapp.svg';

import './style.css';


function TeacherItem() {
    return (
        <article className="teacher-item">
            <header>
                <img src="https://avatars3.githubusercontent.com/u/38046081?s=460&u=18e106897c8511e6a514900459b8e31f39bbe76f&v=4" alt="douglas" />
                <div>
                    <strong>Douglas Felipe</strong>
                    <span>Quimica</span>
                </div>
            </header>
            <p>
                I love how Black Star comes in at the very last second of the ending scene like "Oh crap I'm supposed to be in this shot!"
                <br></br>
                I love how Black Star comes in at the very last second of the ending scene like "Oh crap I'm supposed to be in this shot!"
                </p>

            <footer>
                <p>
                    Preço/Hora
                        <strong>R$ 80,00</strong>

                </p>

                <button type="button">
                    <img src={whatsappIcon} alt="Entrar em contato" />Entrar em contato
                        </button>
            </footer>
        </article>
    );
}

export default TeacherItem;