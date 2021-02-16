
const initialState = {
    init : "initinti",
    counter : 0,
    clickTimes: 0,
    user:[],
    index : 0,
    contact : "null",
    contactTemp: "null",
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
                contactTemp: action.payload,
            }
        }


        case 'SETCONTACT1' :{
            const data = Object.assign({},state.contactTemp,{phone:action.payload});
            return{
                ...state,
                contactTemp : data,
            }
        }

        case 'SETCONTACT2' :{
            const data = Object.assign({},state.contactTemp,{email:action.payload});
            return{
                ...state,
                contactTemp : data,
            }
        }    


        case 'SETCONTACT3' :{
            const data = Object.assign({},state.contactTemp,{homeAddress:action.payload});
            return{
                ...state,
                contactTemp : data,
            }
        }    
        case 'SETCONTACT4' :{
            const data = Object.assign({},state.contactTemp,{ec1FirstName:action.payload});
            return{
                ...state,
                contactTemp : data,
            }
        }
        case 'SETCONTACT5' :{
            const data = Object.assign({},state.contactTemp,{ec1LastName:action.payload});
            return{
                ...state,
                contactTemp : data,
            }
        }
        case 'SETCONTACT6' :{
            const data = Object.assign({},state.contactTemp,{ec1Phone:action.payload});
            return{
                ...state,
                contactTemp : data,
            }
        }
        case 'SETCONTACT7' :{
            const data = Object.assign({},state.contactTemp,{ec2FirstName:action.payload});
            return{
                ...state,
                contactTemp : data,
            }
        }
        case 'SETCONTACT8' :{
            const data = Object.assign({},state.contactTemp,{ec2LastName:action.payload});
            return{
                ...state,
                contactTemp : data,
            }
        }
        case 'SETCONTACT9' :{
            const data = Object.assign({},state.contactTemp,{ec2Phone:action.payload});
            return{
                ...state,
                contactTemp : data,
            }
        }
        default:
            return state;

    }

}