import React from 'react';
import { type NoticeConfig } from '../../hooks/useNoticeQueue';
import type { CinnaStatus } from '../shared';

export interface MessageProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
  type?: CinnaStatus;
  content: React.ReactNode;
  icon?: React.ReactNode;
  closable?: boolean;
  onClose?: () => void;
  duration?: number;
}

export interface MessageConfig extends NoticeConfig {
  type?: CinnaStatus;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

export interface MessageApi {
  open: (config: MessageConfig) => () => void;
  destroy: (key?: React.Key) => void;
  info: (content: React.ReactNode, duration?: number) => () => void;
  success: (content: React.ReactNode, duration?: number) => () => void;
  warning: (content: React.ReactNode, duration?: number) => () => void;
  error: (content: React.ReactNode, duration?: number) => () => void;
}
