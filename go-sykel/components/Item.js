import React, { useState } from 'react'
import { StyleSheet, Dimensions, Text, View } from 'react-native';
import { Card, RadioButton } from 'react-native-paper';
import AppLoading from 'expo-app-loading';
import { useFonts, Poppins_300Light } from '@expo-google-fonts/poppins';

const windowWidth = Dimensions.get('window').width;
const USE_ITEM = 'En uso';
const Item = (props) => {
    const [checked, setChecked] = useState(props.first ? props.id : '')
    let [fontsLoaded] = useFonts({
        Poppins_300Light
    });
    if (!fontsLoaded) {
        return <AppLoading />;
    }
    return (
        <Card style={styles.card}>
            <Card.Title title={props.name} titleStyle={styles.title} subtitle={props.description} subtitleNumberOfLines={4} subtitleStyle={styles.subtitle} />
            <Card.Cover source={{ uri: props.source }} resizeMode='contain' style={styles.cover} />
            <View style={styles.row}>
                <Text style={styles.title}>{USE_ITEM}</Text>
                <Card.Actions>
                    <RadioButton
                        value={props.id}
                        status={checked === props.id ? 'checked' : 'unchecked'}
                        onPress={() => setChecked(props.id)}
                    /> 
                </Card.Actions>
            </View>

        </Card>
    )

};

export default Item;

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
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});