import React from 'react';
import styled from 'styled-components/native';

//area de input onde digita.
const InputArea = styled.View`
    width:100%;
    height: 60px;
    background-color: #83D3E3;
    flex-direction:row;
    border-radius:30px;
    padding-left: 15px;
    align-items:center;
    margin-bottom:15px;
`;

//cursor para digitar
const Input = styled.TextInput`
flex:1;
font-size:16px;
color:#268596;
margin-left:10px;
`;

//recebe como uma props o IconSvg, que é uma imagem, e aqui, eu edito a cor e tamanho
//todas as informaçoes que vem para cá, vem de fora, porque aqui é um componente, não posso criar aqui
export default ({IconSvg, placeholder, value, onChangeText, password}) => {

    return(
        <InputArea>
            <IconSvg width="24" height="24" fill="#268596"></IconSvg>
            <Input 
                placeholder = {placeholder}
                placeholderTextColor = "#268596"
                value = {value}
                onChangeText = {onChangeText}
                secureTextEntry ={password} //campo de senha fica no formato de senha 
            />
        </InputArea>
    );
}