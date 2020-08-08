import React, { useState, FormEvent } from 'react';

import PageHeader from '../../components/PageHeader';


import './style.css';
import TeacherItem, { Teacher_Import } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';
import { futimesSync } from 'fs';
import api from '../../services/api';

interface Teacher{
    id:number;
}

function TeacherList() {

    const [teachers, setTeachers] = useState([]);

    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');



    async function searchTeachers(e: FormEvent) {
        e.preventDefault();

        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time,
            }
        });

        setTeachers(response.data);
    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Esses são os proffys disponiveis" >
                <form id="search-teachers" onSubmit={searchTeachers}>

                    <Select
                        name="subject" label="Matéria"
                        value={subject}
                        onChange={e => { setSubject(e.target.value) }}
                        options={[
                            { value: 'Artes', label: 'Artes' },
                            { value: 'Biologia', label: 'Biologia' },
                            { value: 'Matematica', label: 'Matematica' },
                            { value: 'Historia', label: 'Historia' },
                        ]} />

                    <Select
                        name="week_day" label="Dia da Semana"
                        value={week_day}
                        onChange={e => { setWeekDay(e.target.value) }}
                        options={[
                            { value: '1', label: 'Segunda-feira' },
                            { value: '2', label: 'Terca-feira' },
                            { value: '3', label: 'Quarta-feira' },
                            { value: '4', label: 'Quinta-feira' },
                            { value: '5', label: 'Sexta-feira' },
                            { value: '6', label: 'Sabado' },
                            { value: '0', label: 'Domingo' },
                        ]} />
                    <Input type="time" name="time" label="Hora"
                        value={time}
                        onChange={e => {
                            setTime(e.target.value)
                        }

                        } />

                        <button type="submit"> 
                            Buscar
                        </button>
                </form >
            </PageHeader>

            <main>

                {teachers.map((teacher: Teacher_Import) =>{
                    return <TeacherItem key={teacher.id} teacher={teacher} />
                })};

                {/* <TeacherItem />
                <TeacherItem />
                <TeacherItem /> */}
            </main>
        </div>


    )
}

export default TeacherList;