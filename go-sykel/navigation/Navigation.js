import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

//Screens
import BycicleLanesNavigation from "./BycicleLanesNavigation";
import RoutesNavigation from "./RoutesNavigation";
import Account from "./ProfileNavigation";
import Ranking from "../screens/Ranking";

import { Colors } from '../colors/Colors';

const Tab = createBottomTabNavigator();
const BYCICLE_LANES_LABEL = 'Carriles bici'
const ROUTES_LABEL = 'Rutas'
const RANKING_LABEL = 'Ranking'
const ACCOUNT_LABEL = 'Cuenta'
const GoSykelTabs = () => { 
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="BycicleLanesNavigation" component={BycicleLanesNavigation} 
                options={{ tabBarLabel: BYCICLE_LANES_LABEL, tabBarIcon: ({color, size}) => 
                ( <MaterialCommunityIcons name="road-variant" size={size} color={color} /> ), 
                tabBarActiveTintColor: 'black'}}/>
            <Tab.Screen name="RoutesNavigation" component={RoutesNavigation} 
                options={{ tabBarLabel: ROUTES_LABEL, tabBarIcon:  ({color, size}) => 
                (<MaterialCommunityIcons name="bike" size={size} color={color} />), 
                tabBarActiveTintColor: Colors.info}}/>
            <Tab.Screen name="Ranking" component={Ranking} 
                options={{ tabBarLabel: RANKING_LABEL, tabBarIcon: ({color, size}) => 
                (<Ionicons name="podium-sharp" size={size} color={color} /> ),
                tabBarActiveTintColor: Colors.gold}}/>
            <Tab.Screen name="Account" component={Account} 
                options={{ tabBarLabel: ACCOUNT_LABEL, tabBarIcon: ({color, size}) => 
                (<MaterialCommunityIcons name="account" size={size} color={color} /> ),
                tabBarActiveTintColor: Colors.primary}}/>
        </Tab.Navigator>
    );
}

export default function Navigation() {
    return (
        <GoSykelTabs />
    );
}