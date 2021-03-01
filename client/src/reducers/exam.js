import {
    CREATE_EXAM_PENDING,
    CREATE_EXAM_SUCCESS,
    CREATE_EXAM_ERROR,

    GET_EXAM_PENDING,
    GET_EXAM_SUCCESS,
    GET_EXAM_ERROR
} from '../actions/types';
let initialState = {
    isCreateExamPending: false,
    exam: {},
    examList: [],
    isPending: false
}

export const reducer = (state = initialState, action) => {

    switch (action.type) {
        case CREATE_EXAM_PENDING:
            return { ...state, isCreateExamPending: true, exam: {} }
        case CREATE_EXAM_SUCCESS:
            return { ...state, isCreateExamPending: false, exam: action.payload }
        case CREATE_EXAM_ERROR:
            return { ...state, isCreateExamPending: false, exam: {} }
        case GET_EXAM_PENDING:
            return { ...state, isPending: true, examList: [] }
        case GET_EXAM_SUCCESS:
            return { ...state, isPending: false, examList: action.payload }
        case GET_EXAM_ERROR:
            return { ...state, isPending: false, examList: [] }
        default:
            return state;
    }
};