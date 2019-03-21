import { StyleSheet } from 'react-native';
import color from '../color';
import font from '../font';

const styles = StyleSheet.create({

    viewIconText: {
        display: 'flex', 
        alignItems: 'center', 
        paddingTop: 5,
    },
    editIcon:{
        fontSize:30,
        color:color.primary,
        marginLeft:20
    },
    formulaLabel:{
        color:color.success,
        fontFamily:font.bold,
        fontSize:18,
        marginRight:5
    },
    IconStyle: {
        fontSize: 150, 
        color: color.primary, 
    },
    requesttext: {
        fontSize: 20, 
        fontFamily: font.medium, 
        paddingTop: 10, 
        paddingBottom: 10, 
    },
    requestdetailheaderview: {
        padding:7, 
        backgroundColor: 'white', 
        display: 'flex', 
        flexDirection:'row',
        alignItems: 'center', 
        justifyContent: 'center', 
        borderTopWidth: 3, 
        borderBottomWidth: 3, 
        borderColor: color.primary,
    },
    requestdetailheadertext: {
        fontSize: 20, 
        fontFamily: font.semibold, 
        color: color.primary 
    },
    listItemheader: {
        fontFamily: 'Raleway_bold', 
        fontSize: 15,
   },
   
   listitemstyle: {
    textAlign: 'center',
    },
    ButtonContainer:{
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-around',
        alignItems:'center',
        backgroundColor:color.background,
        padding:5
    },
    
    disable:{
        borderWidth:0,
        borderBottomWidth:0,
        height:30
    },
    enable:{
        
        borderTopWidth:1,
        borderBottomWidth:1,
        borderLeftWidth:1,
        borderRightWidth:1
    },
    inProcess:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',

    },
    inProcessText:{
        color:color.success,
        fontSize:20
    },
    ModalContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingTop:15,
        paddingBottom:15,
        paddingLeft:10,
        paddingRight:10
    },
    Modaltitle:{
        color:'black',
        fontFamily:font.bold,
        textAlign:'center',
        fontSize:22,
    },
    Modalclose:{
        color:color.primary,
        fontSize:28,
        textAlign:'right',
        marginRight:10,
    }
  });


  
export default styles;