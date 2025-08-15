import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    SafeAreaView,
    Platform,
    LayoutAnimation,
    UIManager,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { questionsData } from "../questions";

// Включаем LayoutAnimation для Android
if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function QuizScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { totalQuestions } = route.params as { totalQuestions: number };
    const [shuffled, setShuffled] = useState([]);

    useEffect(() => {
        const newShuffled = [...questionsData].sort(() => 0.5 - Math.random()).slice(0, totalQuestions);
        setShuffled(newShuffled);
    }, [totalQuestions]);

    const [current, setCurrent] = useState(0);
    const [score, setScore] = useState(0);
    const [selected, setSelected] = useState<number | null>(null);
    const [answered, setAnswered] = useState(false);

    if (shuffled.length === 0) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading questions...</Text>
            </View>
        );
    }

    const handleAnswer = (index: number) => {
        if (answered) return;
        setSelected(index);
        setAnswered(true);

        const isCorrect = index === shuffled[current].correctIndex;
        if (isCorrect) {
            setScore(score + 1);
        }

        LayoutAnimation.easeInEaseOut();

        setTimeout(() => {
            if (current + 1 < totalQuestions) {
                setCurrent(current + 1);
                setSelected(null);
                setAnswered(false);
            } else {
                navigation.navigate("Result", { score: isCorrect ? score + 1 : score, totalQuestions });
            }
        }, 1200); // Увеличено время для более плавной анимации и восприятия
    };

    const currentQuestion = shuffled[current];

    return (
        <ImageBackground
            source={require('../assets/img/fe5c1588f8beaa6ebc38b188f34f32e341bdb981.png')}
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.counter}>Question {current + 1} of {totalQuestions}</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.question}>{currentQuestion.question}</Text>
                </View>

                <View style={styles.optionsContainer}>
                    {currentQuestion.options.map((option: string, index: number) => {
                        const isCorrect = index === currentQuestion.correctIndex;
                        const isSelected = selected === index;
                        const optionStyle = [
                            styles.option,
                            answered && isCorrect && styles.correct,
                            answered && isSelected && !isCorrect && styles.wrong,
                        ];

                        const optionTextStyle = [
                            styles.optionText,
                            answered && isCorrect && styles.optionCorrectText,
                            answered && isSelected && !isCorrect && styles.optionWrongText,
                        ];

                        return (
                            <TouchableOpacity
                                key={index}
                                style={optionStyle}
                                onPress={() => handleAnswer(index)}
                                activeOpacity={0.8}
                                disabled={answered}
                            >
                                <Text style={optionTextStyle}>{option}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}

const BLUE_BG = '#021B44';
const YELLOW = '#FFD100';
const LIGHT_BLUE_TEXT = '#a7b9e8';
const CARD_BG = 'rgba(3, 19, 60, 0.9)';
const OPTION_BG = 'rgba(8, 44, 102, 0.8)';
const CORRECT_BG = '#28a745';
const WRONG_BG = '#dc3545';

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        backgroundColor: 'rgba(2, 27, 68, 0.7)',
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'android' ? 25 : 0,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: BLUE_BG,
    },
    loadingText: {
        color: '#fff',
        fontSize: 18,
    },
    header: {
        marginTop: 20,
        marginBottom: 10,
    },
    counter: {
        color: YELLOW,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        letterSpacing: 1,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    card: {
        backgroundColor: CARD_BG,
        borderRadius: 20,
        padding: 24,
        marginBottom: 20,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.4,
                shadowRadius: 8,
            },
            android: {
                elevation: 10,
            },
        }),
    },
    question: {
        color: '#fff',
        fontSize: 22,
        fontWeight: '700',
        lineHeight: 30,
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    optionsContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    option: {
        backgroundColor: OPTION_BG,
        padding: 18,
        borderRadius: 15,
        marginBottom: 12,
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
    optionText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    correct: {
        backgroundColor: CORRECT_BG,
        ...Platform.select({
            ios: {
                shadowColor: CORRECT_BG,
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.6,
                shadowRadius: 8,
            },
            android: {
                elevation: 10,
            },
        }),
    },
    wrong: {
        backgroundColor: WRONG_BG,
        ...Platform.select({
            ios: {
                shadowColor: WRONG_BG,
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.6,
                shadowRadius: 8,
            },
            android: {
                elevation: 10,
            },
        }),
    },
    optionCorrectText: {
        color: '#fff',
        fontWeight: '800',
    },
    optionWrongText: {
        color: '#fff',
        fontWeight: '800',
    },
});
