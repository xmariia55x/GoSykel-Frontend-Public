import { View, Text, StyleSheet } from 'react-native';

import { Colors } from '../colors/Colors';

const COMPLETED_ROUTES_LABEL = "Rutas completadas";
const POINTS_LABEL = "Puntos conseguidos";
const RANKING = 'Ranking';
const ProfileInformation = ({ completedRoutesNumber, points, ranking }) => {
    return (
        <View>
            <View style={{ padding: 20, flexDirection: 'row', backgroundColor: 'white', justifyContent: 'space-between' }}>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.title}>{COMPLETED_ROUTES_LABEL}</Text>
                    <Text style={styles.number}>{completedRoutesNumber}</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.title}>{POINTS_LABEL}</Text>
                    <Text style={styles.number}>{points}</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', backgroundColor: 'white', justifyContent: 'center' }}>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.title}>{RANKING}</Text>
                    <Text style={styles.number}>{ranking}</Text>
                </View>
            </View>
        </View>
    )
}

export default ProfileInformation

const styles = StyleSheet.create({
    title: {
        fontSize: 15,
        color: Colors.primary,
        fontFamily: 'Poppins_300Light',
    },
    number: {
        fontSize: 15,
        fontFamily: 'Poppins_300Light',
    }
});