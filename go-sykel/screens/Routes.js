
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import { StyleSheet, SafeAreaView, ActivityIndicator, ScrollView, View } from 'react-native';
import { Appbar, FAB, Portal, Provider, Searchbar, Chip, Paragraph, Snackbar } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import AppLoading from 'expo-app-loading';
import { useFonts, FredokaOne_400Regular } from '@expo-google-fonts/fredoka-one';

import { Colors } from '../colors/Colors';
import { Constants } from '../constants/Constants';
import { useUser } from '../context/UserContext';
import RouteCard from '../components/RouteCard';

const ROUTES = 'Rutas';
const NEW_ROUTE = 'Nueva ruta';
const ALERT_ERROR_MESSAGE = 'Se ha producido un fallo, ponte en contacto con los administradores de la aplicación.';
const AUTHOR = 'Creador';
const ROUTE_NAME = 'Nombre de la ruta';
const PUBLIC_ROUTE = 'Rutas públicas';
const PRIVATE_ROUTE = 'Rutas privadas';
const FREQUENT_ROUTES = 'Rutas más frecuentes';
const MY_ROUTES = 'Mis rutas';
const SEARCH_BAR_PLACEHOLDER = 'Buscar rutas';
const NO_ROUTES_MATCHING = 'No hay rutas que cumplan los criterios establecidos. Prueba a introducir otros criterios.';
const NO_ROUTES = 'Aún no hay rutas registradas. ¡Sé el primero en registrar una y gana puntos!';
const RESTRICTED_ROUTE = 'Esta ruta es privada y no puedes acceder a ella';
let CONGRATULATIONS = "";
const Routes = ({ route }) => {
  const { previousScreen, points, userPoints, bonus } = route.params;

  const { userId, token } = useUser();

  const navigation = useNavigation()

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [authorChipSelected, setAuthorSelected] = useState(false);
  const [routeNameChipSelected, setRouteNameSelected] = useState(false);
  const [publicChipSelected, setPublicSelected] = useState(false);
  const [privateChipSelected, setPrivateSelected] = useState(false);
  const [frequencySelected, setFrequencySelected] = useState(false);
  const [myRoutesSelected, setMyRoutesSelected] = useState(false);
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

  const setTextAndSearch = (query) => {
    setSearchQuery(query);
    filterByRouteName(query)
  }
  const setAuthorChipSelected = () => {
    if (authorChipSelected) {
      setAuthorSelected(false)
    } else {
      setAuthorSelected(true)
    }
  }
  const setRouteNameChipSelected = () => {
    if (routeNameChipSelected) {
      setRouteNameSelected(false)
    } else {
      setRouteNameSelected(true)
    }
  }
  const setPublicChipSelected = () => {
    if (publicChipSelected) {
      setPublicSelected(false)
    } else {
      setPublicSelected(true)
    }
  }

  const setPrivateChipSelected = () => {
    if (privateChipSelected) {
      setPrivateSelected(false)
    } else {
      setPrivateSelected(true)
    }
  }

  const setFrequencyChipSelected = () => {
    if (frequencySelected) {
      setFrequencySelected(false)
    } else {
      setFrequencySelected(true)
    }
  }

  const setMyRoutesChipSelected = () => {
    if (myRoutesSelected) {
      setMyRoutesSelected(false)
    } else {
      setMyRoutesSelected(true)
    }
  }

  const addNewRoute = () => {
    navigation.replace("NewRoute")
  }

  let [fontsLoaded] = useFonts({
    FredokaOne_400Regular
  });
  
  useEffect(() => {
    fetchRoutes();
  }, []);

  const checkAccessToSeeRouteInformation = (item) => {
    if (item.private) {
      if (item.author_id == userId) {
        navigation.replace("RouteInformation", { selectedRoute: item })
      } else {
        alert(RESTRICTED_ROUTE)
      }
    } else {
      navigation.replace("RouteInformation", { selectedRoute: item })
    }
  }
  const fetchRoutes = () => {
    fetch(Constants.SERVER_URL + '/routes', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
      }
    }).then((response) => response.json())
      .then((responseData) => {
        setData(responseData);
        setFilteredData(responseData);
      })
      .catch((error) => {
        console.log(error.message);
        alert(ALERT_ERROR_MESSAGE);
      })
      .finally(() => {
        setLoading(false)
        console.log(previousScreen)
        if (previousScreen !== undefined && previousScreen == "NewRoute"){
          if (points > 0 && userPoints > 0){
            CONGRATULATIONS = "¡Enhorabuena! 🤗 Has ganado " + points + " puntos por crear una nueva ruta. 🤩 Ahora mismo tienes " + userPoints + " puntos. 👏";
            showSnackBar()
          }
        }
        if (previousScreen !== undefined && previousScreen == "DoRoute"){
          if (points > 0 && userPoints > 0 && bonus == 0){
            CONGRATULATIONS = "🎉 ¡Enhorabuena! 🤗 Has ganado " + points + " puntos por realizar una ruta. 🥳 Ahora tienes " + userPoints + " puntos. 🎉";
            showSnackBar()
          } 
          if (points > 0 && userPoints > 0 && bonus > 0){
            CONGRATULATIONS = "🎉 ¡Enhorabuena! 🤗 Has ganado " + points + " puntos por realizar una ruta. ¡BONUS! 🚀 Acabas de conseguir " + bonus +  
            " puntos extra por realizar esta ruta frecuentemente. 🥳 Ahora tienes " + userPoints + " puntos. 🎉 " ;
            showSnackBar()
          } 
        }
      });

  };

  const filterByRouteName = (text) => {
    if (text && routeNameChipSelected) {
      const newData = data.filter(item => {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      })
      setFilteredData(newData);
    } else if (text && authorChipSelected) {
      const newData = data.filter(item => {
        const itemData = item.author ? item.author.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      })
      setFilteredData(newData);
    } else {
      setFilteredData(data);
    }

  }

  const filterMyRoutes = () => {
    setMyRoutesChipSelected()
    if (!myRoutesSelected) {
      const newData = data.filter(item => {
        const itemData = item.author_id ? item.author_id.toUpperCase() : ''.toUpperCase();
        const userIdData = userId.toUpperCase();
        return itemData.indexOf(userIdData) > -1;
      })
      setFilteredData(newData);
    } else {
      setFilteredData(data);
    }
  }

  const filterPublicRoutes = () => {
    setPublicChipSelected()
    if (!publicChipSelected) {
      const newData = data.filter(item => {
        return item.private == false;
      })
      setFilteredData(newData);
    } else {
      setFilteredData(data);
    }
  }

  const filterPrivateRoutes = () => {
    setPrivateChipSelected()
    if (!privateChipSelected) {
      const newData = data.filter(item => {
        return item.private == true;
      })
      setFilteredData(newData);
    } else {
      setFilteredData(data);
    }
  }

  const filterFrequentRoutes = () => {
    setFrequencyChipSelected()
    if (!frequencySelected) {
      const filteredData = Object.create(data);
      const newData = filteredData.sort((a, b) => b.frequency - a.frequency);
      setFilteredData(newData);
    } else {
      setFilteredData(data);
    }
  }

  const renderNoDataMessage = () => {
    if (data.length == 0) {
      return (
        <View style={styles.noRoutesContainer}>
          <MaterialIcons name="error-outline" size={40} color={Colors.error} />
          <Paragraph style={styles.noRoutesParagraph}>{NO_ROUTES}</Paragraph>
        </View>
      );
    }
  }


  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <SafeAreaView style={styles.container}>

      {loading ? (
        <ActivityIndicator
          visible={loading}
          size="large"
          color='black'
        />
      ) : (
        <>
          <Appbar.Header style={{ backgroundColor: 'white' }}>
            <Appbar.Content titleStyle={styles.title} title={ROUTES} />
          </Appbar.Header>
          <Searchbar
            placeholder={SEARCH_BAR_PLACEHOLDER}
            onChangeText={text => setTextAndSearch(text)}
            value={searchQuery}
          />
          <View style={styles.chipsContainer}>
            <Chip mode='outlined' style={{
              marginTop: 8, marginHorizontal: "1%", marginBottom: 6,
              backgroundColor: authorChipSelected ? Colors.primary : 'white'
            }}
              icon="account-outline" onPress={setAuthorChipSelected} selected={authorChipSelected}>{AUTHOR}</Chip>

            <Chip mode='outlined' style={{
              marginTop: 8, marginHorizontal: "1%", marginBottom: 6,
              backgroundColor: routeNameChipSelected ? Colors.primary : 'white'
            }}
              icon="pencil-outline" onPress={setRouteNameChipSelected} selected={routeNameChipSelected}>{ROUTE_NAME}</Chip>

            <Chip mode='outlined' style={{
              marginTop: 8, marginHorizontal: "1%", marginBottom: 6,
              backgroundColor: myRoutesSelected ? Colors.primary : 'white'
            }}
              icon="account-check-outline" onPress={filterMyRoutes} selected={myRoutesSelected}>{MY_ROUTES}</Chip>

            <Chip mode='outlined' style={{
              marginTop: 8, marginHorizontal: "1%", marginBottom: 6,
              backgroundColor: publicChipSelected ? Colors.primary : 'white'
            }}
              icon="eye-outline" onPress={filterPublicRoutes} selected={publicChipSelected}>{PUBLIC_ROUTE}</Chip>

            <Chip mode='outlined' style={{
              marginTop: 8, marginHorizontal: "1%", marginBottom: 6,
              backgroundColor: privateChipSelected ? Colors.primary : 'white'
            }}
              icon="eye-off-outline" onPress={filterPrivateRoutes} selected={privateChipSelected}>{PRIVATE_ROUTE}</Chip>

            <Chip mode='outlined' style={{
              marginTop: 8, marginHorizontal: "1%", marginBottom: 6,
              backgroundColor: frequencySelected ? Colors.primary : 'white'
            }}
              icon="podium" onPress={filterFrequentRoutes} selected={frequencySelected}>{FREQUENT_ROUTES}</Chip>

          </View>

          <ScrollView>
            {
              filteredData.length > 0 ?
                (filteredData.map((item, index) => {
                  return (
                    <View key={index} style={styles.itemContainer}>
                      <RouteCard name={item.name} private={item.private} author={item.author}
                        distance={item.distance} date={item.date} rate={item.rate} onPress={() => checkAccessToSeeRouteInformation(item)} 
                        editable={false} onEditRoutePress={() => {}} deletable={false} onDeleteRoutePress={() => {}} />
                    </View>
                  )
                })
                ) : (
                  <>
                    {data.length > 0 ? (
                      <View style={styles.noRoutesContainer}>
                        <MaterialIcons name="error-outline" size={40} color={Colors.error} />
                        <Paragraph style={styles.noRoutesParagraph}>{NO_ROUTES_MATCHING}</Paragraph>
                      </View>
                    ) : (
                      <>
                      </>
                    )}
                  </>
                )

            }
            {renderNoDataMessage()}
          </ScrollView>

          <Provider>
            <Portal>
              <FAB
                style={styles.addRouteButton}
                visible={visibleFAB}
                icon="plus"
                label={NEW_ROUTE}
                color='white'
                onPress={addNewRoute}
                theme={{ colors: { accent: Colors.info } }}
              />
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
            </Portal>
          </Provider>
        </>
      )}
    </SafeAreaView>
  );
}

export default Routes;

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
  addRouteButton: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  itemContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  noRoutesContainer: {
    margin: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  noRoutesParagraph: {
    fontFamily: 'Poppins_300Light',
    color: Colors.error,
    fontSize: 14,
    paddingLeft: 5
  }
});