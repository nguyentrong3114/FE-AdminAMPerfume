"use client"

import { Card, Table, Button, Row, Col, Statistic, Space, Badge } from "antd"
import { FileTextOutlined, DownloadOutlined, PrinterOutlined } from "@ant-design/icons"

export default function ReportsPage() {
  const reports = [
    {
      id: "1",
      name: "Báo cáo doanh số",
      type: "PDF",
      date: "2024-03-20",
      size: "2.5MB",
      status: "completed",
    },
    {
      id: "2",
      name: "Báo cáo tồn kho",
      type: "Excel",
      date: "2024-03-19",
      size: "1.8MB",
      status: "completed",
    },
    {
      id: "3",
      name: "Báo cáo khách hàng",
      type: "PDF",
      date: "2024-03-18",
      size: "3.2MB",
      status: "completed",
    },
  ]

  const columns = [
    {
      title: "Tên báo cáo",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Loại",
      dataIndex: "type",
      key: "type",
      render: (type: string) => (
        <Badge
          color={type === "PDF" ? "blue" : "green"}
          text={type}
        />
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "date",
      key: "date",
      render: (date: string) => new Date(date).toLocaleDateString("vi-VN"),
    },
    {
      title: "Kích thước",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Badge
          status={status === "completed" ? "success" : "processing"}
          text={status === "completed" ? "Hoàn thành" : "Đang xử lý"}
        />
      ),
    },
    {
      title: "Thao tác",
      key: "actions",
      render: () => (
        <Space>
          <Button type="text" icon={<DownloadOutlined />} />
          <Button type="text" icon={<PrinterOutlined />} />
        </Space>
      ),
    },
  ]

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Báo cáo</h2>
        <div className="flex items-center space-x-2">
          <Button type="primary" icon={<FileTextOutlined />}>
            Tạo báo cáo mới
          </Button>
        </div>
      </div>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Tổng báo cáo"
              value={24}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Báo cáo tháng này"
              value={8}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Báo cáo PDF"
              value={15}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Báo cáo Excel"
              value={9}
            />
          </Card>
        </Col>
      </Row>
      <Card>
        <Table
          columns={columns}
          dataSource={reports}
          rowKey="id"
        />
      </Card>
    </div>
  )
} 