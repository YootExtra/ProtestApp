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

const SuccessBTN = (props) => {

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
                // h={20}
                // h={props.height}
                borderRadius={(props.maxWidth)/2}
                borderWidth={2}
                borderColor={"#FFF"}
                bg={props.bgColor}
                opacity={isPressed?0.8:1}
                flexDirection={'row'}
                justifyContent={'center'}
                alignItems={'center'}
                style={{
                    height: 50,
                    shadowColor: '#333',
                    shadowOffset: {
                        width: 1,
                        height: 1,
                    },
                    shadowOpacity: 0.15,
                    shadowRadius: 2.84,
                    elevation: 1,
                }}
                _text={{
                    fontSize: 16,
                    // fontWeight: '500',
                    color: props.textColor,
                }}>
                {props.text}
                </Box>
                )}}
            </Pressable>
        </Center>
    )

}

export default SuccessBTN;

const styles = StyleSheet.create({

})