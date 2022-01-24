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
    Pressable
} from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { 
    colors,
    I18n
} from '../lib';
import Rowsdeails from '../Components/Rowsdetails';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
    HeaderDefault
} from '../Components/Header';
import {
    SuccessBTN
} from '../Components/Button';

const screenW = Dimensions.get("screen").width;
const screenH = Dimensions.get("screen").height;

const SelectFormtask = ({navigation, route}) => {

    useEffect(() => {
        
    },[])

    const [ inpCID, set_inpCID ] = useState("");

    const GenCell = (res) => {
        return(
            <Pressable onPress={() => {
                if (res == 1) {
                    navigation.push("FormtaskScreen", route.params)
                } else {
                    navigation.push("SelectFormtypetask", route.params)
                }
            }}>
            {({ isHovered, isFocused, isPressed }) => {
              return (
                <Box 
                w={(screenW*80)/100} 
                h={(screenH*23)/100} 
                borderRadius={8} 
                opacity={isPressed?0.5:1}
                bg={res == 1?colors.Green1:colors.Warning2}
                justifyContent={'center'}
                alignItems={'center'}
                // pl={'8%'}
                style={{
                    // shadowColor: "#333333",
                    // shadowOffset: {
                    //     width: 0,
                    //     height: 2,
                    // },
                    // shadowOpacity: 0.25,
                    // shadowRadius: 3.84,
                    // elevation: 5,
                }}
                >
                    <IconFontAwesome5 name={res==1?"user-alt":"user-slash"} style={{
                        color: isPressed?colors.Gray1:"#FFF",
                        fontSize: 55
                    }} />
                    <Box
                    _text={{
                        fontSize: 22,
                        color: isPressed?colors.Gray1:"#FFF",
                        textAlign: 'center',
                        fontWeight: 'bold',
                        marginTop: 5
                    }}>
                        ส่งคำร้องเรียน
                        </Box>
                    {res == 1?
                    <Center
                    _text={{
                        fontSize: 15,
                        color: isPressed?colors.Gray1:"#FFF",
                        textAlign: 'center',
                        marginTop: -2,
                        letterSpacing: 1.1
                    }}>
                        ประสงค์ออกนาม
                    </Center>
                    :
                    <Box
                    _text={{
                        fontSize: 15,
                        color: isPressed?colors.Gray1:"#FFF",
                        textAlign: 'center',
                        marginTop: -2,
                        letterSpacing: 1
                    }}>
                       ไม่ประสงค์ออกนาม
                    </Box>
                    }
                    </Box>
                    )}}
                </Pressable>
        )
    }

    return(
        <SafeAreaProvider>
            <SafeAreaView style={styles.cssContaniner}>
                <HeaderDefault bgColor={"#FFF"} textColor={colors.MainColor} navigation={navigation} textheader={"เลือกฟอร์ม"} />
                <Center w={screenW} h={(screenH*80)/100}  >
                    
                    {GenCell(1)}
                    <Box w={screenW} h={(screenH*8)/100} />
                    {GenCell(2)}

                </Center>

            </SafeAreaView>
        </SafeAreaProvider>
    )

}

export default SelectFormtask;

const styles = StyleSheet.create({
    cssBodyPanal: {
        // width: screenW,
        // height: screenH,
    },
    cssContaniner: {
        flex: 1,
        // backgroundColor: '#FAFAFA',
        backgroundColor: colors.Gray2,
        // backgroundColor: colors.MainColor,
        justifyContent: 'space-between', 
        alignItems: 'center'
    }
})