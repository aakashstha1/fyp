// components/UserTable.jsx
import React, { useState } from "react";
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

const ReqDataTable = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const totalPages = Math.ceil(data.length / rowsPerPage);

  // Get current page data
  const currentData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div>
      <div className="border rounded-lg shadow-sm max-h-[600px] overflow-y-auto">
        <Table>
          <TableHeader className="sticky top-0 bg-gray-50 dark:bg-gray-900 z-10">
            <TableRow>
              <TableHead className="w-16">S.N</TableHead>
              <TableHead className="w-20">Profile</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right w-32">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {currentData.length > 0 ? (
              currentData.map((req, index) => (
                <TableRow
                  key={index}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <TableCell className="font-medium text-gray-700">
                    {(currentPage - 1) * rowsPerPage + index + 1}
                  </TableCell>

                  <TableCell>
                    <Avatar>
                      <AvatarImage
                        src={req?.user?.imageUrl || ""}
                        alt={req?.user?.name}
                        className="object-cover"
                      />
                      <AvatarFallback>
                        {req?.user?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>

                  <TableCell className="font-medium text-gray-900">
                    {req?.user?.name}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {req?.user?.email}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {req?.user?.phone || "N/A"}
                  </TableCell>

                  <TableCell>
                    <Badge
                      className={`w-24 justify-center text-white ${
                        req?.status === "approved"
                          ? "bg-green-500"
                          : req?.status === "pending"
                          ? "bg-yellow-500"
                          : req?.status === "rejected"
                          ? "bg-red-500"
                          : "bg-gray-400"
                      }`}
                    >
                      {req?.status
                        ? req.status.charAt(0).toUpperCase() +
                          req.status.slice(1)
                        : "N/A"}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right space-x-2">
                    {req?.user?.role !== "admin" && (
                      <Link to={`/admin/instructor-request/${req?._id}`}>
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
                <TableCell className="text-center p-6">
                  <p className="text-gray-500 text-sm">No data yet.</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={goToPrevPage} disabled={currentPage === 1} size="sm">
            Previous
          </Button>
          <span className="flex items-center px-2">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            size="sm"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReqDataTable;
