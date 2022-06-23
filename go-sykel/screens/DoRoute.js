import React, { useState } from 'react';
import MapView, { Polyline } from 'react-native-maps';
import { useNavigation } from '@react-navigation/core';
import { Text, View, SafeAreaView, StyleSheet, Image, Dimensions } from 'react-native';
import { Appbar, Provider, Portal, Modal, Button } from 'react-native-paper';

import { useUser } from '../context/UserContext';
import { Colors } from '../colors/Colors';
import useLocation from '../geolocation/periodicalLocation';
import PrimaryButton from '../components/PrimaryButton';
import { DATA } from '../sample_data/Data';
import { Constants } from '../constants/Constants';
const MOCK_DATA_DO_ROUTE = [
    {
        "latitude": 36.7360416,
        "longitude": -4.6113374,
        "time": 1650556467
    },
    {
        "latitude": 36.7359822,
        "longitude": -4.6115255,
        "time": 1650556471
    },
    {
        "latitude": 36.736068,
        "longitude": -4.6116189,
        "time": 1650556491
    },
    {
        "latitude": 36.7361164,
        "longitude": -4.6116969,
        "time": 1650556496
    },
    {
        "latitude": 36.7361303,
        "longitude": -4.6120127,
        "time": 1650556531
    },
    {
        "latitude": 36.73624,
        "longitude": -4.6121009,
        "time": 1650556536
    },
    {
        "latitude": 36.7362834,
        "longitude": -4.6122124,
        "time": 1650556541
    },
    {
        "latitude": 36.7363288,
        "longitude": -4.6122534,
        "time": 1650556546
    },
    {
        "latitude": 36.7360951,
        "longitude": -4.6122213,
        "time": 1650556551
    },
    {
        "latitude": 36.7359672,
        "longitude": -4.6122161,
        "time": 1650556556
    },
    {
        "latitude": 36.7358453,
        "longitude": -4.6122346,
        "time": 1650556561
    },
    {
        "latitude": 36.7359859,
        "longitude": -4.612455,
        "time": 1650556566
    },
    {
        "latitude": 36.7361339,
        "longitude": -4.6126184,
        "time": 1650556572
    },
    {
        "latitude": 36.736204,
        "longitude": -4.6126527,
        "time": 1650556576
    },
    {
        "latitude": 36.7362463,
        "longitude": -4.6127278,
        "time": 1650556581
    },
    {
        "latitude": 36.7363596,
        "longitude": -4.6127271,
        "time": 1650556586
    },
    {
        "latitude": 36.7363104,
        "longitude": -4.6127195,
        "time": 1650556606
    },
    {
        "latitude": 36.7362488,
        "longitude": -4.6124875,
        "time": 1650556611
    },
    {
        "latitude": 36.7362399,
        "longitude": -4.6125983,
        "time": 1650556616
    },
    {
        "latitude": 36.7361997,
        "longitude": -4.6125614,
        "time": 1650556621
    },
    {
        "latitude": 36.7362274,
        "longitude": -4.6126481,
        "time": 1650556628
    },
    {
        "latitude": 36.7362366,
        "longitude": -4.6125959,
        "time": 1650556701
    },
    {
        "latitude": 36.7358834,
        "longitude": -4.6120194,
        "time": 1650556707
    },
    {
        "latitude": 36.7361736,
        "longitude": -4.6120725,
        "time": 1650556712
    },
    {
        "latitude": 36.7360808,
        "longitude": -4.6119989,
        "time": 1650556717
    },
    {
        "latitude": 36.735935,
        "longitude": -4.6120474,
        "time": 1650556722
    },
    {
        "latitude": 36.735998,
        "longitude": -4.6118676,
        "time": 1650556727
    },
    {
        "latitude": 36.7360136,
        "longitude": -4.6117549,
        "time": 1650556737
    },
    {
        "latitude": 36.736088,
        "longitude": -4.6117473,
        "time": 1650556742
    },
    {
        "latitude": 36.7359933,
        "longitude": -4.6114807,
        "time": 1650556782
    },
    {
        "latitude": 36.7360543,
        "longitude": -4.6114056,
        "time": 1650556787
    },
    {
        "latitude": 36.7360612,
        "longitude": -4.6114632,
        "time": 1650556882
    },
    {
        "latitude": 36.7361373,
        "longitude": -4.6114139,
        "time": 1650556887
    }
]
const DO_ROUTE_TITLE = 'Ruta: ';
const YES = 'Sí';
const NO = 'No';
const DIALOG_IMAGE = 'https://res.cloudinary.com/mariacloudinarycloud/image/upload/v1651401771/gosykel/assets/megaphone_qmeopy.png';
const ASK_USER_IS_SURE = 'Estás a punto de abandonar esta ruta. ¿Estás seguro?';
const ROUTE_END = 'Finalizar recorrido';
const ALERT_ERROR_MESSAGE = 'Se ha producido un fallo, ponte en contacto con los administradores de la aplicación';
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;
const DoRoute = ({ route }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);

    const navigation = useNavigation()
    const { selectedRoute } = route.params;
    const handleGoBack = () => {
        hideModal()
        navigation.replace("RouteInformation", { selectedRoute: selectedRoute })
    }

    const sendRoute = async (location) => {
        fetch(Constants.SERVER_URL + '/users/' + userId + '/routes/' + selectedRoute._id , {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({
                //coordinates: DATA.ROUTE_EXAMPLE_NEW_SOME_POINTS_CLOSE_NO_STOPS 
                coordinates: location
            })
        }).then((response) => response.json())
            .then((responseData) => {
                if(responseData.points !== undefined && responseData.user_points !== undefined && responseData.frequency_points !== undefined){
                    navigation.replace("Routes", {previousScreen: "DoRoute", points: responseData.points, userPoints: responseData.user_points,
                        bonus: responseData.frequency_points})
                }
                if(responseData.message !== undefined) {
                    alert(responseData.message)
                    navigation.replace("Routes", {previousScreen: "DoRoute", points: 0, userPoints: 0, bonus: 0})
                }
            })
            .catch((error) => {
                console.log(error.message);
                alert(ALERT_ERROR_MESSAGE);
            });

    };

    const saveRoute = () => {
        if (location && location.length > 0) {
            sendRoute(location)
        }
    }
    const location = useLocation();

    const { userId, token } = useUser();

    const initialRegion = {
        latitude: selectedRoute.coordinates[0].latitude,
        longitude: selectedRoute.coordinates[0].longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    }
    return (
        <Provider>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <Appbar.Header style={{ backgroundColor: 'white' }}>
                    <Appbar.BackAction onPress={showModal} />
                    <Appbar.Content titleStyle={styles.title} title={DO_ROUTE_TITLE + selectedRoute.name} />
                </Appbar.Header>
                <View style={styles.container}>
                    <MapView style={styles.map}
                        showsUserLocation={true}
                        followsUserLocation={true}
                        zoomEnabled={true}
                        initialRegion={initialRegion}
                    >
                        <Polyline
                            coordinates={selectedRoute.coordinates}
                            strokeColor="#000"
                            strokeColors={['#7F0000']}
                            strokeWidth={3}
                        />
                    </MapView>
                </View>
                <Portal>
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
                <View style={{alignItems: 'center'}}>
                    <PrimaryButton title={ROUTE_END} onPress={saveRoute} style={{ width: '65%' }} />
                </View>
            </SafeAreaView>
        </Provider>
    );
}

export default DoRoute;

const styles = StyleSheet.create({
    title: {
        fontFamily: 'FredokaOne_400Regular',
        fontSize: 25,
        color: 'black'
    },
    modal: {
        backgroundColor: 'white',
        padding: 20
    },
    paragraph: {
        fontFamily: 'Poppins_300Light',
        fontSize: 16,
        color: 'black'
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.8,
    },
})