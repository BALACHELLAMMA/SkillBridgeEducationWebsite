import contactFormReducer, { loginFormReducer } from "./reducer";
import {combineReducers, configureStore} from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
    contactData : contactFormReducer,
    formData : loginFormReducer,
});

const store = configureStore({
    reducer : rootReducer,
})

export default store;

