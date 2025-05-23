import { Table, Button, Space, Input, Card, Modal, Form, Select, InputNumber } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';

export default function Products() {
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

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
      sorter: (a: any, b: any) => a.name.localeCompare(b.name)
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `$${price}`,
      sorter: (a: any, b: any) => a.price - b.price
    },
    {
      title: 'Tồn kho',
      dataIndex: 'stock',
      key: 'stock',
      sorter: (a: any, b: any) => a.stock - b.stock
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
      filters: [
        { text: 'Electronics', value: 'Electronics' }
      ],
      onFilter: (value: any, record: any) => record.category === value
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
            placeholder="Tìm kiếm sản phẩm..."
            prefix={<SearchOutlined />}
            style={{ width: 300 }}
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
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

      <Modal
        title="Thêm sản phẩm mới"
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
            label="Tên sản phẩm"
            rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Giá"
            rules={[{ required: true, message: 'Vui lòng nhập giá' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value!.replace(/\$\s?|(,*)/g, '')}
            />
          </Form.Item>
          <Form.Item
            name="stock"
            label="Tồn kho"
            rules={[{ required: true, message: 'Vui lòng nhập số lượng tồn kho' }]}
          >
            <InputNumber style={{ width: '100%' }} min={0} />
          </Form.Item>
          <Form.Item
            name="category"
            label="Danh mục"
            rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}
          >
            <Select>
              <Select.Option value="Electronics">Electronics</Select.Option>
              <Select.Option value="Clothing">Clothing</Select.Option>
              <Select.Option value="Books">Books</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="status"
            label="Trạng thái"
            rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
          >
            <Select>
              <Select.Option value="In Stock">In Stock</Select.Option>
              <Select.Option value="Out of Stock">Out of Stock</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
