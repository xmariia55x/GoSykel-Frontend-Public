
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useNavigation } from '@react-navigation/core';
import { useFonts, Poppins_300Light } from '@expo-google-fonts/poppins';

import ProfileHeader from '../components/ProfileHeader';
import ProfileInformation from '../components/ProfileInformation';
import Badge from '../components/Badge';
import RouteCard from '../components/RouteCard';
import { useUser } from '../context/UserContext';
import { Constants } from '../constants/Constants';

const PROFILE_PICTURE = "https://res.cloudinary.com/mariacloudinarycloud/image/upload/v1642791358/rjq9rb0c8krpcnwphsp7.png";
const HEADER_PICTURE = "https://res.cloudinary.com/mariacloudinarycloud/image/upload/v1648484177/header_nnhijo.jpg";
const ALERT_ERROR_MESSAGE = 'Se ha producido un fallo, ponte en contacto con los administradores de la aplicación.';
const BADGES = 'Insignias conseguidas';
const PUBLIC_ROUTES = 'Rutas públicas';

const GenericProfile = ({ route }) => {
    const { targetUserId, previousRoute } = route.params;

    const navigation = useNavigation()

    const [nickname, setNickname] = useState('go-sykler')
    const [points, setPoints] = useState(0)
    const [completedRoutesNumber, setCompletedRoutesNumber] = useState(0)
    const [ranking, setRanking] = useState(0)
    const [badges, setBadges] = useState([])
    const [routes, setRoutes] = useState([])
    const [avatarPicture, setAvatarPicture] = useState(PROFILE_PICTURE)
    const [headerPicture, setHeaderPicture] = useState(HEADER_PICTURE)
    const [loading, setLoading] = useState(true);

    const {token} = useUser();
    
    useEffect(() => {
        fetch(Constants.SERVER_URL + '/users/' + targetUserId, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            }
        }).then((response) => response.json())
            .then((responseData) => {
                setNickname(responseData.nickname);
                setPoints(responseData.points);
                setCompletedRoutesNumber(responseData.completed_routes_number);
                setBadges(responseData.badges);
                setRoutes(responseData.routes);
                setRanking(responseData.ranking);
                setAvatarPicture(responseData.avatars[0].location);
                setHeaderPicture(responseData.headers[0].location);

            })
            .catch((error) => {
                console.log(error.message);
                alert(ALERT_ERROR_MESSAGE)
            })
            .finally(() => {
                setLoading(false)
            });
    }, [])

    const handleGoBack = () => {
        navigation.replace("RouteInformation", { selectedRoute: previousRoute })
    }

    let [fontsLoaded] = useFonts({
        Poppins_300Light
    });
    if (!fontsLoaded) {
        return <AppLoading />;
    }
    const seeRouteInformation = (item) => {
        navigation.replace("RouteInformation", { selectedRoute: item })
    }
    return (
        <SafeAreaView style={styles.container}>
            {
                loading ? (
                    <View style={{flex: 1, justifyContent: "center"}}>
                        <ActivityIndicator
                            visible={loading}
                            size="large"
                            color='black'
                        />
                    </View>

                ) : (
                    <>
                        <ProfileHeader nickname={nickname} email={""} header={headerPicture} profile={avatarPicture} onPress={handleGoBack}></ProfileHeader>
                        <View style={styles.content}>
                            <ScrollView>
                                <ProfileInformation completedRoutesNumber={completedRoutesNumber} points={points}
                                ranking={ranking}></ProfileInformation>
                                <View style={styles.titleContent}>
                                    <Text style={[styles.fredokaTitle, { fontSize: 22 }]}>{PUBLIC_ROUTES}</Text>
                                </View>
                                <View style={{ padding: 6 }}></View>
                                {routes.map((item, index) => {
                                    return (
                                        <View key={index}>
                                            <RouteCard name={item.name} private={item.private} author={item.author}
                                                distance={item.distance} date={item.date} rate={item.rate} onPress={() => seeRouteInformation(item)}
                                                editable={false} onEditRoutePress={() => {}} deletable={false} onDeleteRoutePress={() => {}} />
                                        </View>
                                    )
                                })}
                                <View style={{ padding: 6 }}></View>
                                <View style={styles.titleContent}>
                                    <Text style={[styles.fredokaTitle, { fontSize: 22 }]}>{BADGES}</Text>
                                </View>
                                <View style={{ padding: 6 }}></View>
                                {badges.map((item, index) => {
                                    return (
                                        <View key={index}>
                                            <Badge title={item.name} subtitle={item.description} source={item.location} />
                                        </View>
                                    )
                                })}
                            </ScrollView>
                        </View>
                    </>
                )
            }
        </SafeAreaView>
    );
}
export default GenericProfile
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    content: {
        flex: 1
    },
    fredokaTitle: {
        color: 'black',
        fontFamily: 'FredokaOne_400Regular',
        fontSize: 25,
    },
    titleContent: {
        alignSelf: 'flex-start',
        marginLeft: 15
    }
});
