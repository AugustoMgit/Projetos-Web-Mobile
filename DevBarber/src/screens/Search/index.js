import React, {useState, useEffect} from 'react';
import { Text } from 'react-native';
import { Container,
         SearchArea,
         SearchInput,
         Scroller, 
         LoadingIcon,
         ListArea,
         EmptyWarning
} from './styles';
import BarberItem from '../../components/BarberItem';
import Api from '../../Api';

export default () => {

    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [emptyList, setEmptyList] = useState(false);

    //busca e carrega os barbeiros
    const searchBarbers = async () =>{ 
        setEmptyList(false);
        setLoading(true);
        setList([]);
        if(searchText != ''){ //se ele digitou alguma coisa
            let res = await Api.search(searchText); //busca o nome que foi digitado
            if(res.error == ''){
                if(res.list.length > 0 ){
                    setList(res.list); //retorna a lista da API 
                }else{
                    setEmptyList(true);
                }
            }else{
                alert("Error ", res.error);
            }
        }

        setLoading(false); //para parar de aparecer o ícone rolando de busca(loadingIcon)
    }
    //autoFocus = abre o teclado para a tela de campo já
    //returnKeyType abre uma lupa no teclado para busca
    //selectedTextOnFocus = quando seleciona o campo de busca para abrir o teclado, abre com o texto selecionado
    return (
        <Container>
            <SearchArea>
                <SearchInput
                    placeholder="Digite o nome do barbeiro"
                    placeholderTextColor="#FFFFFF"
                    value={searchText}
                    onChangeText={t=>setSearchText(t)}
                    onEndEditing={searchBarbers}
                    returnKeyType="search"
                    autoFocus={true}
                    selectTextOnFocus={true}
                >
                </SearchInput>
            </SearchArea>
            <Scroller>
                {loading && 
                    <LoadingIcon size="large" color="#000000"/>
                }

                {emptyList && 
                    <EmptyWarning>
                        Nenhum barbeiro encontrado pela busca: "{searchText}"
                    </EmptyWarning>
                }

                <ListArea>
                    {list.map((item, key)=>(
                        <BarberItem key={key} data={item} />
                    ))}
                </ListArea>
            </Scroller>
        </Container>
    );
}