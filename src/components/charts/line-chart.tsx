"use client"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js"
import { Line } from "react-chartjs-2"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export interface LineChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    borderColor: string
    backgroundColor: string
  }[]
}

interface LineChartProps {
  data: LineChartData
  title?: string
  height?: number
  showLegend?: boolean
  showTitle?: boolean
}

export function LineChart({
  data,
  title,
  height = 300,
  showLegend = true,
  showTitle = false,
}: LineChartProps) {
  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: showLegend,
        position: "top" as const,
      },
      title: {
        display: showTitle,
        text: title,
      },
    },
  }

  return (
    <div style={{ height }}>
      <Line options={options} data={data} />
    </div>
  )
} 