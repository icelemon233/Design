import React, { useEffect, useRef, useState } from 'react';
import { cx } from '../../utils/cx';
import { clampNumber, normalizePopupCssValue } from '../shared';
import type { StepItem, StepStatus, StepsLabelPlacement, StepsProps } from './types';
export type {
  StepItem,
  StepStatus,
  StepsDirection,
  StepsLabelPlacement,
  StepsMarkerShape,
  StepsProps,
  StepsType,
} from './types';

const normalizeStepsLabelPlacement = (placement: StepsLabelPlacement) =>
  placement === 'vertical' ? 'bottom' : placement === 'horizontal' ? 'right' : placement;

const renderStepMarker = (item: StepItem, index: number, status: StepStatus) => {
  if (item.logo !== undefined) return item.logo;
  if (item.icon !== undefined) return item.icon;
  if (status === 'finish') return '✓';
  if (status === 'error') return '!';
  if (status === 'loading') return <span className="cinna-step__spinner" aria-hidden="true" />;
  return index + 1;
};

const getStepDescription = (item: StepItem) => item.description ?? item.content;

export const Steps = React.forwardRef<HTMLDivElement, StepsProps>(
  (
    {
      items,
      current,
      defaultCurrent = 0,
      direction = 'horizontal',
      size = 'medium',
      status = 'process',
      labelPlacement = 'right',
      type = 'default',
      clickable = false,
      underline = false,
      markerShape = 'circle',
      connector,
      connectorCount = 1,
      connectorColor,
      markerFontSize,
      markerFontWeight,
      markerColor,
      markerBackgroundColor,
      markerBorderColor,
      titleFontSize,
      titleFontWeight,
      titleColor,
      subTitleFontSize,
      subTitleColor,
      descriptionFontSize,
      descriptionColor,
      onChange,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const [innerCurrent, setInnerCurrent] = useState(defaultCurrent);
    const [motion, setMotion] = useState<{ from: number; to: number; id: number } | null>(null);
    const previousActiveRef = useRef<number | null>(null);
    const motionIdRef = useRef(0);
    const motionTimeoutRef = useRef<number | undefined>(undefined);
    const maxStepIndex = Math.max(0, items.length - 1);
    const active = clampNumber(current ?? innerCurrent, 0, maxStepIndex);
    const isControlled = current !== undefined;
    const normalizedLabelPlacement = normalizeStepsLabelPlacement(labelPlacement);
    const repeatedConnectorCount = Math.max(1, Math.round(connectorCount));
    const hasCustomConnector = connector !== undefined;
    const stepsStyle = {
      ...(connectorColor ? { '--cinna-steps-connector-color': connectorColor } : null),
      ...(markerFontSize !== undefined
        ? { '--cinna-steps-marker-font-size': normalizePopupCssValue(markerFontSize) }
        : null),
      ...(markerFontWeight !== undefined
        ? { '--cinna-steps-marker-font-weight': markerFontWeight }
        : null),
      ...(markerColor ? { '--cinna-steps-marker-color': markerColor } : null),
      ...(markerBackgroundColor ? { '--cinna-steps-marker-bg': markerBackgroundColor } : null),
      ...(markerBorderColor ? { '--cinna-steps-marker-border': markerBorderColor } : null),
      ...(titleFontSize !== undefined
        ? { '--cinna-steps-title-font-size': normalizePopupCssValue(titleFontSize) }
        : null),
      ...(titleFontWeight !== undefined
        ? { '--cinna-steps-title-font-weight': titleFontWeight }
        : null),
      ...(titleColor ? { '--cinna-steps-title-color': titleColor } : null),
      ...(subTitleFontSize !== undefined
        ? { '--cinna-steps-subtitle-font-size': normalizePopupCssValue(subTitleFontSize) }
        : null),
      ...(subTitleColor ? { '--cinna-steps-subtitle-color': subTitleColor } : null),
      ...(descriptionFontSize !== undefined
        ? { '--cinna-steps-description-font-size': normalizePopupCssValue(descriptionFontSize) }
        : null),
      ...(descriptionColor ? { '--cinna-steps-description-color': descriptionColor } : null),
      ...style,
    } as React.CSSProperties;

    useEffect(() => {
      if (previousActiveRef.current === null) {
        previousActiveRef.current = active;
        return;
      }
      const previous = clampNumber(previousActiveRef.current, 0, maxStepIndex);
      if (previous === active) return;

      motionIdRef.current += 1;
      if (motionTimeoutRef.current !== undefined) window.clearTimeout(motionTimeoutRef.current);
      setMotion({ from: previous, to: active, id: motionIdRef.current });
      previousActiveRef.current = active;
      motionTimeoutRef.current = window.setTimeout(() => setMotion(null), 560);
    }, [active, maxStepIndex]);

    useEffect(() => {
      return () => {
        if (motionTimeoutRef.current !== undefined) window.clearTimeout(motionTimeoutRef.current);
      };
    }, []);

    const getStatus = (item: StepItem, index: number): StepStatus => {
      if (item.status) return item.status;
      if (index < active) return 'finish';
      if (index === active) return status;
      return 'wait';
    };

    const handleStepClick = (
      item: StepItem,
      index: number,
      event: React.MouseEvent<HTMLElement>,
    ) => {
      if (item.disabled) return;
      const canClick = clickable || Boolean(onChange) || Boolean(item.onClick);
      if (!canClick) return;
      if (!isControlled) setInnerCurrent(index);
      item.onClick?.(index, event);
      onChange?.(index, item, event);
    };

    const renderConnector = (index: number) => {
      if (index >= items.length - 1) return null;
      const connectorInMotion =
        motion &&
        (motion.to > motion.from
          ? index >= motion.from && index < motion.to
          : index >= motion.to && index < motion.from);
      return (
        <span
          className={cx(
            'cinna-step__connector',
            index < active && 'cinna-step__connector--finish',
            connectorInMotion && 'cinna-step__connector--motion',
            connectorInMotion && motion.to < motion.from && 'cinna-step__connector--motion-reverse',
            hasCustomConnector && 'cinna-step__connector--custom',
          )}
          aria-hidden="true"
        >
          {hasCustomConnector ? (
            Array.from({ length: repeatedConnectorCount }, (_, connectorIndex) => (
              <span key={connectorIndex} className="cinna-step__connector-token">
                {connector}
              </span>
            ))
          ) : (
            <span className="cinna-step__connector-line" />
          )}
        </span>
      );
    };

    const renderStep = (item: StepItem, index: number) => {
      const stepStatus = getStatus(item, index);
      const stepDescription = getStepDescription(item);
      const interactive =
        !item.disabled && (clickable || Boolean(onChange) || Boolean(item.onClick));
      const StepTag = interactive ? 'button' : 'div';

      return (
        <StepTag
          key={item.key ?? index}
          type={interactive ? 'button' : undefined}
          className={cx(
            'cinna-step',
            `cinna-step--${stepStatus}`,
            index === active && 'cinna-step--current',
            index < active && 'cinna-step--done',
            motion?.to === index && 'cinna-step--motion-current',
            motion?.from === index && 'cinna-step--motion-previous',
            interactive && 'cinna-step--clickable',
            item.disabled && 'cinna-step--disabled',
            item.className,
          )}
          style={item.style}
          aria-current={index === active ? 'step' : undefined}
          disabled={interactive ? item.disabled : undefined}
          onClick={(event) => handleStepClick(item, index, event)}
        >
          <span className="cinna-step__marker" aria-hidden="true">
            {renderStepMarker(item, index, stepStatus)}
          </span>
          <span className="cinna-step__body">
            <span className="cinna-step__header">
              <strong className="cinna-step__title">{item.title}</strong>
              {item.subTitle && <small className="cinna-step__subtitle">{item.subTitle}</small>}
            </span>
            {stepDescription && (
              <small className="cinna-step__description">{stepDescription}</small>
            )}
          </span>
        </StepTag>
      );
    };

    if (type === 'minimal') {
      const activeItem = items[active];
      const activeDescription = activeItem ? getStepDescription(activeItem) : null;

      return (
        <div
          ref={ref}
          className={cx(
            'cinna-steps',
            'cinna-steps--minimal',
            `cinna-steps--${direction}`,
            `cinna-steps--${size}`,
            `cinna-steps--marker-${markerShape}`,
            className,
          )}
          style={stepsStyle}
          {...rest}
        >
          <div className="cinna-steps__minimal-dots" role="list">
            {items.map((item, index) => {
              const stepStatus = getStatus(item, index);
              const interactive =
                !item.disabled && (clickable || Boolean(onChange) || Boolean(item.onClick));
              const DotTag = interactive ? 'button' : 'span';

              return (
                <DotTag
                  key={item.key ?? index}
                  type={interactive ? 'button' : undefined}
                  className={cx(
                    'cinna-step__minimal-dot',
                    `cinna-step__minimal-dot--${stepStatus}`,
                    index === active && 'cinna-step__minimal-dot--current',
                    motion?.to === index && 'cinna-step__minimal-dot--motion-current',
                    interactive && 'cinna-step__minimal-dot--clickable',
                    item.disabled && 'cinna-step__minimal-dot--disabled',
                  )}
                  aria-label={typeof item.title === 'string' ? item.title : `Step ${index + 1}`}
                  aria-current={index === active ? 'step' : undefined}
                  disabled={interactive ? item.disabled : undefined}
                  onClick={(event) => handleStepClick(item, index, event)}
                />
              );
            })}
          </div>
          {activeItem && (
            <div className="cinna-steps__minimal-summary">
              <strong className="cinna-step__title">{activeItem.title}</strong>
              {activeDescription && (
                <small className="cinna-step__description">{activeDescription}</small>
              )}
            </div>
          )}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cx(
          'cinna-steps',
          `cinna-steps--${direction}`,
          `cinna-steps--${size}`,
          `cinna-steps--label-${normalizedLabelPlacement}`,
          `cinna-steps--marker-${markerShape}`,
          underline && 'cinna-steps--underline',
          clickable && 'cinna-steps--clickable',
          className,
        )}
        style={stepsStyle}
        {...rest}
      >
        {items.map((item, index) => (
          <React.Fragment key={item.key ?? index}>
            {renderStep(item, index)}
            {renderConnector(index)}
          </React.Fragment>
        ))}
      </div>
    );
  },
);

Steps.displayName = 'Steps';
