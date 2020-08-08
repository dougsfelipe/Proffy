import React, { useState, FormEvent} from 'react';
import { useHistory } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';

import './style.css';
import Input from '../../components/Input';
import WarningIcons from '../../assests/images/icons/warning.svg';
import Textarea from '../../components/TextArea';
import Select from '../../components/Select';
import api from '../../services/api';


function TeacherForm() {

    const history = useHistory();

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [bio, setBio] = useState('');
    const [whatsapp, setWhatsapp] = useState('');

    const [subject, setSubject] = useState('');
    const [coust, setCoust] = useState('');

    const [scheduleItems, setscheduleItems] = useState(
        [
            { week_day: 0, from: '', to: '' },
        ]

    );


    function addNewScheduleItem() {

        setscheduleItems([
            ...scheduleItems,
            {
                week_day: 0,
                from: '',
                to: '',
            }
        ]);

    }

    function handleCreateClass(e: FormEvent) {

        e.preventDefault();

        console.log(
            name, avatar, whatsapp, bio, subject, coust, scheduleItems
        )
        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(coust),
            schedule: scheduleItems
        }).then(() => {
            alert('Cdastro Realizado');

            history.push('/');
        }).catch(() => {
            alert('Erro no cadastro');
        });
    }

    function setScheduleItemValue(position: number, field: string, value: string) {
        const newArray = scheduleItems.map((scheduleItem, index) => {
            if (index === position) {
                return { ...scheduleItem, [field]: value }
            }

            return scheduleItem;
        });

        setscheduleItems(newArray);
    }


    return (
        <div id="page-teacher-form" className="container">
            <PageHeader
                title="Que incrivel que voce quer dar aulas"
                description="O primeiro passo é preencher esse formulario de inscrição" />

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>


                        <legend>Seus dados</legend>

                        <Input name="name" label="Nome Completo"
                            value={name} onChange={(e) => {
                                setName(e.target.value)
                            }} />
                        <Input name="avatar" label="Avatar"
                            value={avatar} onChange={(e) => {
                                setAvatar(e.target.value)
                            }}
                        />
                        <Input name="whatsapp" label="WhatsApp"
                            value={whatsapp} onChange={(e) => {
                                setWhatsapp(e.target.value)
                            }}
                        />
                        <Textarea name="bio" label="Biografia"
                            value={bio} onChange={(e) => {
                                setBio(e.target.value)
                            }}
                        />

                    </fieldset>

                    <fieldset>

                        <legend>Sobre a Aula</legend>

                        <Select
                            name="subject" label="Matéria"
                            value={subject} onChange={(e) => {
                                setSubject(e.target.value)
                            }}
                            options={[
                                { value: 'Artes', label: 'Artes' },
                                { value: 'Biologia', label: 'Biologia' },
                                { value: 'Matematica', label: 'Matematica' },
                                { value: 'Historia', label: 'Historia' },
                            ]} />


                        <Input name="cost" label="Custo da sua Hora por Aula"
                            value={coust} onChange={(e) => {
                                setCoust(e.target.value)
                            }} />

                    </fieldset>

                    <fieldset>
                        <legend>
                            Horarios Disponiveis
                        <button type="button" onClick={addNewScheduleItem}>
                                + Novo Horário
                     </button>
                        </legend>

                        {scheduleItems.map((scheduleItem, index) => {
                            return (
                                <div key={scheduleItem.week_day} className="schedule-item">
                                    <Select
                                        name="week_day" label="Dia da Semana"
                                        value={scheduleItem.week_day}
                                        onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                                        options={[
                                            { value: '1', label: 'Segunda-feira' },
                                            { value: '2', label: 'Terca-feira' },
                                            { value: '3', label: 'Quarta-feira' },
                                            { value: '4', label: 'Quinta-feira' },
                                            { value: '5', label: 'Sexta-feira' },
                                            { value: '6', label: 'Sabado' },
                                            { value: '0', label: 'Domingo' },
                                        ]} />

                                    <Input name="from" label="Das" type="time"
                                        onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                                        value={scheduleItem.from} />
                                    <Input name="to" label="Ate" type="time"
                                        onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                                        value={scheduleItem.to} />
                                </div>

                            )
                        })}

                    </fieldset>
                    <footer>
                        <p>
                            <img src={WarningIcons} alt="Importante" />
                            importante! <br />
                            Preencha Todos os Dados
                    </p>
                        <button type="submit">
                            Salvar Cadastro
                    </button>
                    </footer>
                </form>

            </main>
        </div>
    )
}

export default TeacherForm;