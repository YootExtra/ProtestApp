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
    Image,
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


const screenW = Dimensions.get("screen").width;
const screenH = Dimensions.get("screen").height;

const SelectProductScreen = ({navigation, route}) => {

    useEffect(() => {
        
    },[])

    const [ inpCID, set_inpCID ] = useState("");

    const GenCell = (res) => {
        return(
            <Pressable onPress={() => {
                if (res == 1) {
                    navigation.push("FormtaskScreen", route.params)
                } else {
                    navigation.push("SearchHistoryScreen", route.params)
                }
            }}>
            {({ isHovered, isFocused, isPressed }) => {
              return (
                <Box 
                borderRadius={8}
                ml={(screenW*3)/100}
                // borderRadius={(screenW*18)/100/2}
                bg={res == 1?isPressed?colors.Green2:colors.Green1:isPressed?colors.Gray2:colors.Gray1}
                justifyContent={'flex-start'}
                alignItems={'center'}
                flexDirection={'row'}
                pl={'8%'}
                style={{
                    width:(screenW*85)/100,
                    height: 110,
                    shadowColor: "#333333",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 2,
                }}
                >
                    
                    {res == 1?
                        <IconFontAwesome name="send" style={{
                            fontSize: 35,
                            color: isPressed?colors.Green1:'#FFF',
                            marginLeft: -5
                        }} />
                        :
                        <IconFontAwesome name="history" style={{
                            fontSize: 45,
                            color: isPressed?colors.Gray1:'#FFF',
                            marginLeft: -5
                        }} />
                    }
                    {res == 1?
                    <Box
                    ml={'10%'}
                    _text={{
                        fontSize: 16,
                        color: isPressed?colors.Green1:'#FFF',
                    }}>
                        ร้องเรียนร้องทุกข์/ขอคำปรึกษา
                    </Box>
                    :
                    <Box
                    ml={'10%'}
                    _text={{
                        fontSize: 16,
                        color: isPressed?colors.Gray1:'#FFF',
                    }}>
                        ติดตามเรื่องร้องเรียนร้องทุกข์
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
                <Box w={screenW} h={screenH}  >
                    {/* <HStack pl={(screenW*5)/100} pt={(screenH*3)/100} bg={'#f2f2f2'}>
                        <Box>
                            <IconFontAwesome name="user-circle" 
                                style={{
                                    fontSize: 55,
                                    color: '#576675',
                                    marginLeft: -5
                                }} />
                        </Box>
                        <Box ml={(screenW*2)/100}>
                            <Box _text={{
                                fontSize: 16,
                                color: "#333333"
                            }}>
                            {"สวัสดี "}
                            </Box>
                            <Box _text={{
                                fontSize: 22,
                                color: "#333333",
                                marginTop: -1,
                            }}>
                                {route.params.dataLogin.f_name+" "+route.params.dataLogin.l_name}
                            </Box>
                        </Box>
                    </HStack> */}
                    <Center pt={(screenH*5)/100} >
                        <Image
                            w={(screenW*80)/100}
                            h={(screenH*20)/100}
                            resizeMode={'contain'}
                            source={require('../img/Logo.png')}
                            alt="Alternate Text"
                        />
                    </Center>
                    <Center w={screenW} bg={'#f2f2f2'} mt={(screenH*8)/100}>
                        <Box 
                        w={(screenW*90)/100} 
                        // h={(screenH*53)/100}
                        style={{
                            justifyContent: 'center',
                        }}
                        borderRadius={8}>
                            
                             {GenCell(1)}
                             <Box w={screenW} h={(screenH*4)/100} />
                             {GenCell(2)}
                             
                        </Box>
                    </Center>
                </Box>

            </SafeAreaView>
        </SafeAreaProvider>
    )

}

export default SelectProductScreen;

const styles = StyleSheet.create({
    cssBodyPanal: {
        // width: screenW,
        // height: screenH,
    },
    cssContaniner: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        justifyContent: 'space-between', 
        alignItems: 'center'
    }
})