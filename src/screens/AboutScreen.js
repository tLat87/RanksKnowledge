import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    ImageBackground,
    Platform,
    TextInput,
    LayoutAnimation,
    UIManager,
} from 'react-native';

// Включаем LayoutAnimation для Android
if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function AboutScreen({ navigation }) {
    const [feedback, setFeedback] = useState('');

    const handleSendFeedback = () => {
        // Здесь можно реализовать логику отправки текста
        // Например, сохранить в AsyncStorage, отправить на сервер, или просто показать Alert
        LayoutAnimation.easeInEaseOut();
        Alert.alert('Thank you for your feedback! It has been sent.');
        setFeedback('');
    };

    return (
        <ImageBackground
            source={require('../assets/img/fe5c1588f8beaa6ebc38b188f34f32e341bdb981.png')}
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.container}>
                {/* Верхний бар */}
                <View style={styles.topBar}>
                    <TouchableOpacity style={styles.navBtn} onPress={() => navigation.goBack()}>
                        <Text style={styles.navBtnText}>&#x2190;</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>ABOUT</Text>
                    {/*<TouchableOpacity style={styles.navBtn}>*/}
                    {/*    <Text style={styles.navBtnText}>&#x21EA;</Text>*/}
                    {/*</TouchableOpacity>*/}
                </View>

                {/* Основной контент */}
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.contentCard}>
                        <Image
                            source={require('../assets/img/image51.png')}
                            style={styles.image}
                            resizeMode="cover"
                        />
                        <Text style={styles.text}>
                            Ranks of Admiral Knowledge is an educational tool designed to help users explore and
                            understand naval ranks and terminology. The app includes a general reference base with
                            explanations of most ranks — from seaman to admiral — along with a mini glossary of
                            commonly used naval terms.
                        </Text>
                        <Text style={styles.text}>
                            Users can personalize their learning by adding notes and uploading images to any rank. To
                            support progress, the app also features quizzes that challenge understanding and help
                            reinforce knowledge over time.
                        </Text>
                        <Text style={styles.text}>
                            This app is intended for students, researchers, and anyone with an interest in maritime
                            command and structure. It does not represent any specific country's navy and serves as a
                            flexible space for study, reflection, and knowledge building.
                        </Text>
                    </View>

                    {/* Блок обратной связи */}
                    <View style={styles.feedbackBlock}>
                        <Text style={styles.feedbackTitle}>Your Feedback Matters!</Text>
                        <Text style={styles.feedbackText}>What would you like to see in the next update?</Text>
                        <TextInput
                            style={styles.feedbackInput}
                            placeholder="Type your ideas here..."
                            placeholderTextColor="#8faadc"
                            multiline
                            textAlignVertical="top"
                            value={feedback}
                            onChangeText={setFeedback}
                        />
                        <TouchableOpacity
                            style={styles.feedbackButton}
                            onPress={handleSendFeedback}
                            disabled={!feedback.trim()}
                            activeOpacity={0.9}
                        >
                            <Text style={styles.feedbackButtonText}>SEND FEEDBACK</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    );
}

const BLUE_BG = '#021B44';
const YELLOW = '#FFD100';
const CARD_BG = 'rgba(3, 19, 60, 0.9)';
const LIGHT_BLUE_TEXT = '#a7b9e8';

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        backgroundColor: 'rgba(2, 27, 68, 0.7)',
        paddingHorizontal: 16,
        paddingTop: Platform.OS === 'android' ? 25 : 0,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    navBtn: {
        backgroundColor: 'rgba(8, 44, 102, 0.6)',
        borderRadius: 12,
        padding: 12,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    navBtnText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    headerTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '800',
        letterSpacing: 1.5,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    contentCard: {
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
    image: {
        width: '50%',
        height: 360,
        alignSelf: 'center',
        marginBottom: 20,
        borderRadius: 16,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 5,
            },
            android: {
                elevation: 6,
            },
        }),
    },
    text: {
        color: LIGHT_BLUE_TEXT,
        fontSize: 15,
        fontWeight: '900',
        lineHeight: 22,
        marginBottom: 15,
    },
    feedbackBlock: {
        backgroundColor: CARD_BG,
        borderRadius: 20,
        padding: 20,
        marginTop: 10,
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
    feedbackTitle: {
        color: YELLOW,
        fontSize: 20,
        fontWeight: '900',
        textAlign: 'center',
        marginBottom: 10,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    feedbackText: {
        color: LIGHT_BLUE_TEXT,
        fontSize: 15,
        fontWeight: '900',
        textAlign: 'center',
        marginBottom: 15,
    },
    feedbackInput: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 15,
        fontWeight: '900',
        height: 120,
        marginBottom: 15,
        color: '#fff',
        fontSize: 16,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 5,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    feedbackButton: {
        backgroundColor: '#0a56ff',
        paddingVertical: 16,
        borderRadius: 30,

        alignItems: 'center',
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
    feedbackButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '900',
        letterSpacing: 1,
        fontWeight: '900',
    },
});
