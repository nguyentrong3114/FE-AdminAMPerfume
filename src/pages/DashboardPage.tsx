import { Card, Row, Col, Statistic, Table, Button } from 'antd';
import { UserOutlined, ShoppingCartOutlined, DollarOutlined, ShoppingOutlined } from '@ant-design/icons';

export default function Dashboard() {
  const recentOrders = [
    { key: '1', orderNo: '#12345', customer: 'John Doe', amount: '$120', status: 'Completed' },
    { key: '2', orderNo: '#12346', customer: 'Jane Smith', amount: '$85', status: 'Pending' },
    { key: '3', orderNo: '#12347', customer: 'Bob Wilson', amount: '$250', status: 'Processing' },
  ];

  const columns = [
    { title: 'Order No', dataIndex: 'orderNo', key: 'orderNo' },
    { title: 'Customer', dataIndex: 'customer', key: 'customer' },
    { title: 'Amount', dataIndex: 'amount', key: 'amount' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
  ];

  return (
    <div className="p-6">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Sales"
              value={112893}
              precision={2}
              prefix={<DollarOutlined />}
              suffix="$"
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Orders"
              value={1893}
              prefix={<ShoppingCartOutlined />}
              valueStyle={{ color: '#1677ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Users"
              value={458}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Products"
              value={278}
              prefix={<ShoppingOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
      </Row>

      <Card title="Recent Orders" className="mt-6">
        <Table columns={columns} dataSource={recentOrders} pagination={false} />
      </Card>
    </div>
  );
}
