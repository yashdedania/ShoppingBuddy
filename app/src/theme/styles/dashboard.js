import { StyleSheet } from 'react-native';
import color from '../../theme/color';
import font from '../../theme/font';
const gstyles = StyleSheet.create({

    cardStack: {
        flex:1,
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'flex-start',
        alignItems:'center',
        paddingTop:20,
        paddingBottom:20,
        paddingLeft:10,
        paddingRight:5,
    },

    cardStyles: {
        borderRadius: 10,
        backgroundColor: 'white',
        height: 160,
        width: '44%',
        alignContent: 'space-between',
        display:'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingBottom: 20,
        marginLeft: 10,
        marginRight:10,
        marginTop:10,
        marginBottom:10
    },
    hideCard:{
        display:'none'
    },

    cardUpper: {
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-between',
    },

    cardIconView: {
        padding: 0,
        margin: 0,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },

    cardIcon: {
        fontSize: 50,
        color: color.primary,
        padding: 0,
        margin: 0,
        marginLeft: 10,
        marginTop: 10,
    },

    circle: {
        width: 40,
        height: 40,
        borderRadius: 100 / 2,
        backgroundColor: color.background,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: color.primary,
        borderWidth: 3,
        padding: 0,
        margin: 15,
        marginRight: 10,
    },
    circledark: {
        width: 40,
        height: 40,
        borderRadius: 100 / 2,
        backgroundColor: color.primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: color.primary,
        borderWidth: 3,
        padding: 0,
        margin: 15,
        marginRight: 10,
    },
    blackfont:{
        color:'rgb(0,0,0)'
    },
    whitefont:{
        color:'rgb(255,255,255)'
    },

    cardNameText: {
        fontFamily: font.bold,
        fontSize: 22,
        marginLeft: 10,
        color: color.primary,

    },
    safeView:{
		flex:1
	},
	username:{
		color:'rgb(255,255,255)',
		fontSize:22,
		marginTop:5
	},
	role:{
		color:'rgb(209, 209, 209)',
		fontSize:14,
        margin:5,
        textAlign:'center'
        
	},
	logoview:{
		flex:0.5,
		justifyContent:'center',
		alignItems:'center',
		height:50,
		backgroundColor:'black',
	},
	logoImg:{
		height:120,
		width:120,
		borderRadius:60,
		borderColor:color.primary,
		borderWidth:3
	},
    dListItem:{
        borderBottomWidth:0,
        paddingLeft:0,
        paddingRight:0,
        paddingTop:7,
        paddingBottom:7,
        marginLeft:0,
        alignItems:'center'
    },
    dcolList:{
        flexDirection:'column',
        alignItems:'flex-start',
        justifyContent:'space-between'
    },
    viewList:{
        flex:1,
        flexDirection:'row'
    },
    dextraList:{
        paddingLeft:10,
        marginTop:5,
        marginBottom:5,
        flex:1,
        flexDirection:'column',
        width:'100%'
    },
    dactBck:{
        backgroundColor:color.background,
    },
    dinactBck:{
        backgroundColor:color.light
    },
    actCol:{
        color:color.primary,
    },
    inactCol:{
        color:'black'
    },
    dLeft:{
        paddingLeft:10,
        display:'flex',
        width:50,
        flex:0,
		flexDirection:'row',
		alignItems:'center',
        justifyContent:'flex-start',
    },
    dRight:{
        paddingRight:5,
		flexDirection:'row',
		display:'flex',
        width:50,
        flex:0,
		justifyContent:'flex-end',
        alignItems:'center',

    },
    dBody:{
        flex:1,
		flexDirection:'row',
		justifyContent:'flex-start',
        alignItems:'center',
        padding:5
    },
    dLabel:{
        fontSize:16,
        fontFamily:font.semibold,
        marginLeft:5,
        marginRight:5
    },
    dIcon:{
        fontSize:22
    },
    dactiveIcon:{

    }

});

export default gstyles;