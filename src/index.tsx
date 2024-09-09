'use client'
import { useState, useEffect, ReactElement, JSXElementConstructor, FunctionComponent, Component } from 'react'

import { default as Cookies } from 'js-cookie';

import { BaselimeContext, BaselimeRumConfig } from './context.tsx';
import { WebVitals } from './web-vitals.ts';
import { DispatchQueue } from './dispatch-queue.ts';
import { BaselimeErrorBoundary } from './error-boundary.tsx';
import { ErrorBoundaryPropsWithFallback } from 'react-error-boundary';
import { makeUUID } from './utils/uuid.ts';
export { useBaselimeRum } from './context.tsx';
export { BaselimeErrorBoundary } from './error-boundary.tsx';

export interface BaselimeRumProps {
  apiKey: string,
  dataset?: string,
  service?: string,
  namespace?: string,
  url?: string,
  userId?: string,
  sessionId?: string,
  fallback?: ReactElement<unknown, string | FunctionComponent | typeof Component> | null
  fallbackRender?: ErrorBoundaryPropsWithFallback["fallbackRender"]
  pageLoadId?: string,
  enableLocal?: boolean,
  enableWebVitals?: boolean
  children: React.ReactNode
}

const queue = new DispatchQueue()
export function BaselimeRum(props: BaselimeRumProps) {

  const sessionId = Cookies.get('baselime-session-id')

  if (!sessionId) {
    Cookies.set('baselime-session-id', makeUUID())
  }

  const initialData: BaselimeRumConfig = {
    userId: props.userId,
    sessionId: Cookies.get('baselime-session-id'),
    pageLoadId: makeUUID(),
    namespace: props.namespace,
    apiKey: props.apiKey,
    dataset: props.dataset || "web",
    service: props.service,
    url: props.url || "https://events.baselime.io/v1",
    enableLocal: props.enableLocal || false,
    enableWebVitals: props.enableWebVitals || false,
  }


  const [config, setConfig] = useState(initialData)

  return (<BaselimeContext.Provider value={{ config, setConfig, queue }}>
    <BaselimeErrorBoundary fallback={props.fallback} fallbackRender={props.fallbackRender}>
      <WebVitals>
        {props.children}
      </WebVitals>
    </BaselimeErrorBoundary>
  </BaselimeContext.Provider>
  );
}