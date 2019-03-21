import {StyleSheet} from 'react-native';
import color from '../color';
import font from '../font';

const styles = StyleSheet.create({
    formContainer:{
        flex:1,
        justifyContent:'space-between',
        paddingTop:4,
        paddingBottom:4,
        paddingRight:2,
        paddingLeft:2,
        marginLeft:0,
        marginRight:0,
        alignItems:'center',
        alignContent:'center',
        borderBottomWidth:0
    },
    checkConatainer:{
        display:'flex',
        width:'50%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:5,
        marginBottom:5
    },
    formLeft:{
        display:'flex',
        flex:0.8,
        flexDirection:'column',
        justifyContent:'space-between',
        alignItems:'flex-start',
        paddingLeft:0,
        paddingRight:0,
        marginLeft:2,
        marginRight:3
    },
    formBody:{
        flex:1
    },
    formIcon:{
        marginRight:5,
        fontSize:16,
    },
    divider:{
        marginTop:5,
        marginBottom:5,
        padding:10
    },
    plusback:{
        margin:5,
        backgroundColor:color.primary,
        padding:10,
        borderRadius:50
    },
    plusicon:{
        color:'rgb(255,255,255)',
        fontSize:16
    }
});
export default styles;