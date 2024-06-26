import HashMap from './hashmap.js';

let test = new HashMap();
console.log('Hashmap after creation:\n', test);

test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');

console.log('\nHashmap after inserting 12 elements:\n', test);

test.set('moon', 'silver');
console.log('\nHashmap after inserting 13-th element:\n', test);

console.log("\nHashmap's length():\n", test.length());
console.log("\nHashmap's keys():\n", test.keys());
console.log("\nHashmap's values():\n", test.values());
console.log("\nHashmap's entries():\n", test.entries());

console.log(
    '\nDid empereror Kuzco graced our hashmap with his presence?\n',
    test.has('emperor Kuzco')
);
console.log('\nDo we at least have ice cream?\n', test.has('ice cream'));

console.log('\nWhat is the color value of lion?\n', test.get('lion'));

test.set('lion', 'brown');
console.log("\nWho decided that? I say he's brown!\n", test.get('lion'));

console.log(
    '\nI roll to eat the ice cream! Nat 20, baby!\n',
    test.remove('ice cream')
);

console.log(
    `\nHashmap has length ${test.length()} after I ate the ice cream.. Here's a list of what remains in there:\n`,
    test.entries()
);

test.clear();
console.log(
    "\nOK, this dragged on long enough, let's clear things up! Here's our map, nice and clean!\n",
    test
);
