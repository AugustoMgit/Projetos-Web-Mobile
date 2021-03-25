import React, { useState, useEffect } from 'react';
import { RefreshControl } from 'react-native';
import {
    Container,
    HeaderArea,
    HeaderTitle,
    Scroller,
    LoadingIcon,
    ListArea,
    EmptyWarning
} from './styles';

import BarberItem from '../../components/BarberItem';
import Api from '../../Api';

export default () => {

    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);

    //ASSIM QUE ABRE A TELA, BETA OS BARBEIROS FAVORITOS
    useEffect(()=>{
        getFavorites();
    }, []);

    //pega os barbeiros favoritos de acordo como está na api, como o usuário marcou
    const getFavorites = async () => {
        setLoading(true);
        setList([]);

        let res = await Api.getFavorites(); //requisição na api
        if(res.error == '') {
            setList(res.list); //seta os favoritos do usuário para exibir
        } else {
            alert("Erro: "+res.error);
        }

        setLoading(false); //depois de acontecer a requisição e carregar a lista, então para de aparecer o ícone de carregando
    }

    return (
        <Container>
            
            <HeaderArea>
                <HeaderTitle>Favoritos</HeaderTitle>
            </HeaderArea>

            <Scroller refreshControl={
                <RefreshControl refreshing={loading} onRefresh={getFavorites} />
            }>

                {!loading && list.length === 0 &&
                    <EmptyWarning>Não há favoritos.</EmptyWarning>
                }

                <ListArea>
                    {list.map((item, k)=>(
                        <BarberItem key={k} data={item} />
                    ))}
                </ListArea>
            </Scroller>

        </Container>
    );
}