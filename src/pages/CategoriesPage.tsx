"use client"

import { Card, Table, Button, Row, Col, Statistic, Space, Badge, Modal, Form, Input } from "antd"
import { PlusOutlined, TagOutlined } from "@ant-design/icons"
import { AreaChart } from "@/components/charts/area-chart"
import { useState } from "react"

export default function CategoriesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()

  const categories = [
    {
      id: "1",
      name: "Nước hoa",
      description: "Các loại nước hoa cao cấp",
      products: 150,
      status: "active",
      createdAt: "2024-01-01",
    },
    {
      id: "2",
      name: "Son môi",
      description: "Son môi các loại",
      products: 80,
      status: "active",
      createdAt: "2024-01-15",
    },
    {
      id: "3",
      name: "Kem dưỡng",
      description: "Kem dưỡng da mặt",
      products: 120,
      status: "active",
      createdAt: "2024-02-01",
    },
  ]

  const columns = [
    {
      title: "Tên danh mục",
      dataIndex: "name",
      key: "name",
      render: (name: string) => (
        <Space>
          <TagOutlined />
          {name}
        </Space>
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Số sản phẩm",
      dataIndex: "products",
      key: "products",
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
    {
      title: "Thao tác",
      key: "actions",
      render: () => (
        <Space>
          <Button type="text" icon={<TagOutlined />} />
        </Space>
      ),
    },
  ]

  const categoryData = {
    labels: ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"],
    datasets: [
      {
        label: "Số sản phẩm mới",
        data: [50, 65, 45, 80, 70, 90, 85, 100, 95, 110, 105, 120],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
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

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Danh mục</h2>
        <div className="flex items-center space-x-2">
          <Button type="primary" onClick={() => setIsModalOpen(true)} icon={<PlusOutlined />}>
            Thêm danh mục mới
          </Button>
        </div>
      </div>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Tổng danh mục"
              value={12}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Danh mục hoạt động"
              value={10}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Tổng sản phẩm"
              value={350}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Danh mục mới"
              value={2}
            />
          </Card>
        </Col>
      </Row>
      <Card title="Thống kê sản phẩm">
        <AreaChart data={categoryData} />
      </Card>
      <Card>
        <Table
          columns={columns}
          dataSource={categories}
          rowKey="id"
        />
      </Card>
      <Modal
        title="Thêm danh mục mới"
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Tên danh mục"
            rules={[{ required: true, message: "Vui lòng nhập tên danh mục" }]}
          >
            <Input placeholder="Nhập tên danh mục" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
          >
            <Input.TextArea placeholder="Nhập mô tả" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
} 