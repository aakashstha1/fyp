import React, { useEffect, useState } from "react";
import axios from "axios";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import UserDatatable from "./userDataTable";
import { Loader2 } from "lucide-react";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [roleFilter, setRoleFilter] = useState("all");
  const [totalUsers, setTotalUsers] = useState(0);

  const API_URL = "http://localhost:8000/api";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/admin/user-list`, {
          withCredentials: true,
        });
        const formatted = res?.data?.users?.map((u) => ({ user: u })) || [];

        setUsers(formatted);
        setTotalUsers(res?.data?.total || formatted.length);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Extract unique roles
  const roles = ["all", ...new Set(users.map((u) => u.user.role))];

  // Apply filter
  const filteredUsers =
    roleFilter === "all"
      ? users
      : users.filter((u) => u.user.role === roleFilter);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        <Loader2 className="animate-spin h-6 w-6 mr-2" /> Loading users...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>

      {/* Role Filter (similar to sort in courses) */}
      <div className="mb-4 flex items-center gap-10">
        <div>
          <h2 className="font-semibold text-lg">Filter by Role:</h2>
          <RadioGroup
            defaultValue="all"
            onValueChange={setRoleFilter}
            className="flex gap-4"
          >
            {roles.map((role) => (
              <div key={role} className="flex items-center space-x-2">
                <RadioGroupItem value={role} id={role} />
                <label htmlFor={role}>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>

      {/* Total count */}
      <h1 className="pb-4 font-semibold">Total users: {totalUsers}</h1>

      {/* User Table */}
      <UserDatatable data={filteredUsers}  />
    </div>
  );
}

export default UserList;
