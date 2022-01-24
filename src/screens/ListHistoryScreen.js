/* eslint-disable prettier/prettier */


import React,{ useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
} from 'react-native';
import {
    Container,
    Heading,
    ScrollView,
    Center,
    Box,
    Image,
    HStack,
    Text as Text2,
    FlatList,
    VStack,
    Spacer,
    Pressable
} from 'native-base';
import { colors } from '../lib';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconFeather from 'react-native-vector-icons/Feather';
import  libI18n from 'react-native-i18n';
import {
    SuccessBTN,
    TwoRowBTN
} from '../Components/Button';
import {HeaderDefault} from '../Components/Header';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
    getTaskName,
    getStatustask,
    getProcessTask,
    getTaskAll,
    getStatustaskname
} from '../Action';
import Config from 'react-native-config';

const screenW = Dimensions.get("screen").width;
const screenH = Dimensions.get("screen").height;
const MainUrlImage = Config.API_Service+'/localimage/';
import moment from "moment";
import momentTH from 'moment/locale/th';

const ListHistoryScreen = ({ route, navigation }) => {

    const [ listItemHistory, set_listItemHistory ] =  useState([]);
    const [ listStatusNmae, set_listStatusNmae ] =  useState([]);

    useEffect(() => {
        ongetNameOfStatus()
    },[])


    const onGetStatusName = () => {
        getStatustaskname().then(res => {
            set_listStatusNmae(res.data);
        }).catch(err => {

        })
    }

    const ongetNameOfStatus = (resid) => {
        getStatustask("").then(res => {
            console.log(res);
            set_listStatusNmae(res.data)
            set_listItemHistory(route.params.ListItemHistory)
        }).catch(err => {
        });
    }

    const getIconStatus = (res) => {
        // var IconShow = 
        // <IconFeather name="clock" style={{color:'#FFF'}} />
        // <IconFeather name="check" style={{color:'#FFF'}} />
        try {
            var getlistIcon = listStatusNmae.filter(resS => resS.taskstatus_id == res.status_id);
            if (getlistIcon.length > 0) {
                switch (getlistIcon[0].taskstatus_id) {
                    case "st_01":
                        return <IconFontAwesome name="info" style={{color:'#FFF', fontSize: 16}} />
                        // return <IconFontAwesome name="info" style={{color:'#FFF', fontSize: 16}} />
                        // break;
                    case "st_02":
                        return <IconFontAwesome name="history" style={{color:'#FFF', fontSize: 16}} />
                        // break;
                    case "st_03":
                        return <IconFontAwesome name="check" style={{color:'#FFF', fontSize: 16}} />
                        // break;
                    case "st_04":
                        return <IconFontAwesome name="info" style={{color:'#FFF', fontSize: 16}} />
                        // break;
                    case "st_05":
                        return <IconFontAwesome name="remove" style={{color:'#FFF', fontSize: 16}} />
                        // break;
                
                    default:
                        return <IconFontAwesome name="info" style={{color:'#FFF', fontSize: 16}} />
                        // break;
                }
            } else {
                return <IconFontAwesome name="info" style={{color:'#FFF', fontSize: 16}} />
            }
        } catch (error) {
            return <IconFontAwesome name="info" style={{color:'#FFF', fontSize: 16}} />
        }
    }

    return(
    <SafeAreaProvider>
        <SafeAreaView style={styles.cssContaniner}>
            <HeaderDefault bgColor={colors.Green1} textColor={'#FFF'} navigation={navigation} textheader={"ประวัติการร้องเรียน"} />

            <Center style={styles.cssBodyPanel}>
            <Box w={screenH} h={(screenH*3)/100} />
            <FlatList
                data={listItemHistory}
                w={screenW}
                h={(screenH*80)/100}
                renderItem={({ item }) => (
                    <Pressable onPress={() => {
                        console.log(route.params);
                        console.log(item);
                        navigation.navigate("HistoryItemScreen",{
                            newuuid: route.params.newuuid,
                            dataLogin: route.params.dataLogin,
                            resultItemRef: item
                        });
                    }}>
                    {({ isHovered, isFocused, isPressed }) => {
                      return (
                            <Box
                                w={(screenW*90)/100}
                                h={(screenH*12)/100}
                                bg={'#FFF'}
                                pl={(screenW*5)/100}
                                pr={(screenW*5)/100}
                                ml={(screenW*5)/100}

                                mb={(screenH*2)/100}
                                borderRadius={4}
                                style={{
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 1,
                                        height: 1,
                                    },
                                    shadowOpacity: 0.15,
                                    shadowRadius: 2.5,
                                    elevation: 2,
                                }}
                            >
                                <HStack>
                                    <VStack w={(screenW*55)/100} h={(screenH*12)/100} justifyContent={'center'} >
                                        <Text
                                        _dark={{
                                            color: "warmGray.50",
                                        }}
                                        color="coolGray.800"
                                        style={{fontSize: 14}}
                                        >
                                        {"เลขที่: "+item.ref}
                                        </Text>
                                        <Text
                                        _dark={{
                                            color: "warmGray.50",
                                        }}
                                        color="coolGray.800"
                                        style={{fontSize: 14}}
                                        >
                                        {"เรื่อง: "+item.task_title}
                                        </Text>
                                        <Text
                                            _dark={{
                                            color: "warmGray.50",
                                            }}
                                            color="coolGray.800"
                                            style={{fontSize: 14}}
                                            alignSelf="flex-start"
                                        >
                                            {"วันที่: "+moment(new Date(item.createdAt)).locale("th", momentTH).format("Do MMMM YYYY")}
                                        </Text>
                                    </VStack>
                                    <Center 
                                    w={(screenW*35)/100} 
                                    h={(screenH*12)/100} 
                                    justifyContent={'center'}
                                    _text={{
                                        fontSize: 11,
                                        color: '#333'
                                    }}
                                    >
                                        <Center bg={item.status_id=="st_03"?colors.Green1
                                        :item.status_id=="st_02"?colors.Warning2:'#888'} 
                                        w={(screenW*15)/100}
                                        h={(screenW*15)/100}
                                        borderRadius={((screenW*15)/100)/2}
                                        justifyContent={'center'}
                                        alignContent={'center'}
                                        alignItems={'center'}
                                        >
                                            <Center 
                                            w={(screenW*14)/100}
                                            h={(screenW*14)/100}
                                            alignItems={'center'}
                                            justifyContent={'center'}
                                            alignContent={'center'}
                                            _text={{
                                                fontSize: item.status_id=="st_01"?11:10, 
                                                color: '#FFF',
                                            }}>
                                                {getIconStatus(item)}
                                            </Center>
                                            
                                        </Center>
                                        {listStatusNmae.length>0?
                                                listStatusNmae.filter(resS => resS.taskstatus_id == item.status_id)[0].taskstatus_name
                                                :item.status_id}
                                    </Center>
                                </HStack>
                            </Box>
                        )}}
                    </Pressable>
                )}
                keyExtractor={(item) => item.ref}
            />
                
                <Box w={screenW} h={(screenH*10)/100} />
            
            </Center>
        </SafeAreaView>
    </SafeAreaProvider>
    )

}

export default ListHistoryScreen;


const styles = StyleSheet.create({
    cssBodyPanel: {
        width: screenW,
        backgroundColor: '#FAFAFA',
        alignItems: 'center',
        paddingHorizontal: (screenW*3)/100,
        // paddingTop: (screenH*5)/100
    },
    cssContaniner: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    }
})