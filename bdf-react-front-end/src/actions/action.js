import axios from 'axios';


export const setIncrease = (payload) =>{
    return{
        type :'INCREASE',
        payload
    }
}


export const setData = (payload) =>{
    return{
        type:"SETDATA",
        payload,
    }
}


export const setIndex = (payload) =>{
    return{
        type:"SETINDEX",
        payload,
    }
}


export const getData = () => {
    return (dispatch) => {
        const name = {"name" : "tiger"}
        axios.post('http://localhost:8081/time/getTimeSheet',name).then(res => {
            const { data } = res;
            const action = setData(data);
            dispatch(action);
            console.log(data);
        })
    }
}


export const setContact = (payload) =>{
    return{
        type:"SETCONTACT",
        payload,
    }
}


export const getContact = () => {
    return (dispatch) => {
        const userId = {"userId" : "1"}
        axios.post('http://localhost:8081/employee/getContactByUserId',userId).then(res => {
            const { data } = res;
            const action = setContact(data);
            dispatch(action);
        })
    }
}