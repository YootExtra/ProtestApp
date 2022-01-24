
/* eslint-disable prettier/prettier */

import React,{ useEffect, useState } from 'react';
import {
    StyleSheet,
    Dimensions,
    Text,
} from 'react-native';
import {
    Container,
    Box,
    Center,
    VStack,
    Heading,
    HStack,
    Pressable,
    SectionList,
    Radio,
} from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { 
    colors,
    I18n
} from '../lib';
import {
    getGroupTypetask,
    postGroupTypetask,
    getTypetask,
    getGrouporganization
} from '../Action'
import Rowsdeails from '../Components/Rowsdetails';
import IconFeather from 'react-native-vector-icons/Feather';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { HeaderDefault } from '../Components/Header';
import ModalLoading from '../Components/ModalLoading';


const screenW = Dimensions.get("screen").width;
const screenH = Dimensions.get("screen").height;

const SelectFormtypesubtask = ({navigation, route}) => {

    const [ inpType, set_inpType ] = useState("");
    const [ dataList, set_dataList ] = useState([]);
    const [ visiModalLoading, set_visiModalLoading ] = useState(false);

    useEffect(() => {
        console.log(route.params);
        getTaskType();
    },[])

    const getTaskType = () => {
        if (route.params.statusFormUser == true) {
            getGroupTypetask().then(res => {
                
                var dataDB = res.data.filter(resF => resF.group_id != 'GT_3');
                var objList = [];
                dataDB.forEach(resDB => {
                    objList.push({
                        "title": resDB.group_name,
                        "data": resDB.TypeTasks
                    })
                });
                set_dataList(objList);
            }).catch(err => {
                console.log(err);
            });
        } else {
            getGroupTypetask().then(res => {
                
                var dataDB = res.data.filter(resF => resF.group_id == 'GT_3');
                var objList = [];
                dataDB.forEach(resDB => {
                    objList.push({
                        "title": resDB.group_name,
                        "data": resDB.TypeTasks
                    })
                });
                set_dataList(objList);
            }).catch(err => {
                console.log(err);
            });
        }
    }

    return(
        <SafeAreaProvider>
            <SafeAreaView style={styles.cssContaniner}>
            <HeaderDefault bgColor={"#FFF"} textColor={colors.MainColor} navigation={navigation} textheader={"เลือกประเด็นปัญหา"} />

                <Box style={{
                    width: screenW,
                    height: 20
                }} />

                <SectionList
                    sections={dataList}
                    keyExtractor={(item, index) => item.group_name + index}
                    renderItem={({ item }) => (
                        

                        <Pressable onPress={() => {
                            console.log(item);
                            
                            navigation.push("ScreenTest", {
                                subtype: item,...route.params
                            });

                            // navigation.push("FormTaskDetailScreen", {
                            //     subtype: item,...route.params
                            // });
                            
                        }} w={(screenW*90)/100} alignItems={'center'}>
                        {({ isHovered, isFocused, isPressed }) => {
                        return (
                            <Box 
                            w={(screenW*80)/100}
                            h={(screenH*6)/100}
                            my={1}
                            borderBottomWidth={1}
                            borderBottomColor={"#efefef"}
                            flexDirection={'row'}
                            justifyItems={'center'}
                            alignItems={'center'}
                            bg={isPressed?"#F2F2F2":"#FAFAFA"}
                            _text={{
                                alignItems: 'flex-start',
                                fontSize: 16,
                                width: '95%',
                            }} >
                                {item.name}
                                <IconFontAwesome name="chevron-right" style={{
                                    opacity: isPressed?0.5:1,
                                    color: colors.Green1,
                                    fontSize: 18
                                }} />
                            </Box>  
                        )}
                        }
                        </Pressable>
                    )}
                    renderSectionHeader={({ section: { title } }) => (
                        route.params.statusFormUser?<Box 
                        w={(screenW*90)/100}
                        px={5} 
                        py={2} 
                        rounded="md" 
                        my={2} 
                        bg={colors.Green1}
                        _text={{
                            fontWeight: "bold",
                            color: '#FFF',
                            fontSize: 18
                        }} >
                            {title}
                        </Box>:<Box h={(screenH*5)/100} />
                    )}
                />

                <ModalLoading 
                text={".PROCESSING."} 
                modalVisible={visiModalLoading} 
                setModalVisible={set_visiModalLoading} />

            </SafeAreaView>
        </SafeAreaProvider>
    )

}

export default SelectFormtypesubtask;

const styles = StyleSheet.create({
    cssBodyPanal: {
        // width: screenW,
        // height: screenH,
    },
    cssContaniner: {
        flex: 1,
        backgroundColor: '#FAFAFA',
        // justifyContent: 'space-between', 
        alignItems: 'center'
    }
})