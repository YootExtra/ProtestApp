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
    Button
} from 'native-base';

const screenW = Dimensions.get("screen").width;
const screenH = Dimensions.get("screen").height;

const CancelBTN = (props) => {

    return(
        <Box w={props.Panalwidth}>
            <Button onPress={() => console.log("hello world")}>Cancel</Button>
        </Box>
    )

}

export default CancelBTN;

const styles = StyleSheet.create({

})