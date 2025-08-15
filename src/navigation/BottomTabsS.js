import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, Platform, View } from 'react-native';

// Screens
import HomeScreen from '../screens/HomeScreen';
import MyNotesScreen from '../screens/MyNotesScreen';
import StartScreen from '../screens/StartScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

const TAB_CONFIG = [
    {
        name: 'Home',
        component: HomeScreen,
        icon: require('../assets/img/Ranks/Vector.png'),
    },
    {
        name: 'MyNotesScreen',
        component: MyNotesScreen,
        icon: require('../assets/img/Ranks/Vector-1.png'),
    },
    {
        name: 'StartScreen',
        component: StartScreen,
        icon: require('../assets/img/Ranks/Vector-2.png'),
    },
    {
        name: 'SettingsScreen',
        component: SettingsScreen,
        icon: require('../assets/img/Ranks/Vector-3.png'),
    },
];

export default function BottomTabsS() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBarStyle,
                tabBarHideOnKeyboard: true,
            }}
        >
            {TAB_CONFIG.map(({ name, component, icon }) => (
                <Tab.Screen
                    key={name}
                    name={name}
                    component={component}
                    options={{
                        tabBarIcon: ({ focused }) => {
                            const tintColor = focused ? '#FFD700' : '#FFFFFF';
                            return (
                                <View style={[styles.tabIconContainer, focused && styles.tabIconContainerActive]}>
                                    <Image
                                        source={icon}
                                        resizeMode="contain"
                                        style={{ tintColor, width: 25, height: 25 }}
                                    />
                                </View>
                            );
                        },
                    }}
                />
            ))}
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabBarStyle: {
        position: 'absolute',
        bottom: 25,
        left: 20,
        right: 20,
        backgroundColor: 'rgba(0, 26, 74, 0.8)',
        borderRadius: 25,
        height: 65,
        borderTopWidth: 0,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.25,
                shadowRadius: 10,
            },
            android: {
                elevation: 15,
            },
        }),
    },
    tabIconContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 60,
    },
    tabIconContainerActive: {
        borderBottomWidth: 3,
        borderColor: '#FFD700',
    },
});
