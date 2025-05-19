import { CreateDocCard, DocCard } from "./DocCard";

export default function MyDoc() {
  const docs = [
    {
      id: "1",
      title: "Project Plan 2025",
      updatedAt: "2025-05-18",
      preview:
        "This document outlines the project plan for the upcoming year...",
    },
    {
      id: "2",
      title: "Meeting Notes - April",
      updatedAt: "2025-04-30",
      preview:
        "Summary of the main points discussed during the April meeting...",
    },
    {
      id: "3",
      title: "Marketing Strategy",
      updatedAt: "2025-05-10",
      preview: "Key tactics and goals for the marketing team...",
    },
    {
      id: "4",
      title: "User Research Findings",
      updatedAt: "2025-05-01",
      preview: "Insights gathered from recent user interviews and surveys...",
    },
    {
      id: "5",
      title: "Budget Report Q1",
      updatedAt: "2025-03-31",
      preview: "Overview of financial performance in the first quarter...",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-6 gap-8 p-4">
      <CreateDocCard />
      {docs.map((doc, index) => (
        <DocCard key={index} {...doc} />
      ))}
    </div>
  );
}
