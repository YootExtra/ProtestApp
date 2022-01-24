import React from 'react';
import {
    StyleSheet,
    Dimensions
} from 'react-native';
import {
    Center,
    Box,
    Pressable
} from 'native-base';
import {
    colors
} from '../../lib';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

const screenW = Dimensions.get("screen").width;
const screenH = Dimensions.get("screen").height;

const HeaderDefault = (props) => {

    return(
        <Center 
        w={screenW} 
        h={(screenH*9)/100} 
        bg={props.bgColor} 
        flexDirection={"row"}
        justifyContent={'center'}
        style={{
            shadowColor: "#333",
            shadowOffset: {
                width: 1,
                height: 1,
            },
            shadowOpacity: 0.35,
            shadowRadius: 3.84,
            elevation: 5,
        }}
        >
            <Pressable onPress={() => {
                props.navigation.goBack();
            }} w={'15%'} alignItems={'center'}>
            {({ isHovered, isFocused, isPressed }) => {
              return (
                <IconFontAwesome name="chevron-left" style={[styles.cssIcon,{
                    opacity: isPressed?0.5:1,
                    color: props.textColor
                }]} />
              )}
            }
            </Pressable>
            <Box w={'70%'} alignItems={'center'} _text={{
                color: props.textColor,
                fontSize: 18,
            }}>
                {props.textheader}
            </Box>
            <Box w={'15%'} alignItems={'center'}>

            </Box>
        </Center>
    )

}

export default HeaderDefault;

const styles = StyleSheet.create({
    cssIcon: {
        fontSize: 23,
        color: '#FFF'
    }
})