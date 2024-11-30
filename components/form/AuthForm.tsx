"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { z, ZodType } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ROUTES from "@/constants/routes";


interface AuthFormProps<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean }>;
  formType: "SIGN_IN" | "SIGN_UP";
}
const AuthForm = <T extends FieldValues>({
  onSubmit,
  formType,
  schema,
  defaultValues,
}: AuthFormProps<T>) => {
  // ...
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });
  // 2. Define a submit handler.
  const handleSubmit: SubmitHandler<T> = async () => {
    // TODO: Authenticate the User
  };
  
  const ButtonText = formType === "SIGN_IN" ? "Sign In" : "Sign Up";

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="mt-10 space-y-6"
      >
        {Object.keys(defaultValues).map((field) => (
          <FormField
            key={field}
            control={form.control}
            name={field as Path<T>}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="paragraph-medium text-dark400_light700">
                  {field.name === "email"
                    ? "Email Address"
                    : field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    type={field.name === "password" ? "password" : "text"}
                    placeholder={
                      field.name === "password"
                        ? "Enter password"
                        : `Enter ${field.name}`
                    }
                    {...field}
                    className="paragraph-regular min-h-12 rounded-1.5"
                    // Other preferred styles
                    // background-light900_dark300 light-border-2 text-dark300_light700 no-focus border
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button
          disabled={form.formState.isSubmitting}
          className="primary-gradient paragraph-medium min-h-12 w-full rounded-2 px-4 py-3 font-inter !text-light-900"
        >
          {form.formState.isSubmitting
            ? ButtonText === "Sign In"
              ? "Signing In..."
              : "Signing Up..."
            : ButtonText}
        </Button>
        <div className="flex justify-center">
          {formType === "SIGN_IN" ? (
          <p>
            Don&apos;t have an account?{"  "}
            <Link
              href={ROUTES.SIGN_UP}
              className="paragraph-semibold primary-text-gradient"
            >
              Register
            </Link>
          </p>
        ) : (
          <p>
            Already have an account?{"  "}
            <Link
              href={ROUTES.SIGN_IN}
              className="paragraph-semibold primary-text-gradient"
            >
              Sign In
            </Link>
          </p>
        )}  
        </div>
        
      </form>
    </Form>
  );
};

export default AuthForm;
