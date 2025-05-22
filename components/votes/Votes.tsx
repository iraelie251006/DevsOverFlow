"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import React, { use, useState } from "react";

import { toast } from "@/hooks/use-toast";
import { createVote } from "@/lib/actions/vote.action";
import { formatNumber } from "@/lib/utils";

interface Params {
  upvotes: number;
  targetId: string;
  downvotes: number;
  targetType: "question" | "answer";
  hasVotedPromise: Promise<ActionResponse<HasVotedResponse>>;
}
const Votes = ({
  upvotes,
  targetId,
  downvotes,
  targetType,
  hasVotedPromise,
}: Params) => {
  const session = useSession();
  const userId = session.data?.user?.id;
  const [isLoading, setIsLoading] = useState(false);

  const { success, data } = use(hasVotedPromise);

  const { hasUpVoted, hasDownVoted } = data || {};

  const handleVote = async (voteType: "upvote" | "downvote") => {
    if (!userId) {
      return toast({
        title: "Please login to vote",
        description: "Only logged-in users can vote",
      });
    }
    try {
      const result = await createVote({ targetId, targetType, voteType });
      if (!result.success) {
        return toast({
          title: "Failed to vote",
          description: result.error?.message,
          variant: "destructive",
        });
      }
      const successMessage =
        voteType === "upvote"
          ? `Upvote ${!hasUpVoted ? "added" : "removed"} successfully`
          : `Downvote ${!hasDownVoted ? "added" : "removed"} successfully`;

      toast({
        title: successMessage,
        description: "Your vote has been recorded",
      });
    } catch (error) {
      toast({
        title: "Failed to vote",
        description: `An error: ${error} occured during the vote. Please try again later`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex-center gap-2.5">
      <div className="flex-center gap-1.5">
        <Image
          src={
            success && hasUpVoted ? "/icons/upvoted.svg" : "/icons/upvote.svg"
          }
          alt="upvote"
          width={18}
          height={18}
          className={`cursor-pointer ${isLoading && "opacity-50"}`}
          aria-label="Upvote"
          onClick={() => !isLoading && handleVote("upvote")}
        />
        <div className="flex-center background-light700_dark400 min-w-5 rounded-sm p-1">
          <p className="subtle-medium text-dark400_light900">
            {formatNumber(upvotes)}
          </p>
        </div>
      </div>
      <div className="flex-center gap-1.5">
        <Image
          src={
            success && hasDownVoted
              ? "/icons/downvoted.svg"
              : "/icons/downvote.svg"
          }
          alt="downvote"
          width={18}
          height={18}
          className={`cursor-pointer ${isLoading && "opacity-50"}`}
          aria-label="Downvote"
          onClick={() => !isLoading && handleVote("downvote")}
        />
        <div className="flex-center background-light700_dark400 min-w-5 rounded-sm p-1">
          <p className="subtle-medium text-dark400_light900">
            {formatNumber(downvotes)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Votes;
