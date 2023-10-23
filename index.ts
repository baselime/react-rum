'use client'
import { ReactNode, useEffect, useRef } from 'react'
import { onCLS, onFCP, onFID, onINP, onLCP, onTTFB } from 'web-vitals'
import { default as Cookies } from 'js-cookie';

export function BaselimeRum(props: { apiKey: string, enableWebVitals?: boolean, enableLocal?: boolean, children: ReactNode, dataset?: string, service: string, url?: string, userId?: string }) {

  const userId = useRef(props.userId);
  const sessionId = useRef(getUniqueSessionId());
  const pageLoadId = useRef(crypto.randomUUID());

  async function reportWebVitals(metric: any) {

    const namespace = window.location.pathname;
    await fetch(`${props.url || "https://events.baselime.io/v1"}/${props.dataset || "web"}/${props.service}/${namespace}`, {
      method: 'POST',
      headers: {
        contentType: 'application/json',
        'x-api-key': props.apiKey,
        'user-agent': '@baselime/react-rum/0.1.5',
        'library': '@baselime/react-rum/0.1.5'
      },
      body: JSON.stringify([{ ...metric, data: metric.entries[0], entries: undefined, userId: userId.current, sessionId: sessionId.current, pageLoadId: pageLoadId.current }]),
    })
  }

  useEffect(() => {
    /**
     * Don't send anything for localhost
     */
    if (!props.enableLocal && window.location.hostname === "localhost") return

    if (props.enableWebVitals) {
      onCLS(reportWebVitals)
      onFCP(reportWebVitals)
      onINP(reportWebVitals)
      onLCP(reportWebVitals)
      onTTFB(reportWebVitals)
      onFID(reportWebVitals)
    }

    onPageView(reportWebVitals)
  }, [])

  return props.children;
}

function onPageView(callback: Function) {
  callback({
    name: "PAGE_VIEW",
    entries: [{
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      lanuage: navigator.language,
      os: navigator['oscpu'] || navigator.platform,
      userAgent: navigator.userAgent,
      url: window.location.href,
    }],
    hostname: window.location.hostname,
    path: window.location.pathname,
    value: 1
  });
}

function getUniqueSessionId() {
  const sessionId = Cookies.get('baselime-session-id')

  if(!sessionId) {
    Cookies.set('baselime-session-id', crypto.randomUUID())
  }
  return Cookies.get('baselime-session-id')
}