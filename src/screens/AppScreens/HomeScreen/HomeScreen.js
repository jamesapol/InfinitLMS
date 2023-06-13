import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ImageBackground, Dimensions, TextInput, Platform, RefreshControl } from 'react-native'
import React, { useContext, useRef, useState } from 'react'
import bg from '../../../../assets/images/backgrounds/school.jpg'
import { Button, Card, FAB } from 'react-native-paper'
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import CustomSearch from '../../../components/CustomSearch/CustomSearch';
import { AuthContext } from '../../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import CourseCard from '../../../components/CourseCard/CourseCard';
import RBSheet from 'react-native-raw-bottom-sheet';
import CourseBottomSheet from '../../../components/CourseBottomSheet/CourseBottomSheet';
import { BASE_URL } from '../../../config';
import axios from 'axios';
import Skeleton from '../../../components/Skeleton/Skeleton';
import { RFPercentage } from 'react-native-responsive-fontsize';
import CustomInput from '../../../components/CustomInput/CustomInput';

// import { FlashList } from "@shopify/flash-list";
var { width } = Dimensions.get("window");
var { height } = Dimensions.get("window");

export default function HomeScreen() {
  const { user, userToken, userClasses, getStudentCourses, coursesLoading, setCoursesLoading } = useContext(AuthContext);
  const [columnCount, setColumnCount] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [searchKey, setSearchKey] = useState('')
  const courseSheet = useRef();

  const navigation = useNavigation();
  const handleSearch = (text) => {
    setSearchKey(text)
  }

  const toggleColumns = () => {
    if (userClasses.length !== 1) {
      setColumnCount(columnCount === 2 ? 1 : 2)
    }
  }

  const onAddCoursePressed = () => {
    navigation.navigate("AddCourseScreen");
  }

  const classes = () => {
    console.log(user);
  }

  // API CALLS
  const handleRefresh = async () => {
    setRefreshing(true);
    await getStudentCourses(user);
    setRefreshing(false);
  }

  return (
    <View style={{ flex: 1, height: '100%' }}>

      {coursesLoading ? <Skeleton skeletonType="courses" /> :
        <>
          <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 10, paddingHorizontal: '2.5%', height: 50 }}>
            <CustomSearch
              placeholder="Search Course"
              value={searchKey}
              onChangeText={handleSearch}
              prefixChild={
                <Ionicons name="search" size={24} color={"#000"} style={{ paddingRight: '1%' }} />
              }
            />
            {/* <View style={{ height: '100%', width: '10%', }}>
            <TouchableOpacity style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }} onPress={toggleColumns}>
              <Ionicons name={columnCount === 1 ? 'ios-grid-outline' : 'ios-list'} size={40} color="#FF6b00" />
            </TouchableOpacity>
          </View> */}
          </View>

          <FAB icon="plus"
            animated
            style={styles.fab}
            mode='elevated'
            color="#313131"
            onPress={() => courseSheet.current.open()}
          // onPress={classes}
          />

          <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
            }
            // overScrollMode='never'
            // ListHeaderComponent={() => (

            // )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1, marginBottom: '15%', paddingBottom: '15%' }}
            data={userClasses}
            numColumns={columnCount}
            key={columnCount}
            keyExtractor={(item) => item.clsID.toString()}
            renderItem={({ item }) => {
              return (
                <CourseCard
                  bg={bg}
                  item={item}
                  userClasses={userClasses}
                  columnCount={columnCount}
                  // onPress={() => console.log(item)}
                  onPress={() => navigation.navigate("Modules", { course: item })}
                // onPress={() => navigation.navigate("ViewCourseScreen", { course: item })}
                // onPress={getStudentCourses}
                />
              )
            }}
          />
        </>}
      <RBSheet
        ref={courseSheet}
        height={height * 0.9}
        closeOnDragDown={true}
        closeOnPressMask={true}
        closeOnPressBack={true}
        dragFromTopOnly={true}
        animationType='fade'
        openDuration={450}
        closeDuration={450}

        customStyles={{
          draggableIcon: {
            backgroundColor: "#ff6b00",
            width: "50%",
          },
          container: {
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            elevation: 11,
          },
        }}
      >
        <CourseBottomSheet />
      </RBSheet>
    </View>
  )
}

const styles = StyleSheet.create({
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


//DESIGN 1
// <ImageBackground
//     source={bg}
//     style={{
//       flex: 1,
//       backgroundColor: '#fff',
//       elevation: 5,
//       marginHorizontal: '2.5%',
//       marginBottom: '2.5%',
//       borderRadius: 15,
//     }}
//     resizeMode='cover'
//     borderRadius={15}
//     blurRadius={5}
//   >
//     <View style={{
//       height: 150,
//       // borderRadius: 15,
//       backgroundColor: 'rgba(0,0,0,0.5)',
//       borderTopEndRadius: 15,
//       borderTopStartRadius: 15,
//     }}>

//     </View>
//     <View style={{
//       height: 200,
//       justifyContent: 'space-between',
//       borderBottomEndRadius: 15,
//       borderBottomStartRadius: 15,
//       backgroundColor: '#fff'
//     }}>
//       <View style={{ paddingHorizontal: '5%' }}>
//         <Text style={{ fontWeight: '900', fontSize: 25, marginVertical: 5 }}>{item.title}</Text>
//         <Text variant="titleLarge" style={{ fontWeight: 'bold' }}>Instructor:</Text>
//         <Text variant="bodyMedium">{item.instructor}</Text>
//         <Text variant="titleLarge" style={{ fontWeight: 'bold' }}>Instructor:</Text>
//         <Text variant="bodyMedium">{item.instructor}</Text>
//       </View>
//       <View style={{ paddingHorizontal: '5%', alignItems: 'center' }}>
//         <TouchableOpacity style={{ margin: 10, backgroundColor: '#f66b00', width: '100%', paddingVertical: 10, borderRadius: 10, alignItems: 'center' }}>
//           <Text>
//             View
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   </ImageBackground>