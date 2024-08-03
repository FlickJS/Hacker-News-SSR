"use client";

import { useRouter } from "next/navigation";

const BackToHomeLink = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <button
      onClick={handleBack}
      aria-label="Go back to the previous page"
      className="flex items-center text-gray-800 font-semibold text-lg hover:underline p-4"
    >
      Go back to previous page
    </button>
  );
};

export default BackToHomeLink;
