import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { Badge } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';

import { Colors } from '../colors/Colors';

const Podium = (props) => {
    return (
        <View>
            <View style={{ padding: 6 }}></View>
            <View style={styles.alignPodium}>
                <View style={[styles.podiumPosition, { justifyContent: 'flex-end' }]}>
                    <Image style={styles.secondPosition} source={{ uri: props.secondAvatar }} />
                    <Badge style={styles.secondPositionBadge} size={26}>2</Badge>
                    <Text style={styles.podiumName}>{props.secondNickname}</Text>
                    <Text style={styles.podiumNumber}>{props.secondPoints}</Text>
                </View>
                <View style={styles.podiumPosition}>
                    <FontAwesome5 name="crown" size={24} color={Colors.rankingGold} />
                    <Image style={styles.firstPosition} source={{ uri: props.firstAvatar }} />
                    <Badge style={styles.firstPositionBadge} size={28}>1</Badge>
                    <Text style={styles.podiumName}>{props.firstNickname}</Text>
                    <Text style={styles.podiumNumber}>{props.firstPoints}</Text>
                </View>
                <View style={[styles.podiumPosition, { justifyContent: 'flex-end' }]}>
                    <Image style={styles.thirdPosition} source={{ uri: props.thirdAvatar }} />
                    <Badge style={styles.thirdPositionBadge} size={24}>3</Badge>
                    <Text style={styles.podiumName}>{props.thirdNickname}</Text>
                    <Text style={styles.podiumNumber}>{props.thirdPoints}</Text>
                </View>
            </View>
        </View>
    )
};

export default Podium;
const styles = StyleSheet.create({
    firstPosition: {
        width: 170,
        height: 170,
        borderRadius: 85,
        borderWidth: 4,
        borderColor: Colors.rankingGold,
        alignSelf: 'center'
    },
    secondPosition: {
        width: 115,
        height: 115,
        borderRadius: 75,
        borderWidth: 4,
        borderColor: Colors.silver,
        alignSelf: 'center'
    },
    thirdPosition: {
        width: 90,
        height: 90,
        borderRadius: 75,
        borderWidth: 4,
        borderColor: Colors.bronze,
        alignSelf: 'center'
    },
    alignPodium: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignSelf: 'center'
    },
    firstPositionBadge: {
        backgroundColor: Colors.rankingGold,
        color: Colors.customBlack,
        alignSelf: 'center'
    },
    secondPositionBadge: {
        backgroundColor: Colors.silver,
        color: Colors.customBlack,
        alignSelf: 'center'
    },
    thirdPositionBadge: {
        backgroundColor: Colors.bronze,
        color: Colors.customBlack,
        alignSelf: 'center'
    },
    podiumPosition: {
        alignItems: 'center'
    },
    podiumName: {
        fontFamily: 'Poppins_300Light',
        color: 'black',
        fontSize: 15,
    },
    podiumNumber: {
        fontSize: 13,
        fontFamily: 'Poppins_300Light',
        color: Colors.primary
    }
})