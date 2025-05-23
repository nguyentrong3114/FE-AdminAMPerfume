import { Card, Tabs, Badge, Button, Space, Typography, List, Tag } from 'antd';
import {
  CheckCircleOutlined,
  WarningOutlined,
  InfoCircleOutlined,
  CheckOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import type { Notification, NotificationType } from '../components/notifications/NotificationDropdown';

const { Text, Title } = Typography;

const getTypeColor = (type: NotificationType) => {
  switch (type) {
    case 'success':
      return 'text-green-500';
    case 'warning':
      return 'text-yellow-500';
    case 'info':
    default:
      return 'text-blue-500';
  }
};

const getNotificationIcon = (type: NotificationType) => {
  const colorClass = getTypeColor(type);
  switch (type) {
    case 'success':
      return <CheckCircleOutlined className={`${colorClass} text-lg`} />;
    case 'warning':
      return <WarningOutlined className={`${colorClass} text-lg`} />;
    case 'info':
    default:
      return <InfoCircleOutlined className={`${colorClass} text-lg`} />;
  }
};

const getTypeTag = (type: NotificationType) => {
  switch (type) {
    case 'success':
      return <Tag color="success">Thành công</Tag>;
    case 'warning':
      return <Tag color="warning">Cảnh báo</Tag>;
    case 'info':
    default:
      return <Tag color="info">Thông tin</Tag>;
  }
};

// Dữ liệu mẫu
const notifications: Notification[] = [
  {
    id: 1,
    title: "Đơn hàng mới",
    description: "Bạn có đơn hàng mới #12345",
    time: "5 phút trước",
    type: "success"
  },
  {
    id: 2,
    title: "Cảnh báo tồn kho",
    description: "Sản phẩm iPhone 13 Pro sắp hết hàng",
    time: "1 giờ trước",
    type: "warning"
  },
  {
    id: 3,
    title: "Cập nhật hệ thống",
    description: "Hệ thống sẽ được bảo trì vào 22:00",
    time: "2 giờ trước",
    type: "info"
  },
  {
    id: 4,
    title: "Đơn hàng đã hoàn thành",
    description: "Đơn hàng #12340 đã được giao thành công",
    time: "3 giờ trước",
    type: "success"
  },
  {
    id: 5,
    title: "Khuyến mãi mới",
    description: "Chương trình khuyến mãi tháng 12 đã bắt đầu",
    time: "5 giờ trước",
    type: "info"
  }
];

export default function NotificationPage() {
  const items = [
    {
      key: 'all',
      label: (
        <span>
          Tất cả
          <Badge count={notifications.length} className="ml-2" />
        </span>
      ),
      children: (
        <List
          itemLayout="horizontal"
          dataSource={notifications}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button type="text" icon={<CheckOutlined />} key="mark-read">
                  Đánh dấu đã đọc
                </Button>,
                <Button type="text" danger icon={<DeleteOutlined />} key="delete">
                  Xóa
                </Button>
              ]}
            >
              <List.Item.Meta
                avatar={getNotificationIcon(item.type)}
                title={
                  <Space>
                    <span className={`font-medium ${getTypeColor(item.type)}`}>{item.title}</span>
                    {getTypeTag(item.type)}
                  </Space>
                }
                description={
                  <Space direction="vertical" size={0}>
                    <Text className="text-gray-700 dark:text-gray-300">{item.description}</Text>
                    <Text type="secondary" className="text-xs text-gray-500 dark:text-gray-400">
                      {item.time}
                    </Text>
                  </Space>
                }
              />
            </List.Item>
          )}
        />
      ),
    },
    {
      key: 'unread',
      label: (
        <span>
          Chưa đọc
          <Badge count={3} className="ml-2" />
        </span>
      ),
      children: (
        <List
          itemLayout="horizontal"
          dataSource={notifications.slice(0, 3)}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button type="text" icon={<CheckOutlined />} key="mark-read">
                  Đánh dấu đã đọc
                </Button>,
                <Button type="text" danger icon={<DeleteOutlined />} key="delete">
                  Xóa
                </Button>
              ]}
            >
              <List.Item.Meta
                avatar={getNotificationIcon(item.type)}
                title={
                  <Space>
                    <span className={`font-medium ${getTypeColor(item.type)}`}>{item.title}</span>
                    {getTypeTag(item.type)}
                  </Space>
                }
                description={
                  <Space direction="vertical" size={0}>
                    <Text className="text-gray-700 dark:text-gray-300">{item.description}</Text>
                    <Text type="secondary" className="text-xs text-gray-500 dark:text-gray-400">
                      {item.time}
                    </Text>
                  </Space>
                }
              />
            </List.Item>
          )}
        />
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <Title level={2} className="m-0">Thông báo</Title>
          <Text type="secondary">Quản lý và xem tất cả thông báo của bạn</Text>
        </div>
        <Space>
          <Button icon={<CheckOutlined />}>Đánh dấu tất cả đã đọc</Button>
          <Button danger icon={<DeleteOutlined />}>Xóa tất cả</Button>
        </Space>
      </div>

      <Card>
        <Tabs
          defaultActiveKey="all"
          items={items}
          className="notification-tabs"
        />
      </Card>
    </div>
  );
} 