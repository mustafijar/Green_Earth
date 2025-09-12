1.What is the difference between var, let, and const? Var:
utilized in earlier JavaScript

Function scoped (operates inside a function)

Redeclared

is raised (placed at the top), with an initial value of undefined

let :

first appeared in ES6

Block scoped (works inside {}, such as in if, for, etc.)

Not able to be redeclared in the same context

Raised but unavailable prior to declaration

Const:

The same scope as let (block scoped)

Unreassignable

When declared, it must be initialized.

It is still possible to modify the contents of objects or arrays declared with const (not reassign).

->var example function testVar() { var x = 1; if (true) { var x = 2; // same variable! console.log(x); } console.log(x); }

-> let example function testLet() { let y = 1; if (true) { let y = 2; // different variable console.log(y); } console.log(y); }

-> function testConst() { const z = 10;

if (true) { const z = 20; // different variable (block scoped) console.log(z); } }

2.What is the difference between map(), forEach(), and filter()? map():
gives back a fresh array

alters every item (doubling the numbers, for example).

forEach():

Loops over items only

doesn't give anything back

Ideal for adverse effects such as logging

filter():

gives back a fresh array

Only items that fit a condition are included. const nums = [1, 2, 3, 4, 5];

const doubled = nums.map(n => n * 2); // [2, 4, 6, 8, 10]

nums.forEach(n => console.log(n)); // logs 1, 2, 3, 4, 5

const evens = nums.filter(n => n % 2 === 0); // [2, 4]

3.What are arrow functions in ES6? In ES6, arrow functions are a condensed form of functions.They automatically bind this from the surrounding scope and clean up code. // Regular function function add(a, b) { return a + b; } // Arrow function const add = (a, b) => a + b;

4.How does destructuring assignment work in ES6? Destructuring lets you unpack values from arrays or objects directly into variables in a concise way. Array example: const fruits = ["apple", "banana", "mango"]; const [a, b] = fruits; console.log(a, b); // apple banana Object example: const user = { name: "Anika", age: 21 }; const { name, age } = user; console.log(name, age); // Anika 21

5.Explain template literals in ES6. How are they different from string concatenation? In ES6, template literals are a new method for creating strings that use backticks ( ) in place of quotes. They permit: Using ${} for variable interpolation Strings with multiple lines syntax that is simpler and cleaner than the previous string concatenation Syntax: const name = "Alice"; const message = Hello, ${name}!; console.log(message); // Hello, Alice!

Difference from string concatenation: Using concatenation: const name = "Alice"; const message = "Hello, " + name + "!"; Using template literals: const message = Hello, ${name}!; Cleaner, more readable, and supports multi-line strings: const multiline = This is line one. This is line two.;
