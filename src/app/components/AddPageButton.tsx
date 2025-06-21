"use client";

import { useState } from "react";
import { usePages } from "@/app/context/PageContext";
import { Plus, X } from "lucide-react";

export const AddPageButton = ({
  simple = false,
  afterIndex,
}: {
  simple?: boolean;
  afterIndex?: number;
}) => {
  const { addPage } = usePages();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPageName, setNewPageName] = useState("");
  const [showError, setShowError] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewPageName("");
    setShowError(false);
  };

  const handleAddPage = () => {
    if (newPageName.trim()) {
      addPage(
        newPageName.trim(),
        "Default message",
        simple ? afterIndex : undefined,
      );
      setNewPageName("");
      setIsModalOpen(false);
      setShowError(false);
    } else {
      setShowError(true);
    }
  };

  return (
    <>
      {simple ? (
        <button
          onClick={handleOpenModal}
          className="px-4 py-2 rounded-md whitespace-nowrap text-gray-500 transition-colors cursor-pointer group relative"
        >
          <span className="group-hover:opacity-0 transition-opacity duration-300 ease-in-out">
            ---
          </span>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out absolute inset-0 flex items-center justify-center">
            ---+---
          </span>
        </button>
      ) : (
        <button
          className="cursor-pointer flex items-center transition-all hover:text-gray-600 hover:bg-gray-300 px-[10px] py-1 rounded-xl"
          onClick={handleOpenModal}
        >
          <Plus /> <span>Add page</span>
        </button>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Page</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700 transition-all cursor-pointer"
              >
                <X />
              </button>
            </div>

            <div className="mb-4">
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
              {showError && (
                <p className="text-red-500 text-sm mt-1">
                  Page name is required
                </p>
              )}
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors cursor-pointer "
              >
                Cancel
              </button>
              <button
                onClick={handleAddPage}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors cursor-pointer "
              >
                Create Page
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
