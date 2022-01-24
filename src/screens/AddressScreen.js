/* eslint-disable prettier/prettier */
import React,{ useEffect, useState } from 'react';
import {
    StyleSheet,
    Dimensions,
    Text,
    PermissionsAndroid,
    Platform
} from 'react-native';
import {
    Container,
    Box,
    Center,
    VStack,
    Heading,
    HStack,
    Pressable,
    Image,
    ScrollView,
    Divider,
    Radio,
    TextArea,
    Select,
    CheckIcon,
    FormControl,
    Input
} from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { 
    colors,
    I18n
} from '../lib';
import Rowsdeails from '../Components/Rowsdetails';
import IconFeather from 'react-native-vector-icons/Feather';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
    getTypetask,
    getGroupTypetask,
    getProvince,
    getDistrict,
    getSubDistrict
} from '../Action';
import {
    HeaderDefault
} from '../Components/Header';
import {
    InputText
} from '../Components/FormInput';
import {
    SuccessBTN
} from '../Components/Button';
import { TextDefault } from '../Components/TextComponents';
import { fontSize } from 'styled-system';
import dbjson from '../Action/raw_database.json';

const screenW = Dimensions.get("screen").width;
const screenH = Dimensions.get("screen").height;

const AddressScreen = (props) => {

    useEffect(() => {
        getListProvince();
    },[])

    // useEffect(() => {
    //     getListDistrict(props.valueDistrict)
    // },[props.valueProvince])
    
    const [ valueProvince, set_valueProvince ] = useState(props.valueProvince);
    const [ valueDistrict, set_valueDistrict ] = useState(props.valueDistrict);
    const [ valueSubDistrict, set_valueSubDistrict ] = useState(props.valueSubDistrict);
    const [ valueZipcode, set_valueZipcode ] = useState(props.valueZipcode);

    const [ listProvince, set_listProvince ] = useState([]);
    const [ listDistrict, set_listDistrict ] = useState([]);
    const [ listSubDistrict, set_listSubDistrict] = useState([]);

    const getListProvince = () => {
        getProvince().then(res => {
            console.log(res);
            set_listProvince(res.data)
            set_valueProvince("สตูล");
            props.set_valueProvince("สตูล")
            // getListDistrict("สตูล");


            let dataJSON = dbjson.filter(resJSON => resJSON.province == "สตูล");
            console.log(dataJSON);
            const DistrictData = [];
            
            for(var i=0; i < dataJSON.length; i++) {
                if (DistrictData.filter(resDT => resDT.amphoe == dataJSON[i].amphoe).length == 0) {
                    DistrictData.push(dataJSON[i])
                }
            }
            
            console.log(DistrictData);
            set_listDistrict(DistrictData);


        }).catch(err => {
            console.log(err);
        });
    }

    const getListDistrict = (data) => {
        getDistrict(data).then(res => {
            console.log(res);
            set_listDistrict(res.data)
        }).catch(err => {
            console.log(err);
        });
    }

    const getListSubDistrict = (data) => {
        getSubDistrict({p: valueProvince, d: data}).then(res => {
            console.log(res);
            set_listSubDistrict(res.data);
        }).catch(err => {
            console.log(err);
        })
    }

    return(
        
        <FormControl style={{
            width: (screenW*85)/100
        }}>
            <Box>
                <FormControl.Label mb={0} >จังหวัด</FormControl.Label>
                <Select
                    selectedValue={valueProvince}
                    minWidth="200"
                    accessibilityLabel="จังหวัด"
                    placeholder="เลือกจังหวัด"
                    isDisabled={props.isDisabled}
                    _selectedItem={{
                        bg: "teal.600",
                        endIcon: <CheckIcon size="5" />,
                    }}
                    style={{
                        fontSize: 16,
                        height: (screenH*6)/100,
                        backgroundColor: props.isDisabled==false?'#FFF':'#e2e2e2',
                    }}
                    mt={1}
                    onValueChange={(itemValue) => {
                        console.log(itemValue)
                        set_valueProvince(itemValue);
                        props.set_valueProvince(itemValue)
                        // getListDistrict(itemValue);

                        let dataJSON = dbjson.filter(resJSON => resJSON.province == itemValue);
                        console.log(dataJSON);
                        const DistrictData = [];
                        
                        for(var i=0; i < dataJSON.length; i++) {
                            if (DistrictData.filter(resDT => resDT.amphoe == dataJSON[i].amphoe).length == 0) {
                                DistrictData.push(dataJSON[i])
                            }
                        }
                        
                        console.log(DistrictData);
                        set_listDistrict(DistrictData);
                        set_listSubDistrict([]);
                    }}
                >
                    {listProvince.map(res => {
                        return <Select.Item key={res.province} _text={{fontSize: 16}} label={res.province} value={res.province} />
                    })}
                </Select>
            </Box>

            {listDistrict.length>0?
            <Box mt={(screenH*3)/100}>
                <FormControl.Label mb={0} >อำเภอ</FormControl.Label>
                <Select
                    selectedValue={valueDistrict}
                    minWidth="200"
                    accessibilityLabel="อำเภอ"
                    placeholder="เลือกอำเภอ"
                    isDisabled={props.isDisabled}
                    _selectedItem={{
                        bg: "teal.600",
                        endIcon: <CheckIcon size="5" />,
                    }}
                    style={{
                        fontSize: 16,
                        height: (screenH*6)/100,
                        backgroundColor: props.isDisabled==false?'#FFF':'#e2e2e2',
                    }}
                    onValueChange={(itemValue) => {
                        console.log(itemValue);
                        var  resDis = JSON.parse(itemValue)
                        var genList = [];
                        var dataSubD = dbjson.filter(resDB => resDB.amphoe == resDis.amphoe)
                        console.log(dataSubD)
                        // if (resDis.subdistrict.length>0) {
                        //     genList = resDis.subdistrict;
                        // } else {
                        //     genList.push(resDis.district)
                        // }
                        // console.log(genList)
                        set_listSubDistrict(dataSubD);
                        set_valueDistrict(itemValue);
                        props.set_valueDistrict(resDis);
                    }}
                >
                    {listDistrict.map(res => {
                        return <Select.Item key={res.district_code} _text={{fontSize: 16}} label={res.amphoe} value={JSON.stringify(res)} />
                    })}
                </Select>
            </Box>
            :<Box />}


            {listSubDistrict.length>0?
            <Box mt={(screenH*3)/100}>
                <FormControl.Label mb={0} >ตำบล</FormControl.Label>
                <Select
                    selectedValue={valueSubDistrict}
                    minWidth="200"
                    accessibilityLabel="ตำบล"
                    placeholder="เลือกตำบล"
                    _selectedItem={{
                        bg: "teal.600",
                        endIcon: <CheckIcon size="5" />,
                    }}
                    isDisabled={props.isDisabled}
                    style={{
                        fontSize: 16,
                        height: (screenH*6)/100,
                        backgroundColor: props.isDisabled==false?'#FFF':'#e2e2e2',
                    }}
                    onValueChange={(itemValue) => {
                        var resSubDis = JSON.parse(itemValue);
                        console.log(resSubDis);
                        set_valueZipcode(resSubDis.zipcode.toString())
                        props.set_valueZipcode(resSubDis.zipcode.toString())
                        set_valueSubDistrict(itemValue);
                        props.set_valueSubDistrict(resSubDis);
                    }}
                >
                    {listSubDistrict.map(res => {
                        return <Select.Item key={res.district_code} _text={{fontSize: 16,}} label={res.district} value={JSON.stringify(res)} />
                    })}
                </Select>
            </Box>
            :<Box />}

            <FormControl.Label mt={(screenH*3)/100}>รหัสไปรษณีย์</FormControl.Label>
            <Input 
            value={valueZipcode} 
            placeholder={"รหัสไปรษณีย์"}
            fontSize={16}
            editable={props.isDisabled?false:true}
            style={{
                height: (screenH*6)/100,
                backgroundColor: props.isDisabled?"#eaeaea":props.BGColor,
            }}
            onChangeText={res => {
                set_valueZipcode(res)
                props.set_valueZipcode(res)
            }} />
        </FormControl>
    )

}

export default AddressScreen;

const styles = StyleSheet.create({
    cssBodyPanal: {
        // width: screenW,
        // height: screenH,
    },
    cssContaniner: {
        flex: 1,
        backgroundColor: '#FAFAFA',
        // backgroundColor: colors.MainColor3,
        justifyContent: 'space-between', 
        alignItems: 'center'
    }
})