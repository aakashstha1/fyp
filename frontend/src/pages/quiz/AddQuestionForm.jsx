"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function AddQuestionForm({ userId }) {
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const addOptionField = () => {
    setOptions([...options, ""]);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!questionText || options.some((opt) => !opt) || !correctAnswer) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (!options.includes(correctAnswer)) {
      toast.error("Correct answer must match one of the options.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:8000/api/quize/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          questionText,
          options,
          correctAnswer,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Failed to add question.");
      } else {
        toast.success("Question added successfully!");
        setQuestionText("");
        setOptions(["", ""]);
        setCorrectAnswer("");
        setCategory("");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-xl mx-auto mt-10 p-4">
      <CardContent className="space-y-4">
        <h2 className="text-xl font-bold text-center text-indigo-600">
          Add Quiz Question
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Question Text</Label>
            <Input
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="Enter your question"
            />
          </div>

          <div className="space-y-2">
            <Label>Options</Label>
            {options.map((option, index) => (
              <Input
                key={index}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
                className="mb-2"
              />
            ))}
            <Button type="button" variant="secondary" onClick={addOptionField}>
              Add Option
            </Button>
          </div>

          <div>
            <Label>Correct Answer</Label>
            <Input
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              placeholder="Must match one of the options"
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Submitting..." : "Add Question"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
