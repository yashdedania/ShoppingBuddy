import { StyleSheet } from 'react-native';
import color from '../../theme/color';
import font from '../../theme/font';
import AuthLoadingScreen from '../../components/AuthLoadingScreen';

const styles = StyleSheet.create({
    
    cardBody: {
      backgroundColor: 'white',
      width: '100%',
      borderRadius: 5,
      margin: 5,
      alignSelf: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      paddingTop:10,
      paddingBottom:10
    },  

    circle: {
        width: 95,
        height: 95,
        borderRadius: 100 / 2,
        backgroundColor: 'white',
        borderColor: 'rgb(255, 89, 100)',
        borderWidth: 3,
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        alignSelf: 'center',
    },

    thumbnailStyles: {
      height: 80, 
      width: 80, 
    },
    textView: {
      height:'auto',
      width:'64%',
      paddingLeft:5,
      paddingRight:5
    },
    nameEmployee: {
      marginTop: 5,
      paddingTop: 5
    },
    employeenameStyle: {
      fontFamily: font.bold,
      fontSize: 17,
  },
    AccessContrl: {
      marginTop: 10,
      alignSelf: 'flex-start',
    },

  editIcon: {
    fontSize: 30, 
    color: color.primary, 
    paddingTop: 10,
    marginRight:10
  },
  actionCard: {
    backgroundColor: 'white',
      height: 70,
      width: 360,
      borderRadius: 5,
      marginTop: 7,
      alignSelf: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
  },
  callIconView: {
    alignItems: 'center', 
    width: 150, 
    justifyContent: 'center',
  },
  callIcon: {
   fontSize: 40,
   color: color.primary,
  },
  messagetextView: {
    justifyContent: 'center',
  },
  calltextstyle: {
    fontFamily: font.bold,
    fontSize: 15,
  },
  verticalLine: {
    fontSize: 50, 
    alignSelf: 'center',
    justifyContent: 'center',
    color: color.primary,
  },
  MessageIconView: {
    alignItems: 'center', 
    width: 150, 
    justifyContent: 'center'
  },
  messageIcon: {
    fontSize: 40, 
    color: color.primary,
  },
  messagetextstyle: {
    fontFamily: font.bold,
    fontSize: 15,
    textAlign: 'center',
  },
  requestdetailheaderview: {
    height: 40, 
    backgroundColor: 'white', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    borderTopWidth: 3, 
    borderBottomWidth: 3, 
    borderColor: color.primary,
    marginTop: 7,
},
requestdetailheadertext: {
    fontSize: 20, 
    fontFamily: font.semibold, 
    color: 'black' 
},

SalesIcon: {
  fontSize: 30,
  color: color.primary,
 },
 activityCard: {
  backgroundColor: 'white',
  height: 100,
  width: 342,
  borderRadius: 5,
  alignSelf: 'center',
  justifyContent: 'space-around',
  flexDirection: 'row',
 }, 
circleActivites: {
  width: 70,
  height: 70,
  borderRadius: 100 / 2,
  backgroundColor: 'white',
  alignItems: 'center',
  justifyContent: 'center',
  borderColor: 'rgb(255, 89, 100)',
  borderWidth: 3,
  flexDirection: 'row',
  alignSelf: 'center',
},
activitynameView: {
    alignItems: 'center',
    alignSelf: 'center',
    marginRight: 30,
},
activityTextView: {
  alignSelf: 'center',
},
ActivityText: {
  fontFamily: font.bold,
  fontSize: 20,
  color: color.primary,
},

DetailsHeadingStyles: {
  fontFamily: font.semibold,
  fontSize: 17,
},

ActivityTextDetails: {
  paddingTop: 5,
  flexWrap: 'wrap',
  alignItems: 'center',
},
ActivityTextDetailsContent: {
  paddingTop: 2,
  fontFamily: font.regular,
  fontSize: 15,
},
dateTimeTitle:
{
  fontSize: 13, 
  fontFamily: font.bold, 
  color: color.dimgrey,
},
dateTimeContent: {
  fontSize: 13, 
  fontFamily: font.medium, 
  color: color.dimgrey, 
},
ActivityOuterCard: {
  backgroundColor: 'white',
  height: 125,
  width: 345,
  borderRadius: 5,
  alignSelf: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 7,
},
dateTimeView: {
  height: 15, 
  width: 342, 
  flexDirection: 'row', 
  justifyContent: 'flex-start', 
  display: 'flex',
},

  });

  export default styles;