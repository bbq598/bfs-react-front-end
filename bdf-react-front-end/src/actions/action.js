import axios from 'axios';
import api from '../api';
import Cookies from 'js-cookie';


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
        // const name = {"name" : "tiger"}
        api.post('http://localhost:8081/time/getTimeSheet').then(res => {
            const { data } = res;
            const action = setData(data);
            dispatch(action);
        })
        .catch( (error) =>{
            if(error.response.status === 2200){
                window.location.href = 'http://localhost:9999/auth?redirect=http://localhost:3000';
            }
          })
    }
}

export const setTimeSheet = (payload) =>{
    return{
        type :'SETTIMESHEET',
        payload
    }
}
export const setContact = (payload) =>{
    return{
        type:"SETCONTACT",
        payload
    }
}

export const setBilling = (payload) =>{
    return{
        type :'SETBILLING',
        payload
    }
}

export const getContact = () => {
    return (dispatch) => {
        // const userId = {"userId" : "1"}
        api.post('http://localhost:8081/employee/getContactByUserId').then(res => {
            const { data } = res;
            const action = setContact(data);
            dispatch(action);
        })
        .catch( (error) =>{
            if(error.response.status === 2200){
                window.location.href = 'http://localhost:9999/auth?redirect=http://localhost:3000';
            }
          })
    }
}


export const setContact1 =(payload)=>{
    return {
        type : "SETCONTACT1",
        payload
    }
}

export const setContact2 =(payload)=>{
    return {
        type : "SETCONTACT2",
        payload
    }
}
export const setContact3 =(payload)=>{
    return {
        type : "SETCONTACT3",
        payload
    }
}
export const setContact4 =(payload)=>{
    return {
        type : "SETCONTACT4",
        payload
    }
}
export const setContact5 =(payload)=>{
    return {
        type : "SETCONTACT5",
        payload
    }
}
export const setContact6 =(payload)=>{
    return {
        type : "SETCONTACT6",
        payload
    }
}
export const setContact7 =(payload)=>{
    return {
        type : "SETCONTACT7",
        payload
    }
}
export const setContact8 =(payload)=>{
    return {
        type : "SETCONTACT8",
        payload
    }
}
export const setContact9 = (payload)=>{
    return {
        type : "SETCONTACT9",
        payload
    }
}