/* eslint-disable prettier/prettier */
import React,{ useEffect, useState } from 'react';
import {
    Dimensions,
    StyleSheet,
} from 'react-native';
import {
    Center,
    Box,
    Input,
    Heading,
    Button,
    Pressable
} from 'native-base';
import {
    colors,
    I18n
} from '../../lib'

const screenW = Dimensions.get("screen").width;
const screenH = Dimensions.get("screen").height;

const TwoRowBTN = (props) => {

    return(
        <Center>
            <Pressable 
            shadow={2}
            style={{
            }}
            onPress={props.onPress}
            >{({ isHovered, isFocused, isPressed }) => {
                return (
                <Box
                w={props.maxWidth} 
                h={props.height}
                borderRadius={(props.maxWidth)/2}
                borderWidth={2}
                borderColor={"#FFF"}
                bg={props.bgColor}
                opacity={isPressed?0.8:1}
                justifyContent={'center'}
                alignItems={'center'}
                style={{
                    shadowColor: '#333',
                    shadowOffset: {
                        width: 1,
                        height: 1,
                    },
                    shadowOpacity: 0.15,
                    shadowRadius: 2.84,
                    elevation: 1,
                }}>
                    <Box 
                    _text={{
                        fontSize: 18,
                        color: props.textColor,
                        fontWeight: 'bold'
                    }}>
                        {props.text1}
                    </Box>
                    <Box
                    _text={{
                        fontSize: 12,
                        color: props.textColor,
                        letterSpacing: props.text2=="ไม่ประสงค์ออกนาม"?2:3,
                        marginTop: -1
                    }}>
                        {props.text2}
                    </Box>
                </Box>
                )}}
            </Pressable>
        </Center>
    )

}

export default TwoRowBTN;

const styles = StyleSheet.create({

})