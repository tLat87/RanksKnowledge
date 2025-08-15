
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, View, StyleSheet, Text } from 'react-native';
import WelcomeScreen1 from "./src/screens/WelcomeScreen1.tsx";
import BottomTabsS from "./src/navigation/BottomTabsS";
import DetailsScreen from "./src/screens/DetailsScreen.tsx";
import CreateNoteScreen from "./src/screens/CreateNoteScreen.tsx";
import NoteDetailsScreen from "./src/screens/NoteDetailsScreen.tsx";
import ResultScreen from "./src/screens/ResultScreen.tsx";
import QuizScreen from "./src/screens/QuizScreen.tsx";
import AboutScreen from "./src/screens/AboutScreen";




const Stack = createStackNavigator();

export type RootStackParamList = {
    Home: undefined;
    Details: {
        id: string;
        title: string;
        description: string;
        tag: string;
    };
};

function AppContent() {

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="WelcomeScreen1"
                component={WelcomeScreen1}

            />
            <Stack.Screen
                name="BottomTabsS"
                component={BottomTabsS}

            />
            <Stack.Screen name="Details" component={DetailsScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="CreateNoteScreen" component={CreateNoteScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="NoteDetailsScreen" component={NoteDetailsScreen} />



            <Stack.Screen name="Quiz" component={QuizScreen} />
            <Stack.Screen name="Result" component={ResultScreen} />
            <Stack.Screen name="AboutScreen" component={AboutScreen} />

        </Stack.Navigator>
    );
}

export default function App() {
    return (
            <NavigationContainer>
                <AppContent />
            </NavigationContainer>

    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1a1a1a',
    },
    loadingText: {
        marginTop: 10,
        color: '#FFD700',
        fontSize: 18,
    },
});
