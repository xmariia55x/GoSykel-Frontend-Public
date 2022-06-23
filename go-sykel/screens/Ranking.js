import React, { useState, useEffect } from 'react';
import { View, ScrollView, SafeAreaView, StyleSheet, ActivityIndicator, Text, Image } from 'react-native';
import { Appbar, Snackbar, Chip, Badge } from 'react-native-paper';

import { Colors } from '../colors/Colors';
import Podium from '../components/Podium';
import { useUser } from '../context/UserContext';
import { Constants } from '../constants/Constants';

const RANKING = 'Ranking de usuarios';
const YOUR_POSITION = 'Tu posición';
const HOW_RANKING_WORKS = '¿Cómo funciona?';
const POINTS = 'puntos';
const OTHER_USERS = 'Resto de usuarios';
const PODIUM_EXPLANATION = 'Los puntos se obtienen al realizar diferentes acciones dentro de la aplicación. Aquí se muestran los usuarios que han conseguido más puntos. Para conocer qué acciones te dan puntos, dirígete a Cuenta > Sobre GoSykel';
const ALERT_ERROR_MESSAGE = 'Se ha producido un fallo, ponte en contacto con los administradores de la aplicación.';
const LESS_THAN_3_USERS = 'No disponemos de suficientes usuarios para mostrar el ranking. ¡Trae a tus amigos y empezad a pedalear juntos!';
const Ranking = () => {
  const [loading, setLoading] = useState(true);
  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const [users, setUsers] = useState([])
  const [user, setCurrentUser] = useState(null);

  const { userId, token } = useUser();
  
  const onDismissSnackBar = () => setSnackBarVisible(false);
  const hideSnackBar = () => setSnackBarVisible(false);
  const showSnackBar = () => setSnackBarVisible(true);

  useEffect(() => {
    fetchRanking();
  }, []);

  const fetchRanking = () => {
    fetch(Constants.SERVER_URL + '/rankings', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
      }
    }).then((response) => response.json())
      .then((responseData) => {
        setUsers(responseData);

        const currentUser = responseData.filter(item => {
          const itemData = item._id;
          const userIdData = userId;
          return itemData === userIdData;
        })
        setCurrentUser(currentUser[0]);
      })
      .catch((error) => {
        console.log(error.message);
        alert(ALERT_ERROR_MESSAGE);
      })
      .finally(() => {
        setLoading(false)
      });

  };

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
            <Appbar.Header style={{ backgroundColor: 'white' }}>
              <Appbar.Content titleStyle={styles.title} title={RANKING} />
            </Appbar.Header>
            <ScrollView>
              <View style={{ padding: 6 }}></View>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 10 }}>
                <Chip mode='outlined' icon="information" onPress={() => showSnackBar()}>{HOW_RANKING_WORKS}</Chip>
              </View>
              {
                users.length >= 3 ?
                  <Podium firstAvatar={users[0].avatar}
                    secondAvatar={users[1].avatar}
                    thirdAvatar={users[2].avatar}
                    firstNickname={users[0].nickname}
                    secondNickname={users[1].nickname}
                    thirdNickname={users[2].nickname}
                    firstPoints={users[0].points} secondPoints={users[1].points} thirdPoints={users[2].points}></Podium>
                  :
                  <View>
                    <View style={{ padding: 6 }}></View>
                    <View style={styles.dashboardContent}>
                      <Text style={styles.notEnoughUsers}>{LESS_THAN_3_USERS}</Text>
                    </View>
                  </View>
              }


              <View style={{ padding: 10 }}></View>
              <View style={styles.dashboardContent}>
                <Text style={[styles.title, { fontSize: 20 }]}>{YOUR_POSITION}</Text>

                <View style={styles.card}>
                  <Image style={styles.positionImage} source={{ uri: user.avatar }} />
                  <View style={{ paddingLeft: 15 }}>
                    <Text style={styles.positionNickname}>{user.nickname}</Text>
                    <Text style={styles.positionNumber}>{user.points} {POINTS}</Text>
                  </View>
                  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <Badge style={styles.positionBadge} size={26}>{users.indexOf(user) + 1}</Badge>
                  </View>
                </View>
                {
                  users.length >= 4 ?
                    <View>
                      <View style={{ padding: 6 }}></View>
                      <Text style={[styles.title, { fontSize: 20 }]}>{OTHER_USERS}</Text>
                    </View>
                    :
                    <View>
                    </View>
                }

                {
                  users.length >= 4 ?
                    (users.slice(3, users.length).map((item, index) => {
                      return (
                        <View key={index} style={styles.lowerUserCard}>
                          <Image style={styles.lowerUserImage} source={{ uri: item.avatar }} />
                          <View style={{ paddingLeft: 15 }}>
                            <Text style={styles.lowerUserNickname}>{item.nickname}</Text>
                            <Text style={styles.lowerUserNumber}>{item.points} {POINTS}</Text>
                          </View>
                          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <Badge style={styles.lowerUserBadge} size={26}>{index + 4}</Badge>
                          </View>
                        </View>
                      )
                    })
                    ) : (
                      <>
                        <View>
                        </View>
                      </>
                    )
                }
              </View>
            </ScrollView>
            <Snackbar
              visible={snackBarVisible}
              onDismiss={onDismissSnackBar}
              duration={10000}
              action={{
                label: 'OK',
                onPress: () => { hideSnackBar },
              }}>
              {PODIUM_EXPLANATION}
            </Snackbar>
          </>
        )
      }

    </SafeAreaView>
  );
}

export default Ranking;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  title: {
    color: 'black',
    fontFamily: 'FredokaOne_400Regular',
    fontSize: 25,
  },
  dashboardContent: {
    marginLeft: 20,
    marginRight: 20
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

    marginTop: 20,
    backgroundColor: Colors.cyanLight,
    padding: 10,
    flexDirection: 'row',
    borderRadius: 30,
  },
  lowerUserCard: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginTop: 20,
    backgroundColor: Colors.lightGrey,
    padding: 10,
    flexDirection: 'row',
    borderRadius: 30,
  },
  positionImage: {
    width: 80,
    height: 80,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: Colors.customBlack,
    alignSelf: 'center',
  },
  lowerUserImage: {
    width: 60,
    height: 60,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: Colors.customBlack,
    alignSelf: 'center',
  },
  positionBadge: {
    backgroundColor: Colors.customBlack,
    color: 'white',
    alignSelf: 'center',
    fontSize: 15
  },
  lowerUserBadge: {
    backgroundColor: Colors.customBlack,
    color: 'white',
    alignSelf: 'center',
    fontSize: 13
  },
  positionNickname: {
    fontFamily: 'Poppins_300Light',
    color: 'black',
    fontSize: 18,
  },
  lowerUserNickname: {
    fontFamily: 'Poppins_300Light',
    color: 'black',
    fontSize: 15,
  },
  notEnoughUsers: {
    fontFamily: 'Poppins_300Light',
    color: 'black',
    fontSize: 14,
  },
  positionNumber: {
    fontSize: 15,
    fontFamily: 'Poppins_300Light',
    color: Colors.customBlack
  },
  lowerUserNumber: {
    fontSize: 13,
    fontFamily: 'Poppins_300Light',
    color: Colors.customBlack
  }
})