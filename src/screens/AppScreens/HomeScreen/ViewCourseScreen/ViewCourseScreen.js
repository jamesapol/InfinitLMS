import { FlatList, Image, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { BASE_URL } from '../../../../config';
import { AuthContext } from '../../../../context/AuthContext';
import axios from 'axios';
import ModuleCard from '../../../../components/ModuleCard/ModuleCard';
import { Ionicons } from '@expo/vector-icons';
import subjectIcon from '../../../../../assets/images/icons/educ.png'
import { RFPercentage } from 'react-native-responsive-fontsize';
import { FAB, List, MD2DarkTheme } from 'react-native-paper';
import Skeleton from '../../../../components/Skeleton/Skeleton';
import { MaterialIcons } from '@expo/vector-icons';
import defaultImage from '../../../../../assets/images/icons/default.png'

export default function ViewCourseScreen({ route }) {
  const { user, userToken, } = useContext(AuthContext)
  const { course } = route.params;

  const [modulesLoading, setModulesLoading] = useState(false);
  const [modules, setModules] = useState();

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true)
    await getCourseModules();
    setRefreshing(false)
  }

  // useEffect(() => {
  //   getCourseModules();
  // }, [])

  const getCourseModules = async () => {
    setModulesLoading(true);
    await axios.get(`${BASE_URL}/api/get_course_modules/${user.usrID}/${course.crsID}`, {
      headers: { Authorization: `Bearer ${userToken}` },
    }).then((response) => {
      console.log(response.data)
      setModules(response.data.modules);
      setModulesLoading(false);
    }).catch((error) => {
      console.log(error.response)
      setModulesLoading(false);
    });
  }


  const convertTo12HourFormat = (time) => {
    const [hours, minutes] = time.split(':');
    let period = 'AM';
    let formattedHours = parseInt(hours, 10);

    if (formattedHours >= 12) {
      period = 'PM';
      formattedHours = formattedHours === 12 ? 12 : formattedHours - 12;
    } else if (formattedHours === 0) {
      formattedHours = 12;
    }

    return `${formattedHours}:${minutes} ${period}`;
  };

  return (
    <View style={{ flex: 1, }}>

      <FAB icon="android-messages"
        animated
        style={styles.fab}
        // size='medium'
        mode='elevated'
        // label='Messages'
        // customSize={2}
        color="#313131"
        onPress={() => console.log(modules)}
      />
      <FlatList
        contentContainerStyle={{ flexGrow: 1, marginBottom: '15%', paddingBottom: '15%' }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListHeaderComponent={() => (
          <View style={{
            width: '95%',
            alignSelf: 'center',
            backgroundColor: '#fff',
            elevation: 15,
            marginVertical: '2.5%',
            paddingTop: '5%',
            paddingBottom: ' 7.5%',
            paddingHorizontal: '5%',
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
            // borderColor:'#313131',
            // borderWidth:2
            // borderRadius: 15,
          }}>
            <Image source={subjectIcon} style={{ height: 100, width: 100, borderRadius: 1000, marginBottom: '2.5%' }} />
            <Text style={{ fontSize: RFPercentage(3), fontWeight: 'bold', textAlign: 'center' }}>
              {course.crsTitle}
            </Text>
            <Text style={{ fontSize: RFPercentage(1.7), textAlign: 'center' }}>
              {course.crsDescription}
            </Text>
            <View style={{ height: 1, width: '100%', backgroundColor: '#515151', marginTop: 25, alignSelf: 'center', }} />

            <View style={{ justifyContent: 'space-between', width: '100%', }}>
              {/* INSTRUCTORS */}


              {/* OTHER DETAILS */}
              <View style={{ marginVertical: '2.5%' }}>
                <View style={styles.rowDetails} >
                  <Ionicons name="time" size={RFPercentage(2)} color="black" />
                  <Text style={styles.classDetails}>
                    <Text style={{ fontWeight: 'bold' }}>
                      {convertTo12HourFormat(course.crsTimeFrom)}
                    </Text>
                    {" "}to{" "}
                    <Text style={{ fontWeight: 'bold' }}>
                      {convertTo12HourFormat(course.crsTimeTo)}
                    </Text>
                  </Text>
                </View>
                <View style={styles.rowDetails} >
                  <Ionicons name="calendar" size={RFPercentage(2)} color="black" />
                  <Text style={styles.classDetails}>
                    {(course.crsMon && course.crsTue && course.crsWed && course.crsThu && course.crsFri) ? "Monday - Friday" :
                      <>
                        {course.crsMon ? "Mon " : null}
                        {course.crsTue ? "Tue " : null}
                        {course.crsWed ? "Wed " : null}
                        {course.crsThu ? "Thu " : null}
                        {course.crsFri ? "Fri " : null}
                        {course.crsSat ? "Sat " : null}
                        {course.crsSun ? "Sun " : null}
                      </>
                    }
                  </Text>
                </View>
                <View style={styles.rowDetails} >
                  {/* <Fontisto name="room" size={RFPercentage(2)} color="black" /> */}
                  {/* <FontAwesome5 name="door-closed" size={RFPercentage(1.8)} color="black" /> */}
                  <MaterialIcons name="meeting-room" size={RFPercentage(2)} color="black" />
                  <Text style={styles.classDetails}>{course.romName}</Text>
                </View>
              </View>
              <View style={{ height: 1, width: '100%', backgroundColor: '#515151', alignSelf: 'center', }} />

              <Text style={{ fontWeight: 'bold', fontSize: RFPercentage(2), paddingVertical: '1%', }}>{course.instructors.length > 1 ? "Instructors:" : "Instructor:"}</Text>

              <FlatList
                key={new Date}
                numColumns={2}
                data={course.instructors}
                keyExtractor={(instructor) => `${instructor.usrLastName}-${instructor.usrFirstName}`}
                renderItem={({ item: instructor, index }) => (
                  <View style={{ flexDirection: 'row', marginVertical: '1%', flex: 1, marginHorizontal: 1, }}>
                    <View style={{ height: RFPercentage(3.5), width: RFPercentage(3.5), borderRadius: 1000, borderColor: '#ff5b00', borderWidth: 1, marginRight: '2.5%', }}>
                      <Image source={{ uri: `${BASE_URL}/images/avatars/${instructor ? instructor.usrImage ? instructor.usrImage : defaultImage : null}` }} style={{ height: '100%', width: '100%', borderRadius: 1000 }} />
                    </View>
                    <View style={{ flex: 1, marginVertical: '-1%' }} >
                      <Text style={{ fontSize: RFPercentage(1.7), fontWeight: 'bold', overflow: 'scroll', }} numberOfLines={2} ellipsizeMode='tail'>
                        {`${instructor.usrLastName ?? null}, ${instructor.usrFirstName ?? null} ${instructor.usrMiddleName ?? ''}`}
                      </Text>

                      <Text style={{ fontSize: RFPercentage(1.5), color: '#666' }} ellipsizeMode='tail'>
                        {instructor.typName}
                      </Text>
                    </View>
                  </View>
                )}
              />
            </View>
          </View>
        )}

        ListFooterComponent={() => (
          modulesLoading ? <Skeleton skeletonType="modules" /> : null
        )}
        data={modulesLoading ? null : modules}
        renderItem={({ item, index }) => {
          return (
            // <></>
            <List.Accordion
              title={item.secTitle}
              // title="TEST"

              titleStyle={{
                fontWeight: "bold",
                fontSize: RFPercentage(1.5),
                color: 'black'
              }}
              left={props => <List.Icon {...props} color='#ff6b00' icon="folder" />}

              style={{
                width: '95%',
                alignSelf: 'center',
                justifyContent: "center",
                fontWeight: "bold",
                backgroundColor: "#fff",
                marginTop: "1%",
                alignItems: "center",
                elevation: 7,
                // marginBottom:'2.5%'
                // borderRadius: 7
                // borderTopLeftRadius: index === 0 ? 15 : 0,
                // borderTopRightRadius: index === 0 ? 15 : 0,
                // borderBottomLeftRadius: index === item.length - 1 ? 15 : 0,
                // borderBottomRightRadius: index === item.length - 1 ? 15 : 0,
              }}

              theme={{ colors: { background: '#fff0', elevation: 5 } }}
            >
              <>
                <View
                  style={{
                    backgroundColor: "#fff",
                    justifyContent: "center",
                    // alignItems: "center",
                    elevation: 1,
                    paddingVertical: "5%",
                    marginBottom: "2.5%",
                    width: '95%',
                    // borderRadius: 15,
                    alignSelf: 'center',
                    borderBottomRightRadius: 15,
                    borderBottomLeftRadius: 15,
                  }}
                >

                  {item.secID_content.length >= 1 ?
                    <ModuleCard
                      item={item.secID_content}
                    /> :
                    <View style={{ padding: '2.5%', justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ fontSize: RFPercentage(2), textAlign:'center', fontWeight:'bold' }}>Your instructor has not uploaded any files.</Text>
                    </View>
                  }
                </View>
              </>
            </List.Accordion>
          )
        }}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    // backgroundColor: '#fff',
    elevation: 16,
    marginHorizontal: '2.5%',
    marginBottom: '2.5%',
    borderRadius: 15,
  },

  courseTitleAndCodeContainer: {
    flexDirection: 'row',
    // backgroundColor: 'rgba(1,0.5,1,0.6)',
    backgroundColor: '#313131',
    borderTopEndRadius: 15,
    borderTopStartRadius: 15,
    // alignItems: 'center',
    // justifyContent: 'center',
    padding: '2.5%'

  },

  courseTitleAndCode: {
    flex: 1,
    padding: '5%',
    margin: 0,
    backgroundColor: 'red'
    // paddingTop: 0,
    // marginVertical: 7.5,
    // justifyContent: 'center',
    // alignItems: 'center'
    // textAlign:'center',
    // backgroundColor:'red'
  },

  otherDetailsContainer: {
    // height: columnCount === 1 ? 225 : 275,
    justifyContent: 'space-between',
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
    backgroundColor: '#fff',
    // paddingHorizontal: this.columnCount === 1 ? '2.5%' : '5%',
  },

  classDetails: {
    paddingLeft: 10,
    fontSize: RFPercentage(1.7),
    fontWeight: 'bold'
  },

  rowDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '0.5%',
  },

  fab: {
    position: 'absolute',
    backgroundColor: '#FF6B00',
    margin: 16,
    right: 10,
    bottom: 10,
    zIndex: 5,
    // width: 150,
    borderWidth: 2,
    borderColor: '#313131',
    borderRadius: 1000,
  },
})