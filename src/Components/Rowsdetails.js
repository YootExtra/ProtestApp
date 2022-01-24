import React,{ useEffect, useState } from  'react';
import {
    Dimensions,
    StyleSheet,
    Modal,
    View,
    Pressable,
    Text
} from 'react-native';
import {
    Container,
    Box,
    Center,
    HStack
} from 'native-base';
import {
  InputText
} from './FormInput';
import {
  colors,
  I18n
} from '../lib';
import  libI18n from 'react-native-i18n';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconFeather from 'react-native-vector-icons/Feather';

const screenW = Dimensions.get("screen").width;
const screenH = Dimensions.get("screen").height;

const Rowsdeails = (props) => {

  const [ vauleFName, set_vauleFName ] = useState("");
  const [ valueLNmae, set_valueLNmae ] = useState("");

    return(
        <HStack w={(screenW*90)/100} h={(screenH*7)/100} 
        bg={'#FFF'} borderRadius={8} style={{

          shadowColor: "#333333",
          shadowOffset: {
              width: 0,
              height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}>
            <Center w={'20%'} h={'100%'}>
                <Box 
                w={(screenW*10)/100}
                h={(screenW*10)/100}
                borderRadius={((screenH*6)/100)/2}
                justifyContent={'center'}
                alignItems={'center'}
                bg={props.type==0?colors.Green1:props.type==1?"#ffd700":'#ff6666'} >
                  {props.type==0?
                  <IconFeather name="check" style={{
                    color: '#FFF',
                    fontSize: 20
                  }} />
                  :props.type == 1?
                  <IconFeather name="clock" style={{
                    color: '#FFF',
                    fontSize: 20
                  }} />
                  :
                  <IconFeather name="x" style={{
                    color: '#FFF',
                    fontSize: 20
                  }} />
                }

                </Box>
            </Center>
            <Box w={'55%'} h={'100%'} 
            pt={(screenH*1)/100}
            pl={(screenW*2)/100}>
                <Box _text={{fontSize: 16, color: '#333333'}}>
                    Title Rows
                </Box>
                <Box pl={(screenW*1)/100} _text={{fontSize: 12, color: '#333333'}}>
                    Details Rows
                </Box>
            </Box>
            <Box w={'25%'} h={'100%'} pt={(screenH*1)/100}>
                <Box _text={{fontSize: 15, color: '#333333'}}>
                    {libI18n.strftime(new Date(), "%H:%M %p")}
                </Box>
                <Box _text={{fontSize: 12, color: '#333333'}}>
                    {libI18n.strftime(new Date(), "%d %b %Y")}
                </Box>
            </Box>
        </HStack>
    )
}

export default Rowsdeails;

const styles = StyleSheet.create({
    cssBody: {

    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        width: (screenW*90)/100,
        height: (screenH*50)/100,
        // margin: 20,
        backgroundColor: "#FAFAFA",
        borderRadius: 20,
        // padding: 35,
        alignItems: "center",
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    cssPanalBottom: {
      // width: '100%',
      // paddingTop: (screenH*3)/100,
      // paddingBottom: (screenH*1)/100,
      width: '100%',
      height: '20%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    cssPanalBody: {
      width: '100%',
      height: '50%',
      alignItems: 'center'
    },
    cssPanalHeader: {
      width: '100%',
      height: '30%',
      alignItems: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
    cssTextHeader: {
      fontSize: 24,
      color: colors.MainColor
    },
    cssTextSubHeader: {
      fontSize: 14,
      color: "#777"
    },
    cssBtnLogin: {
      width: (screenW*70)/100,
      height: (screenH*6)/100,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.MainColor,
      borderRadius: ((screenW*70)/100)/2
    }
})