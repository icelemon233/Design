import React from 'react';
import type { CinnaStatus } from './types';
export type { CinnaSize, CinnaStatus, GridGap, TreeNodeData } from './types';

export const normalizePopupCssValue = (value: number | string | undefined) =>
  typeof value === 'number' ? `${value}px` : value;

export function statusIcon(status: CinnaStatus) {
  return status === 'success' ? '✓' : status === 'warning' ? '!' : status === 'error' ? '!' : 'i';
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, Math.round(value)));
}

export function clampNumber(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function renderCell(value: unknown): React.ReactNode {
  if (React.isValidElement(value)) return value;
  if (value === null || value === undefined) return '-';
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}

export function toArray(value: string | string[] | undefined) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}
