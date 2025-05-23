"use client"

import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect } from "react"

const formSchema = z.object({
  name: z.string().min(2, "Tên nhóm phải có ít nhất 2 ký tự"),
  leader: z.string().min(2, "Tên trưởng nhóm phải có ít nhất 2 ký tự"),
  status: z.enum(["active", "inactive"]),
})

interface TeamModalProps {
  open: boolean
  onClose: () => void
  team?: {
    id: string
    name: string
    leader: string
    status: "active" | "inactive"
  }
}

export function TeamModal({ open, onClose, team }: TeamModalProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      leader: "",
      status: "active",
    },
  })

  useEffect(() => {
    if (team) {
      form.reset({
        name: team.name,
        leader: team.leader,
        status: team.status,
      })
    } else {
      form.reset({
        name: "",
        leader: "",
        status: "active",
      })
    }
  }, [team, form])

  function onSubmit(values: z.infer<typeof formSchema>) {
    // TODO: Implement API call
    console.log(values)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{team ? "Sửa nhóm" : "Thêm nhóm mới"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên nhóm</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập tên nhóm" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="leader"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trưởng nhóm</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập tên trưởng nhóm" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trạng thái</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn trạng thái" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="active">Hoạt động</SelectItem>
                      <SelectItem value="inactive">Không hoạt động</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={onClose}>
                Hủy
              </Button>
              <Button type="submit">{team ? "Cập nhật" : "Thêm mới"}</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
} 