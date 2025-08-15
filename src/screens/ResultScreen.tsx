import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    SafeAreaView,
    Platform,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function ResultScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { score, totalQuestions } = route.params as { score: number; totalQuestions: number };
    const success = score >= totalQuestions / 2;

    return (
        <ImageBackground
            source={require('../assets/img/fe5c1588f8beaa6ebc38b188f34f32e341bdb981.png')} // Ваше фоновое изображение
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.container}>
                {success ? (
                    <>
                        <Text style={styles.title}>🏅 You are a Naval Expert!</Text>
                        <Text style={styles.subtitle}>You scored {score} out of {totalQuestions}</Text>
                    </>
                ) : (
                    <>
                        <Text style={styles.title}>⚓ Try again, Cadet!</Text>
                        <Text style={styles.subtitle}>You scored {score} out of {totalQuestions}</Text>
                    </>
                )}
                <TouchableOpacity
                    style={styles.btn}
                    activeOpacity={0.9}
                    onPress={() => navigation.pop(2)}
                >
                    <Text style={styles.btnText}>Play Again</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </ImageBackground>
    );
}

const BLUE_BG = '#021B44';
const YELLOW = '#FFD100';
const LIGHT_BLUE_TEXT = '#a7b9e8';

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        backgroundColor: 'rgba(2, 27, 68, 0.7)', // Полупрозрачный фон для контейнера
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        paddingTop: Platform.OS === 'android' ? 25 : 0,
    },
    title: {
        fontSize: 32,
        color: '#fff',
        fontWeight: '900',
        marginBottom: 10,
        textAlign: "center",
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
        letterSpacing: 2,
    },
    subtitle: {
        color: LIGHT_BLUE_TEXT,
        fontSize: 18,
        marginBottom: 40, // Увеличенный отступ
        textAlign: "center",
    },
    btn: {
        backgroundColor: '#0a56ff', // Яркий синий, как на других кнопках
        paddingVertical: 18,
        paddingHorizontal: 50,
        borderRadius: 30, // Более закругленные углы
        marginTop: 20,
        ...Platform.select({
            ios: {
                shadowColor: '#0050ff', // Тень под кнопкой
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.8,
                shadowRadius: 15,
            },
            android: {
                elevation: 10, // Тень для Android
            },
        }),
    },
    btnText: {
        color: '#fff',
        fontWeight: '900', // Очень жирный шрифт
        fontSize: 20,
        letterSpacing: 2, // Увеличенный межбуквенный интервал
    },
});
