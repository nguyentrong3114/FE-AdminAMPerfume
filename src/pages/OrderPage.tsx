import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Table, Input, DatePicker, Select, Space } from 'antd';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Line } from '@ant-design/plots';
import { SearchOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;

const orderColumns = [
  {
    title: 'Mã đơn hàng',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Tên khách hàng',
    dataIndex: 'customerName',
    key: 'customerName',
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
  },
  {
    title: 'Địa chỉ',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Tổng tiền',
    dataIndex: 'total',
    key: 'total',
  }
];

const mockData = [
  {
    id: 'DH001',
    customerName: 'Nguyễn Văn A',
    phoneNumber: '0123456789',
    address: '123 Đường ABC, Phường XYZ, Quận 1, TP.HCM',
    status: 'Đang xử lý',
    total: '1.500.000đ'
  },
  {
    id: 'DH002', 
    customerName: 'Trần Thị B',
    phoneNumber: '0987654321',
    address: '456 Đường DEF, Phường UVW, Quận 2, TP.HCM',
    status: 'Đã giao hàng',
    total: '2.300.000đ'
  }
];

const chartData = [
  { date: '2024-01', value: 3 },
  { date: '2024-02', value: 4 },
  { date: '2024-03', value: 6 },
  { date: '2024-04', value: 5 },
  { date: '2024-05', value: 8 },
];

export default function OrderPage() {
  const [orders] = useState(mockData);
  const [searchText, setSearchText] = useState('');
  const [status, setStatus] = useState('all');

  const config = {
    data: chartData,
    xField: 'date',
    yField: 'value',
    point: {
      size: 5,
      shape: 'diamond',
    },
    label: {
      style: {
        fill: '#aaa',
      },
    },
  };

  const filteredOrders = orders.filter(order => {
    const matchSearch = order.customerName.toLowerCase().includes(searchText.toLowerCase()) ||
                       order.id.toLowerCase().includes(searchText.toLowerCase()) ||
                       order.phoneNumber.includes(searchText);
    const matchStatus = status === 'all' || order.status === status;
    return matchSearch && matchStatus;
  });

  return (
    <div className="p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-none shadow-lg rounded-xl mb-6">
          <CardHeader className="space-y-2 p-6">
            <CardTitle className="text-2xl font-bold">Thống kê đơn hàng</CardTitle>
            <CardDescription>
              Biểu đồ số lượng đơn hàng theo tháng
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Line {...config} />
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg rounded-xl">
          <CardHeader className="space-y-2 p-6">
            <CardTitle className="text-2xl font-bold">Quản lý đơn hàng</CardTitle>
            <CardDescription>
              Xem và quản lý tất cả đơn hàng của khách hàng
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Space className="mb-4" size="large">
              <Input
                placeholder="Tìm kiếm theo mã, tên, SĐT..."
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                style={{ width: 300 }}
              />
              <Select
                defaultValue="all"
                style={{ width: 200 }}
                onChange={value => setStatus(value)}
                options={[
                  { value: 'all', label: 'Tất cả trạng thái' },
                  { value: 'Đang xử lý', label: 'Đang xử lý' },
                  { value: 'Đã giao hàng', label: 'Đã giao hàng' },
                ]}
              />
              <RangePicker />
            </Space>
            <Table 
              columns={orderColumns}
              dataSource={filteredOrders}
              pagination={{ pageSize: 10 }}
              className="w-full"
            />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
