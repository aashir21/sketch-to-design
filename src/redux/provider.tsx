"use client";
import React, { ReactNode, useRef } from 'react'
import { makeStore } from './store';
import { RootState } from './store';
import { Provider } from 'react-redux';

function ReduxProvider({ children, preloadedState }: { children: ReactNode, preloadedState?: Partial<RootState> }) {

  const storeRef = useRef(makeStore(preloadedState))
  return <Provider store={storeRef.current}>{children}</Provider>

}

export default ReduxProvider