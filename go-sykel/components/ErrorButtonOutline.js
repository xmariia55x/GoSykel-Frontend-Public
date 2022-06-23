import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { Colors } from '../colors/Colors';
const ErrorButtonOutline = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={[styles.button, styles.buttonOutline, props.style]}>
            <Text style={styles.buttonOutlineText}>{props.title}</Text>
        </TouchableOpacity>
    )
}

export default ErrorButtonOutline

const styles = StyleSheet.create({
    buttonOutlineText: {
        color: Colors.error,
        fontFamily: 'Poppins_300Light', 
        fontSize: 15
    },
    button: {
        backgroundColor: Colors.error,
        width: '100%', 
        padding: 10,
        borderRadius: 10,
        alignItems: 'center' 
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5, 
        borderColor:  Colors.error,
        borderWidth: 2
    },
});