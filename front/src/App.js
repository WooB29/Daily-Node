import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";

import IndexPage from './pages/index';
import SignInPage from './pages/signin';
import SignUpPage from './pages/signup';
import HomePage from './pages/home';

const App = ({}) => {
    const Stack = createStackNavigator();
    const navigationRef = React.useRef(null);

    return(
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator>
                <Stack.Screen name='IndexPage' component={IndexPage} options={{headerShown: false}}/>
                <Stack.Screen name='SignInPage' component={SignInPage} options={{headerShown: false}}/>
                <Stack.Screen name='SignUpPage' component={SignUpPage} options={{headerShown: true}}/>
                <Stack.Screen name='HomePage' component={HomePage} options={{headerShown: true}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;