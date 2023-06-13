import { Image, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../../context/AuthContext'
import { BASE_URL } from '../../../../config';
import axios from 'axios';
import { ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import moment from 'moment';

export default function ClassmatesScreen({ route }) {
  const { user, userToken } = useContext(AuthContext);
  const { courseID } = route.params

  const [classmatesScreenLoading, setClassmatesScreenLoading] = useState(false);
  const [classmates, setClassmates] = useState([]);

  const [firstLoading, setFirstLoading] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setFirstLoading(true);
    getCourseClassmates();
    console.log(courseID);
  }, [])

  const getCourseClassmates = async () => {
    setClassmatesScreenLoading(true);
    await axios.get(`${BASE_URL}/api/get_course_students/${courseID}`, {
      headers: { Authorization: `Bearer ${userToken}` },
    }).then((response) => {
      console.log(response.data)
      setClassmates(response.data.classmates)
      setClassmatesScreenLoading(false);
      setRefreshing(false);
      setFirstLoading(false);
    }).catch((error) => {
      console.log(error)
      setClassmatesScreenLoading(false);
      setRefreshing(false);
      setFirstLoading(false);
    });
  }

  const handleRefresh = async () => {
    setRefreshing(true);
    await getCourseClassmates();
    // setRefreshing(false);
  }

  return (
    <View style={styles.root}>

      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListFooterComponent={() => (

          firstLoading ?
            <View style={{ padding: '2.5%', marginVertical: '1.5%' }}>
              <ActivityIndicator size="large" color="#FF6B00" />
            </View> : null

        )}
        contentContainerStyle={{ flexGrow: 1, padding: '2.5%', }}
        data={classmates}
        keyExtractor={(item) => item.usrID.toString()}
        renderItem={({ item }) => {
          return (
            <View style={{ width: '100%', elevation: 15, marginBottom: '1.5%', padding: '2.5%', backgroundColor: '#FFF', elevation: 11, borderRadius: 15, borderWidth: 2 }}>
              <View style={{ flexDirection: 'row', }}>
                <Image source={require('../../../../../assets/images/icons/default.png')} resizeMode='contain' style={{ height: 50, width: 50, borderRadius: 1000, borderWidth: 1, borderColor: "#313131" }} />
                <View style={{ flex: 1, marginLeft: '2.5%', }}>
                  <Text style={{ fontSize: RFPercentage(1.7), fontWeight: 'bold' }}>
                    {item.fullName ?? null}
                  </Text>
                  <Text>
                    {item.lvlName ?? null}
                  </Text>
                  <Text>
                    {item.strShortName ?? null}
                  </Text>
                </View>

                <View style={{ backgroundColor: '#FF' }}>
                  <TouchableOpacity style={{elevation: 15}}>
                    <MaterialCommunityIcons name="email" size={25} color="black" style={{ padding: 5, borderRadius: 7, backgroundColor: '#FF6b00', }} />
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={{ alignSelf: 'flex-end', marginTop: '1%', fontWeight: 'bold' }}>
                Last Online:{" "}
                <Text style={{ fontWeight: '400' }}>
                  {moment(item.logDate).fromNow()}
                </Text>
              </Text>

            </View>
          )
        }}
      />
      {/* <Text>{courseID}</Text> */}
    </View >
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  }
})