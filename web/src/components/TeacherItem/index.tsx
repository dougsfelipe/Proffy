import React from 'react';
import whatsappIcon from '../../assests/images/icons/whatsapp.svg';

import './style.css';
import api from '../../services/api';

export interface Teacher_Import {


    avatar: string;
    bio: string;
    cost: number;
    name: string;
    id: number;
    subject: string
    whatsapp: string;

}

interface TeacherItemProps {
    teacher: Teacher_Import;
}

const TeacherItem: React.FunctionComponent<TeacherItemProps> = ({ teacher }) => {

    function createNewConnection(){
        api.post('conncections', {
            user_id: teacher.id,
        });
    }
    return (
        <article className="teacher-item">
            <header>
                <img src={teacher.avatar} alt={teacher.name} />
                <div>
                    <strong>{teacher.name}</strong>
                    <span>{teacher.subject}</span>
                </div>
            </header>
            <p>
                {teacher.bio}

            </p>
                <footer>
                    <p>
                        Preço/Hora
                        <strong>R$ {teacher.cost} </strong>

                    </p>

                    <a onClick={createNewConnection} href={`https://wa.me/${teacher.whatsapp}`} type="button">
                        <img src={whatsappIcon} alt="Entrar em contato" />Entrar em contato
                        </a>
                </footer>
            </article>
            )
        
        }
           
        
        
export default TeacherItem;