import { StyleSheet } from 'react-native';
import color from '../../theme/color';
import font from '../../theme/font';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
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
      inventoryCardText: {
        fontWeight: 'bold',
      },   
  });

  export default styles;