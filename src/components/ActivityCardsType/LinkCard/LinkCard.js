import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState, useCallback, useRef } from 'react'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import moment from 'moment/moment';
import * as Linking from 'expo-linking';

export default function LinkCard({ item }) {
  const [playing, setPlaying] = useState(false)

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("Video finished");
    }
  }, [])

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, [])

  return (
    <View style={styles.moduleCardContainer}>

      {/* header */}
      <View style={styles.moduleCardHeader}>
        <Text style={{ fontSize: RFPercentage(1.7), fontWeight: 'bold', color: "#FFF" }}>
          {`${item.actTitle}`}
        </Text>
      </View>

      {/* body */}
      <View style={{ padding: '2.5%', alignItems: 'flex-start' }}>
        <>
          <View style={{ flexDirection: 'row', justifyContent: 'center', borderRadius: 7, paddingHorizontal: '2%', }}>

            <FontAwesome5 name="link" size={RFPercentage(4.9)} color="#313131" />

            <View style={{ marginLeft: '4%', flex: 1, }}>
              <Text style={{ fontSize: RFPercentage(1.75), fontWeight: 'bold' }}>
                Link
              </Text>
              {item.actDescription ?
                <View style={{ width: '90%', flex: 1 }}>

                  <Text>
                    {item.actDescription}
                  </Text>
                </View>
                :
                <View style={{ width: '90%' }}>
                  <Text>
                    No description.
                  </Text>
                </View>}
            </View>
          </View>

          <TouchableOpacity style={styles.linkButton}
            onPress={() => {
              if (Linking.canOpenURL(item.actLink)) {
                Linking.openURL(item.actLink)
              } else {
                
              }
            }}
          >
            <Text style={{ textDecorationLine: 'underline', color: '#005', fontSize: RFPercentage(1.3) }} numberOfLines={2}>
              {item.actLink}
            </Text>
          </TouchableOpacity>
        </>
      </View>


      {/* footer */}
      <View style={{ backgroundColor: '#bbb', flexDirection: 'row', justifyContent: 'flex-end', padding: '1.5%', alignItems: 'center', }}>
        <Text style={{ fontSize: RFPercentage(1.3) }}>
          {moment(item.actDateCreated).fromNow()}{" "}
          <MaterialCommunityIcons name="clock" size={RFPercentage(1.5)} color="#313131" />
        </Text>
        <Text>
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  moduleCardContainer: {
    flex: 1, justifyContent: 'center', marginBottom: '5%', backgroundColor: '#FFF', elevation: 4
  },

  moduleCardHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: '2.5%', paddingVertical: '1.5%', backgroundColor: '#313131',
  },

  moduleViewButtons: {
    paddingHorizontal: '2.5%', width: '15%', paddingVertical: '1%', borderWidth: 2, elevation: 7, borderRadius: 7, margin: '1.5%', borderColor: '#313131', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF'
  },

  linkButton: {
    paddingHorizontal: '2.5%', paddingVertical: '2%', borderWidth: 2, elevation: 7, borderRadius: 7, borderColor: '#313131', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF', width: '100%', marginTop: '5%'
  },

  moduleFooter: {
    backgroundColor: '#bbb', flexDirection: 'row', justifyContent: 'flex-end', padding: '1.5%', alignItems: 'center'
  }
})