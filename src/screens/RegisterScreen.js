/* eslint-disable prettier/prettier */
import React,{ useEffect, useState } from 'react';
import {
    StyleSheet,
    Dimensions,
    Text
} from 'react-native';
import {
    Container,
    Box,
    Center,
    VStack,
    Heading,
    ScrollView
} from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { 
    colors,
    I18n
} from '../lib';
import {
    InputNumber,
    InputText
} from '../Components/FormInput';
import { SuccessBTN } from '../Components/Button';
import { PopupRegister } from '../Components/ModalPopup';
import {getUniqueId} from 'react-native-device-info';

const screenW = Dimensions.get("screen").width;
const screenH = Dimensions.get("screen").height;

const RegisterScreen = ({navigation, route}) => {

    const [ inpCID, set_inpCID ] = useState("");
    const [ visibleRegisterModal, set_visibleRegisterModal ] = useState(false);
    const [ valueFName, set_valueFName ] = useState("");
    const [ valueLName, set_valueLName ] = useState("");
    const [ valuePhone, set_valuePhone ] = useState("");

    return(
        <SafeAreaProvider>
            <SafeAreaView style={styles.cssContaniner}>
                    
            <ScrollView _contentContainerStyle={{
                  mb: (screenH*15)/100,
                  minW: "72",
                }}
              >
              <Center w={screenW} h={screenH}>
                    <VStack
                    w={screenW}
                    h={screenH}
                    pt={(screenH*5)/100}
                    >
                        <Center mb={(screenH*5)/100}>
                            <Text style={{
                                fontSize: 45,
                                fontWeight: 'bold',
                                color: '#FFF',
                                letterSpacing: 14,
                                paddingLeft: (screenW*5)/100
                            }} >
                                {"ศูนย์ดำรงธรรมจังหวัดสตูล"}
                            </Text>
                            <Text style={{
                                fontSize: 9,
                                color: colors.BGinput,
                                marginTop: (screenH*1)/100,
                                textTransform: 'uppercase',
                                letterSpacing: 6,
                            }} >
                                ( Application mobile )
                            </Text>
                        </Center>
                    <Box style={{
                        borderTopRightRadius: (screenW*5)/100,
                        borderTopLeftRadius: (screenW*5)/100,
                    }} w={screenW} h={screenH} pt={(screenH*3)/100} bg={"#FAFAFA"}>

                        <Center mb={10}>
                            <Text style={styles.cssTextSubHeader}>
                            โปรดใส่ชื่อ-นามสกุลเพื่อบรรทึกข้อมูล
                            </Text>
                        </Center>
                        <Center>

                            <InputText 
                            title={I18n.t("Firstname")}
                            Panalwidth={(screenW*80)/100} 
                            BGColor={"#FAFAFA"} 
                            valuePH={I18n.t("Firstname")}
                            ColorPH={"#333333"}
                            value={valueFName}
                            onChangeText={res => {
                            set_valueFName(res);
                            }} />
                            <Box w={screenW} h={(screenH*3)/100} />
                            <InputText
                                title={I18n.t("Lastname")}
                                Panalwidth={(screenW*80)/100} 
                                BGColor={"#FAFAFA"} 
                                valuePH={I18n.t("Lastname")}
                                ColorPH={"#333333"}
                                value={valueLName}
                                onChangeText={res => {
                                set_valueLName(res);
                                }} />
                            <Box w={screenW} h={(screenH*3)/100} />
                            <InputText
                                title={"เบอร์โทรศัพท์"}
                                Panalwidth={(screenW*80)/100} 
                                BGColor={"#FAFAFA"} 
                                valuePH={"xxx-xxx-xxxx"}
                                ColorPH={"#333333"}
                                value={valuePhone}
                                onChangeText={res => {
                                set_valuePhone(res);
                                }} />

                        </Center>
                        <Center mt={(screenH*5)/100}>
                            <SuccessBTN 
                            bgColor={'#78d3b6'}
                            bgColor2={'#FFF'}
                            height={(screenH*7)/100}
                            textColor={colors.MainColor}
                            onPress={() => {
                                
                                navigation.push('UpdateDeviceScreen', {
                                    dataLogin: {
                                        cid: route.params.cid,
                                        fname: valueFName,
                                        lname: valueLName,
                                        phone: valuePhone
                                    },
                                    newuuid: getUniqueId(),
                                });
                                // navigation.reset({
                                //     index: 0,
                                //     routes: [{ name: 'SelectProductScreen', params: {
                                //         dataLogin: {
                                //             cid: route.params.cid,
                                //             fname: valueFName,
                                //             lname: valueLName,
                                //         }
                                //     } }],
                                // });

                            }} maxWidth={(screenW*80)/100} text={I18n.t('Submit')} />
                        </Center>
                    </Box>

                    </VStack>
                </Center>
                <PopupRegister modalVisible={visibleRegisterModal} setModalVisible={set_visibleRegisterModal} />
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    )

}

export default RegisterScreen;

const styles = StyleSheet.create({
    cssBodyPanal: {
        // width: screenW,
        // height: screenH,
    },
    cssContaniner: {
        flex: 1,
        backgroundColor: colors.MainColor3,
        justifyContent: 'space-between', 
        alignItems: 'center'
    },
    cssTextSubHeader: {
      fontSize: 14,
      color: "#777"
    },
})