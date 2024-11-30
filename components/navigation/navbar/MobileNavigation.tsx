import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import ROUTES from "@/constants/routes"
import Image from "next/image"
import Link from "next/link"
import NavLinks from "./NavLinks"
  
const MobileNavigation = () => {
  return (
        <Sheet>
            <SheetTrigger asChild>
                <Image 
                 src="/icons/hamburger.svg"
                 width={36}
                 height={36}
                 alt="Menu"
                 className="invert-colors sm:hidden"
                />
            </SheetTrigger>
            <SheetContent side="left" className="background-light900_dark200 border-none">
                <SheetTitle className="hidden">
                  Navigation
                </SheetTitle>
                <Link href={ROUTES.HOME} className="flex items-center gap-1">
                 <Image 
                  src="/images/site-logo.svg"
                  width={23}
                  height={23}
                  alt="Logo"
                 />
                 <p className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900">
                    Dev<span className="text-primary-500">Flow</span>
                 </p> 
                </Link>

                <div className="flex no-scrollbar h-[calc(100vh-80px)] flex-col justify-center overflow-y-auto">
                    <SheetClose asChild>
                        <section className="h-full flex flex-col gap-6 mt-16">
                            <NavLinks isMobileNav={true}/>
                        </section>
                    </SheetClose>
                    <div className="flex flex-col gap-3">
                        <SheetClose asChild>
                            <Link href={ROUTES.SIGN_IN}>
                             <Button className="small-medium btn-secondary min-h-[40px] w-full rounded-lg px-4 py-3 shadow-none">
                                <span className="primary-text-gradient">Login</span>
                             </Button>
                            </Link>
                        </SheetClose>
                        <SheetClose asChild>
                            <Link href={ROUTES.SIGN_UP}>
                             <Button className="small-medium btn-tertiary text-dark400_light900 min-h-[41px] light-border-2 border w-full rounded-lg px-4 py-3 shadow-none">
                                Sign Up
                             </Button>
                            </Link>
                        </SheetClose>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
  )
}

export default MobileNavigation