import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { Colors } from '../colors/Colors';
const EditProfileButton = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={[styles.button, styles.buttonOutline]}>
                <Feather name="edit-2" size={24} color={Colors.primary} style={{padding: 5}} />
                <Text style={styles.buttonOutlineText}>{props.title}</Text>
        </TouchableOpacity>
    )
}

export default EditProfileButton

const styles = StyleSheet.create({
    buttonOutlineText: {
        color: Colors.primary,
        fontFamily: 'Poppins_300Light',
        fontSize: 15
    },
    button: {
        backgroundColor: Colors.primary,
        width: '100%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 7,
        paddingHorizontal: 9,
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5, 
        borderColor: Colors.primary,
        borderWidth: 2
    },
});