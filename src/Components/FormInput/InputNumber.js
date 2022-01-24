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
    Heading
} from 'native-base';

const screenW = Dimensions.get("screen").width;
const screenH = Dimensions.get("screen").height;

const InputNumber = (props) => {

    return(
        <Box w={props.Panalwidth}>
             
            <Center _text={{color: '#FFF', fontSize: 16}}>
                {props.title}
            </Center>
            
            <Box w={props.Panalwidth} 
                bg={props.BGColor}
                style={{
                    borderRadius: 18,
                    // shadowColor: "#FFF",
                    // shadowOffset: {
                    //     width: 1,
                    //     height: 1,
                    // },
                    // shadowOpacity: 0.05,
                    // shadowRadius: 0.84,
                    // elevation: 2,
                }}
                mt={3} 
                pb={2}
                pt={2}
                pl={3}
                pr={3} >
                <Input 
                style={{
                    fontSize: 16,
                    fontWeight: '400',
                    borderWidth: 0,
                    color: '#333',
                }}
                maxLength={props.maxLength}
                keyboardType={'number-pad'}
                placeholderTextColor={"#888"}
                placeholder={props.valuePH} 
                value={props.value} 
                onChangeText={props.onChangeText} />
            </Box>
        </Box>
    )

}

export default InputNumber;

const styles = StyleSheet.create({

})