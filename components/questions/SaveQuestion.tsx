"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState } from "react";

import { toast } from "@/hooks/use-toast";
import { toggleSaveQuestion } from "@/lib/actions/collection.action";

const SaveQuestion = ({ questionId }: { questionId: string }) => {
  const session = useSession();
  const userId = session?.data?.user?.id;

  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (isLoading) return;
    if (!userId) {
      return toast({
        title: "Please login to save this question",
        variant: "destructive",
      });
    }
    setIsLoading(true);

    try {
      const { success, data, error } = await toggleSaveQuestion({ questionId });

      if (!success)
        throw new Error(error?.message || "Failed to save question");
      toast({
        title: `Question ${data?.saved ? "saved" : "unsaved"} successfully`,
        description: `${data?.saved ? "You can find it in your saved questions" : "You can save it again later"}`,
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description:
          error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  const hasSaved = false;
  return (
    <Image
      src={hasSaved? "/icons/star-filled.svg" : "/icons/star-red.svg"}
      width={18}
      height={18}
      alt="save"
      className={`cursor-pointer ${isLoading && "opacity-50"} ml-2`}
      onClick={handleSave}
    />
  );
};

export default SaveQuestion;
