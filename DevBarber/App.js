import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
//import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from './src/stacks/MainStack';
import UserContextProvider from './src/contexts/UserContext';

export default () =>{
  //UserContextProvider = bloco que terá as informações guardadas do usuário  e que engloba toodo o aplicativo
  return(
    <UserContextProvider>
      <NavigationContainer>
        <MainStack>

        </MainStack>
      </NavigationContainer>
    </UserContextProvider>
  );
}