import React from 'react';
import { Link } from 'react-router-dom';

import backIcon from '../../assests/images/icons/back.svg'
import logoImg from '../../assests/images/logo.svg';

import './style.css';

interface PageHeadeProps {
    title: string;
    description?: string;
}


const PageHeader: React.FC<PageHeadeProps> = (props) => {
    return (

        <header className="page-header">
            <div className="top-bar-container">
                <Link to="/">
                    <img src={backIcon} />
                </Link>
                <Link to="/">
                    <img src={logoImg} />
                </Link>
            </div>

            <div className="header-content">
                <strong>{props.title}</strong>

                {props.description ? <p>{props.description}</p> : null}
            </div>
            {props.children}
        </header>


    )
}

export default PageHeader
