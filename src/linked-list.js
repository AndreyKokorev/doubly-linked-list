const Node = require('./node');

class LinkedList {
    constructor() {
        this.length = 0;
        this._head = null;
        this._tail = null;
    }

    append(data) {
        let node = new Node(data);
        if (!this._head) {
            this._head = node;
            this._tail = node;
        } else {
            this._tail.next = node;
            node.prev = this._tail;
            this._tail = node;
        }
        this.length++;
        return this;
    }

    head() {
        return this._head.data;
    }

    tail() {
        return this._tail.data;
    }

    at(index) {
        let node = this._head;
        while (index > 0) {
            node = node.next;
            index--;
        }
        return node.data;
    }

    insertAt(index, data) {
        let node = this._head;
        data = new Node(data);
        for (let i = 0; i < this.length; i++) {

            if (i === index) {
                data.next = node;
                data.prev = node.prev;
                node = node.prev;
                node.next = data;
                node = node.next.next;
                node.prev = data;
                this.length++;
                return;
            }
            node = node.next;
        }
        return this;
    }


    isEmpty() {
        if (this.length === 0) {
            return true;
        } else {
            return false;
        }
    }

    clear() {
        let node = new Node();
        Object.keys(this).forEach(node => delete this[node]);
        this._tail = node;
        this._head = node;
        this.length = 0;
        return this;
    }

    deleteAt(index) {
        let node = this._head;
        if (index == 0) {
            this._head = this._head.next;
        } else if (index == this.length - 1) {
            this._tail = this._tail.prev;
        }
        for (let i = 0; i < this.length; i++) {

            if (i === index) {
                let prevNode = node.prev;
                let nextNode = node.next;
                prevNode.next = node.next;
                nextNode.prev = prevNode;
                this.length--;
                break;
            }
            node = node.next;
        }
        return this;
    }

    reverse() {
        let counter = this.length;
        let swap = this._head;
        this._head = this._tail;
        this._tail = swap;
        let node = this._head;
        let prevNode, nextNode;

        while (counter > 1) {

            nextNode = node.next;
            prevNode = node.prev;
            node.next = prevNode;
            node.prev = nextNode;
            node = node.next;
            counter--;
        }

        return this;
    }

    indexOf(data) {
        let node = this._head;
        let counter = this.length;
        while (counter > 0) {
            if (node.data == data) {
                return this.length - counter;
            }
            node = node.next;
            counter--;
        }
        return -1;
    }
}

module.exports = LinkedList;