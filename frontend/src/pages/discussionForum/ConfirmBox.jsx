import React from "react";

export default function ConfirmBox({ open, message, onConfirm, onCancel }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 w-80 text-center">
        <p className="text-gray-900 dark:text-gray-100 mb-4">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg"
          >
            Yes
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
