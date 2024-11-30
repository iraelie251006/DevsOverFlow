"use client"
import AuthForm from "@/components/form/AuthForm";
import { SignUpSchema } from "@/lib/validations";

const SignUp = () => {
  return (
    <AuthForm 
    formType = "SIGN_UP"
    schema = {SignUpSchema}
    defaultValues = {{name: "", username: "",email: "", password: ""}}
    onSubmit = {(data) => Promise.resolve({success: true, data})}
    />
  )
};

export default SignUp;
