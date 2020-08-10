import React from 'react';
import { View, ImageBackground } from 'react-native';
import { Image, Text, TouchableOpacity} from 'react-native';

import styles from './style';
import giveClassBgImage from '../../assets/images/give-classes-background.png';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';


function GiveClasses() {

    const {goBack} = useNavigation();

    function handleNavigateBack() {
        goBack();
    }

    return (
        <View style={styles.conatainer}>
            <ImageBackground source={giveClassBgImage} style={styles.content}  resizeMode= 'contain'>
            <Text style={styles.title}>Quer ser um Proffy?</Text>
            <Text style={styles.description}>Para começar, você precisa se cadastrar como professor na nossa
            plataforma web</Text>
            </ImageBackground>
            <RectButton onPress={handleNavigateBack} style={styles.okButton}>
                <Text style={styles.okButtonText}>Tudo Bem</Text>

            </RectButton>
            </View>
    );
}

export default GiveClasses;