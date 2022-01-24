/* eslint-disable no-trailing-spaces */
/* eslint-disable handle-callback-err */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */


import React,{ useEffect, useState, useRef } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    Image,
} from 'react-native';
import {
    Container,
    Heading,
    ScrollView,
    Center,
    Box,
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
    getGrouporganization,
    postUpdatetask,
    getTaskimages
} from '../Action';
import moment from "moment";
import momentTH from 'moment/locale/th';
import { getNameSubType } from '../MainApi/Urlhelper';
import Config from 'react-native-config';

import { Rating, AirbnbRating } from 'react-native-ratings';

const screenW = Dimensions.get("screen").width;
const screenH = Dimensions.get("screen").height;
const MainUrlImage = Config.API_Service+'/localimage/';

const HistoryItemScreen = ({ route, navigation }) => {
    const screenRef = useRef();
    const [ refNumber, set_refNumber ] = useState("");
    const [ inpTypeName, set_inpTypeName ] = useState("");
    const [ inpStatusName, set_inpStatusName ] = useState("");
    const [ valueImage, set_valueImage ] = useState(require('../img/Logo.png'));
    const [ valueOrganName, set_valueOrganName ] =  useState("")
    const [ ratingShow, set_ratingShow ] = useState(0);
    const [ valueRating, set_valueRating ] = useState(0);
    const [ statusRatting, set_statusRatting ] = useState("st_03")
    const [ listItemProcess, set_listItemProcess ] = useState([
        {
            index: 0,
            title: 'Step1',
            cerateat: new Date("2021-10-29").toISOString(),
        },
        {
            index: 1,
            title: 'Step2',
            cerateat: new Date("2021-10-30").toISOString(),
        },
        {
            index: 3,
            title: 'Step3',
            cerateat: new Date("2021-10-31").toISOString(),
        }
    ])

    const [ dataIcon1, set_dataIcon1 ] = useState(0);
    const [ dataIcon2, set_dataIcon2 ] = useState(0);
    const [ dataIcon3, set_dataIcon3 ] = useState(0);
    const [ dataIcon4, set_dataIcon4 ] = useState(0);
    const [ dataIcon5, set_dataIcon5 ] = useState(5);
    const [ dataSetImageIcon, set_dataSetImageIcon ] = useState(null)
    const [ listImageTask, set_listImageTask ] = useState([]);

    useEffect(() => {
        console.log(route.params);
        set_refNumber(new Date().getTime().toString().substr(0,6));
        ongetNameOfType(route.params.resultItemRef.task_type);
        ongetNameOfStatus(route.params.resultItemRef.status_id);
        ongetTaskProcess(route.params.resultItemRef.processtask_id);
        console.log(MainUrlImage+route.params.resultItemRef.task_img);
        set_valueImage({uri: MainUrlImage+route.params.resultItemRef.task_img})

        onGetImageOntask(route.params.resultItemRef.ref)

        set_ratingShow(route.params.resultItemRef.task_review);
        if (route.params.resultItemRef.task_review == 1) {
            set_dataSetImageIcon(require('../img/Happy_icon/Icon_1.png'));
        } else if (route.params.resultItemRef.task_review == 2) {
            set_dataSetImageIcon(require('../img/Happy_icon/Icon_2.png'));
        } else if (route.params.resultItemRef.task_review == 3) {
            set_dataSetImageIcon(require('../img/Happy_icon/Icon_3.png'));
        } else if (route.params.resultItemRef.task_review == 4) {
            set_dataSetImageIcon(require('../img/Happy_icon/Icon_4.png'));
        } else {
            set_dataSetImageIcon(require('../img/Happy_icon/Icon_5.png'));
        }
        set_statusRatting(route.params.resultItemRef.status_id)
        
        getGrouporganization().then(res => {
            var dataAll = [...res.data[0].Organizations,...res.data[1].Organizations];
            console.log(dataAll)
            var filterOrgan = dataAll.filter(resOR => resOR.organ_id ==route.params.resultItemRef.organ_id);
            if (filterOrgan.length>0) {
                set_valueOrganName(filterOrgan[0].organ_name )
            } else {
                set_valueOrganName(dataAll[0].organ_name )
            }
        }).catch(err => { 

        })

    },[route.params.resultItemRef]);

    const onGetImageOntask = (req) => {
        getTaskimages(req).then(res => {
            console.log(res);
            set_listImageTask(res.data);
        }).catch(err => {
            console.log(err);
        });
    }

    const ongetNameOfType = (resid) => {
        getTaskName(resid).then(res => {
            set_inpTypeName(""+res.data[0].name);
        }).catch(err => {
            set_inpTypeName(""+resid);
        })
        
        // getTaskName(resid).then(res => {
        //     console.log(res);
        //     set_inpTypeName("กรณี "+res.data[0].name);
        // }).catch(err => {
        //     console.log(err);
        //     set_inpTypeName("กรณี "+resid);
        // });
    }
    const ongetNameOfStatus = (resid) => {
        getStatustask(resid).then(res => {
            console.log(res);
            // return res.data[0].name;
            set_inpStatusName(res.data[0].taskstatus_name);
        }).catch(err => {
            // console.log(err);
            // return resid
            set_inpStatusName(resid);
        });
    }

    const ongetTaskProcess = (resID) =>  {
        var genItemProcess = [];
        getProcessTask(resID).then(res => {
            console.log(res);
            res.data.forEach(res => {
                genItemProcess.push(res);
            })
            set_listItemProcess(genItemProcess);
        }).catch(err => {
            console.log(err);
        })
    }

    const onSendRating = (reqRatting) => {
        let dataReq = {
            task_review: reqRatting,
            ref: route.params.resultItemRef.ref
        }
        if (reqRatting == 1) {
            set_dataSetImageIcon(require('../img/Happy_icon/Icon_1.png'));
        } else if (reqRatting == 2) {
            set_dataSetImageIcon(require('../img/Happy_icon/Icon_2.png'));
        } else if (reqRatting == 3) {
            set_dataSetImageIcon(require('../img/Happy_icon/Icon_3.png'));
        } else if (reqRatting == 4) {
            set_dataSetImageIcon(require('../img/Happy_icon/Icon_4.png'));
        } else {
            set_dataSetImageIcon(require('../img/Happy_icon/Icon_5.png'));
        }
        postUpdatetask(dataReq).then(res => {
            console.log(route.params);
            
            set_ratingShow(reqRatting)
            // navigation.navigate("HistoryItemScreen",{
            //     newuuid: route.params.newuuid,
            //     dataLogin: route.params.dataLogin,
            //     resultItemRef: route.params.resultItemRef
            // });
        }).catch(err => {
            console.log(err)
        })
    }

    const onSearchTask = () => {
        console.log(route.params.resultItemRef.user_id)
        // getTaskAll('1111111111111').then(res => {
        getTaskAll(route.params.resultItemRef.cid).then(res => {
            console.log(res);
            navigation.push("ListHistoryScreen", {
                ListItemHistory: res.data
                ,...route.params});
        }).catch(err => {
            console.log(err);
        })
    }

    const ratingCompleted = (rating) => {
        console.log("Rating is: " + rating)
        set_valueRating(rating)
    }

    return(
        <SafeAreaProvider ref={screenRef}>
            <SafeAreaView style={styles.cssContaniner}>
            <ScrollView _contentContainerStyle={{
                  mb: (screenH*15)/100,
                  minW: "72",
                }}
              >
            <HeaderDefault bgColor={colors.Green1} textColor={'#FFF'} navigation={navigation} textheader={"การติดตามเรื่องร้องเรียน"} />

            <Center style={styles.cssBodyPanel}>

                    {/* <Box w={screenW}
                    justifyContent={'flex-end'} alignItems={'center'} >
                        <Image
                            w={(screenW*25)/100}
                            h={(screenH*12)/100}
                            // ml={-(screenW*10)/100}
                            resizeMode={'contain'}
                            source={require('../img/Logo.png')}
                            alt="Alternate Text"
                        />
                    </Box> */}
                    <Center w={screenW} h={(screenH*5)/100}>
                    </Center>
                    <Box w={screenW}
                    justifyContent={'flex-end'} alignItems={'center'}  >
                        <Box _text={{
                            fontSize: 16,
                            color: "#333",
                            textTransform: 'uppercase',
                            // fontWeight: 'bold',
                        }}>
                            {"เลขที่คำร้อง"}
                        </Box>
                        <Box  _text={{
                            fontSize: 35,
                            color: "#d52771",
                            textTransform: 'uppercase',
                            letterSpacing: 2,
                            fontWeight: 'bold',
                        }}>
                            {route.params.resultItemRef.ref}
                        </Box>
                        <Box _text={{
                            fontSize: 10,
                            color: "#333",
                            textTransform: 'uppercase',
                            // fontWeight: 'bold',
                        }}>
                            {libI18n.strftime(new Date(route.params.resultItemRef.createdAt), "%d %b %Y %H:%M %p")}
                        </Box>
                    </Box>
                    
                <Center mt={(screenH*2)/100}>
                    <Text style={{
                        fontSize: 14,
                        color: '#444',
                        textTransform: 'uppercase',
                        // paddingLeft: (screenW*8)/100
                    }} >
                        {"ส่งคำร้องถึง"}
                    </Text>
                </Center>
                <Center >
                    <Text style={{
                        fontSize: 16,
                        color: '#333',
                        textTransform: 'uppercase',
                        // paddingLeft: (screenW*8)/100
                    }} >
                        {valueOrganName}
                    </Text>
                </Center>

                <Center mt={(screenH*2)/100}>
                    <Text style={{
                        fontSize: 14,
                        color: '#444',
                        textTransform: 'uppercase',
                        // paddingLeft: (screenW*8)/100
                    }} >
                        {"กรณี"}
                    </Text>
                </Center>
                <Center >
                    <Text style={{
                        fontSize: 16,
                        color: '#333',
                        textTransform: 'uppercase',
                        // paddingLeft: (screenW*8)/100
                    }} >
                        {inpTypeName}
                    </Text>
                </Center>
                
                {/* </HStack> */}
                 {/* <Text style={{
                    fontSize: 16,
                    color: '#333',
                    marginTop: (screenH*2)/100,
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                    // fontWeight: 'bold',
                }} >
                    {inpTypeName}
                </Text> */}
                {/* <Center w={(screenW*70)/100}>
                    <Box w={'77%'} h={(screenH*0.2)/100} bg={'#aaa'} />
                </Center> */}
                <Center mt={(screenH*2)/100}>
                    <Text style={{
                        fontSize: 16,
                        color: '#333',
                        textTransform: 'uppercase',
                        letterSpacing: 1,
                        // paddingLeft: (screenW*8)/100
                    }} >
                        {"เรื่อง "+route.params.resultItemRef.task_title}
                    </Text>
                </Center>
                <Text2 style={{
                    // marginTop: (screenH*1)/100,
                    paddingHorizontal: (screenW*5)/100,
                    // textIndent: '20%',
                    marginBottom: (screenH*3)/100,
                }} >
                    {/* <Text2 color={"#FAFAFA"} fontSize={14} _text={{
                    color: '#FAFAFA',
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                    }} >{"__"}
                    </Text2> */}
                    <Text2 color={"#333"} fontSize={14} _text={{
                        color: '#333',
                        textTransform: 'uppercase',
                        letterSpacing: 1,
                    }}>{route.params.resultItemRef.task_detail}
                    </Text2>
                </Text2>
                {listImageTask.length>0?
                listImageTask.map((resIMG, index) => {
                    var _tempFile = {uri: MainUrlImage+resIMG.Name};
                    var _tempType = resIMG.Name.split(".")[resIMG.Name.split(".").length-1]; 
                    if (_tempType.toUpperCase() == "PDF") {
                        return (
                            <Center w={screenW} >
                                <Pressable onPress={() => {

                                    let reImage = resIMG.Name;
                                    var _uri = 'https://docs.google.com/gview?embedded=true&url='+MainUrlImage+reImage;

                                    navigation.push("ViewTaskDetailFile", {
                                        datauri: _uri
                                        ,...route.params});
                                    
                                }}>
                                    {({ isHovered, isFocused, isPressed }) => {
                                    return (<HStack  
                                        style={{
                                            borderRadius: 4
                                        }}
                                        bg={colors.Green1}
                                        pr={(screenW*5)/100}
                                        pl={(screenW*5)/100}
                                        pt={(screenH*2)/100} pb={(screenH*2)/100}>
                                            <IconFeather name="file" style={{
                                                fontSize:  20,
                                                color: '#FFF'
                                            }} />
                                            <Text style={{
                                                fontSize: 14,
                                                color: '#FFF',
                                                paddingLeft: (screenW*2)/100
                                            }} >
                                                {"เอกสารแนบ ("+(index+1)+")"}
                                            </Text>
                                        </HStack>
                                    )}}
                                </Pressable>
                            </Center>
                        )
                    } else {
                        return (
                            <Center w={screenW} >
                                <Pressable onPress={() => {

                                    let reImage = resIMG.Name;
                                    var _uri = MainUrlImage+reImage;

                                    navigation.push("ViewTaskDetailFile", {
                                        datauri: _uri
                                        ,...route.params});

                                    }}>
                                    {({ isHovered, isFocused, isPressed }) => {
                                    return (
                                        <Image source={_tempFile} style={{
                                            width: (screenW*50)/100,
                                            height: (screenH*25)/100,
                                            resizeMode: 'contain'
                                        }} />
                                    )}}
                            </Pressable>
                            </Center>
                        )
                    }
                })
                :<Center />}
                {/* {route.params.resultItemRef.task_img.length > 0?
                <Center w={screenW} mt={(screenH*2)/100} mb={(screenH*2)/100}>
                    <Image source={valueImage} style={{
                        width: screenW,
                        height: (screenH*25)/100,
                        resizeMode: 'contain'
                    }} />
                </Center>
                :<Center />} */}

                <Center w={screenW} mt={(screenH*2)/100}>
                    <HStack>
                        <Box w={'4%'} h={(screenH*0.2)/100} bg={'#ccc'} mr={(screenW*1)/100} />
                        <Box w={'4%'} h={(screenH*0.2)/100} bg={'#ccc'} mr={(screenW*1)/100} />
                        <Box w={'4%'} h={(screenH*0.2)/100} bg={'#ccc'} mr={(screenW*1)/100} />
                        <Box w={'4%'} h={(screenH*0.2)/100} bg={'#ccc'} mr={(screenW*1)/100} />
                        <Box w={'4%'} h={(screenH*0.2)/100} bg={'#ccc'} mr={(screenW*1)/100} />
                        <Box w={'4%'} h={(screenH*0.2)/100} bg={'#ccc'} mr={(screenW*1)/100} />
                        <Box w={'4%'} h={(screenH*0.2)/100} bg={'#ccc'} mr={(screenW*1)/100} />
                        <Box w={'4%'} h={(screenH*0.2)/100} bg={'#ccc'} mr={(screenW*1)/100} />
                        <Box w={'4%'} h={(screenH*0.2)/100} bg={'#ccc'} mr={(screenW*1)/100} />
                        <Box w={'4%'} h={(screenH*0.2)/100} bg={'#ccc'} mr={(screenW*1)/100} />
                        <Box w={'4%'} h={(screenH*0.2)/100} bg={'#ccc'} mr={(screenW*1)/100} />
                        <Box w={'4%'} h={(screenH*0.2)/100} bg={'#ccc'} mr={(screenW*1)/100} />
                        <Box w={'4%'} h={(screenH*0.2)/100} bg={'#ccc'} mr={(screenW*1)/100} />
                        <Box w={'4%'} h={(screenH*0.2)/100} bg={'#ccc'} mr={(screenW*1)/100} />
                        <Box w={'4%'} h={(screenH*0.2)/100} bg={'#ccc'} mr={(screenW*1)/100} />
                        <Box w={'4%'} h={(screenH*0.2)/100} bg={'#ccc'} mr={(screenW*1)/100} />
                        <Box w={'4%'} h={(screenH*0.2)/100} bg={'#ccc'} mr={(screenW*1)/100} />
                        <Box w={'4%'} h={(screenH*0.2)/100} bg={'#ccc'} mr={(screenW*1)/100} />
                    </HStack>
                </Center>

                <Center>
                    <Text style={{
                        width: screenW,
                        fontSize: 15,
                        color: '#333',
                        marginTop: (screenH*3)/100,
                        textTransform: 'uppercase',
                        paddingLeft: (screenW*8)/100,
                        // fontWeight: 'bold'
                    }} >
                        {"สถานะ:  "}
                        <Text style={{
                            // color: "#ffd700",
                            color:inpStatusName==="รอการยืนยัน"?"#dbba07":inpStatusName==="ทำรายการสำเร็จ"?colors.Green1:"#333",
                            fontSize: 15,
                            textDecorationLine: 'underline',
                            }}>
                            {inpStatusName}
                        </Text>
                    </Text>
                </Center>
                {/* <Center>
                    <Text style={{
                        width: screenW,
                        fontSize: 15,
                        color: '#333',
                        marginTop: (screenH*2)/100,
                        textTransform: 'uppercase',
                        paddingLeft: (screenW*8)/100,
                        // fontWeight: 'bold'
                    }} >
                        {"ผู้รับเรื่อง:  Admin"}
                    </Text>
                </Center> */}
                
                 <Center bg={"#e2e2e2"} mt={(screenH*2)/100} w={'100%'} borderRadius={6} pb={(screenH*2)/100}>
                    {listItemProcess.length==0?
                    <Center w={screenW} h={(screenH*5)/100}
                    _text={{
                        color: '#aaa',
                        fontSize: 14,
                    }}
                    justifyContent={'center'} mt={(screenH*2)/100} >
                        ไม่มีข้อมูล
                        </Center>:null}
                    
                    {listItemProcess.map(res => {
                        return (
                        <Pressable onPress={() => {
                            // if (res == 1) {
                            //     navigation.push("FormtaskScreen", route.params)
                            // } else {
                            //     navigation.push("SelectFormtypetask", route.params)
                            // }
                            console.log(res);
                            navigation.push('ProcessDetailScreen', {
                                resultprocess: res,
                                dataLogin: route.params.dataLogin,
                                newuuid: route.params.newuuid,
                                resultItemRef: route.params.resultItemRef
                            })
                        }}>
                            {({ isHovered, isFocused, isPressed }) => {
                            return (
                                <Box
                                    w={(screenW*85)/100}
                                    h={(screenH*8)/100}
                                    justifyContent={'center'}
                                    pl="4"
                                    pr="5"
                                    py="2"
                                    borderRadius={6}
                                    bg={isPressed?"#e2e2e2":"#f2f2f2"}
                                    mt={(screenH*2)/100}
                                >
                                    <HStack space={3} justifyContent="space-between">
                                        <Box w={'30%'}>
                                            <Text
                                                style={{
                                                    fontSize: 13,
                                                    color: '#555'
                                                }}
                                            >
                                            {res.title}
                                            </Text>
                                        </Box>
                                        <Box w={'20%'}>
                                            <Text
                                                style={{
                                                    fontSize: 13,
                                                    color: '#555'
                                                }}
                                            >
                                            {res.update_by}
                                            </Text>
                                        </Box>
                                        <Box w={'30%'} alignItems={'center'}>
                                            <Text
                                                alignSelf="flex-start"
                                                style={{
                                                    fontSize: 13,
                                                    color: '#555'
                                                }}
                                            >
                                                {moment(new Date(res.create_date)).locale("th", momentTH).format("Do MMM YYYY")}
                                            </Text>
                                        </Box>
                                        <Box w={'10%'}>
                                            <IconFeather name="chevron-right" style={{fontSize: 20, color: '#555'}} />
                                        </Box>
                                    </HStack>
                                </Box>
                            )
                            }}
                        </Pressable>
                            )
                    })}
                </Center>

                <Center bg={"#f2f2f2"} mt={(screenH*2)/100} w={'100%'} borderRadius={6} pb={(screenH*2)/100}>
                       {statusRatting=="st_03"? <Text style={{
                            fontSize: 12,
                            color: '#333',
                            textTransform: 'uppercase',
                            letterSpacing: 1,
                            marginTop: 8
                            // paddingLeft: (screenW*8)/100
                        }} >
                            {ratingShow>0?"คะแนนความพึงพอใจในการให้บริการ":"โปรดให้คะแนนความพึงพอใจในการให้บริการ"}
                        </Text>:<Center />}

                {statusRatting=="st_03"?
                ratingShow>0?
                        <Center style={{
                            marginTop: 15
                            }} _text={{
                            fontSize: 12,
                            color:'#333',
                            fontWeight: 'bold',
                        }}>
                                <Image
                                    style={{
                                        width:55,
                                        height:55,
                                    }}
                                    resizeMode={'contain'}
                                    source={dataSetImageIcon}
                                    alt="Alternate Text"
                                />
                                {ratingShow+"/5"}
                        </Center>
                    :
                    <HStack mt={5}>

                            <Pressable onPress={() => {
                                if (dataIcon1==0) {
                                    set_dataIcon1(1)
                                } else {
                                    set_dataIcon1(0)
                                }
                                set_dataIcon2(0)
                                set_dataIcon3(0)
                                set_dataIcon4(0)
                                set_dataIcon5(0)
                            }}>
                            {({ isHovered, isFocused, isPressed }) => {
                                return (
                                    <Center _text={{
                                        fontSize: 16,
                                        color: dataIcon1==0?'#888':'#333',
                                        fontWeight: 'bold'
                                    }}>
                                        <Image
                                            style={{
                                                width: dataIcon1==0?45:55,
                                                height: dataIcon1==0?45:55,
                                                opacity: dataIcon1==0?0.3:1
                                            }}
                                            resizeMode={'contain'}
                                            source={require('../img/Happy_icon/Icon_1.png')}
                                            alt="Alternate Text"
                                        />
                                        1
                                    </Center>
                                )}}
                            </Pressable>

                            <Pressable onPress={() => {
                                if (dataIcon2==0) {
                                    set_dataIcon2(1)
                                } else {
                                    set_dataIcon2(0)
                                }
                                set_dataIcon1(0)
                                set_dataIcon3(0)
                                set_dataIcon4(0)
                                set_dataIcon5(0)
                            }}>
                            {({ isHovered, isFocused, isPressed }) => {
                                return (
                                    <Center _text={{
                                        fontSize: 16,
                                        color: dataIcon2==0?'#888':'#333',
                                        fontWeight: 'bold'
                                    }}>
                                        <Image
                                            style={{
                                                width: dataIcon2==0?45:55,
                                                height: dataIcon2==0?45:55,
                                                opacity: dataIcon2==0?0.3:1
                                            }}
                                            resizeMode={'contain'}
                                            source={require('../img/Happy_icon/Icon_2.png')}
                                            alt="Alternate Text"
                                        />
                                        2
                                    </Center>
                                )}}
                            </Pressable>

                            <Pressable onPress={() => {
                                if (dataIcon3==0) {
                                    set_dataIcon3(1)
                                } else {
                                    set_dataIcon3(0)
                                }
                                set_dataIcon1(0)
                                set_dataIcon2(0)
                                set_dataIcon4(0)
                                set_dataIcon5(0)
                            }}>
                            {({ isHovered, isFocused, isPressed }) => {
                                return (
                                    <Center _text={{
                                        fontSize: 16,
                                        color: dataIcon3==0?'#888':'#333',
                                        fontWeight: 'bold'
                                    }}>
                                        <Image
                                            style={{
                                                width: dataIcon3==0?45:55,
                                                height: dataIcon3==0?45:55,
                                                opacity: dataIcon3==0?0.3:1
                                            }}
                                            resizeMode={'contain'}
                                            source={require('../img/Happy_icon/Icon_3.png')}
                                            alt="Alternate Text"
                                        />
                                        3
                                    </Center>
                                )}}
                            </Pressable>

                            <Pressable onPress={() => {
                                if (dataIcon4==0) {
                                    set_dataIcon4(1)
                                } else {
                                    set_dataIcon4(0)
                                }
                                set_dataIcon1(0)
                                set_dataIcon2(0)
                                set_dataIcon3(0)
                                set_dataIcon5(0)
                            }}>
                            {({ isHovered, isFocused, isPressed }) => {
                                return (
                                    <Center _text={{
                                        fontSize: 16,
                                        color: dataIcon4==0?'#888':'#333',
                                        fontWeight: 'bold'
                                    }}>
                                        <Image
                                            style={{
                                                width: dataIcon4==0?45:55,
                                                height: dataIcon4==0?45:55,
                                                opacity: dataIcon4==0?0.3:1
                                            }}
                                            resizeMode={'contain'}
                                            source={require('../img/Happy_icon/Icon_4.png')}
                                            alt="Alternate Text"
                                        />
                                        4
                                    </Center>
                                )}}
                            </Pressable>

                            <Pressable onPress={() => {
                                if (dataIcon5==0) {
                                    set_dataIcon5(1)
                                } else {
                                    set_dataIcon5(0)
                                }
                                set_dataIcon1(0)
                                set_dataIcon2(0)
                                set_dataIcon3(0)
                                set_dataIcon4(0)
                            }}>
                            {({ isHovered, isFocused, isPressed }) => {
                                return (
                                    <Center _text={{
                                        fontSize: 16,
                                        color: dataIcon5==0?'#888':'#333',
                                        fontWeight: 'bold'
                                    }}>
                                        <Image
                                            style={{
                                                width: dataIcon5==0?45:55,
                                                height: dataIcon5==0?45:55,
                                                opacity: dataIcon5==0?0.3:1
                                            }}
                                            resizeMode={'contain'}
                                            source={require('../img/Happy_icon/Icon_5.png')}
                                            alt="Alternate Text"
                                        />
                                        5
                                    </Center>
                                )}}
                            </Pressable>
                        </HStack>
                        :<Center />
                    }
                        <Box w={'100%'} />
    {statusRatting=="st_03" && ratingShow==0?
                            <Pressable onPress={() => {
                                if (dataIcon1 == 0 && dataIcon2 == 0 && dataIcon3 == 0 && dataIcon4 == 0 && dataIcon5 == 0) {
                                    
                                } else {
                                    var tempRattting = [dataIcon1,dataIcon2,dataIcon3,dataIcon4,dataIcon5].findIndex(res => res ==1)
                                    onSendRating(tempRattting+1);
                                }
                            }}>
                            {({ isHovered, isFocused, isPressed }) => {
                                return (
                                    <Box 
                                        style={{
                                            backgroundColor: colors.Green1,
                                            width: 55,
                                            height: 55,
                                            opacity: isPressed?0.5:1,
                                            borderRadius: 100,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                        <Text style={{
                                            fontSize: 14,
                                            color: '#FFF',
                                            textTransform: 'uppercase',
                                            letterSpacing: 1,
                                            // paddingLeft: (screenW*8)/100
                                        }} >
                                            {"ส่ง"}
                                        </Text>
                                    </Box>
                            )}}
                            </Pressable>
                            :<Center />}
                            
                </Center>

                <Center mt={(screenH*8)/100}>
                    <SuccessBTN 
                        textColor={'#FFF'}
                        bgColor={colors.Green1}
                        bgColor2={colors.Green2}
                        height={(screenH*7)/100}
                        onPress={() => {
                            
                            onSearchTask();

                        }} maxWidth={(screenW*85)/100} text={"ดูการร้องเรียนอื่นๆของตนเอง"} />

                </Center>
                <Box w={screenW} h={(screenH*10)/100} />
            
        </Center>
        </ScrollView>
        </SafeAreaView>
    </SafeAreaProvider>
    )

}

export default HistoryItemScreen;


const styles = StyleSheet.create({
    cssBodyPanel: {
        width: screenW,
        backgroundColor: '#FAFAFA',
        alignItems: 'center',
        paddingHorizontal: (screenW*3)/100,
    },
    cssContaniner: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    }
})