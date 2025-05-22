import { Button } from "@/components/ui/button";
import React from "react";
// import { useParams } from "react-router-dom";

function InstructorReqDetail() {
  // const { id } = useParams();

  // Mock data: Replace this with real fetch from API based on `id`
  const requestDetail = {
    id: 123,
    name: "Aayush Sharma",
    documents: {
      frontImage:
        "https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg",
      backImage:
        "https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg",
      resumePdf:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      qualificationsPdf:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Instructor Request Details</h1>

      {/* Document Images */}
      <div className="flex gap-6 mb-8">
        <div>
          <h2 className="mb-2 font-semibold">ID Front Image</h2>
          <img
            src={requestDetail.documents.frontImage}
            alt="ID Front"
            className="w-72 h-auto rounded border"
          />
        </div>
        <div>
          <h2 className="mb-2 font-semibold">ID Back Image</h2>
          <img
            src={requestDetail.documents.backImage}
            alt="ID Back"
            className="w-72 h-auto rounded border"
          />
        </div>
      </div>

      {/* Resume PDF */}
      <div className="mb-8">
        <h2 className="mb-2 font-semibold">Resume (PDF)</h2>
        <a
          href={requestDetail.documents.resumePdf}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          View Resume PDF
        </a>
      </div>

      {/* Qualifications */}
      <div className="mb-8">
        <h2 className="mb-2 font-semibold">Qualifications (PDF)</h2>
        <a
          href={requestDetail.documents.qualificationsPdf}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          View Qualifications PDF
        </a>
      </div>
      <div className="flex items-center justify-end gap-2">
        <Button className="bg-green-600 hover:bg-green-700">Approve</Button>
        <Button className="bg-red-600 hover:bg-red-700">Reject</Button>
      </div>
    </div>
  );
}

export default InstructorReqDetail;
