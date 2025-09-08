import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React, { useEffect, useState } from "react";
import DataTable from "@/pages/admin/userData/UserDataTable";
import axios from "axios";
const API_URL = "http://localhost:8000/api";
function InstructorReq() {
  const [allRequests, setAllRequests] = useState([]); // Store requests data
  const [statusFilter, setStatusFilter] = useState("all");

  // Fetch all requests on mount
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(`${API_URL}/admin/instructor-requests`, {
          withCredentials: true,
        });
        // console.log(res);
        setAllRequests(res?.data?.requests);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRequests();
  }, []);

  const filteredRequests =
    statusFilter === "all"
      ? allRequests
      : allRequests.filter((r) => r.status === statusFilter);

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
        <DataTable data={filteredRequests} showStatus={true} showRole={false} />
      </div>
    </div>
  );
}

export default InstructorReq;
