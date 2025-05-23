import { Table, Button, Space, Input, Card, Modal, Form, Select } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';

export default function Users() {
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

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
      sorter: (a: any, b: any) => a.name.localeCompare(b.name)
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
      onFilter: (value: any, record: any) => record.role === value
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

  const handleOk = () => {
    form.validateFields().then(values => {
      console.log('Form values:', values);
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

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
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
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

      <Modal
        title="Thêm người dùng mới"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="Tên người dùng"
            rules={[{ required: true, message: 'Vui lòng nhập tên người dùng' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Vui lòng nhập email' },
              { type: 'email', message: 'Email không hợp lệ' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="role"
            label="Vai trò"
            rules={[{ required: true, message: 'Vui lòng chọn vai trò' }]}
          >
            <Select>
              <Select.Option value="Admin">Admin</Select.Option>
              <Select.Option value="User">User</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="status"
            label="Trạng thái"
            rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
          >
            <Select>
              <Select.Option value="Hoạt động">Hoạt động</Select.Option>
              <Select.Option value="Bị khóa">Bị khóa</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
