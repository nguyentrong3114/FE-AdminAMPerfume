import { useState, useEffect } from 'react';
import {
  Table,
  Input,
  DatePicker,
  Select,
  Space,
  Button,
  Card,
  Tag
} from 'antd';
import { Line } from '@ant-design/plots';
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import { OrderModal } from '@/components/modals/OrderModal';
import gsap from 'gsap';
import { useQuery } from '@tanstack/react-query';
import { OrderService } from '@/services/orderService';
import type { OrderListResponse, OrderDTO } from '@/types/Order';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

type OrderFormData = {
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  notes?: string;
};

const chartData = [
  { date: '2024-01', value: 3 },
  { date: '2024-02', value: 4 },
  { date: '2024-03', value: 6 },
  { date: '2024-04', value: 5 },
  { date: '2024-05', value: 8 },
];

export default function OrderPage() {
  const [searchText, setSearchText] = useState('');
  const [status, setStatus] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderFormData>();
  const [pagination, setPagination] = useState({ current: 1, size: 10 });
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null]>([null, null]);
  const [searchDate, setSearchDate] = useState<dayjs.Dayjs | null>(null);
  const [dateSearchType, setDateSearchType] = useState<'single' | 'range'>('single');

  useEffect(() => {
    gsap.from('.page-content', {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: 'power2.out'
    });
  }, []);

  const { data, isLoading } = useQuery<OrderListResponse>({
    queryKey: ['orders', pagination.current, pagination.size, searchText, dateRange, searchDate],
    queryFn: () => {
      if (dateSearchType === 'range') {
        const [startDate, endDate] = dateRange;
        return OrderService.getOrders(
          pagination.current,
          pagination.size,
          searchText,
          startDate?.format('YYYY-MM-DD'),
          endDate?.format('YYYY-MM-DD')
        );
      } else {
        return OrderService.getOrders(
          pagination.current,
          pagination.size,
          searchText,
          searchDate?.format('YYYY-MM-DD'),
          searchDate?.format('YYYY-MM-DD')
        );
      }
    },
    staleTime: 0
  });

  const handleEdit = (order: OrderDTO) => {
    const formData: OrderFormData = {
      fullName: order.fullName,
      email: order.email,
      phoneNumber: order.phoneNumber || '',
      address: order.address,
      status: order.status as OrderFormData['status'],
      notes: ''
    };
    setSelectedOrder(formData);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedOrder(undefined);
    setIsModalOpen(true);
  };

  const handleSubmit = async (data: OrderFormData) => {
    setIsSubmitting(true);
    try {
      console.log('Submitted:', data);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCurrency = (amount: number) =>
    amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

  const orderColumns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'orderCode',
      key: 'orderCode'
    },
    {
      title: 'Tên khách hàng',
      dataIndex: 'fullName',
      key: 'fullName'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber'
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const map: Record<string, string> = {
          pending: 'Chờ xử lý',
          processing: 'Đang xử lý',
          shipped: 'Đang giao hàng',
          delivered: 'Đã giao hàng',
          cancelled: 'Đã hủy'
        };
        const colorMap: Record<string, string> = {
          pending: 'default',
          processing: 'blue',
          shipped: 'orange',
          delivered: 'green',
          cancelled: 'red'
        };
        return <Tag color={colorMap[status]}>{map[status] || status}</Tag>;
      }
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (val: number) => formatCurrency(val)
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: unknown, record: OrderDTO) => (
        <Button
          type="text"
          icon={<EditOutlined />}
          onClick={() => handleEdit(record)}
        />
      )
    }
  ];

  const filteredOrders = (data?.items || []).filter((order) => {
    const matchSearch =
      order.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
      order.email.toLowerCase().includes(searchText.toLowerCase()) ||
      order.phoneNumber?.includes(searchText) ||
      order.address.toLowerCase().includes(searchText.toLowerCase());
    const matchStatus = status === 'all' || order.status === status;
    return matchSearch && matchStatus;
  });

  const chartConfig = {
    data: chartData,
    xField: 'date',
    yField: 'value',
    point: { size: 2, shape: 'diamond' },
    label: { style: { fill: '#aaa' } }
  };

  return (
    <div className="p-4">
      <div className="page-content">
        <Card title="Thống kê đơn hàng" className="mb-6">
          <p className="text-gray-500 mb-4">Biểu đồ số lượng đơn hàng theo tháng</p>
          <Line {...chartConfig} />
        </Card>

        <Card title="Quản lý đơn hàng">
          <Space className="mb-4" size="large" wrap>
            <Input
              placeholder="Tìm kiếm đơn hàng..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 300 }}
            />
            <Select
              defaultValue="all"
              style={{ width: 200 }}
              onChange={(value) => setStatus(value)}
              options={[
                { value: 'all', label: 'Tất cả trạng thái' },
                { value: 'pending', label: 'Chờ xử lý' },
                { value: 'processing', label: 'Đang xử lý' },
                { value: 'shipped', label: 'Đang giao hàng' },
                { value: 'delivered', label: 'Đã giao hàng' },
                { value: 'cancelled', label: 'Đã hủy' }
              ]}
            />
            <Select
              value={dateSearchType}
              onChange={(value) => {
                setDateSearchType(value);
                setSearchDate(null);
                setDateRange([null, null]);
              }}
              style={{ width: 200 }}
              options={[
                { value: 'single', label: 'Tìm theo ngày cụ thể' },
                { value: 'range', label: 'Tìm theo khoảng thời gian' }
              ]}
            />
            {dateSearchType === 'single' ? (
              <DatePicker
                value={searchDate}
                onChange={(date) => setSearchDate(date)}
                format="DD/MM/YYYY"
                placeholder="Chọn ngày"
                style={{ width: 200 }}
              />
            ) : (
              <RangePicker 
                value={dateRange}
                onChange={(dates) => setDateRange(dates as [dayjs.Dayjs | null, dayjs.Dayjs | null])}
                format="DD/MM/YYYY"
                placeholder={['Từ ngày', 'Đến ngày']}
                style={{ width: 300 }}
              />
            )}
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
              Thêm đơn hàng
            </Button>
          </Space>

          <Table
            columns={orderColumns}
            dataSource={filteredOrders}
            loading={isLoading}
            rowKey="orderCode"
            pagination={{
              current: pagination.current,
              pageSize: pagination.size,
              total: data?.totalItems || 0,
              onChange: (page, size) => setPagination({ current: page, size })
            }}
          />
        </Card>

        <OrderModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          initialData={selectedOrder}
          isLoading={isSubmitting}
        />
      </div>
    </div>
  );
}
