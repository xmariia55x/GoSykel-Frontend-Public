import React, { useState, useEffect } from 'react'
import MapView, { Polyline } from 'react-native-maps';
import { useNavigation } from '@react-navigation/core';
import { StyleSheet, Dimensions, SafeAreaView, ActivityIndicator } from 'react-native';
import { Appbar, Snackbar, FAB, Portal, Provider } from 'react-native-paper';
import AppLoading from 'expo-app-loading';
import { useFonts, FredokaOne_400Regular } from '@expo-google-fonts/fredoka-one';

import { Colors } from '../colors/Colors';
import { useUser } from '../context/UserContext';
import { Constants } from '../constants/Constants';

const INITIAL_LATITUDE = 36.719444;
const INITIAL_LONGITUDE = -4.420000;
const initialRegion = {
  latitude: INITIAL_LATITUDE,
  longitude: INITIAL_LONGITUDE,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
}
const MALAGA_BYCICLE_LANES = 'Carriles bici - Málaga capital';
const NEW_BYCICLE_LANE = "Carril bici";
const ALERT_ERROR_MESSAGE = 'Ahora mismo no es posible mostrar los carriles bici.';
let CONGRATULATIONS = "";
export default function BycicleLanes({ route }) {
  const { previousScreen, bycicleLanePoints, bycicleLaneUserPoints } = route.params;
  const navigation = useNavigation()

  let [fontsLoaded] = useFonts({
    FredokaOne_400Regular
  });

  const { userId, token } = useUser();
  const [loading, setLoading] = useState(true);
  const [unofficialBycicleLanes, setNewUnofficialBycicleLane] = useState([[]]);
  const [officialBycicleLanes, setNewOfficialBycicleLane] = useState([[]]);
  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const [visibleFAB, setVisibleFAB] = useState(true);

  const onDismissSnackBar = () => {
    setSnackBarVisible(false);
    setVisibleFAB(true);
  }
  const hideSnackBar = () => {
    setSnackBarVisible(false);
    setVisibleFAB(true);
  }
  const showSnackBar = () => {
    setVisibleFAB(false)
    setSnackBarVisible(true);
  }
  const getUserPoints = async () => {
    try {
      let response = await fetch(Constants.SERVER_URL + '/users/' + userId + '/points', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
      let responseData = await response.json()
      return {
        points: responseData.points,
        userPoints: responseData.user_points,
      };
    } catch (error) {
      console.log(error.message);
      alert(ALERT_ERROR_MESSAGE)
    }
  }
  const getCoordinatesRefactored = async () => {
    try {
      let response = await fetch(Constants.SERVER_URL + '/byciclelanes', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
      let responseData = await response.json()
      let official = responseData.official
      let officialKeys = Object.keys(official);
      officialKeys.forEach(function (key) {
        let coordinatesList = official[key];
        let list = [];

        for (let i = 0; i < coordinatesList.length; i++) {
          const newElement = { latitude: coordinatesList[i][1], longitude: coordinatesList[i][0] };
          list.push(newElement);
        }
        setNewOfficialBycicleLane(officialBycicleLanes => [...officialBycicleLanes, list]);
      });
      let unofficial = responseData.unofficial
      let unofficialKeys = Object.keys(unofficial);
      unofficialKeys.forEach(function (key) {
        let coordinatesList = unofficial[key];
        let list = [];

        for (let i = 0; i < coordinatesList.length; i++) {
          const newElement = { latitude: coordinatesList[i][1], longitude: coordinatesList[i][0] };
          list.push(newElement);
        }
        setNewUnofficialBycicleLane(unofficialBycicleLanes => [...unofficialBycicleLanes, list]);
      });
    } catch (error) {
      console.log(error.message);
      alert(ALERT_ERROR_MESSAGE)
    } finally {
      console.log(previousScreen)
      if (previousScreen == "NewBycicleLane" && bycicleLanePoints !== undefined && bycicleLanePoints > 0
        && bycicleLaneUserPoints !== undefined && bycicleLaneUserPoints > 0) {
        setLoading(false)
        CONGRATULATIONS = "¡Enhorabuena! 🤗 Has ganado " + bycicleLanePoints + " puntos al añadir un nuevo tramo de carril bici. 🤩 Ahora mismo tienes " + bycicleLaneUserPoints + " puntos. 👏";
        showSnackBar()
      } else {
        if (previousScreen == "Login") {
          let pointsValues = await getUserPoints()
          if (pointsValues.points > 0) {
            CONGRATULATIONS = "¡Enhorabuena! 🤗 Has ganado " + pointsValues.points + " puntos por iniciar sesión durante varios días consecutivos en GoSykel. 🥳 Ahora mismo tienes " + pointsValues.userPoints + " puntos. 🎉 ¡Sigue así! 🚀 🚀";
            setLoading(false)
            showSnackBar()
          } else{
            setLoading(false)
          }
        }
        if (previousScreen == "SignUp") {
          let pointsValues = await getUserPoints()
          CONGRATULATIONS = "¡Enhorabuena! 🤗 Has ganado " + pointsValues.points + " puntos por registrarte en GoSykel. 🤩 Ahora mismo tienes " + pointsValues.userPoints + " puntos. 👏";
          setLoading(false)
          showSnackBar()
        }
        if(previousScreen == "NewBycicleLane"){
          setLoading(false)
        }
      }
    }
  }
  
  const addNewBycicleLane = () => {
    navigation.replace("NewBycicleLane")
  }

  useEffect(() => {
    getCoordinatesRefactored();
  }, [])

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator
          visible={loading}
          size="large"
          color="black"
        />
      ) : (
        <>
          <Appbar.Header style={{ backgroundColor: 'white' }}>
            <Appbar.Content titleStyle={styles.title} title={MALAGA_BYCICLE_LANES} />
          </Appbar.Header>
          <Provider>
            <Portal>
              <FAB
                style={styles.addBycicleLaneButton}
                visible={visibleFAB}
                icon="plus"
                label={NEW_BYCICLE_LANE}
                color='white'
                onPress={addNewBycicleLane}
                theme={{ colors: { accent: Colors.customBlack } }}
              />

            </Portal>
            <MapView
              style={styles.map}
              initialRegion={initialRegion}
              showsUserLocation={true}
              followsUserLocation={true}
              zoomEnabled={true}
            >
              {unofficialBycicleLanes.map((coordinates, index) => (
                <Polyline
                  coordinates={coordinates}
                  key={index}
                  strokeColor={Colors.secondary}
                  strokeColors={['#7F0000']}
                  strokeWidth={3}
                />
              )
              )}
              {officialBycicleLanes.map((coordinates, index) => (
                <Polyline
                  coordinates={coordinates}
                  key={index}
                  strokeColor={Colors.customBlack}
                  strokeColors={['#7F0000']}
                  strokeWidth={3}
                />
              )
              )}
            </MapView>
            {snackBarVisible &&
              <Snackbar
                visible={snackBarVisible}
                onDismiss={onDismissSnackBar}
                duration={10000}
                action={{
                  label: 'OK',
                  onPress: () => { hideSnackBar },
                }}>
                {CONGRATULATIONS}
              </Snackbar>
            }
          </Provider>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    color: 'black',
    fontFamily: 'FredokaOne_400Regular',
    fontSize: 25
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.95,
  },
  addBycicleLaneButton: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0
  },
});

