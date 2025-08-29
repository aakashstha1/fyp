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
    <div className="flex flex-col w-full max-w-[250px] gap-6 pr-5 bg-white border-r">
      {/* Search */}
      <div className="flex flex-col gap-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Input
            type="search"
            placeholder="search a course..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </form>
        <Button className="w-full" onClick={(e) => e.preventDefault()}>
          Search
        </Button>
      </div>

      {/* Sort Filter */}
      <div className="flex flex-col gap-6">
        <div>
          <Label className="mb-2 block text-sm font-semibold text-gray-700">
            Sort By
          </Label>
          <Select value={sortBy} onValueChange={(value) => setSortBy(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Order */}
        <div>
          <Label className="mb-2 block text-sm font-semibold text-gray-700">
            Order
          </Label>
          <Select value={order} onValueChange={(value) => setOrder(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Low to High</SelectItem>
              <SelectItem value="desc">High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <Label className="block mb-2 text-sm font-semibold text-gray-700">
          Filter by Category
        </Label>
        <RadioGroup
          value={category}
          onValueChange={(value) => setCategory(value)}
          className="flex flex-col gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="all" />
            <Label htmlFor="all">All</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="technology" id="technology" />
            <Label htmlFor="technology">Technology</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="information-technology"
              id="information-technology"
            />
            <Label htmlFor="information-technology">
              Information Technology
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="business" id="business" />
            <Label htmlFor="business">Business</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="design" id="design" />
            <Label htmlFor="design">Design</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="language-communication"
              id="language-communication"
            />
            <Label htmlFor="language-communication">
              Language & Communication
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="marketing" id="marketing" />
            <Label htmlFor="marketing">Marketing</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="other" id="other" />
            <Label htmlFor="other">Others</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}

export default CourseFilter;
