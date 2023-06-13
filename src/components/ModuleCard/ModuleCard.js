import { FlatList, Modal, ImageBackground, StyleSheet, Text, TouchableOpacity, View, TouchableWithoutFeedback } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react'
import { RFPercentage } from 'react-native-responsive-fontsize';
import moment from 'moment/moment';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from 'expo-file-system';
import AssignmentModal from '../AssignmentModal/AssignmentModal';
import { WebView } from 'react-native-webview';
import { MaterialIcons } from '@expo/vector-icons';
import AssignmentCard from '../ActivityCardsType/AssignmentCard/AssignmentCard';
import YoutubeCard from '../ActivityCardsType/YoutubeCard/YoutubeCard';
import FileCard from '../ActivityCardsType/FileCard/FileCard';
import { BASE_URL } from '../../config';
import ErrorModal from '../Modals/ErrorModal/ErrorModal';
import FacebookCard from '../ActivityCardsType/FacebookCard/FacebookCard';
import TextCard from '../ActivityCardsType/TextCard/TextCard';
import LinkCard from '../ActivityCardsType/LinkCard/LinkCard';

export default function ModuleCard({
  item,
}) {
  const [assignmentModalVisible, setAssignmentModalVisible] = useState(false)

  //for assignment title, description and id
  const [actTitle, setActTitle] = useState();
  const [actDescription, setActDescription] = useState();
  const [actID, setActID] = useState();
  const [actUUID, setActUUID] = useState();
  const [actDateCreated, setActDateCreated] = useState();
  const [actDueDate, setActDueDate] = useState();

  const [downloading, setDownloading] = useState(false);

  const [fileURI, setFileURI] = useState();
  const [fileSize, setFileSize] = useState();
  const [fileName, setFileName] = useState();
  const [fileType, setFileType] = useState();

  const [errorModalVisible, setErrorModalVisible] = useState(false);

  ///////////////////////////////////////////////////////////////////////
  //
  //FOR FILE UPLOADS
  //
  ///////////////////////////////////////////////////////////////////////
  const selectPDF = async () => {

    let result = await DocumentPicker.getDocumentAsync({
      // type: ["image/jpeg", "image/png", "application/pdf"],
      // type: ["application/msword", "application/docx"],
      // type: ["application/pptx"],
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });
    console.log(result);
    if (result.uri) {
      const fileInfo = await FileSystem.getInfoAsync(result.uri);
      if (fileInfo.size >= 5000000) {
        // setFileSizeErrorModalVisible(true);
      } else {
        setFileURI(result.uri);
        setFileSize(result.size);
        setFileName(result.name);
        setFileType(result.mimeType);
        setAssignmentModalVisible(true);
      }
    }
  };

  const removeFile = () => {
    setFileURI();
    setFileSize();
    setFileName();
    setFileType();
  }
  ///////////////////////////////////////////////////////////////////////


  ///////////////////////////////////////////////////////////////////////
  //
  //FOR FILE DOWNLOADS
  //
  ///////////////////////////////////////////////////////////////////////
  const downloadFile = async (file, fileName) => {
    const result = await FileSystem.downloadAsync(
      `${BASE_URL}/files/activities/${file}`,
      FileSystem.documentDirectory + file
    );
    console.log(result)
    if (result.status === 404) {
      // onDownloadError(true);
      setErrorModalVisible(true);
      // console.warn("Not found")
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
  // const downloadFile = async (fileName) => {
  //   const result = await FileSystem.downloadAsync(
  //     `https://www.infinit-lms.com/files/activities/${fileName}`,
  //     FileSystem.documentDirectory + fileName,
  //   )
  // }
  ///////////////////////////////////////////////////////////////////////

  const closeAssignmentModal = () => {
    setAssignmentModalVisible(false)
    removeFile();
  }

  const handleErrorModal = (val) => {
    setErrorModalVisible(val);
  }

  const closeErrorModal = () => {
    setErrorModalVisible(false)
  }


  return (
    <View>
      <Modal
        animationType='fade'
        transparent
        onRequestClose={closeAssignmentModal}
        visible={assignmentModalVisible}
      >
        <AssignmentModal
          fileName={fileName}
          actTitle={actTitle}
          actUuid={actUUID}
          onClosePressed={closeAssignmentModal}
          onOutsidePress={() => { setAssignmentModalVisible(false) }}
        />
      </Modal>

      <Modal
        animationType='fade'
        transparent
        onRequestClose={closeErrorModal}
        visible={errorModalVisible}
      >
        <TouchableOpacity
          onPress={closeErrorModal}
          activeOpacity={1}
          style={{ backgroundColor: "#0000", flex: 1 }}>

          <ErrorModal
          />
        </TouchableOpacity>
      </Modal>


      <FlatList
        key={Math.random()}
        // numColumns={2}
        data={item}
        keyExtractor={(item) => `${item.actID}`}
        renderItem={({ item, index }) => (
          <View style={{ paddingHorizontal: '2.5%' }}>

            {item.typID === 1 ?
              <AssignmentCard
                item={item}
                onPress={() => {
                  selectPDF()
                  setActTitle(item.actTitle)
                }} />
              : item.typID ===2 ?
                <LinkCard item={item} />
                : (item.typID === 3 || item.typID === 14) ?
                  <FileCard onDownloadPressed={() => { downloadFile(item.actFile) }} item={item} />
                  : item.typID === 4 ?
                    <TextCard item={item} />
                    : item.typID === 5 ?
                      <YoutubeCard item={item} />
                      : item.typID === 6 ?
                        <FacebookCard item={item} />
                        : null
            }
          </ View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  moduleCardContainer: {
    flex: 1, justifyContent: 'center', marginBottom: '5%', backgroundColor: '#FFF', elevation: 4
  },

  moduleCardHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: '2.5%', paddingVertical: '1.5%', backgroundColor: '#313131',
  }
})


{/* <View style={{ height: 1, marginVertical: '1%', width: '100%', backgroundColor: '#313131' }} /> */ }
{/* <Text style={{ fontSize: RFPercentage(1.3) }}>
    Due Date:
    <Text style={{ fontWeight: 'bold', }}>
        {" "}{moment(item.actDateEnd).format('MMMM D, YYYY, h:m A')}
    </Text>
</Text> */}


{/* <View style={{ width: '100%', elevation: 7, backgroundColor: '#fff', padding: '2.5%', marginBottom: '2.5%', borderRadius: 7, borderWidth: 2, borderColor: '#dc3545' }}>
    
                                        </View> */}
{/* <Text style={{ fontSize: RFPercentage(1.75), fontWeight: 'bold', marginBottom: '2.5%' }}>
                                            <MaterialIcons name="assignment" size={24} color="black" />Assignment
                                        </Text>
                                        {item.actDescription ?
                                            <View style={{ width: '90%' }}>
                                                <Text style={{ fontSize: RFPercentage(1.1) }}>
                                                    {item.actDescription}
                                                </Text>
                                            </View>
                                            : null}
                                        <View style={{ justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingVertical: '2.5%', marginTop: '2.5%' }}>
                                            <View style={{ flex: 1, maxWidth: '75%', height: '100%', }}>
                                                {fileName ?
                                                    <Text numberOfLines={2}>
                                                        {fileName}
                                                    </Text>
                                                    : null}
                                            </View>
                                            <View style={{ flexDirection: 'row' }}>
                                                {fileURI ?
                                                    <TouchableOpacity style={{ marginRight: '1%', marginTop: '2.5%', paddingHorizontal: '2.5%', width: '15%', paddingVertical: '1%', borderWidth: 2, elevation: 7, borderRadius: 7, borderColor: '#313131', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF' }}
                                                        onPress={removeFile}
                                                    >
                                                        <Text>
                                                            <MaterialCommunityIcons name="file-remove" size={RFPercentage(2)} color="red" />
                                                        </Text>
                                                    </TouchableOpacity> : null}
                                                <TouchableOpacity style={{ marginLeft: fileURI ? '1%' : 0, marginTop: '2.5%', paddingHorizontal: '2.5%', width: '15%', paddingVertical: '1%', borderWidth: 2, elevation: 7, borderRadius: 7, borderColor: '#313131', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF' }}
                                                    onPress={selectPDF}
                                                >
                                                    <Text>
                                                        <FontAwesome5 name="upload" size={RFPercentage(2)} color="#ff6b00" />
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        {fileURI ?
                                            <View style={{ marginTop: '2.5%', alignSelf: 'flex-end' }}>
                                                <TouchableOpacity style={{ paddingHorizontal: '10%', paddingVertical: '1.5%', borderWidth: 2, elevation: 7, borderRadius: 7, borderColor: '#313131', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF' }}>
                                                    <Text style={{ fontSize: RFPercentage(1.3) }}>
                                                        Submit
                                                    </Text>
                                                </TouchableOpacity>
                                            </View> : null
                                        } */}