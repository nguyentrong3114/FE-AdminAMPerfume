import { message } from 'antd';

type MessageType = 'success' | 'error' | 'warning' | 'info';

export const showMessage = (type: MessageType, content: string) => {
  message[type](content);
};

export const messageSuccess = (content: string) => {
  message.success(content);
};

export const messageError = (content: string) => {
  message.error(content);
};

export const messageWarning = (content: string) => {
  message.warning(content);
};

export const messageInfo = (content: string) => {
  message.info(content);
};
