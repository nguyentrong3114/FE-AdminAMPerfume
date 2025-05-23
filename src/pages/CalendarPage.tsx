"use client"

import { Card, Calendar, Badge, List, Space, Tag } from "antd"
import { PieChart } from "@/components/charts/pie-chart"
import type { Moment } from "moment"
import moment from "moment"

export default function CalendarPage() {
  const events = [
    {
      id: "1",
      title: "Họp nhóm phát triển",
      date: "2024-03-20",
      time: "09:00",
      type: "meeting",
      status: "upcoming",
    },
    {
      id: "2",
      title: "Kiểm tra kho",
      date: "2024-03-21",
      time: "14:00",
      type: "task",
      status: "upcoming",
    },
    {
      id: "3",
      title: "Họp với khách hàng",
      date: "2024-03-22",
      time: "10:00",
      type: "meeting",
      status: "upcoming",
    },
  ]

  const eventData = {
    labels: ["Cuộc họp", "Công việc", "Sự kiện", "Khác"],
    datasets: [
      {
        data: [40, 30, 20, 10],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 206, 86)",
          "rgb(75, 192, 192)",
        ],
      },
    ],
  }

  const getListData = (value: Moment) => {
    const date = value.format("YYYY-MM-DD")
    return events.filter(event => event.date === date)
  }

  const dateCellRender = (value: Moment) => {
    const listData = getListData(value)
    return (
      <ul className="events">
        {listData.map(item => (
          <li key={item.id}>
            <Badge
              status={item.type === "meeting" ? "success" : "processing"}
              text={item.title}
            />
          </li>
        ))}
      </ul>
    )
  }

  const getMonthData = (value: Moment) => {
    if (value.month() === 2) {
      return 1394
    }
  }

  const monthCellRender = (value: Moment) => {
    const num = getMonthData(value)
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Sự kiện</span>
      </div>
    ) : null
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Lịch</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="col-span-2">
          <Card>
            <Calendar
              dateCellRender={dateCellRender}
              monthCellRender={monthCellRender}
            />
          </Card>
        </div>
        <div>
          <Card title="Sự kiện sắp tới">
            <List
              dataSource={events}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    title={item.title}
                    description={
                      <Space direction="vertical">
                        <div>
                          {moment(item.date).format("DD/MM/YYYY")} - {item.time}
                        </div>
                        <Space>
                          <Tag color={item.type === "meeting" ? "success" : "processing"}>
                            {item.type === "meeting" ? "Cuộc họp" : "Công việc"}
                          </Tag>
                          <Tag color="blue">{item.status === "upcoming" ? "Sắp tới" : "Đã qua"}</Tag>
                        </Space>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
          <Card title="Phân bố sự kiện" className="mt-4">
            <PieChart data={eventData} />
          </Card>
        </div>
      </div>
    </div>
  )
} 