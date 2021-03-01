
import axios from 'axios';
import History from '../history.js';
import {
    CREATE_EXAM_PENDING,
    CREATE_EXAM_SUCCESS,
    CREATE_EXAM_ERROR,


    GET_EXAM_PENDING,
    GET_EXAM_SUCCESS,
    GET_EXAM_ERROR
} from './types';

const ROOT_URL = 'http://localhost:3000';
const header = {
    headers: {
        'Authorization': `${localStorage.getItem('token')}`
    }
}

export const createExam = (exm) => {
    debugger
    return (dispatch) => {
        // submit email/password to the server
        dispatch({ type: CREATE_EXAM_PENDING })
        axios.post(`${ROOT_URL}/exams`, exm, header)
            .then(response => {
                debugger
                dispatch({ type: CREATE_EXAM_SUCCESS, payload: response.data.data })

            }).catch(() => {
                dispatch({ type: CREATE_EXAM_ERROR })
            });
    };
};


export const getExamsList = () => {
    debugger
    return (dispatch) => {
        // submit email/password to the server
        dispatch({ type: GET_EXAM_PENDING })
        axios.get(`${ROOT_URL}/get-exams`, header)
            .then(response => {
                debugger
                dispatch({ type: GET_EXAM_SUCCESS, payload: response.data.data })

            }).catch(() => {
                dispatch({ type: GET_EXAM_ERROR })
            });
    };
};
