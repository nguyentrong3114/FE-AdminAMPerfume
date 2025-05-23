import { Typography, Dropdown, Badge } from 'antd';
import {
  BellOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';

const { Text } = Typography;

export type NotificationType = 'success' | 'warning' | 'info';

export interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
  type: NotificationType;
}

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

interface NotificationDropdownProps {
  notifications: Notification[];
}

export function NotificationDropdown({ notifications }: NotificationDropdownProps) {
  const notificationItems = [
    {
      key: 'header',
      label: (
        <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
          <Text strong className="text-lg text-gray-900 dark:text-gray-100">Thông báo</Text>
        </div>
      ),
      disabled: true,
    },
    ...notifications.map((item) => ({
      key: item.id,
      label: (
        <div className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-blue-400">
          <div className="flex items-start gap-3">
            {getNotificationIcon(item.type)}
            <div className="flex-1">
              <div className={`font-medium ${getTypeColor(item.type)}`}>{item.title}</div>
              <div className="text-sm text-gray-700 dark:text-gray-300">{item.description}</div>
              <div className="text-xs mt-1 text-gray-500 dark:text-gray-400">{item.time}</div>
            </div>
          </div>
        </div>
      ),
    })),
    {
      key: 'footer',
      label: (
        <div className="px-4 py-2 text-center border-t border-gray-200 dark:border-gray-700">
          <span className="text-blue-500 dark:text-blue-400 hover:underline cursor-pointer text-sm">
            Xem tất cả thông báo
          </span>
        </div>
      ),
      disabled: true,
    },
  ];

  return (
    <Dropdown
      menu={{ items: notificationItems }}
      trigger={['click']}
      placement="bottomRight"
      overlayClassName="z-[1000]"
    >
      <div className="flex items-center cursor-pointer">
        <Badge count={notifications.length} size="small" showZero={false} offset={[0, 5]}>
          <BellOutlined className="text-gray-700 dark:text-gray-300 text-2xl" />
        </Badge>
      </div>
    </Dropdown>
  );
}
