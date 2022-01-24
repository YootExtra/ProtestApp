/* eslint-disable prettier/prettier */
import React,{ useEffect } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    SafeAreaView,
    Text,
} from 'react-native';
import {
    Container,
    Heading,
    ScrollView,
    Center
} from 'native-base';
import { colors } from '../lib';
import {
    putUpdatedevice,
    postCreateuser,
    postLoginmobile
} from '../Action';
import {getUniqueId} from 'react-native-device-info';

const screenW = Dimensions.get("screen").width;
const screenH = Dimensions.get("screen").height;

const UpdateDeviceScreen = ({ route, navigation }) => {

    useEffect(() => {
        // setTimeout(() => {
        //     navigation.reset({
        //         index: 0,
        //         routes: [{ name: 'LoginScreen', params: {

        //         } }],
        //     });
        // },3000)
        console.log(route.params.dataLogin)
        if (route.params.dataLogin.Device) {
            var bodyReq = {
                unique_id: route.params.newuuid,
                newuuid: getUniqueId(),
                user: route.params.dataLogin.user,
                pass: '',
                user_type: 'ut_01',
                fb_token: 'fb_token',
                cid: route.params.dataLogin.cid
            }
            putUpdatedevice(bodyReq).then(resDevice => {
                console.log(resDevice);
                postLoginmobile({
                    cid: route.params.dataLogin.cid,
                    uuid: route.params.newuuid,
                  }).then(resLogin => {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'SelectProductScreen', params: {
                            dataLogin: resLogin.data[0]
                        } }],
                    });
                  }).catch(err => {

                  })
            }).catch(err => {
                console.log(err);
            })
        } else {
            var dataReq = {
                cid: route.params.dataLogin.cid,
                f_name: route.params.dataLogin.fname,
                l_name: route.params.dataLogin.lname,
                district: '',
                subdistrict: '',
                province: '',
                zipcode: '',
                address: '',
                phone: route.params.dataLogin.phone,
                socialmedia: '',
                update_by: 'System',
                image: ""
            }
            postCreateuser(dataReq).then(res => {
                console.log(res)
                var bodyReq = {
                    unique_id: route.params.newuuid,
                    newuuid: getUniqueId(),
                    user: route.params.dataLogin.fname,
                    pass: '',
                    user_type: 'ut_01',
                    fb_token: 'fb_token',
                    cid: route.params.dataLogin.cid
                }
                putUpdatedevice(bodyReq).then(resDevice => {
                    console.log(resDevice);
                    postLoginmobile({
                        cid: route.params.dataLogin.cid,
                        uuid: route.params.newuuid,
                      }).then(resLogin => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'SelectProductScreen', params: {
                                dataLogin: resLogin.data[0]
                            } }],
                        });
                      }).catch(err => {

                      })
                }).catch(err => {
                    console.log(err);
                })
            }).catch(err => {
                console.log(err)
            })
        }
    },[]);

    return(
        <Center style={styles.cssBodyPanel}>
                <Text style={{
                    fontSize: 30,
                    fontWeight: 'bold',
                    color: '#FFF',
                    letterSpacing: 15,
                    backgroundColor: colors.MainColor,
                    paddingLeft: (screenW*5)/100
                }} >
                    {"PROTEST"}
                </Text>
                <Text style={{
                    fontSize: 9,
                    color: colors.MainColor,
                    marginTop: (screenH*2)/100,
                    textTransform: 'uppercase',
                    letterSpacing: 6,
                }} >
                    {"Update Device...."}
                </Text>
        </Center>
    )

}

export default UpdateDeviceScreen;


const styles = StyleSheet.create({
    cssBodyPanel: {
        width: screenW,
        height: screenH,
        backgroundColor: '#FAFAFA',
        flex: 1,
    }
})