// OnboardingScreen.tsx
import React, {useCallback, useRef, useState} from 'react';
import {
    View,
    Text,
    Image,
    ImageBackground,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    Dimensions,
    StyleSheet,
    ListRenderItemInfo,
    Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

type ScreenItem = {
    id: string;
    title: string;
    subtitle: string;
    background: any;
    portrait: any;
};

const SCREENS: ScreenItem[] = [
    {
        id: '1',
        title: 'Enter the Hierarchy',
        subtitle:
            'Discover the structure behind naval command.\nUnderstand how each rank fits into a greater system of order.',
        portrait: require('../assets/img/image1-1.png'),
        background: require('../assets/img/fe5c1588f8beaa6ebc38b188f34f32e341bdb981.png'),
    },
    {
        id: '2',
        title: 'Make It Your Own',
        subtitle:
            'Attach your own notes and images to any rank.\nPersonalize your learning and build your own reference library.',
        portrait: require('../assets/img/image51.png'),
        background: require('../assets/img/fe5c1588f8beaa6ebc38b188f34f32e341bdb981.png'),
    },
    {
        id: '3',
        title: 'Ranks of Admiral Knowledge',
        subtitle:'Just pure naval structure, questions that test you, and the space to think like a leader.',
        portrait: require('../assets/img/Shape.png'),
        background: require('../assets/img/fe5c1588f8beaa6ebc38b188f34f32e341bdb981.png'),
    },
];

type Props = {
    onFinish?: () => void;
};

export default function OnboardingScreen({onFinish}: Props) {
    const navigation = useNavigation();
    const [index, setIndex] = useState(0);
    const listRef = useRef<FlatList<ScreenItem>>(null);

    const goNext = useCallback(() => {
        const last = index === SCREENS.length - 1;
        if (last) {
            // @ts-ignore
            navigation.navigate('BottomTabsS');
            return;
        }
        listRef.current?.scrollToIndex({index: index + 1, animated: true});
    }, [index, navigation]);

    const skip = useCallback(() => {
        // @ts-ignore
        navigation.navigate('BottomTabsS');
    }, [navigation]);

    const onViewableItemsChanged = useRef(
        ({viewableItems}: {viewableItems: Array<{index?: number}>}) => {
            if (viewableItems[0]?.index != null) setIndex(viewableItems[0].index!);
        },
    ).current;

    const viewabilityConfig = useRef({itemVisiblePercentThreshold: 60}).current;

    const renderItem = ({item}: ListRenderItemInfo<ScreenItem>) => (
        <View style={{width, height}}>
            <ImageBackground source={item.background} style={styles.bg} resizeMode="cover">
                {/*<SafeAreaView style={styles.safe}>*/}
                {/*    <TouchableOpacity onPress={skip} hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}>*/}
                {/*        <Text style={styles.skip}>SKIP</Text>*/}
                {/*    </TouchableOpacity>*/}
                {/*</SafeAreaView>*/}

                {/*<View style={styles.portraitWrap}>*/}
                    <Image source={item.portrait} style={styles.portrait} resizeMode="contain" />
                {/*</View>*/}

                {/* Подложка-карточка с текстом */}
                <View style={styles.card}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.subtitle}>{item.subtitle}</Text>
                </View>

                {/* Индикаторы страниц */}
                <View style={styles.dotsRow}>
                    {SCREENS.map((_, i) => (
                        <View
                            key={i}
                            style={[styles.dot, i === index && styles.dotActive]}
                        />
                    ))}
                </View>

                {/* Нижняя кнопка NEXT */}
                <SafeAreaView edges={['bottom']} style={styles.bottomSafe}>
                    <TouchableOpacity style={styles.btn} activeOpacity={0.9} onPress={goNext}>
                        <View style={styles.btnInner}>
                            <Text style={styles.btnText}>NEXT</Text>
                        </View>
                    </TouchableOpacity>
                </SafeAreaView>
            </ImageBackground>
        </View>
    );

    return (
        <View style={{flex: 1, backgroundColor: '#071a3d'}}>
            <StatusBar barStyle="light-content" />
            <FlatList
                ref={listRef}
                data={SCREENS}
                keyExtractor={(it) => it.id}
                renderItem={renderItem}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                bounces={false}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
                getItemLayout={(_, i) => ({length: width, offset: width * i, index: i})}
            />
        </View>
    );
}

const BLUE = '#0f49ff';
const BLUE_DARK = '#0a2b93';
const YELLOW = '#ffd100';

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        paddingTop: 100,
        backgroundColor: '#071a3d',
    },
    safe: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    skip: {
        color: '#ffffff',
        fontFamily: 'JosefinSans-ExtraBoldItalic',
        fontWeight: '800',
        letterSpacing: 1.5,
        fontSize: 14,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 3,
    },
    portraitWrap: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 12,
    },
    portrait: {
        width: width * 0.76,
        height: height * 0.48,
        alignSelf: 'center',
    },
    card: {
        marginHorizontal: 20,
        backgroundColor: 'rgba(3, 19, 60, 0.9)',
        paddingVertical: 24,
        paddingHorizontal: 20,
        borderRadius: 20,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 4},
                shadowOpacity: 0.3,
                shadowRadius: 5,
            },
            android: {
                elevation: 8,
            },
        }),
    },
    title: {
        color: YELLOW,
        fontFamily: 'EduNSWACTCursive',
        fontSize: 24,
        fontWeight: '800',
        marginBottom: 8,
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.4)',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 3,
    },
    subtitle: {
        color: '#cfe0ff',
        fontSize: 16,
        lineHeight: 22,
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: {width: 0.5, height: 0.5},
        textShadowRadius: 1,
    },
    dotsRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
        marginTop: 16,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#284a99',
        opacity: 0.6,
        transitionProperty: 'all',
        transitionDuration: '0.3s',
    },
    dotActive: {
        width: 26,
        backgroundColor: '#ffc400',
        opacity: 1,
    },
    bottomSafe: {
        paddingHorizontal: 20,
        paddingTop: 16,
        marginTop: 30,
        paddingBottom: 10,
    },
    btn: {
        borderRadius: 30,
        width: '90%',
        alignSelf: 'center',
        overflow: 'hidden',
        ...Platform.select({
            ios: {
                shadowColor: BLUE_DARK,
                shadowOffset: {width: 0, height: 8},
                shadowOpacity: 0.8,
                shadowRadius: 15,
            },
            android: {
                elevation: 10,
            },
        }),
    },
    btnInner: {
        paddingVertical: 18,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: BLUE,
    },
    btnText: {
        color: '#ffffff',
        fontFamily: 'JosefinSans-ExtraBold',
        fontWeight: '900',
        letterSpacing: 2,
        fontSize: 18,
    },
});
