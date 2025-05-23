import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Download, Printer } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export type Report = {
  id: string
  name: string
  type: string
  date: string
  size: string
  status: string
}

export const columns: ColumnDef<Report>[] = [
  {
    accessorKey: "name",
    header: "Tên báo cáo",
  },
  {
    accessorKey: "type",
    header: "Loại",
    cell: ({ row }) => {
      const type = row.getValue("type") as string
      return (
        <Badge variant={type === "PDF" ? "default" : "secondary"}>
          {type}
        </Badge>
      )
    },
  },
  {
    accessorKey: "date",
    header: "Ngày tạo",
    cell: ({ row }) => {
      return new Date(row.getValue("date")).toLocaleDateString("vi-VN")
    },
  },
  {
    accessorKey: "size",
    header: "Kích thước",
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge variant={status === "completed" ? "default" : "secondary"}>
          {status === "completed" ? "Hoàn thành" : "Đang xử lý"}
        </Badge>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const report = row.original

      return (
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Printer className="h-4 w-4" />
          </Button>
        </div>
      )
    },
  },
] 