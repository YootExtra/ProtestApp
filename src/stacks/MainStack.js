
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import SelectProductScreen from '../screens/SelectProductScreen';
import RegisterScreen from '../screens/RegisterScreen';
import UpdateDeviceScreen from '../screens/UpdateDeviceScreen';
import FormtaskScreen from '../screens/FormtaskScreen';
import SearchHistoryScreen from '../screens/SearchHistoryScreen';
import SelectFormtask from '../screens/SelectFormtask';
import SelectFormtypetask from '../screens/SelectFormtypetask';
import FormTaskDetailScreen from '../screens/FormTaskDetailScreen';
import FormTaskDone from '../screens/FormTaskDone';
import SelectFormtypesubtask from '../screens/SelectFormtypesubtask';
import HistoryItemScreen from '../screens/HistoryItemScreen';
import AddressScreen from '../screens/AddressScreen';
import ListHistoryScreen from '../screens/ListHistoryScreen';
import ProcessDetailScreen from '../screens/ProcessDetailScreen';
import PreviewForm from '../screens/PreviewForm';
import Viewfileprocess from '../screens/Viewfileprocess';
import ScreenTest from '../screens/ScreenTest';
import ViewTaskDetailFile from '../screens/ViewTaskDetailFile';

const Stack = createStackNavigator();



function App() {

  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{
            headerShown: false,
          }} />
        <Stack.Screen
        name="ViewTaskDetailFile"
        component={ViewTaskDetailFile}
        options={{
            headerShown: false,
        }} />
        <Stack.Screen
        name="ScreenTest"
        component={ScreenTest}
        options={{
            headerShown: false,
        }} />
        <Stack.Screen
        name="FormTaskDone"
        component={FormTaskDone}
        options={{
            headerShown: false,
        }} />
        <Stack.Screen
        name="Viewfileprocess"
        component={Viewfileprocess}
        options={{
            headerShown: false,
        }} />
        <Stack.Screen
        name="ProcessDetailScreen"
        component={ProcessDetailScreen}
        options={{
            headerShown: false,
        }} />
        <Stack.Screen
        name="ListHistoryScreen"
        component={ListHistoryScreen}
        options={{
            headerShown: false,
        }} />
        <Stack.Screen
        name="PreviewForm"
        component={PreviewForm}
        options={{
            headerShown: false,
        }} />
        <Stack.Screen
        name="AddressScreen"
        component={AddressScreen}
        options={{
            headerShown: false,
        }} />
        <Stack.Screen
        name="HistoryItemScreen"
        component={HistoryItemScreen}
        options={{
            headerShown: false,
        }} />
        <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
            headerShown: false,
        }} />
        <Stack.Screen
        name="FormTaskDetailScreen"
        component={FormTaskDetailScreen}
        options={{
            headerShown: false,
        }} />
        <Stack.Screen
        name="SelectFormtypetask"
        component={SelectFormtypetask}
        options={{
            headerShown: false,
        }} />
        <Stack.Screen
        name="SelectFormtypesubtask"
        component={SelectFormtypesubtask}
        options={{
            headerShown: false,
        }} />
        <Stack.Screen
        name="SelectFormtask"
        component={SelectFormtask}
        options={{
            headerShown: false,
        }} />
        <Stack.Screen
        name="FormtaskScreen"
        component={FormtaskScreen}
        options={{
            headerShown: false,
        }} />
        <Stack.Screen
        name="UpdateDeviceScreen"
        component={UpdateDeviceScreen}
        options={{
            headerShown: false,
        }} />
        <Stack.Screen
        name="SearchHistoryScreen"
        component={SearchHistoryScreen}
        options={{
            headerShown: false,
        }} />
        <Stack.Screen
        name="SelectProductScreen"
        component={SelectProductScreen}
        options={{
            headerShown: false,
        }} />
        <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
            headerShown: false,
        }} />
      </Stack.Navigator>
    </>
  );
}

export default App;