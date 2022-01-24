/* eslint-disable prettier/prettier */


import React,{ useEffect, useState, useRef } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    PermissionsAndroid,
    Platform,
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
import { WebView } from 'react-native-webview';
import HeaderDefault from '../Components/Header/HeaderDefault';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import IconFeather from 'react-native-vector-icons/Feather';
import Config from 'react-native-config';
const MainUrlImage = Config.API_Service+'/localimage/';

const screenW = Dimensions.get("screen").width;
const screenH = Dimensions.get("screen").height;

const ViewTaskDetailFile = ({ route, navigation }) => {

    const [ viewFile, set_viewFile ] = useState(route.params.datauri);
    const webViewRef = useRef();

    useEffect(() => {
        console.log(route.params);
    },[]);

    const onReloadWeb = () => {
        webViewRef.current.reload();
    }

    return(
        <Box style={{
            flex: 1,
            backgroundColor: '#FAFAFA'
        }}>
            <HeaderDefault bgColor={colors.Green1} textColor={'#FFF'} navigation={navigation} textheader={"เอกสาร"} />
            
            <WebView
                ref={(ref) => webViewRef.current = ref}
                style={{
                    width: screenW,
                    height: (screenH*90)/100,
                    backgroundColor: '#FAFAFA'
                }}
                originWhitelist={['*']}
                source={{ uri: viewFile }}
                bounces={false}
                scrollEnabled={false} 
            />
            <Pressable onPress={() => {
                onReloadWeb()
            }}>
            {({ isHovered, isFocused, isPressed }) => {
              return (
                <Center w={screenW} height={(screenH*5)/100} bg={'#fafafa'} >
                    <Center 
                    bg={colors.Green1} 
                    borderRadius={((screenW*15)/100)/2}
                    mt={-(screenH*5)/100}
                    w={(screenW*15)/100} 
                    h={(screenW*15)/100}>
                        <IconFeather name='refresh-ccw' style={{fontSize: 20, color: '#FFF'}} />
                    </Center>
                    <Box _text={{ fontSize:14, color: colors.Green1 }}>
                        รีโหลดหน้า
                    </Box>
                </Center>
               )}}
            </Pressable>
        </Box>
    )


}

export default ViewTaskDetailFile;


const styles = StyleSheet.create({
    cssBodyPanel: {
        // width: screenW,
        // height: screenH,
        // backgroundColor: '#FAFAFA',
        flex: 1,
        // paddingTop: (screenH*12)/100,
        // alignItems: 'center',
        // paddingHorizontal: (screenW*5)/100,
    }
})