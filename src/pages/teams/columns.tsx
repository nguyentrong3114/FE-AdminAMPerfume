"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export type Team = {
  id: string
  name: string
  members: number
  leader: string
  status: "active" | "inactive"
  createdAt: string
}

export const columns: ColumnDef<Team>[] = [
  {
    accessorKey: "name",
    header: "Tên nhóm",
  },
  {
    accessorKey: "members",
    header: "Số thành viên",
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <Users className="mr-2 h-4 w-4" />
          {row.getValue("members")}
        </div>
      )
    },
  },
  {
    accessorKey: "leader",
    header: "Trưởng nhóm",
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge variant={status === "active" ? "default" : "secondary"}>
          {status === "active" ? "Hoạt động" : "Không hoạt động"}
        </Badge>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: "Ngày tạo",
    cell: ({ row }) => {
      return new Date(row.getValue("createdAt")).toLocaleDateString("vi-VN")
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const team = row.original

      return (
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Mở menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      )
    },
  },
] 