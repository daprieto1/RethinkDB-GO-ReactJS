import {EventEmitter} from 'events';

class Socket {

    constructor(ws = new WebSocket(), ee = new EventEmitter()) {
        this.ws = ws;
        this.ee = ee;
        ws.onmessage = this.onMessage.bind(this);
        ws.onopen = this.onOpen.bind(this);
        ws.onclose = this.onClose.bind(this);
    }

    on(name, fn) {
        this.ee.on(name, fn);
    }

    off(name, fn) {
        this.ee.off(name, fn);
    }

    emit(name, data) {
        this.ee.removeListener(name, fn);
    }

    onMessage(e) {
        try {
            const message = JSON.parse(e.data);
            this.ee.emit(message.name, message.data);
        } catch (err) {
            this.ee.emit('error', err);
        }
    }

    onOpen() {
        this.ee.emit('connect');
    }

    onClose() {
        this.ee.emit('disconnect');
    }

}

export default Socket;
