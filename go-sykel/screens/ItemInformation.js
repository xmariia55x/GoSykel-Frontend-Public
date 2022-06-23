import React, {useState} from 'react';
import { Text, View, Dimensions, StyleSheet, Image } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconButton, Button } from 'react-native-paper';
import { Paragraph, Dialog, Portal, Provider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import { AntDesign } from '@expo/vector-icons';

import { Colors } from '../colors/Colors';
import { useUser } from '../context/UserContext';
import { Constants } from '../constants/Constants';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);
const ITEM_HEIGHT = Math.round(SLIDER_WIDTH * 0.9);
const DESCRIPTION = 'Descripción';
const POINTS = 'puntos';
const BOUGHT = 'Comprado';
const BUY_ITEM = 'Nueva compra';
const ASK_USER_IS_SURE = 'Vas a canjear tus puntos por este artículo, ¿estás seguro? 🤔';
const YES = 'Sí';
const NO = 'No';
const ALERT_ERROR_MESSAGE = 'Se ha producido un fallo, ponte en contacto con los administradores de la aplicación.';
const ItemInformation = ({ route }) => {
    const navigation = useNavigation()
    const { selectedItem } = route.params;
    const { userId, token } = useUser();
    const [visible, setVisible] = useState(false);
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);
    const goBack = () => {
        navigation.replace("Store")
    }
    const buyItemRequest = async () => {
        try {
            let response = await fetch(Constants.SERVER_URL + '/users/' + userId + '/items/' + selectedItem._id, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            })
            let responseData = await response.json()
            if(responseData.message !== undefined){
                alert(responseData.message)
            }
        } catch (error) {
            console.log(error.message);
            alert(ALERT_ERROR_MESSAGE)
        }
    }
    const buyItem = () => {
        buyItemRequest()
        hideDialog()
        navigation.replace("Store")
    }
    return (
        <Provider>
            <SafeAreaProvider>
                <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View>
                            <IconButton
                                icon="arrow-left"
                                color='black'
                                size={30}
                                onPress={() => goBack()}
                            />
                        </View>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Image source={{ uri: selectedItem.location }} style={styles.image}></Image>
                    </View>

                    <View style={styles.container}>
                        <Text style={styles.title}>
                            {selectedItem.name}
                        </Text>
                    </View>

                    <View style={{ alignItems: 'baseline' }}>
                        <View style={[styles.container, styles.descriptionContainer]}>
                            <Text style={styles.descriptionLabel}>
                                {DESCRIPTION}
                            </Text>
                        </View>
                        <View style={[styles.container, { paddingRight: 20 }]}>
                            <Text style={styles.text}>
                                {selectedItem.description}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.bottomView}>
                        <View style={{ justifyContent: 'space-between' }}>
                            <Text style={[styles.text, { fontSize: 30 }]}>{selectedItem.points} </Text>
                            <Text style={styles.text}>{POINTS}</Text>
                        </View>
                        <Button mode="outlined" color={Colors.customBlack} contentStyle={{ alignItems: 'center', flexDirection: 'row' }}
                            labelStyle={{ fontSize: 24 }}>
                            <AntDesign name="minus" size={24} color={Colors.lightGrey} />
                            <View style={{ padding: 4 }}></View>
                            1
                            <View style={{ padding: 4 }}></View>
                            <AntDesign name="plus" size={24} color={Colors.lightGrey} />
                        </Button>
                        {selectedItem.bought !== undefined ?
                            <View style={{ backgroundColor: Colors.lightGrey, borderRadius: 15, padding: 5 }}>
                                <IconButton
                                    icon="alert-circle-outline"
                                    color={Colors.customBlack}
                                    size={30}
                                    style={{ alignSelf: 'center' }}
                                />
                                <Text style={[styles.descriptionLabel, { color: Colors.customBlack, fontSize: 13 }]}>{BOUGHT}</Text>
                            </View>
                            :
                            <View style={{ backgroundColor: Colors.lightBlue, borderRadius: 15 }}>
                                <IconButton
                                    icon="cart-outline"
                                    color='black'
                                    size={40}
                                    onPress={() => showDialog()}
                                />
                            </View>
                        }
                    </View>
                    <Portal>
                        <Dialog visible={visible} onDismiss={hideDialog}>
                            <Dialog.Title style={styles.title}>{BUY_ITEM}</Dialog.Title>
                            <Dialog.Content>
                                <Paragraph style={styles.paragraph}>{ASK_USER_IS_SURE}</Paragraph>
                            </Dialog.Content>
                            <Dialog.Actions>
                                <Button onPress={hideDialog} color={Colors.error}>{NO}</Button>
                                <Button onPress={buyItem} color={Colors.success}>{YES}</Button>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>
                </SafeAreaView>
            </SafeAreaProvider>
        </Provider>
    );

}
export default ItemInformation;
const styles = StyleSheet.create({
    title: {
        fontFamily: 'FredokaOne_400Regular',
        fontSize: 25,
    },
    container: {
        marginTop: 15,
        marginLeft: 25
    },
    descriptionLabel: {
        fontFamily: 'FredokaOne_400Regular',
        fontSize: 18,
    },
    image: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT * 0.75,
        resizeMode: 'contain'
    },
    text: {
        color: Colors.customBlack,
        fontFamily: 'Poppins_300Light',
        fontSize: 14
    },
    bottomView: {
        width: '100%',
        backgroundColor: 'white',
        justifyContent: 'space-around',
        //justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        flexDirection: 'row',
        bottom: 0,
        paddingBottom: 15
    },
    descriptionContainer: {
        marginTop: 35,
        padding: 10,
        backgroundColor: Colors.lightBlue,
        borderRadius: 5
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
});
