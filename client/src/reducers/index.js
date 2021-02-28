
import { combineReducers } from 'redux';
import { reducer as authReducer } from './auth';
import { reducer as userReducer } from './users';
import { reducer as configOfClassReducer } from './configsOfClass'


const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    classConfig: configOfClassReducer
});

export default rootReducer;