import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';


import logoImg from '../../assests/images/logo.svg';
import landingImg from '../../assests/images/landing.svg';
import studyIcons from '../../assests/images/icons/study.svg';
import giveClassesIcon from '../../assests/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assests/images/icons/purple-heart.svg';
import api from '../../services/api';
import './style.css';

function Landing() {

    const [totalConnections,settotalConnections] = useState(0);

    useEffect(() => {
        api.get('conncections').then(response => {
            const {total} = response.data;

            settotalConnections(total);
        })
    }, []);

    return (
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                <div className="logo-container">
                    <img src={logoImg} alt="" />
                    <h2>Sua Plataforma de estudos online</h2>
                </div>

                <img src={landingImg} alt="Plataforma de Estudos" className="hero-image" />

                <div className="buttons-container">
                    <Link to="/study" className="study">
                        <img src={studyIcons} alt="Estudar" />
                        Estudar
                    </Link>
                    <Link to="/give-classes" className="give-classes">
                        <img src={giveClassesIcon} alt="Estudar" />
                        Dar Aulas
                    </Link>
                </div>
                <span className="total-connections">
                    Total de {totalConnections} conexoes já realizadas 
                    <img src={purpleHeartIcon} alt=""/>
                </span>
            </div>
        </div>

    )
}

export default Landing;