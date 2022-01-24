/* eslint-disable prettier/prettier */


import React,{ useEffect, useState, useRef } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    PermissionsAndroid,
    Platform
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
    Alert,
    CloseIcon,
    IconButton,
    Collapse,
    VStack,
    Pressable
} from 'native-base';
import { colors } from '../lib';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import  libI18n from 'react-native-i18n';
import {
    SuccessBTN
} from '../Components/Button';
import ViewShot,{ captureScreen } from "react-native-view-shot";
import CameraRoll from "@react-native-community/cameraroll";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import FileViewer from "react-native-file-viewer";
import IconFeather from 'react-native-vector-icons/Feather';
import moment from "moment";
import momentTH from 'moment/locale/th';

const screenW = Dimensions.get("screen").width;
const screenH = Dimensions.get("screen").height;

const ProcessDetailScreen = ({ route, navigation }) => {

    const [ refNumber, set_refNumber ] = useState("");
    const viewCapRef = useRef();
    const [ show, set_show ] = useState(false);

    const [ dataHeader, set_dataHeader ] = useState("");
    const [ dataDetails, set_dataDetails ] = useState("");
    const [ dataImage, set_dataImage ] = useState(<Box />);
    const [ dateRef, set_dateRef ] = useState("-");
    const [ dataUpdate, set_dataUpdate ] = useState("");
    const [ listFileProcess, set_listFileProcess ] = useState([])

    useEffect(() => {
        console.log(route.params);
        let _dateCreate = new Date(route.params.resultprocess.create_date);
        var genDate = moment(_dateCreate).locale("th", momentTH).format("Do MMMM")
        var genMM = moment(_dateCreate).locale("th", momentTH).format("HH:MM")
        console.log("Gen Data Process")
        set_dataUpdate(route.params.resultprocess.update_by)
        set_dataHeader(route.params.resultprocess.title);
        set_dataDetails(route.params.resultprocess.detail);
        let reImage = route.params.resultprocess.img.replace("http://127.0.0.1:5678/images/","");
        set_listFileProcess(route.params.resultprocess.Imagetasks)
        console.log(reImage);
        set_dataImage(<Image
            w={(screenW*50)/100}
            h={(screenH*30)/100}
            resizeMode={'contain'}
            source={{uri: "http://103.30.124.82:5678/localimage/"+reImage}}
        />);
        set_dateRef(genDate+" "+(_dateCreate.getFullYear()+543)+" "+genMM);
    },[]);

    const getLocalPath = (url) => {
        const filename = url.split('/').pop();
        // feel free to change main path according to your requirements
        // return `${RNFS.DocumentDirectoryPath}/${filename}`;
      }

    return(

        <SafeAreaProvider>
            <SafeAreaView style={styles.cssContaniner}>

            <ScrollView
                _contentContainerStyle={{
                    w: screenW,
                    // h: screenH,
                  mb: (screenH*15)/100,
                  minW: "72",
                //   justifyItems: 'center'
                }}
              >
        <Box style={styles.cssBodyPanel}>
                <Box w={screenW} h={(screenH*25)/100}
                    justifyContent={'flex-end'} alignItems={'center'} pb={(screenH*1)/100} >
                        <Center w={screenW} mt={(screenH*2)/100}>
                            <Image
                                w={(screenW*50)/100}
                                h={(screenH*22)/100}
                                ml={-(screenW*5)/100}
                                resizeMode={'contain'}
                                source={require('../img/Logo.png')}
                                alt="Alternate Text"
                            />
                        </Center>
                </Box>
                <Text style={{
                    width: screenW,
                    fontSize: 16,
                    color: '#333',
                    marginTop: (screenH*1)/100,
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                    paddingLeft: (screenW*5)/100
                }} >
                    {"เรื่อง "}
                </Text>
                <Text style={{
                    width: screenW,
                    fontSize: 16,
                    color: '#333',
                    marginTop: (screenH*1)/100,
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                    paddingLeft: (screenW*10)/100
                }} >
                    {dataHeader}
                </Text>
                <Text style={{
                    width: screenW,
                    fontSize: 16,
                    color: '#333',
                    marginTop: (screenH*3)/100,
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                    paddingLeft: (screenW*5)/100
                }} >
                    {"รายละเอียด "}
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
                    }}>{dataDetails}
                    </Text2>
                </Text2>
                <Text style={{
                    width: screenW,
                    fontSize: 16,
                    color: '#333',
                    marginTop: (screenH*3)/100,
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                    paddingLeft: (screenW*5)/100
                }} >
                    {"วันที่ เวลาที่บันทึก "}
                </Text>
                <Text style={{
                    width: screenW,
                    fontSize: 16,
                    color: '#333',
                    marginTop: (screenH*1)/100,
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                    paddingLeft: (screenW*10)/100
                }} >                                            
                    {dateRef}
                </Text>
                <Text style={{
                    width: screenW,
                    fontSize: 16,
                    color: '#333',
                    marginTop: (screenH*3)/100,
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                    paddingLeft: (screenW*5)/100
                }} >
                    {"รับเรื่องโดย "}
                </Text>
                <Text style={{
                    width: screenW,
                    fontSize: 14,
                    color: '#333',
                    marginTop: (screenH*1)/100,
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                    paddingLeft: (screenW*10)/100
                }} >                                            
                    {dataUpdate}
                </Text>
                {listFileProcess.map((resFile, index) => {
                    return <Center w={screenW} mt={(screenH*3)/100} bg={"#eee"} h={(screenH*20)/100}
                    style={{
                        borderColor: '#aaa',
                        borderWidth: 1,
                        borderStyle:'dashed'
                    }}>
                        <Pressable onPress={() => {
                            navigation.push("Viewfileprocess", {dataFileDetails: resFile,...route.params});
                        }}>
                        {({ isHovered, isFocused, isPressed }) => {
                        return (
                            <HStack  
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
                                    // marginTop: (screenH*3)/100,
                                    // textTransform: 'uppercase',
                                    // letterSpacing: 1,
                                    paddingLeft: (screenW*2)/100
                                }} >
                                    {"เอกสารแนบ ("+(index+1)+")"}
                                </Text>
                            </HStack>
                            )}}
                        </Pressable>
                    </Center>
                })}
                
                
                {/* <Center w={screenW} h={(screenH*25)/100} bg={"#eaeaea"} mt={(screenH*2)/100}
                    justifyContent={'flex-end'} alignItems={'center'} pb={(screenH*1)/100} >
                        {dataImage}
                </Center> */}
                {/* <Center w={screenW} mt={(screenH*1)/100}>
                            <SuccessBTN 
                            textColor={'#333'}
                            bgColor={'#eee'}
                            bgColor2={'#eee'}
                            height={(screenH*7)/100}
                            onPress={() => {
                                
                                navigation.push("Viewfileprocess", route.params);

                            }} maxWidth={(screenW*90)/100} text={"ดูเอกสารเพิ่มเติม"} />
                    </Center> */}
                <Center w={screenW} mt={(screenH*4)/100}>
                            <SuccessBTN 
                            textColor={'#333'}
                            bgColor={'#eee'}
                            bgColor2={'#eee'}
                            height={(screenH*6)/100}
                            onPress={() => {
                                navigation.goBack();
                            }} maxWidth={(screenW*90)/100} text={"ปิด"} />
                    </Center>

        </Box>
                <Box w={screenW} h={(screenH*25)/100} />
        </ScrollView>
        </SafeAreaView>
    </SafeAreaProvider>
    )

}

export default ProcessDetailScreen;


const styles = StyleSheet.create({
    cssBodyPanel: {
        width: screenW,
        height: screenH,
        backgroundColor: '#FAFAFA',
        // flex: 1,
        // paddingTop: (screenH*12)/100,
        // alignItems: 'center',
        // paddingHorizontal: (screenW*3)/100,
        // justifyContent: 'center',
    }
})