import React from 'react';
import { View, Image, Text, Linking } from 'react-native';

import styles from './style';

import AsyncStorage from '@react-native-community/async-storage';
import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';
import { RectButton } from 'react-native-gesture-handler';
import { useState } from 'react';
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

interface TeacherItemsProps {
    teacher: Teacher_Import;
    favorited: boolean;
}


const TeacherItem: React.FC<TeacherItemsProps> = ({ teacher, favorited }) => {

    const [isFavorited, setIsFavorited] = useState(favorited);

    function handleWhatsapp() {

        Linking.openURL(`whatsapp://send?text=Hello World!&phone=+55${teacher.whatsapp}"`);
        api.post('conncections', {user_id: teacher.id})
    }

    

    async function handleToogleFavorited() {
        const favorites = await AsyncStorage.getItem('favorites');

        let favoritesArray = [];

        if (favorites) {
            favoritesArray = JSON.parse(favorites);
        }


        if (isFavorited) {
            const favotireIndex = favoritesArray.findIndex((teacherItemid: Teacher_Import) => {
                return teacherItemid.id === teacher.id;
            });
            favoritesArray.splice(favotireIndex, 1);
            setIsFavorited(false);
                
        } else {

            favoritesArray.push(teacher);

            setIsFavorited(true);
            
        }
        await AsyncStorage.setItem('favoritos', JSON.stringify(favoritesArray));

    }

    return (
        <View style={styles.container}>

            <View style={styles.profile}>
                <Image
                    style={styles.avatar}
                    source={{ uri: teacher.avatar }}
                />
                <View style={styles.profileInfo}>
                    <Text style={styles.name}>{teacher.name}</Text>
                    <Text style={styles.subject}>{teacher.subject}</Text>

                </View>
            </View>
            <Text style={styles.bio}>
                {teacher.bio}
            </Text>

            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço/Hora {' '}
                    <Text style={styles.priceValue}>R$ {teacher.cost}</Text>
                </Text>

                <View style={styles.buttonsContainer}>

                    <RectButton onPress={handleToogleFavorited} style={[
                        styles.favoriteButton, isFavorited ? styles.favorited : {}
                    ]}>
                        {isFavorited ? <Image source={unfavoriteIcon} /> : <Image source={heartOutlineIcon} />}

                    </RectButton>

                    <RectButton style={styles.contactButton} onPress={handleWhatsapp}>
                        <Image source={whatsappIcon} />
                        <Text style={styles.contactButtonText}>Entrar em Contato</Text>
                    </RectButton>
                </View>
            </View>

        </View>
    );
}

export default TeacherItem;