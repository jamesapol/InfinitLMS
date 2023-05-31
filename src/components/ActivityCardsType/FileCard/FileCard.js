import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { RFPercentage } from 'react-native-responsive-fontsize'
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from 'expo-file-system';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import moment from 'moment/moment';

export default function FileCard({ item }) {
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
                  Due Date:
                  <Text style={{ fontWeight: 'bold', }}>
                    {" "}{moment(item.actDateEnd).format('MMMM D, YYYY, h:mm A')}
                  </Text>
                </Text>
              </View>
            </View>
          </View>

          <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
            <TouchableOpacity style={{ paddingHorizontal: '2.5%', width: '15%', paddingVertical: '1%', borderWidth: 2, elevation: 7, borderRadius: 7, margin: '1.5%', borderColor: '#313131', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF' }}>
              <Text style={{}}>
                {/* View File */}
                <FontAwesome5 name="eye" size={RFPercentage(2)} color="#ff6b00" />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ paddingHorizontal: '2.5%', width: '15%', paddingVertical: '1%', borderWidth: 2, elevation: 7, borderRadius: 7, margin: '1.5%', borderColor: '#313131', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF' }}>
              <Text>
                {/* Download File */}
                <FontAwesome5 name="download" size={RFPercentage(2)} color="#ff6b00" />
              </Text>
            </TouchableOpacity>
          </View>
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