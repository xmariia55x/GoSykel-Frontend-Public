import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screens
import Profile from "../screens/Profile";
import Store from "../screens/Store";
import AccountManagement from "../screens/Account";
import EditProfile from "../screens/EditProfile";
import UserRoutes from "../screens/UserRoutes";
import ItemInformation from '../screens/ItemInformation';
import About from '../screens/About';

const Stack = createNativeStackNavigator();

const ProfileNavigation = () => { 
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="AccountManagement" component={AccountManagement} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Store" component={Store} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="UserRoutes" component={UserRoutes} />
            <Stack.Screen name="ItemInformation" component={ItemInformation} />
            <Stack.Screen name="About" component={About} />
        </Stack.Navigator>

    );
}

export default ProfileNavigation