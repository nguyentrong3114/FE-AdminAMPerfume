"use client"

import { useState } from "react"
import { Card, Table, Button, Modal, Form, Input, Select, Badge, Space } from "antd"
import { PlusOutlined, UserOutlined } from "@ant-design/icons"
import { LineChart } from "@/components/charts/line-chart"

export default function TeamsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTeam, setSelectedTeam] = useState<any>(null)
  const [form] = Form.useForm()

  const teams = [
    {
      id: "1",
      name: "Nhóm phát triển",
      members: 5,
      leader: "Nguyễn Văn A",
      status: "active",
      createdAt: "2024-01-01",
    },
    {
      id: "2",
      name: "Nhóm marketing",
      members: 3,
      leader: "Trần Thị B",
      status: "active",
      createdAt: "2024-01-15",
    },
    {
      id: "3",
      name: "Nhóm hỗ trợ",
      members: 4,
      leader: "Lê Văn C",
      status: "inactive",
      createdAt: "2024-02-01",
    },
  ]

  const columns = [
    {
      title: "Tên nhóm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số thành viên",
      dataIndex: "members",
      key: "members",
      render: (members: number) => (
        <Space>
          <UserOutlined />
          {members}
        </Space>
      ),
    },
    {
      title: "Trưởng nhóm",
      dataIndex: "leader",
      key: "leader",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Badge
          status={status === "active" ? "success" : "default"}
          text={status === "active" ? "Hoạt động" : "Không hoạt động"}
        />
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleDateString("vi-VN"),
    },
  ]

  const handleAddTeam = () => {
    setSelectedTeam(null)
    form.resetFields()
    setIsModalOpen(true)
  }

  const handleEditTeam = (record: any) => {
    setSelectedTeam(record)
    form.setFieldsValue({
      name: record.name,
      leader: record.leader,
      status: record.status,
    })
    setIsModalOpen(true)
  }

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      console.log(values)
      setIsModalOpen(false)
    } catch (error) {
      console.error("Validate Failed:", error)
    }
  }

  const teamData = {
    labels: ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"],
    datasets: [
      {
        label: "Số thành viên mới",
        data: [5, 8, 12, 15, 20, 25, 30, 35, 40, 45, 50, 55],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Quản lý nhóm</h2>
        <div className="flex items-center space-x-2">
          <Button type="primary" onClick={handleAddTeam} icon={<PlusOutlined />}>
            Thêm nhóm mới
          </Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <div className="text-sm font-medium">Tổng số nhóm</div>
          <div className="text-2xl font-bold">12</div>
        </Card>
        <Card>
          <div className="text-sm font-medium">Nhóm hoạt động</div>
          <div className="text-2xl font-bold">8</div>
        </Card>
        <Card>
          <div className="text-sm font-medium">Tổng thành viên</div>
          <div className="text-2xl font-bold">45</div>
        </Card>
        <Card>
          <div className="text-sm font-medium">Nhóm mới</div>
          <div className="text-2xl font-bold">2</div>
        </Card>
      </div>
      <Card title="Thống kê thành viên">
        <LineChart data={teamData} />
      </Card>
      <Card>
        <Table
          columns={columns}
          dataSource={teams}
          rowKey="id"
          onRow={(record) => ({
            onClick: () => handleEditTeam(record),
          })}
        />
      </Card>
      <Modal
        title={selectedTeam ? "Sửa nhóm" : "Thêm nhóm mới"}
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Tên nhóm"
            rules={[{ required: true, message: "Vui lòng nhập tên nhóm" }]}
          >
            <Input placeholder="Nhập tên nhóm" />
          </Form.Item>
          <Form.Item
            name="leader"
            label="Trưởng nhóm"
            rules={[{ required: true, message: "Vui lòng nhập tên trưởng nhóm" }]}
          >
            <Input placeholder="Nhập tên trưởng nhóm" />
          </Form.Item>
          <Form.Item
            name="status"
            label="Trạng thái"
            rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
          >
            <Select>
              <Select.Option value="active">Hoạt động</Select.Option>
              <Select.Option value="inactive">Không hoạt động</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
} 