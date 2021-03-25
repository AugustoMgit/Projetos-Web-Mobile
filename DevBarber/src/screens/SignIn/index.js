import React, {useState, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage  from '@react-native-community/async-storage';
import {UserContext} from '../../contexts/UserContext';
import {Container,
        InputArea,
        CustomButton,
        CustomButtonText,
        SignMessageButton,
        SignMessageButtonText,
        SignMessageButtonTextBold

} from './styles';
import {Text} from 'react-native';
import BarberLogo from '../../assets/barber.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';

import SignInput from '../../components/SignInput';

import Api from '../../Api';

export default () => {

    const navigation = useNavigation();
    const {dispatch:userDispatch} = useContext(UserContext); //renomeia dispatch:userDispatch
    const  [emailField, setEmailField] = useState('augusto@gmail.com'); //suporte@b7web.com.br
    const  [passwordField, setPasswordField] = useState('789'); //1234 

    //quando clica no botão de login
    const handleSignButtonLogin = async() => { //async = transforma em uma função assíncrona para fazer a requisição
        /*if (1==1){
            navigation.reset({
                routes: [{name: 'MainTab'}]
            })
        }*/
        if(emailField != '' && passwordField != ''){ //se está tudo preenchido, usa a api e faz login
                //faz umaa requisição assíncrona a partir da api envia o email e senha para checar a informações
                let json = await Api.signIn(emailField, passwordField);
                if(json.token){//se recebeu um token, faz algo
                    //alert("Deu certo");
                    //VAMOS SALVAR
                    await AsyncStorage.setItem('token', json.token);//salva no async
                    userDispatch({
                        type:'SET_AVATAR',
                        payload:{avatar:json.data.avatar}
                    }); //salva no context, no dispatch, que fica armazenado em todo o aplicativo

                    //vai para o home, sem poder voltar(reset())
                    navigation.reset({
                        routes: [{name:'MainTab'}]
                    })
                }else{
                    alert("Email ou senha errados");
                }
        }else{
            alert("Preencha os campos");
        }
    }

    //quando clica no botao, vai para a tela de cadastro sem poder voltar
    const handleMessageButtonClick =() => {
        //alert("Mais um clique você sairá do aplicativo");
        navigation.reset({   //vai para a tela sem poder voltar
            routes: [{name: 'SignUp'}]
        });
    }

    return(
        <Container>
            <Text>SignIn</Text>
            <BarberLogo width="100%" height="160"></BarberLogo>
            <InputArea>

                <SignInput IconSvg={EmailIcon}
                            placeholder="Digite seu email"
                            value = {emailField}
                            onChangeText = {t=>setEmailField(t)} //troca o valor quando digita, ou seja, muda o valor que está digitado. Sem isso, não seria possível apagar

                ></SignInput> 
                <SignInput IconSvg={LockIcon}
                            placeholder="Digite sua senha"
                            value = {passwordField}
                            onChangeText = {t=>setPasswordField(t)} //trocar o valor ao digitar
                            password = {true}
                ></SignInput>

                <CustomButton onPress={handleSignButtonLogin}>
                    <CustomButtonText>LOGIN</CustomButtonText>
                </CustomButton>
            </InputArea>

            <SignMessageButton onPress={handleMessageButtonClick}>
                <SignMessageButtonText>Não tem conta</SignMessageButtonText>
                <SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
            </SignMessageButton>

        </Container>
    );
}