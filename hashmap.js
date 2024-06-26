import LinkedList from './linkedList.js';

/*  The snippet for "out of bounds" check weren't used here since everything is either accessed
    through Array.forEach() and Array.reduce(), or through the following expression: 
    bucketIndex = hashCode % buckets.length;
    Result of modulo can't ever be less than 0 or more than its divisor, so I'm confident
    we can't access anything out of bounds either */

export default class HashMap {
    constructor(loadFactor = 0.75) {
        this.loadFactor = loadFactor;
        this.setHashMapSize(16);
    }

    setHashMapSize(newSize) {
        this.buckets = new Array(newSize);
        for (let i = 0; i < newSize; i++) {
            this.buckets[i] = new LinkedList();
        }
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        const limiter = 2 ** 40; // to make sure hash code doesn't get too long to be inaccurate

        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % limiter;
        }
        return hashCode;
    }

    /*  This info is needed for multiple functions - set(), get(), has() and remove().
        Returns hashcode for given key, bucket index (where it should go) and whether this key
        is in there already or not (index starting from 0 if it's in there, null otherwise)    */
    getInfoForKey(key) {
        let hashCode = this.hash(key);
        const bucketIndex = hashCode % this.buckets.length;
        const indexInList = this.buckets[bucketIndex].find(key);

        return { hashCode, bucketIndex, indexInList };
    }

    set(key, value) {
        //  check load and if needed - increase the hashmap size
        if (this.length() / this.buckets.length >= this.loadFactor)
            this.resizeHashMap();

        const info = this.getInfoForKey(key);

        //  if there's no such key yet - add
        if (info.indexInList === null) {
            this.buckets[info.bucketIndex].append(key, value, info.hashCode);
        } else {
            //  otherwise - overwrite
            this.buckets[info.bucketIndex].at(info.indexInList).update(value);
        }
    }

    get(key) {
        const info = this.getInfoForKey(key);

        // index might be 0 (falsy), check for null instead
        if (info.indexInList !== null)
            return this.buckets[info.bucketIndex].at(info.indexInList).value;
        return null;
    }

    has(key) {
        const info = this.getInfoForKey(key);
        if (info.indexInList !== null) return true;
        return false;
    }

    remove(key) {
        const info = this.getInfoForKey(key);
        if (info.indexInList !== null) {
            this.buckets[info.bucketIndex].removeAtIndex(info.indexInList);
            return true;
        }
        return false;
    }

    length() {
        const total = this.buckets.reduce((lengthsSum, currentLinkedList) => {
            return (lengthsSum += currentLinkedList.length);
        }, 0);
        return total;
    }

    clear() {
        this.buckets.forEach((list) => list.clear());
    }

    keys() {
        const keysArr = [];
        this.buckets.forEach((list) => {
            let currentNode = list.headNode;
            while (currentNode) {
                keysArr.push(currentNode.key);
                currentNode = currentNode.next;
            }
        });
        return keysArr;
    }

    values() {
        const valuesArr = [];
        this.buckets.forEach((list) => {
            let currentNode = list.headNode;
            while (currentNode) {
                valuesArr.push(currentNode.value);
                currentNode = currentNode.next;
            }
        });
        return valuesArr;
    }

    entries() {
        const entriesArr = [];
        this.buckets.forEach((list) => {
            let currentNode = list.headNode;
            while (currentNode) {
                entriesArr.push([currentNode.key, currentNode.value]);
                currentNode = currentNode.next;
            }
        });
        return entriesArr;
    }

    resizeHashMap() {
        // save every single key/value/hash bit of data
        const nodeInfoArr = [];
        this.buckets.forEach((list) => {
            let currentNode = list.headNode;
            while (currentNode) {
                nodeInfoArr.push({
                    key: currentNode.key,
                    value: currentNode.value,
                    hash: currentNode.hash,
                });
                currentNode = currentNode.next;
            }
        });

        //  double map size
        this.setHashMapSize(this.buckets.length * 2);
        //  re-evaluate which node goes where and append them
        nodeInfoArr.forEach((node) => {
            const bucketIndex = node.hash % this.buckets.length;
            this.buckets[bucketIndex].append(node.key, node.value, node.hash);
        });
    }
}
