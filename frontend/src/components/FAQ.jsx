import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function FAQ() {
  const faqs = [
    {
      question: "What is this platform about?",
      answer:
        "This platform provides online courses on various topics including programming, design, and business.",
    },
    {
      question: "How do I enroll in a course?",
      answer:
        "You can enroll in a course by visiting the course page and clicking the 'Enroll' button.",
    },
    {
      question: "Can I get a refund?",
      answer:
        "Refunds are available within 7 days of purchase if you haven't started the course.",
    },
    {
      question: "Do I get a certificate?",
      answer:
        "Yes, after completing a course, you will receive a certificate of completion.",
    },
    {
      question: "Are the courses self-paced?",
      answer:
        "Yes, all courses are self-paced, allowing you to learn at your own speed.",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Frequently Asked Questions
      </h1>

      {/* Centered Accordion */}
      <div className="flex justify-center">
        <div className="w-full md:w-1/2">
          <Accordion type="single" collapsible>
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-xl">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-lg">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export default FAQ;
