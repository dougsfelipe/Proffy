import React, { useState , useEffect} from 'react';
import { View , Image, Text, TouchableOpacity} from 'react-native';
import styles from './style';

import { RectButton } from 'react-native-gesture-handler';
import landingImage from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import HeartIcon from '../../assets/images/icons/heart.png';
import { useNavigation} from '@react-navigation/native';
import api from '../../services/api';



function Landing() {

    const navigation = useNavigation();

    const [totalConnections,settotalConnections] = useState(0);

    useEffect(() => {
        api.get('conncections').then(response => {
            const {total} = response.data;

            settotalConnections(total);
        })
    }, []);



    function handleNavigationToGiveClassesPage(){
        navigation.navigate('GiveClasses');
    }

    function handleNavigateToStudyPages(){
        navigation.navigate('Study');
    }

    return   (
    <View style={styles.conatainer}>
        <Image source={landingImage} style={styles.banner} />
        <Text style={styles.title}>
            Seja Bem-Vindo, {'\n'}
            <Text style={styles.titleBold}>O que deseja fazer?</Text>
        </Text>

        <View style={styles.buttonContainer}>
            <RectButton onPress={handleNavigateToStudyPages} style={[styles.button, styles.buttonPrimary]}> 
                <Image source={studyIcon} />
                <Text style={styles.buttonText}>Estudar</Text>
            </RectButton>

        
            <RectButton onPress={handleNavigationToGiveClassesPage} style={[styles.button, styles.buttonSecondary]}> 
                <Image source={giveClassesIcon} />
                <Text style={styles.buttonText}>Dar Aulas</Text>
            </RectButton>

        </View>
    
        <Text style={styles.totalConnections}>
            Total de {totalConnections} conexões  já realizadas {' '}
            <Image source={HeartIcon} />
        </Text>
    </View>

    
        );
    
}
export default Landing