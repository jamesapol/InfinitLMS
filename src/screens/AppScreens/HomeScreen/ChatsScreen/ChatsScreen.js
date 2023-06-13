import { FlatList, StyleSheet, Text, View, RefreshControl, TextInput, TouchableOpacity, ImageBackground, Vibration, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import schoolBG from '../../../../../assets/images/backgrounds/school.jpg'
import Skeleton from '../../../../components/Skeleton/Skeleton';
import axios from 'axios';
import { BASE_URL } from '../../../../config';
import { AuthContext } from '../../../../context/AuthContext';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Image } from 'react-native';
import { MaterialCommunityIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Dimensions } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import moment from 'moment';
import { KeyboardAvoidingView } from 'react-native';
import { Platform } from 'react-native';
import { Keyboard } from 'react-native';


var { height } = Dimensions.get("window");

export default function ChatsScreen({ route, navigation }) {
  const { user, userToken } = useContext(AuthContext)
  const { courseID } = route.params
  const actionSheet = useRef();

  const flatListRef = useRef(null);

  const [firstLoading, setFirstLoading] = useState(true);
  const [chatsLoading, setChatsLoading] = useState(false);
  const [refreshFlatList, setRefreshFlatList] = useState();
  const [chats, setChats] = useState([]);

  const [sendLoading, setSendLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [lastPage, setLastPage] = useState(false);

  const [messageStates, setMessageStates] = useState([]);
  const toggleMessageDetailVisibility = (itemID) => {
    setMessageStates((prevStates) => {
      const newState = { ...prevStates };
      newState[itemID] = !newState[itemID];
      return newState;
    })
  }

  const [selectedMessage, setSelectedMessage] = useState();
  const [selectedMessageID, setSelectedMessageID] = useState();
  const [selectedMessageBG, setSelectedMessageBG] = useState();
  const [messageDetailsVisible, setMessageDetailsVisible] = useState(false)

  const [chatMessage, setChatMessage] = useState('');
  const [chatInputHeight, setChatInputHeight] = useState();

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setFirstLoading(true);
    // setChatsLoading(true)
    getChats()

    // }, [page])
  }, [])

  // useEffect(() => {
  //   console.log("Chat state count: " + chats.length)

  //   if (page == totalPages) {
  //     setLastPage(true)
  //   }
  // }, [chats])

  const handleNavigateToClassmates = () => {
    navigation.navigate("Classmates", { courseID });
  }

  const getChats = async () => {
    setChatsLoading(true)
    // await axios.get(`${BASE_URL}/api/get_chats/${courseID}`, {
    await axios.get(`${BASE_URL}/api/get_chats/${courseID}?page=${page}`, {
      headers: { Authorization: `Bearer ${userToken}` },
    }).then((response) => {

      //If paginated style
      // let messages = response.data.chats.data;
      // let totalPages = response.data.chats.last_page
      // setTotalPages(totalPages);
      // setChats(chats.concat(messages))

      //If not paginated
      let messages = response.data.chats;
      setChats(messages)
      setFirstLoading(false)
      setChatsLoading(false)
      setRefreshing(false);
    }).catch((error) => {
      console.log(error)
      setFirstLoading(false)
      setChatsLoading(false)
      setRefreshing(false);
    });
  }

  const sendMessage = async (message) => {
    await axios.post(`${BASE_URL}/api/send_chat/${user.usrID}/${courseID}`,
      {
        message: message
      },
      {
        headers: { Authorization: `Bearer ${userToken}` },
      }).then((response) => {
        console.log(response.data)
        setChats(response.data.chats)
      }).catch((error) => {
        console.log(error)
      })
  }

  const deleteMessage = async (chatID) => {
    console.log(chatID)
    actionSheet.current.close()
    await axios.patch(`${BASE_URL}/api/delete_chat/${chatID}`,
      {
        courseID: courseID
      },
      {
        headers: { Authorization: `Bearer ${userToken}` },
      }).then((response) => {
        setChats(response.data.chats)
        // console.log(response.data)
      }).catch((error) => {
        console.log(error)
      })
  }

  const handleRefresh = async () => {
    setRefreshing(true);
    await getChats();
    // setRefreshing(false);
  }

  const isMessageEmpty = chatMessage.trim().length === 0;
  const onSendPressed = () => {
    if (chatMessage) {
      sendMessage(chatMessage)
      setRefreshFlatList(!refreshFlatList);
      setChatMessage('');
    }
  }

  const handleLoadMore = () => {
    setPage(page + 1);
    setChatsLoading(true)
  }

  const copyMessage = async () => {
    actionSheet.current.close()
    if (selectedMessage.forContent) {
      console.log("tangina")
      await Clipboard.setStringAsync(selectedMessage.forContent);
    }
  };


  return (
    <View
      source={schoolBG}
      blurRadius={15}
      resizeMode='cover'
      style={styles.root}>
      {firstLoading ? <Skeleton skeletonType="chats" /> : null}
      <>
        <FlatList
          // ListFooterComponent={() => (
          //   !lastPage ?
          //     <View style={{ width: '100%', marginTop: '1%', marginBottom: '5%', justifyContent: 'center', alignItems: 'center' }}>
          //       {!chatsLoading ?
          //         <TouchableOpacity
          //           onPress={handleLoadMore}
          //           style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: '5%', paddingVertical: '2.5%', }}>

          //           <Text style={{ fontSize: RFPercentage(1.4), marginRight: 7.5, }}>
          //             Load More
          //           </Text>
          //           <MaterialCommunityIcons name="reload" size={24} color="black" />
          //         </TouchableOpacity>
          //         :
          //         <>
          //           <Text style={{ fontSize: RFPercentage(1.4), marginRight: 7.5, paddingHorizontal: '5%', paddingVertical: '2.5%', }}>
          //             {" "}
          //           </Text>
          //           <ActivityIndicator size="small" color="#313131" />
          //           <Text style={{ fontSize: RFPercentage(1.4), marginRight: 7.5, paddingHorizontal: '5%', paddingVertical: '2.5%', }}>
          //             {" "}
          //           </Text>
          //         </>
          //       }
          //     </View>
          //     : null
          // )}
          // refreshControl={
          //   <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          // }
          ListEmptyComponent={() => (
            (!chatsLoading || !firstLoading) && chats.length === 0 ?
              <View style={{
                flex: 1, height: '100%', backgroundColor: 'teal', justifyContent: 'center', alignItems: 'center', transform: [{ scaleY: -1 }]
              }}>
                <Text> Tangina mingaw ang klase</Text>
              </View> : null
          )}
          initialNumToRender={50}
          inverted
          contentContainerStyle={{
            flexGrow: 1, padding: '2.5%', flexDirection: 'column',
            // backgroundColor: '#fffd' 
          }}
          data={chats}
          keyExtractor={(item) => item.forID.toString()}
          renderItem={({ item }) => {
            const isSelected = messageStates[item.forID] || false;
            return (
              <View>
                <View
                  style={{
                    flexDirection: item.usrID == user.usrID ? 'row-reverse' : 'row',
                    marginBottom: 7,
                    alignItems: 'flex-end',
                    // backgroundColor:'red',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      console.log(item.usrID)
                    }}
                    style={{
                      height: 30,
                      width: 30,
                      borderRadius: 1000,
                      elevation: 1,
                      // alignItems:'center',
                      // marginTop: '1%',
                      // borderWidth: 1,
                      //  borderColor: "#313131"
                    }}>
                    <Image
                      source={require('../../../../../assets/images/icons/default.png')}
                      style={{ height: '100%', width: '100%', borderRadius: 1000 }}
                      resizeMode='cover'
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    delayLongPress={150}
                    onLongPress={() => {
                      Keyboard.dismiss()
                      // if (item.usrID === user.usrID) {
                      console.log(item);
                      Vibration.vibrate(50)
                      setSelectedMessage(item)
                      setSelectedMessageID(item.forID);
                      actionSheet.current.open()
                      // } 
                    }}
                    onPress={() => {
                      toggleMessageDetailVisibility(item.forID);
                      // toggleMessageDetailVisibility()
                      // console.log(messageDetailsVisible)
                    }}

                    activeOpacity={1}
                    style={{
                      // marginTop: '0.5%',
                      paddingHorizontal: 15,
                      maxWidth: '75%',
                      // flex: 1,
                      // alignItems: item.usrID === user.usrID ? 'flex-end' : 'flex-start',
                    }}>
                    <Text style={{

                      color: '#fff',
                      // flex: 1,
                      // marginLeft: '2.5%',
                      paddingHorizontal: 10,
                      // paddingLeft: item.usrID === user.usrID ? 65 : 0,
                      // paddingRight: item.usrID === user.usrID ? 15 : 0,
                      textAlign: item.usrID === user.usrID ? 'right' : 'left',

                      paddingVertical: 10,
                      // paddingLeft: '5%',
                      fontSize: RFPercentage(1.5),
                      borderBottomRightRadius: item.usrID === user.usrID ? 0 : 15,
                      borderTopRightRadius: 15,
                      borderTopLeftRadius: 15,
                      borderBottomLeftRadius: item.usrID === user.usrID ? 15 : 0,

                      backgroundColor: isSelected ? '#FF9E33' : '#FF6b00'
                    }}>
                      {item.forContent}
                    </Text>
                  </TouchableOpacity>
                </View>

                <Text
                  style={{
                    display: isSelected ? 'flex' : 'none',
                    alignSelf: item.usrID === user.usrID ? 'flex-end' : 'flex-start',
                    fontWeight: 'bold'
                  }}>
                  {item.usrID === user.usrID ? "Me" :
                    (item.fullName)}
                </Text>
                <Text
                  style={{
                    display: isSelected ? 'flex' : 'none',
                    alignSelf: item.usrID === user.usrID ? 'flex-end' : 'flex-start',
                    marginBottom: 15,
                  }}>

                  <Ionicons name="time" size={16} color="black" />
                  {" "}{moment(item.forDateCreated).format('MMMM D, YYYY, h:mm A')}
                </Text>
              </View>

            )
          }}
        />
      </>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ width: '100%', backgroundColor: '#fff', elevation: 15 }}>
        <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center' }}>
          <TextInput
            multiline={true}
            numberOfLines={1}

            maxLength={255}
            placeholder="Send a message"
            style={{
              // textAlignVertical: 'top',
              marginVertical: '1%',
              marginHorizontal: '2.5%',
              padding: '1%',
              paddingHorizontal: '2%',
              paddingVertical: 10,
              // height: chatInputHeight,
              minHeight: 40,
              maxHeight: 80,
              flex: 1,
              flexWrap: 'wrap',
              backgroundColor: '#ddd',
              borderRadius: 15,
              // borderColor: '#313131',
              // borderWidth: 0.01,
              fontSize: RFPercentage(1.5)
            }}
            value={chatMessage}
            onChangeText={(text) => {
              console.log(chatMessage)
              setChatMessage(text);
            }}
          // onContentSizeChange={(e) => {
          //   const inputHeight = e.nativeEvent.contentSize.height;
          //   setChatInputHeight(Math.min(inputHeight, 200));
          //   // setChatInputHeight(e.nativeEvent.contentSize.height)

          // }}
          />
          <TouchableOpacity
            disabled={!chatMessage ? true : false}
            onPress={onSendPressed}
            style={{
              paddingRight: '2.5%',
              flexDirection: 'row',
              height: '100%',
              alignItems: 'center',
              display: isMessageEmpty ? 'none' : 'flex'
            }}>
            <MaterialCommunityIcons name="send" size={30} color="#FF6b00" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <RBSheet
        ref={actionSheet}
        height={height * 0.08}

        closeOnDragDown={true}
        closeOnPressMask={true}
        closeOnPressBack={true}
        dragFromTopOnly={true}
        animationType='none'
        openDuration={50}
        closeDuration={50}
        customStyles={{
          wrapper: {
            backgroundColor: '#FFF0',
          },
          draggableIcon: {
            // width: 0,
            // height: 0
          },
          container: {
            // borderTopLeftRadius: 50,
            // borderTopRightRadius: 50,
            // borderTopWidth: 2,
            elevation: 11,
            // borderColor: "#313131",
            // justifyContent:'center',
            alignItems: 'center',
          }
        }}
      >
        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'flex-start', }}>

          <TouchableOpacity
            onPress={copyMessage}
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <FontAwesome5 name="copy" size={24} color="#FF6b00" />
            <Text style={{ fontSize: RFPercentage(1.3), marginTop: '2%', color: '#FF6B00', fontWeight: 'bold' }}>
              Copy
            </Text>
          </TouchableOpacity>

          {selectedMessage && selectedMessage.usrID === user.usrID ?
            <TouchableOpacity
              onPress={() => {
                deleteMessage(selectedMessage.forID)
              }}
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
              <FontAwesome5 name="trash-alt" size={24} color="#FF6b00" />
              <Text style={{ fontSize: RFPercentage(1.3), marginTop: '2%', color: '#FF6B00', fontWeight: 'bold' }}>
                Delete
              </Text>
            </TouchableOpacity> : null}
        </View>
      </RBSheet>
    </View >
  )
}

const styles = StyleSheet.create({
  root: {
    // backgroundColor: '#ff94',
    flex: 1
  }
})