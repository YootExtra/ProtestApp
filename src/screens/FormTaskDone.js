/* eslint-disable prettier/prettier */


import React,{ useEffect, useState, useRef } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    SafeAreaView,
    Text,
    PermissionsAndroid,
    Platform,
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
    Alert,
    CloseIcon,
    IconButton,
    Collapse,
    VStack,
    Image as Nativeimage
} from 'native-base';
import { colors, I18n } from '../lib';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import  libI18n from 'react-native-i18n';
import {
    SuccessBTN
} from '../Components/Button';
import ViewShot,{ captureScreen, captureRef } from "react-native-view-shot";

import CameraRoll from "@react-native-community/cameraroll";
import IconFontAwesome5  from 'react-native-vector-icons/FontAwesome5';
import Swiper from 'react-native-swiper'

const screenW = Dimensions.get("screen").width;
const screenH = Dimensions.get("screen").height;

const FormTaskDone = ({ route, navigation }) => {

    const [ refNumber, set_refNumber ] = useState("");
    const viewCapRef = useRef();
    const [ show, set_show ] = useState(false);
  
      const [ valueType, set_valueType ] = useState("");
    useEffect(() => {
        console.log(route.params);
        set_refNumber(route.params.dataReq.ref);
        set_valueType(route.params.dataType.objtype.organ_name);
        // setTimeout(() => onSaveBillTransfer(),400);
    },[]);

  const hasAndroidPermission = async() => {
    const permissionW = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
    const permissionR = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
  
    const hasPermissionW = await PermissionsAndroid.check(permissionW);
    const hasPermissionR = await PermissionsAndroid.check(permissionR);
    if (hasPermissionW && hasPermissionR) {
      return true;
    }
  
    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }

  const onSaveBillTransfer = () => {
    
    // captureScreen({
    captureRef(viewCapRef,{
      format: "jpg",
      quality: 0.8
    }).then(
        uri => {
            console.log("Image saved to", uri)
            savePicture2(uri);
        },
        error => console.error("Oops, snapshot failed", error)
    );
}

const savePicture2 = async (urlimage) => {
    if (Platform.OS === "android" && !(await hasAndroidPermission())) {
      return;
    }
    CameraRoll.saveToCameraRoll(urlimage).then(function(result) {
      console.log('save succeeded ' + result);
      set_show(true);
      setTimeout(() => set_show(false),1000);
    }).catch(function(error) {
      console.log('save failed ' + error);
    });
  };
  
  const savePicture = async (urlimage) => {
    if (Platform.OS === "android" && !(await hasAndroidPermission())) {
      return;
    }
    CameraRoll.saveToCameraRoll(urlimage).then(function(result) {
      console.log('save succeeded ' + result);
      set_show(true);
      setTimeout(() => set_show(false),2000);
    }).catch(function(error) {
      console.log('save failed ' + error);
    });
  };

    return(

        <SafeAreaView style={styles.cssContaniner}>
        <ScrollView
            _contentContainerStyle={{
              mb: (screenH*15)/100,
              minW: "72",
            }}
          >
        <Center style={styles.cssBodyPanel}>

            <ViewShot ref={viewCapRef} style={{ backgroundColor: '#FAFAFA',}} options={{ format: "jpg", quality: 0.9 }}>

            <Box w={(screenW)} h={(screenH*5)/100} />
                {route.params.dataInfo.photo.uri==null?
                    <VStack>
                    <Center w={screenW} >
                        <Image style={{
                                width: 60,
                                height: 60,
                                resizeMode: 'contain'
                            }} source={require('../img/Logo.png')}
                        />
                    </Center>
                    <Center>
                        <Box w={(screenW*50)/100}
                        justifyContent={'flex-end'}  alignItems={'center'} pb={(screenH*2)/100} >
                            <Box _text={{
                                fontSize: 18,
                                color: "#333",
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                            }}>
                                {"เลขที่คำร้อง"}
                            </Box>
                            <Box  _text={{
                                fontSize: 30,
                                color: "#d52771",
                                textTransform: 'uppercase',
                                letterSpacing: 2,
                                fontWeight: 'bold',
                            }}>
                                {refNumber}
                            </Box>
                            <Box _text={{
                                fontSize: 10,
                                color: "#333",
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                            }}>
                                {libI18n.strftime(new Date(), "%d %b %Y %H:%M %p")}
                            </Box>
                        </Box>
                    </Center>
                    </VStack>
                    :
                    <HStack >
                        <Box w={(screenW*50)/100}
                        justifyContent={'flex-end'} alignItems={'center'} >
                            <Image
                                style={{
                                    width: 200,
                                    height: 120,
                                    resizeMode: 'contain',
                                }}
                                source={require('../img/Logo.png')} />
                        </Box>
                        <Box style={{
                            width: (screenW*50)/100,
                            height: 120,
                            alignItems: 'center',
                            paddingTop: 20
                        }} >
                            <Box _text={{
                                fontSize: 18,
                                color: "#333",
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                            }}>
                                {"เลขที่คำร้อง"}
                            </Box>
                            <Box  _text={{
                                fontSize: 18,
                                color: "#d52771",
                                textTransform: 'uppercase',
                                letterSpacing: 2,
                                fontWeight: 'bold',
                            }}>
                                {refNumber}
                            </Box>
                            <Box _text={{
                                fontSize: 10,
                                color: "#333",
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                            }}>
                                {libI18n.strftime(new Date(), "%d %b %Y %H:%M %p")}
                            </Box>
                        </Box>
                    </HStack>
                }

                <Text2 style={{
                    marginTop: (screenH*1)/100,
                    paddingHorizontal: (screenW*10)/100,
                    // textIndent: '20%',
                }} >
                    <Text2 color={"#003366"} fontSize={14} _text={{
                        fontSize: 12,
                        color: '#003366',
                        textTransform: 'uppercase',
                        letterSpacing: 1,
                        textAlign: 'center'
                    }}>{"( กรุณาบันทึกเลขที่คำร้องสำหรับการตรวจสอบติดตามภายหลัง )"}
                    </Text2>
                </Text2>
                {route.params.statusFormUser==true?
                <Box style={{
                    width: screenW,
                    flexDirection: 'row',

                }}>
                    <Box style={{ 
                        width: '47%', 
                        // height: (screenH*20)/100, 
                        // backgroundColor: '#888',
                        // justifyContent: 'center',
                        alignItems: 'center',
                        paddingTop: 10,
                         }} mt={(screenH*2)/100} >
                        
                        {route.params.dataInfo.photo.height==null?
                            
                            <Nativeimage 
                            source={{uri: route.params.dataInfo.photo.uri}}
                            // size={(screenW*45)/100}
                            w={70}
                            h={150}
                            bg={"#333"}
                            resizeMode={"contain"} />
                            
                        :route.params.dataInfo.photo.height > route.params.dataInfo.photo.width?
                            <Nativeimage 
                            source={{uri: route.params.dataInfo.photo.uri}}
                            // size={(screenW*45)/100}
                            w={70}
                            h={150}
                            bg={"#333"}
                            resizeMode={"contain"} />
                        :
                            <Nativeimage 
                            source={{uri: route.params.dataInfo.photo.uri}}
                            // w={150}
                            // h={70}
                            w={(screenW*40)/100}
                            h={(screenW*18)/100}
                            bg={"#f2f2f2"}
                            resizeMode={"contain"} />
                        }
                    </Box>
                    <Box style={{ width: '48%' }} mt={(screenH*2)/100}>
                        
                        <Text2 color={"#333"} fontSize={14} _text={{
                            fontSize: 12,
                            color: '#333',
                            textTransform: 'uppercase',
                            letterSpacing: 1,
                        }}>{"ชื่อ: "+route.params.dataInfo.Name}
                        </Text2>
                        <Text2 color={"#333"} fontSize={14} _text={{
                            fontSize: 12,
                            color: '#333',
                            textTransform: 'uppercase',
                            letterSpacing: 1,
                        }}>{"เลขบัตรประชาชน: "+route.params.dataInfo.Cid}
                        </Text2>
                        <Text2 color={"#333"} fontSize={14} _text={{
                            fontSize: 12,
                            color: '#333',
                            textTransform: 'uppercase',
                            letterSpacing: 1,
                        }}>{"ที่อยู่: "+(route.params.dataInfo.Address.length==0?"-":route.params.dataInfo.Address)}
                        </Text2>
                        <Text2 color={"#333"} fontSize={14} _text={{
                            fontSize: 12,
                            color: '#333',
                            textTransform: 'uppercase',
                            letterSpacing: 1,
                        }}>{"เบอร์โทรศัพท์: "+route.params.dataInfo.Phone}
                        </Text2>
                    </Box>
                </Box>
                :<Box />}
                
                <Text style={{
                    width: screenW,
                    fontSize: 14,
                    color: '#333',
                    marginTop: (screenH*3)/100,
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                    // fontWeight: 'bold',
                    // marginBottom: (screenH*2)/100,
                    // paddingLeft: (screenW*5)/100,
                    textAlign: 'center'
                }} >
                    {I18n.t("Case")+" "+valueType}
                </Text>
                <Text style={{
                    width: screenW,
                    fontSize: 14,
                    color: '#333',
                    marginTop: 2,
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                    // fontWeight: 'bold',
                    // marginBottom: (screenH*2)/100,
                    // paddingLeft: (screenW*5)/100,
                    textAlign: 'center'
                }} >
                    {"กรณี "+route.params.subtype.name}
                </Text>
                <Text style={{
                    width: screenW,
                    fontSize: 14,
                    color: '#333',
                    marginTop: (screenH*1)/100,
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                    paddingLeft: (screenW*5)/100
                }} >
                    {"เรื่อง "+route.params.dataHeader}
                </Text>
                <Text2 style={{
                    marginTop: (screenH*1)/100,
                    paddingHorizontal: (screenW*5)/100,
                    // textIndent: '20%',
                }} >
                    <Text2 color={"#FAFAFA"} fontSize={14} _text={{
                    fontSize: 14,
                    color: '#FAFAFA',
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                    }} >{"__"}
                    </Text2>
                    <Text2 color={"#333"} fontSize={14} _text={{
                        fontSize: 14,
                        color: '#333',
                        textTransform: 'uppercase',
                        letterSpacing: 1,
                    }}>{route.params.dataDetail}
                    </Text2>
                </Text2>
                {/* <Swiper style={styles.wrapper} showsButtons={false}>
                {route.params.listfilePath.map(resimg => {

                    if(resimg.type == "application/pdf") {
                        return <View style={styles.slide1}><Box style={{
                                width: 120, height: 50,
                                backgroundColor: '#f2f2f2',
                                justifyContent: 'center',
                                alignContent: 'center',
                                alignItems: 'center'
                                }}>
                                <IconFontAwesome5 name="file-pdf" style={{fontSize: 20,color: '#555'}} />
                                <Box _text={{
                                    fontSize: 9,
                                    color: '#555'
                                }}>
                                    {resimg.fileName}
                                </Box>
                            </Box></View>
                    } else {

                        return  <View style={styles.slide2}>
                            <Image source={{uri: resimg.uri}} style={{width: 250, height: 100, resizeMode: 'contain'}} />
                        </View>
                    }
                })}
                </Swiper> */}
                <Center style={{
                    width: screenW,
                    alignItems: 'center',
                    paddingTop: (screenH*3)/100,
                }}>
                    {route.params.listfilePath.map(resimg => {

                    if(resimg.type == "application/pdf") {
                        return <Box style={{
                                width: 120, height: 50,
                                backgroundColor: '#f2f2f2',
                                justifyContent: 'center',
                                alignContent: 'center',
                                alignItems: 'center'
                                }}>
                                <IconFontAwesome5 name="file-pdf" style={{fontSize: 20,color: '#555'}} />
                                <Box _text={{
                                    fontSize: 9,
                                    color: '#555'
                                }}>
                                    {resimg.fileName}
                                </Box>
                            </Box>
                    } else {

                        return <Image source={{uri: resimg.uri}} style={{width: 150, height: 100, resizeMode: 'contain'}} />
                    }
                    })}
                </Center>

                <Collapse isOpen={show} mt={(screenH*5)/100}>

                    <Alert w="100%" status="success" colorScheme="success">
                        <VStack space={2} flexShrink={1} w="100%">
                            <HStack
                            flexShrink={1}
                            space={2}
                            alignItems="center"
                            justifyContent="space-between"
                            >
                            <HStack flexShrink={1} space={2} alignItems="center">
                                <Alert.Icon />
                                <Text fontSize="md" fontWeight="medium" color="coolGray.800">
                                สำเร็จ
                                </Text>
                            </HStack>
                            <IconButton
                                variant="unstyled"
                                onPress={() => set_show(false)}
                                icon={<CloseIcon size="3" color="coolGray.600" />}
                            />
                            </HStack>
                            <Box
                            pl="6"
                            _text={{
                                color: "coolGray.600",
                            }}
                            >
                            บันทึกภาพหน้าจอลงอัลบั้มรูปสำเร็จ
                            </Box>
                        </VStack>
                    </Alert>
                </Collapse>
            </ViewShot>

            <HStack w={screenW} h={(screenH*3)/100} mt={(screenH*3)/100}>
                    <Center w={(screenW*50)/100} h={'100%'}>
                            <SuccessBTN 
                            textColor={'#FFF'}
                            bgColor={colors.Green1}
                            bgColor2={colors.Green2}
                            height={(screenH*7)/100}
                            onPress={() => {
                                // captureScreen({
                                //     format: "jpg",
                                //     quality: 0.8
                                // }).then(
                                //     uri => {
                                //         console.log("Image saved to", uri)
                                //         savePicture(uri);
                                //     },
                                //     error => console.error("Oops, snapshot failed", error)
                                // );

                                captureRef(viewCapRef,{
                                    format: "jpg",
                                    quality: 0.8
                                }).then(
                                    uri => {
                                        console.log("Image saved to", uri)
                                        savePicture2(uri);
                                    },
                                    error => console.error("Oops, snapshot failed", error)
                                );
                            }} maxWidth={(screenW*40)/100} text={"บันทึกภาพ"} />
                    </Center>
                    <Center w={(screenW*50)/100} h={'100%'}>
                            <SuccessBTN 
                            textColor={colors.Green1}
                            bgColor={'#f2f2f2'}
                            bgColor2={'#e2e2e2'}
                            height={(screenH*7)/100}
                            onPress={() => {
                                navigation.reset({
                                    index: 0,
                                    routes: [
                                      {
                                        name: 'SelectProductScreen',
                                        params: route.params,
                                      },
                                    ],
                                  });
                            }} maxWidth={(screenW*40)/100} text={"หน้าหลัก"} />
                    </Center>
            </HStack>
            <Box w={(screenW)} h={(screenH*10)/100} />
        </Center>
    </ScrollView>
    </SafeAreaView>
    )

}

export default FormTaskDone;


const styles = StyleSheet.create({
    cssBodyPanel: {
        width: screenW,
        height: screenH,
        backgroundColor: '#FAFAFA',
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: (screenW*5)/100,
        overflow: 'scroll'
    },
    cssContaniner: {
        flex: 1,
        backgroundColor: '#FAFAFA',
        // backgroundColor: colors.MainColor3,
        justifyContent: 'space-between', 
        alignItems: 'center'
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#9DD6EB'
    },
    wrapper: {
        height: 150
    },
    slide2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    //   backgroundColor: '#97CAE5'
    },
})