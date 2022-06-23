import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import { View, ScrollView, SafeAreaView, StyleSheet, ActivityIndicator, Text, Image } from 'react-native';
import { Appbar, Paragraph, Portal, Modal, Button, Provider } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

import { useUser } from '../context/UserContext';
import { Colors } from '../colors/Colors';
import { Constants } from '../constants/Constants';
import RouteCard from '../components/RouteCard';

const DIALOG_IMAGE = 'https://res.cloudinary.com/mariacloudinarycloud/image/upload/v1651401771/gosykel/assets/megaphone_qmeopy.png';
const USER_ROUTES = "Mis rutas";
const OWNED_ROUTES_SECTION = "Rutas creadas por mí";
const COMPLETED_ROUTES_SECTION = "Rutas completadas";
const NO_OWNED_ROUTES = "Aún no has añadido ninguna ruta. ¡Comienza a añadir rutas para ganar puntos!";
const NO_COMPLETED_ROUTES = "Aún no has completado ninguna ruta. ¡Completa rutas para ganar puntos!";
const ALERT_ERROR_MESSAGE = 'Se ha producido un fallo, ponte en contacto con los administradores de la aplicación.';
const ALERT_USER_ABOUT_DELETING_ROUTE = 'Estás a punto de eliminar esta ruta de las rutas que has completado. ¿Estás seguro?';
const YES = 'Sí';
const NO = 'No';
const CREATE_ROUTE = '¡Crea tu primera ruta!';
const SEE_ROUTES = 'Ver rutas';
const UserRoutes = () => {
    const [ownedRoutes, setOwnedRoutes] = useState([])
    const [completedRoutes, setCompletedRoutes] = useState([])
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [routeToDelete, setRouteToDelete] = useState(null)

    const navigation = useNavigation()

    const { userId, token } = useUser();

    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);

    const handleGoBack = () => {
        navigation.navigate("AccountManagement")
    }

    const handleSeeRoute = (item) => {
        navigation.navigate('Navigation', { screen: 'RoutesNavigation', params: { screen: 'RouteInformation', params: { selectedRoute: item } } });
    }

    const handleEditRoute = (item) => {
        navigation.navigate('Navigation', { screen: 'RoutesNavigation', params: { screen: 'EditRoute', params: { selectedRoute: item } } });
    }

    const handleDeleteCompletedRoute = (item) => {
        setRouteToDelete(item);
        showModal();
    }

    const deleteRoute = () => {
        fetch(Constants.SERVER_URL + '/users/' + userId + '/routes/' + routeToDelete._id, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            }
        }).then((response) => response.json())
            .then((responseData) => {
                const filteredData = completedRoutes.filter(item => item._id !== routeToDelete._id);
                setCompletedRoutes(filteredData)
                hideModal();
            })
            .catch((error) => {
                console.log(error.message);
                alert(ALERT_ERROR_MESSAGE);
            })
    }
    const fetchUserRoutes = () => {
        fetch(Constants.SERVER_URL + '/users/' + userId + '/routes', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            }
        }).then((response) => response.json())
            .then((responseData) => {
                setOwnedRoutes(responseData.owned_routes)
                setCompletedRoutes(responseData.completed_routes)
            })
            .catch((error) => {
                console.log(error.message);
                alert(ALERT_ERROR_MESSAGE);
            })
            .finally(() => {
                setLoading(false)
            });
    }
    const navigateToCreateRoute = () => {
        navigation.navigate('Navigation', { screen: 'RoutesNavigation', params: { screen: 'NewRoute' } });
    }
    const navigateToSeeRoutes = () => {
        navigation.navigate('Navigation', { screen: 'RoutesNavigation', params: { screen: 'Routes' } });
    }
    useEffect(() => {
        fetchUserRoutes();
    }, []);
    return (
        <Provider>
            <SafeAreaView style={styles.container}>
                {loading ? (
                    <View style={styles.activityIndicator}>
                        <ActivityIndicator
                            visible={loading}
                            size="large"
                            color='black'
                        />
                    </View>

                ) : (
                    <>
                        <Appbar.Header style={{ backgroundColor: 'white' }}>
                            <Appbar.BackAction onPress={handleGoBack} />
                            <Appbar.Content titleStyle={styles.userRoutesTitle} title={USER_ROUTES} />
                        </Appbar.Header>
                        <ScrollView>
                            <View style={styles.content}>
                                <View style={{ padding: 6 }}></View>
                                <Text style={styles.fredokaTitle}>{OWNED_ROUTES_SECTION}</Text>
                                <View style={{ padding: 6 }}></View>
                            </View>
                            {
                                ownedRoutes.length > 0 ?
                                    (ownedRoutes.map((item, index) => {
                                        return (
                                            <View key={index} style={styles.itemContainer}>
                                                <RouteCard name={item.name} private={item.private} author={item.author}
                                                    distance={item.distance} date={item.date} rate={item.rate} onPress={() => { handleSeeRoute(item) }}
                                                    editable={true} onEditRoutePress={() => { handleEditRoute(item) }}
                                                    deletable={false} onDeleteRoutePress={() => { }} />
                                            </View>

                                        )
                                    })
                                    )
                                    : (
                                        <>
                                            <View>
                                                <View style={{ justifyContent: 'space-around', flexDirection: 'row' }}>
                                                    <MaterialIcons name="error-outline" size={40} color={Colors.error} />
                                                    <Paragraph style={styles.noRoutesParagraph}>{NO_OWNED_ROUTES}</Paragraph>

                                                </View>
                                                <View style={{ alignSelf: 'center', paddingTop: 20 }}>
                                                    <Button mode='contained' style={{ width: '70%' }} labelStyle={{ color: 'white' }} color={Colors.primary}
                                                        onPress={navigateToCreateRoute}>{CREATE_ROUTE}</Button>
                                                </View>
                                            </View>
                                        </>
                                    )
                            }
                            <View style={styles.content}>
                                <View style={{ padding: 6 }}></View>
                                <Text style={styles.fredokaTitle}>{COMPLETED_ROUTES_SECTION}</Text>
                                <View style={{ padding: 6 }}></View>
                            </View>
                            {
                                completedRoutes.length > 0 ?
                                    (completedRoutes.map((item, index) => {
                                        return (
                                            <View key={index} style={styles.itemContainer}>
                                                <RouteCard name={item.name} private={item.private} author={item.author}
                                                    distance={item.distance} date={item.date} rate={item.rate} onPress={() => { handleSeeRoute(item) }}
                                                    editable={false} onEditRoutePress={() => { }}
                                                    deletable={true} onDeleteRoutePress={() => { handleDeleteCompletedRoute(item) }} />
                                            </View>

                                        )
                                    })
                                    )
                                    : (
                                        <>
                                            <View>
                                                <View style={{ justifyContent: "space-around", flexDirection: 'row' }}>
                                                    <MaterialIcons name="error-outline" size={40} color={Colors.error} />
                                                    <Paragraph style={styles.noRoutesParagraph}>{NO_COMPLETED_ROUTES}</Paragraph>
                                                </View>
                                                <View style={{ alignSelf: 'center', paddingTop: 20 }}>
                                                    <Button mode='contained' style={{ width: '70%' }} labelStyle={{ color: 'white' }} color={Colors.primary}
                                                        onPress={navigateToSeeRoutes}>{SEE_ROUTES}</Button>
                                                </View>
                                            </View>

                                        </>
                                    )
                            }
                            <Portal>
                                <Modal visible={modalVisible} contentContainerStyle={styles.modal} dismissable={false}>
                                    <View style={{ alignItems: 'center' }}>
                                        <Image
                                            style={{ width: 100, height: 100 }}
                                            source={{ uri: DIALOG_IMAGE }} />
                                    </View>
                                    <Text style={styles.paragraph}>{ALERT_USER_ABOUT_DELETING_ROUTE}</Text>
                                    <Button icon="check" mode="outlined" color={Colors.success} onPress={deleteRoute}>
                                        {YES}
                                    </Button>
                                    <Button icon="close" mode="contained" color={Colors.error} onPress={hideModal}>
                                        {NO}
                                    </Button>
                                </Modal>
                            </Portal>

                        </ScrollView>
                    </>
                )
                }
            </SafeAreaView>
        </Provider>
    );
}

export default UserRoutes;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    activityIndicator: {
        flex: 1,
        justifyContent: "center",
        alignSelf: 'center'
    },
    userRoutesTitle: {
        color: 'black',
        fontFamily: 'FredokaOne_400Regular',
        fontSize: 25,
    },
    fredokaTitle: {
        color: 'black',
        fontFamily: 'FredokaOne_400Regular',
        fontSize: 22,
    },
    content: {
        paddingLeft: 20,
        paddingRight: 20
    },
    noRoutesParagraph: {
        fontFamily: 'Poppins_300Light',
        color: 'black',
        fontSize: 14,
        paddingLeft: 5
    },
    itemContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    paragraph: {
        fontFamily: 'Poppins_300Light',
        fontSize: 16,
        color: 'black'
    },
    modal: {
        backgroundColor: 'white',
        padding: 20
    },
})