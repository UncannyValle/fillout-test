"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { IconTypes } from "@/app/components/PageButton";

export type Page = {
  name: string;
  message: string;
  slug: string;
  icon?: IconTypes;
};

type PageContextType = {
  pages: Page[];
  currentSlug: string | null;
  setCurrentSlug: (slug: string) => void;
  addPage: (name: string, message: string, afterIndex?: number) => void;
  updatePageMessage: (slug: string, message: string) => void;
  deletePage: (slug: string) => void;
  isInitialized: boolean;
  // Popup state management
  activePopupSlug: string | null;
  setActivePopupSlug: (slug: string | null) => void;
  togglePopup: (slug: string) => void;
  closePopup: () => void;
};

const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove non-word chars
    .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ""); // Trim hyphens from start and end
};

const getUniqueSlug = (slug: string, existingSlugs: string[]): string => {
  if (!existingSlugs.includes(slug)) return slug;

  let counter = 1;
  let newSlug = `${slug}-${counter}`;

  while (existingSlugs.includes(newSlug)) {
    counter++;
    newSlug = `${slug}-${counter}`;
  }

  return newSlug;
};

const PageContext = createContext<PageContextType | undefined>(undefined);

export function PageProvider({ children }: { children: ReactNode }) {
  const [pages, setPages] = useState<Page[]>([]);
  const [currentSlug, setCurrentSlug] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [activePopupSlug, setActivePopupSlug] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Initialize pages only once
  useEffect(() => {
    if (!isInitialized) {
      const initialPages: Page[] = [
        {
          name: "Home",
          message: "Welcome to the home page!",
          slug: "home",
          icon: "info",
        },
        {
          name: "About",
          message: "This is the about page.",
          slug: "about",
        },
        {
          name: "Contact",
          message: "Contact us here.",
          slug: "contact",
        },
      ];

      setPages(initialPages);

      const currentPath = pathname.slice(1);
      const matchingPage = initialPages.find(
        (page) => page.slug === currentPath,
      );

      if (matchingPage) {
        setCurrentSlug(matchingPage.slug);
      } else if (initialPages.length > 0) {
        setCurrentSlug(initialPages[0].slug);
        router.push(`/${initialPages[0].slug}`);
      }

      setIsInitialized(true);
    }
  }, [isInitialized, pathname, router]);

  const addPage = (name: string, message: string, afterIndex?: number) => {
    const baseSlug = generateSlug(name);
    const existingSlugs = pages.map((page) => page.slug);
    const uniqueSlug = getUniqueSlug(baseSlug, existingSlugs);

    const newPage: Page = {
      name,
      message,
      slug: uniqueSlug,
    };

    setPages((prevPages) => {
      // If afterIndex is provided, insert the new page after that index
      if (
        afterIndex !== undefined &&
        afterIndex >= 0 &&
        afterIndex < prevPages.length
      ) {
        const newPages = [...prevPages];
        newPages.splice(afterIndex + 1, 0, newPage);
        return newPages;
      } else {
        // Otherwise, add to the end
        return [...prevPages, newPage];
      }
    });

    setCurrentSlug(uniqueSlug);
  };

  const updatePageMessage = (slug: string, message: string) => {
    setPages((prevPages) =>
      prevPages.map((page) =>
        page.slug === slug ? { ...page, message } : page,
      ),
    );
  };

  const deletePage = (slug: string) => {
    setPages((prevPages) => {
      const updatedPages = prevPages.filter((page) => page.slug !== slug);

      if (currentSlug === slug && updatedPages.length > 0) {
        setCurrentSlug(updatedPages[0].slug);
      }

      return updatedPages;
    });

    // Close popup if the deleted page had an open popup
    if (activePopupSlug === slug) {
      setActivePopupSlug(null);
    }
  };

  const togglePopup = (slug: string) => {
    setActivePopupSlug(activePopupSlug === slug ? null : slug);
  };

  const closePopup = () => {
    setActivePopupSlug(null);
  };

  return (
    <PageContext.Provider
      value={{
        pages,
        currentSlug,
        setCurrentSlug,
        addPage,
        updatePageMessage,
        deletePage,
        isInitialized,
        activePopupSlug,
        setActivePopupSlug,
        togglePopup,
        closePopup,
      }}
    >
      {children}
    </PageContext.Provider>
  );
}

export function usePages() {
  const context = useContext(PageContext);
  if (context === undefined) {
    throw new Error("usePages must be used within a PageProvider");
  }
  return context;
}
