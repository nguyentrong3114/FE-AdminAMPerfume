import { Table, Button, Space, Input, Card } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';

export default function Products() {
  const [searchText, setSearchText] = useState('');

  const dataSource = [
    {
      key: '1',
      name: 'iPhone 13 Pro',
      price: 999,
      stock: 50,
      category: 'Electronics',
      status: 'In Stock'
    },
    {
      key: '2', 
      name: 'MacBook Pro',
      price: 1299,
      stock: 30,
      category: 'Electronics',
      status: 'In Stock'
    },
    {
      key: '3',
      name: 'AirPods Pro',
      price: 249,
      stock: 0,
      category: 'Electronics', 
      status: 'Out of Stock'
    }
  ];

  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name)
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `$${price}`,
      sorter: (a: { price: number }, b: { price: number }) => a.price - b.price
    },
    {
      title: 'Tồn kho',
      dataIndex: 'stock',
      key: 'stock',
      sorter: (a: { stock: number }, b: { stock: number }) => a.stock - b.stock
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
      filters: [
        { text: 'Electronics', value: 'Electronics' }
      ],
      onFilter: (value: string, record: { category: string }) => record.category === value
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status'
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button type="link">Sửa</Button>
          <Button type="link" danger>Xóa</Button>
        </Space>
      )
    }
  ];

  return (
    <div className="p-6">
      <Card>
        <div className="flex justify-between mb-4">
          <Input 
            placeholder="Tìm kiếm sản phẩm..."
            prefix={<SearchOutlined />}
            style={{ width: 300 }}
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
          <Button type="primary" icon={<PlusOutlined />}>
            Thêm sản phẩm mới
          </Button>
        </div>

        <Table 
          dataSource={dataSource.filter(item => 
            item.name.toLowerCase().includes(searchText.toLowerCase())
          )}
          columns={columns}
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
}
