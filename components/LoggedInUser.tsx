"use client"

import Link from "next/link";
import { useSession } from "next-auth/react";

const LoggedInUser = ({ href, author }: { href: string, author: string }) => {
  const session = useSession();
    const userId = session?.data?.user?.id;
    if (userId !== author) {
      return null; // Don't show the edit button if the user is not the author
    }
  return (
    <Link
      href={`${href}/edit`}
      type="submit"
      className="primary-gradient w-fit rounded-2 px-5 py-1.5 font-semibold text-slate-800"
    >
      Edit
    </Link>
  );
};

export default LoggedInUser;
