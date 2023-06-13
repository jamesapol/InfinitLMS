import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState, useCallback, useRef } from 'react'
import { RFPercentage } from 'react-native-responsive-fontsize'
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from 'expo-file-system';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import moment from 'moment/moment';
import { Video } from 'expo-av';
import WebView from 'react-native-webview';
import YoutubePlayer from 'react-native-youtube-iframe'

export default function YoutubeCard({ item }) {
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

            <FontAwesome5 name="youtube" size={RFPercentage(4.9)} color="#313131" />

            <View style={{ marginLeft: '4%', flex: 1, }}>
              <Text style={{ fontSize: RFPercentage(1.75), fontWeight: 'bold' }}>

                Youtube Video
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
          <View style={{ flex: 1, width: '100%', }}>
            
            <YoutubePlayer height={300} play={false} videoId={'c3RyQxEdPmY'} onChangeState={onStateChange}  webViewStyle={{opacity: 0.99}}/>
            {/* <Video
              resizeMode='contain'
              useNativeControls
              ref={video}
              source={{ uri: 'https://www.youtube.com/watch?v=_fbq8RaKlxI&ab_channel=LatinHype'}}
              style={{ width: '100%', height: 250 }}
            /> */}


          </View>



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

  moduleOpenButton: {
    paddingHorizontal: '2.5%', paddingVertical: '2%', borderWidth: 2, elevation: 7, borderRadius: 7, margin: '1.5%', borderColor: '#313131', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF'
  },

  moduleFooter: {
    backgroundColor: '#bbb', flexDirection: 'row', justifyContent: 'flex-end', padding: '1.5%', alignItems: 'center'
  }
})