import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screens
import BycicleLanes from "../screens/BycicleLanes";
import NewBycicleLane from "../screens/NewBycicleLane";

const Stack = createNativeStackNavigator();

const BycicleLanesNavigation = () => { 
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="BycicleLanes" component={BycicleLanes} initialParams={{ previousScreen: "", bycicleLanePoints: 0, bycicleLaneUserPoints: 0 }}/>
            <Stack.Screen name="NewBycicleLane" component={NewBycicleLane} />
        </Stack.Navigator>

    );
}

export default BycicleLanesNavigation