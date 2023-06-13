import { Image, StyleSheet, Text, View, Dimensions, ScrollView, Animated } from 'react-native'
import LottieView from 'lottie-react-native'
import coursesSkeleton from '../../../assets/skeletons/courses-skeleton1.json'
import modulesSkeleton from '../../../assets/skeletons/modules-skeleton.json'
import chatSkeleton from '../../../assets/skeletons/chat-skeleton.json'
import chatSkeleton2 from '../../../assets/skeletons/chat-skeleton-mirror.json'
import React, { useEffect, useRef } from 'react'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { LinearGradient } from 'expo-linear-gradient';

const Skeleton = ({ visible, skeletonType }) => {
    const screenWidth = Dimensions.get('window').width;

    const animation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const startAnimation = () => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(animation, {
                        toValue: 500,
                        duration: 750,
                        useNativeDriver: false,
                    }),
                    Animated.timing(animation, {
                        toValue: 0,
                        duration: 750,
                        useNativeDriver: false,
                    })
                ])
            ).start(() => {
                animation.setValue(0);
                startAnimation();
            });
        };

        startAnimation();
    }, [animation]);

    const interpolateColors = animation.interpolate({
        inputRange: [0, 500],
        outputRange: ['#d9d9d9', '#b9b9b9'],
    });
    return (
        <View scrollEnabled={false} style={styles.container}>

            {skeletonType === 'courses' ?
                <LottieView
                    source={coursesSkeleton}
                    autoPlay
                    loop
                    speed={1.5}
                    style={{ width: screenWidth, }}
                    resizeMode='cover'
                /> :
                skeletonType === 'modules' ?
                    <>
                        <LottieView
                            source={modulesSkeleton}
                            autoPlay
                            loop
                            speed={1.5}
                            style={{ width: screenWidth, }}
                            resizeMode='cover'
                        />
                        <LottieView
                            source={modulesSkeleton}
                            autoPlay
                            loop
                            speed={1.5}
                            style={{ width: screenWidth, }}
                            resizeMode='cover'
                        />
                        <LottieView
                            source={modulesSkeleton}
                            autoPlay
                            loop
                            speed={1.5}
                            style={{ width: screenWidth, }}
                            resizeMode='cover'
                        />
                    </>
                    : skeletonType === 'chats' ?
                        <View style={{ width: '100%', flex: 1, padding: '2.5%', }}>

                            <View style={{ flexDirection: 'row', marginBottom: '2.5%' }}>
                                <Animated.View
                                    style={{
                                        height: 45,
                                        width: 45,
                                        borderRadius: 10000,
                                        backgroundColor: interpolateColors
                                    }} />
                                <View style={{ flex: 1, marginTop: '1%' }}>
                                    <Animated.View
                                        style={{
                                            backgroundColor: interpolateColors,
                                            width: '75%',
                                            height: 30,
                                            marginHorizontal: '2.5%',
                                            borderRadius: 15
                                        }} />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginBottom: '2.5%' }}>
                                <Animated.View
                                    style={{
                                        height: 45,
                                        width: 45,
                                        borderRadius: 10000,
                                        backgroundColor: interpolateColors
                                    }} />
                                <View style={{ flex: 1, marginTop: '1%' }}>
                                    <Animated.View
                                        style={{
                                            backgroundColor: interpolateColors,
                                            width: '95%',
                                            height: 120,
                                            marginHorizontal: '2.5%',
                                            borderRadius: 15
                                        }} />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginBottom: '2.5%' }}>
                                <Animated.View
                                    style={{
                                        height: 45, width: 45, borderRadius: 10000,
                                        backgroundColor: interpolateColors
                                    }} />
                                <View style={{ flex: 1, marginTop: '1%' }}>
                                    <Animated.View
                                        style={{
                                            backgroundColor: interpolateColors,
                                            width: '85%',
                                            height: 30,
                                            marginHorizontal: '2.5%',
                                            marginBottom: '1%',
                                            borderRadius: 15
                                        }} />
                                    <Animated.View
                                        style={{
                                            backgroundColor: interpolateColors,
                                            width: '80%',
                                            height: 30,
                                            marginHorizontal: '2.5%',
                                            borderRadius: 15
                                        }} />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row-reverse', marginBottom: '2.5%' }}>
                                <Animated.View
                                    style={{
                                        height: 45,
                                        width: 45,
                                        borderRadius: 10000,
                                        backgroundColor: interpolateColors
                                    }} />
                                <View style={{ flex: 1, marginTop: '1%', alignItems: 'flex-end' }}>
                                    <Animated.View
                                        style={{
                                            backgroundColor: interpolateColors,
                                            width: '55%',
                                            height: 30,
                                            marginHorizontal: '2.5%',
                                            marginBottom: '1%',
                                            borderRadius: 15
                                        }} />

                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', marginBottom: '2.5%' }}>
                                <Animated.View
                                    style={{
                                        height: 45, width: 45, borderRadius: 10000,
                                        backgroundColor: interpolateColors
                                    }} />
                                <View style={{ flex: 1, marginTop: '1%' }}>

                                    <Animated.View
                                        style={{
                                            backgroundColor: interpolateColors,
                                            width: 250,
                                            height: 30,
                                            marginHorizontal: '2.5%',
                                            marginBottom: '1%',
                                            borderRadius: 15
                                        }} />
                                    <Animated.View
                                        style={{
                                            backgroundColor: interpolateColors,
                                            width: '25%',
                                            height: 30,
                                            marginHorizontal: '2.5%',
                                            marginBottom: '1%',
                                            borderRadius: 15
                                        }} />
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', marginBottom: '2.5%' }}>
                                <Animated.View
                                    style={{
                                        height: 45, width: 45, borderRadius: 10000,
                                        backgroundColor: interpolateColors
                                    }} />
                                <View style={{ flex: 1, marginTop: '1%' }}>
                                    <Animated.View
                                        style={{
                                            backgroundColor: interpolateColors,
                                            width: '95%',
                                            height: 60,
                                            marginHorizontal: '2.5%',
                                            borderRadius: 15
                                        }} />

                                </View>
                            </View>

                            <View style={{ flexDirection: 'row-reverse', marginBottom: '2.5%' }}>
                                <Animated.View
                                    style={{
                                        height: 45,
                                        width: 45,
                                        borderRadius: 10000,
                                        backgroundColor: interpolateColors
                                    }} />
                                <View style={{ flex: 1, marginTop: '1%', alignItems: 'flex-end' }}>
                                    <Animated.View
                                        style={{
                                            backgroundColor: interpolateColors,
                                            width: '80%',
                                            height: 30,
                                            marginHorizontal: '2.5%',
                                            marginBottom: '1%',
                                            borderRadius: 15
                                        }} />

                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginBottom: '2.5%' }}>
                                <Animated.View
                                    style={{
                                        height: 45,
                                        width: 45,
                                        borderRadius: 10000,
                                        backgroundColor: interpolateColors
                                    }} />
                                <View style={{ flex: 1, marginTop: '1%' }}>
                                    <Animated.View
                                        style={{
                                            backgroundColor: interpolateColors,
                                            width: '75%',
                                            height: 30,
                                            marginHorizontal: '2.5%',
                                            borderRadius: 15
                                        }} />

                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginBottom: '2.5%' }}>
                                <Animated.View
                                    style={{
                                        height: 45,
                                        width: 45,
                                        borderRadius: 10000,
                                        backgroundColor: interpolateColors
                                    }} />
                                <View style={{ flex: 1, marginTop: '1%' }}>
                                    <Animated.View
                                        style={{
                                            backgroundColor: interpolateColors,
                                            width: '95%',
                                            height: 120,
                                            marginHorizontal: '2.5%',
                                            borderRadius: 15
                                        }} />

                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginBottom: '2.5%' }}>
                                <Animated.View
                                    style={{
                                        height: 45, width: 45, borderRadius: 10000,
                                        backgroundColor: interpolateColors
                                    }} />
                                <View style={{ flex: 1, marginTop: '1%' }}>
                                    <Animated.View
                                        style={{
                                            backgroundColor: interpolateColors,
                                            width: '85%',
                                            height: 30,
                                            marginHorizontal: '2.5%',
                                            marginBottom: '1%',
                                            borderRadius: 15
                                        }} />
                                    <Animated.View
                                        style={{
                                            backgroundColor: interpolateColors,
                                            width: '50%',
                                            height: 30,
                                            marginHorizontal: '2.5%',
                                            marginBottom: '1%',
                                            borderRadius: 15
                                        }} />
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', marginBottom: '2.5%' }}>
                                <Animated.View
                                    style={{
                                        height: 45,
                                        width: 45,
                                        borderRadius: 10000,
                                        backgroundColor: interpolateColors
                                    }} />
                                <View style={{ flex: 1, marginTop: '1%' }}>
                                    <Animated.View
                                        style={{
                                            backgroundColor: interpolateColors,
                                            width: '75%',
                                            height: 30,
                                            marginHorizontal: '2.5%',
                                            borderRadius: 15
                                        }} />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginBottom: '2.5%' }}>
                                <Animated.View
                                    style={{
                                        height: 45,
                                        width: 45,
                                        borderRadius: 10000,
                                        backgroundColor: interpolateColors
                                    }} />
                                <View style={{ flex: 1, marginTop: '1%' }}>
                                    <Animated.View
                                        style={{
                                            backgroundColor: interpolateColors,
                                            width: '95%',
                                            height: 120,
                                            marginHorizontal: '2.5%',
                                            borderRadius: 15
                                        }} />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginBottom: '2.5%' }}>
                                <Animated.View
                                    style={{
                                        height: 45, width: 45, borderRadius: 10000,
                                        backgroundColor: interpolateColors
                                    }} />
                                <View style={{ flex: 1, marginTop: '1%' }}>
                                    <Animated.View
                                        style={{
                                            backgroundColor: interpolateColors,
                                            width: '85%',
                                            height: 30,
                                            marginHorizontal: '2.5%',
                                            marginBottom: '1%',
                                            borderRadius: 15
                                        }} />
                                    <Animated.View
                                        style={{
                                            backgroundColor: interpolateColors,
                                            width: '80%',
                                            height: 30,
                                            marginHorizontal: '2.5%',
                                            borderRadius: 15
                                        }} />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row-reverse', marginBottom: '2.5%' }}>
                                <Animated.View
                                    style={{
                                        height: 45,
                                        width: 45,
                                        borderRadius: 10000,
                                        backgroundColor: interpolateColors
                                    }} />
                                <View style={{ flex: 1, marginTop: '1%', alignItems: 'flex-end' }}>
                                    <Animated.View
                                        style={{
                                            backgroundColor: interpolateColors,
                                            width: '55%',
                                            height: 30,
                                            marginHorizontal: '2.5%',
                                            marginBottom: '1%',
                                            borderRadius: 15
                                        }} />

                                </View>
                            </View>



                        </View>

                        : null
            }

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        // marginHorizontal: '2.5%',
        // backgroundColor: 'blue'
    },
    animationContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '20%',
    },
    animation: {
        flex: 1,
        width: '100%',
        height: RFPercentage(50),
    },
});

export default Skeleton;
