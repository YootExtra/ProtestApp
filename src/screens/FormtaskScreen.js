/* eslint-disable prettier/prettier */
import React,{ useEffect, useState } from 'react';
import {
    StyleSheet,
    Dimensions,
    Text,
    PermissionsAndroid,
    Platform,
    Image,
} from 'react-native';
import {
    Container,
    Box,
    Center,
    VStack,
    Heading,
    HStack,
    Pressable,
    ScrollView,
    Divider,
    Radio,
    TextArea,
    Collapse,
    Alert,
    FormControl,
    Select,
    CheckIcon,
    Checkbox,
    useToast
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
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
    getTypetask,
    getGroupTypetask,
    getProvince,
    postCreateuser,
    postUploadimage
} from '../Action';
import {
    HeaderDefault
} from '../Components/Header';
import {
    InputText
} from '../Components/FormInput';
import {
    SuccessBTN,
    TwoRowBTN
} from '../Components/Button';
import { TextDefault } from '../Components/TextComponents';
import { PopupAdrees } from '../Components/ModalPopup';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AddressScreen from './AddressScreen';
import ImgToBase64 from 'react-native-image-base64';
import ModalLoading from '../Components/ModalLoading';
import ImageResizer from 'react-native-image-resizer';

const screenW = Dimensions.get("screen").width;
const screenH = Dimensions.get("screen").height;

const FormtaskScreen = ({navigation, route}) => {

    useEffect(() => {
        console.log(route.params)
        // getGroupTypetask().then(res => {
        //     console.log(res);
        // }).catch(err => {
        //     console.log(err)
        // })
        // setTimeout(() => set_valueProvince("สตูล"),500);

        // setFilePath({uri:null});

        getListProvine();
    },[])

    const  Popalert = useToast()
    const [ listPrefix, set_listPrefix ] = useState([
      {
        index: 0,
        name: "นาย"
      },
      {
        index: 1,
        name: "นางสาว"
      },
      {
        index: 2,
        name: "นาง"
      }
    ]);
    const [ valuePrefix, set_valuePrefix ] = useState("");
    // const [ valueLNmae, set_valueLNmae ] = useState(route.params.dataLogin.f_name+" "+route.params.dataLogin.l_name);
    const [ valueCID, set_valueCID ] = useState(route.params.dataLogin.cid);
    // const [ valuePhone, set_valuePhone ] = useState(route.params.dataLogin.phone);
    const [ valueLNmae, set_valueLNmae ] = useState("");
    const [ valueFNmae, set_valueFNmae ] = useState("");
    // const [ valueCID, set_valueCID ] = useState("");
    const [ valuePhone, set_valuePhone ] = useState("");
    const [ valueSocial, set_valueSocial ] = useState("");
    const [ valueSocialLine, set_valueSocialLine ] = useState("");
    const [ valueSocialFB, set_valueSocialFB ] = useState("");
    const [ valueSocialOther, set_valueSocialOther ] = useState("");
    const [filePath, setFilePath] = useState({uri:null});
    const [ radioAddress, set_radioAddress ] = useState("1");
    const [ valueAddress, set_valueAddress ] = useState("");
    const [ valueModalAddress, set_valueModalAddress ] = useState(false);
    const [ valueListProvine, set_valueListProvine ] = useState([]);
    const [ valueCheckboxSocial, set_valueCheckboxSocial ] = useState([])

    const [ valueProvince, set_valueProvince ] = useState("");
    const [ valueDistrict, set_valueDistrict ] = useState("");
    const [ valueSubDistrict, set_valueSubDistrict ] = useState("");
    const [ valueZipcode, set_valueZipcode ] = useState("");
    const [ show, set_show ] = useState(false);
    const [ tagImageShow, set_tagImageShow ] = useState(<Box />)

    const [ statusForm, set_statusForm ] = useState(false);
    const [ statusLine, set_statusLine ] = useState(false);
    const [ statusFacebook, set_statusFacebook ] = useState(false);
    const [ statusOther, set_statusOther ] = useState(false);

    const [ visiModalLoading, set_visiModalLoading ] = useState(false);



    const getListProvine = () => {
      var _data = [];
      getProvince().then(res => {
        res.data.forEach((resMap, index) => {
            _data.push({
                index: index,
                name: resMap.province
            });
        });
        set_valueListProvine(_data);
      });
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
              MediaType: 'photo',
              
          };
          launchCamera(options, (response) => {
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
                  setFilePath({
                    uri: resizedImage.uri, 
                    fileName: resizedImage.name
                  })
          }).catch(err => {
            setFilePath(response.assets[0]);
          });
            // console.log('base64 -> ', response.base64);
            // console.log('uri -> ', response.uri);
            // console.log('width -> ', response.width);
            // console.log('height -> ', response.height);
            // console.log('fileSize -> ', response.fileSize);
            // console.log('type -> ', response.type);
            // console.log('fileName -> ', response.fileName);
            // setFilePath(response.assets[0]);
            // set_tagImageShow(<Image source={{uri: response.assets[0].uri}} w={screenW} h={(screenH*25)/100} resizeMode={'contain'} />)
          });
        }
      };
      const chooseFile = async (type) => {
        let checkpermission = await requestExternalWritePermission();
        if (checkpermission == true) {
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
        launchImageLibrary(options, (response) => {
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
          // console.log('base64 -> ', response.base64);
          // console.log('uri -> ', response.uri);
          // console.log('width -> ', response.width);
          // console.log('height -> ', response.height);
          // console.log('fileSize -> ', response.fileSize);
          // console.log('type -> ', response.type);
          // console.log('fileName -> ', response.fileName);
          setFilePath(response.assets[0]);
          // set_tagImageShow(<Image source={{uri: response.assets[0].uri}} w={screenW} h={(screenH*25)/100} resizeMode={'contain'} />)

        });
      }
    }

    const onValidate = (_userID) => {
      set_visiModalLoading(true);
      ImgToBase64.getBase64String(filePath.uri).then(base64String => {


        var dataReqImage = {
          img:base64String,
          img_name:filePath.fileName
        }
          
        var dataReq = {
          cid: "",
          perfix: "",
          f_name: "",
          l_name: "",
          district: "",
          subdistrict: "",
          province: "",
          zipcode: "",
          address: "",
          phone: "",
          socialmedia: "",
          update_by: "",
          image: ""
        }

        postUploadimage(dataReqImage).then(resImageUpdate => {
          
          dataReq = {
            user_id: _userID,
            cid: valueCID,
            perfix: valuePrefix,
            f_name: valueFNmae,
            l_name: valueLNmae,
            district: valueDistrict.amphoe,
            subdistrict: valueSubDistrict.district,
            province: valueProvince,
            zipcode: valueZipcode,
            address: valueAddress,
            phone: valuePhone,
            socialmedia: valueSocialOther,
            socialmedia_line: valueSocialLine,
            socialmedia_facebook: valueSocialFB,
            update_by: 'System',
            image: resImageUpdate.data
          }
          console.log(dataReq);
          return postCreateuser(dataReq)
        }).then(res => {
            console.log(res);
            setTimeout(() => set_visiModalLoading(false),500);
            
              let setParams = {
                newuuid: route.params.newuuid,
                dataLogin: route.params.dataLogin,
                statusFormUser: true,
                dataInfo: {
                    Name: valuePrefix+" "+valueFNmae+" "+valueLNmae,
                    Cid: valueCID,
                    Phone: valuePhone,
                    socialmedia: valueSocialOther,
                    socialmedia_line: valueSocialLine,
                    socialmedia_facebook: valueSocialFB,
                    ImageProfile: dataReq.image,
                    user_id: _userID,
                    photo: filePath,
                    Address: valueSubDistrict.district+" "+valueDistrict.amphoe+" "+valueProvince+" "+valueZipcode
                }
              }
              navigation.push("SelectFormtypetask", setParams)
        }).catch(err => {
          setTimeout(() => set_visiModalLoading(false),500);
          console.log(err)
        })

        
      })

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
                <HeaderDefault bgColor={colors.Green1} textColor={'#FFF'} navigation={navigation} textheader={"ข้อมูลส่วนบุลคล"} />
                
                <Checkbox _text={{
                    fontSize: 14,
                    color: '#333',
                    width: (screenW*78)/100,
                }} mt={(screenH*2)/100} colorScheme={'success'} value={statusForm} onChange={res => {
                    console.log(res);
                    set_statusForm(res);
                    if (res) {
                      Popalert.show({
                        title: "กรณีไม่ประสงค์ออกนาม ท่านจะสามารถร้องเรียนได้ 2 กรณี คือ",
                        description: "กล่าวโทษเจ้าหน้าที่รัฐ และ แจ้งเบาะแสการกระทำผิด",
                        placement: "bottom",
                        backgroundColor: colors.Green1,
                      })
                    }
                }} >
                    ไม่ประสงค์ออกนาม
                </Checkbox>
                <Center style={{
                  marginTop: (screenH*3)/100,
                  marginBottom: (screenH*3)/100,
                }}>
                  <Box style={{
                    width: (screenW*85)/100,
                    height: 2,
                    backgroundColor: '#e2e2e2'
                  }} />
                </Center>

                <Box w={screenW} alignItems={'center'} mb={(screenH*3)/100} >
                    
                    <Center mb={(screenH*2)/100}>
                      <Box w={(screenW*85)/100} >
                        <FormControl.Label mb={0} >คำนำหน้า</FormControl.Label>
                        <Select
                            selectedValue={valuePrefix}
                            minWidth="200"
                            disable={true}
                            accessibilityLabel="คำนำหน้า"
                            placeholder="เลือกคำนำหน้า"
                            isDisabled={statusForm}
                            _selectedItem={{
                                bg: "teal.600",
                                endIcon: <CheckIcon size="5" />,
                            }}
                            style={{
                                fontSize: 16,
                                height: (screenH*6)/100,
                                backgroundColor: statusForm==false?'#FFF':'#e2e2e2',
                            }}
                            onValueChange={(itemValue) => {
                              set_valuePrefix(itemValue);
                            }}
                        >
                            {listPrefix.map(res => {
                                return <Select.Item key={res.index} _text={{fontSize: 16}} label={res.name} value={res.name} />
                            })}
                        </Select>
                    </Box>
                    </Center>
                    <Center mb={(screenH*2)/100}>
                        <InputText 
                            title={I18n.t("Firstname")}
                            Panalwidth={(screenW*85)/100} 
                            BGColor={"#FFF"} 
                            valuePH={I18n.t("Firstname")}
                            disable={statusForm}
                            ColorPH={"#333333"}
                            value={valueFNmae}
                            onChangeText={res => {
                                set_valueFNmae(res);
                            }} />

                    </Center>
                    <Center mb={(screenH*2)/100}>
                        <InputText 
                            title={I18n.t("Lastname")}
                            Panalwidth={(screenW*85)/100} 
                            BGColor={"#FFF"}
                            valuePH={I18n.t("Lastname")}
                            disable={statusForm}
                            ColorPH={"#333333"}
                            value={valueLNmae}
                            onChangeText={res => {
                                set_valueLNmae(res);
                            }} />

                    </Center>
                    {/* <Center mb={(screenH*2)/100}>
                        <InputText 
                            title={I18n.t("IDCard")}
                            Panalwidth={(screenW*85)/100} 
                            BGColor={"#FFF"} 
                            valuePH={I18n.t("IDCard")}
                            disable={true}
                            ColorPH={"#333333"}
                            value={valueCID}
                            onChangeText={res => {
                                set_valueCID(res);
                            }} />

                    </Center> */}
                    <Center mb={(screenH*2)/100}>
                        <InputText 
                            title={'เบอร์โทรศัพท์'}
                            Panalwidth={(screenW*85)/100} 
                            BGColor={"#FFF"} 
                            valuePH={'เบอร์โทรศัพท์'}
                            disable={statusForm}
                            ColorPH={"#333333"}
                            value={valuePhone}
                            onChangeText={res => {
                                set_valuePhone(res);
                            }} />

                    </Center>
                    <Center mb={(screenH*2)/100}>
                        <InputText 
                            title={'เลขที่บ้าน'}
                            Panalwidth={(screenW*85)/100} 
                            BGColor={"#FFF"} 
                            valuePH={'เลขที่บ้าน'}
                            disable={statusForm}
                            ColorPH={"#333333"}
                            value={valueAddress}
                            onChangeText={res => {
                                set_valueAddress(res);
                            }} />

                    </Center>
                    <Center mb={(screenH*2)/100}>
                      <AddressScreen 
                        valueProvince={valueProvince}
                        set_valueProvince={(res) => set_valueProvince(res)}
                        valueDistrict={valueDistrict}
                        set_valueDistrict={(res) => set_valueDistrict(res)}
                        valueSubDistrict={valueSubDistrict}
                        set_valueSubDistrict={(res) => set_valueSubDistrict(res)}
                        valueZipcode={valueZipcode}
                        isDisabled={statusForm}
                        set_valueZipcode={(res) => set_valueZipcode(res)}
                        route={route} 
                        navigation={navigation} />
                    </Center>
              <Center mb={(screenH*3)/100}>
                <Box w={(screenW*85)/100} >
                  <FormControl.Label mb={0} >{I18n.t("Socialmedia")}</FormControl.Label>
                    <Checkbox _text={{
                        fontSize: 14,
                        color: '#333',
                        width: (screenW*78)/100,
                    }} style={{
                      marginTop: 5
                    }} colorScheme={'success'} 
                    value={statusFacebook}
                    isDisabled={statusForm}
                    onChange={res => {
                        console.log(res);
                        set_statusFacebook(res);
                    }} >
                        {I18n.t("Facebook")}
                    </Checkbox>

                    {statusFacebook==true?<Center mb={(screenH*2)/100}>
                        <InputText 
                            title={""}
                            Panalwidth={(screenW*85)/100} 
                            BGColor={"#FFF"} 
                            valuePH={I18n.t("Facebook")}
                            disable={statusForm}
                            ColorPH={"#333333"}
                            value={valueSocialFB}
                            onChangeText={res => {
                                set_valueSocialFB(res);
                            }} />
                    </Center>:null}

                    <Checkbox _text={{
                        fontSize: 14,
                        color: '#333',
                        width: (screenW*78)/100,
                    }} mt={(screenH*2)/100} colorScheme={'success'} 
                    value={statusLine} 
                    isDisabled={statusForm}
                    onChange={res => {
                        console.log(res);
                        set_statusLine(res);
                    }} >
                        {I18n.t("Line")}
                    </Checkbox>

                    {statusLine==true?<Center mb={(screenH*2)/100}>
                        <InputText 
                            title={""}
                            Panalwidth={(screenW*85)/100} 
                            BGColor={"#FFF"} 
                            valuePH={I18n.t("Line")}
                            disable={statusForm}
                            ColorPH={"#333333"}
                            value={valueSocialLine}
                            onChangeText={res => {
                                set_valueSocialLine(res);
                            }} />
                    </Center>:null}

                    <Checkbox _text={{
                        fontSize: 14,
                        color: '#333',
                        width: (screenW*78)/100,
                    }} mt={(screenH*2)/100} colorScheme={'success'} 
                    value={statusOther} 
                    isDisabled={statusForm}
                    onChange={res => {
                        console.log(res);
                        set_statusOther(res);
                    }} >
                        {I18n.t("Other")}
                    </Checkbox>
                    {statusOther==true?<Center mb={(screenH*2)/100}>
                        <InputText 
                            title={""}
                            Panalwidth={(screenW*85)/100} 
                            BGColor={"#FFF"} 
                            valuePH={I18n.t("Other")}
                            disable={statusForm}
                            ColorPH={"#333333"}
                            value={valueSocialOther}
                            onChangeText={res => {
                                set_valueSocialOther(res);
                            }} />
                    </Center>:null}
                  </Box>
                </Center>
                {statusForm==false?
                    <Box w={screenW} pl={(screenW*7)/100}>
                      <TextDefault textcolor={"#333"} fontSize={15} text={"ถ่ายหรือแนบรูปบัตรประชาชน"} />
                    </Box>
                :<Box />}
                      {filePath.uri?
                    <Center mt={(screenH*2)/100} >
                      <Image source={{uri: filePath.uri}} style={{width: 250, height: 150, resizeMode: 'contain'}} />
                    </Center>
                    :
                    <Center >
                    </Center>
                    }
                {statusForm==false?
                    <HStack mt={(screenH*1)/100} mb={(screenH*2)/100}>
                        <Center>
                            <Pressable onPress={res => {
                                captureImage();
                            }} >{({ isHovered, isFocused, isPressed }) => {
                            return (
                                <Center 
                                w={(screenW*38)/100} 
                                flexDirection={'row'}
                                alignItems={'center'}
                                justifyContent={'center'}
                                opacity={isPressed?0.6:1}
                                style={{
                                      borderWidth: 1,
                                      borderColor: '#eee'
                                }}
                                h={(screenH*6)/100} 
                                bg={isPressed?colors.MainColor:"#FFF"} 
                                borderRadius={((screenW*85)/100)/2}>
                                      <IconMaterialIcons name={"photo-camera"} style={{
                                          fontSize: 25,
                                          color: isPressed?colors.MainColor:colors.Green1
                                      }} />
                                      <Box h={'100%'} justifyContent={'center'} ml={(screenW*2)/100} >
                                          <Box _text={{ fontSize:16, color: isPressed?'#FFF':'#333' }}>
                                          {"ถ่ายรูป"}
                                          </Box>
                                      </Box>
                                </Center>
                            )}}
                            </Pressable>
                        </Center>
                        <Center ml={(screenW*2)/100} mr={(screenW*2)/100}>
                            <TextDefault textcolor={"#333"} fontSize={16} text={"หรือ"} />
                        </Center>
                        <Center>
                            <Pressable onPress={res => {
                                chooseFile();
                            }} >{({ isHovered, isFocused, isPressed }) => {
                            return (
                                <Center 
                                  w={(screenW*38)/100} 
                                  opacity={isPressed?0.6:1}
                                  style={{
                                      borderWidth: 1,
                                      borderColor: '#eee'
                                  }}
                                  h={(screenH*6)/100} 
                                  flexDirection={'row'}
                                  alignItems={'center'}
                                  justifyContent={'center'}
                                  bg={isPressed?colors.MainColor:"#FFF"} 
                                  borderRadius={((screenW*85)/100)/2}>
                                    <IconFontAwesome name={"folder"} style={{
                                        fontSize: 24,
                                        color: isPressed?colors.MainColor:colors.Green1
                                    }} />
                                    <Box justifyContent={'center'} ml={(screenW*2)/100} >
                                        <Box _text={{ fontSize:16, color: isPressed?'#FFF':'#333' }}>
                                        {"เลือกรูป"}
                                        </Box>
                                    </Box>
                                </Center>
                            )}}
                            </Pressable>
                        </Center>
                    </HStack>
                :<Box />}
                </Box>

                <Collapse isOpen={show} mb={(screenH*1)/100}>

                    <Alert w="100%" bg={"#fafafa"} status="warning" colorScheme="warning">
                        <VStack space={2} flexShrink={1} w="100%" bg={'#f2ebdd'} pb={(screenH*2)/100} pt={(screenH*2)/100}>
                            <Center
                            _text={{
                                color: colors.Warning2,
                                fontSize: 14,
                            }}
                            >
                            กรุณากรอกข้อมูลให้ครบ
                            </Center>
                        </VStack>
                    </Alert>
                </Collapse>

                <Center >
                    <SuccessBTN 
                    textColor={'#FFF'}
                    height={(screenH*7)/100}
                    bgColor={colors.Green1}
                    onPress={() => {
                      var dataUserID = valueFNmae+"_"+new Date().getTime().toString();
                      if(statusForm == true) {
                          let setParams = {
                            newuuid: route.params.newuuid,
                            dataLogin: route.params.dataLogin,
                            statusFormUser: false,
                            dataInfo: {
                                Name: valueFNmae+" "+valueLNmae,
                                Cid: valueCID,
                                user_id: dataUserID,
                                Phone: valuePhone,
                                Social: valueSocial,
                                photo: filePath,
                                Address: valueAddress
                            }
                          }
                          navigation.push("SelectFormtypetask",setParams);
                      } else {

                        if (valueFNmae.length>0 && valueLNmae.length>0 && valuePhone.length>0 &&
                          filePath != null && valueProvince.length>0 && 
                          valueDistrict != null && valueDistrict.district.length>0 && 
                          valueAddress != null &&
                          valueSubDistrict != null && valueSubDistrict.district.length>0 &&
                          valueZipcode.length>0 && filePath.uri != null) {
                            onValidate(dataUserID);
                          } else {
                            set_show(true);
                            setTimeout(() => set_show(false),1500);
                          }

                      }

                    }} maxWidth={(screenW*90)/100} 
                    text={"บันทึกข้อมูล"} />
                </Center>

                {/* <Center >
                    <TwoRowBTN 
                    textColor={'#FFF'}
                    height={(screenH*7)/100}
                    bgColor={colors.Green1}
                    onPress={() => {
                      if (valueFNmae.length>0 && valueLNmae.length>0 && valuePhone.length>0 && valueSocial.length>0 &&
                        filePath != null && valueProvince.length>0 && 
                        valueDistrict != null && valueDistrict.district.length>0 && 
                        valueSubDistrict != null && valueSubDistrict.district.length>0 &&
                        valueZipcode.length>0) {
                          onValidate();
                        } else {
                          set_show(true);
                          setTimeout(() => set_show(false),1500);
                        }
                        

                    }} maxWidth={(screenW*90)/100} 
                    text1={"ส่งคำร้องเรียน"}
                    text2={"ประสงค์ออกนาม"} />
                </Center>

                <Center mt={(screenH*3)/100} >
                    <TwoRowBTN 
                    textColor={'#FFF'}
                    height={(screenH*7)/100}
                    bgColor={colors.Warning2}
                    onPress={() => {
                        let setParams = {
                          newuuid: route.params.newuuid,
                          dataLogin: route.params.dataLogin,
                          statusFormUser: false,
                          dataInfo: {
                              Name: valueFNmae+" "+valueLNmae,
                              Cid: valueCID,
                              Phone: valuePhone,
                              Social: valueSocial,
                              photo: filePath,
                              Address: valueAddress
                          }
                        }
                        navigation.push("SelectFormtypetask",setParams);
                    }} maxWidth={(screenW*90)/100} 
                    text1={"ส่งคำร้องเรียน"}
                    text2={"ไม่ประสงค์ออกนาม"} />
                </Center> */}
                
                <ModalLoading 
                text={".PROCESSING."} 
                modalVisible={visiModalLoading} 
                setModalVisible={set_visiModalLoading} />

                    {/* <PopupAdrees listProvine={valueListProvine} modalVisible={valueAddress} setModalVisible={set_valueAddress}  /> */}

                <Box w={screenW} h={(screenH*5)/100} />
            </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    )

}

export default FormtaskScreen;

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