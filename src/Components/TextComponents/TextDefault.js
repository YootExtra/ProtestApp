import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'native-base';

const TextDefault = props => {
  return <Text style={styles.cssText} color={props.textcolor} fontSize={props.fontSize}>{props.text}</Text>;
};

export default TextDefault;
const styles = StyleSheet.create({
    cssText: {
        
    }
})