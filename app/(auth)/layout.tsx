import React from "react";
import { ChidrenProps } from "../(root)/layout";
import Image from "next/image";
import SocialAuth from "@/components/form/SocialAuth";

const AuthLayout = ({ children }: ChidrenProps) => {
  return (
    <main className="flex min-h-screen justify-center items-center bg-auth-light dark:bg-auth-dark bg-cover bg-center bg-no-repeat px-4 py-10">
      <section className="light-border background-light800_dark200 shadow-light100_dark100 min-w-full rounded-[10px] border px-4 py-10 shadow-md sm:min-w-[520px] sm:px-8">
        <div className="flex items-center justify-between gap-2">
          <div className="spacing-y-2.5">
            <h1 className="h2-bold mb-2 text-dark100_light900">Sign In</h1>
            <p className="paragraph-regular text-dark500_light400">To continue to DevFlow</p>
          </div>
          <Image 
             src='/images/site-logo.svg'
             width={50}
             height={50}
             alt='DevFlow Logo'
             className="object-contain"
            />
        </div>
        {children}
        <SocialAuth />
      </section>
      
    </main>
  );
};

export default AuthLayout;
