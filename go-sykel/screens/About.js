import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import { Title, Card, List } from 'react-native-paper';

import { Colors } from '../colors/Colors';

const RANDOM_TEXT = 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).';

const ABOUT_GOSYKEL = 'Sobre GoSykel';
const NUMBER_OF_LINES = 70;
const GOSYKEL_ORIGIN_QUESTION = '¿Cómo surge GoSykel?';
const GOSYKEL_ORIGIN_ANSWER = 'GoSykel es el resultado del Trabajo Fin de Grado de la alumna María Gálvez Manceras del grado en Ingeniería del Software en la Universidad de Málaga.';
const GOSYKEL_NAME_QUESTION = '¿De dónde viene el nombre de GoSykel?';
const GOSYKEL_NAME_ANSWER = 'El nombre de GoSykel es una combinación de dos palabras, concretamente: Go (ir, en inglés) y Sykkel (bicicleta, en noruego). Sí, Sykel no es la forma correcta de escribir bicicleta en noruego, pero ¡no pasa nada!';
const GOSYKEL_GENERAL_VISION_QUESTION = '¿Qué puedo hacer en GoSykel?';
const GOSYKEL_GENERAL_VISION_ANSWER = 'GoSykel es una aplicación móvil donde los usuarios pueden registrar rutas que han realizado con sus bicicletas, realizar rutas que otros usuarios han registrado, visualizar los carriles bici disponibles en Málaga capital y añadir nuevos carriles bici si crees que alguno no ha sido registrado aún.'
const GOSYKEL_REQUIREMENTS_QUESTION = '¿Cuáles son las funcionalidades disponibles en esta versión?'
const GOSYKEL_REQUIREMENTS_ANSWER = [
    "Gestionar tu cuenta: crear una cuenta, iniciar sesión, cambiar tu contraseña si la has olvidado, ver y editar tu perfil o eliminarlo.",
    "Añadir nuevas rutas para realizar en bicicleta.",
    "Editar la información de las rutas que has añadido.",
    "Eliminar rutas que has añadido. En este caso, las rutas pasarán a ser propiedad del sistema, desvinculándolas de tu cuenta y haciéndolas públicas para que cualquier usuario pueda realizarla.",
    "Realizar las rutas creadas por otros usuarios.",
    "Visualizar la información de una ruta, donde podrás ver los usuarios más rápidos, el tiempo que han tardado los diferentes usuarios así como la valoración de la ruta.",
    "Filtrar las rutas según diferentes criterios, creador de la ruta, nombre de la ruta, obtener las rutas más frecuentes o visualizar únicamente las rutas públicas o privadas.",
    "Ver el perfil de otro usuario y consultar la información relevante de dicho usuario.",
    "A tu disposición hemos puesto un ranking de usuarios donde podrás ver quiénes son los usuarios que tienen más puntos y tu posición en el ranking de usuarios.",
    "Puedes consultar los carriles bici disponibles en Málaga capital.",
    "También es posible añadir tramos de carriles bici que no estuvieran registrados anteriormente.",
    "En GoSykel premiamos a los usuarios que utilizan su bicicleta para reducir la contaminación de las ciudades, y por ello te damos puntos por realizar diferentes acciones. ¡Sigue leyendo en las siguientes secciones!",
    "Para canjear tus puntos y tener el perfil más molón de todos los usuarios, hemos puesto a tu disposición una tienda donde puedes ampliar tu colección de avatares, insignias y encabezados. En la tienda podrás canjear tus puntos disponibles, conservando tu puntuación global sin bajar posiciones en el ranking."
]
const GOSYKEL_POINTS_QUESTION = '¿Cómo puedo conseguir puntos?';
const GOSYKEL_POINTS_REQUIREMENTS = [
    "Registrándote en GoSykel.",
    "Iniciando sesión diariamente, por cada día consecutivo iniciando sesión ¡obtendrás más puntos!",
    "Registrando nuevas rutas.",
    "Realizando rutas.",
    "Si realizas una ruta frecuentemente ¡también obtendrás puntos!",
    "Registrando nuevos tramos de carriles bici."
]


const About = () => {
    const navigation = useNavigation()

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <ScrollView>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <IconButton
                            icon="arrow-left"
                            color='black'
                            size={30}
                            onPress={() => navigation.replace("AccountManagement")}
                        />
                        <Title style={styles.title}>{ABOUT_GOSYKEL}</Title>
                    </View>
                    <View>
                        <Card.Title
                            title={GOSYKEL_ORIGIN_QUESTION}
                            titleStyle={styles.question}
                            titleNumberOfLines={NUMBER_OF_LINES}
                        />
                        <Card.Title
                            subtitle={GOSYKEL_ORIGIN_ANSWER}
                            subtitleStyle={styles.subtitle}
                            subtitleNumberOfLines={NUMBER_OF_LINES}
                        />
                        <Card.Title
                            title={GOSYKEL_NAME_QUESTION}
                            titleStyle={styles.question}
                            titleNumberOfLines={NUMBER_OF_LINES}
                        />
                        <Card.Title
                            subtitle={GOSYKEL_NAME_ANSWER}
                            subtitleStyle={styles.subtitle}
                            subtitleNumberOfLines={NUMBER_OF_LINES}
                        />
                        <Card.Title
                            title={GOSYKEL_GENERAL_VISION_QUESTION}
                            titleStyle={styles.question}
                            titleNumberOfLines={NUMBER_OF_LINES}
                        />
                        <Card.Title
                            subtitle={GOSYKEL_GENERAL_VISION_ANSWER}
                            subtitleStyle={styles.subtitle}
                            subtitleNumberOfLines={NUMBER_OF_LINES}
                        />
                        <Card.Title
                            title={GOSYKEL_REQUIREMENTS_QUESTION}
                            titleStyle={styles.question}
                            titleNumberOfLines={NUMBER_OF_LINES}
                        />
                        {GOSYKEL_REQUIREMENTS_ANSWER.map((res, key) => {
                            return (
                                <List.Item
                                    key={key}
                                    title={res}
                                    titleNumberOfLines={NUMBER_OF_LINES}
                                    left={props => <List.Icon {...props} icon="checkbox-marked-outline" color={Colors.success}/>}
                                    titleStyle={[styles.subtitle, {paddingTop: 0}]} 
                                />

                            );
                        })}
                        <Card.Title
                            title={GOSYKEL_POINTS_QUESTION}
                            titleStyle={styles.question}
                            titleNumberOfLines={NUMBER_OF_LINES}
                        />
                        {GOSYKEL_POINTS_REQUIREMENTS.map((res, key) => {
                            return (
                                <List.Item
                                    key={key}
                                    title={res}
                                    titleNumberOfLines={NUMBER_OF_LINES}
                                    left={props => <List.Icon {...props} icon="heart" color={Colors.accent}/>}
                                    titleStyle={[styles.subtitle, {paddingTop: 0}]} 
                                />

                            );
                        })}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );

}
export default About;
const styles = StyleSheet.create({
    title: {
        color: 'black',
        fontFamily: 'FredokaOne_400Regular',
        fontSize: 25,
    },
    question: {
        color: 'black',
        fontFamily: 'FredokaOne_400Regular',
        fontSize: 18,
    },
    subtitle: {
        color: 'black',
        fontFamily: 'Poppins_300Light',
        fontSize: 15,
        paddingTop: 10
    }
});
