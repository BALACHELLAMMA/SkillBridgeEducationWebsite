import { ContactForm, ContactFormActionTypes, LoginForm, LoginFormActionTypes } from "./action";

export interface LoginFormState {
  loginFormData : LoginForm | null;
}

export interface ContactFormState {
    contactFormData : ContactForm | null;
}

const loginFormInitialState : LoginFormState = { 
  loginFormData: null,
}

const contactFormInitialState : ContactFormState = { 
    contactFormData: null,
}

const contactFormReducer = (state = contactFormInitialState, action:ContactFormActionTypes): ContactFormState =>{
  switch(action.type){
    case 'SET_CONTACT_FORM_DATA':
         return {...state, contactFormData: action.payload };
    default :
        return state;     
  }
}

export const loginFormReducer = (state = loginFormInitialState, action:LoginFormActionTypes): LoginFormState =>{
  switch(action.type){
    case 'SET_LOGIN_FORM_DATA':
         return {...state, loginFormData: action.payload };
    default :
        return state;     
  }
}

export default contactFormReducer;