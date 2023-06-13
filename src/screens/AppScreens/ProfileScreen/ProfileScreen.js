import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { LinearGradient } from 'expo-linear-gradient';
import { Constants } from 'expo-constants';
import Svg, { Circle, Rect } from 'react-native-svg';
import { ImageBackground } from 'react-native';

const WIDTH = Dimensions.get('screen').width;
export default function ProfileScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.root}>
      {/* <LinearGradient
        locations={[0.1, 0.9]}
        colors={['#FF6b00', '#ff2900',]}
        style={styles.curvedContainer}
      >
      </LinearGradient> */}
      <ImageBackground
        source={require('../../../../assets/images/backgrounds/poly-bg.png')}
        style={styles.curvedContainer}
        borderBottomLeftRadius={90}
        borderBottomRightRadius={90}
      >
        <View style={{
          flexDirection: 'row', justifyContent: 'space-between', width: '100%',
        }}>
          <TouchableOpacity
            style={{
              // alignItems: 'center',
              // justifyContent: 'center',
              // backgroundColor: 'red'
            }}>

            <MaterialIcons name="menu" size={40} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              // alignItems: 'center',
              // justifyContent: 'center',
              // backgroundColor: 'red'
            }}>

            <MaterialIcons name="settings" size={40} color="black" />
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <View style={styles.profilePhotoRow} >
        <View style={styles.profilePhotoContainer}>
          <Image source={require('../../../../assets/images/icons/default.png')} resizeMode='contain' style={styles.profilePhoto} />
        </View>
      </View>
      <View style={styles.userNameContainer}>
        <Text style={styles.userName}>James Patrick Apolonio</Text>
        <Text style={styles.userType}>STUDENT</Text>
      </View>
      <View style={{ width: '100%', height: '100%', backgroundColor: '#0000' }}>

      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  curvedContainer: {
    width: '100%',
    height: 350,
    backgroundColor: '#FF6B05',
    padding: '2.5%',

    // justifyContent: 'space-between',
    elevation: 25,
    // borderRadius: 1000,
    borderBottomLeftRadius: 90,
    borderBottomRightRadius: 90,
    // transform: [{ scaleX: 1 }],
  },

  profilePhotoRow: {
    height: 87.5,
    width: '100%',
    alignItems: 'center',
    // backgroundColor: 'red'
  },

  profilePhotoContainer: {
    height: 175,
    width: 175,
    borderRadius: 1000,
    // borderWidth: 1,
    borderColor: '#313131',
    backgroundColor: '#313131',
    elevation: 25,
    position: 'absolute',
    // top: -87.5
    top: -100
  },

  profilePhoto: {
    height: '100%',
    width: '100%',
    borderRadius: 1000,
    marginBottom: '5%'
  },

  userNameContainer: {
    alignItems: 'center',
    // marginTop: 20
  },

  userName: {
    fontWeight: 'bold',
    color: '#313131',
    fontSize: RFPercentage(3.5),
    letterSpacing: -1.1
  },
  userType: {
    fontSize: RFPercentage(2),
    letterSpacing: -1.1
  }
})