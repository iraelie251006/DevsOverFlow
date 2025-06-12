import Image from "next/image";
import Link from "next/link";

import { auth, signOut } from "@/auth";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import UserAvatar from "@/components/UserAvatar";
import ROUTES from "@/constants/routes";

import MobileNavigation from "./MobileNavigation";
import Theme from "./Theme";
import GlobalSearch from "@/components/search/GlobalSearch";

const Navbar = async () => {
  const session = await auth();

  const handleClick = async () => {
    "use server";
    await signOut();
  };
  return (
    <nav className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12">
      <Link href={ROUTES.HOME} className="flex items-center gap-1">
        <Image
          src="/images/site-logo.svg"
          width={23}
          height={23}
          alt="DevFlow Logo"
        />
        <p className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          Dev<span className="text-primary-500">Flow</span>
        </p>
      </Link>
      <GlobalSearch />
      <div className="flex-between gap-5">
        <Theme />
        {session?.user?.id && (
          <>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <UserAvatar
                  id={session.user.id}
                  name={session.user.name!}
                  imageUrl={session.user?.image}
                />
              </AlertDialogTrigger>
              <AlertDialogContent className="background-light800_dark300">
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action will log you out of your account.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="btn">Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="!border-primary-100 !bg-primary-500 !text-light-900"
                    onClick={handleClick}
                  >
                    Log Out
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        )}
        <MobileNavigation />
      </div>
    </nav>
  );
};

export default Navbar;
