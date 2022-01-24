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

    return(props.mutiinput?
                <Box w={props.Panalwidth} >
                     
                    <Box _text={{color: props.ColorPH, fontSize: 14}}>
                        {props.title}
                    </Box>
                    <Box w={props.Panalwidth} 
                        bg={props.disable?"#eaeaea":props.BGColor}
                        style={props.disable?{
                            borderRadius: 8,
                        }:{
                            borderRadius: 8,
                            borderWidth: 1,
                            borderColor: '#eee',
                        }}
                        mt={(screenH*1)/100} >
                        <Input 
                        style={{
                            fontSize: 16,
                            fontWeight: '400',
                            borderWidth: 0,
                            color: '#333333',
                            height: (screenH*6)/100,
                            paddingLeft: (screenW*3)/100,
                        }}
                        placeholderTextColor={"#ccc"}
                        placeholder={props.valuePH}
                        maxLength={props.title=="เบอร์โทรศัพท์"?10:20}
                        keyboardType={props.title=="เบอร์โทรศัพท์"||props.title=="เลขที่บ้าน"?'phone-pad':'default'}
                        value={props.value} 
                        editable={props.disable?false:true}
                        onChangeText={props.onChangeText} />
                    </Box>
                </Box>
            :
            <Box w={props.Panalwidth} >
                 
                <Box _text={{color: props.ColorPH, fontSize: 14}}>
                    {props.title}
                </Box>
                <Box w={props.Panalwidth} 
                        bg={props.disable?"#eaeaea":props.BGColor}
                        style={props.disable?{
                            borderRadius: 8,
                        }:{
                            borderRadius: 8,
                            borderWidth: 1,
                            borderColor: '#eee',
                        }}
                        mt={(screenH*1)/100} >
                        <Input 
                        style={{
                            fontSize: 16,
                            fontWeight: '400',
                            borderWidth: 0,
                            color: '#333333',
                            height: (screenH*6)/100,
                            paddingLeft: (screenW*3)/100,
                        }}
                        placeholderTextColor={"#ccc"}
                        placeholder={props.valuePH}
                        maxLength={props.title=="เบอร์โทรศัพท์"?10:20}
                        keyboardType={props.title=="เบอร์โทรศัพท์"||props.title=="เลขที่บ้าน"?'phone-pad':'default'}
                        value={props.value} 
                        editable={props.disable?false:true}
                        onChangeText={props.onChangeText} />
                    </Box>
                </Box>

    )

}

export default InputNumber;

const styles = StyleSheet.create({

})