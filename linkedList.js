import Node from './listNode.js';

export default class LinkedList {
    length = 0;
    headNode = null;

    append(key, value) {
        if (!this.headNode) {
            this.headNode = new Node(key, value);
        } else {
            let lastNode = this.tail();
            lastNode.next = new Node(key, value);
        }
        this.length++;
    }

    size() {
        return this.length;
    }

    head() {
        return this.headNode;
    }

    tail() {
        let tailNode = this.headNode;
        while (tailNode.next != null) {
            tailNode = tailNode.next;
        }
        return tailNode;
    }

    toString() {
        let currentNode = this.headNode;
        let resultString = '';
        while (currentNode) {
            resultString += `( ${currentNode.key} - ${currentNode.value} ) -> `;
            currentNode = currentNode.next;
        }
        resultString += 'null';
        return resultString;
    }

    // indexation starts at 0 (like an array)
    at(index = 0) {
        if (index < 0 || index > this.length)
            throw new Error('Index out of bounds!');

        let currentNode = this.headNode;
        for (let i = 0; i < index; i++) currentNode = currentNode.next;
        return currentNode;
    }

    // indexation starts at 0 (like an array)
    find(key) {
        let index = 0;
        let currentNode = this.headNode;
        while (currentNode) {
            if (currentNode.key === key) return index;
            currentNode = currentNode.next;
            index++;
        }
        return null;
    }

    //  functions like pop() by default pass index to remove at index;
    remove(index = this.length - 1) {
        if (!this.headNode) return; //  do nothing if list is empty
        if (index < 0 || index >= this.length)
            throw new Error('Index out of bounds!');

        if (index === 0) {
            this.headNode = this.headNode.next;
        } else {
            // first find a node placed before the one we are removing
            let currentNode = this.headNode;
            for (let i = 0; i < index - 1; i++) {
                currentNode = currentNode.next;
            }
            currentNode.next = currentNode.next.next;
        }
        this.length--;
    }
}
