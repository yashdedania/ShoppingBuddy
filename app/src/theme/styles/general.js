import { StyleSheet } from 'react-native';
import color from '../color';
import font from '../font';

const gstyles = StyleSheet.create({
    container_background: {
      flex: 1,
      backgroundColor: color.background,
    },
    circle: {
        width: 60,
        height: 60,
        borderRadius: 100 / 2,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'rgb(255, 89, 100)',
        borderWidth: 3,
      },
    scrollview: {
        flexGrow: 1,
        justifyContent: 'center', 
        backgroundColor: color.background,
        padding: 5,
    },
    salesText:{
        color:color.primary,
        fontSize:20,
        fontFamily: font.bold,
    },
    h1: { textAlign: 'center',
          fontFamily: font.bold, 
          fontSize: 25,
          padding: 10 },
          hometext: {
          margin: 50,
          color: 'rgb(0,0,0)'
      },
    inputlabel: { paddingBottom: 3, borderRadius: 5,fontSize:16 },   
    header: {
      backgroundColor: 'rgb(237, 51, 56)',
      height: 70,
      paddingTop: 15
    },
    listItemheader: {
        fontFamily: 'Raleway_bold', 
        fontSize: 15,
   },
    helpertext:{
        fontSize:12,
        paddingRight:10,
        color:'rgb(225, 23, 23)'
    },
    rightHelper:{
        fontSize:12,
        paddingRight:10,
        color:color.success
    },
    formulaLabel:{
        color:color.success,
        fontFamily:font.bold,
        fontSize:18,
        marginRight:5
    },
    icon: {
      fontSize: 28,
      color: 'white'
    },
    Contentstyle: {
        padding: 10,
    },
    inputFields: {
        borderWidth: 5,
        },
    ouritem: { 
        backgroundColor: 'rgb(255,255,255)', 
        borderRadius: 5,
        height:45,
    },
    emptyContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    textBold: {
        fontFamily: font.bold,
    },
    textRegular: {
        fontFamily: font.regular,
    },
    textMedium: {
        fontFamily: font.medium,
    },
    textSemibold: {
        fontFamily: font.semibold,
    },
    searchbarContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        paddingTop:10,
        paddingBottom:10,
        paddingRight:20,
        paddingLeft:20,
        backgroundColor:color.background,
    },
    searchbar:{
        borderLeftWidth:1,
        borderRightWidth:1,
        borderTopWidth:1,
        borderBottomWidth:1,
        height:40,
        flex:1,
    },
    profileContainer:{
        display:'flex',
        width:'100%',
        height:'auto',
        justifyContent:'center',
        alignItems:'center',
        margin:10
    },
    profilecircle:{
        display:'flex',
        borderRadius:50,
        borderColor:color.primary,
        borderWidth:4,
        justifyContent:'center',
        alignItems:'center'
    },
    profileBack:{
        display:'flex',
        width:100,
        height:100,
        borderRadius:50,
        justifyContent:'flex-end',
        alignItems:'flex-end'
    },
    profileIcon:{
        fontSize:22,
        color:'rgb(33, 33, 33)'
    }
        
  });

  export default gstyles;
