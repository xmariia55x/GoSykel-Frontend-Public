import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screens
import Routes from "../screens/Routes";
import NewRoute from "../screens/NewRoute";
import RouteInformation from '../screens/RouteInformation';
import ProfileInformation from '../screens/GenericProfile';
import DoRoute from "../screens/DoRoute";
import EditRoute from "../screens/EditRoute";

const Stack = createNativeStackNavigator();

const RoutesNavigation = () => { 
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Routes" component={Routes} initialParams={{ previousScreen: "", points: 0, userPoints: 0 }} />
            <Stack.Screen name="NewRoute" component={NewRoute} />
            <Stack.Screen name="RouteInformation" component={RouteInformation} />
            <Stack.Screen name="ProfileInformation" component={ProfileInformation} />
            <Stack.Screen name="DoRoute" component={DoRoute} />
            <Stack.Screen name="EditRoute" component={EditRoute} />
        </Stack.Navigator>
    );
}

export default RoutesNavigation