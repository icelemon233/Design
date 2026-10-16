import React from 'react';
import type { CinnaStatus } from '../shared';

export interface ResultProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  status?: CinnaStatus | '403' | '404' | '500';
  title: React.ReactNode;
  subTitle?: React.ReactNode;
  extra?: React.ReactNode;
  icon?: React.ReactNode;
}
