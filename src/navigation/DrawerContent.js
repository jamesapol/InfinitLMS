import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import { Avatar, Drawer } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import tempImage from '../../assets/images/icons/male.png';
import infinitBanner from '../../assets/images/logo/infinit_logo.png';
import { AuthContext } from '../context/AuthContext'
import { BASE_URL } from '../config'
import { RFPercentage } from 'react-native-responsive-fontsize'

const DrawerContent = (props) => {
    const { user, logout } = useContext(AuthContext);
    const onHomePressed = () => {
        props.navigation.navigate("HomeStack");
    }
    const onDashboardPressed = () => {
        props.navigation.navigate("DashboardStack");
    }
    const onEBooksPressed = () => {
        props.navigation.navigate("EBooksStack");
    }
    const onMessagesPressed = () => {
        props.navigation.navigate("MessagesStack");
    }
    const onBillingAccountsPressed = () => {
        props.navigation.navigate("BillingAccountsStack");
    }
    const onFeedbackPressed = () => {
        props.navigation.navigate("FeedbackStack");
    }
    const onSettingsPressed = () => {
        props.navigation.navigate("GradesStack");
    }
    const onGradesPressed = () => {
        props.navigation.navigate("GradesStack");
    }

    const onLogoutPressed = () => {
        props.navigation.navigate("AuthStack", { screen: "LoginScreen" })
        console.log("Logout")
    }

    const drawerData = [
        { id: '1', title: 'Home', icon: 'home' },
        { id: '2', title: 'Grades', icon: 'ios-book' },
        { id: '3', title: 'E-Books', icon: 'library' },
        { id: '4', title: 'Messages', icon: 'mail' },
        { id: '5', title: 'Billing Accounts', icon: 'card' },
        { id: '6', title: 'Feedback', icon: 'chatbox-ellipses' },
        // { id: '7', title: 'Item 7' },
        // { id: '8', title: 'Item 8' },
        // { id: '9', title: 'Item 9' },
        // { id: '10', title: 'Item 10' },
    ]

    const [gridView, setGridView] = useState(false);

    return (
        <View style={styles.container}>
            {/* DRAWER DESIGN 1 */}
            {/* <FlatList
                contentContainerStyle={{ flexGrow: 1, paddingVertical: 10, paddingHorizontal: 10 }}
                data={drawerData}
                numColumns={2}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={(
                    <View style={{ ...styles.headerContainer }}>
                        <Avatar.Image source={{ uri: `${BASE_URL}/images/avatars/${user ? user.usrImage ? user.usrImage : tempImage : null}` }} size={75} style={{ backgroundColor: '#313131' }} />
                    
                        <Text style={styles.headerName}>{user ? user.usrFirstName ?? null : null} {user ? user.usrMiddleName ?? null : null} {user ? user.usrLastName ?? null : null}</Text>
                        <Text style={{ ...styles.headerDetails, display: user ? (user.usrEmail ? "flex" : "none") : null }}>{user ? user.usrEmail ?? null : null}</Text>
                        <Text style={styles.headerDetails}>{user ? user.usrMobile ?? null : null}</Text>
                    </View>
                )}
                ListFooterComponent={(
                    <>
                        <View style={{ height: 1, width: '90%', backgroundColor: '#515151', marginTop: 25, alignSelf: 'center', }}>

                        </View>

                        <TouchableOpacity
                            onPress={logout}
                            style={{
                                flexDirection: 'row',
                                // backgroundColor: '#313131',
                                borderRadius: 15,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flex: 1,
                                margin: 5,
                                marginTop: 30,
                                height: 50,
                                borderColor: '#ff6b00',
                                backgroundColor: '#fff',
                                borderWidth: 2,
                                elevation: 7,
                            }}>
                            <Ionicons name="log-out" size={24} color="#ff6b00" />
                            <Text style={{ ...styles.drawerLabel, marginLeft: 5 }}>Logout</Text>
                        </TouchableOpacity>
                    </>
                )}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                if (item.id == 1) {
                                    onHomePressed()
                                } else if (item.id == 2) {
                                    onGradesPressed()
                                } else if (item.id == 3) {
                                    onEBooksPressed()
                                } else if (item.id == 4) {
                                    onMessagesPressed()
                                } else if (item.id == 5) {
                                    onBillingAccountsPressed()
                                } else if (item.id == 6) {
                                    onFeedbackPressed()
                                }
                            }}
                            style={{
                                // backgroundColor: '#313131',
                                borderRadius: 15,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flex: 1,
                                margin: 5,
                                height: 100,
                                borderColor: '#ff6b00',
                                backgroundColor: '#fff',
                                borderWidth: 2,
                                elevation: 7,
                            }}>

                            <Ionicons name={item.icon} size={24} color="#ff6b00" />
                            <Text style={{ ...styles.drawerLabel, marginTop: 5 }}>{item.title}</Text>
                        </TouchableOpacity>
                    )
                }}
            /> */}

            {/* DRAWER DESIGN 2 */}
            <DrawerContentScrollView {...props} style={styles.drawerView} >
                <Drawer.Section>
                    <View style={{ ...styles.headerContainer }}>
                        <Image source={{ uri: `${BASE_URL}/images/avatars/${user ? user.usrImage ? user.usrImage : tempImage : null}` }} size={75} style={{ height: 75, width: 75, borderRadius: 75 / 2, backgroundColor: '#313131' }} />

                        <Text style={styles.headerName}>
                            {user ? user.usrFirstName ?? null : null} {user ? user.usrMiddleName ?? null : null} {user ? user.usrLastName ?? null : null}
                        </Text>
                        <Text style={{ ...styles.headerDetails, display: user ? (user.usrEmail ? "flex" : "none") : null }}>{user ? user.usrEmail ?? null : null}</Text>
                        <Text style={styles.headerDetails}>
                            {user ? user.usrMobile ?? null : null}
                        </Text>
                    </View>
                    <DrawerItem
                        icon={() => (
                            <Ionicons
                                name="home"
                                size={24}
                                style={styles.drawerIcon}
                            />
                        )}
                        label='Home'
                        labelStyle={styles.drawerLabel}
                        onPress={onHomePressed}
                    />
                    <DrawerItem
                        icon={() => (
                            <Ionicons
                                name="ios-book"
                                size={24}
                                style={styles.drawerIcon}
                            />
                        )}
                        label='Grades'
                        labelStyle={styles.drawerLabel}
                        onPress={onGradesPressed}
                    />
                    <DrawerItem
                        icon={() => (
                            <Ionicons
                                name="library"
                                size={24}
                                style={styles.drawerIcon}
                            />
                        )}
                        label='E-Books'
                        labelStyle={styles.drawerLabel}
                        onPress={onEBooksPressed}
                    />
                    <DrawerItem
                        icon={() => (
                            <Ionicons
                                name="mail"
                                size={24}
                                style={styles.drawerIcon}
                            />
                        )}
                        label='Messages'
                        labelStyle={styles.drawerLabel}
                        onPress={onMessagesPressed}
                    />
                    <DrawerItem
                        icon={() => (
                            <Ionicons
                                name="card"
                                size={24}
                                style={styles.drawerIcon}
                            />
                        )}
                        label='Billing Accounts'
                        labelStyle={styles.drawerLabel}
                        onPress={onBillingAccountsPressed}
                    />
                    <DrawerItem
                        icon={() => (
                            <Ionicons
                                name="chatbox-ellipses"
                                size={24}
                                style={styles.drawerIcon}
                            />
                        )}
                        label='Feedback'
                        labelStyle={styles.drawerLabel}
                        onPress={onFeedbackPressed}
                    />
                </Drawer.Section>
                <DrawerItem
                    icon={() => (
                        <Ionicons
                            name="log-out"
                            size={24}
                            style={styles.drawerIcon}
                        />
                    )}
                    label='Logout'
                    labelStyle={styles.drawerLabel}
                    onPress={logout}
                />
            </DrawerContentScrollView>
        </View>
    )
}

export default DrawerContent

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    drawerView: {
        paddingTop: 0,
        // backgroundColor: '#313131'
    },

    headerContainer: {
        // marginTop: -25,
        // margin: 10,
        // padding: 10,
        // marginTop: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25,
        paddingHorizontal: '5%'
        // backgroundColor: 'teal',
        // flexDirection: 'row'
    },

    headerName: {
        textAlign: 'center',
        fontSize: RFPercentage(2),
        marginTop: 20,
        fontWeight: 'bold'
    },

    headerDetails: { fontSize: RFPercentage(1.6), },

    drawerIcon: {
        color: '#FF6B00',
        alignItems: 'center'
    },

    drawerLabel: {
        // textAlign: 'center',
        // color: '#ff6b00',
        fontSize: RFPercentage(1.5),
        color: '#313131',
        flex: 1,
        flexWrap: 'wrap'
    },

    drawerLabel2: {
        // fontFamily: 'Segoe UI',
        textAlign: 'center',
        marginTop: 5,
        fontSize: 16,
        color: '#ff6b00'
    }

})