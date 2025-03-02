"use client"
import AuthForm from "@/components/form/AuthForm";
import { signUpWithCredentials } from "@/lib/actions/auth.action";
import { SignUpSchema } from "@/lib/validations";

const SignUp = () => {
  return (
    <AuthForm 
    formType = "SIGN_UP"
    schema = {SignUpSchema}
    defaultValues = {{name: "", username: "",email: "", password: ""}}
    onSubmit = {signUpWithCredentials}
    />
  )
};

export default SignUp;
