import React, { useState , useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {View } from 'react-native';

import styles from './styles';
import PageHeader from '../../components/PageHeader';
import { ScrollView } from 'react-native-gesture-handler';
import TeacherItem, { Teacher_Import } from '../../components/TeacherItem';
import AsyncStorage from '@react-native-community/async-storage';

function Favorites() {

    const [fovorites, setFovorites] = useState([]);
    
    function loadFavorites(){
        AsyncStorage.getItem('favorites').then(response => {
            if(response){
                const favoritedTeachers = JSON.parse(response);
                setFovorites(favoritedTeachers);
            }
        });
        
    }

    useFocusEffect(() => {
        loadFavorites();
    })
    
    return (
        <View style={styles.container}>
    
            <PageHeader title="Meus Proffys favoritos"/>

            <ScrollView
            style={styles.teacherList}
            contentContainerStyle={{paddingHorizontal:16,paddingBottom:16}}>
               {fovorites.map((teacher: Teacher_Import) => {
                   return (
                       <TeacherItem key={teacher.id} teacher={teacher} favorited />
                   )
               })}

            </ScrollView>

        </View>)
}

export default Favorites;