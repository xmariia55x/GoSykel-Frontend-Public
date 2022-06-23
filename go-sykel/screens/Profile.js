
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useNavigation } from '@react-navigation/core';
import { useFonts, Poppins_300Light } from '@expo-google-fonts/poppins';

import { useUser } from '../context/UserContext';
import { Constants } from '../constants/Constants';
import EditProfileButton from '../components/EditProfileButton';
import ProfileHeader from '../components/ProfileHeader';
import ProfileInformation from '../components/ProfileInformation';
import Badge from '../components/Badge';

const PROFILE_PICTURE = "https://res.cloudinary.com/mariacloudinarycloud/image/upload/v1642791358/rjq9rb0c8krpcnwphsp7.png";
const HEADER_PICTURE = "https://res.cloudinary.com/mariacloudinarycloud/image/upload/v1648484177/header_nnhijo.jpg";
const EDIT_PROFILE_BUTTON_TITLE = "Editar perfil";
const ALERT_ERROR_MESSAGE = 'Se ha producido un fallo, ponte en contacto con los administradores de la aplicación.';
const BADGES = 'Insignias conseguidas';
const Profile = () => {
  const navigation = useNavigation()

  const { userId, token } = useUser();
  
  const [email, setEmail] = useState('example@example.com')
  const [nickname, setNickname] = useState('go-sykler')
  const [points, setPoints] = useState(0)
  const [routes, setCompletedRoutesNumber] = useState(0)
  const [ranking, setRanking] = useState(0)
  const [badges, setBadges] = useState([])
  const [avatarPicture, setAvatarPicture] = useState(PROFILE_PICTURE)
  const [headerPicture, setHeaderPicture] = useState(HEADER_PICTURE)
  const [loading, setLoading] = useState(true);

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
        setEmail(responseData.email);
        setNickname(responseData.nickname);
        setPoints(responseData.points);
        setRanking(responseData.ranking);
        setCompletedRoutesNumber(responseData.completed_routes_number);
        setBadges(responseData.badges);
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

  const editProfile = () => {
    navigation.replace("EditProfile")
  }

  const handleGoBack = () => {
    navigation.replace("AccountManagement")
  }

  let [fontsLoaded] = useFonts({
    Poppins_300Light
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
      <SafeAreaView style={styles.container}>
        {
          loading ? (
            <View style={{ flex: 1, justifyContent: "center" }}>
              <ActivityIndicator
                visible={loading}
                size="large"
                color='black'
              />
            </View>
          ) : (
            <>
              <ProfileHeader nickname={nickname} email={email} header={headerPicture} profile={avatarPicture} onPress={handleGoBack}></ProfileHeader>
              <View style={styles.content}>
                <ScrollView>
                  <ProfileInformation completedRoutesNumber={routes} points={points} ranking={ranking}></ProfileInformation>
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
                  <View style={{ padding: 6 }}></View>
                  <View style={styles.footer}>
                    <EditProfileButton title={EDIT_PROFILE_BUTTON_TITLE} onPress={editProfile} />
                  </View>

                </ScrollView>
              </View>
            </>
          )
        }

      </SafeAreaView>
  );
}
export default Profile
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
  },
  footer: {
    alignItems: 'center',
    alignSelf: 'center',
    width: '70%'
  },
});
