/* eslint-disable prettier/prettier */
import React,{ useEffect } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    SafeAreaView,
    Text,
    ImageBackground
} from 'react-native';
import {
    Container,
    Heading,
    ScrollView,
    Center,
    Image,
} from 'native-base';
import { colors } from '../lib';

const screenW = Dimensions.get("screen").width;
const screenH = Dimensions.get("screen").height;

const SplashScreen = ({ route, navigation }) => {

    useEffect(() => {
        setTimeout(() => {
            navigation.reset({
                index: 0,
                routes: [{ name: 'LoginScreen', params: {

                } }],
            });
        },3000)
    },[]);

    return(
        <ImageBackground style={styles.cssBodyPanel} source={require('../img/BGApp.png')} >

            <Center style={styles.cssBodyPanel2} >
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: '#FFF',
                        // letterSpacing: 15,
                        backgroundColor: colors.MainColor,
                        // paddingLeft: (screenW*5)/100
                        paddingHorizontal: (screenW*3)/100,
                        paddingVertical: (screenH*2)/100,
                        borderRadius: 6
                    }} >
                        {"ศูนย์ดำรงธรรมจังหวัดสตูล"}
                    </Text>
                    <Text style={{
                        fontSize: 9,
                        color: colors.MainColor,
                        marginTop: (screenH*1)/100,
                        textTransform: 'uppercase',
                        letterSpacing: 6,
                    }} >
                        ( Application mobile )
                    </Text>
            </Center>
    </ImageBackground>
    )

}

export default SplashScreen;


const styles = StyleSheet.create({
    cssBodyPanel: {
        width: screenW,
        height: screenH,
        // backgroundColor: '#FAFAFA',
        flex: 1,
    },
    cssBodyPanel2: {
        width: screenW,
        height: screenH,
    }
})