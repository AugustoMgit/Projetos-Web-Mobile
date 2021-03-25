import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import ExpandIcon from '../assets/expand.svg';
import NavPrevIcon from '../assets/nav_prev.svg';
import NavNextIcon from '../assets/nav_next.svg';
import Api from '../Api';
//Modal é um componente que abre uma janela na próprio local ao clicar
const Modal = styled.Modal`
`;

//pega toda a tela. TODAAAAA
const ModalArea = styled.View`
    flex:1;
    background-color:rgba(0,0,0,0.5);
    justify-content: flex-end;
`;

const ModalBody = styled.View`
    background-color:#83D6E3;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    min-height: 500px;
    padding: 10px 20px 40px 20px;
`;

const CloseButton = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
`;

const ModalItem = styled.View`
    background-color:#FFFFFF;
    border-radius:10px;
    margin-top:15px;
    padding:10px;
`;

const UserInfo = styled.View`
    flex-direction:row;
    align-items:center;
`;

const UserAvatar = styled.Image`
    width:56px;
    height:56px;
    border-radius:20px;
    margin-right:15px; 
`;

const UserName = styled.Text`
    font-size:18px;
    color:#000000;
    font-weight:bold;
`;

const ServiceInfo = styled.View`
    flex-direction:row;
    justify-content: space-between;
`;

const ServicesName = styled.Text`
    font-size:16px;
    font-weight:bold;
`;

const ServicePrice = styled.Text`
    font-size:16px;
    font-weight:bold;
`;

const FinishButton = styled.TouchableOpacity`
    background-color: #268596;
    height: 60px;
    justify-content:center;
    align-items:center;
    border-radius:10px;

`;

const FinishButtonText = styled.Text`
    font-size:17px;
    color: #FFFFFF;
    font-weight:bold;
`;


const DateInfo = styled.View`
    flex-direction: row;
`;

const DatePrevArea = styled.TouchableOpacity`
    flex: 1;
    justify-content: flex-end;
    align-items: flex-end;
`;

const DateTitleArea = styled.View`
    width: 140px;
    justify-content: center;
    align-items: center;
`;

const DateTitle = styled.Text`
    font-size: 17px;
    font-weight: bold;
    color: #000000;
`;

const DateNextArea = styled.TouchableOpacity`
    flex: 1;
    align-items: flex-start;
`;

const DateList = styled.ScrollView``;

const DateItem = styled.TouchableOpacity`
    width: 45px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
`;

const DateItemWeekDay = styled.Text`
    font-size: 16px;
    font-weight: bold;
`;

const DateItemNumber = styled.Text`
    font-size: 16px;
    font-weight: bold;
`;

const TimeList = styled.ScrollView``;

const TimeItem = styled.TouchableOpacity`
    width: 75px;
    height: 40px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
`;

const TimeItemText = styled.Text`
    font-size: 16px;
`;

const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
];
const days = [
    'Dom',
    'Seg',
    'Ter',
    'Qua',
    'Qui',
    'Sex',
    'Sab'
];

//show = true ou false// para o modal aparecer ou não
//tipo de animação:  animationType="slide" ::desliza debaixo para cima
//service = recebe o índice do serviço selecionado: 1,2,4,5,6...
//service vem como null, pois só será true quando clicar em agendar, aí será true e mostrará
//user: dentro do user, tem os serviços de cada barbeiro que terá ainda o nome e o  valor do serviço
export default ({show, setShow, user, service}) =>{

    const navigation = useNavigation();
    const [selectedYear, setSelectedYear] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState(0);
    const [selectedDay, setSelectedDay] = useState(0);
    const [selectedHour, setSelectedHour] = useState(null);
    const [listDays, setListDays] = useState([]);
    const [listHours, setListHours] = useState([]);

    //quando a tela abre, pega o ano selecionado e o mes e mudar eles conforme o usuário seleciona
    useEffect(()=>{ 
        let today = new Date(); //pega a data de hoje
        setSelectedYear(today.getFullYear()); //ano atual
        setSelectedMonth(today.getMonth());//mes no javascript começa no 0
        setSelectedDay(today.getDate());//dia atual
    },[])

    //mostra os dias disponíveis no mes e os dias disponíveis pelo barbeiro
    useEffect(()=>{
        if(user.available){ //quando estiver disponível os dias e horas, aí roda
            let daysInMonth = new Date(selectedYear, selectedMonth+1, 0).getDate();//não existe dia 0 no mes +1. Logo, ele pega o último dia do mes
            let newListDays = [];

            for(let i=1; i<=daysInMonth; i++){ //faz loop em cada um dos dias
                let d = new Date(selectedYear, selectedMonth, i); //pega cada dia do mes
                let year = d.getFullYear();
                let month = d.getMonth() + 1; //mes no JavaScript começa no 0
                let day = d.getDate();
                month = month < 10 ? '0'+month : month; //se o mes tiver 2 digitos, não coloca 0, se for janeiro, mes 1, fica 01
                day = day < 10 ? '0'+day : day;
                let selDate = year+'-'+month+'-'+day; //forma dessa forma a data, pois no API está assim, e vamos comparar com lá, verificando a disponibilidade se terá no dia
                //console.log("AVAILABLEEEEEE",selDate, user.available);
                //faz um loop na data desejada na api e verifica se é igual. Faz isso através de um filter
                //se não tiver nenhum item, o barbeiro não terá disponibilidade naquele dia
                let availability = user.available.filter(e=>e.date === selDate);
                newListDays.push({
                    status:availability.length > 0 ? true : false, //se tiver data, então será true
                    weekday: days[d.getDay()], //d.getDay() = dia 0, 1, 2, ...
                    number: i
                });
            }
            setListDays(newListDays);
            setSelectedDay(0);
            setListHours([]);
            setSelectedHour(0);
        }
    }, [user, selectedMonth, selectedYear]); //sempre que forem modificados, é preciso pegar quantos dias tem naquele mes
        //[user, selectedMonth, selectedYear] = todas as informações externas é preciso colocar aqui para acessar dentro do useEffect

    //quando trocar o dia, troca a lista de horas
    useEffect(()=>{
        console.log(user.available, selectedDay);
        if(user.available && selectedDay > 0) { //se tiver um dia selecionado
            let d = new Date(selectedYear, selectedMonth, selectedDay);
            let year = d.getFullYear();
            let month = d.getMonth() + 1;
            let day = d.getDate();
            month = month < 10 ? '0'+month : month;
            day = day < 10 ? '0'+day : day;
            let selDate = `${year}-${month}-${day}`;

            let availability = user.available.filter(e=>e.date === selDate);

            if(availability.length > 0) { //se tem horário disponível
                setListHours( availability[0].hours ); //pega as horas disponíveis e coloca na lista
            }
        }
    
        setSelectedHour(null);
    }, [user, selectedDay]);

    const handleCloseButton = () =>{
        setShow(false); //fecha o modal quando clicar
    }

    const handleFinishClick = async () =>{
        if(user.id && service != null && selectedYear > 0 && selectedMonth > 0 &&  selectedDay > 0 && selectedHour != null){

            let res = await Api.setAppointment(user.id, user.services[service].id, selectedYear, selectedMonth+1, selectedDay, selectedHour);
            console.log("RESPOSTA DA API:", res);
            if(res.error == ''){ //se não tiver nenhum erro
                setShow(false); //tira o modal
                navigation.navigate('Appointments'); //vai para o appointments 
            }else{
                alert("error:", res.error);
            }

        }else{
            alert("Selecione todos os campos");
        }
    }
    //diminui a data
    const handleLeftDateClick = () =>{
        let mountDate = new Date(selectedYear, selectedMonth, 1 );//pega o ano, mes e dia 1
        mountDate.setMonth(mountDate.getMonth() - 1); //seta o mes através da fnção setMonth do newDate e soma +1, ao clicar
        setSelectedYear(mountDate.getFullYear());
        setSelectedMonth(mountDate.getMonth()); // muda o mes para o mes de mountDate
        setSelectedDay(0);//seta o dia 1
    }

    const handleRightDateClick = () =>{
        let mountDate = new Date(selectedYear, selectedMonth, 1 );//pega o ano, mes e dia 1
        mountDate.setMonth(mountDate.getMonth() + 1); //seta o mes através da fnção setMonth do newDate e soma +1, ao clicar
        setSelectedYear(mountDate.getFullYear());
        setSelectedMonth(mountDate.getMonth()); // muda o mes para o mes de mountDate
        setSelectedDay(0);//seta o dia 1
    }


    return(
        <Modal
            transparent={true}
            visible={show}
            animationType="slide"
        >
            <ModalArea>
                <ModalBody>
                    <CloseButton onPress={handleCloseButton}>
                        <ExpandIcon width="40" height="40" fill="#000000"/>
                    </CloseButton>

                    <ModalItem>
                        <UserInfo>
                            <UserAvatar source={{uri:user.avatar}}/>
                            <UserName>{user.name} </UserName>
                        </UserInfo>
                    </ModalItem>

                    {service != null &&
                        <ModalItem>
                            <ServiceInfo>
                                <ServicesName>{user.services[service].name}</ServicesName>
                                <ServicePrice>R$ {user.services[service].price.toFixed(2)}</ServicePrice>
                            </ServiceInfo>
                        </ModalItem>
                    }

                    <ModalItem>
                        <DateInfo>
                            <DatePrevArea onPress={handleLeftDateClick}>
                                <NavPrevIcon width="35" height="35" fill="#000000"></NavPrevIcon>
                            </DatePrevArea>
                            <DateTitleArea>
                                <DateTitle>{months[selectedMonth]} { selectedYear}</DateTitle>
                            </DateTitleArea>
                            <DateNextArea onPress={handleRightDateClick}>
                                <NavNextIcon width="35" height="35" fill="#000000"></NavNextIcon>
                            </DateNextArea>
                        </DateInfo>
                        <DateList horizontal={true} showsHorizontalScrollIndicator={false}>
                            {listDays.map((item,key)=>(
                                <DateItem key={key} 
                                          onPress={()=>item.status ? setSelectedDay(item.number) : null}
                                          style={{opacity: item.status ? 1 : 0.4, 
                                                  backgroundColor:item.number === selectedDay ? '#4EADBE' : '#FFFFFF'}}>
                                    <DateItemWeekDay
                                        style={{
                                            color:item.number === selectedDay ? '#FFFFFF' : '#000000'
                                        }}
                                    >{item.weekday}</DateItemWeekDay>
                                    <DateItemNumber>{item.number}</DateItemNumber>
                                </DateItem>
                            ))}
                        </DateList>
                    </ModalItem>
                    
                    {listHours.length > 0 && selectedDay > 0 &&
                        <ModalItem>
                            <TimeList horizontal={true} showsHorizontalScrollIndicator={false}>
                                {listHours.map((item, key)=>(
                                    <TimeItem
                                        key={key}
                                        onPress={()=>setSelectedHour(item)}
                                        style={{
                                            backgroundColor: item === selectedHour ? '#4EADBE' : '#FFFFFF'
                                        }}
                                    >
                                        <TimeItemText
                                            style={{
                                                color: item === selectedHour ? '#FFFFFF' : '#000000',
                                                fontWeight: item === selectedHour ? 'bold' : 'normal'
                                            }}
                                        >{item}</TimeItemText>
                                    </TimeItem>
                                ))}
                            </TimeList>
                            
                        </ModalItem>
                    }
                    <FinishButton onPress={handleFinishClick}>
                        <FinishButtonText>Finalizar Agendamento{listHours.length} {selectedDay}</FinishButtonText>
                    </FinishButton>
                </ModalBody>
            </ModalArea>
        </Modal>
    )
}