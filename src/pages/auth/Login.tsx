import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useAppDispatch } from '@/store/store';
import { FirstField, LoginValues } from '@/types/auth';

import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { yupResolver } from '@hookform/resolvers/yup';
import loginSchema from '@/yup-validation/login';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { loginUser } from '@/store/authReducer';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [firstField, setFirstField] = useState<FirstField>('email');
  const dispatch = useAppDispatch();
  const navigate=useNavigate();
  const form = useForm<LoginValues>({
    defaultValues: {
      email: '',
      phoneNumber: '',
      password: '',
    },
    resolver: yupResolver(loginSchema(firstField)) as any,
    mode: 'onTouched',
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: LoginValues) => {
    try {
      dispatch(loginUser({input:values,onSuccess:()=>{
        navigate('/');
      }}));
    } catch (err) {
      toast.error('Soemthing went wrong');
    }
  };
  return (
    <div className="w-full min-h-[calc(100vh-80px)] flex justify-center items-center">
      <Form {...form}>
        <form
          className="space-y-4 p-4 rounded-md shadow-md w-[90%] md:w-[400px]"
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            name={firstField}
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {firstField === 'email' ? 'E-mail' : 'Phone Number'}
                </FormLabel>
                <FormControl>
                  <Input {...field} disabled={isSubmitting} />
                </FormControl>
                <FormMessage className='text-red-500' />
              </FormItem>
            )}
          />
          <FormField name='password' control={form.control} render={({field})=>(
            <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                    <Input disabled={isSubmitting} type='password' {...field} />
                </FormControl>
                <FormMessage className='text-red-500'/>
            </FormItem>
          )}/>
          <Button disabled={!isValid || isSubmitting} className='border border-gray-200 w-full'>Login</Button>
        </form>
      </Form>
    </div>
  );
};

export default Login;
