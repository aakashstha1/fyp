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

const UserDatatable = ({ data, showRole = true }) => {
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
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.isArray(data) &&
            data.length > 0 &&
            data.map((req, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Avatar>
                    <AvatarImage
                      src={req?.user?.imageUrl || ""}
                      alt={req?.user?.name}
                    />
                    <AvatarFallback>
                      {req?.user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>{req?.user?.name}</TableCell>
                <TableCell>{req?.user?.email}</TableCell>
                <TableCell>{req?.user?.contact || "N/A"}</TableCell>
                {showRole && (
                  <TableCell className="capitalize">
                    {req?.user?.role || "N/A"}
                  </TableCell>
                )}
                <TableCell className="text-right space-x-2">
                  {req?.user?.role === "instructor" && (
                    <Link to={`/admin/instructor-request/${req._id}`}>
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        View Detail
                      </Button>
                    </Link>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {data.length === 0 && <p className="text-center">No data yet.</p>}
    </div>
  );
};

export default UserDatatable;
