// App colors.
import {StyleSheet, Platform} from 'react-native';
const colors = {
  primary: "rgb(48, 48, 48)"
};

const theme = {
  colors: {
    primary: colors.primary
  },
};

export { colors, theme };


export default styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    heading: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    menuItem:{
        padding: 10,
        borderWidth: 0.5,
        borderColor: '#d6d7da'
    }
});