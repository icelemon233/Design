import React from 'react';
import { type NoticeConfig } from '../../hooks/useNoticeQueue';
import type { MessageProps } from '../message';

export interface NotificationProps extends Omit<MessageProps, 'title'> {
  title?: React.ReactNode;
  actions?: React.ReactNode;
}

export interface NotificationConfig extends NoticeConfig {
  title?: React.ReactNode;
  content: React.ReactNode;
  type?: MessageProps['type'];
  icon?: React.ReactNode;
  actions?: React.ReactNode;
}

export type NotificationPlacement = 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft';

export interface NotificationApi {
  open: (config: NotificationConfig) => () => void;
  destroy: (key?: React.Key) => void;
}
