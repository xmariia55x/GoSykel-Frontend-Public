import React from 'react';
import { useNavigation } from '@react-navigation/core';
import MapView, { Polyline } from 'react-native-maps';
import { Text, ScrollView, SafeAreaView, StyleSheet, Dimensions, View } from 'react-native';
import { Appbar, Button, Card, Avatar } from 'react-native-paper';
import StarRating from 'react-native-star-rating';
import { SimpleLineIcons, MaterialCommunityIcons, Octicons, FontAwesome5 } from '@expo/vector-icons';

import { Colors } from '../colors/Colors';
import PrimaryButtonOutline from '../components/PrimaryButtonOutline';

const DEFAULT_LATITUDE = 36.719444;
const DEFAULT_LONGITUDE = -4.420000;

const TOTAL_TIME = 'Tiempo total ';
const TOTAL_TIME_NO_STOPS = 'Tiempo en movimiento ';
const MINUTES = ' min';
const MINUTES_LONG = 'Minutos';
const KILOMETERS_PER_HOUR = 'km/h';
const TOTAL_VELOCITY = 'Velocidad media';
const TOTAL_VELOCITY_NO_STOPS = 'Velocidad en movimiento';
const STOPS = 'Paradas';
const TIME = 'Tiempo';
const DATE = 'Fecha';
const AUTHOR_TITLE = 'Creador/a de la ruta';
const ROUTE_RATING = 'Valoración de la ruta';
const FASTEST_USERS = 'Usuarios más rápidos';
const SEE_USER_PROFILE = 'Ver perfil';
const DO_ROUTE = 'Realizar ruta';

const RouteInformation = ({ route }) => {
    const navigation = useNavigation()
    const handleGoBack = () => {
        navigation.replace("Routes", {previousScreen: "RouteInformation", points: 0, userPoints: 0, bonus: 0})
    }
    const { selectedRoute } = route.params;
    const moveToUserProfile = (targetUserId) => {
        navigation.replace("ProfileInformation", { targetUserId: targetUserId, previousRoute: selectedRoute })
    }
    const moveToDoRoute = () => {
        navigation.replace("DoRoute", { selectedRoute: selectedRoute })
    }
    return (
        <SafeAreaView style={styles.container}>
            <Appbar.Header style={{ backgroundColor: 'white' }}>
                <Appbar.BackAction onPress={handleGoBack} />
                <Appbar.Content titleStyle={styles.title} title={selectedRoute.name} />
            </Appbar.Header>
            <ScrollView>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: selectedRoute.coordinates[0].latitude == null ? DEFAULT_LATITUDE : selectedRoute.coordinates[0].latitude,
                        longitude: selectedRoute.coordinates[0].longitude == null ? DEFAULT_LONGITUDE : selectedRoute.coordinates[0].longitude,
                        latitudeDelta: 0.001,
                        longitudeDelta: 0.001,
                    }}
                >
                    <Polyline
                        coordinates={selectedRoute.coordinates}
                        strokeColor="#000"
                        strokeColors={['#7F0000']}
                        strokeWidth={3}
                    />
                </MapView>
                <View style={styles.timeInformation}>
                    <View>
                        <Text style={styles.simpleTextStyle}>{selectedRoute.author == "ChoppSykler" ? DATE : TIME}</Text>
                        <Text style={styles.lightDate}>{selectedRoute.date}</Text>
                    </View>
                    {selectedRoute.author == "ChoppSykler" ?
                        <View></View>
                        :
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.timeNumber}>{Math.round((((selectedRoute.time_to_complete.filter(item => item.user ==
                                selectedRoute.author)[0].general) / 60) + Number.EPSILON) * 100) / 100}</Text>
                            <Text style={styles.timeMinutes}>{MINUTES_LONG}</Text>
                        </View>
                    }
                </View>

                <View style={styles.thinLine} />
                {
                    selectedRoute.author == "ChoppSykler" ?
                        <View></View>
                        :
                        <Card style={styles.cardRouteData}>
                            <Card.Content>
                                <View style={{ alignItems: 'center' }}>
                                    <View style={styles.alignment}>
                                        <MaterialCommunityIcons name="clock-time-four-outline" size={30} style={{ marginRight: 5 }} color="black" />
                                        <Text style={styles.simpleTextStyle}>{TOTAL_TIME_NO_STOPS}</Text>
                                    </View>
                                    <View style={styles.alignment}>
                                        <Text style={styles.numbers}>{Math.round((((selectedRoute.time_to_complete.filter(item => item.user ==
                                            selectedRoute.author)[0].moving) / 60) + Number.EPSILON) * 100) / 100}</Text>
                                        <Text style={styles.shorterTextStyle}> {MINUTES.toLowerCase()}</Text>
                                    </View>
                                </View>
                            </Card.Content>
                        </Card>
                }

                <View style={{ padding: 6 }}></View>
                <Card style={styles.cardRouteData}>
                    <Card.Content>
                        <View style={{ alignItems: 'center' }}>
                            <View style={styles.alignment}>
                                <SimpleLineIcons name="speedometer" size={30} style={{ marginRight: 5 }} color="black" />
                                <Text style={styles.simpleTextStyle}>{TOTAL_VELOCITY}</Text>
                            </View>
                            <View style={styles.alignment}>
                                <Text style={styles.numbers}>{Math.round(((selectedRoute.speed.general * 3.6) + Number.EPSILON) * 100) / 100}</Text>
                                <Text style={styles.shorterTextStyle}> {KILOMETERS_PER_HOUR.toLowerCase()}</Text>
                            </View>
                        </View>
                    </Card.Content>
                </Card>
                <View style={{ padding: 6 }}></View>
                <Card style={styles.cardRouteData}>
                    <Card.Content>
                        <View style={{ alignItems: 'center' }}>
                            <View style={styles.alignment}>
                                <SimpleLineIcons name="speedometer" size={30} style={{ marginRight: 5 }} color="black" />
                                <Text style={styles.simpleTextStyle}>{TOTAL_VELOCITY_NO_STOPS}</Text>
                            </View>
                            <View style={styles.alignment}>
                                <Text style={styles.numbers}>{Math.round(((selectedRoute.speed.moving * 3.6) + Number.EPSILON) * 100) / 100}</Text>
                                <Text style={styles.shorterTextStyle}> {KILOMETERS_PER_HOUR.toLowerCase()}</Text>
                            </View>
                        </View>
                    </Card.Content>
                </Card>
                <View style={{ padding: 6 }}></View>
                <Card style={styles.cardRouteData}>
                    <Card.Content>
                        <View style={{ alignItems: 'center' }}>
                            <View style={styles.alignment}>
                                <Octicons name="stop" size={30} style={{ marginRight: 5 }} color="black" />
                                <Text style={styles.simpleTextStyle}>{STOPS}</Text>
                            </View>
                            <View style={styles.alignment}>
                                <Text style={styles.numbers}>{selectedRoute.stops}</Text>
                                <Text style={styles.shorterTextStyle}> {STOPS.toLowerCase()}</Text>
                            </View>
                        </View>
                    </Card.Content>
                </Card>
                <View style={{ padding: 6 }}></View>
                <View style={{ marginLeft: 15 }}>
                    <Text style={[styles.title, { fontSize: 22 }]}>{AUTHOR_TITLE}</Text>
                </View>

                <View style={{ padding: 6 }}></View>
                <Card style={styles.cardUserData}>
                    <Card.Content>
                        <View>
                            <View style={{ alignItems: 'center' }}>
                                {
                                    selectedRoute.author == "ChoppSykler" ? 
                                        <FontAwesome5 name="dog" size={40} color="black" />
                                        :
                                        <Avatar.Image size={100} style={{ backgroundColor: 'transparent' }} source={{ uri: selectedRoute.author_profile_picture }} />
                                }
                                <Text style={[styles.simpleTextStyle, { color: 'black', fontSize: 18 }]}>{selectedRoute.author}</Text>
                            </View>
                        </View>
                    </Card.Content>
                </Card>
                <View style={{ padding: 6 }}></View>
                <View style={{ marginLeft: 15 }}>
                    <Text style={[styles.title, { fontSize: 22 }]}>{FASTEST_USERS}</Text>
                </View>
                <View style={{ padding: 6 }}></View>
                {selectedRoute.time_to_complete.slice(0, 3).map((item, index) => {
                    return (
                        <View key={index} styles={styles.alignFastestUsers}>
                            <View style={styles.users}>
                                <View style={styles.userAvatar}>
                                    {item.user == "ChoppSykler" ? 
                                        <FontAwesome5 name="dog" size={80} color="black" />
                                        :
                                        <Avatar.Image size={60} style={{ backgroundColor: 'transparent' }} source={{ uri: item.user_profile_picture }} />}
                                </View>
                                <View>
                                    <Card.Title title={item.user} titleStyle={[styles.simpleTextStyle, { fontSize: 19, color: 'black' }]} />
                                    <Card.Content>
                                        <View style={styles.alignment}>
                                            <Text style={styles.simpleTextStyle}>{TOTAL_TIME}</Text>
                                            <Text style={styles.numbers}>{Math.round(((item.general / 60) + Number.EPSILON) * 100) / 100}</Text>
                                            <Text style={styles.shorterTextStyle}>{MINUTES}</Text>
                                        </View>
                                        <View style={styles.alignment}>
                                            <Text style={styles.simpleTextStyle}>{TOTAL_TIME_NO_STOPS}</Text>
                                            <Text style={styles.numbers}>{Math.round(((item.moving / 60) + Number.EPSILON) * 100) / 100}</Text>
                                            <Text style={styles.shorterTextStyle}>{MINUTES}</Text>
                                        </View>
                                    </Card.Content>
                                    {
                                        item.user == "ChoppSykler" ?
                                            <View></View>
                                            :
                                            <Card.Actions>
                                                <Button mode="contained" color={Colors.greenIntense} labelStyle={{ color: 'white' }}
                                                    onPress={() => moveToUserProfile(item.user_id)}>{SEE_USER_PROFILE}</Button>
                                            </Card.Actions>
                                    }

                                </View>
                            </View>
                            <View style={{ padding: 6 }}></View>
                        </View>
                    )
                })}

                <View style={{ marginLeft: 15 }}>
                    <Text style={[styles.title, { fontSize: 22 }]}>{ROUTE_RATING}</Text>
                </View>
                <View style={{ padding: 6 }}></View>
                <View style={[styles.cardUserData, { backgroundColor: 'transparent', width: '50%', alignSelf: 'center' }]}>
                    <StarRating
                        disabled={true}
                        maxStars={5}
                        rating={selectedRoute.rate}
                        starSize={25}
                        fullStarColor={Colors.secondary}
                    />
                </View>
                <View style={{ padding: 6 }}></View>
                <View style={{alignItems: 'center'}}>
                    <PrimaryButtonOutline onPress={() => moveToDoRoute()} title={DO_ROUTE} style={{ width: '80%' }} />
                </View>
                <View style={{ padding: 10 }}></View>
            </ScrollView>
        </SafeAreaView>

    );
}

export default RouteInformation;

const styles = StyleSheet.create({
    title: {
        color: 'black',
        fontFamily: 'FredokaOne_400Regular',
        fontSize: 25,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.65,
    },
    card: {
        backgroundColor: Colors.info,
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
    },
    alignFastestUsers: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    users: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: Colors.greenLight,
        borderRadius: 15,
        marginLeft: 15,
        marginRight: 15
    },
    timeInformation: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    userAvatar: {
        alignSelf: 'center'
    },
    thinLine: {
        borderBottomColor: 'grey',
        borderBottomWidth: 0.5,
        width: '90%',
        alignSelf: 'center',
        marginTop: 15,
        marginBottom: 15
    },
    lightDate: {
        color: 'grey',
        fontFamily: 'Poppins_300Light',
        fontSize: 13,
    },
    simpleTextStyle: {
        color: Colors.intenseGrey,
        fontFamily: 'Poppins_300Light',
        fontSize: 16,
    },
    shorterTextStyle: {
        color: Colors.intenseGrey,
        fontFamily: 'Poppins_300Light',
        fontSize: 14,
    },
    timeNumber: {
        color: Colors.lightBlue,
        fontFamily: 'Poppins_300Light',
        fontSize: 30,
    },
    timeMinutes: {
        color: Colors.intenseGrey,
        fontFamily: 'Poppins_300Light',
        fontSize: 13,
    },
    alignment: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    numbers: {
        color: Colors.customBlack,
        fontFamily: 'Poppins_300Light',
        fontSize: 25,
    },
    cardRouteData: {
        backgroundColor: Colors.lightBlue,
        borderRadius: 15,
        marginLeft: 15,
        marginRight: 15
    },
    cardUserData: {
        backgroundColor: Colors.lightGrey,
        borderRadius: 15,
        marginLeft: 15,
        marginRight: 15
    }
});