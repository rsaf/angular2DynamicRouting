class LiteEvent {
	handlers;
	constructor() {
		this.handlers = []
	}
	on(handler) {
		this.handlers.push(handler);
	}
	off(handler) {
		this.handlers = this.handlers.filter(function(h) { return h !== handler; });
	}
	trigger(data) {
        if (this.handlers) {
            this.handlers.slice(0).forEach(function(h) { return h(data); });
        }
	}
}