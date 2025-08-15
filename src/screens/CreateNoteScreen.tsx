import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'react-native-image-picker';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

type CreateNoteRouteProp = RouteProp<RootStackParamList, 'CreateNoteScreen'>;

export default function CreateNoteScreen({ route }: { route: CreateNoteRouteProp }) {
    const navigation = useNavigation();
    const note = route.params?.note || {};
    const index = route.params?.index;

    const [rank, setRank] = useState(note.rank || '');
    const [title, setTitle] = useState(note.title || '');
    const [noteText, setNoteText] = useState(note.note || '');
    const [image, setImage] = useState(note.image || null);

    const pickImage = async () => {
        ImagePicker.launchImageLibrary({ mediaType: 'photo', quality: 0.8 }, response => {
            if (!response.didCancel && response.assets?.[0]?.uri) {
                setImage(response.assets[0].uri);
            }
        });
    };

    const saveNote = async () => {
        const savedNotes = await AsyncStorage.getItem('notes');
        let notesArray = savedNotes ? JSON.parse(savedNotes) : [];

        const newNote = { rank, title, note: noteText, image };

        if (index !== undefined) {
            notesArray[index] = newNote; // редактирование
        } else {
            notesArray.push(newNote); // добавление
        }

        await AsyncStorage.setItem('notes', JSON.stringify(notesArray));
        navigation.goBack();
    };

    return (
        <ImageBackground
            source={require('../assets/img/fe5c1588f8beaa6ebc38b188f34f32e341bdb981.png')}
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                >
                    <ScrollView contentContainerStyle={styles.scrollContent}>
                        <Text style={styles.title}>{index !== undefined ? 'EDIT NOTE' : 'CREATE NOTE'}</Text>

                        <TouchableOpacity style={styles.imagePicker} onPress={pickImage} activeOpacity={0.8}>
                            {image ? (
                                <Image source={{ uri: image }} style={styles.image} />
                            ) : (
                                <View style={styles.imagePlaceholderContainer}>
                                    <Text style={styles.imagePlaceholderText}>📸</Text>
                                    <Text style={styles.imagePlaceholderSubtext}>Tap to Upload</Text>
                                </View>
                            )}
                        </TouchableOpacity>

                        <TextInput
                            style={styles.input}
                            placeholder="Rank"
                            placeholderTextColor="#9dbbe9"
                            value={rank}
                            onChangeText={setRank}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Title"
                            placeholderTextColor="#9dbbe9"
                            value={title}
                            onChangeText={setTitle}
                        />
                        <TextInput
                            style={[styles.input, styles.noteInput]}
                            placeholder="Note"
                            placeholderTextColor="#9dbbe9"
                            value={noteText}
                            onChangeText={setNoteText}
                            multiline
                            textAlignVertical="top"
                        />
                    </ScrollView>
                    <TouchableOpacity style={styles.saveButton} activeOpacity={0.9} onPress={saveNote}>
                        <Text style={styles.saveButtonText}>{index !== undefined ? 'SAVE CHANGES' : 'SAVE'}</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </ImageBackground>
    );
}

const BLUE_BG = '#021B44';
const YELLOW = '#FFD100';
const CARD_BG = 'rgba(3, 19, 60, 0.9)';
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
    scrollContent: {
        flexGrow: 1,
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
    imagePicker: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
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
    imagePlaceholderContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagePlaceholderText: {
        color: LIGHT_BLUE_TEXT,
        fontSize: 48,
        opacity: 0.6,
    },
    imagePlaceholderSubtext: {
        color: LIGHT_BLUE_TEXT,
        fontSize: 14,
        marginTop: 5,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderRadius: 15,
        paddingHorizontal: 15,
        height: 55,
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
    noteInput: {
        height: 150,
        paddingVertical: 15,
    },
    saveButton: {
        backgroundColor: YELLOW,
        paddingVertical: 18,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10,
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
    saveButtonText: {
        color: BLUE_BG,
        fontSize: 18,
        fontWeight: '900',
        letterSpacing: 1.5,
        fontFamily: 'JosefinSans-ExtraBold',
    },
});
