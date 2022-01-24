/* eslint-disable prettier/prettier */

import React,{ useEffect, useState } from 'react';
import {
    StyleSheet,
    Dimensions,
    Text,
} from 'react-native';
import {
    Container,
    Box,
    Center,
    VStack,
    Heading,
    HStack,
    Pressable,
    SectionList,
    Radio
} from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { 
    colors,
    I18n
} from '../lib';
import {
    getGroupTypetask,
    postGroupTypetask,
    getTypetask,
    getAllTypeTask,
    getGrouporganization
} from '../Action'
import Rowsdeails from '../Components/Rowsdetails';
import IconFeather from 'react-native-vector-icons/Feather';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { HeaderDefault } from '../Components/Header';


const screenW = Dimensions.get("screen").width;
const screenH = Dimensions.get("screen").height;

const SelectFormtypetask = ({navigation, route}) => {

    const [ inpType, set_inpType ] = useState("");
    const [ dataList, set_dataList ] = useState([]);

    useEffect(() => {
        console.log(route.params);
        // getGroupTypetask("Mobile").then(resG => {
        //     GenRow(resG.data)
        // }).catch(err => {

        // });
        onGrouporganization();
    },[])


    const onGrouporganization = () => {
        getGrouporganization().then(res => {
            var genList = [];
            res.data.forEach(_row => {
                genList.push({
                    title: _row.group_name,
                    data: _row.Organizations
                })
            });
            set_dataList(genList);
        }).catch(err => {
            set_dataList([]);
        });
    }

    const GenRow = async(_data) => {
        var lsData = await _data.map(async res => {
            var resultCell = await GenRow1(res);
            return resultCell;
        })
        const exDATA = await Promise.all(lsData);
        set_dataList(exDATA);
    }

    const GenRow1 = (_row) => {
        return new Promise((resolve, reject) => {        
            getTypetask(_row.group_id).then(resR => {                
                resolve({
                    title: _row.group_name,
                    // data: ["a","b","c"],
                    data: resR.data
                });
            }).catch(errR => {
                reject(null);
            })
        })
    }


    return(
        <SafeAreaProvider>
            <SafeAreaView style={styles.cssContaniner}>
            <HeaderDefault bgColor={"#FFF"} textColor={colors.MainColor} 
            navigation={navigation} textheader={"ส่วนที่ 2 ยื่นเรื่องร้องเรียนต่อ"} />
                <Box style={{
                    width: screenW,
                    height: 20
                }} />
                <SectionList
                    sections={dataList}
                    keyExtractor={(item, index) => item.organ_name + index}
                    renderItem={({ item }) => (
                        

                        <Pressable onPress={() => {
                            console.log(item);
                            var genList = []
                            if (route.params.statusFormUser ==  true) {
                                genList = [
                                    {
                                        "title": "เรื่องหลัก",
                                        "data": [
                                            {
                                                "ID": "1",
                                                "group_id": "1",
                                                "name": "ขอความช่วยเหลือ",
                                                "creation_date": "2021-10-18T00:00:00.000Z",
                                                "status": 1,
                                                "last_update": "2021-10-18T00:00:00.000Z"
                                            },
                                            {
                                                "ID": "2",
                                                "group_id": "1",
                                                "name": "ปัญหาความเดือดร้อน",
                                                "creation_date": "2021-10-18T00:00:00.000Z",
                                                "status": 1,
                                                "last_update": "2021-10-18T00:00:00.000Z"
                                            },
                                            {
                                                "ID": "3",
                                                "group_id": "1",
                                                "name": "ปัญหาที่ดิน",
                                                "creation_date": "2021-10-18T00:00:00.000Z",
                                                "status": 1,
                                                "last_update": "2021-10-18T00:00:00.000Z"
                                            }
                                        ]
                                    },
                                    {
                                        "title": "เรื่องอื่นๆ",
                                        "data": [
                                            {
                                                "ID": "4",
                                                "group_id": "2",
                                                "name": "ขอคำปรึกษา",
                                                "creation_date": "2021-10-18T00:00:00.000Z",
                                                "status": 1,
                                                "last_update": "2021-10-18T00:00:00.000Z"
                                            },
                                            {
                                                "ID": "5",
                                                "group_id": "2",
                                                "name": "ขอความเป็นธรรม",
                                                "creation_date": "2021-10-18T00:00:00.000Z",
                                                "status": 1,
                                                "last_update": "2021-10-18T00:00:00.000Z"
                                            },
                                            {
                                                "ID": "6",
                                                "group_id": "2",
                                                "name": "ข้อเสนอแนะ",
                                                "creation_date": "2021-10-18T00:00:00.000Z",
                                                "status": 1,
                                                "last_update": "2021-10-18T00:00:00.000Z"
                                            },
                                            {
                                                "ID": "7",
                                                "group_id": "2",
                                                "name": "อื่นๆ",
                                                "creation_date": "2021-10-18T00:00:00.000Z",
                                                "status": 1,
                                                "last_update": "2021-10-18T00:00:00.000Z"
                                            }
                                        ]
                                    }
                                ]
                            } else {

                                genList = [
                                    {
                                        "title": "เรื่องหลัก",
                                        "data": [
                                            {
                                                "ID": "8",
                                                "group_id": "1",
                                                "name": "กล่าวโทษเจ้าหน้าที่รัฐ",
                                                "creation_date": "2021-10-18T00:00:00.000Z",
                                                "status": 1,
                                                "last_update": "2021-10-18T00:00:00.000Z"
                                            },
                                            {
                                                "ID": "9",
                                                "group_id": "1",
                                                "name": "แจ้งเบาะแสการกระทำผิด",
                                                "creation_date": "2021-10-18T00:00:00.000Z",
                                                "status": 1,
                                                "last_update": "2021-10-18T00:00:00.000Z"
                                            }
                                        ]
                                    }
                                ]
                            }
                            
                            navigation.push("SelectFormtypesubtask", {
                                dataType: {
                                    type: item.name,
                                    objtype: item,
                                    datasubtype: genList
                                },...route.params
                            });
                            // props.navigation.goBack();
                        }} w={(screenW*90)/100} alignItems={'center'}>
                        {({ isHovered, isFocused, isPressed }) => {
                        return (
                            <Box 
                            w={(screenW*80)/100}
                            h={(screenH*6)/100}
                            my={1}
                            borderBottomWidth={1}
                            borderBottomColor={"#efefef"}
                            flexDirection={'row'}
                            justifyItems={'center'}
                            alignItems={'center'}
                            bg={isPressed?"#F2F2F2":"#FAFAFA"}
                            _text={{
                                alignItems: 'flex-start',
                                fontSize: 16,
                                width: '95%',
                            }} >
                                {item.organ_name}
                                <IconFontAwesome name="chevron-right" style={{
                                    opacity: isPressed?0.5:1,
                                    color: colors.Green1,
                                    fontSize: 18
                                }} />
                            </Box>  
                        )}
                        }
                        </Pressable>
                    )}
                    renderSectionHeader={({ section: { title } }) => (
                        <Box 
                        w={(screenW*90)/100}
                        px={5} 
                        py={2} 
                        rounded="md" 
                        my={2} 
                        bg={colors.Green1}
                        _text={{
                            fontWeight: "bold",
                            color: '#FFF',
                            fontSize: 18
                        }} >
                            {title}
                        </Box>
                    )}
                />


            </SafeAreaView>
        </SafeAreaProvider>
    )

}

export default SelectFormtypetask;

const styles = StyleSheet.create({
    cssBodyPanal: {
        // width: screenW,
        // height: screenH,
    },
    cssContaniner: {
        flex: 1,
        backgroundColor: '#FAFAFA',
        // justifyContent: 'space-between', 
        alignItems: 'center'
    }
})

