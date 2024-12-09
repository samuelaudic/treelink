"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Member } from "@/interfaces/Member";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Trash2 } from "lucide-react";

export const getColumns = (
  handleDeleteMember: (id: number) => void
): ColumnDef<Member>[] => [
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
    cell: ({ row }) => {
      return row.original.lastName.toUpperCase();
    },
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
    cell: ({ row }) => {
      return row.original.father
        ? `${row.original.father.firstName} ${row.original.father.lastName}`
        : "N/A";
    },
  },
  {
    header: "Mother",
    accessorKey: "mother",
    cell: ({ row }) => {
      return row.original.mother
        ? `${row.original.mother.firstName} ${row.original.mother.lastName}`
        : "N/A";
    },
  },
  {
    header: "Spouse",
    accessorKey: "spouse",
    cell: ({ row }) => {
      return row.original.spouse
        ? `${row.original.spouse.firstName} ${row.original.spouse.lastName}`
        : "N/A";
    },
  },
  {
    header: "Created At",
    accessorKey: "createdAt",
    cell: ({ row }) => {
      return row.original.createdAt.toLocaleDateString();
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const member = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={async () => {
                if (
                  window.confirm(
                    "Êtes-vous sûr de vouloir supprimer ce membre ?"
                  )
                ) {
                  await handleDeleteMember(member.id); // Appelle la suppression
                }
              }}
              className="flex items-center gap-2"
            >
              <Trash2 />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
