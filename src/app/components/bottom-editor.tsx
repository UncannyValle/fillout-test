"use client";

import { useState } from "react";
import { usePages } from "@/app/context/PageContext";
import { PageButton } from "@/app/components/PageButton";
import { AddPageButton } from "@/app/components/AddPageButton";

export const BottomEditor = () => {
  const { pages } = usePages();
  const [isAddingPage] = useState(false);
  const [newPageName, setNewPageName] = useState("");
  const [newPageMessage, setNewPageMessage] = useState("");

  return (
    <div className="bg-white border-t border-gray-200 p-4 overflow-visible">
      {isAddingPage ? (
        <div className="mb-4 p-4 border rounded-md bg-gray-50">
          <div className="mb-3">
            <label
              htmlFor="pageName"
              className="block text-sm font-medium mb-1"
            >
              Page Name
            </label>
            <input
              id="pageName"
              type="text"
              value={newPageName}
              onChange={(e) => setNewPageName(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Enter page name"
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="pageMessage"
              className="block text-sm font-medium mb-1"
            >
              Page Message
            </label>
            <textarea
              id="pageMessage"
              value={newPageMessage}
              onChange={(e) => setNewPageMessage(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Enter page message"
              rows={3}
            />
          </div>
        </div>
      ) : null}
      <div className="flex gap-2 overflow-visible">
        {pages.map((page, index) => (
          <PageButton key={page.slug} page={page} index={index} />
        ))}
        <AddPageButton />
      </div>
    </div>
  );
};
