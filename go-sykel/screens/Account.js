import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, FlatList } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import AppLoading from 'expo-app-loading';
import { useFonts, Poppins_300Light } from '@expo-google-fonts/poppins';
import { FredokaOne_400Regular } from '@expo-google-fonts/fredoka-one';
import { auth } from '../firebase/Firebase'

import { useUser } from '../context/UserContext';
import { Constants } from '../constants/Constants';

const ACCOUNT_MANAGEMENT = 'Gestiona tu cuenta';
const Account = () => {
  const navigation = useNavigation()
  const { invalidateTokenUserId, token } = useUser()
  const logOutRequest = async () => {
    try {
      let response = await fetch(Constants.SERVER_URL + '/logout', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': token
        },
      })
    } catch (error) {
      console.log(error.message);
      alert(error.message)
    }
  }

  const logOut = async () => {
    try {
      let response = await auth.signOut()
      await logOutRequest()
      invalidateTokenUserId()
      navigation.replace("Welcome")
    } catch (error) {
      alert(error.message)
    }
  }

const handleNavigateToProfile = () => {
  navigation.navigate("Profile")
}
const handleNavigateToStore = () => {
  navigation.navigate("Store")
}
const handleNavigateToMyRoutes = () => {
  navigation.navigate("UserRoutes")
}
const handleNavigateToAboutUs = () => {
  navigation.navigate("About")
}
const data = [
  {
    id: 1, name: "Mi perfil",
    image: "https://img.icons8.com/external-wanicon-lineal-wanicon/96/000000/external-profile-user-interface-wanicon-lineal-wanicon.png",
    onPress: handleNavigateToProfile
  },
  {
    id: 2, name: "Mis rutas",
    image: "https://img.icons8.com/dotty/80/000000/waypoint-map.png",
    onPress: handleNavigateToMyRoutes
  },
  {
    id: 3, name: "Tienda",
    image: "https://img.icons8.com/ios/96/000000/shop.png",
    onPress: handleNavigateToStore
  },
  {
    id: 4, name: "Sobre GoSykel",
    image: "https://img.icons8.com/ios/96/000000/about.png",
    onPress: handleNavigateToAboutUs
  },
  {
    id: 5, name: "Cerrar sesión",
    image: "https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/96/000000/external-exit-essentials-tanah-basah-glyph-tanah-basah-2.png",
    onPress: logOut
  },
];
let [fontsLoaded] = useFonts({
  Poppins_300Light, FredokaOne_400Regular
});
if (!fontsLoaded) {
  return <AppLoading />;
}
return (
  <SafeAreaView style={styles.container}>
    <Appbar.Header style={{ backgroundColor: 'white' }}>
      <Appbar.Content titleStyle={styles.accountTitle} title={ACCOUNT_MANAGEMENT} />
    </Appbar.Header>
    <FlatList
      style={styles.contentList}
      columnWrapperStyle={styles.listContainer}
      data={data}
      keyExtractor={(item) => {
        return item.id;
      }}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity style={styles.card} onPress={item.onPress}>
            <Image style={styles.image} source={{ uri: item.image }} />
            <View style={styles.cardContent}>
              <Text style={styles.name}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )
      }} />

  </SafeAreaView>
);
}
export default Account
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  contentList: {
    //flex: 1,
  },
  cardContent: {
    marginLeft: 20,
    marginTop: 10
  },
  image: {
    width: 50,
    height: 50
  },
  accountTitle: {
    color: "black",
    fontFamily: 'FredokaOne_400Regular',
    fontSize: 25,
  },
  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    backgroundColor: "#ebf0f7",
    padding: 10,
    flexDirection: 'row',
    borderRadius: 30,
  },
  name: {
    fontSize: 15,
    flex: 1,
    alignSelf: 'center',
    color: "black",
    fontFamily: 'Poppins_300Light'
  }
});
