import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        padding:40,
        backgroundColor: '#8257e5',
    },

    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        fontFamily: 'Archivo_700Bold',
        color: '#FFF',
        maxWidth: 160,
        lineHeight: 32,
        marginVertical:40,
        fontSize:24
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});

export default styles;