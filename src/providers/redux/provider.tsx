"use client";
import { makeStore, RootState } from '@/redux/store';
import React, { ReactNode, useRef } from 'react'
import { Provider } from 'react-redux';

function ReduxProvider({ children, preloadedState }: { children: ReactNode, preloadedState?: Partial<RootState> }) {

  const storeRef = useRef(makeStore(preloadedState))
  return <Provider store={storeRef.current}>{children}</Provider>

}

export default ReduxProvider