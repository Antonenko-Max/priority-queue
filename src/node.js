class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (this.left == null) {
			 this.left = node;
			 node.parent = this;
		}
		else if (this.right == null) {
			this.right = node;
			node.parent = this;
		}
	}

	removeChild(node) {
		if (this.left == node) {
			node.parent = null;
			this.left = null;
		}
		else if (this.right == node) {
			this.right = null;
			node.parent = null;			
		}
		else throw "Node not found";
	}

	remove() {
		if (this.parent != null) {
			this.parent.removeChild(this);
			this.parent = null;
		}
	}

	swapWithParent() {
		if (this.parent == null) return;
		var _left = this.left;
		var _right = this.right;
		var root = this.parent.parent;
		if (this.left != null) this.left.parent = this.parent;
		if (this.right != null) this.right.parent = this.parent;
		if (this.parent.left != null && this.parent.left == this) {
			this.left = this.parent;
			if (this.parent.right != null) {
				this.parent.right.parent = this;
			 	this.right = this.parent.right;
			}
		}
		else if (this.parent.right != null && this.parent.right == this) {
			this.right = this.parent;
			if (this.parent.left != null)	{
				this.parent.left.parent = this;  
				this.left = this.parent.left;
			}
		}
		if (root != null && root.left != null && root.left == this.parent) root.left = this
		else if (root != null && root.right != null && root.right == this.parent) root.right = this;
		this.parent.parent = this;
		this.parent.left = _left;
		this.parent.right = _right;
		this.parent = root;
		
	}
}

module.exports = Node;
