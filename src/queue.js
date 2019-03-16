const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
		if (arguments.length == 1) this.maxSize = maxSize
		else this.maxSize = 30;
		this.heap = new MaxHeap();
	}

	push(data, priority) {
		if (this.heap.size() >= this.maxSize) throw "Queue overflow";
		this.heap.push(data, priority);
	}

	shift() {
		if (this.heap.isEmpty()) throw "Queue is empty";
		return this.heap.pop();
	}

	size() {
		return this.heap.size();
	}

	isEmpty() {
		return this.heap.isEmpty();
	}
}

module.exports = PriorityQueue;
