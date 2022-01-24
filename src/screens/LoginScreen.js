/* eslint-disable prettier/prettier */
import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, Dimensions, Text, ImageBackground, Platform, PermissionsAndroid} from 'react-native';
import {
  Container,
  Box,
  Center,
  VStack,
  Heading,
  HStack,
  Image,
  ScrollView,
  Collapse,
  Alert,
} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {colors, I18n} from '../lib';
import {InputNumber} from '../Components/FormInput';
import {SuccessBTN} from '../Components/Button';
import {PopupRegister} from '../Components/ModalPopup';
import {postLoginmobile} from '../Action';
import {getUniqueId} from 'react-native-device-info';
import {TextDefault} from '../Components/TextComponents';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalLoading from '../Components/ModalLoading';

import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';


const screenW = Dimensions.get('screen').width;
const screenH = Dimensions.get('screen').height;

const LoginScreen = ({navigation, route}) => {
  const [inpCID, set_inpCID] = useState('');
  // const [inpCID, set_inpCID] = useState('3940900434372');
  const [visibleRegisterModal, set_visibleRegisterModal] = useState(false);
  const [ visiModalLoading, set_visiModalLoading ] = useState(false);
  const [ show, set_show ] = useState(false);
  const viewCapRef = useRef();

  const onLogin = () => {
    set_visiModalLoading(true);
    postLoginmobile({
      cid: inpCID,
      uuid: getUniqueId(),
    })
      .then(resultlogin => {
        console.log('login success');
        console.log(resultlogin);
        if (resultlogin.data.length > 0) {
          let getDevice = resultlogin.data.filter(res => res.Device.status == 1);
          if (getDevice.length > 0 && getDevice[0].Device.unique_id == getUniqueId()) {
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: 'SelectProductScreen',
                    params: {
                      dataLogin: getDevice[0],
                    },
                  },
                ],
              });
              setTimeout(() => set_visiModalLoading(false),500);
          } else {
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: 'SelectProductScreen',
                  params: {
                    dataLogin: {
                        cid: inpCID,
                        fname: "",
                        lname: "",
                        phone: ""
                    },
                    newuuid: getUniqueId(),
                  },
                },
              ],
            });
            setTimeout(() => set_visiModalLoading(false),500);
          }
        } else {
          navigation.reset({
            index: 0,
            routes: [
              {
                name: 'SelectProductScreen',
                params: {
                  dataLogin: {
                      cid: inpCID,
                      fname: "",
                      lname: "",
                      phone: ""
                  },
                  newuuid: getUniqueId(),
                },
              },
            ],
          });
          setTimeout(() => set_visiModalLoading(false),500);
        }
      })
      .catch(err => {
        console.log('login error');
        console.log(err);
        setTimeout(() => set_visiModalLoading(false),500);
      });
  };


    // Pick a single file
    const PickASingleFile = async () => {
      try {
        const res = await DocumentPicker.pick({
          type: [DocumentPicker.types.images, DocumentPicker.types.pdf ],
        });
        console.log(res);
        // ImgToBase64.getBase64String(res[0].uri).then(base64String => {
        //     console.log(base64String)
        // }).catch(err => {
        //   console.log(err)
        // });
        RNFetchBlob.fs.readFile(res[0].uri, 'base64').then((data) => {
          console.log(data);
        }).catch((err) => {
          console.log(err)
        });
      } catch ( err ) {
        if ( DocumentPicker.isCancel(err) ) {
          console.log(err)
          // User cancelled the picker, exit any dialogs or menus and move on
        } else {
          // throw err;
          console.log(err)
        }
      }
    }



  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.cssContaniner}>
      <ScrollView
                _contentContainerStyle={{
                  mb: (screenH*15)/100,
                  minW: "72",
                }}
              >
      <ImageBackground style={styles.cssBodyPanel} source={require('../img/BGApp.png')} >
        <Center w={screenW} h={screenH} >

          <VStack
            w={screenW}
            h={screenH}
            pt={(screenH * 5) / 100}
            pl={(screenW * 3) / 100}
            pr={(screenW * 3) / 100}>
            <Center h={(screenH*30)/100} >
              <HStack w={screenW} h={(screenH * 20) / 100} >
                <Box w={'55%'} h={'100%'} alignItems={'center'} justifyItems={'center'} justifyContent={'center'}>
                  <Image
                    w={(screenW*50)/100}
                    resizeMode={'contain'}
                    source={require('../img/Logo.png')}
                    alt="Alternate Text"
                  />
                </Box>
                <Box w={'45%'} h={'100%'} justifyItems={'center'} justifyContent={'center'}>
                  <Text
                    style={{
                      fontSize: 25,
                      fontWeight: 'bold',
                      color: '#333',
                    }}>
                    {'จังหวัดสตูล'}
                  </Text>
                </Box>
              </HStack>
              <Box w={'100%'} alignItems={'flex-end'} mt={-(screenH*4)/100} pr={(screenW*3)/100}>
              <Text
                style={{
                  fontSize: 16,
                  color: '#333',
                //   marginTop: (screenH * 1) / 100,
                  // textTransform: 'uppercase',
                  letterSpacing: 2,
                //   marginLeft: (screenW*20)/100
                }}>
                {"บริการด้วยใจ คนไทยยิ้มได้"}
              </Text>
              </Box>
            </Center>
            <Center h={(screenH*30)/100} pt={(screenH*5)/100} >
              <InputNumber
                Panalwidth={(screenW * 80) / 100}
                title={I18n.t('IDCard')}
                valuePH={'ระบุหมายเลขบัตรประจำตัวประชาชน'}
                maxLength={13}
                value={inpCID}
                onChangeText={res => set_inpCID(res)}
                BGColor={"#e2e2e2"}
                // BGColor={colors.Green2}
              />
              <Box style={{
                width: screenW,
                height: 30,
              }} />
              <Collapse isOpen={show} style={{
                
              }} >
                <Box w={(screenW*80)/100} >
                    <VStack space={2} flexShrink={1} w={(screenW*80)/100} >
                        <Center
                        _text={{
                            color: '#bb4444',
                            fontSize: 12,
                        }}
                        >
                        *กรุณากรอกข้อมูลให้ครบเลขบัตรประจำตัวประชาชน
                        </Center>
                    </VStack>
                </Box>
              </Collapse>
              <Center 
                style={{
                  marginTop: 5
                }}
                >
                  <SuccessBTN
                      bgColor={'#78d3b6'}
                      bgColor2={'#FFF'}
                      textColor={'#444'}
                      height={20}
                      // height={(screenH*7)/100}
                      onPress={() => {
                        if(inpCID.length == 13) {
                          onLogin();
                          // PickASingleFile()
                        } else {
                          set_show(true);
                          setTimeout(() => set_show(false),3000);
                        }
                      }}
                      maxWidth={(screenW * 75) / 100}
                      text={I18n.t('login')}
                  />
                </Center>
            </Center>
            <Box h={(screenH*25)/100} pr={(screenW*3)/100} alignItems={'flex-end'} justifyContent={'flex-end'} >
                <Box>
                    <TextDefault textcolor={"#333"} fontSize={16} text={"สำนักงานจังหวัดสตูล"} />
                </Box>
                <Box>
                    <TextDefault textcolor={"#333"} fontSize={16} text={"ศาลากลางจังหวัดสตูล"} />
                </Box>
                <Box>
                    <TextDefault textcolor={"#333"} fontSize={16} text={"ต.พิมาน อ.เมือง จ.สตูล 91000"} />
                </Box>
                <HStack mt={(screenH*1)/100}>
                        <Center w={(screenW*8)/100} h={(screenW*8)/100} 
                        borderWidth={2} 
                        mr={(screenW*2)/100}
                        borderRadius={((screenW*8)/100)/2}
                        borderColor={colors.MainColor}>
                        <IconMaterialCommunityIcons name={"phone-in-talk"} style={{
                            fontSize: 18,
                            color: colors.MainColor
                        }} />
                        </Center>
                        <TextDefault textcolor={colors.MainColor} fontSize={20} text={"074-724404"} />
                </HStack>

                <ModalLoading 
                text={".PROCESSING."} 
                modalVisible={visiModalLoading} 
                setModalVisible={set_visiModalLoading} />
            </Box>
          </VStack>
        </Center>
        <PopupRegister
          modalVisible={visibleRegisterModal}
          setModalVisible={set_visibleRegisterModal}
        />
        </ImageBackground>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  cssBodyPanal: {
    // width: screenW,
    // height: screenH,
  },
  cssContaniner: {
    flex: 1,
    // backgroundColor: '#FAFAFA',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cssBodyPanel: {
    width: screenW,
    height: screenH,
  }
});
