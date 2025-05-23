import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Table, Input, DatePicker, Select, Space, Button } from 'antd';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Line } from '@ant-design/plots';
import { SearchOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';
import { OrderModal } from '@/components/modals/OrderModal';

const { RangePicker } = DatePicker;

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  notes?: string;
  total: string;
}

type OrderFormData = Omit<Order, 'id' | 'total'>;

const mockData: Order[] = [
  {
    id: 'DH001',
    customerName: 'Nguyễn Văn A',
    customerEmail: 'nguyenvana@example.com',
    customerPhone: '0123456789',
    shippingAddress: '123 Đường ABC, Phường XYZ, Quận 1, TP.HCM',
    status: 'processing',
    total: '1.500.000đ'
  },
  {
    id: 'DH002', 
    customerName: 'Trần Thị B',
    customerEmail: 'tranthib@example.com',
    customerPhone: '0987654321',
    shippingAddress: '456 Đường DEF, Phường UVW, Quận 2, TP.HCM',
    status: 'delivered',
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
  const [orders] = useState<Order[]>(mockData);
  const [searchText, setSearchText] = useState('');
  const [status, setStatus] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderFormData | undefined>(undefined);

  const handleEdit = (order: Order) => {
    const formData: OrderFormData = {
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      customerPhone: order.customerPhone,
      shippingAddress: order.shippingAddress,
      status: order.status,
      notes: order.notes
    };
    setSelectedOrder(formData);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedOrder(undefined);
    setIsModalOpen(true);
  };

  const handleSubmit = async (data: OrderFormData) => {
    setIsLoading(true);
    try {
      // Xử lý logic thêm/cập nhật
      console.log('Data submitted:', data);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

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
      title: 'Email',
      dataIndex: 'customerEmail',
      key: 'customerEmail',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'customerPhone',
      key: 'customerPhone',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'shippingAddress',
      key: 'shippingAddress',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusMap: Record<string, string> = {
          pending: 'Chờ xử lý',
          processing: 'Đang xử lý',
          shipped: 'Đang giao hàng',
          delivered: 'Đã giao hàng',
          cancelled: 'Đã hủy'
        };
        return statusMap[status] || status;
      }
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: unknown, record: Order) => (
        <Button
          type="text"
          icon={<EditOutlined />}
          onClick={() => handleEdit(record)}
        />
      ),
    }
  ];

  const config = {
    data: chartData,
    xField: 'date',
    yField: 'value',
    point: {
      size: 2,
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
                       order.customerPhone.includes(searchText);
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
          <CardHeader className="space-y-2 p-2">
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
                  { value: 'pending', label: 'Chờ xử lý' },
                  { value: 'processing', label: 'Đang xử lý' },
                  { value: 'shipped', label: 'Đang giao hàng' },
                  { value: 'delivered', label: 'Đã giao hàng' },
                  { value: 'cancelled', label: 'Đã hủy' },
                ]}
              />
              <RangePicker />
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={handleAdd}
              >
                Thêm đơn hàng
              </Button>
            </Space>
            <Table 
              columns={orderColumns}
              dataSource={filteredOrders}
              pagination={{ pageSize: 10 }}
              className="w-full"
            />
          </CardContent>
        </Card>

        <OrderModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          initialData={selectedOrder}
          isLoading={isLoading}
        />
      </motion.div>
    </div>
  );
}
