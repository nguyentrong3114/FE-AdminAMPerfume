"use client"

import { Card, Table, Button, Row, Col, Statistic, Space, Badge, Modal, Form, Input } from "antd"
import { PlusOutlined, TagOutlined } from "@ant-design/icons"
import { AreaChart } from "@/components/charts/area-chart"
import { useState } from "react"
import { categoriesService } from "@/services/categoryService"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import type { Category } from "@/types/Category"
import { data } from "react-router-dom"

export default function CategoriesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()
  const { data: categoriesData, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: categoriesService.getCategories
  })
  const queryClient = useQueryClient()
  
  const createCategoryMutation = useMutation({
    mutationFn: categoriesService.createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      setIsModalOpen(false)
      form.resetFields()
    }
  })

  const columns = [
    {
      title: "Tên danh mục", 
      dataIndex: "name",
      key: "name",
      render: (name: string) => (
        <Space>
          <TagOutlined />
          {name}
        </Space>
      ),
    },
    {
      title: "Slug",
      dataIndex: "slug", 
      key: "slug",
      ellipsis: true,
    },
    {
      title: "Số sản phẩm",
      dataIndex: "productCount",
      key: "productCount",
    },
    {
      title: "Trạng thái",
      dataIndex: "isActive",
      key: "isActive", 
      render: (isActive: boolean) => (
        <Badge
          status={isActive ? "success" : "default"}
          text={isActive ? "Hoạt động" : "Không hoạt động"}
        />
      ),
    },
    {
      title: "Thao tác",
      key: "actions",
      render: () => (
        <Space>
          <Button type="text" icon={<TagOutlined />} />
        </Space>
      ),
    },
  ]

  const categoryData = {
    labels: ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"],
    datasets: [
      {
        label: "Số sản phẩm mới",
        data: [50, 65, 45, 80, 70, 90, 85, 100, 95, 110, 105, 120],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  }

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      createCategoryMutation.mutate(values as Category)
    } catch (error) {
      console.error("Validate Failed:", error)
    }
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Danh mục</h2>
        <div className="flex items-center space-x-2">
          <Button type="primary" onClick={() => setIsModalOpen(true)} icon={<PlusOutlined />}>
            Thêm danh mục mới
          </Button>
        </div>
      </div>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Tổng danh mục"
              value={categoriesData?.totalCategories || 0}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Danh mục hoạt động"
                value={categoriesData?.totalActiveCategories || 0}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Tổng sản phẩm"
              value={categoriesData?.totalProducts || 0}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Danh mục không hoạt động"
              value={categoriesData?.totalInactiveCategories || 0}
            />
          </Card>
        </Col>
      </Row>
      <Card title="Thống kê sản phẩm">
        <AreaChart data={categoryData} />
      </Card>
      <Card>
        <Table
          columns={columns}
          dataSource={categoriesData?.categories}
          rowKey="id"
          loading={isLoading}
        />
      </Card>
      <Modal
        title="Thêm danh mục mới"
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={() => setIsModalOpen(false)}
        confirmLoading={createCategoryMutation.isPending}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Tên danh mục"
            rules={[{ required: true, message: "Vui lòng nhập tên danh mục" }]}
          >
            <Input placeholder="Nhập tên danh mục" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
          >
            <Input.TextArea placeholder="Nhập mô tả" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}