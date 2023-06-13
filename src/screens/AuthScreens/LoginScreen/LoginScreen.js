import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import infinitBanner from '../../../../assets/images/logo/lms-banner-white.png'
import CustomInput from '../../../components/CustomInput/CustomInput'
import CustomButton from '../../../components/CustomButton/CustomButton';
import { Ionicons } from '@expo/vector-icons';
import WarningModal from '../../../components/Modals/WarningModal/WarningModal';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../../context/AuthContext';
import { Button } from 'react-native-paper';


export default function LoginScreen() {
    const { login, loginLoading, loginErrorVisible, setLoginErrorVisible } = useContext(AuthContext);
    const [passwordHidden, setPasswordHidden] = useState(true);
    const [invalidCredentialsModalVisible, setInvalidCredentialsModalVisible] = useState(true);
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const navigation = useNavigation()
    const toggleVisibility = () => {
        setPasswordHidden(!passwordHidden)
    }
    const onLoginPressed = () => {
        login(username, password);
        // console.log(username)
        // login()
        // navigation.navigate("AppStack", { screen: "DashboardStack" })
    }


    return (
        <View style={styles.root}>
            {/* <Modal style={{ }} transparent visible={invalidCredentialsModalVisible}>
                <WarningModal />
            </Modal> */}
            <View style={styles.bannerContainer}>
                <Image source={infinitBanner} resizeMode='contain' style={styles.banner} />
            </View>
            <View style={styles.loginContainer}>
                <Text style={styles.labels}>Username</Text>
                <CustomInput
                    value={username}
                    onChangeText={(text) => {
                        setUsername(text);
                        if (loginErrorVisible) {
                            setLoginErrorVisible(false);
                        }
                    }}
                    autoFocus={true}
                />
                <Text style={styles.labels}>Password</Text>
                <CustomInput
                    value={password}
                    onChangeText={(text) => {
                        setPassword(text);
                        if (loginErrorVisible) {
                            setLoginErrorVisible(false);
                        }
                    }}
                    secureTextEntry={passwordHidden}
                    child={
                        <TouchableOpacity onPress={toggleVisibility} style={{ paddingHorizontal: '1%' }}>
                            <Ionicons name={passwordHidden ? "eye-off" : "eye"} size={32} color="#FF6B00" />
                        </TouchableOpacity>
                    }
                />
                <View style={{ paddingTop: 0, height: '5%', width: '100%', alignItems: 'flex-end', }}>
                    <Text style={{ paddingRight: 5, fontSize: 16, fontWeight: 'bold', color: 'red', display: loginErrorVisible ? 'flex' : 'none' }}>Invalid Credentials</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                    <CustomButton
                        loading={loginLoading}
                        onPress={onLoginPressed}
                        text="Login"
                    />
                    {/* <Button mode="contained" onPress={() => console.log('Pressed')} style={{ width: '100%', }} loading={loginLoading} onPressIn={onLoginPressed} buttonColor='#ff6b00'>
                        {!loginLoading ? "Login" : null}
                    </Button> */}
                    <Text style={styles.forgotPassword} >Forgot Password?</Text>
                </View>
            </View>
            {/* <Text>LoginScreen</Text> */}
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fd'
    },

    bannerContainer: {
        height: '25%',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#323232',
        paddingHorizontal: '15%'
    },

    banner: {
        height: '35%',
        width: '100%'
    },

    loginContainer: {
        height: '75%',
        width: '100%',
        flexDirection: 'column',
        paddingHorizontal: '5%',
        paddingTop: '2.5%',
    },

    labels: {
        paddingTop: '2.5%',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#313131'
    },

    forgotPassword: {
        fontSize: 16,
        fontWeight: '900',
        color: '#FF6b00',
        alignSelf: 'center',
        paddingTop: 15
    }

})