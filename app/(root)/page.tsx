import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";

const Home = async () => {
  const session = await auth();
  console.log(session);

  return (
    <>
      <h1 className="text-center text-4xl">
        Welcome to the world Of Nextjs 15
      </h1>
      <form className="flex h-screen items-center justify-center" action={async () => {
        "use server";
        await signOut({redirectTo: ROUTES.SIGN_IN})
      }}>
        <Button type="submit">Logout</Button>
      </form>
    </>
  );
};

export default Home;
