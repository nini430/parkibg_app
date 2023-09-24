import { FirstField } from '@/types/auth'
import {object, string} from 'yup'


const loginSchema=(firstField:FirstField)=>{
    return object().shape({
        [firstField]:string().required('Field is required'),
        password:string().required('Field is required')
    })
}


export default loginSchema;