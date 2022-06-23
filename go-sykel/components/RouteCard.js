import { StyleSheet, View, Dimensions } from 'react-native';
import { Button, Card, Paragraph, Badge } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';

import { Colors } from '../colors/Colors';

const SEE_ROUTE = 'Ver ruta';
const EDIT_ROUTE = 'Editar ruta';
const DELETE_ROUTE = 'Eliminar ruta';
const PRIVATE_ROUTE_LABEL = 'Ruta privada';
const PUBLIC_ROUTE_LABEL = 'Ruta pública';
const DISTANCE_LABEL = 'Distancia aprox (m)';
const DATE_LABEL = 'Fecha';
const RATE_LABEL = 'Valoración';

const RouteCard = (props) => {
    const LeftContent = () => <FontAwesome5 name="route" size={24} color="black" />
    return (
        <Card mode='outlined' style={styles.card}>
            <Card.Title title={props.name} titleStyle={styles.cardTitleStyle} subtitle={props.private ? PRIVATE_ROUTE_LABEL : PUBLIC_ROUTE_LABEL}
                subtitleStyle={styles.cardSubtitleStyle} left={LeftContent} />
            <Card.Content>
                <Badge style={styles.badgeColor} size={22}>{props.author}</Badge>
                <View style={styles.alignInformation}>
                    <View style={styles.alignElement}>
                        <Paragraph style={[styles.paragraph, styles.colorParagraph]}>{DISTANCE_LABEL}</Paragraph>
                        <Paragraph style={styles.paragraph}>{Math.round((props.distance + Number.EPSILON) * 1000) / 1000}</Paragraph>
                    </View>
                    <View style={styles.alignElement}>
                        <Paragraph style={[styles.paragraph, styles.colorParagraph]}>{DATE_LABEL}</Paragraph>
                        <Paragraph style={styles.paragraph}>{props.date}</Paragraph>
                    </View>
                    <View style={styles.alignElement}>
                        <Paragraph style={[styles.paragraph, styles.colorParagraph]}>{RATE_LABEL}</Paragraph>
                        <Paragraph style={styles.paragraph}>{props.rate}</Paragraph>
                    </View>
                </View>
            </Card.Content>
            <Card.Actions>
                <Button mode="contained" color={Colors.primary} labelStyle={{ color: 'white' }}
                    onPress={props.onPress}>{SEE_ROUTE}</Button>
                {
                    props.editable ?
                        <Button mode="contained" color={Colors.secondary} labelStyle={{ color: 'white' }}
                            onPress={props.onEditRoutePress} style={{ position: 'absolute', right: 0, marginRight: 10 }}>{EDIT_ROUTE}</Button>
                        :
                        <View></View>
                }

                {
                    props.deletable ?
                        <Button mode="contained" color={Colors.error} labelStyle={{ color: 'white' }}
                            onPress={props.onDeleteRoutePress} style={{ position: 'absolute', right: 0, marginRight: 10 }}>{DELETE_ROUTE}</Button>
                        :
                        <View></View>
                }
            </Card.Actions>
        </Card>
    )
}

export default RouteCard

const styles = StyleSheet.create({
    card: {
        width: Dimensions.get('window').width
    },
    cardTitleStyle: {
        fontFamily: 'Poppins_300Light',
        color: 'black',
        fontSize: 17
    },
    cardSubtitleStyle: {
        fontFamily: 'Poppins_300Light',
        color: 'grey',
        fontSize: 13
    },
    badgeColor: {
        backgroundColor: Colors.customBlack,
        color: 'white'
    },
    alignInformation: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    alignElement: {
        alignItems: 'center',
    },
    paragraph: {
        fontFamily: 'Poppins_300Light',
        color: 'black',
        fontSize: 14,
    },
    colorParagraph: {
        color: Colors.info
    },
});