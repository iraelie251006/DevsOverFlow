import Image from "next/image";
import Link from "next/link";

import ROUTES from "@/constants/routes";
import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback } from "./ui/avatar";
import { AvatarProps } from "@/types/action";


const UserAvatar = ({
  id,
  name,
  imageUrl,
  className = "h-9 w-9",
  fallbackClassName,
}: AvatarProps) => {
  const initials = name
    .split(" ")
    .map((word: string) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  return (
    <Link href={ROUTES.PROFILE(id)}>
      <Avatar className={cn("relative", className)}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            quality={100}
            className="object-cover"
          />
        ) : (
          <AvatarFallback
            className={cn(
              "primary-gradient font-spaceGrotesk font-bold tracking-wider text-white",
              fallbackClassName
            )}
          >
            {initials}
          </AvatarFallback>
        )}
      </Avatar>
    </Link>
  );
};

export default UserAvatar;
