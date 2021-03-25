import AsyncStorage from '@react-native-community/async-storage';

const BASE_API = 'http://10.0.2.2:8000/api';

export default {
    //CHECAR TOKEN
    checkToken: async (token) => {
        const req = await fetch(`${BASE_API}/auth/refresh`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token}) //envia um token e dá um refresh, um novo token e salva
        });
        const json = await req.json();        
        return json;
    },
    //LOGIN
    //para fazer o login,fazendo uma requisição POST, consultando a API, mandando o conteudo em formato de JSON
    signIn: async (email, password) => { //recebe email e senha para checar
        console.log(email, password);
        const req = await fetch(`${BASE_API}/auth/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },//faz a requisição em JSON convertendo para stringify, que é preciso, e recebe uma resposta
            body: JSON.stringify({email, password}) //conteudo que envia para checar se está cadastrado e correto
        });
        const json = await req.json(); //transforma a requisição e retorna ela  
        console.log(json);
        return json;
    },
    //CADASTRO
    signUp: async (name, email, password) => {
        const req = await fetch(`${BASE_API}/user`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password})
        });
        const json = await req.json();        
        return json;
    },
    //SAIR DA CONTA
    logout: async () => {
        //AsyncStorage = pega o token e armazena na memória do celular
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/auth/logout`, { //quando faz a requisição, token fica inválido
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token})
        });
        const json = await req.json();        
        return json;
    },
    //PEGA OS BARBEIROS,  LISTA
    getBarbers: async (lat=null, lng=null, address=null) => {  //address: o local que usuário digitou
        const token = await AsyncStorage.getItem('token');//PEGA O TOKEN

        console.log("LAT", lat);
        console.log("LNG", lng);
        console.log("ADDRESS", address);

        const req = await fetch(`${BASE_API}/barbers?token=${token}&lat=${lat}&lng=${lng}&address=${address}`);
        const json = await req.json();
        return json;
    },
    //PEGA INFORMAÇÃO DE APENAS UM BARBEIRO, UM SÓ
    getBarber: async (id) =>{//envia apenas o id que vai receber de volta toda a informações
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/barber/${id}?token=${token}`);
        const json = await req.json();
        return json;
    },
    //BARBER FAVORITO
    setFavorite: async (barberId) =>{
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/user/favorite`, { 
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token, barber:barberId})
        });
        const json = await req.json();        
        return json;
    },

    setAppointment: async(userId, service, selectedYear, selectedMonth, selectedDay, selectedHour) =>{
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/barber/${userId}/appointment`, { //faz agendamento no barbeiro
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token, service, year:selectedYear, month:selectedMonth, day:selectedDay, hour:selectedHour})
        });
        const json = await req.json();        
        return json;
    }, 
    //BUSCA
    search: async (barberName) =>{
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/search?q=${barberName}&token=${token}`);
        const json = await req.json();
        return json;
    },
    getFavorites: async () =>{
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/user/favorites?token=${token}`);
        const json = await req.json();
        return json;
    },

    getAppointments: async ()=>{
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/user/appointments?token=${token}`);
        const json = await req.json();
        return json;
    }


};