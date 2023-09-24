import {configureStore} from '@reduxjs/toolkit'
import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux'
import authReducer from './authReducer';

const store=configureStore({
    reducer:{
        auth:authReducer
    },
    middleware:getDefaultMiddleware=>getDefaultMiddleware({
        serializableCheck:false
    })
})

type RootState=ReturnType<typeof store.getState>;
type AppDispatch=typeof store.dispatch;

export const useAppSelector:TypedUseSelectorHook<RootState>=useSelector;
export const useAppDispatch:()=>AppDispatch=useDispatch;


export default store;