import React, { useRef, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ApplyInstructor() {
  const navigate = useNavigate();
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [educationPdf, setEducationPdf] = useState(null);
  const [experiencePdf, setExperiencePdf] = useState(null);

  const frontRef = useRef(null);
  const backRef = useRef(null);
  const eduRef = useRef(null);
  const expRef = useRef(null);

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

          {/* Experience Certificate (PDF) */}
          <div className="space-y-2 w-full">
            <Label>Experience Certificate (PDF)</Label>
            <PdfBox
              file={experiencePdf}
              onClick={() => expRef.current?.click()}
              label="Select Experience Certificate"
            />
            <input
              type="file"
              accept="application/pdf"
              ref={expRef}
              onChange={(e) => handlePdfChange(e, setExperiencePdf)}
              className="hidden"
            />
          </div>
        </div>

        <div className=" flex items-center justify-end gap-2">
          <Button variant={"outline"} onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button type="submit">Submit</Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default ApplyInstructor;
