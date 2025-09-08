import { RadioGroup } from "@headlessui/react";

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "technology", label: "Technology" },
  { id: "information-technology", label: "Information Technology" },
  { id: "business", label: "Business" },
  { id: "design", label: "Design" },
  { id: "marketing", label: "Marketing" },
  { id: "loksewa", label: "Loksewa" },
  { id: "bridge-course", label: "Bridge Course" },
  { id: "other", label: "Others" },
];

export default function CategoryFilter({ category, onChange }) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-4">
      <div className="mb-3 text-sm font-semibold text-gray-800 dark:text-gray-100">
        Filter by Category
      </div>
      <RadioGroup value={category} onChange={onChange} className="space-y-2">
        {CATEGORIES.map((c) => (
          <RadioGroup.Option
            key={c.id}
            value={c.id}
            className="flex items-center space-x-2 cursor-pointer"
          >
            {({ checked }) => (
              <>
                <input
                  type="radio"
                  checked={checked}
                  readOnly
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700 dark:text-gray-300">
                  {c.label}
                </span>
              </>
            )}
          </RadioGroup.Option>
        ))}
      </RadioGroup>
    </div>
  );
}
