import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

function InstructorReq() {
  return (
    <Table>
      <TableCaption>A list of requests for instructor.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>S.N</TableHead>
          <TableHead className="w-[100px]">Email</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell className="text-right"></TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export default InstructorReq;
