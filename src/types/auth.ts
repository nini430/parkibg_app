import { User } from "./user";

export type FirstField='email'|'phoneNumber';

export interface RegisterValues {
    firstName:string;
    lastName:string;
    email:string;
    phoneNumber:string;
    idNumber:string;
    password:string;
    confirmPassword:string;
}


export type RegisterInput=Omit<RegisterValues,'confirmPassword'>

export interface AuthInitialState {
    isRegisterPending:boolean;
    isLoginPending:boolean;
    authedUser: User | null;
}

export interface LoginValues {
    email?:string;
    phoneNumber?:string;
    password:string;
}