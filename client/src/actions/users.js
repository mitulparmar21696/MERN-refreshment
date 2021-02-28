import axios from 'axios';
import History from '../history.js';
import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    FETCH_FEATURE,
    USER_CREATE_SUCCESS,
    USER_CREATE_ERROR,
    GET_USER_PENDING,
    GET_USER_SUCCESS,
    GET_USER_ERROR
} from './types';

const ROOT_URL = 'http://localhost:3000';

export const signinUser = ({ email, password }) => {
    debugger
    return (dispatch) => {
        // submit email/password to the server
        axios.post(`${ROOT_URL}/users/sign-in`, { email, password })
            .then(response => {
                debugger
                // if request is good...
                // - update state to indicate user is authenticated
                dispatch({ type: AUTH_USER });
                debugger
                // - save the jwt token
                localStorage.setItem('token', response.data.data.auth);

                // - redirect to the route '/feature'
                History.push('/feature');

            }).catch(() => {
                debugger
                // if request is bad...
                // - show an error to the user
                dispatch(authError('Bad Login Info'));
            });
    };
};


export const authError = (error) => {
    return {
        type: AUTH_ERROR,
        payload: error
    };
};

export const createUserError = (error) => {
    return {
        type: USER_CREATE_ERROR,
        payload: error
    };
};

export const signoutUser = () => {
    localStorage.removeItem('token')
    return { type: UNAUTH_USER };
};

export const fetchFeature = () => {
    return (dispatch) => {
        axios.get(ROOT_URL, {
            headers: { authorization: localStorage.getItem('token') }
        })
            .then(response => {
                dispatch({
                    type: FETCH_FEATURE,
                    payload: response.data
                });
            });
    };
};


export const createUser = (user) => {
    debugger
    return (dispatch) => {
        // submit email/password to the server
        axios.post(`${ROOT_URL}/users/create`, user)
            .then(response => {
                debugger
                // if request is good...
                // - update state to indicate user is authenticated
                dispatch({ type: USER_CREATE_SUCCESS });

                // - redirect to the route '/feature'
                History.push('/dashboard');

            }).catch(() => {
                debugger
                // if request is bad...
                // - show an error to the user
                dispatch(createUserError('Bad Login Info'));
            });
    };
};

export const getListOfUser = (userType) => {
    return (dispatch) => {
        // submit email/password to the server

        dispatch({ type: GET_USER_PENDING })
        axios.get(`${ROOT_URL}/users/${userType}`)
            .then(response => {
                // if request is good...
                // - update state to indicate user is authenticated
                dispatch({ type: GET_USER_SUCCESS, payload: response.data.data })

                // - redirect to the route '/feature'
                // History.push('/dashboard');

            }).catch(() => {
                dispatch({ type: GET_USER_ERROR })
                // if request is bad...
                // - show an error to the user
            });
    };

}