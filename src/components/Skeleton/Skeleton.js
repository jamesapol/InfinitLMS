import { Image, StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native'
import LottieView from 'lottie-react-native'
import coursesSkeleton from '../../../assets/skeletons/courses-skeleton1.json'
import modulesSkeleton from '../../../assets/skeletons/modules-skeleton.json'
import React from 'react'
import { RFPercentage } from 'react-native-responsive-fontsize'

const Skeleton = ({ visible, skeletonType }) => {
    const screenWidth = Dimensions.get('window').width;

    return (
        <View scrollEnabled={false} contentContainerStyle={styles.container}>
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
                    : null
            }

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        marginHorizontal: '2.5%',
        justifyContent: 'center',
        alignItems: 'center',
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
