'use client'
import { ReactNode } from 'react'

import { default as Cookies } from 'js-cookie';

import { BaselimeContext } from './context.tsx';
import { WebVitals } from './web-vitals.ts';

interface BaselimeRumConfig {
  apiKey: string,
  enableWebVitals?: boolean,
  enableLocal?: boolean,
  children: ReactNode,
  dataset?: string,
  service?: string,
  url?: string,
  userId?: string
}
export function BaselimeRum(props: BaselimeRumConfig) {

  const sessionId = Cookies.get('baselime-session-id')

  if (!sessionId) {
    Cookies.set('baselime-session-id', crypto.randomUUID())
  }

  return (<BaselimeContext.Provider value={{
    userId: props.userId,
    sessionId: Cookies.get('baselime-session-id'),
    pageLoadId: crypto.randomUUID(),
    namespace: window.location.pathname,
    apiKey: props.apiKey,
    dataset: props.dataset || "web",
    service: props.service || window.location.hostname,
    url: props.url || "https://events.baselime.io/v1",
    enableLocal: props.enableLocal || false,
    enableWebVitals: props.enableWebVitals || false
  }}>
    <WebVitals>
      {props.children}
    </WebVitals>
  </BaselimeContext.Provider >
  );
}