import React from 'react';

export type CardTone = 'cream' | 'blue' | 'butter' | 'strawberry' | 'pistachio' | 'lavender';

export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  tone?: CardTone;
  title?: React.ReactNode;
  extra?: React.ReactNode;
  interactive?: boolean;
  padded?: boolean;
}
