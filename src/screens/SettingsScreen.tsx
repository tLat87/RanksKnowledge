import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Switch,
    Image,
    SafeAreaView,
    ImageBackground,
    Platform,
    ScrollView, Linking,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from "@react-navigation/native";

export default function SettingsScreen() {
    const navigation = useNavigation();
    const [notifications, setNotifications] = useState(true); // Состояние для уведомлений
    const [secretItemReceived, setSecretItemReceived] = useState(false); // Состояние для секретного предмета

    const SECRET_ITEM_KEY = 'secretItemStatus'; // Ключ для AsyncStorage

    // Загрузка статуса секретного предмета при фокусе на экране
    useFocusEffect(
        React.useCallback(() => {
            loadSecretItemStatus();
        }, [])
    );

    const loadSecretItemStatus = async () => {
        try {
            const status = await AsyncStorage.getItem(SECRET_ITEM_KEY);
            if (status === 'received') {
                setSecretItemReceived(true);
            }
        } catch (e) {
            console.error("Failed to load secret item status", e);
        }
    };

    const handleLeaveCommentAndGetItem = async () => {
        try {
            await AsyncStorage.setItem(SECRET_ITEM_KEY, 'received');
            setSecretItemReceived(true);
            // Можно добавить тут уведомление или анимацию
            console.log("Secret item received!");
        } catch (e) {
            console.error("Failed to save secret item status", e);
        }
    };

    const handleShareApp = async () => {
        try {
            const result = await Share.share({
                message:
                    'Check out the Ranks of Admiral Knowledge app! 🚢📚\nDownload it here: https://example.com',
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    console.log("Shared with activity type:", result.activityType);
                } else {
                    console.log("Shared successfully");
                }
            } else if (result.action === Share.dismissedAction) {
                console.log("Share dismissed");
            }
        } catch (error) {
            console.error("Error sharing app:", error.message);
        }
    };


    return (
        <ImageBackground
            source={require('../assets/img/fe5c1588f8beaa6ebc38b188f34f32e341bdb981.png')}
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <Text style={styles.title}>SETTINGS</Text>

                    {/* Раздел уведомлений (пока без реальной логики) */}
                    {/*<View style={styles.menuItem}>*/}
                    {/*    <View style={styles.menuLeft}>*/}
                    {/*        <View style={styles.iconBox}>*/}
                    {/*            <Text style={styles.iconText}>🔔</Text>*/}
                    {/*        </View>*/}
                    {/*        <Text style={styles.menuText}>Notifications</Text>*/}
                    {/*    </View>*/}
                    {/*    <Switch*/}
                    {/*        trackColor={{ false: "#767577", true: YELLOW }}*/}
                    {/*        thumbColor={notifications ? "#f4f3f4" : "#f4f3f4"}*/}
                    {/*        ios_backgroundColor="#3e3e3e"*/}
                    {/*        onValueChange={setNotifications}*/}
                    {/*        value={notifications}*/}
                    {/*    />*/}
                    {/*</View>*/}

                    {/* About App */}
                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => navigation.navigate("AboutScreen")}
                        activeOpacity={0.8}
                    >
                        <View style={styles.menuLeft}>
                            <View style={styles.iconBox}>
                                {/* Replace with a suitable icon or emoji if image is not desired */}
                                <Text style={styles.iconText}>ℹ️</Text>
                            </View>
                            <Text style={styles.menuText}>About App</Text>
                        </View>
                        <Text style={styles.arrowIcon}>&#x203A;</Text>
                    </TouchableOpacity>

                    {/* Share the App */}
                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={handleShareApp} // <-- тут вызываем функцию
                        activeOpacity={0.8}
                    >
                        <View style={styles.menuLeft}>
                            <View style={styles.iconBox}>
                                <Text style={styles.iconText}>📤</Text>
                            </View>
                            <Text style={styles.menuText}>Share the App</Text>
                        </View>
                        <Text style={styles.arrowIcon}>&#x203A;</Text>
                    </TouchableOpacity>

                    {/* Terms of Use */}
                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => Linking.openURL('https://www.termsfeed.com/live/cfe0442a-c0d3-46fa-8f4d-75bf1cfc39b9')}
                        activeOpacity={0.8}
                    >
                        <View style={styles.menuLeft}>
                            <View style={styles.iconBox}>
                                <Text style={styles.iconText}>📜</Text>
                            </View>
                            <Text style={styles.menuText}>Terms of Use</Text>
                        </View>
                        <Text style={styles.arrowIcon}>&#x203A;</Text>
                    </TouchableOpacity>

                    {/* New Comment/Secret Item Block */}
                    <View style={styles.commentBlock}>
                        <Text style={styles.commentTitle}>Leave a Comment</Text>
                        <Text style={styles.commentText}>
                            Share your thoughts and get a special secret item!
                        </Text>
                        <TouchableOpacity
                            style={styles.commentButton}
                            onPress={handleLeaveCommentAndGetItem}
                            disabled={secretItemReceived}
                            activeOpacity={0.9}
                        >
                            <Text style={styles.commentButtonText}>
                                {secretItemReceived ? "ITEM RECEIVED!" : "LEAVE COMMENT & GET ITEM"}
                            </Text>
                        </TouchableOpacity>

                        {secretItemReceived && (
                            <View style={styles.secretItemDisplay}>
                                <Text style={styles.secretItemText}>🌟 Secret Item Unlocked! 🌟</Text>
                            </View>
                        )}
                    </View>

                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    );
}

const BLUE_BG = '#021B44';
const YELLOW = '#FFD100';
const LIGHT_BLUE_TEXT = '#a7b9e8';
const CARD_BG = 'rgba(3, 19, 60, 0.9)'; // Используется для общего контейнера
const MENU_ITEM_BG = 'rgba(255, 255, 255, 0.15)'; // Полупрозрачный фон для пунктов меню
const ICON_BOX_BG = '#0a56ff'; // Цвет для фона иконок

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        backgroundColor: 'rgba(2, 27, 68, 0.7)', // Полупрозрачный фон
        paddingHorizontal: 16,
        paddingTop: Platform.OS === 'android' ? 25 : 0, // Отступ для Android StatusBar
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 20, // Отступ для кнопки/блока внизу
    },
    title: {
        fontSize: 28,
        fontWeight: '900',
        color: '#fff',
        textAlign: 'center',
        marginVertical: 18,
        letterSpacing: 1.5,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
    },
    menuItem: {
        backgroundColor: MENU_ITEM_BG,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 15, // Более закругленные углы
        paddingVertical: 15,
        paddingHorizontal: 18,
        marginBottom: 12,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.25,
                shadowRadius: 5,
            },
            android: {
                elevation: 7,
            },
        }),
    },
    menuLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconBox: {
        backgroundColor: ICON_BOX_BG,
        padding: 10,
        borderRadius: 12, // Более закругленные углы для иконок
        marginRight: 15,
        ...Platform.select({
            ios: {
                shadowColor: ICON_BOX_BG,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.4,
                shadowRadius: 3,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    iconText: {
        fontSize: 20, // Размер эмодзи-иконок
    },
    menuText: {
        color: LIGHT_BLUE_TEXT, // Более мягкий цвет текста
        fontSize: 17,
        fontWeight: '600',
    },
    arrowIcon: {
        color: LIGHT_BLUE_TEXT,
        fontSize: 20,
        fontWeight: 'bold',
    },
    commentBlock: {
        backgroundColor: CARD_BG, // Используем общий цвет карточек
        borderRadius: 20,
        padding: 20,
        marginTop: 20, // Отступ сверху
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
    commentTitle: {
        color: YELLOW,
        fontSize: 20,
        fontWeight: '800',
        textAlign: 'center',
        marginBottom: 10,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    commentText: {
        color: LIGHT_BLUE_TEXT,
        fontSize: 15,
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: 22,
    },
    commentButton: {
        backgroundColor: YELLOW,
        paddingVertical: 16,
        borderRadius: 30,
        alignItems: 'center',
        ...Platform.select({
            ios: {
                shadowColor: YELLOW,
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.8,
                shadowRadius: 15,
            },
            android: {
                elevation: 10,
            },
        }),
    },
    commentButtonText: {
        color: BLUE_BG, // Темно-синий текст на желтой кнопке
        fontSize: 16,
        fontWeight: '900',
        letterSpacing: 1,
    },
    secretItemDisplay: {
        marginTop: 15,
        padding: 10,
        backgroundColor: 'rgba(255, 215, 0, 0.2)', // Легкий желтый фон
        borderRadius: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: YELLOW,
    },
    secretItemText: {
        color: YELLOW,
        fontSize: 16,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 0.5, height: 0.5 },
        textShadowRadius: 1,
    },
});
