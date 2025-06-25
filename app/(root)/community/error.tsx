"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2 className="flex justify-center items-center h2-bold">
        Something went wrong!
      </h2>
      <div className="flex justify-center mt-10">
        <button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
          className="btn p-4 rounded-2 flex justify-center items-center text-dark500_light500"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
