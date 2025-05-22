// components/UserTable.jsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const statusColors = {
  approved: "bg-green-500",
  rejected: "bg-red-500",
  pending: "bg-gray-500",
};

const DataTable = ({ data, showStatus = true, showRole = true }) => {
  return (
    <div className="border rounded shadow max-h-[600px] overflow-y-auto">
      <Table>
        <TableHeader className="sticky top-0 bg-white dark:bg-gray-900 z-10">
          <TableRow>
            <TableHead>S.N</TableHead>
            <TableHead>Profile</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            {showRole && <TableHead>Role</TableHead>}
            {showStatus && <TableHead>Status</TableHead>}
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((user, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <Avatar>
                  <AvatarImage src={user.imageUrl || ""} alt={user.name} />
                  <AvatarFallback>
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.contact}</TableCell>
              {showRole && (
                <TableCell className="capitalize">
                  {user.role || "N/A"}
                </TableCell>
              )}
              {showStatus && (
                <TableCell>
                  <Badge
                    className={`${
                      statusColors[user.status] || "bg-gray-300"
                    } w-[80px]`}
                  >
                    {user.status?.charAt(0).toUpperCase() +
                      user.status?.slice(1) || "N/A"}
                  </Badge>
                </TableCell>
              )}
              <TableCell className="text-right space-x-2">
                <Link to={`/admin/user/${user.id || "123"}`}>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    View Detail
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTable;
