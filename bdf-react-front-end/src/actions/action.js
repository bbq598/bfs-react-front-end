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