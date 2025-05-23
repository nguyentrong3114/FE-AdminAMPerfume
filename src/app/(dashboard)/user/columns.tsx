"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export type User = {
  id: string
  name: string
  email: string
  role: "admin" | "user"
  status: "active" | "inactive"
  createdAt: string
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Tên người dùng",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Vai trò",
    cell: ({ row }) => {
      const role = row.getValue("role") as string
      return (
        <Badge variant={role === "admin" ? "default" : "secondary"}>
          {role === "admin" ? "Quản trị viên" : "Người dùng"}
        </Badge>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge variant={status === "active" ? "success" : "destructive"}>
          {status === "active" ? "Hoạt động" : "Không hoạt động"}
        </Badge>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: "Ngày tạo",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"))
      return date.toLocaleDateString("vi-VN")
    },
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const user = row.original
      return (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => (table.options.meta as any)?.onEdit(user)}
        >
          <Pencil className="h-4 w-4" />
        </Button>
      )
    },
  },
] 