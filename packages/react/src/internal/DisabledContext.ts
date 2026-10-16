import { createContext, useContext } from 'react';

export const DisabledContext = createContext(false);

/** Composite controls must honor Form.disabled just like native fieldset controls. */
export function useDisabled(disabled?: boolean) {
  return useContext(DisabledContext) || !!disabled;
}
