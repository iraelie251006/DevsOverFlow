"use client"
import AuthForm from "@/components/form/AuthForm"
import { signInWithCredentials } from "@/lib/actions/auth.action"
import { SignInSchema } from "@/lib/validations"

const SignIn = () => {
  return (
    <AuthForm 
     formType = "SIGN_IN"
     schema = {SignInSchema}
     defaultValues = {{email: "", password: ""}}
     onSubmit = {signInWithCredentials}
    />
  )
}

export default SignIn