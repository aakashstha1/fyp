import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function Quiz() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");

  const quizRules = [
    "Each quiz has 10 questions.",
    "You have 15 minutes to complete the quiz.",
    "No negative marking.",
    "Only one attempt allowed per day.",
  ];

  const quizCategories = [
    "Marketing",
    "Development",
    "Design",
    "Data Science",
    "Management",
  ];

  const handleStart = () => {
    if (!selectedCategory) {
      toast.error("Please select a category to start the quiz.");
      return;
    }
    navigate("/quiz-start");
  };

  return (
    <div className="flex max-w-3xl mx-auto mt-20 border rounded-lg shadow p-6 bg-white dark:bg-gray-800">
      {/* Left: Rules */}
      <div className="w-1/2 pr-6 border-r dark:border-gray-600">
        <h2
          id="rules-heading"
          className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100"
        >
          Quiz Rules
        </h2>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
          {quizRules.map((rule, index) => (
            <li key={index}>{rule}</li>
          ))}
        </ul>
      </div>

      {/* Right: Category + Start */}
      <div className="w-1/2 pl-6 flex flex-col justify-center">
        <h2
          id="category-heading"
          className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100"
        >
          Choose Quiz Category
        </h2>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full mb-6">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {quizCategories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          onClick={handleStart}
          disabled={!selectedCategory}
          className="hover:scale-[1.02] transition-transform"
        >
          Start Quiz
        </Button>
      </div>
    </div>
  );
}

export default Quiz;
