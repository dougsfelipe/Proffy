import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {

        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#e6e6f0',
        marginBottom: 16,
        overflow:'hidden',
    },

    profile: {
        flexDirection:'row',
        alignItems:'center',
        padding:24,
    },
    profileInfo: {
        marginLeft: 16,
    },
    avatar: {
        width:64,
        height:64,
        borderRadius: 32,
        backgroundColor:'#eee'
    },

    name: {
        fontFamily: 'Archivo_400Regular',
        color: '#6a6180',
        fontSize:12,
        marginTop:4,
    },
    subject: {
        fontFamily: 'Poppins_400Regular',
        color: '#6a6180',
        fontSize:12,
        marginTop:4
    },
    bio: {
        margin:24,
        fontFamily: 'Poppins_400Regular',
        lineHeight:24,
        fontSize:14,
        color:'#6a6180'
    },
    footer: {
        backgroundColor: '#fafafc',
        padding:24,
        alignItems:'center'
    },
    price: {
        fontFamily: 'Poppins_400Regular',
        color:'#6a6180',
        fontSize:14,
    },
    priceValue:{
        fontFamily: 'Archivo_700Bold',
        color: '#8257e5',
        fontSize:16
    },
    buttonsContainer:{
        flexDirection: 'row',
        marginTop:16
    },
    favoriteButton: {
        backgroundColor:'#8257e5',
        width:56,
        height:56,
        borderRadius:8,
        justifyContent:'center',
        alignItems:'center',
        marginRight:8,
    },
    contactButton: {
        backgroundColor:'#04d361',
        flex:1,
        height:56,
        borderRadius:8,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginRight:8,
    },
    contactButtonText:{
        color:'#fff',
        fontFamily: 'Archivo_700Bold',
        fontSize:16,
        marginLeft:16
    }, favorited: {
        backgroundColor: '#e33e3d',
    }


});

export default styles;