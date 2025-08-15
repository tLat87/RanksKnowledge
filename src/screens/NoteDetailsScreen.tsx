import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    ImageBackground,
    Platform,
} from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

type NoteDetailsRouteProp = RouteProp<RootStackParamList, 'NoteDetailsScreen'>;

export default function NoteDetailsScreen({ route }: { route: NoteDetailsRouteProp }) {
    const { note, index } = route.params;
    const navigation = useNavigation();

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
                    <Text style={styles.headerTitle}>DETAILS</Text>
                    <TouchableOpacity style={styles.navBtn}>
                        <Text style={styles.navBtnText}>&#x21EA;</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.contentCard}>
                        {note.image ? (
                            <Image source={{ uri: note.image }} style={styles.noteImage} />
                        ) : (
                            <View style={styles.noteImagePlaceholder}>
                                <Text style={styles.noteImagePlaceholderText}>📸</Text>
                                <Text style={styles.noteImagePlaceholderSubtext}>No Image</Text>
                            </View>
                        )}
                        <Text style={styles.noteTitle}>{note.title}</Text>
                        <Text style={styles.noteRank}>{note.rank}</Text>
                        <Text style={styles.noteText}>{note.note}</Text>
                    </View>
                </ScrollView>

                <TouchableOpacity
                    style={styles.editButton}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('CreateNoteScreen', { note, index })}
                >
                    <Text style={styles.editButtonText}>EDIT</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </ImageBackground>
    );
}

const BLUE_BG = '#021B44';
const YELLOW = '#FFD100';
const CARD_BG = 'rgba(3, 19, 60, 0.9)';
const LIGHT_BLUE_TEXT = '#a7b9e8';
const NOTE_ITEM_BG = 'rgba(8, 44, 102, 0.8)';

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
    noteImage: {
        width: '100%',
        height: 200,
        borderRadius: 16,
        marginBottom: 20,
    },
    noteImagePlaceholder: {
        width: '100%',
        height: 200,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    noteImagePlaceholderText: {
        fontSize: 48,
        color: LIGHT_BLUE_TEXT,
    },
    noteImagePlaceholderSubtext: {
        marginTop: 5,
        fontSize: 14,
        color: LIGHT_BLUE_TEXT,
    },
    noteTitle: {
        color: YELLOW,
        fontSize: 24,
        fontWeight: '900',
        marginBottom: 8,
        letterSpacing: 0.5,
        textShadowColor: 'rgba(0, 0, 0, 0.6)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    noteRank: {
        color: LIGHT_BLUE_TEXT,
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 16,
    },
    noteText: {
        color: '#fff',
        fontSize: 16,
        lineHeight: 24,
    },
    editButton: {
        backgroundColor: YELLOW,
        paddingVertical: 18,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: Platform.OS === 'ios' ? 0 : 10,
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
    editButtonText: {
        color: BLUE_BG,
        fontSize: 18,
        fontWeight: '900',
        letterSpacing: 1.5,
    },
});
