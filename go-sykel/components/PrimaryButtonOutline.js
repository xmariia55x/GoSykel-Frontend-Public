import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, Poppins_300Light } from '@expo-google-fonts/poppins';

import { Colors } from '../colors/Colors';
const PrimaryButtonOutline = (props) => {
    let [fontsLoaded] = useFonts({
        Poppins_300Light
    });
    if (!fontsLoaded) {
        return <AppLoading />;
    }
    return (
        <TouchableOpacity onPress={props.onPress} style={[styles.button, styles.buttonOutline, props.style]}>
            <Text style={styles.buttonOutlineText}>{props.title}</Text>
        </TouchableOpacity>
    )
}

export default PrimaryButtonOutline

const styles = StyleSheet.create({
    buttonOutlineText: {
        color: Colors.primary,
        fontFamily: 'Poppins_300Light', 
        fontSize: 15
    },
    button: {
        backgroundColor: Colors.primary,
        width: '100%', 
        padding: 10,
        borderRadius: 10,
        alignItems: 'center' 
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5, 
        borderColor:  Colors.primary,
        borderWidth: 2
    },
});