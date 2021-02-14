const initialState = {
    init : "init",
    counter : 0,
    clickTimes: 0,
    user:[],
    index : 0,

}



export default function appReducer(state = initialState, action){

    switch(action.type){
        case 'INCREASE':{
            return{
                ...state,
                counter: state.counter + action.payload,
                clickTimes : state.clickTimes + 1,
            }
        }

        case 'DECREMENT':{
            return{
                ...state,
                counter : state.counter - action.payload,
                clickTimes : state.clickTimes + 1
            }
        }

        case 'SETDATA' : {
            return{
                ...state,
                user: action.payload,
            }
        }

        
        case 'SETINDEX' : {
            return{
                ...state,
                index : action.payload,
            }
        }

        default:
            return state;

    }

}