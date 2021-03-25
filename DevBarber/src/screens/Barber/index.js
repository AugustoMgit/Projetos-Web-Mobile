import React, {useState, useEffect} from 'react';
import { Text } from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import Stars from '../../components/Stars';
import FavoriteIcon from '../../assets/favorite.svg';
import FavoriteFullIcon from '../../assets/favorite_full.svg';
import BackIcon from '../../assets/back.svg';
import NavPrevIcon from '../../assets/nav_prev.svg';
import NavNextIcon from '../../assets/nav_next.svg';
import BarberModal from '../../components/BarberModal';
import Api from '../../Api';

import { Container, 
        Scroller,
        FakeSwiper,
        PageBody,
        UserInfoArea,
        ServiceArea,
        TestimonialArea,
        SwipeDot,
        SwipeDotActive,
        SwipeItem,
        SwipeImage,
        UserAvatar,
        UserInfo,
        UserInfoName,
        UserFavButton,
        BackButton,
        LoadingIcon,
        ServiceChooseBtnText, 
        ServiceItem,
        ServicesTitle,
        ServiceName,
        ServicePrice,
        ServiceInfo,
        ServiceChooseButton,
        TestimonialBody,
        TestimonialInfo,
        TestimonialItem,
        TestimonialName,

} from './styles';


export default () => {

    const navigation = useNavigation();
    const route = useRoute();

    const [userInfo, setUserInfo] = useState({
        id:route.params.id,
        avatar: route.params.avatar,
        name: route.params.name,
        stars: route.params.stars,
    });

    //route.params. //pega as informações que recebeu quando foi para essa tela com informações: route.params.name

    const [favorited, setFavorited] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedService, setSelectedService] = useState(null); //qual serviço é selecionado
    const [showModal, setShowModal] = useState(false); //controla a exibição do modal(abre e fecha uma tela na mesma tela)

    useEffect(()=>{
        const getBarberInfo = async () =>{ //pega info do barbeiro com os serviços...
            setLoading(true);
            let json = await Api.getBarber(userInfo.id)//pega o id fazendo uma requisição assíncrona pela Api
            if(json.error == ''){//se não deu erro, temos os dados
                setUserInfo(json.data); //altera as informações iniciais pelas que o barbeiro tem, ou SEJA, TODAS AS INFO
                setFavorited(json.data.favorited); //checa no banco de dados se já dei favorited no barbeiro ou não
                console.log(json.data.available);//item que tem as informações
                console.log(json.data);
            }else{
                alert("Error:" + json.error);
            }
            setLoading(false)//termina, mesmo com erro ou sem erro
        }
        getBarberInfo();
    },[]);

    const handleBackButton = () =>{
        navigation.goBack(); //volta no histórico, de onde ele veio. Salva o hitórico
    }

    const handleFavClick = () =>{
        setFavorited(!favorited); //inverte o valor que tiver
        Api.setFavorite(userInfo.id);//faz a requisição enviando o ID do barbeiro para saber se esse barbeiro é favorito
    }

    //seleciona o serviço E abre o modal
    const handleServiceChoose = (key) =>{ //quando clica em um serviço
        setSelectedService(key);//seleciona o serviço, 0,1,2,3,4 -> índice de qual serviço
        setShowModal(true); //mostra o modal
    }

    //resizeMode="cover": encaixa a imagem para aparecer no espaço que foi definido, pode ser quadrada, redonda...REDIMENSIONA A FOTO, COVER = TODA A ÁREA DISPONÍVEL
    return (
        <Container>
            <Scroller>
                {userInfo.photos && userInfo.length > 0 ?
                    <Swiper
                        style={{height:240}}
                        dot={<SwipeDot />}
                        activeDot={<SwipeDotActive />}
                        paginationStyle={{top:15, right:15, bottom:null, left:null}}
                        autoplay={true}
                        loop={true}
                    >
                        {userInfo.photos.map((item, key)=>{
                            <SwipeItem key={key}>
                                <SwipeImage source={{uri:item.url}} resizeMode="cover">

                                </SwipeImage>
                            </SwipeItem>
                        })}
                    </Swiper>
                    :
                    <FakeSwiper>

                    </FakeSwiper>
                }
                <PageBody>
                    <UserInfoArea>  
                        <UserAvatar source={{uri:userInfo.avatar}}/>
                        <UserInfo>
                            <UserInfoName>{userInfo.name}</UserInfoName>
                            <Stars stars={userInfo.stars} showNumber={true}></Stars>
                        </UserInfo>
                        <UserFavButton onPress={handleFavClick}>
                            {favorited ? 
                                <FavoriteFullIcon width="24" height="24" fill="#FF0000"/>
                                :
                                <FavoriteIcon width="24" height="24" fill="#FF0000"/>
                            }
                            
                        </UserFavButton>
                    </UserInfoArea>    

                    {loading && 
                        <LoadingIcon size="large" color="#000000" />
                    }

                    {userInfo.services && 
                        <ServiceArea>
                            <ServicesTitle>Lita de serviços</ServicesTitle>
                            {userInfo.services.map((item, key)=>(
                                <ServiceItem key = {key}>
                                    <ServiceInfo>
                                        <ServiceName>{item.name}</ServiceName>
                                        <ServicePrice>R$ {item.price.toFixed(2)}</ServicePrice>
                                    </ServiceInfo>
                                    <ServiceChooseButton onPress={()=>handleServiceChoose(key)}>
                                        <ServiceChooseBtnText>Agendar</ServiceChooseBtnText>
                                    </ServiceChooseButton>
                                </ServiceItem>
                            ))}
                        </ServiceArea>
                    }

                    {userInfo.testimonials && userInfo.testimonials.length > 0 &&
                        <TestimonialArea>
                            <Swiper
                                style={{height:110}}
                                showsPagination={false}
                                showsButtons={true}
                                prevButton={<NavPrevIcon width="35" height="35" fill="#000000"/>}
                                nextButton={<NavNextIcon width="35" height="35" fill="#000000"/>} 
                            >
                                {userInfo.testimonials.map((item, key)=>(
                                    <TestimonialItem key = {key}>
                                        <TestimonialInfo>
                                            <TestimonialName>{item.name}</TestimonialName>
                                            <Stars stars={item.rate} showNumber={false}/>
                                        </TestimonialInfo>
                                        <TestimonialBody>{item.body}</TestimonialBody>
                                    </TestimonialItem>
                                ))}

                            </Swiper>
                        </TestimonialArea>
                    }
                    
                </PageBody>    
            </Scroller>
            <BackButton onPress={handleBackButton}>
                <BackIcon width="44" height="44" fill="#FFFFFF"/>
            </BackButton>

            <BarberModal 
                show={showModal}
                setShow={setShowModal}
                user={userInfo}
                service={selectedService}
            ></BarberModal>
        </Container>
    );
}