
import React, { useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Image, Dimensions } from 'react-native';

import AppLoading from 'expo-app-loading';
import { useFonts, Poppins_300Light } from '@expo-google-fonts/poppins';

import { Colors } from '../colors/Colors';
import { useItem } from '../context/ItemContext';

const windowWidth = Dimensions.get('window').width;
const RadioButtonList = (props) => {
	const [state, setState] = useState({ value: null })

	const { list, type } = props;
	const { setItemId } = useItem();
	let [fontsLoaded] = useFonts({
		Poppins_300Light
	});
	if (!fontsLoaded) {
		return <AppLoading />;
	}
	return (
		<View>
			{list.map(res => {
				return (
					<View key={res.key} >
						<View style={styles.container}>
							<Text style={styles.radioText}>{res.text}</Text>
							<TouchableOpacity
								style={styles.radioCircle}
								onPress={() => {
									setState({
										value: res.key,
									});
									setItemId(res.key, type)
								}}>
								{state.value === res.key && <View style={styles.selectedRadioButton} />}
							</TouchableOpacity>
						</View>

						<View>
							<Image style={styles.image} source={{ uri: res.picture }} />
						</View>
					</View>
				);
			})}
		</View>
	);

}
export default RadioButtonList
const styles = StyleSheet.create({
	container: {
		marginBottom: 35,
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	radioText: {
		marginRight: 35,
		fontSize: 15,
		color: 'black',
		fontFamily: 'Poppins_300Light'
	},
	radioCircle: {
		height: 30,
		width: 30,
		borderRadius: 100,
		borderWidth: 2,
		borderColor: Colors.primary,
		alignItems: 'center',
		justifyContent: 'center',
	},
	selectedRadioButton: {
		width: 15,
		height: 15,
		borderRadius: 50,
		backgroundColor: Colors.primary,
	},
	image: {
		resizeMode: "contain",
		marginRight: 10,
		width: windowWidth*0.9,
		height: 150,
		borderColor: "white"
	},
});
