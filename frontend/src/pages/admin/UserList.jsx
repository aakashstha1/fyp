import React, { useState } from "react";
import DataTable from "@/components/DataTable";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

function UserList() {
  const users = [
    {
      name: "John Doe",
      email: "john@example.com",
      contact: "9800000000",
      role: "admin",
      imageUrl: "https://example.com/profile.jpg",
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      contact: "9800000001",
      role: "instructor",
    },
    {
      name: "Alex Kim",
      email: "alex@example.com",
      contact: "9800000002",
      role: "student",
    },
  ];

  const [roleFilter, setRoleFilter] = useState("all");

  const roles = ["all", ...new Set(users.map((user) => user.role))];

  const filteredUsers =
    roleFilter === "all"
      ? users
      : users.filter((user) => user.role === roleFilter);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>

      <div className="mb-4 flex items-center gap-5">
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

      <DataTable data={filteredUsers} showStatus={false} showRole={true} />
    </div>
  );
}

export default UserList;
