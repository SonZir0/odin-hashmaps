import LinkedList from './linkedList';

export default class HashMap {
    elemCount = 0;

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

    /*  This info is needed for multiple functions.
        Returns hashcode for given key, bucket index (where it should go) and whether this key
        is in there already or not (index starting from 0 if it's in there, null otherwise)    */
    getInfoForKey(key) {
        let hashCode = this.hash(key);
        const bucketIndex = hashCode % this.buckets.length;
        const indexInList = this.buckets[bucketIndex].find(key);

        return { hashCode, bucketIndex, indexInList };
    }

    set(key, value) {
        const info = this.getInfoForKey(key);

        // remove later
        console.log(
            `Hashcode ${info.hashCode} lands in a bucket with an index ${info.bucketIndex}`
        );

        //  if there's no such key yet - add
        if (info.indexInList === null) {
            this.buckets[info.bucketIndex].append(key, value, info.hashCode);
            this.elemCount++;
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
}
