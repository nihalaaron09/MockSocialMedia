import axios from "axios"
const URL = process.env.REACT_APP_BACKEND_URL;


export const loginCall = async (userCredentials, dispatch) => {
    dispatch({
        type: "LOGIN_START"
    })
    try{
        const res = await axios.post( URL + "/api/auth/login", userCredentials)
        dispatch({
            type: "LOGIN_SUCCESS",
            payload: res.data
        })
    }catch(err){
        dispatch({
            type: "LOGIN_FAULIRE",
            payload: err
        })
    }
}



