import React from 'react';
import { Text, Button } from 'react-native';
import { Container } from './styles';
import Api from '../../Api';
import {useNavigation} from '@react-navigation/native';


export default () => {

    const navigation = useNavigation();

    //quando clicar em fazer logout
    const handleLogoutClick = async () =>{
        await Api.logout();//invalida o token e vai para a tela de login
        navigation.reset({ //reseta o histórico e sai do aplicativo
            routes:[{name:'SignIn'}]
        });
    }

    return (
        <Container>
            <Text>Profile</Text>
            <Button title="Sair" onPress={handleLogoutClick}></Button>
        </Container>
    );
}