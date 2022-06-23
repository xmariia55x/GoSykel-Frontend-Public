import React, { useState } from 'react'
import { Text, View, StyleSheet, TextInput, SafeAreaView } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import AppLoading from 'expo-app-loading';
import { useFonts, FredokaOne_400Regular } from '@expo-google-fonts/fredoka-one';

import { auth } from '../firebase/Firebase'

import PrimaryButton from '../components/PrimaryButton';
const ALERT_MESSAGE = 'Se ha enviado un correo electrónico con las instrucciones para cambiar tu contraseña.';
const TITLE = 'Cambia tu contraseña';
const EMAIL_LABEL = 'Escribe tu correo electrónico';
const CHANGE_PASSWORD = 'Cambiar contraseña';
const ForgotPassword = () => {
    const navigation = useNavigation()

    const [email, setEmail] = useState('')

    let [fontsLoaded] = useFonts({
        FredokaOne_400Regular
    });

    const handleChangePassword = () => {
        auth.sendPasswordResetEmail(email)
            .then(
                () => {
                    alert(ALERT_MESSAGE);
                    navigation.goBack()
                }, (error) => {
                    alert(error);
                }
            );
    }

    const handleGoBack = () => {
        navigation.goBack()
    }

    if (!fontsLoaded) {
        return <AppLoading />;
    }
    return (
        <SafeAreaView style={styles.container}>
            <Appbar.Header style={{ backgroundColor: 'white' }}>
                <Appbar.BackAction onPress={handleGoBack} />
                <Appbar.Content titleStyle={styles.title} title={TITLE} />
            </Appbar.Header>
            <View style={{ flex: 1, alignSelf: 'center', alignItems: 'center', marginTop: 20 }}>
                <Text style={styles.label}>{EMAIL_LABEL}</Text>
                <TextInput placeholder="example@example.com"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.textInput}
                />
                <PrimaryButton style={styles.changePasswordButton} title={CHANGE_PASSWORD} onPress={handleChangePassword} />
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    title: {
        color: 'black',
        fontFamily: 'FredokaOne_400Regular',
        fontSize: 25
    },
    changePasswordButton: {
        width: '70%',
        marginTop: 35
    },
    textInput: {
        borderColor: 'grey',
        borderWidth: 1,
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 20,
        fontFamily: 'Poppins_300Light', 
        width: 200
    },
    label: {
        color: 'black',
        fontFamily: 'Poppins_300Light',
        fontSize: 15
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    }
});
export default ForgotPassword;