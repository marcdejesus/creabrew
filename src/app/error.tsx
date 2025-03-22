"use client";

import { useEffect } from "react";
import Link from "next/link";

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
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">Something went wrong!</h1>
      <p className="text-xl mb-8 text-muted-foreground">
        An unexpected error has occurred.
      </p>
      <div className="flex space-x-4">
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
        >
          Try again
        </button>
        <Link
          href="/"
          className="px-6 py-3 bg-muted text-foreground rounded-md hover:bg-muted/90 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
} 