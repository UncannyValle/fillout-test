"use client";

import { Clipboard, Copy, Flag, PencilLine, Trash } from "lucide-react";
import { blue } from "next/dist/lib/picocolors";

type PopupProps = {
  onMenuClickAction: (action: string) => void;
};

export const Popup = ({ onMenuClickAction }: PopupProps) => {
  return (
    <div className="absolute bottom-full right-0 mb-1 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50 min-w-50">
      <div className="px-3 py-2 border-b border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800">Settings</h3>
      </div>
      <div className="py-1">
        <button
          onClick={() => onMenuClickAction("setAsFirst")}
          className="w-full flex gap-4 items-center text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <Flag color={"blue"} /> Set as first page
        </button>
        <button
          onClick={() => onMenuClickAction("rename")}
          className="w-full flex gap-4 items-center text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <PencilLine color={'#9DA4B2'} /> Rename
        </button>
        <button
          onClick={() => onMenuClickAction("copy")}
          className="w-full flex gap-4 items-center text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
        >
        <Clipboard color={'#9DA4B2'}/>  Copy
        </button>
        <button
          onClick={() => onMenuClickAction("duplicate")}
          className="w-full flex gap-4 items-center text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
        >
         <Copy color={"#9DA4B2"}/>  Duplicate
        </button>
        <button
          onClick={() => onMenuClickAction("delete")}
          className="w-full flex gap-4 items-center text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
        >
        <Trash color={'red'} />  Delete
        </button>
      </div>
    </div>
  );
};
