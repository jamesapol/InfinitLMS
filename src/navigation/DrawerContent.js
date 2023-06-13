import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import { Avatar, Drawer } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import tempImage from '../../assets/images/icons/male.png';
import infinitBanner from '../../assets/images/logo/infinit_logo.png';
import { AuthContext } from '../context/AuthContext'
import { BASE_URL } from '../config'
import { RFPercentage } from 'react-native-responsive-fontsize'

const DrawerContent = (props) => {
    const { user, logout } = useContext(AuthContext);
    const onHomePressed = () => {
        props.navigation.navigate("Courses");
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
    const onProfilePressed = () => {
        props.navigation.navigate("ProfileStack");
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

    const [gridView, setGridView] = useState(false);

    return (
        <View style={styles.container}>
            {/* DRAWER DESIGN 2 */}
            <DrawerContentScrollView {...props} style={styles.drawerView} >
                <View style={styles.headerContainer}>
                    <Image
                        source={require('../../assets/images/icons/default.png')}
                        size={75}
                        style={{
                            height: 75,
                            width: 75,
                            borderRadius: 1000,
                            borderColor: '#ff6b00',
                            borderWidth: 2, backgroundColor: '#313131'
                        }} />
                    {/* <Image source={{ uri: `${BASE_URL}/images/avatars/${user ? user.usrImage ? user.usrImage : tempImage : null}` }} size={75} style={{ height: 75, width: 75, borderRadius: 75 / 2, borderColor: '#ff6b00', borderWidth: 2, backgroundColor: '#313131' }} /> */}

                    <View style={{ flex: 1, height: '100%', paddingLeft: '5%', backgroundColor: '#0000' }}>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View>
                                <Text style={styles.headerName}>
                                    {user ? user.usrFirstName ?? null : null} {user ? user.usrMiddleName ?? null : null} {user ? user.usrLastName ?? null : null}
                                </Text>
                                <Text style={{ ...styles.headerDetails, display: user ? (user.usrEmail ? "flex" : "none") : null }}>{user ? user.usrEmail ?? null : null}</Text>
                                <Text style={styles.headerDetails}>
                                    +63{user ? user.usrMobile ?? null : null}
                                </Text>
                            </View>
                            {/* <View >
                                <TouchableOpacity style={{ elevation: 15, borderRadius: 200, backgroundColor:'green' }}>
                                    <FontAwesome5 name="pencil-alt" size={15} color="black" style={{ padding: 5, borderRadius: 200, backgroundColor: '#FF6b00', }} />
                                </TouchableOpacity>
                            </View> */}
                        </View>
                    </View>
                </View>
                <Drawer.Section>
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
                    <DrawerItem
                        icon={() => (
                            <Ionicons
                                name="person-circle-sharp"
                                size={24}
                                style={styles.drawerIcon}
                            />
                        )}
                        label='Profile'
                        labelStyle={styles.drawerLabel}
                        onPress={onProfilePressed}
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
        margin: 0,
        padding: 0
    },

    drawerView: {
        paddingTop: 0,
        marginTop: 0,
        // backgroundColor: '#313131'
    },

    headerContainer: {
        flexDirection: 'row',
        marginTop: -5,
        marginBottom: 25,
        // margin: 10,
        // padding: 10,
        paddingVertical: 25,
        justifyContent: 'flex-start',
        alignItems: 'center',
        // paddingBottom: 25,
        paddingHorizontal: '5%',
        backgroundColor: '#313131',
        // backgroundColor: '#FFF',
        elevation: 11,
        // backgroundColor: 'teal',
        // flexDirection: 'row'
    },

    headerName: {
        // textAlign: 'center',
        fontSize: RFPercentage(1.7),
        // marginTop: 20,
        fontWeight: 'bold',
        color: "#FFF"
    },

    headerDetails: {
        fontSize: RFPercentage(1.3),
        color: "#FFF"
    },

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



{/* DRAWER DESIGN 1 */ }
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
