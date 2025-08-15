import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    TextInput,
    StyleSheet,
    SafeAreaView,
    ImageBackground,
    Platform,
    LayoutAnimation,
    UIManager,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

// Включаем LayoutAnimation для Android
if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Пример типов для заметок, чтобы избежать ошибок
type Note = {
    title: string;
    rank: string;
    image?: string;
    // ... другие поля
};

export default function MyNotesScreen({ navigation }) {
    const [notes, setNotes] = useState<Note[]>([]);
    const [search, setSearch] = useState('');

    useFocusEffect(
        React.useCallback(() => {
            loadNotes();
        }, [])
    );

    const loadNotes = async () => {
        try {
            const savedNotes = await AsyncStorage.getItem('notes');
            if (savedNotes) {
                LayoutAnimation.easeInEaseOut(); // Плавная анимация при загрузке заметок
                setNotes(JSON.parse(savedNotes));
            }
        } catch (e) {
            console.error("Failed to load notes", e);
        }
    };

    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.rank.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <ImageBackground
            source={require('../assets/img/fe5c1588f8beaa6ebc38b188f34f32e341bdb981.png')} // Замените на ваше фоновое изображение
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>MY NOTES</Text>
                <TextInput
                    style={styles.search}
                    placeholder="Search by rank or note title..."
                    placeholderTextColor="#9dbbe9"
                    value={search}
                    onChangeText={setSearch}
                />
                {filteredNotes.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>You haven't added any notes yet.</Text>
                        <Text style={styles.emptySubtext}>Start by tapping the button below.</Text>
                    </View>
                ) : (
                    <FlatList
                        data={filteredNotes}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity
                                style={styles.noteItem}
                                activeOpacity={0.8}
                                onPress={() => navigation.navigate('NoteDetailsScreen', { note: item, index })}
                            >
                                {item.image ? (
                                    <Image source={{ uri: item.image }} style={styles.noteImage} />
                                ) : (
                                    <View style={styles.noteImagePlaceholder}>
                                        <Text style={styles.noteImagePlaceholderText}>📝</Text>
                                    </View>
                                )}
                                <View style={styles.noteTextContainer}>
                                    <Text style={styles.noteRank}>{item.rank}</Text>
                                    <Text style={styles.noteTitle}>{item.title}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        contentContainerStyle={styles.listContentContainer}
                    />
                )}
                <TouchableOpacity
                    style={styles.addButton}
                    activeOpacity={0.9}
                    onPress={() => navigation.navigate('CreateNoteScreen')}
                >
                    <Text style={styles.addButtonText}>+ ADD NOTE</Text>
                </TouchableOpacity>
                <View style={{marginBottom: 100}}/>
            </SafeAreaView>
        </ImageBackground>
    );
}

const BLUE_BG = '#021B44';
const YELLOW = '#FFD100';
const CARD_BG = 'rgba(3, 19, 60, 0.9)';
const NOTE_ITEM_BG = 'rgba(8, 44, 102, 0.8)';
const LIGHT_BLUE_TEXT = '#cfe0ff';

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
    title: {
        fontSize: 26,
        fontWeight: '900',
        color: '#fff',
        textAlign: 'center',
        marginVertical: 18,
        letterSpacing: 1.5,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
        fontFamily: 'JosefinSans-ExtraBold',
    },
    search: {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderRadius: 15,
        paddingHorizontal: 15,
        height: 50,
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
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    emptyText: {
        color: LIGHT_BLUE_TEXT,
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 8,
        fontFamily: 'JosefinSans-SemiBold',
    },
    emptySubtext: {
        color: '#8faadc',
        fontSize: 14,
        textAlign: 'center',
    },
    listContentContainer: {
        paddingVertical: 10,
        paddingBottom: 20,
    },
    noteItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: NOTE_ITEM_BG,
        padding: 16,
        marginVertical: 8,
        borderRadius: 18,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 5,
            },
            android: {
                elevation: 8,
            },
        }),
    },
    noteImage: {
        width: 60,
        height: 60,
        borderRadius: 30, // Круглое изображение
        marginRight: 15,
        borderWidth: 2,
        borderColor: YELLOW,
    },
    noteImagePlaceholder: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 15,
        backgroundColor: '#1f4ff7',
        justifyContent: 'center',
        alignItems: 'center',
    },
    noteImagePlaceholderText: {
        fontSize: 24,
    },
    noteTextContainer: {
        flex: 1,
    },
    noteRank: {
        color: YELLOW,
        fontWeight: 'bold',
        fontSize: 14,
        fontFamily: 'JosefinSans-Bold',
        marginBottom: 4,
    },
    noteTitle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'JosefinSans-SemiBold',
    },
    addButton: {
        backgroundColor: '#0a56ff',
        paddingVertical: 18,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: Platform.OS === 'ios' ? 0 : 10,
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
    addButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '900',
        letterSpacing: 1.5,
        fontFamily: 'JosefinSans-ExtraBold',
    },
});
