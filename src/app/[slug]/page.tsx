"use client";

import { notFound, useRouter, useParams } from "next/navigation";
import { usePages } from "@/app/context/PageContext";
import { useEffect, useState } from "react";
import { MoveRight } from "lucide-react";

export default function Page() {
  const router = useRouter();
  const { slug } = useParams();
  const {
    pages,
    currentSlug,
    setCurrentSlug,
    updatePageMessage,
    isInitialized,
  } = usePages();
  const [message, setMessage] = useState("");

  const page = pages.find((p) => p.slug === slug);
  const currentIndex = pages.findIndex((p) => p.slug === slug);
  const nextPage =
    currentIndex >= 0 && currentIndex < pages.length - 1
      ? pages[currentIndex + 1]
      : null;

  useEffect(() => {
    if (slug && slug !== currentSlug && page) {
      setCurrentSlug(slug as string);
    }
  }, [slug, currentSlug, setCurrentSlug, page]);

  useEffect(() => {
    if (page) {
      setMessage(page.message);
    }
  }, [page]);

  useEffect(() => {
    if (page && message !== page.message) {
      const timeoutId = setTimeout(() => {
        updatePageMessage(page.slug, message);
      }, 500); // 500ms debounce

      return () => clearTimeout(timeoutId);
    }
  }, [message, page, updatePageMessage]);

  const handleNextPage = async () => {
    if (nextPage) {
      try {
        await router.push(`/${nextPage.slug}`);
      } catch (error) {
        console.error("Navigation failed:", error);
      }
    }
  };

  if (!isInitialized) {
    return (
      <div className="p-8 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!page) {
    notFound();
  }

  return (
    <div className="p-8 text-white flex flex-col w-full items-baseline max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{page.name}</h1>
      <div className="w-full ">
        <label htmlFor="pageMessage" className="block text-2xl mb-2">
          Page Message:
        </label>
        <textarea
          id="pageMessage"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-4 border rounded-md text-white resize-vertical min-h-[120px] bg-[#313E55]"
          placeholder="Enter your message here..."
        />
      </div>
      {nextPage && (
        <button
          onClick={handleNextPage}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-lg transition-colors flex items-center gap-2 mt-8 cursor-pointer"
        >
          Next: {nextPage.name}
          <MoveRight size={20} />
        </button>
      )}
    </div>
  );
}
