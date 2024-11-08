"use client";

import { Member } from "@/interfaces/Member";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Member>[] = [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "First Name",
    accessorKey: "firstName",
  },
  {
    header: "Last Name",
    accessorKey: "lastName",
  },
  {
    header: "Gender",
    accessorKey: "gender",
  },
  {
    header: "Birth Date",
    accessorKey: "birthDate",
    cell: ({ row }) => {
      return row.original.birthDate?.toLocaleDateString() ?? "N/A";
    },
  },
  {
    header: "Death Date",
    accessorKey: "deathDate",
    cell: ({ row }) => {
      return row.original.deathDate?.toLocaleDateString() ?? "N/A";
    },
  },
  {
    header: "Father",
    accessorKey: "father",
  },
  {
    header: "Mother",
    accessorKey: "mother",
  },
  {
    header: "Spouse",
    accessorKey: "spouse",
  },
  {
    header: "Created At",
    accessorKey: "createdAt",
    cell: ({ row }) => {
      return row.original.createdAt.toLocaleDateString();
    },
  },
];
