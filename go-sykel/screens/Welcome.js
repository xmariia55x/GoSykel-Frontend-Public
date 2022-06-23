import { Image, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/core';

import PrimaryButton from '../components/PrimaryButton' ; 
import PrimaryButtonOutline from '../components/PrimaryButtonOutline' ;

const LOG_IN_BUTTON_TITLE = 'Iniciar sesión';
const SIGN_IN_BUTTON_TITLE = '¿Aún no tienes cuenta? Regístrate';
const Welcome = () => {
    const navigation = useNavigation()  

    const handleMoveToLoginScreen = () => {
        navigation.navigate("WelcomeNavigation", {screen: "Login"}) 
    }

    const handleMoveToSignUpScreen = () => {
        navigation.navigate("WelcomeNavigation", {screen: "SignUp"}) 
    }
    return (
        <SafeAreaView
        style={styles.container}>
            <Image  style={styles.image} source={require('../assets/GoSykel_Fredoka_one_nobg.png')}/>
            <PrimaryButton style={styles.loginPrimaryButton} title={LOG_IN_BUTTON_TITLE} onPress={handleMoveToLoginScreen}/>
            <PrimaryButtonOutline style={styles.signInPrimaryButton} title={SIGN_IN_BUTTON_TITLE} onPress={handleMoveToSignUpScreen}/>
        </SafeAreaView>
    )
}

export default Welcome

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    image: {
        flex: 0.5,
        resizeMode: "contain",
        height: 200,
        width: 200,
        marginBottom: 10
    },
    loginPrimaryButton: {
        width: '80%',
        marginBottom: 35
    },
    signInPrimaryButton: {
        width: '80%',
    }
});