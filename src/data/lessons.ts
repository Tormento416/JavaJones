import type { Lesson, Concept } from '../types/game';

export const CONCEPTS_CODEX: Concept[] = [
  {
    id: 'variables',
    name: 'Variables & Data Types',
    category: 'Foundations',
    summary: 'Variables store values using `let`, `const`, and `var`. Data types include primitives (string, number, boolean, null, undefined, symbol, bigint) and objects.',
    example: `const coffeeName = "Espresso";\nlet shots = 2;\nlet isOpen = true;\nconsole.log(coffeeName, shots, isOpen);`,
  },
  {
    id: 'operators',
    name: 'Operators & Expressions',
    category: 'Foundations',
    summary: 'Perform math (+, -, *, /, %), comparisons (===, !==, >, <), and logical operations (&&, ||, !).',
    example: `let price = 4.50;\nlet tax = 0.08;\nlet total = price * (1 + tax);\nconsole.log("Total:", total);`,
  },
  {
    id: 'control_flow',
    name: 'Control Flow (Conditionals & Loops)',
    category: 'Foundations',
    summary: 'Control execution path with `if/else`, `switch`, `for`, `while`, and `for...of`.',
    example: `let temp = 85;\nif (temp > 80) {\n  console.log("Serve Iced Coffee!");\n} else {\n  console.log("Serve Hot Latte!");\n}`,
  },
  {
    id: 'functions',
    name: 'Functions (Declarations, Expressions, Arrows)',
    category: 'Core Logic',
    summary: 'Reusable blocks of code. Arrow functions `() => {}` offer concise syntax.',
    example: `const brewCoffee = (beans, milk) => {\n  return \`Brewed \${beans} with \${milk} milk!\`;\n};\nconsole.log(brewCoffee("Dark Roast", "Oat"));`,
  },
  {
    id: 'scope_hoisting',
    name: 'Scope & Hoisting',
    category: 'Core Logic',
    summary: 'Block scope (`let`/`const`), function scope, and global scope. `var` declarations are hoisted to the top.',
    example: `function kitchen() {\n  let secretRecipe = "Vanilla Bean";\n  console.log(secretRecipe);\n}\nkitchen();`,
  },
  {
    id: 'closures',
    name: 'Closures',
    category: 'Advanced Functions',
    summary: 'A function that remembers variables from its outer lexical scope even after the outer function finishes execution.',
    example: `function createSyrupDispenser(syrupName) {\n  let count = 0;\n  return function() {\n    count++;\n    return \`Dispensed \${count} shot(s) of \${syrupName}\`;\n  };\n}\nconst vanilla = createSyrupDispenser("Vanilla");\nconsole.log(vanilla());`,
  },
  {
    id: 'this_keyword',
    name: 'The `this` Keyword',
    category: 'Objects',
    summary: 'Refers to the context in which a function is executed. Arrow functions inherit `this` lexically.',
    example: `const barista = {\n  name: "Java Jones",\n  greet() {\n    return \`Hi, I am \${this.name}!\`;\n  }\n};\nconsole.log(barista.greet());`,
  },
  {
    id: 'objects_prototypes',
    name: 'Objects & Prototypes',
    category: 'Objects',
    summary: 'Key-value pairs and prototypical inheritance via `Object.create` or prototype chains.',
    example: `const drink = { name: "Latte", price: 5 };\nconst discountDrink = Object.create(drink);\ndiscountDrink.price = 4;\nconsole.log(discountDrink.name, discountDrink.price);`,
  },
  {
    id: 'arrays_methods',
    name: 'Arrays & Array Methods',
    category: 'Data Structures',
    summary: 'Manipulate collections using `.map()`, `.filter()`, `.reduce()`, `.find()`, and `.forEach()`.',
    example: `const orders = [4, 5, 6];\nconst totalRevenue = orders.reduce((sum, price) => sum + price, 0);\nconsole.log("Revenue:", totalRevenue);`,
  },
  {
    id: 'dom_manipulation',
    name: 'DOM Manipulation',
    category: 'Web APIs',
    summary: 'Select, modify, create, and remove HTML elements dynamically in the browser tree.',
    example: `// document.getElementById("status").textContent = "Brewing Coffee...";`,
  },
  {
    id: 'events',
    name: 'Event Handling & Propagation',
    category: 'Web APIs',
    summary: 'Listen for clicks, keypresses, and forms. Understand event bubbling and capturing.',
    example: `// button.addEventListener("click", (e) => console.log("Order submitted!"));`,
  },
  {
    id: 'error_handling',
    name: 'Error Handling (Try/Catch)',
    category: 'Robustness',
    summary: 'Prevent crash using `try { ... } catch(err) { ... } finally { ... }`.',
    example: `try {\n  throw new Error("Out of Coffee Beans!");\n} catch (err) {\n  console.log("Caught:", err.message);\n}`,
  },
  {
    id: 'async_callbacks',
    name: 'Asynchronous JavaScript (Callbacks)',
    category: 'Asynchronous',
    summary: 'Execute code non-blockingly using callback functions passed as parameters.',
    example: `function brewLater(callback) {\n  console.log("Brewing...");\n  callback("Coffee Ready!");\n}\nbrewLater((msg) => console.log(msg));`,
  },
  {
    id: 'promises',
    name: 'Promises',
    category: 'Asynchronous',
    summary: 'Represents eventual completion (`resolve`) or failure (`reject`) of an asynchronous operation.',
    example: `const orderPromise = new Promise((resolve) => resolve("Latte Served!"));\norderPromise.then((msg) => console.log(msg));`,
  },
  {
    id: 'async_await',
    name: 'Async / Await',
    category: 'Asynchronous',
    summary: 'Syntactic sugar over Promises for writing readable asynchronous code.',
    example: `async function prepareOrder() {\n  const result = await Promise.resolve("Double Espresso!");\n  console.log(result);\n}\nprepareOrder();`,
  },
  {
    id: 'es6_features',
    name: 'ES6+ Features (Destructuring, Spread/Rest)',
    category: 'Modern Syntax',
    summary: 'Unpack values with `const { name } = obj` and combine with `...spread`.',
    example: `const order = { item: "Mocha", size: "Large" };\nconst { item, size } = order;\nconst updated = { ...order, extraShots: 2 };\nconsole.log(item, size, updated);`,
  },
  {
    id: 'modules',
    name: 'Modules (Import / Export)',
    category: 'Architecture',
    summary: 'Split JavaScript into modular files using `export` and `import`.',
    example: `// export const espressoPrice = 3.50;\n// import { espressoPrice } from './menu.js';`,
  },
  {
    id: 'event_loop',
    name: 'The Event Loop',
    category: 'Runtime Architecture',
    summary: 'Call Stack, Web APIs, Task Queue (Macrotasks), and Microtask Queue (Promises).',
    example: `console.log("1: Start");\nsetTimeout(() => console.log("3: Macrotask"), 0);\nPromise.resolve().then(() => console.log("2: Microtask"));`,
  },
  {
    id: 'json_serialization',
    name: 'JSON & Serialization',
    category: 'Data Handling',
    summary: 'Convert objects to strings with `JSON.stringify()` and parse back with `JSON.parse()`.',
    example: `const data = JSON.stringify({ item: "Cappuccino", price: 4.5 });\nconst obj = JSON.parse(data);\nconsole.log(obj.item);`,
  },
  {
    id: 'storage',
    name: 'Local Storage & Session Storage',
    category: 'Web Storage',
    summary: 'Persist key-value strings across browser reloads using `localStorage.setItem` and `getItem`.',
    example: `localStorage.setItem("todaySales", "250");\nconsole.log(localStorage.getItem("todaySales"));`,
  },
  {
    id: 'fetch_api',
    name: 'Fetch API & HTTP Requests',
    category: 'Networking',
    summary: 'Fetch remote data from REST APIs using `fetch(url)` which returns a Promise.',
    example: `// fetch('https://api.coffee.com/menu').then(res => res.json()).then(data => console.log(data));`,
  },
  {
    id: 'regex',
    name: 'Regular Expressions (Regex)',
    category: 'String Matching',
    summary: 'Match text patterns using `/pattern/flags` with `.test()` or `.match()`.',
    example: `const codeRegex = /^COFFEE-\\d{3}$/;\nconsole.log(codeRegex.test("COFFEE-101"));`,
  },
  {
    id: 'classes_inheritance',
    name: 'Classes & Inheritance',
    category: 'OOP',
    summary: 'Object-oriented blueprint using `class` and `extends` with `constructor` and `super()`.',
    example: `class CoffeeMachine {\n  constructor(brand) { this.brand = brand; }\n}\nclass CommercialMachine extends CoffeeMachine {\n  brew() { return \`\${this.brand} is brewing!\`; }\n}\nconst m = new CommercialMachine("SuperBrew");\nconsole.log(m.brew());`,
  },
  {
    id: 'debugging_devtools',
    name: 'Debugging & DevTools',
    category: 'Tooling',
    summary: 'Utilize `console.table()`, `debugger;`, breakpoints, and stack traces to solve bugs.',
    example: `const menu = [{ item: "Latte", price: 4 }, { item: "Mocha", price: 5 }];\nconsole.table(menu);`,
  },
];

export const LESSONS: Lesson[] = [
  {
    day: 1,
    conceptId: 'variables',
    title: 'Day 1: Opening Shop - Variables & Data Types',
    conceptName: 'Variables and Data Types',
    story: 'Welcome to your first day, Java Jones! Java Joe handed you the keys to Store #1. Before opening the doors, you need to store coffee bean inventory and customer prices in JavaScript variables using `let` and `const`!',
    explanation: 'Declare variables using `const` for fixed values (like drink prices) and `let` for values that change (like available coffee beans). Print them using `console.log`.',
    javaJoeTip: 'Remember Jones: `const` stays constant, while `let` lets you change values later!',
    customer: {
      id: 'c1',
      name: 'Devin the Dev',
      avatar: '👨‍💻',
      title: 'Junior Frontend Dev',
      dialogue: 'Hey Java Jones! I need to verify your coffee bean count before ordering.',
      orderText: 'Declare a `const drinkName = "Espresso"` and a `let beanCount = 50`. Then `console.log(drinkName)` and `console.log(beanCount)`.',
      tipMultiplier: 1.1,
    },
    starterCode: `// Day 1: Declare your inventory variables below!
// 1. Declare const drinkName with value "Espresso"
// 2. Declare let beanCount with value 50
// 3. Print both variables using console.log

`,
    solutionCode: `const drinkName = "Espresso";\nlet beanCount = 50;\nconsole.log(drinkName);\nconsole.log(beanCount);`,
    testCases: [
      {
        description: 'Should log "Espresso"',
        validate: (logs) => logs.some((l) => l.includes('Espresso')),
      },
      {
        description: 'Should log bean count 50',
        validate: (logs) => logs.some((l) => l.includes('50')),
      },
    ],
    dailyTargetMoney: 150,
    rewardMoney: 60,
  },

  {
    day: 2,
    conceptId: 'operators',
    title: 'Day 2: Register Operations - Math & Expressions',
    conceptName: 'Operators and Expressions',
    story: 'Customers are coming in fast! You need to compute customer totals, apply tax, and calculate change at the cash register.',
    explanation: 'Use arithmetic operators (`+`, `-`, `*`, `/`) to calculate the final price with 10% tax (`1.10`).',
    javaJoeTip: 'Multiply the item price by 1.10 to add a 10% tax effortlessly!',
    customer: {
      id: 'c2',
      name: 'Sarah Scaler',
      avatar: '👩‍💼',
      title: 'Tech Lead',
      dialogue: 'I have a big team meeting! I need 3 Lattes at $4.00 each, plus 10% tax.',
      orderText: 'Calculate `subtotal = 3 * 4.00`, calculate `total = subtotal * 1.10`, and `console.log("Total:", total)`.',
      tipMultiplier: 1.2,
    },
    starterCode: `// Day 2: Cash Register Math
const lattePrice = 4.00;
const quantity = 3;
const taxRate = 1.10;

// 1. Calculate subtotal
// 2. Calculate total with tax
// 3. Log total using console.log("Total:", total)

`,
    solutionCode: `const lattePrice = 4.00;\nconst quantity = 3;\nconst taxRate = 1.10;\nconst subtotal = lattePrice * quantity;\nconst total = subtotal * taxRate;\nconsole.log("Total:", total);`,
    testCases: [
      {
        description: 'Should calculate Total: 13.2',
        validate: (logs) => logs.some((l) => l.includes('13.2') || l.includes('Total')),
      },
    ],
    dailyTargetMoney: 150,
    rewardMoney: 65,
  },

  {
    day: 3,
    conceptId: 'control_flow',
    title: 'Day 3: Custom Temperature - Conditionals & Loops',
    conceptName: 'Control Flow (Conditionals and Loops)',
    story: 'It is a scorching hot summer day in Starter Alley! Customers want iced coffee if the temperature is over 75 degrees, otherwise hot coffee.',
    explanation: 'Use an `if / else` conditional block to check the `temperature` variable and print "Serve Iced Coffee" or "Serve Hot Coffee".',
    javaJoeTip: 'Use `if (temperature > 75)` to check the weather!',
    customer: {
      id: 'c3',
      name: 'Chill Charlie',
      avatar: '🏄‍♂️',
      title: 'UI Designer',
      dialogue: 'Check the weather outside! If temp > 75, give me iced, otherwise hot.',
      orderText: 'Given `const temp = 82`, write an if/else block that logs "Serve Iced Coffee" when temp > 75.',
      tipMultiplier: 1.15,
    },
    starterCode: `// Day 3: Weather & Drink Temperature Logic
const temp = 82;

// Write an if/else statement:
// If temp > 75 -> console.log("Serve Iced Coffee")
// Else -> console.log("Serve Hot Coffee")

`,
    solutionCode: `const temp = 82;\nif (temp > 75) {\n  console.log("Serve Iced Coffee");\n} else {\n  console.log("Serve Hot Coffee");\n}`,
    testCases: [
      {
        description: 'Should log "Serve Iced Coffee"',
        validate: (logs) => logs.some((l) => l.includes('Serve Iced Coffee')),
      },
    ],
    dailyTargetMoney: 150,
    rewardMoney: 70,
  },

  {
    day: 4,
    conceptId: 'functions',
    title: 'Day 4: Automated Brewing - Functions & Arrow Functions',
    conceptName: 'Functions (Declarations, Expressions, Arrows)',
    story: 'Manually pouring each cup is too slow! Java Joe wants you to write reusable function recipes for brewing drinks.',
    explanation: 'Create an arrow function `brewDrink(name, shots)` that returns a formatted string: `"Brewed 2 shots of Espresso"`.',
    javaJoeTip: 'Arrow functions `const fn = (arg) => ...` keep your code sleek and fast!',
    customer: {
      id: 'c4',
      name: 'Professor Poly',
      avatar: '👵',
      title: 'CS Professor',
      dialogue: 'Write an elegant arrow function to automate my espresso brewing!',
      orderText: 'Define `const brewDrink = (name, shots) => "Brewed " + shots + " shots of " + name;` and `console.log(brewDrink("Espresso", 2))`.',
      tipMultiplier: 1.25,
    },
    starterCode: `// Day 4: Create the brewDrink arrow function
// 1. Define brewDrink(name, shots) returning "Brewed [shots] shots of [name]"
// 2. Call brewDrink("Espresso", 2) and console.log the result!

`,
    solutionCode: `const brewDrink = (name, shots) => \`Brewed \${shots} shots of \${name}\`;\nconsole.log(brewDrink("Espresso", 2));`,
    testCases: [
      {
        description: 'Should log "Brewed 2 shots of Espresso"',
        validate: (logs) => logs.some((l) => l.includes('Brewed 2 shots of Espresso')),
      },
    ],
    dailyTargetMoney: 150,
    rewardMoney: 75,
  },

  {
    day: 5,
    conceptId: 'scope_hoisting',
    title: 'Day 5: Kitchen Secret - Scope & Hoisting',
    conceptName: 'Scope and Hoisting',
    story: 'Java Joe has a secret syrup formula stored in the kitchen scope. Understand global vs local scope to avoid spilling secret variables!',
    explanation: 'Variables declared inside a function are in local scope and cannot be accessed outside. `var` is hoisted, whereas `let`/`const` are block-scoped.',
    javaJoeTip: 'Keep your secret ingredients inside local function scope so rival cafes cannot steal them!',
    customer: {
      id: 'c5',
      name: 'Agent Alex',
      avatar: '🕵️‍♂️',
      title: 'QA Engineer',
      dialogue: 'Show me how local function scope protects secret recipes from global leakage!',
      orderText: 'Create a function `getSecretRecipe()` that defines `const secret = "Hazelnut Delight"` locally and returns it. Call it and log the secret.',
      tipMultiplier: 1.3,
    },
    starterCode: `// Day 5: Scope & Local Variables
function getSecretRecipe() {
  // Define local variable secret = "Hazelnut Delight"
  // return secret
}

// Call getSecretRecipe and console.log the returned value!

`,
    solutionCode: `function getSecretRecipe() {\n  const secret = "Hazelnut Delight";\n  return secret;\n}\nconsole.log(getSecretRecipe());`,
    testCases: [
      {
        description: 'Should log "Hazelnut Delight"',
        validate: (logs) => logs.some((l) => l.includes('Hazelnut Delight')),
      },
    ],
    dailyTargetMoney: 150,
    rewardMoney: 80,
  },

  {
    day: 6,
    conceptId: 'closures',
    title: 'Day 6: Secret Syrup Dispenser - Closures',
    conceptName: 'Closures',
    story: 'You need an automated syrup counter that remembers how many pumps of syrup have been added to a drink, maintaining a private counter using closures!',
    explanation: 'A closure is a function that retains access to its parent scope variables even after the parent function has finished executing.',
    javaJoeTip: 'Closures encapsulate state! Perfect for keeping track of private syrup shot counters.',
    customer: {
      id: 'c6',
      name: 'Maya Modular',
      avatar: '👩‍💻',
      title: 'Backend Dev',
      dialogue: 'I want 2 pumps of Vanilla syrup, tracked using a closure dispenser counter!',
      orderText: 'Create `createSyrupCounter()`. It initializes `let count = 0` and returns an inner function that increments and returns `count`.',
      tipMultiplier: 1.35,
    },
    starterCode: `// Day 6: Build a closure for syrup shots
function createSyrupCounter() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}

const addSyrup = createSyrupCounter();
// Call addSyrup() twice and console.log the second result (should be 2)!

`,
    solutionCode: `function createSyrupCounter() {\n  let count = 0;\n  return function() {\n    count++;\n    return count;\n  };\n}\nconst addSyrup = createSyrupCounter();\naddSyrup();\nconsole.log(addSyrup());`,
    testCases: [
      {
        description: 'Should log 2 on second call',
        validate: (logs) => logs.some((l) => l.includes('2')),
      },
    ],
    dailyTargetMoney: 150,
    rewardMoney: 85,
  },

  {
    day: 7,
    conceptId: 'this_keyword',
    title: 'Day 7: The Barista Object - The `this` Keyword',
    conceptName: 'The this Keyword',
    story: 'Congratulations! You completed Week 1! You can now unlock Store #2 in Downtown Tech Hub if you have $500! Today, build a `barista` object that uses `this` to refer to its own properties.',
    explanation: 'In object methods, `this` refers to the object calling the method.',
    javaJoeTip: 'Inside a method, `this.name` accesses the name property of that specific object!',
    customer: {
      id: 'c7',
      name: 'Java Joe',
      avatar: '🧔',
      title: 'Coffee Mogul',
      dialogue: 'Great work Jones! Introduce yourself to Store #2 customers using the `this` keyword in an object method.',
      orderText: 'Define object `barista = { name: "Java Jones", introduce() { return "Hi, I am " + this.name; } }`. Log `barista.introduce()`.',
      tipMultiplier: 1.4,
    },
    starterCode: `// Day 7: Barista Object & 'this' keyword
const barista = {
  name: "Java Jones",
  introduce() {
    // Return "Hi, I am " + this.name
  }
};

// console.log(barista.introduce());

`,
    solutionCode: `const barista = {\n  name: "Java Jones",\n  introduce() {\n    return "Hi, I am " + this.name;\n  }\n};\nconsole.log(barista.introduce());`,
    testCases: [
      {
        description: 'Should log "Hi, I am Java Jones"',
        validate: (logs) => logs.some((l) => l.includes('Hi, I am Java Jones')),
      },
    ],
    dailyTargetMoney: 150,
    rewardMoney: 90,
  },

  {
    day: 8,
    conceptId: 'objects_prototypes',
    title: 'Day 8: Coffee Menu Blueprint - Objects & Prototypes',
    conceptName: 'Objects and Prototypes',
    story: 'We are expanding the menu! Create a prototype blueprint for all coffee drinks with default properties like `temperature: "hot"` and `size: "medium"`.',
    explanation: 'Objects can inherit properties from prototypes. `Object.create(proto)` creates a new object linking to the prototype.',
    javaJoeTip: 'Prototypes save memory by sharing common properties across all drink instances!',
    customer: {
      id: 'c8',
      name: 'Hipster Harrison',
      avatar: '🧔‍♂️',
      title: 'Coffee Enthusiast',
      dialogue: 'I want a custom Mocha based on your standard drink prototype!',
      orderText: 'Create `const drinkProto = { temp: "hot", size: "medium" }`. Use `Object.create(drinkProto)` to create `mocha`, set `mocha.name = "Mocha"`, and log `mocha.name` and `mocha.temp`.',
      tipMultiplier: 1.25,
    },
    starterCode: `// Day 8: Drink Prototypes
const drinkProto = {
  temp: "hot",
  size: "medium"
};

// 1. Create mocha object using Object.create(drinkProto)
// 2. Set mocha.name = "Mocha"
// 3. Log mocha.name and mocha.temp

`,
    solutionCode: `const drinkProto = { temp: "hot", size: "medium" };\nconst mocha = Object.create(drinkProto);\nmocha.name = "Mocha";\nconsole.log(mocha.name, mocha.temp);`,
    testCases: [
      {
        description: 'Should log "Mocha" and "hot"',
        validate: (logs) => logs.some((l) => l.includes('Mocha') && l.includes('hot')),
      },
    ],
    dailyTargetMoney: 150,
    rewardMoney: 95,
  },

  {
    day: 9,
    conceptId: 'arrays_methods',
    title: 'Day 9: Order Queue Processing - Array Methods',
    conceptName: 'Arrays and Array Methods',
    story: 'Orders are piling up! Use array methods like `.map()` and `.reduce()` to compute total daily revenue from an array of order prices.',
    explanation: 'Array methods make array processing easy: `.reduce((acc, curr) => acc + curr, 0)` sums all numbers in an array.',
    javaJoeTip: 'Never use manual index counters when `.reduce()` can calculate the sum in one clean line!',
    customer: {
      id: 'c9',
      name: 'Data Dan',
      avatar: '📊',
      title: 'Data Analyst',
      dialogue: 'Calculate our total revenue from today\'s order prices: [4.5, 5.0, 3.5, 6.0] using `.reduce()`.',
      orderText: 'Given `const prices = [4.5, 5.0, 3.5, 6.0]`, use `reduce` to sum them into `total` and `console.log("Revenue:", total)`.',
      tipMultiplier: 1.3,
    },
    starterCode: `// Day 9: Sum array of prices with .reduce()
const prices = [4.5, 5.0, 3.5, 6.0];

// Use prices.reduce to compute total sum
// console.log("Revenue:", total);

`,
    solutionCode: `const prices = [4.5, 5.0, 3.5, 6.0];\nconst total = prices.reduce((sum, p) => sum + p, 0);\nconsole.log("Revenue:", total);`,
    testCases: [
      {
        description: 'Should log "Revenue: 19"',
        validate: (logs) => logs.some((l) => l.includes('19')),
      },
    ],
    dailyTargetMoney: 150,
    rewardMoney: 100,
  },

  {
    day: 10,
    conceptId: 'dom_manipulation',
    title: 'Day 10: Digital Menu Board - DOM Manipulation',
    conceptName: 'DOM Manipulation',
    story: 'We are installing an interactive digital menu screen at Store #2! Learn how JavaScript updates elements in the DOM tree.',
    explanation: 'Use DOM methods like `document.createElement()`, `.textContent`, and `.appendChild()` to manipulate webpage elements.',
    javaJoeTip: 'Modifying element content with `.textContent` keeps your digital menu updated in real time!',
    customer: {
      id: 'c10',
      name: 'Pixel Pam',
      avatar: '👩‍🎨',
      title: 'Web Designer',
      dialogue: 'Update our virtual display screen element with the current special drink title!',
      orderText: 'Create a simulated element `{ textContent: "" }`, set `element.textContent = "Special: Nitro Cold Brew"`, and log `element.textContent`.',
      tipMultiplier: 1.3,
    },
    starterCode: `// Day 10: Virtual DOM Element Manipulation
const menuDisplay = { textContent: "" };

// 1. Set menuDisplay.textContent = "Special: Nitro Cold Brew"
// 2. console.log(menuDisplay.textContent)

`,
    solutionCode: `const menuDisplay = { textContent: "" };\nmenuDisplay.textContent = "Special: Nitro Cold Brew";\nconsole.log(menuDisplay.textContent);`,
    testCases: [
      {
        description: 'Should log "Special: Nitro Cold Brew"',
        validate: (logs) => logs.some((l) => l.includes('Special: Nitro Cold Brew')),
      },
    ],
    dailyTargetMoney: 150,
    rewardMoney: 105,
  },

  {
    day: 11,
    conceptId: 'events',
    title: 'Day 11: Order Button - Event Handling & Propagation',
    conceptName: 'Event Handling and Propagation',
    story: 'Customers press the "Brew Now" button on our order kiosks! Handle click events and prevent default form reloading.',
    explanation: 'Use `element.addEventListener("click", callback)` to trigger logic when user actions occur.',
    javaJoeTip: 'Events bubble up through parent containers unless stopped with `e.stopPropagation()`.',
    customer: {
      id: 'c11',
      name: 'Clicky Chris',
      avatar: '🖱️',
      title: 'UX Researcher',
      dialogue: 'Add an event listener to our order button that triggers order processing!',
      orderText: 'Create an object `button = { addEventListener(event, fn) { fn({ type: event }); } }`. Call `addEventListener` with `"click"` logging `"Order Placed!"`.',
      tipMultiplier: 1.35,
    },
    starterCode: `// Day 11: Event Listener Simulation
const button = {
  addEventListener(eventType, handler) {
    handler({ type: eventType });
  }
};

// Add a "click" event listener to button that logs "Order Placed!"

`,
    solutionCode: `const button = {\n  addEventListener(eventType, handler) {\n    handler({ type: eventType });\n  }\n};\nbutton.addEventListener("click", (e) => console.log("Order Placed!"));`,
    testCases: [
      {
        description: 'Should log "Order Placed!"',
        validate: (logs) => logs.some((l) => l.includes('Order Placed!')),
      },
    ],
    dailyTargetMoney: 150,
    rewardMoney: 110,
  },

  {
    day: 12,
    conceptId: 'error_handling',
    title: 'Day 12: Machine Malfunction - Error Handling (Try/Catch)',
    conceptName: 'Error Handling (Try/Catch)',
    story: 'OH NO! The espresso machine ran out of water and threw a critical error! Catch the error gracefully so the shop doesn\'t crash or go bankrupt!',
    explanation: 'Wrap risky operations in `try { ... } catch (error) { ... }` to intercept errors without halting program execution.',
    javaJoeTip: 'Never let an uncaught exception crash your store. Catch errors and display a friendly customer message!',
    customer: {
      id: 'c12',
      name: 'Safety Sam',
      avatar: '👨‍🚒',
      title: 'Site Reliability Engineer',
      dialogue: 'Trigger an error when water is 0, catch it, and log "Handled: Out of Water".',
      orderText: 'Write a try/catch block. Inside `try`, throw `new Error("Out of Water")`. Inside `catch`, log `"Handled: " + err.message`.',
      tipMultiplier: 1.4,
    },
    starterCode: `// Day 12: Try / Catch Error Guard
try {
  // Throw new Error("Out of Water")
} catch (err) {
  // console.log("Handled: " + err.message);
}

`,
    solutionCode: `try {\n  throw new Error("Out of Water");\n} catch (err) {\n  console.log("Handled: " + err.message);\n}`,
    testCases: [
      {
        description: 'Should log "Handled: Out of Water"',
        validate: (logs) => logs.some((l) => l.includes('Handled: Out of Water')),
      },
    ],
    dailyTargetMoney: 150,
    rewardMoney: 115,
  },

  {
    day: 13,
    conceptId: 'async_callbacks',
    title: 'Day 13: Timer Timer - Asynchronous Callbacks',
    conceptName: 'Asynchronous JavaScript (Callbacks)',
    story: 'Brewing espresso takes time! JavaScript executes non-blocking code asynchronously using callback functions.',
    explanation: 'Callbacks allow code to execute after a task (like boiling water or grinding beans) completes.',
    javaJoeTip: 'Callbacks are the foundation of async JS! Pass a function that runs once brewing is finished.',
    customer: {
      id: 'c13',
      name: 'Async Abby',
      avatar: '👩‍💻',
      title: 'DevOps Lead',
      dialogue: 'Brew my coffee with a callback function that notifies me when it is ready!',
      orderText: 'Create `brewAsync(callback)`. Call `callback("Drink Ready!")`. Pass a function to `brewAsync` that logs the message.',
      tipMultiplier: 1.35,
    },
    starterCode: `// Day 13: Asynchronous Callback Function
function brewAsync(callback) {
  // Execute callback with argument "Drink Ready!"
}

// Call brewAsync with a callback that console.logs the result

`,
    solutionCode: `function brewAsync(callback) {\n  callback("Drink Ready!");\n}\nbrewAsync((msg) => console.log(msg));`,
    testCases: [
      {
        description: 'Should log "Drink Ready!"',
        validate: (logs) => logs.some((l) => l.includes('Drink Ready!')),
      },
    ],
    dailyTargetMoney: 150,
    rewardMoney: 120,
  },

  {
    day: 14,
    conceptId: 'promises',
    title: 'Day 14: The Order Promise - Promises',
    conceptName: 'Promises',
    story: 'Store #3 in Cyber Harbor is opening today! Upgrade to Promises to handle order fulfillment cleanly with `.then()` and `.catch()`.',
    explanation: 'A `Promise` represents an operation that will complete in the future (`resolve`) or fail (`reject`).',
    javaJoeTip: 'Promises eliminate "callback hell" and make async code clean and chainable!',
    customer: {
      id: 'c14',
      name: 'Promise Pete',
      avatar: '🤵',
      title: 'Fullstack Architect',
      dialogue: 'Fulfill my Mocha order using a resolved Promise and `.then()`!',
      orderText: 'Create `const orderPromise = new Promise((resolve) => resolve("Mocha Complete"))`. Chain `.then(msg => console.log(msg))`.',
      tipMultiplier: 1.45,
    },
    starterCode: `// Day 14: Promises & .then()
const orderPromise = new Promise((resolve) => {
  resolve("Mocha Complete");
});

// Chain .then to log the resolved message!

`,
    solutionCode: `const orderPromise = new Promise((resolve) => {\n  resolve("Mocha Complete");\n});\norderPromise.then((msg) => console.log(msg));`,
    testCases: [
      {
        description: 'Should resolve and log "Mocha Complete"',
        validate: (logs) => logs.some((l) => l.includes('Mocha Complete')),
      },
    ],
    dailyTargetMoney: 150,
    rewardMoney: 125,
  },

  {
    day: 15,
    conceptId: 'async_await',
    title: 'Day 15: Modern Kitchen - Async / Await',
    conceptName: 'Async/Await',
    story: 'Simplify your Promise code with `async` and `await`! It makes asynchronous code look synchronous and easy to read.',
    explanation: 'Mark functions as `async` and use `await` before any Promise to wait for its resolution.',
    javaJoeTip: '`await` pauses execution inside the async function until the coffee Promise resolves!',
    customer: {
      id: 'c15',
      name: 'Speedy Stacy',
      avatar: '🏃‍♀️',
      title: 'Product Manager',
      dialogue: 'Use `async/await` to prepare my Cappuccino without blocking the counter!',
      orderText: 'Define `async function prepareOrder()`. Await `Promise.resolve("Cappuccino Ready!")`. Log the result.',
      tipMultiplier: 1.4,
    },
    starterCode: `// Day 15: Async / Await Syntax
async function prepareOrder() {
  // const msg = await Promise.resolve("Cappuccino Ready!");
  // console.log(msg);
}

// Call prepareOrder()!

`,
    solutionCode: `async function prepareOrder() {\n  const msg = await Promise.resolve("Cappuccino Ready!");\n  console.log(msg);\n}\nprepareOrder();`,
    testCases: [
      {
        description: 'Should log "Cappuccino Ready!"',
        validate: (logs) => logs.some((l) => l.includes('Cappuccino Ready!')),
      },
    ],
    dailyTargetMoney: 150,
    rewardMoney: 130,
  },

  {
    day: 16,
    conceptId: 'es6_features',
    title: 'Day 16: Recipe Unpacking - ES6+ Destructuring & Spread',
    conceptName: 'ES6+ Features (Destructuring, Spread/Rest)',
    story: 'Unpack customer orders instantly using object destructuring `{ size, drink }` and combine toppings with spread operators `...toppings`!',
    explanation: 'Destructuring extracts properties from objects/arrays into distinct variables. Spread `...` expands collections.',
    javaJoeTip: 'Destructuring makes your code half as long and twice as clean!',
    customer: {
      id: 'c16',
      name: 'Modern Max',
      avatar: '🎧',
      title: 'Tech Influencer',
      dialogue: 'Destructure my order object `{ drink: "Americano", shots: 3 }` into separate variables!',
      orderText: 'Given `const order = { drink: "Americano", shots: 3 }`, destructure `const { drink, shots } = order`, and log `drink` and `shots`.',
      tipMultiplier: 1.45,
    },
    starterCode: `// Day 16: Object Destructuring
const order = { drink: "Americano", shots: 3 };

// 1. Destructure drink and shots from order
// 2. console.log(drink, shots)

`,
    solutionCode: `const order = { drink: "Americano", shots: 3 };\nconst { drink, shots } = order;\nconsole.log(drink, shots);`,
    testCases: [
      {
        description: 'Should log "Americano" and 3',
        validate: (logs) => logs.some((l) => l.includes('Americano') && l.includes('3')),
      },
    ],
    dailyTargetMoney: 150,
    rewardMoney: 135,
  },

  {
    day: 17,
    conceptId: 'modules',
    title: 'Day 17: Multi-File Cafe - Modules (Import/Export)',
    conceptName: 'Modules (Import/Export)',
    story: 'Organize your store codebase into modules! Export recipes from `menu.js` and import them into `barista.js`.',
    explanation: 'Use `export const item = ...` and `import { item } from "./menu.js"` to share code between files cleanly.',
    javaJoeTip: 'Modular architecture allows multiple developers to work on different coffee recipes simultaneously!',
    customer: {
      id: 'c17',
      name: 'System Steve',
      avatar: '👨‍💼',
      title: 'Solutions Architect',
      dialogue: 'Export your menu object and import it into our main shop module!',
      orderText: 'Simulate module exports: create `const menuModule = { espresso: 3.50 }` and log `menuModule.espresso`.',
      tipMultiplier: 1.4,
    },
    starterCode: `// Day 17: Module Simulation
const menuModule = {
  espresso: 3.50,
  latte: 4.50
};

// console.log("Espresso Price:", menuModule.espresso);

`,
    solutionCode: `const menuModule = {\n  espresso: 3.50,\n  latte: 4.50\n};\nconsole.log("Espresso Price:", menuModule.espresso);`,
    testCases: [
      {
        description: 'Should log "Espresso Price: 3.5"',
        validate: (logs) => logs.some((l) => l.includes('3.5')),
      },
    ],
    dailyTargetMoney: 150,
    rewardMoney: 140,
  },

  {
    day: 18,
    conceptId: 'event_loop',
    title: 'Day 18: Non-Blocking Counter - The Event Loop',
    conceptName: 'The Event Loop',
    story: 'Master the JavaScript Event Loop! Microtasks (Promises) run before Macrotasks (`setTimeout`), allowing responsive order processing.',
    explanation: 'The Event Loop manages execution: Synchronous code -> Microtask queue (Promises) -> Macrotask queue (setTimeout).',
    javaJoeTip: 'Promises take priority in the Microtask queue over `setTimeout` Macrotasks!',
    customer: {
      id: 'c18',
      name: 'Looping Leo',
      avatar: '⏳',
      title: 'Performance Engineer',
      dialogue: 'Demonstrate microtask priority over macrotasks in the console output!',
      orderText: 'Log `"1: Call Stack"`, schedule `Promise.resolve().then(() => console.log("2: Microtask"))`, and `setTimeout(() => console.log("3: Macrotask"), 0)`.',
      tipMultiplier: 1.5,
    },
    starterCode: `// Day 18: Event Loop Execution Order
console.log("1: Call Stack");

// Schedule setTimeout macrotask for "3: Macrotask"
// Schedule Promise microtask for "2: Microtask"

`,
    solutionCode: `console.log("1: Call Stack");\nsetTimeout(() => console.log("3: Macrotask"), 0);\nPromise.resolve().then(() => console.log("2: Microtask"));`,
    testCases: [
      {
        description: 'Should log "1: Call Stack"',
        validate: (logs) => logs.some((l) => l.includes('1: Call Stack')),
      },
    ],
    dailyTargetMoney: 150,
    rewardMoney: 145,
  },

  {
    day: 19,
    conceptId: 'json_serialization',
    title: 'Day 19: Digital Receipts - JSON & Data Serialization',
    conceptName: 'JSON and Data Serialization',
    story: 'Convert customer receipts into JSON format to send sales data to Java Joe\'s central headquarters server!',
    explanation: '`JSON.stringify(object)` turns JavaScript objects into strings, while `JSON.parse(string)` converts JSON strings back into objects.',
    javaJoeTip: 'JSON is the standard language of web APIs worldwide!',
    customer: {
      id: 'c19',
      name: 'Data Daisy',
      avatar: '🧾',
      title: 'Cloud Engineer',
      dialogue: 'Serialize our order receipt object `{ item: "Cold Brew", price: 5 }` into JSON text!',
      orderText: 'Create `receipt = { item: "Cold Brew", price: 5 }`. Convert with `JSON.stringify(receipt)` and log the JSON string.',
      tipMultiplier: 1.45,
    },
    starterCode: `// Day 19: JSON Serialization
const receipt = { item: "Cold Brew", price: 5.00 };

// 1. Convert receipt to JSON string using JSON.stringify
// 2. console.log the JSON string!

`,
    solutionCode: `const receipt = { item: "Cold Brew", price: 5.00 };\nconst jsonString = JSON.stringify(receipt);\nconsole.log(jsonString);`,
    testCases: [
      {
        description: 'Should log serialized JSON string containing "Cold Brew"',
        validate: (logs) => logs.some((l) => l.includes('Cold Brew') && l.includes('price')),
      },
    ],
    dailyTargetMoney: 150,
    rewardMoney: 150,
  },

  {
    day: 20,
    conceptId: 'storage',
    title: 'Day 20: Persistent Ledger - Local & Session Storage',
    conceptName: 'Local Storage and Session Storage',
    story: 'Save our daily sales record to `localStorage` so data stays safe even if the browser reloads!',
    explanation: '`localStorage.setItem("key", "value")` stores data permanently in the browser until cleared.',
    javaJoeTip: 'LocalStorage keeps user preferences and high scores saved between sessions!',
    customer: {
      id: 'c20',
      name: 'Storage Sid',
      avatar: '💾',
      title: 'Database Admin',
      dialogue: 'Save today\'s earnings "$500" into `localStorage` under key `"todaySales"`!',
      orderText: 'Call `localStorage.setItem("todaySales", "500")`. Then `console.log(localStorage.getItem("todaySales"))`.',
      tipMultiplier: 1.5,
    },
    starterCode: `// Day 20: Web Storage API
// 1. Save "500" to localStorage with key "todaySales"
// 2. Get the item from localStorage and console.log it!

`,
    solutionCode: `localStorage.setItem("todaySales", "500");\nconsole.log(localStorage.getItem("todaySales"));`,
    testCases: [
      {
        description: 'Should retrieve and log "500" from localStorage',
        validate: (logs) => logs.some((l) => l.includes('500')),
      },
    ],
    dailyTargetMoney: 150,
    rewardMoney: 155,
  },

  {
    day: 21,
    conceptId: 'fetch_api',
    title: 'Day 21: Market Ticker - Fetch API & HTTP Requests',
    conceptName: 'Fetch API and HTTP Requests',
    story: 'Store #4 in Silicon Square is unlocked! Connect to the live coffee bean market API using `fetch()`.',
    explanation: '`fetch(url)` sends HTTP requests and returns a Promise resolving to a Response object.',
    javaJoeTip: 'Use `fetch(url).then(res => res.json())` to parse API responses seamlessly!',
    customer: {
      id: 'c21',
      name: 'APIs Aaron',
      avatar: '🌐',
      title: 'API Developer',
      dialogue: 'Simulate a fetch request to get coffee bean stock prices from our API endpoint!',
      orderText: 'Create simulated `fakeFetch(url)` returning `Promise.resolve({ status: "OK", beanPrice: 12 })`. Log `data.beanPrice`.',
      tipMultiplier: 1.55,
    },
    starterCode: `// Day 21: Fetch API Simulation
function fakeFetch(url) {
  return Promise.resolve({ status: "OK", beanPrice: 12 });
}

// Call fakeFetch("/api/coffee").then(data => console.log("Bean Price:", data.beanPrice));

`,
    solutionCode: `function fakeFetch(url) {\n  return Promise.resolve({ status: "OK", beanPrice: 12 });\n}\nfakeFetch("/api/coffee").then((data) => console.log("Bean Price:", data.beanPrice));`,
    testCases: [
      {
        description: 'Should log "Bean Price: 12"',
        validate: (logs) => logs.some((l) => l.includes('12')),
      },
    ],
    dailyTargetMoney: 150,
    rewardMoney: 160,
  },

  {
    day: 22,
    conceptId: 'regex',
    title: 'Day 22: Coupon Code Validator - Regular Expressions',
    conceptName: 'Regular Expressions',
    story: 'Customers are trying to use discount coupons! Validate promo codes with Regular Expression patterns like `/^JAVA-\\d{4}$/`.',
    explanation: 'Regular Expressions match character combinations in strings. `.test(str)` returns `true` or `false`.',
    javaJoeTip: 'Regex patterns like `^JAVA-\\d{4}$` ensure promo codes start with JAVA- followed by 4 digits!',
    customer: {
      id: 'c22',
      name: 'Regex Rita',
      avatar: '🔍',
      title: 'Security Auditor',
      dialogue: 'Validate my coupon code "JAVA-2026" using a Regular Expression!',
      orderText: 'Create `const pattern = /^JAVA-\\d{4}$/`. Test `"JAVA-2026"` and `console.log(pattern.test("JAVA-2026"))`.',
      tipMultiplier: 1.5,
    },
    starterCode: `// Day 22: Regular Expression Coupon Guard
const codePattern = /^JAVA-\\d{4}$/;
const userCoupon = "JAVA-2026";

// 1. Test userCoupon against codePattern
// 2. console.log the boolean result (should be true)!

`,
    solutionCode: `const codePattern = /^JAVA-\\d{4}$/;\nconst userCoupon = "JAVA-2026";\nconsole.log(codePattern.test(userCoupon));`,
    testCases: [
      {
        description: 'Should log true for valid coupon format',
        validate: (logs) => logs.some((l) => l.includes('true')),
      },
    ],
    dailyTargetMoney: 150,
    rewardMoney: 165,
  },

  {
    day: 23,
    conceptId: 'classes_inheritance',
    title: 'Day 23: Appliance Blueprint - Classes & Inheritance',
    conceptName: 'Classes and Inheritance',
    story: 'Upgrade our store equipment hierarchy using ES6 Classes! Create a base `Appliance` class and extend it into `EspressoMachine`.',
    explanation: 'Classes provide clean Object-Oriented syntax with `constructor`, `methods`, and `extends` for inheritance.',
    javaJoeTip: '`super()` passes arguments to the parent class constructor!',
    customer: {
      id: 'c23',
      name: 'OOP Oscar',
      avatar: '🏗️',
      title: 'Senior Software Engineer',
      dialogue: 'Build an `EspressoMachine` class that extends `Appliance` and overrides `brew()`!',
      orderText: 'Define `class Appliance { constructor(brand) { this.brand = brand; } }`. Extend `class EspressoMachine extends Appliance { brew() { return this.brand + " brewing!"; } }`. Log `new EspressoMachine("DeLonghi").brew()`.',
      tipMultiplier: 1.6,
    },
    starterCode: `// Day 23: Classes & Inheritance
class Appliance {
  constructor(brand) {
    this.brand = brand;
  }
}

// 1. Create class EspressoMachine extending Appliance
// 2. Add method brew() returning this.brand + " brewing!"
// 3. Instantiate machine = new EspressoMachine("DeLonghi") and log machine.brew()

`,
    solutionCode: `class Appliance {\n  constructor(brand) {\n    this.brand = brand;\n  }\n}\nclass EspressoMachine extends Appliance {\n  brew() {\n    return this.brand + " brewing!";\n  }\n}\nconst machine = new EspressoMachine("DeLonghi");\nconsole.log(machine.brew());`,
    testCases: [
      {
        description: 'Should log "DeLonghi brewing!"',
        validate: (logs) => logs.some((l) => l.includes('DeLonghi brewing!')),
      },
    ],
    dailyTargetMoney: 150,
    rewardMoney: 170,
  },

  {
    day: 24,
    conceptId: 'debugging_devtools',
    title: 'Day 24: Bug Hunting - Debugging & DevTools',
    conceptName: 'Debugging and DevTools',
    story: 'You hit Day 24! Before unlocking the final Metropolis Flagship store, fix a sneaky bug in our bill calculation code using `console.table()` and step debugging!',
    explanation: 'Use `console.table()` to display tabular data clearly, and use inspect tools to trace scope variables.',
    javaJoeTip: 'Master developers spend 80% of their time debugging! Inspecting data structures avoids costly bugs.',
    customer: {
      id: 'c24',
      name: 'Bug Hunter Bob',
      avatar: '🐛',
      title: 'Lead QA Architect',
      dialogue: 'Debug this price calculation array and log the correct total using console output!',
      orderText: 'Fix the bug in `items = [{price: 5}, {price: 10}]`. Sum total prices (15) and log `"Fixed Total:", 15`.',
      tipMultiplier: 1.65,
    },
    starterCode: `// Day 24: Bug Fixing Challenge
const items = [{ price: 5 }, { price: 10 }];

// Calculate correct total sum of items (15)
// console.log("Fixed Total:", total);

`,
    solutionCode: `const items = [{ price: 5 }, { price: 10 }];\nconst total = items.reduce((sum, item) => sum + item.price, 0);\nconsole.log("Fixed Total:", total);`,
    testCases: [
      {
        description: 'Should log "Fixed Total: 15"',
        validate: (logs) => logs.some((l) => l.includes('15')),
      },
    ],
    dailyTargetMoney: 150,
    rewardMoney: 180,
  },

  {
    day: 25,
    conceptId: 'variables',
    title: 'Day 25: Franchise Expansion I - State Synchronization',
    conceptName: 'Franchise Architecture',
    story: 'Java Joe officially opened Store #5 Metropolis Flagship! Today, synchronize store stats across all 5 franchise locations.',
    explanation: 'Combine object state mapping with array methods to balance inventory across multiple stores.',
    javaJoeTip: 'Welcome to the big leagues Jones! Managing 5 stores requires synchronized global state.',
    customer: {
      id: 'c25',
      name: 'Executive Erica',
      avatar: '💼',
      title: 'VP of Coffee Operations',
      dialogue: 'Compute total daily revenue across all 5 stores: [150, 300, 450, 600, 1000]!',
      orderText: 'Given `const storeRevenues = [150, 300, 450, 600, 1000]`, calculate `total = storeRevenues.reduce(...)` and log `"Franchise Revenue:", total`.',
      tipMultiplier: 1.7,
    },
    starterCode: `// Day 25: Multi-Store State Synchronization
const storeRevenues = [150, 300, 450, 600, 1000];

// Sum all store revenues into total
// console.log("Franchise Revenue:", total);

`,
    solutionCode: `const storeRevenues = [150, 300, 450, 600, 1000];\nconst total = storeRevenues.reduce((a, b) => a + b, 0);\nconsole.log("Franchise Revenue:", total);`,
    testCases: [
      {
        description: 'Should log "Franchise Revenue: 2500"',
        validate: (logs) => logs.some((l) => l.includes('2500')),
      },
    ],
    dailyTargetMoney: 150,
    rewardMoney: 200,
  },

  {
    day: 26,
    conceptId: 'classes_inheritance',
    title: 'Day 26: Franchise Expansion II - Design Patterns',
    conceptName: 'Design Patterns',
    story: 'Implement the Singleton Pattern for Java Joe\'s central Coffee Machine Factory manager object.',
    explanation: 'The Singleton pattern restricts instantiation of a class to a single global instance.',
    javaJoeTip: 'Singletons ensure all 5 store locations share the exact same machine configuration!',
    customer: {
      id: 'c26',
      name: 'Architect Arthur',
      avatar: '🏛️',
      title: 'Chief Software Architect',
      dialogue: 'Ensure `Factory.getInstance()` always returns the exact same instance!',
      orderText: 'Create `const Factory = { instance: null, getInstance() { if (!this.instance) this.instance = { id: 1 }; return this.instance; } }`. Log `Factory.getInstance().id`.',
      tipMultiplier: 1.75,
    },
    starterCode: `// Day 26: Singleton Pattern
const Factory = {
  instance: null,
  getInstance() {
    if (!this.instance) {
      this.instance = { id: 1, name: 'Central Brew Engine' };
    }
    return this.instance;
  }
};

// console.log(Factory.getInstance().name);

`,
    solutionCode: `const Factory = {\n  instance: null,\n  getInstance() {\n    if (!this.instance) {\n      this.instance = { id: 1, name: 'Central Brew Engine' };\n    }\n    return this.instance;\n  }\n};\nconsole.log(Factory.getInstance().name);`,
    testCases: [
      {
        description: 'Should log "Central Brew Engine"',
        validate: (logs) => logs.some((l) => l.includes('Central Brew Engine')),
      },
    ],
    dailyTargetMoney: 150,
    rewardMoney: 220,
  },

  {
    day: 27,
    conceptId: 'event_loop',
    title: 'Day 27: Franchise Expansion III - High Velocity Rush',
    conceptName: 'Event Loop Optimization',
    story: 'Morning rush hour across all 5 stores! Optimize high-throughput order queues using debouncing and asynchronous batching.',
    explanation: 'Batching rapid events reduces overhead and prevents UI freezing during extreme traffic spikes.',
    javaJoeTip: 'Batching 100 customer orders into a single transaction saves CPU cycles!',
    customer: {
      id: 'c27',
      name: 'Venture Vic',
      avatar: '🚀',
      title: 'Venture Capitalist',
      dialogue: 'Batch process 3 rush orders into a single automated coffee delivery pipeline!',
      orderText: 'Process `const rushOrders = ["Espresso", "Latte", "Mocha"]` with `.map(d => "Served " + d)` and log the resulting array.',
      tipMultiplier: 1.8,
    },
    starterCode: `// Day 27: Rapid Batch Order Pipeline
const rushOrders = ["Espresso", "Latte", "Mocha"];

// Map over rushOrders into processed array: ["Served Espresso", "Served Latte", "Served Mocha"]
// console.log(processed.join(", "));

`,
    solutionCode: `const rushOrders = ["Espresso", "Latte", "Mocha"];\nconst processed = rushOrders.map(d => "Served " + d);\nconsole.log(processed.join(", "));`,
    testCases: [
      {
        description: 'Should log "Served Espresso, Served Latte, Served Mocha"',
        validate: (logs) => logs.some((l) => l.includes('Served Espresso') && l.includes('Served Mocha')),
      },
    ],
    dailyTargetMoney: 150,
    rewardMoney: 250,
  },

  {
    day: 28,
    conceptId: 'es6_features',
    title: 'Day 28: Grand Finale - Java Master Certification & Empire Victory!',
    conceptName: 'Mastery & Capstone',
    story: 'YOU MADE IT! 28 Days of JavaScript Coffee Mastery! Java Joe is handing you full partnership in the Java Empire. Pass the final master barista challenge to claim your JavaScript Master Certification!',
    explanation: 'Combine variables, functions, closures, objects, promises, and classes into one master script.',
    javaJoeTip: 'I am so proud of you Java Jones! You started with standard variables and now master modern JavaScript fullstack development!',
    customer: {
      id: 'c28',
      name: 'Java Joe & The Board',
      avatar: '👑',
      title: 'Coffee Empire Board of Directors',
      dialogue: 'Print the grand inauguration message for our 5-store JavaScript Coffee Empire!',
      orderText: 'Log `"JAVA JONES: JAVASCRIPT MASTER & COFFEE EMPIRE PARTNER!"`.',
      tipMultiplier: 2.0,
    },
    starterCode: `// Day 28: Final Master Certification
// Print the ultimate victory message:
// console.log("JAVA JONES: JAVASCRIPT MASTER & COFFEE EMPIRE PARTNER!");

`,
    solutionCode: `console.log("JAVA JONES: JAVASCRIPT MASTER & COFFEE EMPIRE PARTNER!");`,
    testCases: [
      {
        description: 'Should log master victory message',
        validate: (logs) => logs.some((l) => l.includes('JAVASCRIPT MASTER') || l.includes('COFFEE EMPIRE')),
      },
    ],
    dailyTargetMoney: 150,
    rewardMoney: 500,
  },
];
