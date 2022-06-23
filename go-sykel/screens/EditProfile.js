import { View, TextInput, Text, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator, Image } from 'react-native';
import { Appbar, Portal, Modal, Button, Provider } from 'react-native-paper'
import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react'
import AppLoading from 'expo-app-loading';
import { useFonts, Poppins_300Light, Poppins_400Regular } from '@expo-google-fonts/poppins';
import { FredokaOne_400Regular } from '@expo-google-fonts/fredoka-one';

import firebase from 'firebase/compat/app';
import { auth } from '../firebase/Firebase';
import { Colors } from '../colors/Colors';
import { Constants } from '../constants/Constants';
import PrimaryButton from '../components/PrimaryButton';
import { useUser } from '../context/UserContext';
import { useItem } from '../context/ItemContext';
import RadioButtonList from '../components/RadioButtonList';
import ErrorButtonOutline from '../components/ErrorButtonOutline';

const DIALOG_IMAGE = 'https://res.cloudinary.com/mariacloudinarycloud/image/upload/v1651401771/gosykel/assets/megaphone_qmeopy.png';
const ALERT_USER_ABOUT_DELETING_PROFILE = 'Estás a punto de eliminar tu cuenta. ¿Estás seguro?';
const YES = 'Sí';
const NO = 'No';
const FILL_IN_THE_FIELDS = 'Debe rellenar todos los campos para actualizar tu perfil correctamente.';
const PASSWORD_MIN_6_CHARACTERS = 'La contraseña debe tener como mínimo 6 caracteres.';
const EDIT_PROFILE_TITLE = 'Editar perfil';
const EDIT_PROFILE_SUBTITLE = 'Actualiza tu perfil para estar al día';
const NICKNAME_LABEL = 'Nombre de usuario';
const CURRENT_PASSWORD_LABEL = 'Contraseña actual';
const NEW_PASSWORD_LABEL = 'Nueva contraseña';
const EDIT_PROFILE_BUTTON_TITLE = 'Guardar cambios';
const AVATAR_HEADER_LABEL = 'Elige tu avatar y encabezado';
const YOUR_AVATARS = 'Tus avatares';
const YOUR_HEADERS = ' Tus encabezados';
const ALERT_ERROR_MESSAGE = 'Se ha producido un fallo, ponte en contacto con los administradores de la aplicación';
const NICKNAME_SECTION = 'Cambia tu nombre de usuario';
const CHANGE_PASSWORD_SECTION = 'Cambia tu contraseña';
const DELETE_PROFILE_BUTTON_TITLE = 'Borrar perfil';
const DANGER_ZONE = 'Zona peligrosa';
const EditProfile = () => {
    const navigation = useNavigation()
    const [nickname, setNickname] = useState('')
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [avatars, setAvatars] = useState([])
    const [headers, setHeaders] = useState([])
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);

    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);

    const { userId, updateUserInformation, deleteUser, invalidateTokenUserId, token } = useUser();
    const { getSelectedAvatar, getSelectedHeader } = useItem();

    useEffect(() => {
        fetch(Constants.SERVER_URL + '/users/' + userId, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            }
        }).then((response) => response.json())
            .then((responseData) => {
                setNickname(responseData.nickname);
                parseAvatars(responseData.avatars);
                parseHeaders(responseData.headers);
            })
            .catch((error) => {
                console.log(error.message);
                alert(ALERT_ERROR_MESSAGE)
            })
            .finally(() => {
                setLoading(false)
            });
    }, [])

    const parseAvatars = (avatarsArray) => {
        let data = [];
        for (let i = 0; i < avatarsArray.length; i++) {
            let parsed_avatar = { "key": avatarsArray[i]._id, "text": avatarsArray[i].name, "picture": avatarsArray[i].location };
            data.push(parsed_avatar);
        }
        setAvatars(data);
    }

    const parseHeaders = (headersArray) => {
        let data = [];
        for (let i = 0; i < headersArray.length; i++) {
            let parsed_header = { "key": headersArray[i]._id, "text": headersArray[i].name, "picture": headersArray[i].location };
            data.push(parsed_header);
        }
        setHeaders(data);
    }
    const reauthenticate = (password) => {
        let user = auth.currentUser;
        let credential = firebase.auth.EmailAuthProvider.credential(user.email, password);
        return user.reauthenticateWithCredential(credential);
    }

    const isEmpty = (string) => {
        return string.trim().length === 0
    }
    const handleEditProfile = async () => {
        if (isEmpty(nickname) || isEmpty(currentPassword)) {
            alert(FILL_IN_THE_FIELDS);
        } else if (currentPassword.trim().length < 6) {
            alert(PASSWORD_MIN_6_CHARACTERS);
        } else {
            if (!isEmpty(newPassword) && newPassword.trim().length >= 6) {
                //User wants to update the password
                reauthenticate(currentPassword).then(() => {
                    let user = auth.currentUser;
                    user.updatePassword(newPassword).then(() => {
                    }).catch((error) => { alert(error.message); });
                }).catch((error) => { alert(error.message) });
            }
            let avatarSelected = getSelectedAvatar();
            let headerSelected = getSelectedHeader();
            await updateUserInformation(nickname, avatarSelected, headerSelected);
            navigation.replace("Profile")
        }

    }

    const handleGoBack = () => {
        navigation.replace("Profile")
    }

    const deleteUserProfile = async () => {
        try {
            let response = await auth.signOut()
            await deleteUser();
            invalidateTokenUserId()
            navigation.replace("Welcome")
        } catch (error) {
            alert(error.message)
        }
    }

    const handleDeleteProfile = () => {
        deleteUserProfile()
        hideModal()
    }

    let [fontsLoaded] = useFonts({
        Poppins_300Light,
        Poppins_400Regular,
        FredokaOne_400Regular
    });
    if (!fontsLoaded) {
        return <AppLoading />;
    }
    return (
        <Provider>
            <SafeAreaView style={styles.container}>
                {
                    loading ? (
                        <View style={{ flex: 1, justifyContent: "center", alignSelf: 'center' }}>
                            <ActivityIndicator
                                visible={loading}
                                size="large"
                                color='black'
                            />
                        </View>
                    ) : (
                        <>
                            <ScrollView>
                                <Appbar.Header style={{ backgroundColor: 'white' }}>
                                    <Appbar.BackAction onPress={handleGoBack} />
                                    <Appbar.Content titleStyle={styles.title} title={EDIT_PROFILE_TITLE}
                                        subtitleStyle={styles.subtitle} subtitle={EDIT_PROFILE_SUBTITLE} />
                                </Appbar.Header>
                                <SafeAreaView style={styles.content}>

                                    <View style={{ padding: 6 }}></View>
                                    <Text style={styles.fredokaTitle}>{NICKNAME_SECTION}</Text>
                                    <Text style={styles.label}>{NICKNAME_LABEL}</Text>
                                    <TextInput
                                        value={nickname}
                                        onChangeText={text => setNickname(text)}
                                        style={styles.textInput}
                                    />
                                    <View style={{ padding: 6 }}></View>
                                    <Text style={styles.fredokaTitle}>{AVATAR_HEADER_LABEL}</Text>
                                    <Text style={styles.titleLabel}>{YOUR_AVATARS}</Text>
                                    <RadioButtonList list={avatars} type="avatar" />
                                    <Text style={styles.titleLabel}>{YOUR_HEADERS}</Text>
                                    <RadioButtonList list={headers} type="header" />

                                    <View style={{ padding: 6 }}></View>
                                    <Text style={styles.fredokaTitle}>{CHANGE_PASSWORD_SECTION}</Text>
                                    <Text style={styles.label}>{CURRENT_PASSWORD_LABEL}</Text>
                                    <TextInput
                                        value={currentPassword}
                                        onChangeText={text => setCurrentPassword(text)}
                                        style={styles.textInput}
                                        secureTextEntry />
                                    <Text style={styles.label}>{NEW_PASSWORD_LABEL}</Text>
                                    <TextInput
                                        value={newPassword}
                                        onChangeText={text => setNewPassword(text)}
                                        style={styles.textInput}
                                        secureTextEntry />
                                    <View style={{ padding: 6 }}></View>
                                    <Text style={[styles.fredokaTitle, { color: Colors.error }]}>{DANGER_ZONE}</Text>
                                    <View style={{ alignItems: 'center' }}>
                                        <ErrorButtonOutline style={styles.editDeleteProfile} title={DELETE_PROFILE_BUTTON_TITLE} onPress={showModal} />
                                        <PrimaryButton style={[styles.editDeleteProfile, { width: '90%' }]} title={EDIT_PROFILE_BUTTON_TITLE} onPress={handleEditProfile} />
                                    </View>
                                </SafeAreaView>
                                <Portal>
                                    <Modal visible={modalVisible} contentContainerStyle={styles.modal} dismissable={false}>
                                        <View style={{ alignItems: 'center' }}>
                                            <Image
                                                style={{ width: 100, height: 100 }}
                                                source={{ uri: DIALOG_IMAGE }} />
                                        </View>
                                        <Text style={styles.paragraph}>{ALERT_USER_ABOUT_DELETING_PROFILE}</Text>
                                        <Button icon="check" mode="outlined" color={Colors.success} onPress={handleDeleteProfile}>
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
    )
}

export default EditProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    content: {
        paddingLeft: 20,
        paddingRight: 20,
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
    label: {
        color: 'black',
        fontFamily: 'Poppins_300Light',
        fontSize: 15,
        marginTop: 15
    },
    titleLabel: {
        fontSize: 22,
        fontFamily: 'Poppins_400Regular',
        marginTop: 15,
        color: 'black'
    },
    editDeleteProfile: {
        width: '60%',
        marginTop: 10
    },
    title: {
        fontFamily: 'FredokaOne_400Regular',
        fontSize: 25,
        color: 'black'
    },
    subtitle: {
        fontFamily: 'FredokaOne_400Regular',
        fontSize: 16,
        color: Colors.grey
    },
    fredokaTitle: {
        color: 'black',
        fontFamily: 'FredokaOne_400Regular',
        fontSize: 22,
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
});