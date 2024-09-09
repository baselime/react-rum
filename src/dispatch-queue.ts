import { BaselimeRumConfig } from "./context.tsx";

export class DispatchQueue {
    queue: any[];
    queueSize: 500;
    duration: 1000
    timeout: null | ReturnType<typeof setTimeout> = null;
    constructor() {
        this.queue = [];
    }

    push(data, config: BaselimeRumConfig) {
        this.queue.push(data);
        if (this.queue.length >= this.queueSize) {
            if (this.timeout) {
                clearTimeout(this.timeout);
                this.timeout = null;
            }
            return this.flush(config);
        }

        if (!this.timeout) {
            this.timeout = setTimeout(() => {
                this.flush(config);
                this.timeout = null;
            }, this.duration)
        }
    }

    async flush(config: BaselimeRumConfig) {
        if(this.queue.length === 0) return
        const events = this.queue;
        this.queue = []
        await fetch(`${config.url || "https://events.baselime.io/v1"}/${config.dataset || "web"}`, {
            method: 'POST',
            headers: {
                contentType: 'application/json',
                'x-api-key': config.apiKey,
                'user-agent': '@baselime/react-rum/0.1.5',
                'library': '@baselime/react-rum/0.1.5',
                'x-service': config.service || window.location.hostname,
                'x-namespace': config.namespace || window.location.pathname,
            },
            body: JSON.stringify(events.map(event => ({
                userId: config.userId, sessionId: config.sessionId, pageLoadId: config.pageLoadId, namespace: config.namespace || window.location.pathname, ...event
            }))),
        })
    }
}