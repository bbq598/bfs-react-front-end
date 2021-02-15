
const initialState = {
    init : "initinti",
    counter : 0,
    clickTimes: 0,
    user:[],
    index : 0,
    contact : "null",
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
                index : [action.payload],
            }
        }

        case 'SETCONTACT' : {
            return{
                ...state,
                contact: action.payload,
            }
        }

        default:
            return state;

    }

}