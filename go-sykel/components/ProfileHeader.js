import { View, Image, Text, StyleSheet, ImageBackground } from 'react-native';
import { Appbar } from 'react-native-paper';
import AppLoading from 'expo-app-loading';
import { useFonts, Poppins_300Light } from '@expo-google-fonts/poppins';

const Header = ({ nickname, email, header, profile, onPress }) => {
    let [fontsLoaded] = useFonts({
        Poppins_300Light
    });
    if (!fontsLoaded) {
        return <AppLoading />;
    }
    return (
        <ImageBackground source={{uri: header}} style={styles.image}>
            <Appbar.Header style={{ backgroundColor: 'transparent' }}>
                <Appbar.BackAction onPress={onPress} />
            </Appbar.Header>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Image style={styles.avatarImage} source={{uri: profile}} />
                <Text style={styles.nickname}>{nickname}</Text>
                <Text style={styles.email}>{email}</Text>
            </View>
        </ImageBackground>
    )
}

export default Header

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 320
    },
    avatarImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 4,
        borderColor: "white",
        alignSelf: 'center'
    },
    nickname: {
        color: 'black',
        fontFamily: 'Poppins_300Light',
        fontSize: 22
     },
    email: {
        color: 'black',
        fontFamily: 'Poppins_300Light',
        fontSize: 16
    }
});