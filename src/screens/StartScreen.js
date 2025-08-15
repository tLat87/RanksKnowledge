import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    SafeAreaView,
    Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function StartScreen() {
    const navigation = useNavigation();
    const [selected, setSelected] = useState(10);
    const options = [5, 10, 15, 20];

    return (
        <ImageBackground
            source={require('../assets/img/fe5c1588f8beaa6ebc38b188f34f32e341bdb981.png')} // Добавьте ваше фоновое изображение
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>QUIZZES</Text>
                <Text style={styles.subtitle}>Test your knowledge of naval ranks, terms, and structures</Text>
                <Text style={styles.questionText}>Choose how many questions you want to answer</Text>

                <View style={styles.row}>
                    {options.map(num => (
                        <TouchableOpacity
                            key={num}
                            style={[styles.numberBtn, selected === num && styles.activeBtn]}
                            onPress={() => setSelected(num)}
                            activeOpacity={0.8}
                        >
                            <Text
                                style={[
                                    styles.numberText,
                                    selected === num && styles.activeNumberText,
                                ]}
                            >
                                {num}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity
                    style={styles.startBtn}
                    activeOpacity={0.9}
                    onPress={() => navigation.navigate("Quiz", { totalQuestions: selected })}
                >
                    <Text style={styles.startText}>START</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </ImageBackground>
    );
}

const BLUE_BG = '#021B44';
const YELLOW = '#FFD100';
const LIGHT_BLUE_TEXT = '#a7b9e8';
const BUTTON_BG = 'rgba(8, 44, 102, 0.8)';
const ACTIVE_BUTTON_BG = YELLOW;

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        backgroundColor: 'rgba(2, 27, 68, 0.7)',
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    title: {
        fontSize: 32,
        color: '#fff',
        fontWeight: '900',
        marginBottom: 10,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
        letterSpacing: 2,
    },
    subtitle: {
        color: LIGHT_BLUE_TEXT,
        textAlign: "center",
        fontSize: 16,
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    questionText: {
        color: '#fff',
        textAlign: "center",
        fontSize: 18,
        fontWeight: '700',
        marginTop: 20,
    },
    row: {
        flexDirection: "row",
        marginVertical: 30,
        justifyContent: 'center',
    },
    numberBtn: {
        backgroundColor: BUTTON_BG,
        paddingVertical: 18,
        paddingHorizontal: 25,
        marginHorizontal: 8,
        borderRadius: 15,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 5,
            },
            android: {
                elevation: 7,
            },
        }),
    },
    activeBtn: {
        backgroundColor: ACTIVE_BUTTON_BG,
        ...Platform.select({
            ios: {
                shadowColor: ACTIVE_BUTTON_BG,
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.6,
                shadowRadius: 8,
            },
            android: {
                elevation: 10,
            },
        }),
    },
    numberText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '800',
    },
    activeNumberText: {
        color: BLUE_BG,
    },
    startBtn: {
        backgroundColor: '#0a56ff',
        paddingVertical: 18,
        paddingHorizontal: 50,
        borderRadius: 30,
        marginTop: 20,
        ...Platform.select({
            ios: {
                shadowColor: '#0050ff',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.8,
                shadowRadius: 15,
            },
            android: {
                elevation: 10,
            },
        }),
    },
    startText: {
        color: '#fff',
        fontWeight: '900',
        fontSize: 20,
        letterSpacing: 2,
    },
});
