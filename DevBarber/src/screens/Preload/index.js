import React, {useEffect, useContext} from 'react';
import {Container, LoadingIcon} from './styles';
import {Text} from 'react-native';
import BarberLogo from '../../assets/barber.svg';//se tranforma em componente
import  AsyncStorage  from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';
import { UserContext } from '../../contexts/UserContext';
import Api from '../../Api';

export default () => {

    const { dispatch: userDispatch } = useContext(UserContext);
    navigation = useNavigation();
    //toda vez que a tela abrir, vai executar isso: verificar o token de login
    useEffect(()=>{
        //pega o token salvo no aplicativo
        const checkToken = async() =>{
            const token = await AsyncStorage.getItem('token'); //pega o token salvo, mesmo fechando o app
            if(0==1){//token
                //valida o token
                let res = await Api.checkToken(token);//retorna um novo token se funcionar
                //SE TIVER UM USUÁRIO JÁ 
                if(res.token){//se o token funcionou//res.token
                    await AsyncStorage.setItem('token', res.token);
                    //seta no asyncStorage, salva no celular, o avatar    
                    userDispatch({
                        type: 'setAvatar',
                        payload:{
                            avatar: res.data.avatar
                        }
                    });
                    //vai para a tela de mainTab, se já tiver um token válido, que seria a tela "principal"
                    navigation.reset({
                        routes:[{name:'MainTab'}]
                    });


                }else{ //se o token expirou, vai para o login 
                    navigation.navigate('SignIn');
                }
                
            }else{ //se não tem nenhum token salvo, vai para a página de login, através do useNavigation
                navigation.navigate('SignIn');
            }
        }
        checkToken();//executa a função
    }, []);    

    return(
        <Container>
            <Text>PRELOAD</Text>
            <BarberLogo width="100%" height="160"></BarberLogo>
            <LoadingIcon size="large" color="#FFFFFF" />
        </Container>
    );
}