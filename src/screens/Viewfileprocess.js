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

const Viewfileprocess = ({ route, navigation }) => {

    const [ viewFile, set_viewFile ] = useState(null);
    const webViewRef = useRef();

    useEffect(() => {
        console.log(route.params);

        let reImage = route.params.dataFileDetails.Name;
        console.log(MainUrlImage+reImage);
        if (route.params.dataFileDetails.Name.split('.')[route.params.dataFileDetails.Name.split('.').length-1].toUpperCase() ==  "PDF") {
            set_viewFile('https://docs.google.com/gview?embedded=true&url='+MainUrlImage+reImage);
            // setTimeout(() => onReloadWeb(),200);
        } else {
            set_viewFile(MainUrlImage+reImage);
        }
        // set_viewFile(MainUrlImage+reImage.replace(/ /g,'%20'));

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

    // return(
    //     <SafeAreaProvider>
    //         <SafeAreaView style={styles.cssContaniner}>
    //             <ScrollView
    //                 _contentContainerStyle={{
    //                 mb: (screenH*15)/100,
    //                 minW: "72",
    //                 }}
    //             >
    //                 <HeaderDefault bgColor={colors.Green1} textColor={'#FFF'} navigation={navigation} textheader={"ระบุข้อมูล"} />
                    
    //                 <WebView
    //                     originWhitelist={['*']}
    //                     source={{ uri: viewFile }}
    //                 />
    //             </ScrollView>
    //         </SafeAreaView>
    //     </SafeAreaProvider>
    // )

}

export default Viewfileprocess;


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