import React from "react";
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import Home from '../pages/home';
import Todo from '../pages/todo';
import Profile from "../pages/profile";


const Tab = createBottomTabNavigator();

const TabBarIcon = ({ focused, name, onPress }) => {
    return(
        <MaterialIcons
            name={name}
            size={26}
            color={focused ? 'blue' : '#aaa' }
            onPress={onPress}
        />
    );
};



const MainTab = ({navigation}) => {

    const _onPressAdd = () => {
        navigation.navigate('AddListPage');
    };

    return(
        <Tab.Navigator>
            <Tab.Screen
                name="home"
                component={Home}
                options={{
                    headerRight: () => 
                        TabBarIcon({
                            name: 'add',
                            onPress: _onPressAdd,
                        }),
                    tabBarIcon: ({ focused }) =>
                        TabBarIcon({
                            focused,
                            name: focused ? 'list' : 'list',
                        }),
                }}
            />
            <Tab.Screen
                name="todo"
                component={Todo}
                options={{
                    tabBarIcon: ({ focused }) =>
                        TabBarIcon({
                            focused,
                            name: focused ? 'done' : 'done-outline',
                        }),
                }}
            />
            <Tab.Screen
                name="profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ focused }) =>
                        TabBarIcon({
                            focused,
                            name: focused ? 'person' : 'person-outline',
                        }),
                }}
            />
        </Tab.Navigator>
    );
}
export default MainTab;