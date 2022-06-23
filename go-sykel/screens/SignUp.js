import { View, TextInput, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import AppLoading from 'expo-app-loading';
import { useFonts, Poppins_300Light } from '@expo-google-fonts/poppins';

import { auth } from '../firebase/Firebase'
import PrimaryButton from '../components/PrimaryButton';
import Header from '../components/Header';
import { useUser } from '../context/UserContext';

const FILL_IN_THE_FIELDS = 'Debe rellenar todos los campos para registrarse correctamente.';
const PASSWORD_MIN_6_CHARACTERS = 'La contraseña debe tener como mínimo 6 caracteres.';
const PASSWORDS_NOT_EQUAL = 'Las contraseñas no coinciden.';
const WELCOME_HEADER_TITLE = '¡Bienvenido!';
const WELCOME_HEADER_SUBTITLE = 'Regístrate para continuar';
const NICKNAME_LABEL = 'Nombre de usuario';
const EMAIL_LABEL = 'Correo electrónico';
const PASSWORD_LABEL = 'Contraseña';
const PASSWORD_PLACEHOLDER = "Mínimo 6 caracteres";
const REPEAT_PASSWORD_LABEL = 'Confirma tu contraseña';
const REPEAT_PASSWORD_PLACEHOLDER = "Repetir contraseña (min 6 caracteres)";
const SIGN_IN_BUTTON_TITLE = '¡A pedalear!';

const SignUp = () => {
    const navigation = useNavigation()

    const [nickname, setNickname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatedPassword, setRepeatedPassword] = useState('')

    const { createNewUser, token } = useUser();

    const isEmpty = (string) => {
        return string.trim().length === 0
    }
    const handleSignUp = async () => {
        if (isEmpty(nickname) || isEmpty(email)
            || isEmpty(password) || isEmpty(repeatedPassword)) {
            alert(FILL_IN_THE_FIELDS);
        } else if (password.trim().length < 6 || repeatedPassword.trim().length < 6) {
            alert(PASSWORD_MIN_6_CHARACTERS);
        } else if (password.trim() != repeatedPassword.trim()) {
            alert(PASSWORDS_NOT_EQUAL);
        } else {
            try {
                let response = await auth.createUserWithEmailAndPassword(email, password)
                //response.user o response.user.uid para sacar la info del usuario
                await createNewUser(email, nickname);
                navigation.navigate('Navigation', { screen: 'BycicleLanesNavigation', params: { screen: 'BycicleLanes', params: { previousScreen: "SignUp" } } });
            } catch (error) {
                alert(error.message)
            }
        }
    }

    const handleGoBack = () => {
        navigation.goBack()
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
                <Header title={WELCOME_HEADER_TITLE} subtitle={WELCOME_HEADER_SUBTITLE} />

                <View>
                    <Text style={styles.label}>{NICKNAME_LABEL}</Text>
                    <TextInput placeholder="gosykler-example"
                        value={nickname}
                        onChangeText={text => setNickname(text)}
                        style={styles.textInput}
                    />
                    <Text style={styles.label}>{EMAIL_LABEL}</Text>
                    <TextInput placeholder="example@example.com"
                        value={email}
                        onChangeText={text => setEmail(text)}
                        style={styles.textInput}
                    />
                    <Text style={styles.label}>{PASSWORD_LABEL}</Text>
                    <TextInput placeholder={PASSWORD_PLACEHOLDER}
                        value={password}
                        onChangeText={text => setPassword(text)}
                        style={styles.textInput}
                        secureTextEntry />
                    <Text style={styles.label}>{REPEAT_PASSWORD_LABEL}</Text>
                    <TextInput placeholder={REPEAT_PASSWORD_PLACEHOLDER}
                        value={repeatedPassword}
                        onChangeText={text => setRepeatedPassword(text)}
                        style={styles.textInput}
                        secureTextEntry />

                </View>
                <PrimaryButton style={styles.signInButton} title={SIGN_IN_BUTTON_TITLE} onPress={handleSignUp} />
                <Ionicons name="arrow-back" style={styles.goBackButton} size={30} color="black" onPress={handleGoBack} />
            </View>
        </SafeAreaView>

    )
}

export default SignUp

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
    signInButton: {
        width: '50%',
        marginTop: 35
    },
    goBackButton: {
        width: 42,
        height: 42,
        position: 'absolute',
        top: 50,
        left: 15,
    }
});