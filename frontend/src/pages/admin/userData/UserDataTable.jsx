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

const UserDatatable = ({ data, showRole, showStatus }) => {
  return (
    <div className="border rounded-lg shadow-sm max-h-[600px] overflow-y-auto">
      <Table>
        <TableHeader className="sticky top-0 bg-gray-50 dark:bg-gray-900 z-10">
          <TableRow>
            <TableHead className="w-16">S.N</TableHead>
            <TableHead className="w-20">Profile</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            {showRole && <TableHead>Role</TableHead>}
            {showStatus && <TableHead>Status</TableHead>}

            <TableHead className="text-right w-32">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.isArray(data) && data.length > 0 ? (
            data.map((req, index) => (
              <TableRow
                key={index}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <TableCell className="font-medium text-gray-700">
                  {index + 1}
                </TableCell>

                {/* Avatar */}
                <TableCell>
                  <Avatar className="h-9 w-9 rounded-md">
                    <AvatarImage
                      src={req?.user?.imageUrl || ""}
                      alt={req?.user?.name}
                      className="object-cover"
                    />
                    <AvatarFallback className="rounded-md text-sm">
                      {req?.user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>

                {/* User Info */}
                <TableCell className="font-medium text-gray-900">
                  {req?.user?.name}
                </TableCell>
                <TableCell className="text-gray-600">
                  {req?.user?.email}
                </TableCell>
                <TableCell className="text-gray-600">
                  {req?.user?.phone || "N/A"}
                </TableCell>

                {/* Role */}
                {showRole && (
                  <TableCell className="capitalize text-gray-700">
                    {req?.user?.role || "N/A"}
                  </TableCell>
                )}

                {showStatus && (
                  <TableCell>
                    <Badge
                      className={`w-24 justify-center text-white ${
                        req?.status === "approved"
                          ? "bg-green-500 "
                          : req?.status === "pending"
                          ? "bg-yellow-500 "
                          : req?.status === "rejected"
                          ? "bg-red-500 "
                          : "bg-gray-400 "
                      }`}
                    >
                      {req?.status
                        ? req.status.charAt(0).toUpperCase() +
                          req.status.slice(1)
                        : "N/A"}
                    </Badge>
                  </TableCell>
                )}
                {/* Action */}
                <TableCell className="text-right space-x-2">
                  {req?.user?.role != "admin" && (
                    <Link to={`/admin/instructor-request/${req._id}`}>
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 rounded-md"
                      >
                        View
                      </Button>
                    </Link>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={showRole ? 7 : 6} className="text-center p-6">
                <p className="text-gray-500 text-sm">No data yet.</p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserDatatable;
