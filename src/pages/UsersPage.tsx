import { Table, Button, Space, Input, Card } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';

export default function Users() {
  const [searchText, setSearchText] = useState('');

  const dataSource = [
    {
      key: '1',
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@gmail.com',
      phone: '0123456789',
      role: 'Admin',
      status: 'Hoạt động'
    },
    {
      key: '2',
      name: 'Trần Thị B', 
      email: 'tranthib@gmail.com',
      phone: '0987654321',
      role: 'User',
      status: 'Hoạt động'
    },
    {
      key: '3',
      name: 'Lê Văn C',
      email: 'levanc@gmail.com', 
      phone: '0369852147',
      role: 'User',
      status: 'Bị khóa'
    }
  ];

  const columns = [
    {
      title: 'Tên người dùng',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: string, b: string) => a.localeCompare(b)
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
      filters: [
        { text: 'Admin', value: 'Admin' },
        { text: 'User', value: 'User' }
      ],
      onFilter: (value: string, record: { role: string; }) => record.role === value
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
            placeholder="Tìm kiếm người dùng..."
            prefix={<SearchOutlined />}
            style={{ width: 300 }}
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
          <Button type="primary" icon={<PlusOutlined />}>
            Thêm người dùng mới
          </Button>
        </div>

        <Table 
          dataSource={dataSource.filter(item => 
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.email.toLowerCase().includes(searchText.toLowerCase())
          )}
          columns={columns}
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
}
