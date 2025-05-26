"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart } from "@/components/charts/line-chart"
import { BarChart } from "@/components/charts/bar-chart"
import { PieChart } from "@/components/charts/pie-chart"
import { AreaChart } from "@/components/charts/area-chart"
import { useQuery, useMutation } from "@tanstack/react-query"
import { AnalyticService } from "@/services/analyticService"
import { useState, useEffect } from "react"
import { DatePicker, Select, Space, Button, message } from "antd"
import dayjs from "dayjs"

const { RangePicker } = DatePicker

export default function AnalyticsPage() {
  const [dateSearchType, setDateSearchType] = useState<'all' | 'single' | 'range'>('all')
  const [searchDate, setSearchDate] = useState<dayjs.Dayjs | null>(null)
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null]>([null, null])
  const [analyticsData, setAnalyticsData] = useState(null)

  const { data: initialData } = useQuery({
    queryKey: ["analytics-initial"],
    queryFn: () => AnalyticService.getAnalytics(),
    staleTime: Infinity
  })
  
  const analyticsMutation = useMutation({
    mutationFn: (dates: { startDate?: string, endDate?: string }) => {
      return AnalyticService.postAnalytics(dates)
    },
    onSuccess: (data) => {
      setAnalyticsData(data)
    }
  })
  
  useEffect(() => {
    if (initialData) {
      setAnalyticsData(initialData)
      console.log(initialData)
    }
  }, [initialData])

  const handleSearch = () => {
    if (dateSearchType === 'single') {
      if (!searchDate) {
        message.warning('Vui lòng chọn ngày')
        return
      }
      const formattedDate = searchDate.format('YYYY-MM-DD')
      analyticsMutation.mutate({
        startDate: formattedDate,
        endDate: formattedDate
      })
    } else if (dateSearchType === 'range') {
      if (!dateRange[0] || !dateRange[1]) {
        message.warning('Vui lòng chọn khoảng ngày')
        return
      }
      analyticsMutation.mutate({
        startDate: dateRange[0].format('YYYY-MM-DD'),
        endDate: dateRange[1].format('YYYY-MM-DD')
      })
    } else if (dateSearchType === 'all') {
      // Gọi lại GET /analytics (mặc định 1 năm)
      AnalyticService.getAnalytics().then((data) => {
        setAnalyticsData(data)
      }).catch(() => {
        message.error("Không thể tải dữ liệu phân tích.")
      })
    }
  }


  const salesData = {
    labels: ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"],
    datasets: [
      {
        label: "Doanh số",
        data: [12000, 19000, 15000, 25000, 22000, 30000, 28000, 35000, 32000, 40000, 38000, 45000],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  }

  const revenueData = {
    labels: ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"],
    datasets: [
      {
        label: "Doanh thu",
        data: [1000000, 1500000, 1200000, 2000000, 1800000, 2500000, 2200000, 3000000, 2800000, 3500000, 3200000, 4000000],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  }

  const categoryData = {
    labels: ["Nước hoa", "Son môi", "Kem dưỡng", "Sữa rửa mặt", "Tẩy trang"],
    datasets: [
      {
        data: [30, 25, 20, 15, 10],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 206, 86)",
          "rgb(75, 192, 192)",
          "rgb(153, 102, 255)",
        ],
      },
    ],
  }

  const userData = {
    labels: ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"],
    datasets: [
      {
        label: "Người dùng mới",
        data: [100, 150, 120, 200, 180, 250, 220, 300, 280, 350, 320, 400],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Phân tích</h2>
        <Space>
          <Select
            value={dateSearchType}
            onChange={setDateSearchType}
            style={{ width: 120 }}
            options={[
              { value: 'all', label: 'Tất cả' },
              { value: 'single', label: 'Ngày' },
              { value: 'range', label: 'Khoảng ngày' }
            ]}
          />
          {dateSearchType === 'single' && (
            <DatePicker
              value={searchDate}
              onChange={setSearchDate}
              placeholder="Chọn ngày"
            />
          )}
          {dateSearchType === 'range' && (
            <RangePicker
              value={dateRange}
              onChange={(dates) => setDateRange(dates as [dayjs.Dayjs | null, dayjs.Dayjs | null])}
              placeholder={['Từ ngày', 'Đến ngày']}
            />
          )}
          <Button type="primary" onClick={handleSearch}>
            Tìm kiếm
          </Button>
        </Space>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng doanh số</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData?.totalOrders}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng doanh thu</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData?.totalIncome} USD</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng đơn hàng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData?.totalProductsSold}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng người dùng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData?.totalUsers}</div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Doanh số theo tháng</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <LineChart data={salesData} />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Phân bố danh mục</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart data={categoryData} />
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Doanh thu theo tháng</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <AreaChart data={revenueData} />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Người dùng mới</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart data={userData} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}