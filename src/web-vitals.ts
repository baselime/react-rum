import { ReactNode, useEffect } from "react";
import { onCLS, onFCP, onFID, onINP, onLCP, onTTFB } from 'web-vitals'
import { useBaselimeRum } from "./context.tsx";

export function WebVitals(props: { children: ReactNode }) {

  const { config } = useBaselimeRum();
  async function reportWebVitals(metric: any) {
    await fetch(`${config.url || "https://events.baselime.io/v1"}/${config.dataset || "web"}/${config.service}`, {
      method: 'POST',
      headers: {
        contentType: 'application/json',
        'x-api-key': config.apiKey,
        'user-agent': '@baselime/react-rum/0.1.5',
        'library': '@baselime/react-rum/0.1.5'
      },
      body: JSON.stringify([{
        ...metric, data: metric.entries[0], entries: undefined,
        userId: config.userId, sessionId: config.sessionId, pageLoadId: config.pageLoadId, namespace: config.namespace
      }]),
    })
  }

  useEffect(() => {
    /**
     * Don't send anything for localhost
     */
    if (!config.enableLocal && window.location.hostname === "localhost") return

    if (config.enableWebVitals) {
      onCLS(reportWebVitals)
      onFCP(reportWebVitals)
      onINP(reportWebVitals)
      onLCP(reportWebVitals)
      onTTFB(reportWebVitals)
      onFID(reportWebVitals)
    }

    onPageView(reportWebVitals)
  }, [])

  return props.children
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
