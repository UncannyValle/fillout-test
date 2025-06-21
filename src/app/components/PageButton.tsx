import Link from "next/link";
import { Page, usePages } from "@/app/context/PageContext";
import { AddPageButton } from "@/app/components/AddPageButton";
import { IconDisplay } from "@/app/components/IconDisplay";
import { Popup } from "@/app/components/Popup";
import { EllipsisVertical } from "lucide-react";
import React, { useRef } from "react";

export type IconTypes = "info" | "file-text" | "circle-check";

export const PageButton = ({ page, index }: { page: Page; index: number }) => {
  const {
    currentSlug,
    pages,
    deletePage,
    activePopupSlug,
    togglePopup,
    closePopup,
  } = usePages();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const isCurrentSlug = currentSlug === page.slug;
  const showPopup = activePopupSlug === page.slug;

  const handleEllipsisClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent Link navigation
    e.stopPropagation(); // Stop event bubbling
    togglePopup(page.slug);
  };

  const handleDelete = () => {
    deletePage(page.slug);
    closePopup();
  };

  const handleMenuClickAction = (action: string) => {
    switch (action) {
      case "delete":
        handleDelete();
        break;
      case "setAsFirst":
      case "rename":
      case "copy":
      case "duplicate":
        console.log(`${action} clicked - not implemented`);
        closePopup();
        break;
      default:
        closePopup();
    }
  };

  return (
    <>
      <div className="relative">
        <Link
          key={page.slug}
          href={`/${page.slug}`}
          className={`px-4 py-2 rounded-md whitespace-nowrap flex gap-2 items-center group ${
            isCurrentSlug
              ? "border-blue-600 transition-colors rounded-xl border-2 hover:border-gray-100"
              : "bg-none text-gray-600 hover:bg-gray-300 transition-colors"
          }`}
        >
          <IconDisplay selected={isCurrentSlug} iconType={page.icon} />
          <span>{page.name}</span>
          <button
            ref={buttonRef}
            onClick={handleEllipsisClick}
            className="opacity-0 group-hover:opacity-100 hover:text-red-500 transition-opacity duration-200 cursor-pointer"
          >
            <EllipsisVertical />
          </button>
        </Link>

        {showPopup && <Popup onMenuClickAction={handleMenuClickAction} />}
      </div>

      {index !== pages.length - 1 && (
        <AddPageButton simple afterIndex={index} />
      )}
    </>
  );
};
