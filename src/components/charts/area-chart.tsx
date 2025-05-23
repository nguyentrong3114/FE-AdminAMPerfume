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
  Filler,
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
  Legend,
  Filler
)

export interface AreaChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    borderColor: string
    backgroundColor: string
    fill?: boolean
  }[]
}

interface AreaChartProps {
  data: AreaChartData
  title?: string
  height?: number
  showLegend?: boolean
  showTitle?: boolean
  fill?: boolean
}

export function AreaChart({
  data,
  title,
  height = 300,
  showLegend = true,
  showTitle = false,
  fill = true,
}: AreaChartProps) {
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
    elements: {
      line: {
        tension: 0.4,
      },
    },
  }

  // Add fill property to all datasets
  const chartData = {
    ...data,
    datasets: data.datasets.map(dataset => ({
      ...dataset,
      fill,
    })),
  }

  return (
    <div style={{ height }}>
      <Line options={options} data={chartData} />
    </div>
  )
} 