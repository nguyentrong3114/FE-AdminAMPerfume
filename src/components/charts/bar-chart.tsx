"use client"

import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export interface BarChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor: string
    borderColor?: string
    borderWidth?: number
  }[]
}

interface BarChartProps {
  data: BarChartData
  title?: string
  height?: number
  showLegend?: boolean
  showTitle?: boolean
  stacked?: boolean
}

export function BarChart({
  data,
  title,
  height = 300,
  showLegend = true,
  showTitle = false,
  stacked = false,
}: BarChartProps) {
  const options: ChartOptions<"bar"> = {
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
    scales: {
      x: {
        stacked,
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          precision: 0,
        },
        stacked,
      },
    },
  }

  return (
    <div style={{ height }}>
      <Bar options={options} data={data} />
    </div>
  )
} 