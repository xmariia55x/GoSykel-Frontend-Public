import * as React from 'react';
import { Card } from 'react-native-paper';
import { StyleSheet, Dimensions } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, Poppins_300Light } from '@expo-google-fonts/poppins';

const windowWidth = Dimensions.get('window').width;
const Badge = (props) => {
    let [fontsLoaded] = useFonts({
        Poppins_300Light
    });
    if (!fontsLoaded) {
        return <AppLoading />;
    }
    return (
        <Card style={styles.card}>
            <Card.Title title={props.title} titleStyle={styles.title} subtitle={props.subtitle} subtitleNumberOfLines={3} subtitleStyle={styles.subtitle} />
            <Card.Cover source={{ uri: props.source }} resizeMode='contain' style={styles.cover}/>
        </Card>
    )
};

export default Badge;

const styles = StyleSheet.create({
    card: {
        width: windowWidth
    },
    title: {
        fontFamily: 'Poppins_300Light',
        color: 'black'
    },
    subtitle: {
        fontFamily: 'Poppins_300Light',
        color: 'grey'
    },
    cover: {
        backgroundColor: 'white'
    }
});
