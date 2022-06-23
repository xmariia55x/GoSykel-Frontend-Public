import { View, TextInput, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import AppLoading from 'expo-app-loading';
import { useFonts, Poppins_300Light } from '@expo-google-fonts/poppins';

import { auth } from '../firebase/Firebase'
import { Colors } from '../colors/Colors';
import PrimaryButton from '../components/PrimaryButton';
import PrimaryButtonOutline from '../components/PrimaryButtonOutline';
import Header from '../components/Header';
import { useUser } from '../context/UserContext';

const ALERT_MESSAGE = 'Debe rellenar todos los campos para iniciar sesión.';
const HEADER_TITLE = '¡Bienvenido!';
const HEADER_SUBTITLE = 'Inicia sesión para continuar';
const LABEL_EMAIL = 'Correo electrónico';
const LABEL_PASSWORD = 'Contraseña'; 
const LABEL_FORGOT_PASSWORD = '¿Has olvidado tu contraseña?';
const LOGIN_BUTTON_TITLE = 'Iniciar sesión';
const REGISTER_BUTTON_TITLE = '¿Aún no tienes cuenta? Regístrate';
const Login = () => {
    const navigation = useNavigation()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const isEmpty = (string) => {
        return string.trim().length === 0
    }

    const {sendLogInInformation, token} = useUser();

    const handleLogIn = async () => {
        if (isEmpty(email) || isEmpty(password)) {
            alert(ALERT_MESSAGE);
        } else {
            try {
                let response = await auth.signInWithEmailAndPassword(email, password)
                let user = response.user //userCredential
                await sendLogInInformation(email)
                navigation.navigate('Navigation', { screen: 'BycicleLanesNavigation', params: { screen: 'BycicleLanes', params: { previousScreen: "Login" }}});
            } catch (error) {
                alert(error.message)
            }
        }
    }

    const handleGoBack = () => {
        navigation.goBack()
    }

    const handleMoveToSignUpScreen = () => {
        navigation.navigate("WelcomeNavigation", {screen: "SignUp"})
    }

    const handleForgotPassword = () => {
        navigation.navigate("WelcomeNavigation", {screen: "ForgotPassword"})
    }
    let [fontsLoaded] = useFonts({
        Poppins_300Light
    });
    if (!fontsLoaded) {
        return <AppLoading />;
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View
                style={styles.container}>
                <Header title={HEADER_TITLE} subtitle={HEADER_SUBTITLE} />

                <View>
                    <Text style={styles.label}>{LABEL_EMAIL}</Text>
                    <TextInput placeholder="example@example.com"
                        value={email}
                        onChangeText={text => setEmail(text)}
                        style={styles.textInput}
                    />
                    <Text style={styles.label}>{LABEL_PASSWORD}</Text>
                    <TextInput placeholder="Escribe aquí tu contraseña"
                        value={password}
                        onChangeText={text => setPassword(text)}
                        style={styles.textInput}
                        secureTextEntry />

                </View>
                <TouchableOpacity onPress={handleForgotPassword}>
                    <Text style={[styles.label, styles.forgetPassword]}>{LABEL_FORGOT_PASSWORD}</Text>
                </TouchableOpacity>
                <PrimaryButton style={styles.logInButton} title={LOGIN_BUTTON_TITLE} onPress={handleLogIn} />
                <PrimaryButtonOutline style={styles.signInPrimaryButton} title={REGISTER_BUTTON_TITLE} onPress={handleMoveToSignUpScreen} />
                <Ionicons name="arrow-back" style={styles.goBackButton} size={30} color="black" onPress={handleGoBack} />
            </View>
        </SafeAreaView>

    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    textInput: {
        borderColor: 'grey',
        borderWidth: 1,
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 20,
        fontFamily: 'Poppins_300Light',
    },
    label: {
        color: 'black',
        fontFamily: 'Poppins_300Light',
        fontSize: 15,
        marginTop: 15
    },
    logInButton: {
        width: '80%',
        marginTop: 35,
        marginBottom: 20
    },
    signInPrimaryButton: {
        width: '80%',
    },
    goBackButton: {
        width: 42,
        height: 42,
        position: 'absolute',
        top: 50,
        left: 15,
    },
    forgetPassword: {
        color: Colors.secondary
    }
});