"use client"

import { Pie } from "react-chartjs-2"
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js"

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
)

export interface PieChartData {
  labels: string[]
  datasets: {
    data: number[]
    backgroundColor: string[]
    borderColor?: string[]
    borderWidth?: number
  }[]
}

interface PieChartProps {
  data: PieChartData
  title?: string
  height?: number
  showLegend?: boolean
  showTitle?: boolean
  donut?: boolean
}

export function PieChart({
  data,
  title,
  height = 300,
  showLegend = true,
  showTitle = false,
  donut = false,
}: PieChartProps) {
  const options: ChartOptions<"pie"> = {
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
    cutout: donut ? "50%" : 0,
  }

  return (
    <div style={{ height }}>
      <Pie options={options} data={data} />
    </div>
  )
} 