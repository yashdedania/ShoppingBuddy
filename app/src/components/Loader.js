import React from "react";
import { 
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    Modal
} from "react-native";
import color from '../theme/color';

const Loader = (props) => {
    
    const {loading , ...attributes} = props;
    return(
        <Modal 
            transparent ={true}
            animationType={'none'}
            visible ={loading}
            onRequestClose={() => {console.log("Modal close")}}>
                <View style={styles.modalBackground}>
                    <View style={styles.activityIndicatorWrapper}>
                    <ActivityIndicator size="large" animating={loading} color={color.primary} />
                    </View>
                </View>
        </Modal>
    );
}
export default Loader;

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000060',
      },
      activityIndicatorWrapper: {
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
      }
});