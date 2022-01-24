/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
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
    FlatList,
    Center,
    Box,
    Spinner,
    HStack,
    Heading,
    Progress,
    VStack
} from 'native-base';
import {
  InputText
} from '../FormInput';
import {
  colors,
  I18n
} from '../lib';
import { getProvince } from '../../Action';

const screenW = Dimensions.get("screen").width;
const screenH = Dimensions.get("screen").height;

const ModalLoading = (props) => {

  const [ valueNumberProcess, set_valueNumberProcess ] = useState(0);
  const [ valueMaxNumber, set_valueMaxNumber ] = useState(100)

    return(
        <Modal
        animationType="slide"
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={() => {
          props.setModalVisible(!props.modalVisible);
        }}
      >
          <View style={styles.centeredView}>
            <Center space={2} alignItems="center">
              <Spinner color={colors.Green1} size="lg" />
              <Heading color={'#555'} mt={(screenH*2)/100} letterSpacing={8} fontSize={14}>
                {props.text}
              </Heading>
              {/* <Progress 
                w={(screenW*70)/100} 
                h={(screenH*2)/100} 
                mt={(screenH*3)/100} 
                max={100}
                bg="cyan.200" 
                value={valueNumberProcess} /> */}
            </Center>
          </View>

        </Modal>
    )
}

export default ModalLoading;

const styles = StyleSheet.create({
    cssBody: {

    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.9)"
    },
    modalView: {
        width: screenW,
        height: (screenH*80)/100,
        // margin: 20,
        // backgroundColor: "#FAFAFA",
        borderRadius: 20,
        // padding: 35,
        alignItems: "center",
        justifyContent: 'center',
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
    },
    cssBtnRows: {
        width: (screenW*70)/100,
        height: (screenH*6)/100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.MainColor,
        borderRadius: ((screenW*70)/100)/2
    }
})