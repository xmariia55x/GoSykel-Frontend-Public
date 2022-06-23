import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Text, Image, SafeAreaView } from 'react-native';
import MapView from 'react-native-maps';
import { Button, Paragraph, Dialog, Portal, Provider, Modal, Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import AppLoading from 'expo-app-loading';
import { useFonts, Poppins_300Light } from '@expo-google-fonts/poppins';
import { FredokaOne_400Regular } from '@expo-google-fonts/fredoka-one';

import { useUser } from '../context/UserContext';
import useLocation from '../geolocation/periodicalLocation';
import { Colors } from '../colors/Colors';
import PrimaryButton from '../components/PrimaryButton';
import { DATA } from '../sample_data/Data';
import { Constants } from '../constants/Constants';

const MOCK_DATA_CIUDAD_JARDIN = [
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
const MOCK_DATA_PASEO_REDING = [
    {"latitude": 36.720960, "longitude": -4.410382, "time": 1652424926},
    {"latitude": 36.720959, "longitude": -4.410090, "time": 1652424931},
    {"latitude": 36.720953, "longitude": -4.409771, "time": 1652424936},
    {"latitude": 36.720947, "longitude": -4.409441, "time": 1652424941},
    {"latitude": 36.720924, "longitude": -4.409134, "time": 1652424946},
    {"latitude": 36.720922, "longitude": -4.408640, "time": 1652424951},
    {"latitude": 36.720942, "longitude": -4.408240, "time": 1652424956},
    {"latitude": 36.720946, "longitude": -4.408015, "time": 1652424961},
    {"latitude": 36.720963, "longitude": -4.407876, "time": 1652424966},
    {"latitude": 36.720981, "longitude": -4.407669, "time": 1652424971}
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
const ADD_BYCICLE_LANE_TITLE = 'Nuevo carril bici';
const SAVE_BYCICLE_SEGMENT = 'Guardar nuevo carril bici';
const BYCICLE_LANE_CONFIRMATION = 'Vas a guardar un nuevo tramo de carril bici. ¿Estás seguro?';
const SAVE = 'Guardar';
const CANCEL = 'Cancelar';
const ASK_USER_IS_SURE = 'Estás a punto de descartar este tramo de carril bici. ¿Estás seguro?';
const YES = 'Sí';
const NO = 'No';
const DIALOG_IMAGE = 'https://res.cloudinary.com/mariacloudinarycloud/image/upload/v1651401771/gosykel/assets/megaphone_qmeopy.png';
const NewBycicleLane = () => {
    const [dialogVisible, setDialogVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const showDialog = () => setDialogVisible(true);
    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);

    const navigation = useNavigation()
    const { userId, token } = useUser();

    const handleGoBack = () => {
        hideModal()
        navigation.replace("BycicleLanes", {previousScreen: "NewBycicleLane", bycicleLanePoints: 0, bycicleLaneUserPoints: 0})
    }
    let [fontsLoaded] = useFonts({
        Poppins_300Light,
        FredokaOne_400Regular
    });
    const location = useLocation();
    const sendBycicleLane = async (location) => {
        fetch(Constants.SERVER_URL + '/byciclelanes', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({
                coordinates: location,
                //coordinates: DATA.BYCICLE_LANE_EXAMPLE_EL_EJIDO_NEW,
                author: userId
            })
        }).then((response) => response.json())
            .then((responseData) => {
                if(responseData.points !== undefined && responseData.user_points !== undefined){
                    navigation.replace("BycicleLanes", {previousScreen: "NewBycicleLane", bycicleLanePoints: responseData.points,
                     bycicleLaneUserPoints: responseData.user_points})
                }
                if(responseData.message !== undefined) {
                    alert(responseData.message)
                    navigation.replace("BycicleLanes", {previousScreen: "NewBycicleLane", bycicleLanePoints: 0,
                     bycicleLaneUserPoints: 0})
                }
            })
            .catch((error) => {
                alert(error.message);
            });

    };

    let region = initialRegion;

    if (location) {
        if (location.length > 0) {
            region = {latitude: location[location.length - 1].latitude, longitude: location[location.length - 1].longitude,
                latitudeDelta: REGION_LATITUDE_DELTA, longitudeDelta: REGION_LONGITUDE_DELTA} ;
        }
    }

    const saveBycicleLane = async () => {
        setDialogVisible(false);
        sendBycicleLane(location)
    }

    const cancelBycicleLane = () => {
        setDialogVisible(false);
    }

    if (!fontsLoaded) {
        return <AppLoading />;
    }
    return (
        <Provider>
            <SafeAreaView style={{ flex: 1 }}>
                <Appbar.Header style={{ backgroundColor: 'white' }}>
                    <Appbar.BackAction onPress={showModal} />
                    <Appbar.Content titleStyle={styles.title} title={ADD_BYCICLE_LANE_TITLE} />
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
                            <Dialog.Title style={styles.title}>{SAVE_BYCICLE_SEGMENT}</Dialog.Title>
                            <Dialog.Content>
                                <Paragraph style={styles.paragraph}>{BYCICLE_LANE_CONFIRMATION}</Paragraph>
                            </Dialog.Content>
                            <Dialog.Actions>
                                <Button onPress={cancelBycicleLane} color={Colors.error}>{CANCEL}</Button>
                                <Button onPress={saveBycicleLane} color={Colors.success}>{SAVE}</Button>
                            </Dialog.Actions>
                        </Dialog>
                        <Modal visible={modalVisible} contentContainerStyle={styles.modal} dismissable={false}>
                            <View style={{alignItems:'center'}}>
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

export default NewBycicleLane;

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
    modal: {
        backgroundColor: 'white',
        padding: 20
    }
});