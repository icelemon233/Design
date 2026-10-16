import React from 'react';

export interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'small' | 'medium' | 'large';
  label?: React.ReactNode;
  active?: boolean;
}
