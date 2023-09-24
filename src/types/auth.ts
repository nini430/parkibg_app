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
}
