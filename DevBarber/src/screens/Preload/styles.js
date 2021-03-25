import React from 'react';
import styled from 'styled-components/native';

//todo o conteúdo dessa tela ficará na central, tanto na vertical, quanto na horizontal
export const Container = styled.SafeAreaView`
    background-color: #63C2D1;
    flex: 1;
    justify-content: center;
    align-items: center;
`;
export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 50px;
`;