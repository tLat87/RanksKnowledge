import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Alert,
    ImageBackground,
    Platform,
    ScrollView,
    TextInput,
} from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../../App';

type DetailsRouteProp = RouteProp<RootStackParamList, 'Details'>;

export default function DetailsScreen() {
    const route = useRoute<DetailsRouteProp>();
    const navigation = useNavigation();
    const { title, description, tag } = route.params;

    const [notes, setNotes] = useState<string[]>([]);
    const [noteInput, setNoteInput] = useState('');

    const NOTE_KEY = `notes_${title}`; // Уникальный ключ для каждой карточки

    useEffect(() => {
        loadNotes();
    }, [title]); // Загружаем заметки при изменении ранга

    const loadNotes = async () => {
        try {
            const savedNotes = await AsyncStorage.getItem(NOTE_KEY);
            if (savedNotes) {
                setNotes(JSON.parse(savedNotes));
            }
        } catch (e) {
            console.error("Failed to load notes for rank", e);
        }
    };

    const saveNotes = async (newNotes: string[]) => {
        try {
            await AsyncStorage.setItem(NOTE_KEY, JSON.stringify(newNotes));
            setNotes(newNotes);
        } catch (e) {
            console.error("Failed to save notes for rank", e);
        }
    };

    const addNote = () => {
        if (noteInput.trim() === '') {
            Alert.alert('Empty Note', 'Please write something before adding a note.');
            return;
        }
        const newNotes = [...notes, noteInput];
        saveNotes(newNotes);
        setNoteInput('');
        Alert.alert('Note Added', 'Your note has been saved successfully.');
    };

    const removeNote = (indexToRemove: number) => {
        const newNotes = notes.filter((_, index) => index !== indexToRemove);
        saveNotes(newNotes);
    };

    return (
        <ImageBackground
            source={require('../assets/img/fe5c1588f8beaa6ebc38b188f34f32e341bdb981.png')}
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.topBar}>
                    <TouchableOpacity style={styles.navBtn} onPress={() => navigation.goBack()}>
                        <Text style={styles.navBtnText}>&#x2190;</Text>
                    </TouchableOpacity>
                    <Text style={styles.header}>DETAILS</Text>
                    {/*<TouchableOpacity style={styles.navBtn}>*/}
                    {/*    <Text style={styles.navBtnText}>&#x21EA;</Text>*/}
                    {/*</TouchableOpacity>*/}
                </View>

                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.detailsCard}>
                        <Text style={styles.rankTitle}>{title}</Text>
                        <View style={styles.tag}>
                            <Text style={styles.tagText}>{tag}</Text>
                        </View>
                        <Text style={styles.desc}>{description}</Text>
                        <Text style={styles.desc}>
                            Able Seaman is one of the foundational enlisted ranks in naval service. Individuals in
                            this role often perform basic operational tasks, including watchkeeping, maintenance,
                            rigging, and deck work. It requires basic training and discipline, and is usually the first
                            step after initial induction or training.
                        </Text>
                    </View>

                    <View style={styles.notesCard}>
                        <Text style={styles.notesHeader}>My Notes:</Text>
                        {notes.length > 0 ? (
                            notes.map((note, i) => (
                                <View key={i} style={styles.noteItem}>
                                    <Text style={styles.noteText}>- {note}</Text>
                                    <TouchableOpacity onPress={() => removeNote(i)} style={styles.deleteBtn}>
                                        <Text style={styles.deleteBtnText}>X</Text>
                                    </TouchableOpacity>
                                </View>
                            ))
                        ) : (
                            <Text style={styles.noNotesText}>You have no notes for this rank yet.</Text>
                        )}
                        <TextInput
                            style={styles.noteInput}
                            placeholder="Add your note here..."
                            placeholderTextColor="#8faadc"
                            value={noteInput}
                            onChangeText={setNoteInput}
                            multiline
                            textAlignVertical="top"
                        />
                        <TouchableOpacity style={styles.addNoteBtn} activeOpacity={0.8} onPress={addNote}>
                            <Text style={styles.addNoteBtnText}>+ ADD NOTE</Text>
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
const TAG_BG = '#1f4ff7';
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
    header: {
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
    detailsCard: {
        backgroundColor: CARD_BG,
        borderRadius: 20,
        padding: 24,
        marginBottom: 16,
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
    rankTitle: {
        color: YELLOW,
        fontSize: 24,
        fontWeight: '900',
        textAlign: 'center',
        marginBottom: 12,
        letterSpacing: 0.5,
        textShadowColor: 'rgba(0, 0, 0, 0.6)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    tag: {
        alignSelf: 'center',
        backgroundColor: TAG_BG,
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 12,
        marginBottom: 20,
        ...Platform.select({
            ios: {
                shadowColor: TAG_BG,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.4,
                shadowRadius: 3,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    tagText: {
        color: '#fff',
        fontWeight: '800',
        fontSize: 14,
        letterSpacing: 0.5,
    },
    desc: {
        color: LIGHT_BLUE_TEXT,
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 16,
    },
    notesCard: {
        backgroundColor: CARD_BG,
        borderRadius: 20,
        padding: 24,
        marginBottom: 16,
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
    notesHeader: {
        color: YELLOW,
        fontWeight: '900',
        fontSize: 18,
        marginBottom: 15,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    noteItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: 12,
        borderRadius: 10,
        marginBottom: 8,
    },
    noteText: {
        color: LIGHT_BLUE_TEXT,
        fontSize: 15,
        lineHeight: 22,
        flex: 1,
        marginRight: 10,
    },
    noNotesText: {
        color: '#8faadc',
        textAlign: 'center',
        fontStyle: 'italic',
        marginBottom: 15,
    },
    noteInput: {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 15,
        minHeight: 80,
        marginTop: 15,
        marginBottom: 10,
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
    addNoteBtn: {
        backgroundColor: '#0a56ff',
        paddingVertical: 14,
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
    addNoteBtnText: {
        color: '#fff',
        fontWeight: '900',
        letterSpacing: 1.5,
        fontSize: 16,
    },
    deleteBtn: {
        backgroundColor: '#dc3545',
        borderRadius: 10,
        paddingVertical: 4,
        paddingHorizontal: 8,
    },
    deleteBtnText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
