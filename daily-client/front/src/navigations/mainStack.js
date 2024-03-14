import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import MainTab from "./mainTab";
import Home from '../pages/home';
import Todo from '../pages/todo';
import Profile from "../pages/profile";

const Stack = createStackNavigator();

const MainStack = () => {
    return (
            <Stack.Navigator>
                <Stack.Screen name="MainTab" component={MainTab} options={{headerShown: false}}/>
                <Stack.Screen name="HomePage" component={Home} />
                <Stack.Screen name="TodoPage" component={Todo} />
                <Stack.Screen name="ProfilePage" component={Profile} />
            </Stack.Navigator>
       
    );
}

export default MainStack;