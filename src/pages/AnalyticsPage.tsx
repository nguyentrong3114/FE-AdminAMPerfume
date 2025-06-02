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
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null]>([null, null])
  const [selectedYear, setSelectedYear] = useState<dayjs.Dayjs | null>(null)
  const [analyticsData, setAnalyticsData] = useState<any>(null)

  const { data: initialData } = useQuery({
    queryKey: ["analytics-initial"],
    queryFn: () => AnalyticService.getAnalytics(),
    staleTime: Infinity
  })

  const { data: chartData } = useQuery({
    queryKey: ["analytics-chart"],
    queryFn: () => AnalyticService.getChartDataByYear(selectedYear?.year() ?? dayjs().year()),
    staleTime: Infinity,
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
      updateChartData(chartData)
    }
  }, [chartData, initialData])

  const updateChartData = (data: any) => {
    if (!data) return

    // 👉 Doanh số
    const productSold = data.productSold ?? []
    setSalesData({
      labels: productSold.map((item: any) => `Tháng ${item.month}`),
      datasets: [{
        label: "Doanh số",
        data: productSold.map((item: any) => item.productCount),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      }]
    })

    // 👉 Doanh thu
    const revenue = data.revenue ?? []
    setRevenueData({
      labels: revenue.map((item: any) => `Tháng ${item.month}`),
      datasets: [{
        label: "Doanh thu",
        data: revenue.map((item: any) => item.revenue),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      }]
    })

    // 👉 Người dùng mới
    const users = data.totalUsers ?? []
    setUserData({
      labels: users.map((item: any) => `Tháng ${item.month}`),
      datasets: [{
        label: "Người dùng mới",
        data: users.map((item: any) => item.totalUsers),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      }]
    })

    // 👉 Phân bố thương hiệu
    const brands = data.totalProductByBrand ?? []
    setCategoryData({
      labels: brands.map((item: any) => item.brandName),
      datasets: [{
        data: brands.map((item: any) => item.productCount),
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 206, 86)",
          "rgb(75, 192, 192)",
          "rgb(153, 102, 255)",
        ],
      }]
    })
  }

  const handleAnalyticsSearch = () => {
    if (!dateRange[0] || !dateRange[1]) {
      message.warning('Vui lòng chọn khoảng thời gian')
      return
    }

    const payload = {
      startDate: dateRange[0].format('YYYY-MM-DD'),
      endDate: dateRange[1].format('YYYY-MM-DD')
    }
    analyticsMutation.mutate(payload)
  }

  const handleChartSearch = () => {
    if (!selectedYear) {
      message.warning('Vui lòng chọn năm')
      return
    }

    const startDate = selectedYear.startOf('year').format('YYYY-MM-DD')
    const endDate = selectedYear.endOf('year').format('YYYY-MM-DD')
    const payload = {
      startDate,
      endDate
    }
    AnalyticService.getChartDataByYear(selectedYear?.year() ?? dayjs().year()).then((data) => {
      updateChartData(data)
    }).catch(() => {
      message.error("Không thể tải dữ liệu biểu đồ.")
    })
  }

  const [salesData, setSalesData] = useState({
    labels: [],
    datasets: [
      {
        label: "Doanh số",
        data: [],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  })

  const [revenueData, setRevenueData] = useState({
    labels: [],
    datasets: [
      {
        label: "Doanh thu",
        data: [],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  })

  const [categoryData, setCategoryData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 206, 86)",
          "rgb(75, 192, 192)",
          "rgb(153, 102, 255)",
        ],
      },
    ],
  })

  const [userData, setUserData] = useState({
    labels: [],
    datasets: [
      {
        label: "Người dùng mới",
        data: [],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  })

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Phân tích</h2>
        <Space>
          <RangePicker
            value={dateRange}
            onChange={(dates) => setDateRange(dates as [dayjs.Dayjs | null, dayjs.Dayjs | null])}
            placeholder={['Từ ngày', 'Đến ngày']}
          />
          <Button type="primary" onClick={handleAnalyticsSearch}>
            Tìm kiếm thống kê
          </Button>

          <DatePicker
            value={selectedYear}
            onChange={setSelectedYear}
            picker="year"
            placeholder="Chọn năm cho biểu đồ"
          />
          <Button type="primary" onClick={handleChartSearch}>
            Tìm kiếm biểu đồ
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