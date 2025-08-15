// HomeScreen.tsx
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    TextInput,
    ImageBackground,
    Platform,
    LayoutAnimation,
    UIManager,
} from 'react-native';
import { useNavigation } from "@react-navigation/native";

// Включаем LayoutAnimation для Android
if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const TABS = ['Ranks', 'Glossary'] as const;

type Rank = {
    id: string;
    title: string;
    description: string;
    tag: string;
};

type GlossaryTerm = {
    id: string;
    title: string;
    description: string;
};

const DATA: Rank[] = [
    {
        id: '1',
        title: 'Able Seaman',
        description:
            'Enlisted rank below Leading Seaman. Typically performs general duties aboard naval vessels.',
        tag: 'General Rank',
    },
    {
        id: '2',
        title: 'Leading Seaman',
        description:
            'A non-commissioned officer rank, often responsible for a small team or specialized task.',
        tag: 'NCO',
    },
    {
        id: '3',
        title: 'Lieutenant',
        description:
            'A junior commissioned officer rank, typically commanding a small division or section.',
        tag: 'Officer',
    },
    {
        id: '4',
        title: 'Petty Officer',
        description:
            'A senior non-commissioned officer, with significant leadership and technical responsibilities.',
        tag: 'NCO',
    },
    {
        id: '5',
        title: 'Commander',
        description:
            'A mid-level commissioned officer, usually commanding a frigate or destroyer.',
        tag: 'Officer',
    },
    {
        id: '6',
        title: 'Rear Admiral',
        description:
            'A flag officer rank, commanding a small fleet or major naval formation.',
        tag: 'Flag Officer',
    },
];

const GLOSSARY_DATA: GlossaryTerm[] = [
    { id: '1', title: 'NCO', description: 'Non-Commissioned Officer. A military officer who has not earned a commission...' },
    { id: '2', title: 'Commissioned Officer', description: 'An officer who has earned a commission and holds a rank of authority...' },
    { id: '3', title: 'Warrant Officer', description: 'A specialist officer rank between enlisted and commissioned...' },
    { id: '4', title: 'Enlisted Personnel', description: 'Military members who are not officers...' },
    { id: '5', title: 'Insignia', description: 'A badge or mark that shows a rank or affiliation...' },
    { id: '6', title: 'Rating', description: 'A classification or job title for enlisted naval personnel...' },
    { id: '7', title: 'Rank', description: 'A hierarchical level in the military that shows authority and responsibility...' },
    { id: '8', title: 'Naval Cadet', description: 'A trainee undergoing officer training...' },
    { id: '9', title: 'Flag Officer', description: 'A high-ranking officer, typically from Rear Admiral and above...' },
    { id: '10', title: 'Chain of Command', description: 'The official line of authority and responsibility in military units...' },
    { id: '11', title: 'Watchkeeping', description: 'A system of duty rotation to maintain constant oversight...' },
    { id: '12', title: 'Executive Officer (XO)', description: 'The second-in-command of a naval vessel or unit...' },
    { id: '13', title: 'Commanding Officer (CO)', description: 'The officer in overall command of a ship or unit...' },
    { id: '14', title: 'Shore Duty', description: 'Assignment to a land-based naval facility...' },
    { id: '15', title: 'Sea Duty', description: 'Service aboard a ship or submarine...' },
    { id: '16', title: 'Frocking', description: 'A practice where an officer wears the insignia of a higher rank...' },
    { id: '17', title: 'Mess', description: 'A designated dining and social area for a specific rank group...' },
    { id: '18', title: 'Boatswain', description: 'A senior enlisted specialist responsible for ship maintenance...' },
    { id: '19', title: 'Quarterdeck', description: 'A ceremonial area of a naval ship where officers are greeted...' },
    { id: '20', title: 'Uniform Code of Military Justice (UCMJ)', description: 'The legal framework governing members of the armed forces...' },
    { id: '21', title: 'Bridge', description: 'The command center of a naval vessel where navigation and ship control occur...' },
    { id: '22', title: 'Commission', description: 'An official document granting authority to an individual as a commissioned officer...' },
    { id: '23', title: 'Deck Division', description: 'A group aboard a naval vessel responsible for maintenance...' },
    { id: '24', title: 'Line Officer', description: 'A commissioned officer eligible for command at sea...' },
    { id: '25', title: 'Staff Officer', description: 'An officer who specializes in non-combat roles...' },
    { id: '26', title: 'Rank Equivalency', description: 'A comparison of ranks across different branches or countries...' },
    { id: '27', title: 'Salute', description: 'A formal gesture of respect typically performed by raising the hand...' },
    { id: '28', title: 'Service Dress', description: 'A formal military uniform used during ceremonies...' },
    { id: '29', title: 'Duty Roster', description: 'A schedule that outlines personnel assignments...' },
    { id: '30', title: 'Logbook', description: 'An official record maintained on ships...' },
    { id: '31', title: 'Rating Badge', description: 'An insignia worn by enlisted sailors that indicates their rank...' },
    { id: '32', title: 'Command Authority', description: 'The legal and formal power to issue orders...' },
    { id: '33', title: 'Chain Locker', description: 'A compartment on a ship where anchor chains are stored...' },
    { id: '34', title: 'Naval Doctrine', description: 'A set of principles guiding the organization...' },
    { id: '35', title: 'Ensign (Flag)', description: 'A national flag flown by naval vessels...' },
    { id: '36', title: 'Submarine Warfare Officer', description: 'An officer trained and assigned to submarine command...' },
    { id: '37', title: 'Flagship', description: 'The lead ship in a fleet...' },
    { id: '38', title: 'Fleet', description: 'A large formation of warships under unified command...' },
    { id: '39', title: 'Discipline Code', description: 'A set of regulations and behavioral expectations...' },
    { id: '40', title: 'Naval Training Command', description: 'An institution or body responsible for training naval personnel...' },
];


export default function HomeScreen() {
    const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>('Ranks');
    const navigation = useNavigation();

    const handleTabPress = (tab: (typeof TABS)[number]) => {
        LayoutAnimation.easeInEaseOut();
        setActiveTab(tab);
    };

    const renderRankItem = ({ item }: { item: Rank }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() =>
                // @ts-ignore
                navigation.navigate('Details', {
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    tag: item.tag,
                })
            }
            activeOpacity={0.8}
        >
            <View style={styles.cardHeader}>
                <View style={styles.iconCircle}>
                    <Text style={styles.iconText}>⚓</Text>
                </View>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <View style={styles.tag}>
                    <Text style={styles.tagText}>{item.tag}</Text>
                </View>
            </View>
            <Text style={styles.cardDesc}>{item.description}</Text>
        </TouchableOpacity>
    );

    const renderGlossaryItem = ({ item }: { item: GlossaryTerm }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() =>
                // @ts-ignore
                navigation.navigate('Details', {
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    tag: 'Glossary Term', // Добавим дефолтный тег для единообразия
                })
            }
            activeOpacity={0.8}
        >
            <View style={styles.cardHeader}>
                <Text style={[styles.cardTitle, styles.glossaryTitle]}>{item.title}</Text>
            </View>
            <Text style={styles.cardDesc}>{item.description}</Text>
        </TouchableOpacity>
    );

    return (
        <ImageBackground
            source={require('../assets/img/fe5c1588f8beaa6ebc38b188f34f32e341bdb981.png')}
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.container}>
                {/* Заголовок */}
                <Text style={styles.header}>RANKS & TERMS</Text>

                {/* Поиск */}
                <View style={styles.search}>
                    <Text style={styles.searchIcon}>🔍</Text>
                    <TextInput
                        placeholder="Search by rank or term..."
                        placeholderTextColor="#8faadc"
                        style={styles.searchInput}
                    />
                </View>

                {/* Табы */}
                <View style={styles.tabs}>
                    {TABS.map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            style={[
                                styles.tab,
                                activeTab === tab && styles.tabActive,
                            ]}
                            onPress={() => handleTabPress(tab)}
                        >
                            <Text
                                style={[
                                    styles.tabText,
                                    activeTab === tab && styles.tabTextActive,
                                ]}
                            >
                                {tab}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Список */}
                <FlatList
                    data={activeTab === 'Ranks' ? DATA : GLOSSARY_DATA}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        if (activeTab === 'Ranks') {
                            // @ts-ignore
                            return renderRankItem({ item });
                        } else {
                            // @ts-ignore
                            return renderGlossaryItem({ item });
                        }
                    }}
                    contentContainerStyle={styles.listContentContainer}
                    showsVerticalScrollIndicator={false}
                />
                <View style={{marginBottom: 80}}/>
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
    header: {
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
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(8, 44, 102, 0.8)',
        borderRadius: 15,
        paddingHorizontal: 15,
        height: 50,
        marginBottom: 15,
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
    searchIcon: {
        color: '#8faadc',
        fontSize: 20,
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        color: '#fff',
        fontSize: 16,
        paddingVertical: Platform.OS === 'ios' ? 10 : 0,
    },
    tabs: {
        flexDirection: 'row',
        backgroundColor: 'rgba(8, 44, 102, 0.8)',
        borderRadius: 15,
        marginTop: 10,
        overflow: 'hidden',
        marginBottom: 15,
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
    tab: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        transitionProperty: 'background-color',
        transitionDuration: '0.3s',
    },
    tabActive: {
        backgroundColor: YELLOW,
    },
    tabText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
        fontFamily: 'JosefinSans-SemiBold',
    },
    tabTextActive: {
        color: BLUE_BG,
        fontWeight: '900',
    },
    listContentContainer: {
        paddingVertical: 10,
        paddingBottom: 20,
    },
    card: {
        backgroundColor: CARD_BG,
        borderRadius: 18,
        padding: 18,
        marginBottom: 15,
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
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    iconCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#0a56ff',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
        ...Platform.select({
            ios: {
                shadowColor: '#0a56ff',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.6,
                shadowRadius: 5,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    iconText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: YELLOW,
        flex: 1,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
        fontFamily: 'JosefinSans-Bold',
    },
    glossaryTitle: {
        color: '#fff', // Белый цвет для заголовка глоссария
    },
    tag: {
        backgroundColor: TAG_BG,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
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
        fontSize: 11,
        fontWeight: '800',
        color: '#fff',
        fontFamily: 'JosefinSans-Regular',
    },
    cardDesc: {
        fontSize: 13,
        lineHeight: 18,
        color: LIGHT_BLUE_TEXT,
        fontFamily: 'JosefinSans-Light',
    },
});
