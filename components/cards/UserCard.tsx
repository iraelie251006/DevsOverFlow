import Link from "next/link";
import React from "react";

import ROUTES from "@/constants/routes";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import UserAvatar from "../UserAvatar";

const UserCard = ({ _id, name, image, username }: User) => {
  return (
    <div className="shadow-light100_darknone w-full xs:w-[230px]">
      <article className="background-light900_dark200 light-border flex w-full flex-col items-center justify-center rounded-2xl border p-8">
        <UserAvatar
          id={_id}
          name={name}
          imageUrl={image}
          className="size-[100px] rounded-full object-cover"
          fallbackClassName="text-3xl tracking-widest"
        />
        <Link href={ROUTES.PROFILE(_id)}>
          <div className="mt-4 text-center">
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="h3-bold line-clamp-1">{name}</TooltipTrigger>
                <TooltipContent>
                  <p className="body-regular">{name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <p className="text-dark500_light500 body-regular mt-2">
              @{username}
            </p>
          </div>
        </Link>
      </article>
    </div>
  );
};

export default UserCard;
