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
    Container
} from 'native-base';
import {
  InputText
} from '../FormInput';
import {
  colors,
  I18n
} from '../../lib';

const screenW = Dimensions.get("screen").width;
const screenH = Dimensions.get("screen").height;

const PopupRegister = (props) => {

  const [ vauleFName, set_vauleFName ] = useState("");
  const [ valueLNmae, set_valueLNmae ] = useState("");

    return(
        <Modal
        animationType="slide"
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
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
              <View style={styles.cssPanalBody}>
                <InputText 
                title={I18n.t("Firstname")}
                Panalwidth={(screenW*70)/100} 
                BGColor={"#FAFAFA"} 
                valuePH={I18n.t("Firstname")}
                ColorPH={"#333333"}
                value={vauleFName}
                onChangeText={res => {
                  set_vauleFName(res);
                }} />
                <View style={{
                  width: '100%',
                  height: (screenH*3)/100,
                }} />
                <InputText 
                title={I18n.t("Lastname")}
                Panalwidth={(screenW*70)/100} 
                BGColor={"#FAFAFA"} 
                valuePH={I18n.t("Lastname")}
                ColorPH={"#333333"}
                value={valueLNmae}
                onChangeText={res => {
                  set_valueLNmae(res);
                }} />
              </View>
              <View style={styles.cssPanalBottom}>
                <Pressable
                style={styles.cssBtnLogin} onPress={() => {
                  props.setModalVisible(false)
                }}>
                  <Text style={{
                    fontSize: 18,
                    color: '#FFF'
                  }}>
                    {I18n.t("login")}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>

        </Modal>
    )
}

export default PopupRegister;

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