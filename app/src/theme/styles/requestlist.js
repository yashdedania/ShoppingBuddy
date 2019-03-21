import { StyleSheet } from 'react-native';
import color from '../../theme/color';
import font from '../../theme/font';

const styles = StyleSheet.create({
    
    cardStyles: {
        borderRadius: 100,
        borderWidth: 10,
        backgroundColor: color.primary,
    },
    CardItem:{
        paddingLeft:0,
        paddingRight:0,
        paddingTop:0,
        paddingBottom:0,
        marginTop:10
    },
    cardHeaderStyle: {
        color: color.primary,
        fontFamily: font.bold,
    }, 
    cardIcon: {
        fontSize: 40,
        color: color.primary,
        marginRight: 5,
    }, 
    cardBody: {
        paddingLeft: 20,
    },
    bodyText: {
        display: 'flex',
        fontFamily: font.semibold,
        fontSize: 15,
    },
    Card:{
        marginTop:10,
        marginBottom:10,
        marginRight:10,
        marginLeft:10,
        elevation:7
    },
    ViewDetailsBodyStyle: {
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    textBack:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:color.primary,
        padding:10
    },
    subBack:{
        backgroundColor:'rgb(255,255,255)',
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding:10
    },
    boldText: {
        fontFamily: font.bold,
    },
    viewDetailsText: {
        fontFamily: font.bold,
        color: color.primary,
    },
    acceptText:{
        fontFamily:font.bold,
        color:'rgb(255,255,255)'
    },
    deleteText:{
        fontFamily:font.bold,
        color:color.warning
    },
    DateTimeBody: {
        flex: 1, 
        paddingLeft: 20, 
    }
  });

  export default styles;