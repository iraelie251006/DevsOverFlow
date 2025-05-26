"use client"; 

import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

import ROUTES from "@/constants/routes";

const Profile = () => {
  const session = useSession();
  if (!session.data) return redirect(ROUTES.SIGN_IN);
  return <div>Profile</div>;
};

export default Profile;
