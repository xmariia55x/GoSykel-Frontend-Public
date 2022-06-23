
import React, { useState } from 'react';
import { TextInput, View, StyleSheet, Dimensions, Text, Image, SafeAreaView } from 'react-native';
import MapView from 'react-native-maps';
import { Button, Paragraph, Dialog, Portal, Provider, Modal, Appbar, Switch } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import AppLoading from 'expo-app-loading';
import { useFonts, Poppins_300Light } from '@expo-google-fonts/poppins';
import { FredokaOne_400Regular } from '@expo-google-fonts/fredoka-one';
import StarRating from 'react-native-star-rating';

import { useUser } from '../context/UserContext';
import useLocation from '../geolocation/periodicalLocation';
import { Colors } from '../colors/Colors';
import PrimaryButton from '../components/PrimaryButton';
import { DATA } from '../sample_data/Data';
import { Constants } from '../constants/Constants';

const MOCK_DATA_RUTA_CIUDAD_JARDIN = [
    {"latitude": 36.752914, "longitude": -4.425816, "time": 1652424926},
    {"latitude": 36.752425, "longitude": -4.425599, "time": 1652424931},
    {"latitude": 36.751852, "longitude": -4.425375, "time": 1652424936},
    {"latitude": 36.751375, "longitude": -4.425108, "time": 1652424941},
    {"latitude": 36.750870, "longitude": -4.424821, "time": 1652424946},
    {"latitude": 36.750280, "longitude": -4.424506, "time": 1652424951},
    {"latitude": 36.749696, "longitude": -4.424190, "time": 1652424956},
    {"latitude": 36.749096, "longitude": -4.423868, "time": 1652424961},
    {"latitude": 36.748728, "longitude": -4.423630, "time": 1652424966},
    {"latitude": 36.748330, "longitude": -4.423417, "time": 1652424971}
]
const INITIAL_LATITUDE = 36.719444;
const INITIAL_LONGITUDE = -4.420000;
const LATITUDE_DELTA = 0.1;
const LONGITUDE_DELTA = 0.1;
const REGION_LATITUDE_DELTA = 0.001;
const REGION_LONGITUDE_DELTA = 0.001;
const initialRegion = {
    latitude: INITIAL_LATITUDE,
    longitude: INITIAL_LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
}
const ADD_ROUTE_TITLE = 'Nueva ruta';
const SAVE_ROUTE = 'Guardar nueva ruta';
const ROUTE_NAME = 'Nombre de la ruta';
const ROUTE_VISIBILITY = 'Ruta privada';
const ROUTE_VISIBILITY_INFORMATION = 'Por defecto, las rutas son públicas.';
const ROUTE_RATE_INFORMATION = 'Califica esta ruta del 1 al 5 (1 muy fácil - 5 muy difícil).';
const PLACEHOLDER_ROUTE_NAME = 'Ej: Ruta por Huelin con amigos';
const SAVE = 'Guardar';
const CANCEL = 'Cancelar';
const ASK_USER_IS_SURE = 'Estás a punto de descartar esta ruta. ¿Estás seguro?';
const YES = 'Sí';
const NO = 'No';
const FILL_ROUTE_NAME = 'Proporciona un nombre para la ruta.';
const ALERT_ERROR_MESSAGE = 'Se ha producido un fallo, ponte en contacto con los administradores de la aplicación';
const DIALOG_IMAGE = 'https://res.cloudinary.com/mariacloudinarycloud/image/upload/v1651401771/gosykel/assets/megaphone_qmeopy.png';
const NewRoute = () => {
    const [dialogVisible, setDialogVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [routeName, setRouteName] = useState('');
    const [privateRouteOn, setPrivateRouteOn] = useState(false);
    const [starCount, setStarCount] = useState(3);

    const onToggleSwitch = () => setPrivateRouteOn(!privateRouteOn);

    const showDialog = () => setDialogVisible(true);
    const hideDialog = () => setDialogVisible(false);
    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);

    const navigation = useNavigation()
    const location = useLocation();

    const { userId, token } = useUser();
    const sendRoute = async (location, routeName, privateRouteOn, starCount) => {
        fetch(Constants.SERVER_URL + '/routes', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({
                name: routeName,
                rate: starCount,
                private: privateRouteOn,
                author: userId,
                //coordinates: DATA.ROUTE_EXAMPLE_TWO_STOPS
                coordinates: location
            })
        }).then((response) => response.json())
            .then((responseData) => {
                if(responseData.points !== undefined && responseData.user_points !== undefined){
                    navigation.replace("Routes", {previousScreen: "NewRoute", points: responseData.points, 
                    userPoints: responseData.user_points, bonus: 0})
                }
                if(responseData.message !== undefined) {
                    alert(responseData.message)
                    navigation.replace("Routes", {previousScreen: "NewRoute", points: 0, userPoints: 0, bonus: 0})
                }
            })
            .catch((error) => {
                console.log(error.message);
                alert(ALERT_ERROR_MESSAGE);
            });
    };

    const isEmpty = (string) => {
        return string.trim().length === 0
    }

    const saveRoute = () => {
        if (isEmpty(routeName)) {
            alert(FILL_ROUTE_NAME);
        } else {
            hideDialog()
            sendRoute(location, routeName, privateRouteOn, starCount)
        }
    }

    const cancelRoute = () => {
        hideDialog()
    }

    const handleGoBack = () => {
        hideModal()
        navigation.replace("Routes", {previousScreen: "NewRoute", points: 0, userPoints: 0, bonus: 0})
    }

    const onStarRatingPress = (rating) => {
        setStarCount(rating)
    }

    let region = initialRegion;

    if (location) {
        if (location.length > 0) {
            region = {latitude: location[location.length - 1].latitude, longitude: location[location.length - 1].longitude,
                latitudeDelta: REGION_LATITUDE_DELTA, longitudeDelta: REGION_LONGITUDE_DELTA} ;
        }
    }

    let [fontsLoaded] = useFonts({
        Poppins_300Light,
        FredokaOne_400Regular
    });
    if (!fontsLoaded) {
        return <AppLoading />;
    }
    return (
        <Provider>
            <SafeAreaView style={{ flex: 1 }}>
                <Appbar.Header style={{ backgroundColor: 'white' }}>
                    <Appbar.BackAction onPress={showModal} />
                    <Appbar.Content titleStyle={styles.title} title={ADD_ROUTE_TITLE} />
                </Appbar.Header>
                <View style={styles.container}>
                    <MapView style={styles.map}
                        showsUserLocation={true}
                        followsUserLocation={true}
                        zoomEnabled={true}
                        initialRegion={initialRegion}
                        region={region}
                        >
                    </MapView>
                </View>
                <View style={styles.pauseSaveButtons}>
                    <PrimaryButton title={SAVE} onPress={showDialog} style={{ width: '65%' }} />
                    <Portal>
                        <Dialog visible={dialogVisible} dismissable={false}>
                            <Dialog.Title style={styles.title}>{SAVE_ROUTE}</Dialog.Title>
                            <Dialog.Content>
                                <Paragraph style={styles.paragraph}>{ROUTE_NAME}</Paragraph>
                                <TextInput
                                    value={routeName}
                                    onChangeText={text => setRouteName(text)}
                                    style={styles.textInput}
                                    placeholder={PLACEHOLDER_ROUTE_NAME}
                                />
                                <View style={styles.switchAlignment}>
                                    <Paragraph style={styles.paragraph}>{ROUTE_VISIBILITY}</Paragraph>
                                    <Switch value={privateRouteOn} onValueChange={onToggleSwitch} />
                                </View>
                                <Paragraph style={styles.textInfo}>{ROUTE_VISIBILITY_INFORMATION}</Paragraph>
                                <Paragraph style={styles.paragraph}>{ROUTE_RATE_INFORMATION}</Paragraph>
                                <StarRating
                                    disabled={false}
                                    maxStars={5}
                                    rating={starCount}
                                    starSize={25}
                                    fullStarColor={Colors.secondary}
                                    selectedStar={(rating) => onStarRatingPress(rating)}
                                />
                            </Dialog.Content>
                            <Dialog.Actions>
                                <Button onPress={cancelRoute} color={Colors.error}>{CANCEL}</Button>
                                <Button onPress={saveRoute} color={Colors.success}>{SAVE}</Button>
                            </Dialog.Actions>
                        </Dialog>
                        <Modal visible={modalVisible} contentContainerStyle={styles.modal} dismissable={false}>
                            <View style={{ alignItems: 'center' }}>
                                <Image
                                    style={{ width: 100, height: 100 }}
                                    source={{ uri: DIALOG_IMAGE }} />
                            </View>
                            <Text style={styles.paragraph}>{ASK_USER_IS_SURE}</Text>
                            <Button icon="check" mode="outlined" color={Colors.success} onPress={handleGoBack}>
                                {YES}
                            </Button>
                            <Button icon="close" mode="contained" color={Colors.error} onPress={hideModal}>
                                {NO}
                            </Button>
                        </Modal>
                    </Portal>
                </View>
            </SafeAreaView>
        </Provider>
    );
}

export default NewRoute;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    title: {
        fontFamily: 'FredokaOne_400Regular',
        fontSize: 25,
        color: 'black'
    },
    paragraph: {
        fontFamily: 'Poppins_300Light',
        fontSize: 16,
        color: 'black'
    },
    textInfo: {
        fontFamily: 'Poppins_300Light',
        fontSize: 13,
        color: 'black'
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.8,
    },
    pauseSaveButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
    },
    textInput: {
        borderColor: 'grey',
        borderWidth: 1,
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 20,
    },
    modal: {
        backgroundColor: 'white',
        padding: 20
    },
    switchAlignment: {
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'space-between'
    }
});