import { Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import LoginScreen from '../screens/AuthScreens/LoginScreen/LoginScreen';
import RegisterScreen from '../screens/AuthScreens/RegisterScreen/RegisterScreen';
import DashboardScreen from '../screens/AppScreens/DashboardScreen/DashboardScreen';
import SettingsScreen from '../screens/AppScreens/SettingsScreen/SettingsScreen';
import DrawerContent from './DrawerContent';
import HomeScreen from '../screens/AppScreens/HomeScreen/HomeScreen';

import { FontAwesome5 } from '@expo/vector-icons';
import EbooksScreen from '../screens/AppScreens/EBooksScreen/EbooksScreen';
import MessagesScreen from '../screens/AppScreens/MessagesScreen/MessagesScreen';
import BillingAccountsScreen from '../screens/AppScreens/BillingAccountsScreen/BillingAccountsScreen';
import FeedbackScreen from '../screens/AppScreens/FeedbackScreen/FeedbackScreen';
import GradesScreen from '../screens/AppScreens/GradesScreen/GradesScreen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PendingTasksScreen from '../screens/AppScreens/HomeScreen/PendingTasksScreen/PendingTasksScreen';
import SubmittedTasks from '../screens/AppScreens/HomeScreen/SubmittedTasks/SubmittedTasks';
import { AuthContext } from '../context/AuthContext';
import ModulesScreen from '../screens/AppScreens/HomeScreen/ModulesScreen/ModulesScreen';
import { Avatar } from 'react-native-paper';
import { BASE_URL } from '../config';
import { useNavigation } from '@react-navigation/native';
import ProfileScreen from '../screens/AppScreens/ProfileScreen/ProfileScreen';
import AddCourseScreen from '../screens/AppScreens/HomeScreen/AddCourseScreen/AddCourseScreen';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { MaterialIcons } from '@expo/vector-icons';
import ChatsScreen from '../screens/AppScreens/HomeScreen/ChatsScreen/ChatsScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ClassmatesScreen from '../screens/AppScreens/HomeScreen/ClassmatesScreen/ClassmatesScreen';

const Stack = createNativeStackNavigator();
const RootStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const AppStack = createDrawerNavigator();
const Tab = createMaterialTopTabNavigator();
const BottomTab = createBottomTabNavigator();

export default function Navigation() {
    const { userToken, splashLoading } = useContext(AuthContext);
    if (splashLoading) {
        return (
            <SplashScreen />
        )
    }
    return (
        <RootStack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
            {!userToken ?
                <RootStack.Screen name="AuthStack" component={AuthStackNavigator} /> :
                <RootStack.Screen name="AppStack" component={AppStackNavigator} />}
        </RootStack.Navigator>
    )
}

const AuthStackNavigator = () => {
    return (
        <AuthStack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
            <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
            <AuthStack.Screen name="RegisterScreen" component={RegisterScreen} />
        </AuthStack.Navigator>
    )
}


const AppStackNavigator = () => {
    const { user } = useContext(AuthContext)
    return (
        <AppStack.Navigator useLegacyImplementation drawerContent={(props) => <DrawerContent {...props} />} screenOptions={{

            header: () => null,
            // For themes later
            headerStyle: {
                // backgroundColor:'#ff6b00',
                // borderBottomColor:'#313131',
                // borderBottomWidth: 2,
            },
            headerTitleStyle: { fontSize: 25, fontWeight: 'bold', },
            headerTitleAlign: 'center',
            drawerStyle: styles.drawerStyle,
            headerRight: () => <ProfileIcon user={user ?? null} />,
        }}
        >
            <AppStack.Screen name="HomeStack" component={HomeStack} />
            <AppStack.Screen name="DashboardStack" component={DashboardStack} options={{ headerTitle: "Dashboard" }} />
            <AppStack.Screen name="GradesStack" component={GradesStack} options={{ headerTitle: "Grades" }} />
            <AppStack.Screen name="EBooksStack" component={EBooksStack} options={{ headerTitle: "E-Books" }} />
            <AppStack.Screen name="MessagesStack" component={MessagesStack} options={{ headerTitle: "Messages" }} />
            <AppStack.Screen name="BillingAccountsStack" component={BillingAccountsStack} options={{ headerTitle: "Billing Accounts" }} />
            <AppStack.Screen name="FeedbackStack" component={FeedbackStack} options={{ headerTitle: "Feedback" }} />
            <AppStack.Screen name="ProfileStack" component={ProfileStack} options={{
                headerTitle: "Profile", headerRight: null,
                headerLeft: () => <BackButton user={user ?? null} />,

            }} />
        </AppStack.Navigator >
    )
}

const HomeStack = ({ navigation, route }) => {
    return (
        <Stack.Navigator
            screenOptions={{
                animation: 'fade',

                header: ({ route }) =>
                    <CustomHeader
                        // menu={route.name === "Chats" || route.name === "Classmates" ? false : true}
                        menu={route.name === "Courses" ? true : false}
                        title={route.name}
                        navigation={navigation}
                        rightAction={
                            route.name === "Chats" ?
                                <TouchableOpacity
                                    style={{ position: 'absolute', right: 0, marginRight: '2.5%', height: '100%', justifyContent: 'center', alignItems: 'center', }}
                                    onPress={() => { navigation.navigate("Classmates", { courseID: route.params.courseID }) }}
                                // onPress={() => console.log(route.params)}
                                >
                                    <FontAwesome5 name="users" size={24} color="black" />
                                </TouchableOpacity>
                                : null
                        }
                    />
            }}
        >
            <Stack.Screen name="Courses" component={HomeScreen} />
            <Stack.Screen name="Modules" component={ModulesScreen} />
            <Stack.Screen name="Chats" component={ChatsScreen} options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="Classmates" component={ClassmatesScreen} />
        </Stack.Navigator >
    )
}

const ChatsStack = () => {
    return (
        <BottomTab.Navigator>
            <BottomTab.Screen name="Chats" component={ChatsScreen} />
        </BottomTab.Navigator>
    )
}

const DashboardStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
        </Stack.Navigator>
    )
}

const EBooksStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="EBooksScreen" component={EbooksScreen} />
        </Stack.Navigator>
    )
}
const MessagesStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MessagesScreen" component={MessagesScreen} />
        </Stack.Navigator>
    )
}
const BillingAccountsStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="BillingAccountsScreen" component={BillingAccountsScreen} />
        </Stack.Navigator>
    )
}

const GradesStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="GradesScreen" component={GradesScreen} />
        </Stack.Navigator>
    )
}

const FeedbackStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="FeedbackScreen" component={FeedbackScreen} />
        </Stack.Navigator>
    )
}

const SettingsStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        </Stack.Navigator>
    )
}

const ProfileStack = ({ navigation }) => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            animation: 'fade',
            // header: ({ route }) =>
            //     <CustomHeader
            //         menu={false}
            //         title="My Profile"
            //         navigation={navigation}
            //     />
        }}>
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        </Stack.Navigator>
    )
}

//HEADER COMPONENTS 

const BackButton = () => {
    const navigation = useNavigation();
    const handlePress = () => {
        navigation.goBack();
    }
    return (
        <TouchableOpacity onPress={handlePress} style={{ height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'green' }}>
            <FontAwesome5 name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
    )
}

const ProfileIcon = ({ user }) => {
    const navigation = useNavigation();
    const handlePress = () => {
        navigation.navigate("AppStack", { screen: "ProfileStack" })
    }
    if (user) {
        return (
            <View style={styles.profileIcon}>
                <TouchableOpacity onPress={handlePress}>
                    <Image
                        source={require('../../assets/images/icons/default.png')}
                        // source={user.usrImage ? { uri: `${BASE_URL}/images/avatars/${user ? user.usrImage : null}` } : require('../../assets/images/icons/default.png')}
                        style={{ height: '100%', width: '100%', borderRadius: 1000 }}
                        resizeMode='cover'

                    />
                </TouchableOpacity>
            </View>
        )
    }
};

const CustomHeader = ({ title, navigation, route, menu, rightAction }) => {
    const { user } = useContext(AuthContext)
    return (
        <View
            style={{
                height: 60,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
                elevation: 15,
                borderBottomWidth: 2,
                borderBottomColor: '#313131'
            }}>

            <TouchableOpacity
                style={{
                    position: 'absolute',
                    left: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    marginLeft: '2.5%',
                    // backgroundColor:'red'
                }}
                onPress={() => {
                    menu === true ?
                        navigation.openDrawer()
                        : navigation.goBack()
                }} >
                {menu == true ?
                    <MaterialIcons name="menu" size={30} color="black" />
                    : <FontAwesome5 name="chevron-left" size={24} color="black" />


                }
            </TouchableOpacity>
            <Text style={{ fontSize: RFPercentage(2), fontSize: 25, fontWeight: 'bold', }}>
                {title}
            </Text>
            {/* {
                rightAction === false ?
                    null : rightAction == "Profile" ?
                        <ProfileIcon user={user ?? null} /> :
                        rightAction
            } */}
            {rightAction}
        </View>
    )
}


const styles = StyleSheet.create({
    drawerStyle: {
        // backgroundColor:'#FF'
        // width: '50%',
        // width: 300,
        width: '65%',
        borderBottomRightRadius: 25,
        borderRightColor: '#313131',
        borderRightWidth: 2,
        // borderTopRightRadius: 25,
        // borderColor: '#313131',
        // borderWidth: 2,
        elevation: 15,
    },

    profileIcon: {

        position: 'absolute',
        right: '2.5%',
        height: 40,
        width: 40,
        borderRadius: 1000,
        borderWidth: 1,
        borderColor: '#313131',
        // marginHorizontal: 15,
        // backgroundColor: '#ff6b00'
    }
})