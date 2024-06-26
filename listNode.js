export default class Node {
    next = null;

    constructor(key = null, value = null) {
        this.key = key;
        this.value = value;
    }
}
