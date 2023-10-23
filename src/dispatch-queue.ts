

class DispatchQueue {
    queue: any[];
    constructor({ handleEvents: Function }) {
        this.queue = [];

    }
    
    push(data) {
        this.queue.push(data);
    }

    flush() {
       
    }
}