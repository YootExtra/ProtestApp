/* eslint-disable prettier/prettier */


import React,{ useEffect, useState, useRef } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
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
    Checkbox
} from 'native-base';
import { 
    colors,
    I18n
} from '../lib';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import  libI18n from 'react-native-i18n';
import {
    SuccessBTN
} from '../Components/Button';
import ViewShot,{ captureScreen } from "react-native-view-shot";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import CameraRoll from "@react-native-community/cameraroll";
import { postSendtask, postUploadimages, postUploadimages_data, postUploadimages_image } from '../Action';
import ModalLoading from '../Components/ModalLoading';
import HeaderDefault from '../Components/Header/HeaderDefault'
import IconFontAwesome5  from 'react-native-vector-icons/FontAwesome5';
import ImgToBase64 from 'react-native-image-base64';
import RNFetchBlob from 'rn-fetch-blob';


const screenW = Dimensions.get("screen").width;
const screenH = Dimensions.get("screen").height;

const PreviewForm = ({ route, navigation }) => {

    const [ refNumber, set_refNumber ] = useState("");
    const viewCapRef = useRef();
    const [ show, set_show ] = useState(false);
    const [ inpCheck, set_inpCheck ] = useState(false);
    const [ visiModalLoading, set_visiModalLoading ] = useState(false);
    const [ valueType, set_valueType ] = useState("");
    const [ valueTypeHeader, set_valueTypeHeader ] = useState("");

    useEffect(() => {
        console.log(route.params);
        set_visiModalLoading(false)
        set_refNumber(route.params.dataReq.ref);
        set_valueType(route.params.dataType.objtype.organ_name);
        set_valueTypeHeader(route.params.subtype.name);
    },[]);


  const hasAndroidPermission = async() => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
  
    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }
  
    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }
  
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

  const onSendTask = () => {
    if (inpCheck == true) {
        set_visiModalLoading(true)
        var tempReqImageSave = []
        route.params.listfilePath.forEach((resFY,index) => {
            var _date = new Date().getTime().toString();
            if (resFY.base64 == null || resFY.base64 == "") {
                RNFetchBlob.fs.readFile(resFY.uri, 'base64').then((data) => {
                    tempReqImageSave.push({
                        ID: "MG"+index+""+new Date().getTime(),
                        img_name: route.params.dataReq.ref+"-"+index+"-"+_date+"."+resFY.fileName.split('.')[resFY.fileName.split('.').length-1],
                        img: data,
                        task_id: route.params.dataReq.ref
                    })
                }).catch((err) => {
                    console.log(err)
                    alert(JSON.stringify(err))
                    tempReqImageSave.push({
                        ID: "MG"+index+""+new Date().getTime(),
                        img_name: route.params.dataReq.ref+"-"+index+"-"+_date+"."+resFY.fileName.split('.')[resFY.fileName.split('.').length-1],
                        img: resFY.base64,
                        task_id: route.params.dataReq.ref
                    })
                });

            } else {
                    tempReqImageSave.push({
                        ID: "MG"+index+""+new Date().getTime(),
                        img_name: route.params.dataReq.ref+"-"+index+"-"+_date+"."+resFY.fileName.split('.')[resFY.fileName.split('.').length-1],
                        img: resFY.base64,
                        task_id: route.params.dataReq.ref
                    })
            }

        })
        setTimeout(() => {
            console.log(tempReqImageSave);
            postSendtask(route.params.dataReq).then(res => {
                console.log(res);
                let dataReqUpload = tempReqImageSave;
                console.log(dataReqUpload);
                setTimeout(() => set_visiModalLoading(false),300);
                dataReqUpload.forEach(resReqImg => {
                    postUploadimages_data(resReqImg).then(resUploadData => {
                        console.log(resUploadData);
                        return postUploadimages_image(resReqImg);
                    }).then(resUploadImg => {
                        console.log(resUploadImg);
                    }).catch(err => {
                        console.log(err);
                        // alert(JSON.stringify(err));
                    });
                });
                navigation.push("FormTaskDone", route.params);
                // postUploadimages({listimage:dataReqUpload}).then(res => {
                //     console.log(res)
                //     navigation.push("FormTaskDone", route.params);
                //     setTimeout(() => set_visiModalLoading(false),500);
                // }).catch(err => {
                //     setTimeout(() => set_visiModalLoading(false),500);
                //     console.log(err)
                //     alert(JSON.stringify(err))
                // })
            }).catch(err => {
                console.log(err);
                alert(JSON.stringify(err))
            })
        },500);
        
        
    } else {
        set_show(true);
        setTimeout(() => set_show(false),1500)
    }
  }

    return(
        <SafeAreaProvider>
            <SafeAreaView style={styles.cssContaniner}>
            <ScrollView
                _contentContainerStyle={{
                  mb: (screenH*15)/100,
                  minW: "72",
                }}
              >
            <HeaderDefault bgColor={colors.Green1} textColor={'#FFF'} navigation={navigation} textheader={"Preview"} />

                
                <Center w={screenW} mt={(screenH*5)/100} alignContent={'center'}>
                        <Box _text={{fontSize: 16, color: '#333'}}>
                            {I18n.t("Case")+" "+valueType}
                        </Box>
                </Center>
                <Text style={{
                    width: screenW,
                    fontSize: 18,
                    color: '#333',
                    marginTop: (screenH*2)/100,
                    marginBottom: (screenH*3)/100,
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
                    fontSize: 16,
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
                {route.params.listfilePath.map(resimg => {

                    if(resimg.type == "application/pdf") {
                        return <Center w={screenW} mt={(screenH*2)/100}>
                            <Box style={{
                                width: 220, height: 100,
                                backgroundColor: '#f2f2f2',
                                justifyContent: 'center',
                                alignContent: 'center',
                                alignItems: 'center'
                                }}>
                                <IconFontAwesome5 name="file-pdf" style={{fontSize: 30,color: '#555'}} />
                                <Box _text={{
                                    fontSize: 14,
                                    color: '#555'
                                }}>
                                    {resimg.fileName}
                                </Box>
                            </Box>
                        </Center>
                    } else {

                        return <Center w={screenW} mt={(screenH*2)/100}>
                            <Image source={{uri: resimg.uri}} style={{width: 350, height: 100, resizeMode: 'contain'}} />
                        </Center>
                    }
                })}
                <ModalLoading 
                text={".PROCESSING."} 
                modalVisible={visiModalLoading} 
                setModalVisible={set_visiModalLoading} />

                {/* <Text style={{
                    fontSize: 14,
                    color: '#333',
                    marginTop: (screenH*1)/100,
                    textTransform: 'uppercase',
                }} >
                    {"วันที่ "+new Date().toISOString()}
                </Text>
                <Text style={{
                    fontSize: 14,
                    color: '#333',
                    textTransform: 'uppercase',
                }} >
                    {"กรุญาเก็บเลขที่คำร้องไว้สำหรับการติดตามข้อร้องเรียน"}
                </Text> */}

                <Checkbox _text={{
                    fontSize: 14,
                    color: '#333'
                }} mt={(screenH*2)/100} mb={(screenH*2)/100} colorScheme={'success'} value={inpCheck} onChange={res => {
                    console.log(res)
                    set_inpCheck(res);
                }} >
                    ขอรับรองว่าเป็นความจริง
                </Checkbox>

                <Collapse isOpen={show} mb={(screenH*1)/100}>

                    <Alert w="100%" bg={"#fafafa"} status="warning" colorScheme="warning">
                        <VStack space={2} flexShrink={1} w="100%" bg={'#f2ebdd'} pb={(screenH*2)/100} pt={(screenH*2)/100}>
                            <Center
                            _text={{
                                color: colors.Warning2,
                                fontSize: 14,
                            }}
                            >
                            กรุณากดรับรองว่าเป็นความจริง
                            </Center>
                        </VStack>
                    </Alert>
                </Collapse>
            <HStack style={{
                width: screenW,
                marginTop: 10
            }}>
                    <Center style={{
                        width: '50%'
                    }}>
                            <SuccessBTN 
                            textColor={colors.Green1}
                            bgColor={'#f2f2f2'}
                            bgColor2={'#e2e2e2'}
                            height={45}
                            onPress={() => {
                                navigation.goBack();
                            }} maxWidth={(screenW*40)/100} text={"แก้ไข"} />
                    </Center>
                    <Center style={{
                        width: '50%'
                    }}>
                            <SuccessBTN 
                            textColor={'#FFF'}
                            bgColor={colors.Green1}
                            bgColor2={colors.Green2}
                            height={45}
                            onPress={() => {
                                onSendTask();
                            }} maxWidth={(screenW*40)/100} text={"ส่งคำร้อง"} />
                    </Center>
            </HStack>

                
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    )

}

export default PreviewForm;


const styles = StyleSheet.create({
    cssBodyPanel: {
        width: screenW,
        height: screenH,
        backgroundColor: '#FAFAFA',
        flex: 1,
        // paddingTop: (screenH*12)/100,
        alignItems: 'center',
        paddingHorizontal: (screenW*5)/100,
    },
    cssContaniner: {
        flex: 1,
        backgroundColor: '#FAFAFA',
        // backgroundColor: colors.MainColor3,
        justifyContent: 'space-between', 
        alignItems: 'center'
    }
})