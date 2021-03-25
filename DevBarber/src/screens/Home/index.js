import React, { useState, useEffect } from 'react';
import { Platform, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { request, PERMISSIONS } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';

import Api from '../../Api';

import {
    Container,
    Scroller,

    HeaderArea,
    HeaderTitle,
    SearchButton,

    LocationArea,
    LocationInput,
    LocationFinder,

    LoadingIcon,
    ListArea
} from './styles';

import BarberItem from '../../components/BarberItem';

import SearchIcon from '../../assets/search.svg';
import MyLocationIcon from '../../assets/my_location.svg';

export default () => {
    const navigation = useNavigation();

    const [locationText, setLocationText] = useState('');
    const [coords, setCoords] = useState(null);
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]); //a lista será as informações do banco de dados de cada cadastro: avatar, nome, endereço...
    const [refreshing, setRefreshing] = useState(false);

    //seta as coordenadas ao clica no botão de localização, pedindo permissão ao usua´rio
    const handleLocationFinder = async () => {
        setCoords(null);
        let result = await request(
            Platform.OS === 'ios' ? //usuário ios
                PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
                : //usuário android
                PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        );
        //se o usuário aceitar a permissão, então ele carrega a lista de barbeiros de acordos com sua proximidade e a do barbeiro
        if(result == 'granted') {
            setLoading(true);
            setLocationText('');
            setList([]);

            Geolocation.getCurrentPosition((info)=>{
                setCoords(info.coords); //seta as coordenadas do usuário
                getBarbers();
            });

        }
    }

    const getBarbers = async () => {
        setLoading(true);
        setList([]);

        let lat = null;
        let lng = null;
        if(coords) {
            lat = coords.latitude;
            lng = coords.longitude;
        }

        let res = await Api.getBarbers(lat, lng, locationText); //locationText:o que foi digitado
        console.log(res);
        if(res.error == '') { //se não tiver nenhum erro, então pega a localização
            if(res.loc) {
                setLocationText(res.loc); //salva a localização no input, onde se digita a localização
            }//ou seja, quando é feita uma requisição de pegar a localização, ele pega e coloca no input
            setList(res.data); //onde tem a lista dos barbeiros
        } else {
            alert("Erro: "+res.error);
        }
        setLoading(false);
    }

    //quando abrir a tela, vai pegar a lista dos barbeiros cadastrados no sistema
    useEffect(()=>{
        getBarbers();
    }, []);

    const onRefresh = () => {
        setRefreshing(false); //para de mostrar o ícone rodando
        getBarbers(); //roda o código que pega os barbeiro de novo
    }

    const handleLocationSearch = () => {
        setCoords({}); //zera as coordenadas para pegar novos barbeiros a partir da localização digitada
        getBarbers(); //roda o código que pega os barbeiro de novo
    }

    return (
        <Container>
            <Scroller refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                
                <HeaderArea>
                    <HeaderTitle numberOfLines={2}>Encontre o seu barbeiro favorito</HeaderTitle>
                    <SearchButton onPress={()=>navigation.navigate('Search')}>
                        <SearchIcon width="26" height="26" fill="#FFFFFF" />
                    </SearchButton>
                </HeaderArea>
                

                <LocationArea>
                    <LocationInput
                        placeholder="Onde você está?"
                        placeholderTextColor="#FFFFFF"
                        value={locationText}
                        onChangeText={t=>setLocationText(t)}
                        onEndEditing={handleLocationSearch} //digita e dá um enter
                    />
                    <LocationFinder onPress={handleLocationFinder}>
                        <MyLocationIcon width="24" height="24" fill="#FFFFFF" /> 
                    </LocationFinder>
                </LocationArea>


                {loading &&
                    <LoadingIcon size="large" color="#FFFFFF" />
                }
                
                <ListArea> 
                    {list.map((item, k)=>(
                        <BarberItem key={k} data={item} />
                    ))}
                </ListArea>

            </Scroller>
        </Container>
    );
    //list.map = está pegando todos os barbeiros cadastrados
    //.map faz um for meio automático pegando TODOS que tem, aí não precisa de um for
}