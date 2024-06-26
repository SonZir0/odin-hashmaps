export default class Node {
    next = null;

    constructor(key = null, value = null, hash = null) {
        this.key = key;
        this.value = value;
        this.hash = hash;
    }

    update(value) {
        this.value = value;
    }
}
