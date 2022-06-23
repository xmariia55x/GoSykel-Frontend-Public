import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from './screens/Welcome';
import Navigation from './navigation/Navigation';
import WelcomeNavigation from './navigation/WelcomeNavigation';
import { UserProvider } from './context/UserContext';
import { ItemProvider } from './context/ItemContext';
const Stack = createNativeStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="WelcomeNavigation" component={WelcomeNavigation} />
        <Stack.Screen name="Navigation" component={Navigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default() => 
<UserProvider>
  <ItemProvider>
    <App></App>
  </ItemProvider>
</UserProvider>