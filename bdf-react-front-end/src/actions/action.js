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

export const setTimeSheet = (payload) =>{
    return{
        type :'SETTIMESHEET',
        payload
    }
}

export const setBilling = (payload) =>{
    return{
        type :'SETBILLING',
        payload
    }
}