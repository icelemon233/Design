import type React from 'react';

/** A picker must notify existing native-input consumers after a panel selection. */
export function inputChange<T extends HTMLInputElement | HTMLTextAreaElement>(
  node: T,
  value: string,
): React.ChangeEvent<T> {
  const prototype =
    node instanceof HTMLTextAreaElement
      ? HTMLTextAreaElement.prototype
      : HTMLInputElement.prototype;
  Object.getOwnPropertyDescriptor(prototype, 'value')?.set?.call(node, value);
  const nativeEvent = new Event('change', { bubbles: true });
  return {
    nativeEvent,
    currentTarget: node,
    target: node,
    bubbles: true,
    cancelable: false,
    defaultPrevented: false,
    eventPhase: 3,
    isTrusted: false,
    timeStamp: nativeEvent.timeStamp,
    type: 'change',
    preventDefault: () => nativeEvent.preventDefault(),
    stopPropagation: () => nativeEvent.stopPropagation(),
    isDefaultPrevented: () => nativeEvent.defaultPrevented,
    isPropagationStopped: () => nativeEvent.cancelBubble,
    persist() {},
  };
}
