
//informações iniciais do usuário e que ficarão salva e posso vem em qualquer tela que acessar
export const initialState = {
    avatar: '',
    favotires: [],
    appointments: []
};

//quais ações serão feitas em relação ao initialState, que são as informações do usuário
export const UserReducer = (state, action) =>{
        //quais serão as ações feitas
        switch(action.type){
            case 'SET_AVATAR':
                return {...state, avatar: action.payload.avatar}; //copia o conteudo que tem{...state} e altera o avatar
            break;
            default:
                return state;
        }
}