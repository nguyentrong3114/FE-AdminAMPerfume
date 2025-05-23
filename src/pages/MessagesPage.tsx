"use client"

import { Card, Table, Button, Row, Col, Statistic, Space, Badge, Avatar, Input } from "antd"
import { SearchOutlined, MessageOutlined, UserOutlined } from "@ant-design/icons"
import { LineChart } from "@/components/charts/line-chart"

export default function MessagesPage() {
  const messages = [
    {
      id: "1",
      sender: "Nguyễn Văn A",
      email: "nguyenvana@example.com",
      subject: "Hỏi về sản phẩm",
      content: "Tôi muốn biết thêm thông tin về sản phẩm...",
      status: "unread",
      date: "2024-03-20",
    },
    {
      id: "2",
      sender: "Trần Thị B",
      email: "tranthib@example.com",
      subject: "Phản hồi đơn hàng",
      content: "Cảm ơn bạn đã phản hồi...",
      status: "read",
      date: "2024-03-19",
    },
    {
      id: "3",
      sender: "Lê Văn C",
      email: "levanc@example.com",
      subject: "Yêu cầu hỗ trợ",
      content: "Tôi cần hỗ trợ về vấn đề...",
      status: "unread",
      date: "2024-03-18",
    },
  ]

  const columns = [
    {
      title: "Người gửi",
      dataIndex: "sender",
      key: "sender",
      render: (sender: string, record: any) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          <div>
            <div>{sender}</div>
            <div className="text-gray-500 text-sm">{record.email}</div>
          </div>
        </Space>
      ),
    },
    {
      title: "Tiêu đề",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
      ellipsis: true,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Badge
          status={status === "unread" ? "processing" : "default"}
          text={status === "unread" ? "Chưa đọc" : "Đã đọc"}
        />
      ),
    },
    {
      title: "Ngày gửi",
      dataIndex: "date",
      key: "date",
      render: (date: string) => new Date(date).toLocaleDateString("vi-VN"),
    },
    {
      title: "Thao tác",
      key: "actions",
      render: () => (
        <Space>
          <Button type="text" icon={<MessageOutlined />} />
        </Space>
      ),
    },
  ]

  const messageData = {
    labels: ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"],
    datasets: [
      {
        label: "Số tin nhắn",
        data: [50, 65, 45, 80, 70, 90, 85, 100, 95, 110, 105, 120],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Tin nhắn</h2>
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Tìm kiếm tin nhắn..."
            prefix={<SearchOutlined />}
            style={{ width: 300 }}
          />
        </div>
      </div>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Tổng tin nhắn"
              value={150}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Tin nhắn chưa đọc"
              value={25}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Tin nhắn hôm nay"
              value={12}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Tỷ lệ phản hồi"
              value={85}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>
      <Card title="Thống kê tin nhắn">
        <LineChart data={messageData} />
      </Card>
      <Card>
        <Table
          columns={columns}
          dataSource={messages}
          rowKey="id"
        />
      </Card>
    </div>
  )
} 