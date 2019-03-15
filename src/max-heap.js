const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.heapSize = 0;
	}

	push(data, priority) {
		var node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
		this.heapSize++;
	}

	pop() {
		if (this.isEmpty()) return;
		var result = this.root.data;
		var detached = this.detachRoot();
		this.restoreRootFromLastInsertedNode(detached);
		this.shiftNodeDown(this.root);
		this.heapSize--;
		return result;
	}

	detachRoot() {
		var result = this.root;
		if (this.parentNodes[0] == this.root) {
			this.parentNodes.shift();
		}
		this.root = null;
		return result;
	}

	restoreRootFromLastInsertedNode(detached) {
		if (this.parentNodes.length == 0) return;
		this.root = this.parentNodes.pop();
		if (this.root.parent.left == this.root) this.root.parent.left = null;
		if (this.root.parent.right == this.root) {
			this.root.parent.right = null;
			if (this.root.parent != detached) this.parentNodes.splice(0, 0, this.root.parent);
		}
		this.root.parent = null;
		if (detached.left != null && detached.left != this.root) {
			this.root.left = detached.left;
			this.root.left.parent = this.root;
		}
		if (detached.right != null && detached.right != this.root) {
			this.root.right = detached.right;
			this.root.right.parent = this.root;
		}
		if (this.root.right == null) this.parentNodes.splice(0, 0, this.root);
	}

	size() {
		return this.heapSize;
	}

	isEmpty() {
		if (this.root == null) return true
		else return false;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.heapSize = 0;
	}

	insertNode(node) {
		if (this.root == null) {
			this.root = node;
			this.parentNodes.push(node);
			return;
		}
		var treeDepth = 0;
		var calc = function depthCalculator(a) {
			if (a.right != null) {
				treeDepth++;
				depthCalculator(a.right);
			}
		};	
		calc(this.root);
		var success = false;
		var placer = function placer(a, parentNodes) {
			if (treeDepth == 0) {
				if (a.left == null) {
					a.left = node;
					node.parent = a;
					parentNodes.push(node);
					success = true;
				}
				else if (a.right == null) {
					a.right = node;
					node.parent = a;
					parentNodes.push(node);
					parentNodes.shift();
					success = true;
				}
				else {
					treeDepth++;
				}
			}
			else {
				if (!success) 
				{
					treeDepth--;
					placer(a.left, parentNodes);
				}
				if (!success) {
					treeDepth--;
					placer(a.right, parentNodes);
				}
			}
		};	
		placer(this.root, this.parentNodes);
	}



	shiftNodeUp(node) {
		if (node.parent == null || node.priority <= node.parent.priority) return;
		if (node.parent == this.root) this.root = node;
		var indexNode = this.parentNodes.indexOf(node);
		var indexParent = this.parentNodes.indexOf(node.parent);
		if (indexNode > -1) this.parentNodes[indexNode] = node.parent;
		if (indexParent > -1) this.parentNodes[indexParent] = node;
		node.swapWithParent();
		this.shiftNodeUp(node);		
	}

	shiftNodeDown(node) {
		if (node == null) return;
		if (node.left != null && node.right != null
			&& node.priority < node.left.priority && node.left.priority > node.right.priority
			|| node.left != null && node.right == null
			&& node.priority < node.left.priority) {
			
			let indexNode = this.parentNodes.indexOf(node);
			let indexLeft = this.parentNodes.indexOf(node.left);
			if (indexNode > -1) this.parentNodes[indexNode] = node.left;
			if (indexLeft > -1) this.parentNodes[indexLeft] = node;
			node.left.swapWithParent();
			if (node.parent.parent == null) this.root = node.parent;
			this.shiftNodeDown(node);
		} 
		if (node.left != null && node.right != null
			&& node.priority < node.left.priority && node.left.priority < node.right.priority) {
			
			let indexNode = this.parentNodes.indexOf(node);
			let indexRight = this.parentNodes.indexOf(node.right);
			if (indexNode > -1) this.parentNodes[indexNode] = node.right;
			if (indexRight > -1) this.parentNodes[indexRight] = node;
			node.right.swapWithParent();
			if (node.parent.parent == null) this.root = node.parent;			
			this.shiftNodeDown(node);
		}
	}
}

module.exports = MaxHeap;
