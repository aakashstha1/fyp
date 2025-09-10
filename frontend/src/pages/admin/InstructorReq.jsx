import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import ReqDataTable from "./ReqDataTable";
const API_URL = "http://localhost:8000/api";
function InstructorReq() {
  const [allRequests, setAllRequests] = useState([]); // Store requests data
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  // Fetch all requests on mount
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/admin/instructor-requests`, {
          withCredentials: true,
        });
        // console.log(res);
        setAllRequests(res?.data?.requests);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const filteredRequests =
    statusFilter === "all"
      ? allRequests
      : allRequests.filter((r) => r.status === statusFilter);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        <Loader2 className="animate-spin h-6 w-6 mr-2" /> Loading requests...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto ">
      <h1 className="text-2xl font-bold mb-4">All Instructor Request</h1>

      <div className="mb-4 flex items-center gap-5">
        <h2 className="font-semibold text-lg ">Filter by Status:</h2>
        <RadioGroup
          defaultValue="all"
          onValueChange={setStatusFilter}
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="all" />
            <label htmlFor="all">All</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="approved" id="approved" />
            <label htmlFor="approved">Approved</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="pending" id="pending" />
            <label htmlFor="pending">Pending</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="rejected" id="rejected" />
            <label htmlFor="rejected">Rejected</label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <ReqDataTable data={filteredRequests} />
      </div>
    </div>
  );
}

export default InstructorReq;
