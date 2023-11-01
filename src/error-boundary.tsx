'use client'
import { ErrorInfo } from "react";
import { ErrorBoundary, ErrorBoundaryProps } from "react-error-boundary";
import { useBaselimeRum } from "./context.tsx";

/**
 * BaselimeErrorBoundary is a wrapper for ErrorBoundary that will send errors to Baselime.
 * 
 */
export function BaselimeErrorBoundary(props: ErrorBoundaryProps) {
    const { captureException } = useBaselimeRum();
    function handlerError(error: Error, info: ErrorInfo) {
        try {
            captureException(error, info);
        } catch (e) {
        }
        props.onError?.(error, info)
    }
    return (
        <ErrorBoundary {...props} onError={handlerError}>
            {props.children}
        </ErrorBoundary>
    )
}