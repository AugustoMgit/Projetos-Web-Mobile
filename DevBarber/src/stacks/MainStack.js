import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Preload from '../screens/Preload';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import MainTab from './MainTab';
import Barber from '../screens/Barber';

const Stack = createStackNavigator();

export default () =>{
    return(
        //coloca as telas que precisam aqui
        //essas telas serão navegadas uma pela outra, ou seja
        //cria uma stack navigator, de screen, que é uma tela
        //como essa biblioteca é responsável pela navegação, então
        //ela serão navegadas entre elas

        //essas telas serão criada no src/screens/
        <Stack.Navigator 
            initialRouteName="Preload" //primeira tela a ser carregada dentro desse stackNavigator
            screenOptions={{
                headerShown:false //retira o cabeçalho
            }}>
            <Stack.Screen name="Preload" component={Preload} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="MainTab" component={MainTab} />
            <Stack.Screen name="Barber" component={Barber} />
        </Stack.Navigator>
    );
}