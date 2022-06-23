import { View, Image, Text, StyleSheet } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, FredokaOne_400Regular } from '@expo-google-fonts/fredoka-one';

import { Colors } from '../colors/Colors';
const Header = (props) => {
    let [fontsLoaded] = useFonts({
        FredokaOne_400Regular
    });
    if (!fontsLoaded) {
        return <AppLoading />;
    }
    return (
        <View style={styles.container}>
            <Image  style={styles.image} source={require('../assets/icon.png')}/>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.subtitle}>{props.subtitle}</Text>
        </View>

    )
}

export default Header

const styles = StyleSheet.create({
    title: {
        color: 'black',
        fontFamily: 'FredokaOne_400Regular',
        fontSize: 30
    },
    subtitle: {
        color: Colors.grey,
        fontFamily: 'FredokaOne_400Regular',
        fontSize: 20
    },
    container: {
        alignItems: 'center' 
    },
    image: {
        resizeMode: "contain",
        height: 200,
        width: 200,
        marginBottom: 10
    },
});