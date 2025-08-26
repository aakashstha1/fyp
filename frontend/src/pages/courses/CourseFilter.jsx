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

function CourseFilter() {
  return (
    <div className="flex flex-col w-full max-w-[250px] gap-6 pr-5 bg-white border-r">
      <div className="flex flex-col items-center gap-2">
        <Input type="search" placeholder="search a course..." />
        <Button className="w-full">Search</Button>
      </div>
      {/* Sort Filter: By What (Price/Rating) */}
      <div className="flex flex-col gap-6">
        <div>
          <Label className="mb-2 block text-sm font-semibold text-gray-700">
            Sort By
          </Label>
          <Select defaultValue="price">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Order: High → Low or Low → High */}
        <div>
          <Label className="mb-2 block text-sm font-semibold text-gray-700">
            Order
          </Label>
          <Select defaultValue="high-to-low">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high-to-low">High to Low</SelectItem>
              <SelectItem value="low-to-high">Low to High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Category Filter (Radio Buttons) */}
      <div>
        <Label className="block mb-2 text-sm font-semibold text-gray-700">
          Filter by Category
        </Label>
        <RadioGroup defaultValue="all" className="flex flex-col gap-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="all" />
            <Label htmlFor="all">All</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="frontend" id="frontend" />
            <Label htmlFor="frontend">Frontend</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="backend" id="backend" />
            <Label htmlFor="backend">Backend</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="fullstack" id="fullstack" />
            <Label htmlFor="fullstack">Full Stack</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="devops" id="devops" />
            <Label htmlFor="devops">DevOps</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}

export default CourseFilter;
