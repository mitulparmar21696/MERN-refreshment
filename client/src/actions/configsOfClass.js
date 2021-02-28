import axios from 'axios';
import History from '../history.js';
import {
    GET_GRADE_PENDING,
    GET_GRADE_SUCCESS,
    GET_GRADE_ERROR,
    GET_SUBJECT_PENDING,
    GET_SUBJECT_SUCCESS,
    GET_SUBJECT_ERROR
} from './types';

const ROOT_URL = 'http://localhost:3000';


export const getGradeList = () => {
    return (dispatch) => {
        // submit email/password to the server
        dispatch({ type: GET_GRADE_PENDING })
        axios.get(`${ROOT_URL}/grades`)
            .then(response => {
                // if request is good...
                // - update state to indicate user is authenticated
                dispatch({ type: GET_GRADE_SUCCESS, payload: response.data.data })

                // - redirect to the route '/feature'
                // History.push('/dashboard');

            }).catch(() => {
                dispatch({ type: GET_GRADE_ERROR })
                // if request is bad...
                // - show an error to the user
            });
    };

}


export const getSubjectList = () => {
    return (dispatch) => {
        // submit email/password to the server

        dispatch({ type: GET_SUBJECT_PENDING })
        axios.get(`${ROOT_URL}/subject`)
            .then(response => {
                debugger
                // if request is good...
                // - update state to indicate user is authenticated
                dispatch({ type: GET_SUBJECT_SUCCESS, payload: response.data.data })

                // - redirect to the route '/feature'
                // History.push('/dashboard');

            }).catch(() => {
                dispatch({ type: GET_SUBJECT_ERROR })
                // if request is bad...
                // - show an error to the user
            });
    };

}