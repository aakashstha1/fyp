import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
const API_URL = "http://localhost:8000/api";
function InstructorReqDetail() {
  const navigate = useNavigate();
  const { reqId } = useParams();
  const [docs, setDocs] = useState(null);
  const [role, setRole] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/admin/instructor-request/${reqId}`,
          {
            withCredentials: true,
          }
        );
        setDocs(res?.data?.request?.documents);
        setRole(res?.data?.request?.user?.role);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [reqId]);

  const handleApprove = async () => {
    try {
      const res = await axios.put(
        `${API_URL}/admin/approve/${reqId}`,
        {},
        { withCredentials: true }
      );
      toast.success(res?.data?.message);
      navigate("/admin/instructor-request");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  };

  const handleReject = async () => {
    try {
      const res = await axios.put(
        `${API_URL}/admin/reject/${reqId}`,
        {},
        { withCredentials: true }
      );
      toast.success(res?.data?.message);
      navigate("/admin/instructor-request");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  };

  const handleDemote = async () => {
    try {
      const res = await axios.put(
        `${API_URL}/admin/demote/${reqId}`,
        {},
        { withCredentials: true }
      );
      toast.success(res?.data?.message);
      navigate("/admin/instructor-requests");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-800 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Instructor Request Details</h1>

      {/* Document Images */}
      <div className="flex gap-6 mb-8">
        {/* Front Image */}
        <div>
          <h2 className="mb-2 font-semibold">ID Front Image</h2>
          <a href={docs?.frontImage} target="_blank" rel="noopener noreferrer">
            <img
              src={docs?.frontImage}
              alt="ID Front"
              className="w-90 h-64 unded border cursor-pointer object-cover"
            />
          </a>
        </div>

        {/* Back Image */}
        <div>
          <h2 className="mb-2 font-semibold">ID Back Image</h2>
          <a href={docs?.backImage} target="_blank" rel="noopener noreferrer">
            <img
              src={docs?.backImage}
              alt="ID Back"
              className="w-90 h-64 rounded border cursor-pointer object-cover"
            />
          </a>
        </div>
      </div>

      {/* Resume PDF */}
      <div className="mb-8">
        <h2 className="mb-2 font-semibold">Resume (PDF)</h2>
        <a
          href={docs?.resumePdf}
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
          href={docs?.qualificationsPdf}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          View Qualifications PDF
        </a>
      </div>
      <div className="flex items-center justify-end gap-2">
        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2">
          {role === "instructor" && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="bg-yellow-600 hover:bg-yellow-700  cursor-pointer">
                  Demote
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Demote Instructor</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to demote this instructor back to an
                    enrolled user? They will lose all instructor privileges.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDemote}
                    className="bg-yellow-600 hover:bg-yellow-700  cursor-pointer"
                  >
                    Demote
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
          {role === "enrollee" && (
            <>
              {/* Approve */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="bg-green-600 hover:bg-green-700  cursor-pointer">
                    Approve
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Approve Instructor Request
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to approve this instructor
                      application? This user will be granted instructor
                      privileges.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleApprove}
                      className="bg-green-600 hover:bg-green-700  cursor-pointer"
                    >
                      Approve
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              {/* Reject */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="bg-red-600 hover:bg-red-700 cursor-pointer">
                    Reject
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Reject Instructor Request
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to reject this instructor
                      application? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleReject}
                      className="bg-red-600 hover:bg-red-700 cursor-pointer"
                    >
                      Reject
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default InstructorReqDetail;
