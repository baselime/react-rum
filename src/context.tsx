import { createContext, useContext } from 'react'

interface BaselimeRumConfig {
  apiKey: string,
  dataset: string,
  service: string,
  namespace: string,
  url: string,
  userId?: string,
  sessionId: string,
  pageLoadId: string,
  enableLocal: boolean,
  enableWebVitals: boolean

}
export const BaselimeContext = createContext({} as BaselimeRumConfig);

export function useBaselimeRum() {
  const context = useContext(BaselimeContext)
  return {
    config: context
  }
}
