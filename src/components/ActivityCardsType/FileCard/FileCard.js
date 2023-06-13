import { StyleSheet, Text, View, TouchableOpacity, Vibration, Modal } from 'react-native'
import React, { useState } from 'react'
import { RFPercentage } from 'react-native-responsive-fontsize'
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from 'expo-file-system';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { shareAsync } from 'expo-sharing';
import moment from 'moment/moment';

import * as Sharing from 'expo-sharing';

import * as WebBrowser from "expo-web-browser";
import { BASE_URL } from '../../../config';
import ErrorModal from '../../Modals/ErrorModal/ErrorModal';


export default function FileCard({ item, onDownloadPressed, errorModal }) {

  const [errorModalVisible, setErrorModalVisible] = useState(true);



  // KUNG OKAY LANG KAY SIR NA SA BROWSER I-DOWNLOAD ANG FILES
  // const openFile = async (fileID) => {
  //   try {
  //     // await WebBrowser.openBrowserAsync(`${BASE_URL}/files/activities/${fileID}`)
  //     await WebBrowser.openBrowserAsync(`https://www.infinit-lms.com/files/activities/1.pdf`)
  //   } catch (error) {
  //     console.warn("Broken Links");
  //   }
  // }

  // PAG GUSTO NI SIR NA SA APP LANG MISMO
  const downloadFile = async (file, fileName) => {
    const result = await FileSystem.downloadAsync(
      `${BASE_URL}/files/activities/${file}`,
      FileSystem.documentDirectory + file
    );
    console.log(result)
    if (result.status === 404) {
      // errorModal(true)
    } else if (result.status === 200) {
      save(result.uri, file, result.headers["Content-type"] || result.headers["Content-Type"] || result.headers["content-type"]);
    }
  }

  const save = async (uri, fileName, mimeType) => {
    console.log(uri + fileName + mimeType);
    const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (permissions.granted) {
      const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
      await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, fileName, mimeType)
        .then(async (uri) => {
          await FileSystem.writeAsStringAsync(uri, base64, { encoding: FileSystem.EncodingType.Base64 });
        }).catch(e => {
          console.log(e)
        });
    }
  }


  return (
    <View style={styles.moduleCardContainer}>

      {/* <Modal
        animationType='fade'
        transparent
        onRequestClose={() => { setErrorModalVisible(false) }}
        visible={errorModalVisible}
      >
        <ErrorModal
        />
      </Modal> */}


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

            {item.actFileIcon === 'far fa-file-powerpoint' ?
              <FontAwesome5 name="file-powerpoint" size={RFPercentage(7)} color="#313131" />
              : item.actFileIcon === 'far fa-file-pdf' ?
                <FontAwesome5 name="file-pdf" size={RFPercentage(7)} color="#313131" />
                : item.actFileIcon === 'far fa-file-word' ?
                  <FontAwesome5 name="file-word" size={RFPercentage(7)} color="#313131" />
                  : null}
            <View style={{ marginLeft: '4%', flex: 1, justifyContent: 'space-between' }}>
              <View>
                <Text style={{ fontSize: RFPercentage(1.75), fontWeight: 'bold' }}>
                  {item.actFileType}
                </Text>
                {item.actDescription ?
                  <View style={{ width: '90%', flex: 1 }}>
                    {/* 
                    <WebView    
                    
                        style={{flex: 1, width: '100%'}}
                        minimumFontSize={46}
                        // originWhitelist={['*']}
                        source={{ html: item.actDescription,  }}
                    /> */}
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
              <View style={{ marginTop: '2.5%' }}>
                <Text style={{ fontSize: RFPercentage(1.3) }}>
                  {item.actHasDeadline === 1 ?
                    <Text style={{ fontWeight: 'bold', }}>
                      Due Date:{" "}
                      moment(item.actDateEnd).format('MMMM D, YYYY, h:mm A')
                    </Text> : null}
                </Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.moduleOpenButton}
            onPress={onDownloadPressed}
          // onPress={() => { downloadFile(item.actFile, item.actTitle) }}
          >
            {/* <FontAwesome5 name="download" size={RFPercentage(2)} color="#ff6b00" /> */}
            <Text style={{ fontSize: RFPercentage(1.3), fontWeight: 'bold', }}>
              Download File
            </Text>
          </TouchableOpacity>
        </>



      </View>


      {/* footer */}
      <View style={styles.moduleFooter}>
        <Text style={{ fontSize: RFPercentage(1.3) }}>
          {moment(item.actDateCreated).fromNow()}{" "}
          <MaterialCommunityIcons name="clock" size={RFPercentage(1.5)} color="#313131" />
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
    paddingHorizontal: '2.5%', paddingVertical: '2%', borderWidth: 2, elevation: 7, borderRadius: 7, margin: '1.5%', borderColor: '#313131', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF', alignSelf: 'flex-end'
  },

  moduleFooter: {
    backgroundColor: '#bbb', flexDirection: 'row', justifyContent: 'flex-end', padding: '1.5%', alignItems: 'center'
  }
})