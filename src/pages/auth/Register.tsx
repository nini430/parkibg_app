import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {toast} from 'react-hot-toast'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { registerSchema } from '@/yup-validation/register';
import { RegisterValues } from '@/types/auth';
import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/store/store';
import { registerUser } from '@/store/authReducer';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate=useNavigate();
  const dispatch=useAppDispatch();
  const form = useForm<RegisterValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      idNumber: '',
    },
    resolver: yupResolver(registerSchema),
    mode:'onTouched'
  });

  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: RegisterValues) => {
     try{
      dispatch(registerUser({input:values,onSuccess:(message:string)=>{
        toast.success(message);
        navigate('/login');
      }}))
     }catch(err:any) {
        toast.error(err.message||'Something went wrong');
     }
  };
  return (
    <div className="w-full min-h-[calc(100vh-80px)] flex flex-col justify-center items-center space-y-2">
      <h1>Sign Up</h1>
      <Form {...form}>
        <form
          className="shadow-md w-[90%] md:w-[500px] p-4 rounded-md space-y-3"
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            name="firstName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="First Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage className='text-red-500' />
              </FormItem>
            )}
          />
          <FormField
            name="lastName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="Last Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage className='text-red-500' />
              </FormItem>
            )}
          />
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="E-mail"
                    {...field}
                  />
                </FormControl>
                <FormMessage className='text-red-500' />
              </FormItem>
            )}
          />
          <FormField
            name="phoneNumber"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="Phone Number"
                    {...field}
                  />
                </FormControl>
                <FormMessage className='text-red-500'/>
              </FormItem>
            )}
          />
          <FormField
            name="idNumber"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Personal ID</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="Personal ID"
                    {...field}
                  />
                </FormControl>
                <FormMessage className='text-red-500'/>
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    disabled={isSubmitting}
                    placeholder="Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage className='text-red-500'/>
              </FormItem>
            )}
          />
          <FormField
            name="confirmPassword"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    disabled={isSubmitting}
                    placeholder="Confirm Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage className='text-red-500'/>
              </FormItem>
            )}
          />
          <Button disabled={isSubmitting || !isValid} variant='secondary' className='w-full border border-gray-200' type='submit'>Sign Up</Button>
        </form>
      </Form>
    </div>
  );
};

export default Register;
