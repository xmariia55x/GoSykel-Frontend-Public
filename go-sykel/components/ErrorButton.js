import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, Poppins_300Light } from '@expo-google-fonts/poppins';

import { Colors } from '../colors/Colors';
const ErrorButton = (props) => {
    let [fontsLoaded] = useFonts({
        Poppins_300Light
    });
    if (!fontsLoaded) {
        return <AppLoading />;
    }
    return (
        <TouchableOpacity onPress={props.onPress} style={[styles.button, props.style]}>
            <Text style={styles.buttonText}>{props.title}</Text>
        </TouchableOpacity>
    )
}

export default ErrorButton

const styles = StyleSheet.create({
    buttonText: {
        color: 'white',
        fontFamily: 'Poppins_300Light', 
        fontSize: 20
    },
    button: {
        backgroundColor: Colors.error,
        width: '100%', 
        padding: 10,
        borderRadius: 10,
        alignItems: 'center' 
    },
});