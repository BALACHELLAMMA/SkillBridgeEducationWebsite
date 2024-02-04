export interface LoginForm {
    userEmail:string;
    userPassword : string;
}

export interface ContactForm {
    firstName : string;
    lastName:string;
    userEmail:string;
    phoneNumber:number;
    subject :string;
    message: string;
}
export const setLoginFormData = (loginFormData : LoginForm) =>({
    type : 'SET_LOGIN_FORM_DATA',
    payload : loginFormData,
 });


export const setContactFormData = (contactFormData : ContactForm) =>({
   type : 'SET_CONTACT_FORM_DATA',
   payload : contactFormData,
});


export type LoginFormActionTypes = ReturnType<typeof setLoginFormData>;
export type ContactFormActionTypes = ReturnType<typeof setContactFormData>;