import axios from "axios";
import qs from "qs";

axios.defaults.paramsSerializer = params => {
    return qs.stringify(params);
}


export interface usersUpdateParams {
    email: string;
    nickname: string;
    password: string;
}

export const loginRequest = async (enteredEmail: string, enteredPassword: string) => {
    let url;
    url = "/member-service/members/login";
    return await axios.post(process.env.REACT_APP_DB_HOST + url, {
        email: enteredEmail,
        password: enteredPassword
    })
}

export const signUpRequest = async (email: string, nickname: string, password: string) => {
    let url;
    url = "/member-service/members"
    return await axios.post(process.env.REACT_APP_DB_HOST + url, {
        email: email,
        nickname: nickname,
        password: password
    })
}

export const nicknameCheckRequest = async (nickname: string) => {
    let url;
    url = "/member-service/nickname-check"
    let params = {
        nickname : nickname,
    };

    return await axios.get(process.env.REACT_APP_DB_HOST + url, {
        params
    })
}

export const emailCheckRequest = async (email: string) => {
    let url;
    url = "/member-service/email-check"
    let params = {
        email : email,
    };

    return await axios.get(process.env.REACT_APP_DB_HOST + url, {
        params
    })
}

export const usersInfoRequest = async (id: string, token: string) => {
    let url;
    url = `/member-service/members/${id}`
    const response = await axios.get(process.env.REACT_APP_DB_HOST + url,
        {
            headers: {
                authorization: token,
            }
        })
    return response.data;
}

export const deleteUsersRequest = async (id: string, password: string, token: string) => {
    let url;
    url = `/member-service/members/${id}`
    let params = {
        password,
    };
    const response = await axios.delete(process.env.REACT_APP_DB_HOST + url,
        {
            params,
            headers: {
                authorization: token,
            }
        })
    return response.data;
}

export const updateUsersRequest = async (id : string, usersUpdateParams: usersUpdateParams, token: string) => {
    let url;
    url = `/member-service/members/${id}`
    return await axios.put(process.env.REACT_APP_DB_HOST + url, {
        email: usersUpdateParams.email,
        nickname: usersUpdateParams.nickname,
        password: usersUpdateParams.password,
    }, {
        headers: {
            authorization: token,
        }
    })
}
