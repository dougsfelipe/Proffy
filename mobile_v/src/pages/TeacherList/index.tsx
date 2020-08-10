import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher_Import } from '../../components/TeacherItem';
import { ScrollView, TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { useState , useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { FormEvent } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {useFocusEffect} from '@react-navigation/native';

import api from '../../services/api';
import Favorites from '../Favorites';

function TeacherList() {

    const [isFilterVisible, setisFilterVisible] = useState(false);
    const [teachers, setTeachers] = useState([]);
    const [fovorites, setFovorites] = useState<number[]>([]);

    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    function loadFavorites(){
        AsyncStorage.getItem('favorites').then(response => {
            if(response){
                const favoritedTeachers = JSON.parse(response);
                const favoritedTeachersId = favoritedTeachers.map((teacher : Teacher_Import) => {return teacher.id})
                setFovorites(favoritedTeachersId);
            }
        })
        
    }


 


    function handleToogleFilterVisible() {
        setisFilterVisible(!isFilterVisible);
        
    }

    async function handleFiltersSubmit(){
        loadFavorites();
         const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time,
            }
        });
        setTeachers(response.data);
        setisFilterVisible(false); 

    }

  


    return (
        <View style={styles.container}>

            <PageHeader title="Proffys Disponiveis" headerRight={<BorderlessButton onPress={handleToogleFilterVisible}>
                <Feather name="filter" size={20} color="#fff" />
            </BorderlessButton>}>
                {isFilterVisible && (
                    <View style={styles.searchForm}>
                        <Text style={styles.label}>Materia</Text>
                        <TextInput
                            style={styles.input}
                            value={subject}
                            onChangeText={text => setSubject(text)}
                            placeholder="Qual a materia"
                            placeholderTextColor="#c1bccc" />

                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da Semana</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Qual dia ?"
                                    value={week_day}
                                    onChangeText={text => setWeekDay(text)}
                                    placeholderTextColor="#c1bccc" />
                            </View>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horario</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Qual Horario ?"
                                    value={time}
                                    onChangeText={text => setTime(text)}
                                    placeholderTextColor="#c1bccc" />
                            </View>
                        </View>

                        <RectButton style={styles.submitButton} onPress={handleFiltersSubmit}>
                            <Text style={styles.submitButtonText} >Filtrar</Text>
                        </RectButton>
                    </View>)}
            </PageHeader>
            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}>
                    {teachers.map((teacher: Teacher_Import) => {
                        return (<TeacherItem key={teacher.id} 
                            teacher={teacher}
                            favorited={fovorites.includes(teacher.id)} />)
                    })}
                

            </ScrollView>


        </View>)
};

export default TeacherList;