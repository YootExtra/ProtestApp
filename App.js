import 'react-native-gesture-handler';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import MainStack from './src/stacks/MainStack';
import { NativeBaseProvider, Box, extendTheme } from 'native-base';

export default (props) => {



    return (
        <NativeBaseProvider>
            <NavigationContainer>
                <StatusBar
                    barStyle="dark-content"
                    // dark-content, light-content and default
                    hidden={false}
                    //To hide statusBar
                    backgroundColor="#34A752"
                    //Background color of statusBar
                    translucent={false}
                    //allowing light, but not detailed shapes
                    networkActivityIndicatorVisible={true}
                />
                <MainStack />
            </NavigationContainer>
        </NativeBaseProvider>
    );
}
