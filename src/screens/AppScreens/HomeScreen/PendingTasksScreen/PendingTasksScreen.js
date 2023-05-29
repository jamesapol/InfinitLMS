import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ImageBackground, Dimensions, TextInput } from 'react-native'
import React, { useState } from 'react'
import bg from '../../../../../assets/images/backgrounds/school.jpg'
import { Button, Card, FAB } from 'react-native-paper'
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import CustomSearch from '../../../../components/CustomSearch/CustomSearch';
const tempData = [
  { id: '1', title: 'Eng 101', instructor: 'TOLENTINO FRANCIS', time: '9:30AM to 10:30AM', schedule: 'Mon to Fri', room: 'Room 205', population: '35' },
  { id: '2', title: 'Filipino', instructor: 'TOLENTINO FRANCIS', time: '10:30AM to 11:30AM', schedule: 'Mon to Fri', room: 'Room 205', population: '35' },
  { id: '3', title: 'Math 101', instructor: 'APOLONIO JAMES', time: '3:30PM to 5:30PM', schedule: 'Mon to Fri', room: 'Room 205', population: '35' },
  { id: '4', title: 'Sci 101', instructor: 'AMBATAKAM AMBASING', time: '9:30AM to 10:30AM', schedule: 'Mon to Fri', room: 'Room 205', population: '35' },
  { id: '5', title: 'PE 4', instructor: 'AMBATUNAT AMBADABLOW', time: '6:30PM to 8:30PM', schedule: 'Mon to Fri', room: 'Room 205', population: '35' },
  { id: '6', title: 'IT 18', instructor: 'MOMMY ONI', time: '7:00AM to 9:00AM', schedule: 'Mon to Fri', room: 'Room 205', population: '35' },
]

var { width } = Dimensions.get("window");
var { height } = Dimensions.get("window");

export default function PendingTasksScreen(navigation) {
  const [columnCount, setColumnCount] = useState(1);

  const toggleColumns = () => {
    setColumnCount(columnCount === 2 ? 1 : 2)
  }

  return (
    <View style={{ flex: 1 }}>


      {/* <View style={{ height: 50, alignItems: 'center', justifyContent: 'center', marginVertical: 15, }}>
        <View style={{ flexDirection: 'row', width: '95%', height: '100%', }}>
          <CustomSearch
            placeholder="Search Course"
            child={
              <Ionicons name="search" size={24} color={"#000"} />
            }
          />
          <View style={{ height: '100%', width: '10%', }}>
            <TouchableOpacity style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }} onPress={toggleColumns}>
              <Ionicons name={columnCount === 1 ? 'ios-grid-outline' : 'ios-list'} size={45} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View> */}

      <FlatList
        // overScrollMode='never'
        contentContainerStyle={{ flexGrow: 1, marginBottom: '15%', paddingVertical: '5%' }}
        data={tempData}
        numColumns={3}
        key={columnCount}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                flex: 1,
                backgroundColor: '#fff',
                elevation: 5,
                marginHorizontal: '2.5%',
                marginBottom: '5%',
                borderRadius: 15,
              }}>



              <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                <Text style={{ fontSize: 25 }}>0</Text>
              </View>

              <View style={{ paddingHorizontal: columnCount === 1 ? '2.5%' : '5%', alignItems: 'center' }}>
                <TouchableOpacity style={{ margin: 10, backgroundColor: '#f66b00', width: '100%', paddingVertical: 10, borderRadius: 10, alignItems: 'center' }}>
                  <Text>
                    View
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        }}
      />
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
    width: 150,
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