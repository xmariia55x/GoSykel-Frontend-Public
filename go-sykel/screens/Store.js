import React, { useEffect, useState } from 'react';
import { Text, View, Dimensions, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel'; 
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';

import { scrollInterpolator, animatedStyles } from '../utils/animations';
import { Colors } from '../colors/Colors';
import { useUser } from '../context/UserContext';
import { Constants } from '../constants/Constants';

const WELCOME_STORE = 'Bienvenido a la tienda de GoSykel';
const AVATARS = 'Avatares';
const HEADERS = 'Encabezados';
const BADGES = 'Insignias';
const OF = 'de';
const ALERT_ERROR_MESSAGE = 'Se ha producido un fallo, ponte en contacto con los administradores de la aplicación.';
const BOUGHT = 'Comprado';
const AVAILABLE_POINTS = 'puntos disponibles';
const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 0.8);

const Store = () => {
    const [avatarsIndex, setAvatarsIndex] = useState(0);
    const [headersIndex, setHeadersIndex] = useState(0);
    const [badgesIndex, setBadgesIndex] = useState(0);
    const [availablePoints, setAvailablePoints] = useState(0);
    const [loading, setLoading] = useState(true);
    const [avatars, setAvatars] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [badges, setBadges] = useState([]);

    const navigation = useNavigation()

    const { userId, token } = useUser();

    const fetchStoreItems = () => {
        fetch(Constants.SERVER_URL + '/users/' + userId + '/items', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            }
        }).then((response) => response.json())
            .then((responseData) => {
                setAvatars(responseData.avatars)
                setHeaders(responseData.headers)
                setBadges(responseData.badges)
                setAvailablePoints(responseData.available_points)
            })
            .catch((error) => {
                console.log(error.message);
                alert(ALERT_ERROR_MESSAGE);
            })
            .finally(() => {
                setLoading(false)
            });
    }
    
    const navigateToItemInformation = (item) => {
        navigation.replace("ItemInformation", {selectedItem: item})
    }

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigateToItemInformation(item)}>
                <View style={styles.itemContainer}>
                    <Image source={{ uri: item.location }} style={styles.image}></Image>
                    <Text style={styles.itemLabel}>{item.name}</Text>
                    {item.bought !== undefined &&
                        <View style={styles.boughtLabel}>
                            <Text style={[styles.itemLabel, {color: Colors.primary}]}>{BOUGHT}</Text>
                        </View>
                    }
                </View>
            </TouchableOpacity>
        );
    }
    useEffect(() => {
        fetchStoreItems();
    }, []);

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
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
                        <ScrollView>
                            <View style={{ flexDirection: 'row' }}>
                                <View>
                                    <IconButton
                                        icon="arrow-left"
                                        color='black'
                                        size={30}
                                        onPress={() => navigation.replace("AccountManagement")}
                                    />
                                </View>
                                <View>
                                    <Text style={styles.title}>{WELCOME_STORE}</Text>
                                </View>
                            </View>
                            <View style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20, flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={[styles.label, {fontSize: 30, color: Colors.customBlack}]}>{availablePoints} </Text>
                                <Text style={[styles.label, {fontSize: 15}]}>{AVAILABLE_POINTS}</Text>
                            </View>
                            <View style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 10 }}>
                                <Text style={styles.label}>{AVATARS}</Text>
                            </View>
                            <Carousel
                                data={avatars}
                                renderItem={renderItem}
                                sliderWidth={SLIDER_WIDTH}
                                itemWidth={ITEM_WIDTH}
                                containerCustomStyle={styles.carouselContainer}
                                inactiveSlideShift={0}
                                onSnapToItem={(avatarsIndex) => setAvatarsIndex(avatarsIndex)}
                                scrollInterpolator={scrollInterpolator}
                                slideInterpolatedStyle={animatedStyles}
                                useScrollView={true}
                            />
                            <Text style={styles.counter}>
                                {avatarsIndex + 1} {OF} {avatars.length}
                            </Text>
                            <View style={{ paddingLeft: 20, paddingRight: 20 }}>
                                <Text style={styles.label}>{HEADERS}</Text>
                            </View>
                            <Carousel
                                data={headers}
                                renderItem={renderItem}
                                sliderWidth={SLIDER_WIDTH}
                                itemWidth={ITEM_WIDTH}
                                containerCustomStyle={styles.carouselContainer}
                                inactiveSlideShift={0}
                                onSnapToItem={(headersIndex) => setHeadersIndex(headersIndex)}
                                scrollInterpolator={scrollInterpolator}
                                slideInterpolatedStyle={animatedStyles}
                                useScrollView={true}
                            />
                            <Text style={styles.counter}>
                                {headersIndex + 1} {OF} {headers.length}
                            </Text>
                            <View style={{ paddingLeft: 20, paddingRight: 20 }}>
                                <Text style={styles.label}>{BADGES}</Text>
                            </View>
                            <Carousel
                                data={badges}
                                renderItem={renderItem}
                                sliderWidth={SLIDER_WIDTH}
                                itemWidth={ITEM_WIDTH}
                                containerCustomStyle={styles.carouselContainer}
                                inactiveSlideShift={0}
                                onSnapToItem={(badgesIndex) => setBadgesIndex(badgesIndex)}
                                scrollInterpolator={scrollInterpolator}
                                slideInterpolatedStyle={animatedStyles}
                                useScrollView={true}
                            />
                            <Text style={styles.counter}>
                                {badgesIndex + 1} {OF} {badges.length}
                            </Text>
                        </ScrollView>
                    </>
                )
                }
            </SafeAreaView>
        </SafeAreaProvider>
    );

}
export default Store;
const styles = StyleSheet.create({
    carouselContainer: {
        //marginTop: 10
    },
    itemContainer: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderColor: Colors.customBlack,
        borderWidth: 1,
        borderRadius: 15
    },
    itemLabel: {
        color: Colors.customBlack,
        fontFamily: 'Poppins_300Light',
        fontSize: 17
    },
    counter: {
        marginTop: 25,
        fontFamily: 'FredokaOne_400Regular',
        fontSize: 17,
        textAlign: 'center'
    },
    title: {
        color: 'black',
        fontFamily: 'FredokaOne_400Regular',
        fontSize: 25,
        paddingTop: 10
    },
    label: {
        color: 'black',
        fontFamily: 'Poppins_300Light',
        fontSize: 20,
    },
    image: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT * 0.75,
        resizeMode: 'contain'
    },
    activityIndicator: {
        flex: 1,
        justifyContent: "center",
        alignSelf: 'center'
    },
    boughtLabel: {
        alignItems: 'center'
    }
});
