import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { ArrowLeftCircle, Save } from "lucide-react";
import TextEditor from "./TextEditor";

const API_URL = "http://localhost:8000/api";

function DocEditor() {
  const { docId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchDoc = async () => {
      try {
        const res = await axios.get(`${API_URL}/doc/${docId}`, {
          withCredentials: true,
        });
        setTitle(res.data.doc.title);
        setContent(res.data.doc.content);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch document");
      }
    };

    if (docId) fetchDoc();
  }, [docId]);

  const handleSave = async () => {
    try {
      await axios.put(
        `${API_URL}/doc/${docId}`,
        { title, content },
        { withCredentials: true }
      );
      alert("Document saved.");
    } catch (err) {
      console.error(err);
      alert("Failed to save document.");
    }
  };

  const handleBack = () => navigate(-1);

  return (
    <div className="max-w-3xl mx-auto my-5 min-h-screen p-6 bg-white dark:bg-gray-800 rounded shadow">
      <div className="flex items-center justify-between gap-4 pb-4">
        <ArrowLeftCircle
          size={30}
          onClick={handleBack}
          className="cursor-pointer"
        />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter document title..."
          className="w-full font-semibold p-1 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-gray-30"
        />
        <Button onClick={handleSave} title="Save document">
          <Save size={30} />
        </Button>
      </div>

      <TextEditor content={content} setContent={setContent} />
    </div>
  );
}

export default DocEditor;
