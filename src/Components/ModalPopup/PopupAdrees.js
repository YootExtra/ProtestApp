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
    Box
} from 'native-base';
import {
  InputText
} from '../FormInput';
import {
  colors,
  I18n
} from '../../lib';
import { getProvince } from '../../Action';

const screenW = Dimensions.get("screen").width;
const screenH = Dimensions.get("screen").height;

const PopupAdrees = (props) => {

  const [ vauleFName, set_vauleFName ] = useState("");
  const [ valueLNmae, set_valueLNmae ] = useState("");
  const [ listProvince, set_listProvince ] = useState([]);

  useEffect(() =>  {
      
  },[])

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
            <View style={styles.modalView}>
              <View style={styles.cssPanalHeader}>
                <Text style={styles.cssTextHeader}>
                  เข้าสู่ระบบ
                </Text>
                <Text style={styles.cssTextSubHeader}>
                  โปรดใส่ชื่อ-นามสกุลเพื่อบรรทึกข้อมูล
                </Text>
              </View>
              <Center style={styles.cssPanalBody}>
                    {props.listProvine.map(res => {
                        return <Pressable style={styles.cssBtnRows} onPress={() => {
                            props.setModalVisible(false)
                          }}><Center>{res.name}</Center></Pressable>
                    })}
              </Center>
              
            </View>
          </View>

        </Modal>
    )
}

export default PopupAdrees;

const styles = StyleSheet.create({
    cssBody: {

    },
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: "rgba(33,33,33,0.4)"
    },
    modalView: {
        width: screenW,
        height: (screenH*80)/100,
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