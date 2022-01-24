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
    Input,
    ScrollView,
    Collapse,
    Alert
} from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { 
    colors,
    I18n
} from '../lib';
import Rowsdeails from '../Components/Rowsdetails';
import IconFeather from 'react-native-vector-icons/Feather';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import {
    getTypetask,
    getGroupTypetask,
    getTask
} from '../Action';
import { HeaderDefault } from '../Components/Header';
import { SuccessBTN } from '../Components/Button';

const screenW = Dimensions.get("screen").width;
const screenH = Dimensions.get("screen").height;

const SearchHistoryScreen = ({navigation, route}) => {

    useEffect(() => {
        
    },[])

    const [ show, set_show ] = useState(false);
    const [ messageshow, set_messageshow ] = useState("ไม่พบเลขที่คำร้อง");

    const [ inpRef, set_inpRef ] = useState("");
    // const [ inpRef, set_inpRef ] = useState("641014");

    const onGetTask = () => {
        console.log(inpRef);
        if (inpRef.length > 0) {
            set_messageshow("ไม่พบเลขที่คำร้อง");
            getTask(inpRef).then(res => {
                console.log(res);
                var dataDetect = res.data.filter(res => res.cid == route.params.dataLogin.cid);
                if (dataDetect.length > 0) {
                    console.log(res.data[0]);
                    navigation.push("HistoryItemScreen",{
                        resultItemRef: dataDetect[0]
                        ,...route.params
                    })
                } else {
                    set_show(true);
                    setTimeout(() => set_show(false),2500);
                }
            }).catch(err => {
                console.log(err);
                set_show(true);
                setTimeout(() => set_show(false),2500);
            })
        } else {
            set_messageshow("โปรดกรอกเลขที่คำร้อง");
            setTimeout(() => set_show(true),500);
            setTimeout(() => set_show(false),2500);
        }
    }

    return(
        <SafeAreaProvider>
            <SafeAreaView style={styles.cssContaniner}>

            <ScrollView
                _contentContainerStyle={{
                    w: screenW,
                  mb: (screenH*15)/100,
                  minW: "72",
                }}
              >
                <Box w={screenW} h={screenH}  >
                <HeaderDefault bgColor={colors.Green1} textColor={'#FFF'} navigation={navigation} textheader={"ระบุเลขที่คำร้อง"} />
                <Center w={screenW} >
                    
                        <HStack bg={colors.Gray1} w={(screenW*90)/100} h={(screenH*8)/100} 
                        borderRadius={10} justifyContent={'center'} alignItems={'center'} mt={(screenH*10)/100}>
                            <Input mx="3" value={inpRef} keyboardType="numeric" onChangeText={res => {
                                set_inpRef(res)
                            }} placeholder="เลขที่..." borderWidth={0} w={'80%'} h={(screenH*7)/100} 
                            borderRadius={100} style={{
                                fontSize: 18,
                                paddingLeft: (screenW*5)/100,
                                color: '#FFF'
                            }}/>
                            <Center w={'20%'} h={'100%'}>
                                <IconFeather name={"search"} style={{fontSize: 25, color: '#FFF'}} />
                            </Center>
                        </HStack>
                        


                </Center>

                </Box>
                <Center mt={(screenH*5)/100} style={{
                    width: screenW,
                    position:'absolute',
                    bottom: (screenH*15)/100,
                }} >
                    <Center w={screenW} >
                        <Collapse isOpen={show} mb={(screenH*1)/100}>
                            <Alert w={screenW} status="warning" colorScheme="warning">
                                <VStack space={2} flexShrink={1} w="100%" pb={(screenH*1)/100} pt={(screenH*1)/100}>
                                    <Center
                                    _text={{
                                        color: '#555',
                                        fontSize: 14,
                                    }}
                                    >
                                    {messageshow}
                                    </Center>
                                </VStack>
                            </Alert>
                        </Collapse>
                    </Center>
                    <SuccessBTN
                        bgColor={colors.Green1}
                        bgColor2={'#FFF'}
                        textColor={'#333'}
                        height={(screenH*8)/100}
                        onPress={() => {
                            onGetTask()
                            // console.log(route.params);
                        }}
                        maxWidth={(screenW * 90) / 100}
                        text={"ตรวจสอบ"}
                    />
                </Center>
            </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    )

}

export default SearchHistoryScreen;

const styles = StyleSheet.create({
    cssBodyPanal: {
        // width: screenW,
        // height: screenH,
    },
    cssContaniner: {
        flex: 1,
        backgroundColor: "#f2f2f2",
        justifyContent: 'space-between', 
        alignItems: 'center'
    }
})