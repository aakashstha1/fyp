import React, { useRef, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
const API_URL = "http://localhost:8000/api";
function ApplyInstructor() {
  const navigate = useNavigate();
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [educationPdf, setEducationPdf] = useState(null);
  const [resumePdf, setResumePdf] = useState(null);
  const { refreshUser } = useAuth();
  const frontRef = useRef(null);
  const backRef = useRef(null);
  const eduRef = useRef(null);
  const resRef = useRef(null);

  const handleImageChange = (e, setFunc) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFunc(url);
    }
  };

  const handlePdfChange = (e, setFunc) => {
    const file = e.target.files?.[0];
    if (file) {
      setFunc(file);
    }
  };

  const UploadBox = ({ image, onClick }) => (
    <div
      className="w-full h-72 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
      onClick={onClick}
    >
      {image ? (
        <img
          src={image}
          alt="preview"
          className="h-full w-full object-fit rounded-md"
        />
      ) : (
        <div className="flex flex-col items-center text-gray-500">
          <Plus size={32} />
          <span className="text-sm">Select Image</span>
        </div>
      )}
    </div>
  );

  const PdfBox = ({ file, onClick, label }) => (
    <div
      onClick={onClick}
      className="flex items-center gap-3 p-4 bg-gray-50 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-100 transition"
    >
      <FileText className="text-gray-500" />
      <div className="text-sm">
        {file ? (
          <span className="font-medium">{file.name}</span>
        ) : (
          <span className="text-gray-500">{label}</span>
        )}
      </div>
    </div>
  );
  const handleSubmit = async () => {
    if (
      !frontRef.current?.files[0] ||
      !backRef.current?.files[0] ||
      !resumePdf ||
      !educationPdf
    ) {
      toast.error("All files are required!");
      return;
    }

    const formData = new FormData();
    formData.append("citizenshipFront", frontRef.current.files[0]);
    formData.append("citizenshipBack", backRef.current.files[0]);
    formData.append("resume", resumePdf);
    formData.append("educationPdf", educationPdf);

    try {
      const response = await axios.post(
        `${API_URL}/user/request-instructor`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success(
        response.data?.message || "Instructor role request submitted."
      );
      await refreshUser();
      navigate("/profile");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Submission failed.");
    }
  };

  return (
    <Card className="max-w-5xl mx-auto my-8">
      <CardHeader>
        <CardTitle>Apply as Instructor</CardTitle>
        <p className="text-sm text-muted-foreground">
          Upload your citizenship and certification documents below.
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Citizenship Front */}
        <div className="flex items-center gap-8">
          <div className="space-y-2 w-full">
            <Label>Citizenship Front</Label>
            <UploadBox
              image={frontImage}
              onClick={() => frontRef.current?.click()}
            />
            <input
              type="file"
              accept="image/*"
              ref={frontRef}
              onChange={(e) => handleImageChange(e, setFrontImage)}
              className="hidden"
            />
          </div>

          {/* Citizenship Back */}
          <div className="space-y-2 w-full">
            <Label>Citizenship Back</Label>
            <UploadBox
              image={backImage}
              onClick={() => backRef.current?.click()}
            />
            <input
              type="file"
              accept="image/*"
              ref={backRef}
              onChange={(e) => handleImageChange(e, setBackImage)}
              className="hidden"
            />
          </div>
        </div>

        <div className="flex items-center gap-8">
          {/* Resume  (PDF) */}
          <div className="space-y-2 w-full">
            <Label>Resume (PDF)</Label>
            <PdfBox
              file={resumePdf}
              onClick={() => resRef.current?.click()}
              label="Select Resume"
            />
            <input
              type="file"
              accept="application/pdf"
              ref={resRef}
              onChange={(e) => handlePdfChange(e, setResumePdf)}
              className="hidden"
            />
          </div>
          {/* Education Certificate (PDF) */}
          <div className="space-y-2 w-full">
            <Label>Educational Certificate (PDF)</Label>
            <PdfBox
              file={educationPdf}
              onClick={() => eduRef.current?.click()}
              label="Select Education Certificate"
            />
            <input
              type="file"
              accept="application/pdf"
              ref={eduRef}
              onChange={(e) => handlePdfChange(e, setEducationPdf)}
              className="hidden"
            />
          </div>
        </div>

        <div className=" flex items-center justify-end gap-2">
          <Button variant={"outline"} onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default ApplyInstructor;
