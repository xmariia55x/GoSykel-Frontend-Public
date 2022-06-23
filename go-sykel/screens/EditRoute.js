import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/core';
import { Text, View, SafeAreaView, StyleSheet, ScrollView, TextInput, Image } from 'react-native';
import { Appbar, Switch, Portal, Modal, Button, Provider } from 'react-native-paper';
import AppLoading from 'expo-app-loading';
import { useFonts, Poppins_300Light, Poppins_400Regular } from '@expo-google-fonts/poppins';

import PrimaryButton from '../components/PrimaryButton';
import ErrorButtonOutline from '../components/ErrorButtonOutline';
import { Colors } from '../colors/Colors';
import { useUser } from '../context/UserContext';
import { Constants } from '../constants/Constants';

const DIALOG_IMAGE = 'https://res.cloudinary.com/mariacloudinarycloud/image/upload/v1651401771/gosykel/assets/megaphone_qmeopy.png';
const ALERT_USER_ABOUT_DELETING_ROUTE = 'Estás a punto de eliminar esta ruta de las rutas que has creado. ¿Estás seguro?';
const DELETE_ROUTE_TITLE = "Eliminar ruta";
const EDIT_ROUTE = "Editar ruta";
const ROUTE_NAME = "Nombre de la ruta";
const ROUTE_VISIBILITY = "Visibilidad de la ruta";
const PRIVATE_ROUTE = 'Ruta privada';
const SAVE_CHANGES = "Guardar cambios";
const ALERT_ERROR_MESSAGE = 'Se ha producido un fallo, ponte en contacto con los administradores de la aplicación';
const DANGER_ZONE = "Zona peligrosa";
const DELETING_ROUTE_DISCLAIMER = "Al borrar la ruta, se desvinculará de tu usuario, impidiendo identificar cualquier tipo de relación entre la ruta y tú (su creador). La ruta pasará a ser pública y se mantendrá en el sistema bajo el usuario ChoppSykler."
const YES = 'Sí';
const NO = 'No';
const EditRoute = ({ route }) => {
    const { selectedRoute } = route.params;
    const navigation = useNavigation()
    const [routeName, setRouteName] = useState(selectedRoute.name)
    const [routePrivate, setPrivateRoute] = useState(selectedRoute.private);
    const [modalVisible, setModalVisible] = useState(false);

    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);
    
    const { userId, token } = useUser();

    const onToggleSwitch = () => setPrivateRoute(!routePrivate);

    const navigateToUsersRoutes = () => navigation.replace('Navigation', { screen: 'Account', params: { screen: 'UserRoutes' } });

    const handleGoBack = () => {
        navigateToUsersRoutes();
    }

    const editRoute = () => {
        fetch(Constants.SERVER_URL + '/routes/' + selectedRoute._id, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({
                name: routeName,
                private: routePrivate
            })
        }).then((response) => response.json())
            .then((responseData) => {
                navigateToUsersRoutes();
            })
            .catch((error) => {
                console.log(error.message);
                alert(ALERT_ERROR_MESSAGE);
            });
    }

    const deleteRoute = () => {
        fetch(Constants.SERVER_URL + '/routes/' + selectedRoute._id, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({
                author: userId
            })
        }).then((response) => response.json())
            .then((responseData) => {
                navigateToUsersRoutes();
            })
            .catch((error) => {
                console.log(error.message);
                alert(ALERT_ERROR_MESSAGE);
            });
    }

    const handleDeleteRoute = () => {
        deleteRoute();
        hideModal();
    }
    let [fontsLoaded] = useFonts({
        Poppins_300Light,
        Poppins_400Regular
    });
    if (!fontsLoaded) {
        return <AppLoading />;
    }
    return (
        <Provider>
            <SafeAreaView style={styles.container}>
                <Appbar.Header style={{ backgroundColor: 'white' }}>
                    <Appbar.BackAction onPress={handleGoBack} />
                    <Appbar.Content titleStyle={styles.routeNameTitle} title={EDIT_ROUTE} />
                </Appbar.Header>
                <ScrollView>
                    <View style={styles.content}>
                        <Text style={styles.label}>{ROUTE_NAME}</Text>
                        <TextInput
                            value={routeName}
                            onChangeText={text => setRouteName(text)}
                            style={styles.textInput}
                        />
                        <View style={{ padding: 6 }}></View>
                        <Text style={styles.label}>{ROUTE_VISIBILITY}</Text>
                        <View style={styles.alignInRow}>
                            <Text style={[styles.label, { fontFamily: 'Poppins_300Light', fontSize: 15 }]}>{PRIVATE_ROUTE}</Text>
                            <Switch value={routePrivate} onValueChange={onToggleSwitch} />
                        </View>
                        <View style={{ padding: 6 }}></View>
                        <Text style={[styles.fredokaTitle, { color: Colors.error }]}>{DANGER_ZONE}</Text>
                        <Text style={styles.deleteRouteDisclaimerTitle}>{DELETING_ROUTE_DISCLAIMER}</Text>
                        <View style={{ alignItems: 'center' }}>
                            <ErrorButtonOutline style={styles.deleteRoute} title={DELETE_ROUTE_TITLE} onPress={showModal} />
                        </View>
                    </View>
                </ScrollView>
                <Portal>
                    <Modal visible={modalVisible} contentContainerStyle={styles.modal} dismissable={false}>
                        <View style={{ alignItems: 'center' }}>
                            <Image
                                style={{ width: 100, height: 100 }}
                                source={{ uri: DIALOG_IMAGE }} />
                        </View>
                        <Text style={styles.paragraph}>{ALERT_USER_ABOUT_DELETING_ROUTE}</Text>
                        <Button icon="check" mode="outlined" color={Colors.success} onPress={handleDeleteRoute}>
                            {YES}
                        </Button>
                        <Button icon="close" mode="contained" color={Colors.error} onPress={hideModal}>
                            {NO}
                        </Button>
                    </Modal>
                </Portal>
                <View style={{ flex: 1, justifyContent: 'flex-end', alignSelf: 'center', paddingBottom: 20 }}>
                    <PrimaryButton title={SAVE_CHANGES} onPress={editRoute} style={{ width: '65%' }}></PrimaryButton>
                </View>
            </SafeAreaView>
        </Provider>
    );
}

export default EditRoute;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    routeNameTitle: {
        color: 'black',
        fontFamily: 'FredokaOne_400Regular',
        fontSize: 25,
    },
    label: {
        color: 'black',
        fontFamily: 'Poppins_400Regular',
        fontSize: 20,
        marginTop: 15
    },
    content: {
        paddingLeft: 20,
        paddingRight: 20
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
    alignInRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    fredokaTitle: {
        color: 'black',
        fontFamily: 'FredokaOne_400Regular',
        fontSize: 22,
    },
    deleteRoute: {
        width: '55%',
        marginTop: 10
    },
    deleteRouteDisclaimerTitle: {
        fontSize: 14,
        fontFamily: 'Poppins_300Light',
        color: Colors.error
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
})