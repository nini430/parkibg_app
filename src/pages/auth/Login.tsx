import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";

const Login = () => {
    const form=useForm();
    return ( 
        <div className="w-full min-h-[calc(100vh-80px)] flex jusitfy-center items-center">
        Login
        </div>
     );
}
 
export default Login;