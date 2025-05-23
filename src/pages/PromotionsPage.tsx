"use client"

import { Card, Table, Button, Row, Col, Statistic, Space, Badge, Modal, Form, Input, DatePicker, InputNumber } from "antd"
import { PlusOutlined, GiftOutlined } from "@ant-design/icons"
import { BarChart } from "@/components/charts/bar-chart"
import { useState } from "react"

export default function PromotionsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()

  const promotions = [
    {
      id: "1",
      name: "Khuyến mãi tháng 3",
      code: "MARCH2024",
      discount: 20,
      startDate: "2024-03-01",
      endDate: "2024-03-31",
      status: "active",
      usage: 150,
    },
    {
      id: "2",
      name: "Khuyến mãi sinh nhật",
      code: "BIRTHDAY",
      discount: 15,
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      status: "active",
      usage: 45,
    },
    {
      id: "3",
      name: "Khuyến mãi mùa hè",
      code: "SUMMER2024",
      discount: 25,
      startDate: "2024-06-01",
      endDate: "2024-08-31",
      status: "inactive",
      usage: 0,
    },
  ]

  const columns = [
    {
      title: "Tên khuyến mãi",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mã giảm giá",
      dataIndex: "code",
      key: "code",
      render: (code: string) => (
        <Badge
          color="blue"
          text={code}
        />
      ),
    },
    {
      title: "Giảm giá",
      dataIndex: "discount",
      key: "discount",
      render: (discount: number) => `${discount}%`,
    },
    {
      title: "Thời gian",
      key: "time",
      render: (record: any) => (
        <div>
          <div>Từ: {new Date(record.startDate).toLocaleDateString("vi-VN")}</div>
          <div>Đến: {new Date(record.endDate).toLocaleDateString("vi-VN")}</div>
        </div>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Badge
          status={status === "active" ? "success" : "default"}
          text={status === "active" ? "Đang áp dụng" : "Chưa áp dụng"}
        />
      ),
    },
    {
      title: "Lượt sử dụng",
      dataIndex: "usage",
      key: "usage",
    },
    {
      title: "Thao tác",
      key: "actions",
      render: () => (
        <Space>
          <Button type="text" icon={<GiftOutlined />} />
        </Space>
      ),
    },
  ]

  const promotionData = {
    labels: ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"],
    datasets: [
      {
        label: "Lượt sử dụng",
        data: [120, 150, 180, 200, 250, 300, 280, 320, 350, 400, 380, 420],
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
        <h2 className="text-3xl font-bold tracking-tight">Khuyến mãi</h2>
        <div className="flex items-center space-x-2">
          <Button type="primary" onClick={() => setIsModalOpen(true)} icon={<PlusOutlined />}>
            Thêm khuyến mãi mới
          </Button>
        </div>
      </div>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Tổng khuyến mãi"
              value={12}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Đang áp dụng"
              value={5}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Tổng lượt sử dụng"
              value={1250}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Tổng giảm giá"
              value={25000000}
              formatter={(value) => `${value.toLocaleString()}đ`}
            />
          </Card>
        </Col>
      </Row>
      <Card title="Thống kê sử dụng">
        <BarChart data={promotionData} />
      </Card>
      <Card>
        <Table
          columns={columns}
          dataSource={promotions}
          rowKey="id"
        />
      </Card>
      <Modal
        title="Thêm khuyến mãi mới"
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Tên khuyến mãi"
            rules={[{ required: true, message: "Vui lòng nhập tên khuyến mãi" }]}
          >
            <Input placeholder="Nhập tên khuyến mãi" />
          </Form.Item>
          <Form.Item
            name="code"
            label="Mã giảm giá"
            rules={[{ required: true, message: "Vui lòng nhập mã giảm giá" }]}
          >
            <Input placeholder="Nhập mã giảm giá" />
          </Form.Item>
          <Form.Item
            name="discount"
            label="Giảm giá (%)"
            rules={[{ required: true, message: "Vui lòng nhập phần trăm giảm giá" }]}
          >
            <InputNumber min={0} max={100} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="dateRange"
            label="Thời gian áp dụng"
            rules={[{ required: true, message: "Vui lòng chọn thời gian áp dụng" }]}
          >
            <DatePicker.RangePicker style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
} 