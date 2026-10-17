import React from 'react';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: 'blue' | 'butter' | 'strawberry' | 'pistachio' | 'lavender' | 'cream';
  closable?: boolean;
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  bordered?: boolean;
  icon?: React.ReactNode;
}
