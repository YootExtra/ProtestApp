/* eslint-disable prettier/prettier */

import React,{ useEffect, useState } from 'react';
import {
    StyleSheet,
    Dimensions,
    Text,
    PermissionsAndroid,
    Platform,
    Image,
    FlatList,
    View
} from 'react-native';
import {
    Container,
    Box,
    Center,
    VStack,
    Heading,
    HStack,
    Pressable,
    TextArea,
    Input,
    ScrollView
} from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { 
    colors,
    I18n
} from '../lib';
import Rowsdeails from '../Components/Rowsdetails';
import {
    getTypetask,
    getGroupTypetask,
    postSendtask,
    getTaskref
} from '../Action';
import {
    HeaderDefault
} from '../Components/Header';
import {
    InputText
} from '../Components/FormInput';
import {
    SuccessBTN
} from '../Components/Button';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { TextDefault } from '../Components/TextComponents';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconFontAwesome5  from 'react-native-vector-icons/FontAwesome5';
import ImgToBase64 from 'react-native-image-base64';
import ModalLoading from '../Components/ModalLoading';
import ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import { alignItems } from 'styled-system';
import ImageResizer from 'react-native-image-resizer';


const screenW = Dimensions.get("screen").width;
const screenH = Dimensions.get("screen").height;

const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

const ScreenTest = ({navigation, route}) => {

    useEffect(() => {
      console.log(route.params);
      set_valueType(route.params.dataType.objtype.organ_name);
      set_valueTypeHeader(route.params.subtype.name);
    },[]);

    const [ valueType, set_valueType ] = useState("");
    const [ valueTypeHeader, set_valueTypeHeader ] = useState("");
    const [ valueHeader, set_valueHeader ] = useState("");
    const [ valueDetail, set_valueDetail ] = useState("");
    const [filePath, setFilePath] = useState({uri:null});
    const [listfilePath, set_listfilePath] = useState([]);
    const [ visiModalLoading, set_visiModalLoading ] = useState(false);
    const [ viewlistimage, set_viewlistimage ] = useState(<Box />)
    
    const onGenRefTask = () => {
      return new Promise((resolve, reject) => {
        var dateNow = new Date();
        getTaskref().then(res => {
          console.log(res);
          let dataReftask = res.data;
          var rowOfTask = dataReftask.filter(resR => {
            var dataQ = new Date(resR.createdAt);
            var sumDate = dataQ.getFullYear().toString().substr(2,2)+""+(dataQ.getMonth()+1);
            var sumNowDate = dateNow.getFullYear().toString().substr(2,2)+""+(dateNow.getMonth()+1);
            if (parseInt(sumDate) == parseInt(sumNowDate)) {
              return true;
            } else {
              return false;
            }
          })
          var txtPrefix = (dateNow.getFullYear()+543).toString().substr(2,2);
          var _m = (dateNow.getMonth()+1).toString();
          var txtPrefix2 = "0";
          if (_m.length == 1) {
            txtPrefix2 = "0"+_m;
          } else {
            txtPrefix2 = _m;
          }
          var txtSuffix = "";
          var _rowOfTask = parseInt(rowOfTask.length);
          _rowOfTask = _rowOfTask+1;
          if (rowOfTask.length >= 100) {
            txtSuffix = _rowOfTask.toString()
          } else if (rowOfTask.length >= 10) {
            txtSuffix = "0"+_rowOfTask.toString();
          } else {
            txtSuffix = "00"+_rowOfTask.toString();
          }
          console.log(txtPrefix+txtPrefix2+txtSuffix);
          resolve(txtPrefix+txtPrefix2+txtSuffix);
        }).catch(err => {
          console.log(err);
          resolve(new Date().getTime())
        })
      })
    }

    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.CAMERA,
              {
                title: 'Camera Permission',
                message: 'App needs camera permission',
              },
            );
            // If CAMERA Permission is granted
            return granted === PermissionsAndroid.RESULTS.GRANTED;
          } catch (err) {
            console.warn(err);
            return false;
          }
        } else return true;
      };
    
      const requestExternalWritePermission = async () => {
        if (Platform.OS === 'android') {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              {
                title: 'External Storage Write Permission',
                message: 'App needs write permission',
              },
            );
            // If WRITE_EXTERNAL_STORAGE Permission is granted
            return granted === PermissionsAndroid.RESULTS.GRANTED;
          } catch (err) {
            console.warn(err);
            alert('Write permission err', err);
          }
          return false;
        } else return true;
      };

    const captureImage = async (type) => {
        let isCameraPermitted = await requestCameraPermission();
        let isStoragePermitted = await requestExternalWritePermission();
        if (isCameraPermitted && isStoragePermitted) {

            let options = {
              title: 'Select Image',
              customButtons: [
                { 
                  name: 'customOptionKey',
                  title: 'Choose Photo from Custom Option' 
                },
              ],
              MediaType: 'photo'
          };
          launchCamera(options, (response) => {
            set_visiModalLoading(true);
            console.log('Response = ', response);
    
            if (response.didCancel) {
              alert('User cancelled camera picker');
              return;
            } else if (response.errorCode == 'camera_unavailable') {
              alert('Camera not available on device');
              return;
            } else if (response.errorCode == 'permission') {
              alert('Permission not satisfied');
              return;
            } else if (response.errorCode == 'others') {
              alert(response.errorMessage);
              return;
            }
            console.log('base64 -> ', response.base64);
            console.log('uri -> ', response.uri);
            console.log('width -> ', response.width);
            console.log('height -> ', response.height);
            console.log('fileSize -> ', response.fileSize);
            console.log('type -> ', response.type);
            console.log('fileName -> ', response.fileName);
            setFilePath(response);
            
            var _tempH = 1520;
            var _tempW = 720;
            if (response.assets[0].height > response.assets[0].width) {
              _tempH = 1520;
              _tempW = 720;
            } else {
              _tempH = 720;
              _tempW = 1520;
            }

            ImageResizer.createResizedImage(
              response.assets[0].uri,
              _tempW,
              _tempH,
              'JPEG',
              80,
              0,
              undefined,
              true,
              { mode: "stretch", onlyScaleDown: false }
          ).then(resizedImage => {
                  console.log(resizedImage);

                  var _listImage = [{
                    index: listfilePath.length,
                    fileName: resizedImage.name,
                    uri: resizedImage.uri,
                    base64: ""
                  },...listfilePath]
                  
                  set_listfilePath(_listImage);
                  setTimeout(() => set_visiModalLoading(false),200);
          }).catch(err => {
            var _listImage = [{
              index: listfilePath.length,
              fileName: response.assets[0].fileName,
              uri: response.assets[0].uri,
              base64: ""
            },...listfilePath]
            
            set_listfilePath(_listImage);
            setTimeout(() => set_visiModalLoading(false),200);
          });
          
          }).catch(err => {

            setTimeout(() => set_visiModalLoading(false),200);
          });
        }
      };

    // Pick a single file
    const PickASingleFile = async () => {
      try {
        const res = await DocumentPicker.pick({
          type: [DocumentPicker.types.images, DocumentPicker.types.pdf ],
        });
        set_visiModalLoading(true);
        console.log(res);
        
        // RNFetchBlob.fs.readFile(res[0].uri, 'base64').then((data) => {
        //   console.log(data);

          var _listImage = [{
            index: listfilePath.length,
            fileName: res[0].name,
            uri: res[0].uri,
            type: res[0].type,
            base64: ""
            // base64: data
          },...listfilePath]
          
          set_listfilePath(_listImage);
            setTimeout(() => set_visiModalLoading(false),200);
        // }).catch((err) => {
        //   console.log(err)
        //     setTimeout(() => set_visiModalLoading(false),200);
        //   alert(JSON.stringify(err))
        // });
      } catch ( err ) {
        if ( DocumentPicker.isCancel(err) ) {
          console.log(err)
          alert('Canceled from single doc picker');
          // User cancelled the picker, exit any dialogs or menus and move on
        } else {
          // throw err;
          console.log(err)
          alert('Unknown Error: ' + JSON.stringify(err));
        }
            setTimeout(() => set_visiModalLoading(false),200);
      }
    }


    const onSendTask = async () => {
        let _dateNow = new Date().getTime().toString();
        let _dataCID = route.params.dataInfo.user_id;
        if(valueHeader.length > 0 && valueDetail.length > 0 && listfilePath.length > 0) {
          set_visiModalLoading(true);
          let textRef = await onGenRefTask();
          console.log(textRef)

              let dataReq = {
                  ref: textRef,
                  cid:route.params.dataLogin.cid,
                  id: _dataCID,
                  title: valueHeader,
                  detail: valueDetail,
                  update_by: "System",
                  img: "",
                  img_name: route.params.dataInfo.ImageProfile,
                  processtaskid: _dateNow.substr(_dateNow.length-4,_dateNow.length)+""+_dataCID.substr(_dataCID.length-4,_dataCID.length),
                  tasktype: route.params.subtype.ID,
                  organ_id: route.params.dataType.objtype.organ_id,
                  listimage: listfilePath,
                  fb_token: ""
              }
      
              console.log(dataReq);
              navigation.push("PreviewForm", {
                  dataHeader: valueHeader,
                  dataDetail: valueDetail,
                  dataReq: dataReq,
                  dataFile: filePath,
                  listfilePath: listfilePath
                  ,...route.params});
                setTimeout(() => set_visiModalLoading(false),300);
                
        } else {
          console.log("Validate Form")
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
                <HeaderDefault bgColor={colors.Green1} textColor={'#FFF'} navigation={navigation} textheader={"???????????????????????????????????????????????????????????????????????????"} />

                <Box w={screenW}  alignItems={'center'} paddingTop={(screenH*5)/100} >
                    <Center mb={(screenH*3)/100} >
                      <HStack w={"100%"} mt={(screenH*1)/100}>
                        <Box _text={{fontSize: 16, color: '#333'}}>
                            {I18n.t("Case")}
                        </Box>
                        <Box _text={{
                            fontSize: 16, color: '#333', letterSpacing: 0.4
                            }}>
                            {" "+valueType}
                        </Box>
                      </HStack>

                        <Box w={"100%"} mt={(screenH*1)/100} _text={{
                            fontSize: 16, color: '#333', letterSpacing: 0.4
                            }}>
                            {"???????????? "+valueTypeHeader}
                        </Box>
                    </Center>
                    <Center mb={(screenH*3)/100}>

                        <Box w={(screenW*85)/100} _text={{
                                fontSize: 14,
                                color: '#333'
                            }} >
                            {"??????????????????????????????"}
                        </Box>
                        <Input 
                        placeholder="??????????????????????????????..."
                        value={valueHeader}
                        onChangeText={res => set_valueHeader(res)}
                        fontSize={16}
                        bg={"#FFF"}
                        mt={(screenH*1)/100}
                        style={{
                            borderWidth: 0,
                            borderRadius: 6,
                            shadowColor: "#eee",
                            shadowOffset: {
                                width: 1,
                                height: 1,
                            },
                            shadowOpacity: 0.15,
                            shadowRadius: 1.5,
                            elevation: 2,
                        }}
                        h={(screenH*6)/100}
                        w={{
                            base: (screenW*85)/100,
                            md: (screenW*85)/100,
                        }} />
                    </Center>
                    <Center mb={(screenH*3)/100}>
                            <Box w={(screenW*85)/100} _text={{
                                fontSize: 14,
                                color: '#333'
                            }} >
                            {"??????????????????????????????????????????????????????????????????"}
                            </Box>
                            <TextArea
                            w={(screenW*85)/100}
                            // h={(screenH*20)/100}
                            bg={"#FFF"}
                            fontSize={16}
                            value={valueDetail}
                            onChangeText={res => set_valueDetail(res)}
                            numberOfLines={8}
                            mt={(screenH*1)/100}
                            _text={{ color: '#333'}}
                            style={{
                                borderWidth: 0,
                                borderRadius: 6,
                                shadowColor: "#eee",
                                shadowOffset: {
                                    width: 1,
                                    height: 1,
                                },
                                shadowOpacity: 0.15,
                                shadowRadius: 1.5,
                                elevation: 2,
                            }}
                            placeholder="??????????????????????????????????????????????????????????????????..."
                            />
                    </Center>
                    <Box w={(screenW*85)/100} _text={{
                                fontSize: 14,
                                color: '#333'
                            }} >
                            {"???????????????????????????/?????????????????????????????? ??????????????????????????????"}
                    </Box>

                    <HStack mt={(screenH*2)/100} >
                    <Center>
                        <Pressable onPress={res => {
                            captureImage();
                        }} >{({ isHovered, isFocused, isPressed }) => {
                        return (
                            <HStack w={(screenW*38)/100} opacity={isPressed?0.6:1}
                            style={{
                                  borderWidth: 1,
                                  borderColor: '#eee'
                            }}
                            h={(screenH*6)/100} 
                            bg={isPressed?colors.MainColor:"#FFF"} borderRadius={((screenW*85)/100)/2}>
                              <Box h={'100%'} 
                                style={{
                                  shadowColor: "#000",
                                  shadowOffset: {
                                      width: 1,
                                      height: 1,
                                  },
                                  shadowOpacity: 0.15,
                                  shadowRadius: 2.5,
                                  elevation: 5,
                                }} pl={'2%'}
                                justifyContent={'center'} alignItems={'center'}>
                                    <Box w={(screenW*12)/100} h={(screenW*12)/100} 
                                    borderRadius={((screenW*14)/100)/2} bg={'#FFF'}
                                    justifyContent={'center'} alignItems={'center'}>
                                        <IconMaterialIcons name={"photo-camera"} style={{
                                            fontSize: 32,
                                            color: isPressed?colors.MainColor:colors.Green1
                                        }} />
                                    </Box>
                              </Box>
                              <Box h={'100%'} pl={'5%'} justifyContent={'center'} >

                                    <Box _text={{ fontSize:16, color: isPressed?'#FFF':'#333' }}>
                                    {"?????????????????????"}
                                    </Box>
                                </Box>
                                <Box w={'15%'} h={'100%'} pl={'2%'} alignItems={'center'} justifyContent={'center'} >
                                    
                                </Box>
                            </HStack>
                        )}}
                        </Pressable>
                    </Center>
                    </HStack>
                    <HStack mb={(screenH*2)/100} mt={(screenH*2)/100}>
                      <Center ml={(screenW*2)/100} mr={(screenW*2)/100}>
                          <TextDefault textcolor={"#333"} fontSize={16} text={"????????????"} />
                      </Center>
                    </HStack>

                    <HStack mb={(screenH*2)/100}>
                    <Center>
                        <Pressable onPress={res => {
                            PickASingleFile();
                        }} >{({ isHovered, isFocused, isPressed }) => {
                        return (
                            <HStack w={(screenW*50)/100} opacity={isPressed?0.6:1}
                            style={{
                                  borderWidth: 1,
                                  borderColor: '#eee'
                            }}
                            h={(screenH*6)/100} 
                            bg={isPressed?colors.MainColor:"#FFF"} borderRadius={((screenW*85)/100)/2}>
                              <Box h={'100%'} 
                                style={{
                                  shadowColor: "#000",
                                  shadowOffset: {
                                      width: 1,
                                      height: 1,
                                  },
                                  shadowOpacity: 0.15,
                                  shadowRadius: 2.5,
                                  elevation: 5,
                                }} pl={'2%'}
                                justifyContent={'center'} alignItems={'center'}>
                                    <Box w={(screenW*12)/100} h={(screenW*12)/100} 
                                    borderRadius={((screenW*14)/100)/2} bg={"#FFF"}
                                    justifyContent={'center'} alignItems={'center'}>
                                        <IconFontAwesome name={"folder"} style={{
                                            fontSize: 28,
                                            color: isPressed?colors.MainColor:colors.Green1
                                        }} />
                                    </Box>
                              </Box>
                              <Box h={'100%'} pl={'5%'} justifyContent={'center'} >

                                    <Box _text={{ fontSize:16, color: isPressed?'#FFF':'#333' }}>
                                    {"????????????????????????????????????"}
                                    </Box>
                                </Box>
                                <Box w={'15%'} h={'100%'} pl={'2%'} alignItems={'center'} justifyContent={'center'} >
                                    
                                </Box>
                            </HStack>
                        )}}
                        </Pressable>
                        <Center mt={2} _text={{
                          fontSize: 12,
                          color: '#ff6666'
                        }}>
                          *????????????????????????????????????????????? pdf
                        </Center>
                    </Center>
                </HStack>
                
                    <FlatList
                    data={listfilePath}
                    w={screenW}
                    renderItem={res => {
                        let dataItem = res.item;
                        return <HStack mt={(screenH*2)/100} style={{
                          borderTopColor: '#ccc',
                          borderTopWidth: 1,
                          paddingTop: 15,
                        }} >
                          {dataItem.type == "application/pdf"?
                            <Box style={{
                              width: 250, height: 100,
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
                                {dataItem.fileName}
                              </Box>
                            </Box>
                          :
                            <Image source={{uri: dataItem.uri}} style={{ width: 250, height: 100, resizeMode: 'contain' }} />
                          }
                         <Pressable onPress={res => {
                             var getItem = listfilePath.filter(resF => resF.index != dataItem.index);
                            //  delete getItem[index]
                             console.log(dataItem);
                             set_listfilePath(getItem)
                             
                           }} >{({ isHovered, isFocused, isPressed }) => {
                           return (
                             <Box style={{
                               width: 50,
                               height: 100,
                               backgroundColor:isPressed==false?'#ec1957':'#fbe9ee',
                               borderRadius: 4,
                               justifyContent: 'center',
                               alignItems: 'center'
                             }} _text={{
                               color: isPressed==false?'#FFF':'#ec1957',
                               fontSize: 14
                             }}>
                               ??????
                             </Box>
                           )}}
                         </Pressable>
                       </HStack>
                    }}
                    keyExtractor={(item) => item.ref}
                    />
                    
                {route.params.subtype.name == "??????????????????????????????"?
                    <Box mt={(screenH*2)/100} pl={(screenW*3)/100} style={{
                      borderRadius: 4,
                      width: (screenW*85)/100,
                      paddingTop: (screenH*1)/100,
                      paddingBottom: (screenH*1)/100,
                      borderColor: '#555',
                      borderWidth: 1,
                      borderStyle: 'dashed'
                    }}
                    >
                      <Box
                      _text={{
                          color: '#222',
                          fontSize: 12,
                      }}
                      >
                        ??????????????????????????????????????????
                      </Box>
                      <Box
                      _text={{
                          paddingRight: (screenW*8)/100,
                          color: '#444',
                          fontSize: 11,
                      }}
                      >
                          ???????????????????????????????????????????????????????????????????????????????????? 2 ????????????????????????????????????????????????????????????????????????????????? 1567 (????????????????????????????????????????????????)
                      </Box>
                    </Box>
                    :<Center mt={(screenH*2)/100} />}

                <Center mt={(screenH*2)/100}>
                            <SuccessBTN 
                            textColor={'#FFF'}
                            bgColor={colors.Green1}
                            bgColor2={colors.Green2}
                            height={(screenH*8)/100}
                            onPress={() => {
                                
                                onSendTask();

                            }} maxWidth={(screenW*85)/100} text={"??????????????????"} />
                    </Center>

                <ModalLoading 
                text={".PROCESSING."} 
                modalVisible={visiModalLoading} 
                setModalVisible={set_visiModalLoading} />
                   
                </Box>
                <Box w={screenW} h={(screenH*15)/100} />
            
            </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    )

}

export default ScreenTest;

const styles = StyleSheet.create({
    cssBodyPanal: {
        // width: screenW,
        // height: screenH,
    },
    cssContaniner: {
        flex: 1,
        backgroundColor: '#FAFAFA',
        // backgroundColor: colors.MainColor3,
        justifyContent: 'space-between', 
        alignItems: 'center'
    }
})