import React from 'react';
import styled from 'styled-components/native';

//importação das imagens com as estrelas vazias, metade e cheia
import StarFull from '../assets/star.svg';
import StarHalf from '../assets/star_half.svg';
import StarEmpty from '../assets/star_empty.svg';

const StarArea = styled.View`
    flex-direction: row;
`;
const StarView = styled.View``;

const StarText = styled.Text`
    font-size: 12px;
    font-weight: bold;
    margin-left: 5px;
    color: #737373;
`;

export default ({ stars, showNumber }) => {
    //stars é a nota
    let s = [0, 0, 0, 0, 0]; //array das 5 estrelas: 0 vazia, 1 metade, 2 cheia
    let floor = Math.floor(stars);//somente os inteiros
    let left = stars - floor; //4.7 - 4 = 0.7

    for(var i=0;i<floor;i++) {
        s[i] = 2; //preenche com a estrela cheia
    }
    if(left > 0) {
        s[i] = 1; //preenche com a estrela vazia
    }

    //quando o valor dentro do i dentro do s, for 0, é estrela vazia, 1 metade, 2 cheia
    return (
        <StarArea>
            {s.map((i, k)=>(
                <StarView key={k}>
                    {i === 0 && <StarEmpty width="18" height="18" fill="#FF9200" />}
                    {i === 1 && <StarHalf width="18" height="18" fill="#FF9200" />}
                    {i === 2 && <StarFull width="18" height="18" fill="#FF9200" />}
                </StarView>
            ))}
            {showNumber && <StarText>{stars}</StarText>}
        </StarArea>
    );
}