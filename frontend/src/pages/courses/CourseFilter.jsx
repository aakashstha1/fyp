import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function CourseFilter({
  searchText,
  setSearchText,
  sortBy,
  setSortBy,
  order,
  setOrder,
  category,
  setCategory,
}) {
  return (
    <div className="flex flex-col w-full max-w-[250px] gap-6 pr-5 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 p-4 rounded-md">
      {/* Search */}
      <div className="flex flex-col gap-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Input
            type="search"
            placeholder="Search a course..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 border-gray-300 dark:border-gray-700"
          />
        </form>
        <Button
          className="w-full"
          onClick={(e) => e.preventDefault()}
          variant="default"
        >
          Search
        </Button>
      </div>

      {/* Sort Filter */}
      <div className="flex flex-col gap-6">
        <div>
          <Label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200">
            Sort By
          </Label>
          <Select
            value={sortBy}
            onValueChange={(value) => setSortBy(value)}
            className="dark:bg-gray-800 dark:text-gray-100"
          >
            <SelectTrigger className="w-full dark:bg-gray-800 dark:text-gray-100">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-800 dark:text-gray-100">
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Order */}
        <div>
          <Label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200">
            Order
          </Label>
          <Select
            value={order}
            onValueChange={(value) => setOrder(value)}
            className="dark:bg-gray-800 dark:text-gray-100"
          >
            <SelectTrigger className="w-full dark:bg-gray-800 dark:text-gray-100">
              <SelectValue placeholder="Order" />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-800 dark:text-gray-100">
              <SelectItem value="asc">Low to High</SelectItem>
              <SelectItem value="desc">High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <Label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
          Filter by Category
        </Label>
        <RadioGroup
          value={category}
          onValueChange={(value) => setCategory(value)}
          className="flex flex-col gap-4"
        >
          {[
            { id: "all", label: "All" },
            { id: "technology", label: "Technology" },
            { id: "information-technology", label: "Information Technology" },
            { id: "business", label: "Business" },
            { id: "design", label: "Design" },
            { id: "marketing", label: "Marketing" },
            { id: "loksewa", label: "Loksewa" },
            { id: "bridge-course", label: "Bridge Course" },

            { id: "other", label: "Others" },
          ].map((cat) => (
            <div key={cat.id} className="flex items-center space-x-2">
              <RadioGroupItem
                value={cat.id}
                id={cat.id}
                className="dark:border-gray-400 dark:bg-gray-700 dark:checked:bg-blue-600"
              />
              <Label
                htmlFor={cat.id}
                className="text-gray-700 dark:text-gray-200"
              >
                {cat.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}

export default CourseFilter;
