// JS content — Part 5: OOP, Advanced JS, Performance/Internals, Interview & Projects

export const jsContentE = {
  prototype: {
    overview:
      'JavaScript **prototype-based inheritance** use karता hai (classes ke peeche bhi yahi). Har object ka ek **hidden link** hota hai apne **prototype** se. Property na mile to JS prototype mein dhoondता — yahi **prototype chain**. Constructor functions purana tarika tha objects banाne ka.',
    why:
      'Classes, inheritance, built-in methods (Array.map kahan se aaya?) — sab prototype par chalte. "Prototype chain explain karo" senior interview ka guaranteed question hai.',
    concept: [
      { h: 'Prototype kya hai?', p: 'Har object ka ek prototype object hota (uska "parent"). Property/method object par na mile to JS prototype mein dhoondता.', code: `const arr = [1, 2]\narr.map(x => x) // map arr par nahi, Array.prototype par\nObject.getPrototypeOf(arr) === Array.prototype // true` },
      { h: 'Prototype chain', p: 'object → uska prototype → uska prototype → ... → null. JS is chain mein upar tak dhoondता.', code: `// arr → Array.prototype → Object.prototype → null\narr.toString() // Object.prototype se mila` },
      { h: 'Constructor functions', p: 'new ke saath call hone wali functions. `this` naya object, methods prototype par.', code: `function Person(name) {\n  this.name = name\n}\nPerson.prototype.greet = function () {\n  return 'Hi ' + this.name\n}\nconst p = new Person('A')\np.greet() // 'Hi A'` },
      { h: 'new keyword kya karता', p: '1) naya empty object, 2) uska prototype = Fn.prototype, 3) this = naya object, 4) constructor chalता, 5) object return.', code: `// new Person('A') internally:\n// const o = {}\n// o.__proto__ = Person.prototype\n// Person.call(o, 'A')\n// return o` },
    ],
    analogy:
      'Prototype chain ek **family inheritance** jaisा hai. Tumhare paas koi cheez na ho (property) to papa (prototype) se maango, unke paas na ho to dada (next prototype) se — aise upar tak (null = end). Methods prototype par ek baar — saare objects share karte (memory bachat). 👨‍👩‍👧',
    syntax: { code: `function Fn(x) { this.x = x }\nFn.prototype.method = function () {}\nconst obj = new Fn(1)\n\nObject.getPrototypeOf(obj)  // Fn.prototype\nobj instanceof Fn          // true`, note: '__proto__ object ka actual prototype; prototype constructor function ki property.' },
    steps: [
      'obj.prop access hua.',
      'JS pehle obj par khud dhoondता.',
      'Na mile to obj ke prototype par.',
      'Na mile to prototype ke prototype par (chain upar).',
      'Object.prototype tak; na mile to undefined (chain null par khatam).',
    ],
    visual: {
      type: 'tree',
      root: 'obj',
      children: [{ label: 'Fn.prototype', sub: 'custom methods', children: [{ label: 'Object.prototype', sub: 'toString etc', children: [{ label: 'null', sub: 'chain end' }] }] }],
    },
    examples: [
      { level: 'Intermediate', title: 'Constructor + prototype', code: `function Animal(name) { this.name = name }\nAnimal.prototype.speak = function () {\n  return this.name + ' makes a sound'\n}\nconst dog = new Animal('Dog')\nconsole.log(dog.speak())`, result: 'Dog makes a sound', explain: 'speak prototype par — saare instances share karte.' },
      { level: 'Advanced', title: 'Prototype chain proof', code: `const arr = [1, 2, 3]\nconsole.log(arr.hasOwnProperty('length'))\nconsole.log(Object.getPrototypeOf(arr) === Array.prototype)\nconsole.log(arr.__proto__.__proto__ === Object.prototype)`, result: ['true', 'true', 'true'], explain: 'arr → Array.prototype → Object.prototype.' },
    ],
    memory:
      'Methods prototype par ek hi baar store hote — saare instances same method reference share karte (har instance par copy nahi). Yahi prototype ka memory advantage hai. Instance ki own properties (this.x) har object par alag. Prototype chain lookup runtime par hota.',
    notes: {
      concept: 'Har object ka prototype; missing property prototype chain mein dhoondi jaती.',
      tip: 'Shared methods prototype par rakho (memory efficient).',
      warning: 'Built-in prototypes (Array.prototype) modify mat karo (prototype pollution).',
      error: '__proto__ aur prototype confuse mat karo — alag cheezein.',
    },
    compare: {
      headers: ['Term', 'Kya hai'],
      rows: [
        ['prototype', 'Constructor function ki property (shared object)'],
        ['__proto__', 'Object ka actual prototype link'],
        ['Prototype chain', 'Lookup ka raasta (upar tak)'],
        ['new', 'Object banाता + prototype link karता'],
      ],
    },
    mistakes: [
      { bad: 'prototype aur __proto__ ko same samajhna.', fix: 'prototype = fn property; __proto__ = instance link.' },
      { bad: 'Methods constructor ke andar this par (har instance copy).', fix: 'Prototype par rakho (shared).' },
    ],
    best: ['Shared methods prototype par.', 'Modern code mein class syntax (cleaner).', 'Built-in prototypes extend mat karo.', 'instanceof / Object.getPrototypeOf use karo.'],
    interview: {
      intermediate: [
        { q: 'Prototype kya hai?', a: 'Har object ka ek linked prototype object hota hai. Property na mile to JS prototype mein dhoondता — inheritance ka base.' },
        { q: 'Prototype chain kya hai?', a: 'object → prototype → prototype → ... → null. JS property lookup is chain mein upar tak karता.' },
      ],
      advanced: [
        { q: 'new keyword internally kya karता?', a: 'Naya object banाता, uska __proto__ = constructor.prototype set karता, this ko us object par bind karke constructor chalाता, phir object return karता.' },
        { q: 'prototype vs __proto__?', a: 'prototype constructor function ki property (jisse instances ka __proto__ link hota). __proto__ kisi object ka actual prototype reference hai.' },
      ],
    },
    mcqs: [
      { q: 'Property na mile to?', options: ['Error', 'Prototype chain dhoondta', 'null', '0'], answer: 1, explain: 'Chain mein upar dhoondता, na mile to undefined.' },
      { q: 'Chain ka end?', options: ['Object', 'null', 'Array', 'window'], answer: 1, explain: 'null par khatam.' },
    ],
    exercises: {
      easy: ['Ek constructor function se 2 objects banao.'],
      medium: ['Prototype par ek shared method add karो.'],
      advanced: ['Prototype chain ko console.log se trace karो (3 levels).'],
    },
    summary: [
      'JS prototype-based inheritance use karता.',
      'Missing property prototype chain mein dhoondi jaती.',
      'Methods prototype par = shared (memory efficient).',
      'new object banाता + prototype link karता.',
    ],
    cheatsheet: [
      { h: 'Prototype', code: `Fn.prototype.m=function(){}\nnew Fn()\nObject.getPrototypeOf(o)\no instanceof Fn` },
    ],
    advanced:
      'Object.create(proto) directly proto-linked object banाता. Prototype pollution security vulnerability hai (__proto__ injection). class syntax internally prototype hi use karता (sugar). Inheritance ke liye Child.prototype = Object.create(Parent.prototype) (purana), ya extends (modern).',
    quiz: [
      { q: 'Array.map kahan?', options: ['Har array', 'Array.prototype', 'Object', 'window'], answer: 1, explain: 'Array.prototype par (shared).' },
      { q: 'new this ko kya bind?', options: ['window', 'Naya object', 'null', 'prototype'], answer: 1, explain: 'Naya banaya object.' },
    ],
    related: ['classes', 'oop-principles', 'objects'],
  },

  classes: {
    overview:
      '`class` ES6 ka clean syntax hai objects aur inheritance ke liye — internally prototype hi use karता ("syntactic sugar"). `constructor` initialization, methods prototype par, `extends` inheritance, `super` parent ko call, `static` class-level, `#` private fields.',
    why:
      'Modern OOP code classes use karta. React class components (purane), libraries, custom errors sab classes. extends/super/static interview mein aate.',
    concept: [
      { h: 'Class basics', p: '`constructor` object initialize karता. Methods automatically prototype par (shared).', code: `class Person {\n  constructor(name) {\n    this.name = name\n  }\n  greet() {\n    return 'Hi ' + this.name\n  }\n}\nconst p = new Person('A')` },
      { h: 'Inheritance: extends & super', p: '`extends` se child class. `super(...)` parent constructor call. `super.method()` parent method.', code: `class Student extends Person {\n  constructor(name, grade) {\n    super(name)\n    this.grade = grade\n  }\n}` },
      { h: 'static methods', p: '`static` se class-level method/property (instance par nahi, class par). Utility/factory ke liye.', code: `class MathUtil {\n  static square(x) { return x * x }\n}\nMathUtil.square(5) // 25 (no instance)` },
      { h: 'Private fields (#)', p: '`#` se truly private fields/methods — bahar se access nahi (encapsulation).', code: `class Counter {\n  #count = 0\n  inc() { this.#count++ }\n  get value() { return this.#count }\n}` },
    ],
    analogy:
      'Class ek **blueprint/factory mould** hai — ek baar design, kitne bhi objects (instances) banाओ. extends = mould ko upgrade karके naya specialized mould banाना. super = "parent factory ka setup pehle chalाओ". static = factory ke counter par rakhi cheez (har product mein nahi). 🏭',
    syntax: { code: `class Name extends Parent {\n  #private = 0\n  constructor(x) { super(); this.x = x }\n  method() {}\n  static util() {}\n  get prop() {}\n}`, note: 'super() child constructor mein this use karne se PEHLE call karना zaroori.' },
    examples: [
      { level: 'Intermediate', title: 'Inheritance', code: `class Animal {\n  constructor(name) { this.name = name }\n  speak() { return this.name + ' sounds' }\n}\nclass Dog extends Animal {\n  speak() { return this.name + ' barks' }\n}\nconsole.log(new Dog('Tommy').speak())`, result: 'Tommy barks', explain: 'Dog ne speak override kiya (polymorphism).' },
      { level: 'Advanced', title: 'super + static + private', code: `class Account {\n  #balance = 0\n  constructor(b) { this.#balance = b }\n  deposit(x) { this.#balance += x; return this }\n  get balance() { return this.#balance }\n  static create(b) { return new Account(b) }\n}\nconst a = Account.create(100)\na.deposit(50)\nconsole.log(a.balance)`, result: '150', explain: '#balance private, static factory, getter.' },
    ],
    memory:
      'Class methods prototype par store hote (shared, memory efficient — constructor mein function rakhne se behtar). Instance fields (this.x, #private) har object par alag. Private #fields engine-level private (closures se bhi safe). Inheritance prototype chain extend karता.',
    notes: {
      concept: 'class = prototype ka clean syntax. extends/super/static/#.',
      tip: 'Methods automatically prototype par — efficient.',
      warning: 'super() ko this use karne se pehle call karna zaroori (child constructor).',
      error: 'Class hoist hoti par TDZ mein — declare se pehle use → ReferenceError.',
    },
    compare: {
      headers: ['Feature', 'Constructor function', 'class'],
      rows: [
        ['Syntax', 'function + prototype', 'Clean class'],
        ['Inheritance', 'Object.create manual', 'extends/super'],
        ['Methods', 'Manual prototype', 'Auto prototype'],
        ['Private', 'Closures/convention', '#fields'],
        ['Hoisting', 'Function-hoisted', 'TDZ'],
      ],
    },
    mistakes: [
      { bad: 'super() ke pehle this use karna.', fix: 'Pehle super() call karो.' },
      { bad: 'Class ko declare se pehle use.', fix: 'TDZ — declare ke baad use.' },
    ],
    best: ['Methods class body mein (auto prototype).', 'Private state #fields se.', 'Factory ke liye static.', 'Inheritance se zyada composition prefer karो.'],
    interview: {
      beginner: [
        { q: 'class kya hai?', a: 'Objects aur inheritance ka clean ES6 syntax. Internally prototype use karता (syntactic sugar).' },
        { q: 'constructor kya karта?', a: 'Object bante time chalता — instance properties initialize karता (this.x = ...).' },
      ],
      intermediate: [
        { q: 'extends aur super?', a: 'extends se child class parent se inherit. super(...) parent constructor call, super.method() parent method.' },
        { q: 'static method kya?', a: 'Class par lagता (instance par nahi) — ClassName.method(). Utility/factory ke liye.' },
      ],
      advanced: [
        { q: 'class sach mein OOP class hai ya sugar?', a: 'Syntactic sugar over prototype-based inheritance. Methods prototype par jaते, extends prototype chain set karता. Behind the scenes prototype hi hai.' },
      ],
    },
    mcqs: [
      { q: 'class internally kya?', options: ['Naya system', 'Prototype', 'Object only', 'Function only'], answer: 1, explain: 'Prototype ka sugar.' },
      { q: 'Parent constructor call?', options: ['this()', 'super()', 'parent()', 'base()'], answer: 1, explain: 'super().' },
    ],
    exercises: {
      easy: ['Ek class banao with constructor aur ek method.'],
      medium: ['extends se inheritance + method override karो.'],
      advanced: ['Private #field + getter + static factory wali class banao.'],
    },
    summary: [
      'class = prototype ka clean syntax.',
      'constructor init, methods auto-prototype.',
      'extends inheritance, super parent call.',
      'static class-level, # private fields.',
    ],
    cheatsheet: [
      { h: 'Class', code: `class C extends P{\n  #priv=0\n  constructor(){super()}\n  m(){}\n  static s(){}\n}` },
    ],
    projects: ['Bank account class', 'Shape hierarchy (area)', 'Custom Error classes', 'EventEmitter class', 'State machine'],
    advanced:
      'Mixins (multiple behaviours compose), getters/setters, static blocks, private methods (#method). class fields proposal ne arrow methods (auto-bind this) diye. Inheritance deep chains se composition (has-a) behtar mana jaता ("favour composition over inheritance").',
    quiz: [
      { q: '# kya banाता?', options: ['Static', 'Private field', 'Getter', 'Comment'], answer: 1, explain: 'Truly private field.' },
      { q: 'static method call?', options: ['instance.m()', 'Class.m()', 'this.m()', 'new m()'], answer: 1, explain: 'Class ke naam se.' },
    ],
    related: ['prototype', 'oop-principles', 'this-keyword'],
  },

  'oop-principles': {
    overview:
      'OOP (Object-Oriented Programming) ke **4 pillars**: **Encapsulation** (data + methods ek jagah, private hide), **Inheritance** (parent se properties), **Polymorphism** (ek interface, alag behaviour), **Abstraction** (complexity chhupाना, simple interface). Yeh maintainable, reusable code ke principles hain.',
    why:
      'OOP design ka base. "4 pillars explain karo" classic interview question. Real systems (libraries, frameworks) inhi principles par bante.',
    concept: [
      { h: 'Encapsulation', p: 'Data aur uspar kaam karne wale methods ek class mein bundle; internal state private (#) — bahar se direct access nahi, sirf controlled methods se.', code: `class BankAccount {\n  #balance = 0\n  deposit(x) { if (x > 0) this.#balance += x }\n  get balance() { return this.#balance }\n}` },
      { h: 'Inheritance', p: 'Child class parent ki properties/methods inherit karता — code reuse. extends/super.', code: `class Vehicle { start() { return 'started' } }\nclass Car extends Vehicle {} // start() inherit` },
      { h: 'Polymorphism', p: 'Same method naam, alag classes mein alag behaviour (override). Ek interface, many forms.', code: `class Shape { area() { return 0 } }\nclass Circle extends Shape { area() { return 3.14 * this.r ** 2 } }\nclass Square extends Shape { area() { return this.s ** 2 } }` },
      { h: 'Abstraction', p: 'Complex internal details chhupा kar simple interface dena. User ko "kaise" nahi, "kya" dikhता.', code: `class Car {\n  drive() { this.#startEngine(); this.#engageGear() }\n  #startEngine() {}\n  #engageGear() {}\n}\n// user sirf drive() jaanता` },
    ],
    analogy:
      'Car socho: **Encapsulation** = engine bonnet ke andar (chhupा). **Inheritance** = SportsCar normal car ki saari cheezein + extra. **Polymorphism** = "accelerate" har car mein, par electric vs petrol alag tarike se. **Abstraction** = tum sirf steering/pedal jaante ho, andar ka mechanism nahi. 🚗',
    syntax: { code: `// Encapsulation: #private + getters/setters\n// Inheritance: extends, super\n// Polymorphism: method override\n// Abstraction: public methods hide internals`, note: '4 pillars: E-I-P-A. Yaad rakhne ka shortcut: "A PIE".' },
    examples: [
      { level: 'Advanced', title: 'Polymorphism', code: `class Shape { area() { return 0 } }\nclass Circle extends Shape {\n  constructor(r) { super(); this.r = r }\n  area() { return Math.PI * this.r ** 2 }\n}\nclass Rect extends Shape {\n  constructor(w, h) { super(); this.w = w; this.h = h }\n  area() { return this.w * this.h }\n}\nconst shapes = [new Circle(2), new Rect(3, 4)]\nshapes.forEach(s => console.log(s.area().toFixed(2)))`, result: ['12.57', '12.00'], explain: 'Same area() call, alag behaviour — polymorphism.' },
    ],
    memory:
      'Inheritance prototype chain extend karता (methods shared). Encapsulation (#private) engine-level private memory deता. Deep inheritance chains lookup cost aur coupling badhाते — composition memory/maintainability mein often behtar.',
    notes: {
      concept: '4 pillars: Encapsulation, Inheritance, Polymorphism, Abstraction.',
      tip: 'Encapsulation #private + getters/setters se. Polymorphism method override se.',
      warning: 'Deep inheritance fragile — composition prefer karो.',
      error: 'Abstraction aur Encapsulation confuse mat karो — abstraction hides complexity, encapsulation hides data.',
    },
    compare: {
      headers: ['Pillar', 'Matlab', 'Kaise'],
      rows: [
        ['Encapsulation', 'Data hide + bundle', '#private, getters'],
        ['Inheritance', 'Parent se reuse', 'extends/super'],
        ['Polymorphism', 'Ek naam, alag behaviour', 'Method override'],
        ['Abstraction', 'Complexity hide', 'Simple public API'],
      ],
    },
    mistakes: [
      { bad: 'Sab kuch inheritance se solve karna.', fix: 'Composition often behtar (favour composition).' },
      { bad: 'Public state expose karna.', fix: 'Encapsulation — private + controlled access.' },
    ],
    best: ['Encapsulation: state private, methods public.', 'Polymorphism se flexible code.', 'Composition over inheritance.', 'Abstraction se clean interfaces.'],
    interview: {
      beginner: [
        { q: 'OOP ke 4 pillars?', a: 'Encapsulation, Inheritance, Polymorphism, Abstraction.' },
      ],
      intermediate: [
        { q: 'Encapsulation vs Abstraction?', a: 'Encapsulation data ko hide/bundle karता (private state). Abstraction implementation complexity chhupा kar simple interface deता. Encapsulation "how data protected", abstraction "how complexity hidden".' },
        { q: 'Polymorphism example?', a: 'Different classes mein same method (jaise area()) alag-alag implement — same call, alag result. Method overriding.' },
      ],
      advanced: [
        { q: 'JS mein OOP kaise (no real classes)?', a: 'Prototype-based inheritance. class syntax sugar hai. Encapsulation #private/closures se, polymorphism prototype override se.' },
      ],
    },
    mcqs: [
      { q: 'Data hide karta?', options: ['Inheritance', 'Encapsulation', 'Polymorphism', 'Loop'], answer: 1, explain: 'Encapsulation.' },
      { q: 'Ek naam alag behaviour?', options: ['Abstraction', 'Polymorphism', 'Inheritance', 'Encapsulation'], answer: 1, explain: 'Polymorphism.' },
    ],
    exercises: {
      easy: ['4 pillars likhо apne shabdon mein.'],
      medium: ['Encapsulation wali class (#private + getter) banao.'],
      advanced: ['Shape hierarchy banao polymorphic area() ke saath.'],
    },
    summary: [
      'Encapsulation: data hide + bundle.',
      'Inheritance: parent se reuse.',
      'Polymorphism: ek naam, alag behaviour.',
      'Abstraction: complexity hide, simple interface.',
    ],
    cheatsheet: [
      { h: '4 Pillars (A-PIE)', code: `Abstraction\nPolymorphism\nInheritance\nEncapsulation` },
    ],
    advanced:
      'SOLID principles (Single responsibility, Open-closed, Liskov, Interface segregation, Dependency inversion) OOP design ko aur robust banाते. Design patterns (Factory, Singleton, Observer, Strategy) inhi pillars par bante. JS mein composition + closures functional-OOP hybrid deta.',
    quiz: [
      { q: 'Composition over?', options: ['Encapsulation', 'Inheritance', 'Abstraction', 'Polymorphism'], answer: 1, explain: 'Favour composition over inheritance.' },
      { q: 'Pillars total?', options: ['3', '4', '5', '6'], answer: 1, explain: '4 pillars.' },
    ],
    related: ['classes', 'prototype', 'functional-programming'],
  },

  'es6-features': {
    overview:
      'ES6 (2015) ne JavaScript ko modern banaya. Key features: **let/const**, **arrow functions**, **template literals**, **destructuring**, **spread/rest**, **default parameters**, **modules**, **classes**, **promises**. Yeh sab modern code mein har jagah use hote.',
    why:
      'Har modern codebase (React, Node) ES6+ par chalti hai. Interview assume karта ki aap inhe fluently use karte ho. Clean, concise code inhi se.',
    concept: [
      { h: 'Destructuring', p: 'Array/object se values seedhे variables mein. Rename, default, nested.', code: `const [a, b] = [1, 2]\nconst { name, age = 18 } = user\nconst { x: posX } = point // rename` },
      { h: 'Spread & Rest', p: 'Spread (...) phailाता (copy/merge). Rest baaki collect karता.', code: `const merged = [...arr1, ...arr2]\nconst copy = { ...obj }\nfunction sum(...nums) {} // rest` },
      { h: 'Template literals & defaults', p: 'Backtick interpolation + multi-line. Default parameters.', code: `const msg = \`Hi \${name}\`\nfunction greet(name = 'Guest') {}` },
      { h: 'Arrow + classes + more', p: 'Arrow functions (lexical this), classes, enhanced object literals (shorthand), computed keys.', code: `const obj = { name, greet() {}, [key]: val }\nconst f = x => x * 2` },
    ],
    analogy:
      'ES6 JavaScript ka **smartphone upgrade** hai — purana keypad phone (ES5) bhi chalता tha, par ES6 ne touchscreen, apps, camera (arrow, destructuring, modules) de diye. Same kaam, par 10x clean aur fast. 📱',
    syntax: { code: `const { a, b } = obj            // destructure\nconst arr = [...a, ...b]        // spread\nfunction f(...args) {}          // rest\nconst s = \`Hi \${name}\`          // template\nfunction g(x = 1) {}            // default`, note: 'Yeh sab daily React/Node code mein use hote.' },
    examples: [
      { level: 'Beginner', title: 'Destructure + default', code: `const config = { theme: 'dark' }\nconst { theme, size = 'md' } = config\nconsole.log(theme, size)`, result: 'dark md' },
      { level: 'Intermediate', title: 'Spread merge', code: `const base = { a: 1, b: 2 }\nconst extended = { ...base, b: 9, c: 3 }\nconsole.log(extended)`, result: '{ a: 1, b: 9, c: 3 }', explain: 'Spread copy + override.' },
      { level: 'Advanced', title: 'Rest + swap', code: `const [first, ...rest] = [1, 2, 3, 4]\nconsole.log(first, rest)\nlet x = 1, y = 2;\n[x, y] = [y, x]\nconsole.log(x, y)`, result: ['1 [ 2, 3, 4 ]', '2 1'], explain: 'Rest baaki collect; destructure se swap.' },
    ],
    notes: {
      concept: 'ES6 = let/const, arrow, destructure, spread/rest, template, modules, classes.',
      tip: 'Destructuring + spread se code bahut clean hota.',
      warning: 'Spread shallow copy hai (nested shared).',
      error: 'Default param undefined par chalता, null par nahi.',
    },
    compare: {
      headers: ['Feature', 'ES5 (purana)', 'ES6+ (modern)'],
      rows: [
        ['Variables', 'var', 'let/const'],
        ['Functions', 'function', 'arrow (=>)'],
        ['String', '"a" + b', 'template `${b}`'],
        ['Extract', 'obj.a; obj.b', 'const {a,b}=obj'],
        ['Copy', 'manual loop', 'spread ...'],
      ],
    },
    mistakes: [
      { bad: 'var use karte rehna.', fix: 'let/const.' },
      { bad: 'Concatenation se strings.', fix: 'Template literals.' },
    ],
    best: ['Destructuring + spread freely use karो.', 'Default params for safety.', 'Template literals over concatenation.', 'Modules se code organize.'],
    interview: {
      beginner: [
        { q: 'ES6 ke main features?', a: 'let/const, arrow functions, template literals, destructuring, spread/rest, default params, classes, modules, promises.' },
      ],
      intermediate: [
        { q: 'Spread vs rest?', a: 'Spread (...) values phailाता (copy/merge arrays/objects). Rest (...) baaki values ek array/object mein collect karता (params/destructure).' },
      ],
      advanced: [
        { q: 'Destructuring default kab apply hota?', a: 'Sirf jab value undefined ho. null ya 0 par nahi — wo valid values mani jaती.' },
      ],
    },
    mcqs: [
      { q: '... copy/merge?', options: ['rest', 'spread', 'destructure', 'template'], answer: 1, explain: 'Spread.' },
      { q: 'Template literal char?', options: ['Quotes', 'Backticks', 'Brackets', 'Slash'], answer: 1, explain: 'Backticks.' },
    ],
    exercises: {
      easy: ['Object destructure with default karो.'],
      medium: ['Spread se 2 arrays merge karो.'],
      advanced: ['Rest params se variable-arg sum function banao.'],
    },
    summary: [
      'ES6 ne JS modern banaya.',
      'Destructuring, spread/rest, template literals.',
      'Default params, arrow, classes, modules.',
      'Clean + concise code.',
    ],
    cheatsheet: [
      { h: 'ES6', code: `const {a,b}=o\n[...a,...b]\nf(...args)\n\`Hi \${x}\`\n(x=1)=>x` },
    ],
    advanced:
      'ES2016+ har saal features: includes, exponentiation (**), async/await (ES2017), spread in objects (ES2018), flat/flatMap (ES2019), optional chaining/nullish (ES2020), top-level await (ES2022), Array.at. Babel purane browsers ke liye transpile karता.',
    quiz: [
      { q: 'let/const kis ES?', options: ['ES5', 'ES6', 'ES3', 'ES2020'], answer: 1, explain: 'ES6 (2015).' },
      { q: 'Default param trigger?', options: ['null', 'undefined', '0', 'false'], answer: 1, explain: 'Sirf undefined.' },
    ],
    related: ['objects', 'modules', 'functions-basics'],
  },

  modules: {
    overview:
      'Modules code ko alag **files** mein todने dete — har file apna scope. **export** se cheezein bahar share, **import** se use. Do types: **Named export** (kai cheezein) aur **Default export** (ek main). ES Modules (`import`/`export`) modern standard hai (purana CommonJS `require`).',
    why:
      'Bade apps maintainable rakhne ke liye modular hona zaroori. React/Node code modules se bhari. import/export + named vs default interview + daily use.',
    concept: [
      { h: 'export & import', p: 'export se file ki cheezein share. import se doosri file mein laओ.', code: `// math.js\nexport const add = (a, b) => a + b\n// app.js\nimport { add } from './math.js'` },
      { h: 'Named export', p: 'Kai cheezein export; import mein exact naam (curly braces). Rename `as`.', code: `export const a = 1\nexport const b = 2\n// import\nimport { a, b as bee } from './file'` },
      { h: 'Default export', p: 'Ek main thing per file; import mein koi bhi naam (no braces).', code: `export default function App() {}\n// import (koi naam)\nimport App from './App'` },
      { h: 'Combined & re-export', p: 'Default + named ek saath. import * as ns. Re-export from another.', code: `import App, { helper } from './x'\nimport * as utils from './utils'\nexport { foo } from './foo'` },
    ],
    analogy:
      'Modules ek **kitchen ke alag dabbe** hain — har dabbe (file) mein apni cheezein. export = "yeh dabba bahar use ke liye open". import = "us dabbe se yeh cheez le aao". Default export = dabbe ki **main dish**, named = side items. 🍱',
    syntax: { code: `// Named\nexport const x = 1\nimport { x } from './file'\n// Default\nexport default thing\nimport thing from './file'\n// Both + namespace\nimport def, { a, b } from './f'\nimport * as ns from './f'`, note: 'ES modules ke liye <script type="module"> ya bundler/Node "type":"module".' },
    examples: [
      { level: 'Beginner', title: 'Named export/import', code: `// utils.js\nexport const PI = 3.14\nexport function area(r) { return PI * r * r }\n// main.js\nimport { PI, area } from './utils.js'\nconsole.log(area(2))`, result: '12.56' },
      { level: 'Intermediate', title: 'Default + named', code: `// Button.js\nexport default function Button() {}\nexport const SIZE = 'md'\n// App.js\nimport Button, { SIZE } from './Button.js'`, explain: 'Default no braces, named with braces.' },
    ],
    memory:
      'Modules ek baar evaluate hote (singleton) — multiple imports same instance share karte (cached). Module-level variables module scope mein (global pollution nahi). Tree-shaking unused exports ko bundle se hata deता (named exports tree-shakeable hote).',
    notes: {
      concept: 'export share, import use. Named (braces) vs default (no braces).',
      tip: 'Default ek per file; named kai. Mix kar sakte.',
      warning: 'ES modules strict mode mein chalti aur module scope deti.',
      error: 'Named import ka naam exact match hona chahiye (default mein koi bhi).',
    },
    compare: {
      headers: ['Feature', 'Named export', 'Default export'],
      rows: [
        ['Count', 'Kai per file', 'Ek per file'],
        ['Import syntax', '{ name }', 'koi naam'],
        ['Rename', 'as keyword', 'Directly'],
        ['Tree-shaking', 'Behtar', 'Thoda kam'],
      ],
    },
    mistakes: [
      { bad: 'Default ko braces ke saath import.', fix: 'Default bina braces; named with braces.' },
      { bad: 'Named ka galat naam import.', fix: 'Exact export naam (ya as se rename).' },
    ],
    best: ['Named exports prefer (tree-shaking + clarity).', 'Ek file ek responsibility.', 'Re-export se clean public API (index.js).', 'Circular imports avoid karो.'],
    interview: {
      beginner: [
        { q: 'import/export kya hai?', a: 'Modules: export se file ki cheezein share, import se doosri file mein use. Code ko modular banाता.' },
        { q: 'Named vs default export?', a: 'Named: kai per file, import {name} se. Default: ek per file, import koi-bhi-naam se (no braces).' },
      ],
      intermediate: [
        { q: 'ES modules vs CommonJS?', a: 'ES (import/export) modern standard, static (tree-shakeable), async. CommonJS (require/module.exports) Node ka purana, dynamic, synchronous.' },
      ],
      advanced: [
        { q: 'Modules singleton kyun?', a: 'Ek module ek baar evaluate hota; saare imports same cached instance share karte. State module-level mein share hoti.' },
      ],
    },
    mcqs: [
      { q: 'Default import?', options: ['{ x }', 'x (no braces)', '* x', '[x]'], answer: 1, explain: 'No braces.' },
      { q: 'Kai per file?', options: ['Default', 'Named', 'Both same', 'None'], answer: 1, explain: 'Named exports kai.' },
    ],
    exercises: {
      easy: ['Ek named export aur import likho.'],
      medium: ['Default + named combine karके import karो.'],
      advanced: ['Multiple files ko ek index.js se re-export karो.'],
    },
    summary: [
      'Modules = alag files, apna scope.',
      'export share, import use.',
      'Named (braces, kai) vs default (no braces, ek).',
      'ES modules modern; tree-shakeable.',
    ],
    cheatsheet: [
      { h: 'Modules', code: `export const x=1\nexport default y\nimport y,{x} from './f'\nimport * as ns from './f'` },
    ],
    advanced:
      'Dynamic import() promise return karता (lazy/code-splitting — React.lazy). import.meta module metadata. CommonJS interop bundlers handle karte. Tree-shaking dead code elimination ke liye static ES imports zaroori (dynamic require nahi).',
    quiz: [
      { q: 'Lazy load?', options: ['static import', 'import()', 'require', 'export'], answer: 1, explain: 'Dynamic import() promise.' },
      { q: 'Modules scope?', options: ['Global', 'Module scope', 'Function', 'Block'], answer: 1, explain: 'Module scope (no pollution).' },
    ],
    related: ['es6-features', 'performance', 'functions-basics'],
  },

  'functional-programming': {
    overview:
      '**Functional Programming (FP)** ek style hai jisme code **pure functions**, **immutability**, **higher-order functions**, aur **composition** par based hota. Side-effects minimize, data transform through functions. Predictable, testable, parallel-friendly code.',
    why:
      'React (pure components, immutable state), Redux (pure reducers), modern JS heavily FP-influenced. map/filter/reduce FP hi hai. Interview mein pure functions, immutability concepts.',
    concept: [
      { h: 'Pure functions', p: 'Same input → same output, no side-effects (bahar ki cheez nahi badalता). Predictable + testable.', code: `// Pure\nconst add = (a, b) => a + b\n// Impure (side-effect)\nlet total = 0\nconst bad = x => { total += x }` },
      { h: 'Immutability', p: 'Data ko mutate na karो — naya banाओ. Spread, map, filter (non-mutating).', code: `// Mutate ❌\narr.push(4)\n// Immutable ✅\nconst next = [...arr, 4]\nconst updated = { ...obj, x: 9 }` },
      { h: 'Higher-order functions', p: 'Functions jo functions le/return karte. map, filter, reduce, compose.', code: `const withLog = fn => (...a) => { console.log('call'); return fn(...a) }` },
      { h: 'Composition', p: 'Chhote functions jodकर bada. pipe (left-right) / compose (right-left).', code: `const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x)\nconst process = pipe(trim, toLower, capitalize)` },
    ],
    analogy:
      'FP ek **water purification plant** jaisा hai — paani (data) har stage (pure function) se guzarता, har stage saaf transform karता bina paani ko "ganda" (mutate) kiye. Stages ko jod do (composition) to clean pipeline. Same paani daalो, same result. 💧',
    syntax: { code: `// Pure\nconst f = (a, b) => a + b\n// Immutable\nconst next = [...arr, x]\n// HOF + compose\nconst pipe = (...fns) => x => fns.reduce((v, f) => f(v), x)`, note: 'FP = pure + immutable + HOF + composition.' },
    examples: [
      { level: 'Intermediate', title: 'Immutable update', code: `const state = { count: 0, user: 'A' }\nconst newState = { ...state, count: state.count + 1 }\nconsole.log(state.count, newState.count)`, result: '0 1', explain: 'Original safe — naya state (React/Redux pattern).' },
      { level: 'Advanced', title: 'Pipe composition', code: `const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x)\nconst clean = pipe(\n  s => s.trim(),\n  s => s.toLowerCase(),\n  s => s.replace(/\\s+/g, '-')\n)\nconsole.log(clean('  Hello World  '))`, result: 'hello-world', explain: 'Transforms ko pipeline mein joda — readable.' },
    ],
    memory:
      'Immutability har update par naya object banाता (extra memory) — par structural sharing (Immer) optimize karта. Pure functions koi external state hold nahi karte (easy GC). FP referential transparency deता — same call cache (memoize) ho sakti.',
    notes: {
      concept: 'FP: pure functions, immutability, HOF, composition.',
      tip: 'Immutability se predictable state (React/Redux).',
      warning: 'Pure functions mein API/DOM/random/Date avoid (side-effects).',
      error: 'sort/push/splice mutate karte — FP mein copy pe karो.',
    },
    compare: {
      headers: ['Aspect', 'Imperative', 'Functional'],
      rows: [
        ['Style', 'Steps (how)', 'Expressions (what)'],
        ['State', 'Mutate', 'Immutable'],
        ['Loops', 'for/while', 'map/filter/reduce'],
        ['Predictability', 'Kam (side-effects)', 'Zyada (pure)'],
      ],
    },
    mistakes: [
      { bad: 'State directly mutate karna.', fix: 'Naya object/array banाओ (spread).' },
      { bad: 'Pure function mein side-effects.', fix: 'Side-effects bahar isolate karो.' },
    ],
    best: ['Pure functions prefer karो.', 'Immutable updates (spread).', 'map/filter/reduce over loops.', 'Composition se complex logic banाओ.'],
    interview: {
      intermediate: [
        { q: 'Functional programming kya hai?', a: 'Style jisme pure functions, immutability, HOF, aur composition use hote. Side-effects minimize, data transform through functions.' },
        { q: 'Immutability kyun?', a: 'Predictable state, easy debugging, change detection (React re-render), no accidental mutations, time-travel debugging.' },
      ],
      advanced: [
        { q: 'Pure function ke 2 rules?', a: '1) Same input → same output hamesha. 2) No side-effects (external state, DOM, API, console, random nahi badalता).' },
        { q: 'compose vs pipe?', a: 'Dono functions chain karte. compose right-to-left (f(g(x))), pipe left-to-right (g phir f). Pipe zyada readable.' },
      ],
    },
    mcqs: [
      { q: 'Pure function?', options: ['Side-effects ok', 'Same in→out, no side-effect', 'Always async', 'Mutates'], answer: 1, explain: 'Predictable, no side-effects.' },
      { q: 'Immutable update?', options: ['push', 'splice', 'spread copy', 'sort'], answer: 2, explain: 'Spread se naya banाओ.' },
    ],
    exercises: {
      easy: ['Ek pure aur ek impure function likho.'],
      medium: ['Immutably ek object update karो (spread).'],
      advanced: ['pipe() function banao aur 3 transforms compose karो.'],
    },
    summary: [
      'FP: pure functions, immutability, HOF, composition.',
      'Pure = same input→output, no side-effect.',
      'Immutable = naya banाओ, mutate nahi.',
      'Composition se chhote functions jodо.',
    ],
    cheatsheet: [
      { h: 'FP', code: `const pure=(a,b)=>a+b\nconst next={...obj,x:1}\npipe(f,g)(x)=g(f(x))` },
    ],
    advanced:
      'Currying, partial application, functors, monads (advanced FP). Libraries: Ramda, Lodash/fp. Immer "draft" se immutable updates easy. Referential transparency se memoization possible. React hooks + immutable state FP principles use karte.',
    quiz: [
      { q: 'FP loops ke बजाय?', options: ['for', 'map/filter/reduce', 'while', 'do'], answer: 1, explain: 'Declarative HOF methods.' },
      { q: 'Pure function side-effect?', options: ['Haan', 'Nahi', 'Async only', 'DOM only'], answer: 1, explain: 'No side-effects.' },
    ],
    related: ['callbacks-hof', 'currying', 'copy'],
  },

  'generators-iterators': {
    overview:
      '**Iterators** ek protocol hai jo collection ko ek-ek karke traverse karne deta (`next()` → `{value, done}`). **Generators** (`function*`) special functions hain jo **pause/resume** ho sakte `yield` se — lazy sequences, custom iterators, aur infinite streams banाने ke liye.',
    why:
      'for...of, spread iterators par chalte. Generators lazy evaluation, infinite sequences, async flows (redux-saga) ke liye. Advanced interview topic.',
    concept: [
      { h: 'Iterator protocol', p: 'Object jisme `next()` method ho jo `{value, done}` de. Iterable wo jisme Symbol.iterator ho (array, string, Map, Set).', code: `const it = [1, 2][Symbol.iterator]()\nit.next() // {value:1, done:false}\nit.next() // {value:2, done:false}\nit.next() // {value:undefined, done:true}` },
      { h: 'Generator basics', p: '`function*` + `yield`. Call karne par generator object milta; har `next()` agle yield tak chalता phir pause.', code: `function* gen() {\n  yield 1\n  yield 2\n  yield 3\n}\nconst g = gen()\ng.next().value // 1\ng.next().value // 2` },
      { h: 'Lazy & infinite', p: 'Generators values "on demand" dete — infinite sequences possible (memory safe).', code: `function* ids() {\n  let i = 1\n  while (true) yield i++\n}\nconst gen = ids()\ngen.next().value // 1, 2, 3...` },
      { h: 'yield* & two-way', p: '`yield*` doosre iterable ko delegate. next(value) se generator ko value bhej sakte (two-way).', code: `function* combine() {\n  yield* [1, 2]\n  yield* gen()\n}` },
    ],
    analogy:
      'Generator ek **Netflix series** jaisा hai — ek baar mein poori nahi, episode-by-episode (yield). Tum "next episode" (next()) maango to agla chalता, phir pause. Infinite series bhi possible — jitna chahiye utna dekhо, baaki memory mein load nahi. 📺',
    syntax: { code: `function* gen() {\n  yield value\n  const x = yield  // receives next(x)\n}\nconst g = gen()\ng.next()      // {value, done}\nfor (const v of gen()) {}`, note: 'function* aur yield generators define karte. Lazy by default.' },
    examples: [
      { level: 'Intermediate', title: 'Generator iteration', code: `function* range(start, end) {\n  for (let i = start; i <= end; i++) yield i\n}\nconsole.log([...range(1, 5)])`, result: '[ 1, 2, 3, 4, 5 ]', explain: 'Generator iterable hai — spread/for...of chalta.' },
      { level: 'Advanced', title: 'Infinite + take', code: `function* naturals() {\n  let n = 1\n  while (true) yield n++\n}\nconst g = naturals()\nconst first3 = [g.next().value, g.next().value, g.next().value]\nconsole.log(first3)`, result: '[ 1, 2, 3 ]', explain: 'Infinite generator — sirf zaroori values compute (lazy).' },
    ],
    memory:
      'Generators lazy hain — values on-demand compute hoti (poora array memory mein nahi). Generator object apni execution state (paused position, local vars) hold karता jab tak done na ho. Infinite sequences memory-safe (sirf current value).',
    notes: {
      concept: 'Iterator: next()→{value,done}. Generator: function* + yield (pausable).',
      tip: 'Generators lazy — infinite/large sequences ke liye memory-safe.',
      warning: 'Generator object ek baar consume hone par dubara use nahi (re-create karo).',
      error: 'function* aur yield bina generator context use karna.',
    },
    compare: {
      headers: ['Feature', 'Normal function', 'Generator'],
      rows: [
        ['Return', 'Ek baar', 'Multiple (yield)'],
        ['Execution', 'Poora ek saath', 'Pause/resume'],
        ['Lazy?', 'Nahi', 'Haan'],
        ['Iterable?', 'Nahi', 'Haan'],
      ],
    },
    mistakes: [
      { bad: 'Generator ko dubara iterate karna.', fix: 'Ek baar consume; naya banाओ.' },
      { bad: 'Infinite generator ko spread karna.', fix: 'Limit lagाओ (take pattern) — warna freeze.' },
    ],
    best: ['Large/infinite sequences → generators (lazy).', 'Custom iterables ke liye Symbol.iterator.', 'yield* se delegation.', 'One-time consume yaad rakho.'],
    interview: {
      advanced: [
        { q: 'Generator kya hai?', a: 'function* se bani function jo yield par pause/resume ho sakti. next() agle yield tak chalाता. Lazy sequences ke liye.' },
        { q: 'Iterator protocol kya?', a: 'Object jisme next() method ho jo {value, done} de. Iterable Symbol.iterator rakhता (for...of/spread isi par chalte).' },
        { q: 'Generators ka use case?', a: 'Lazy/infinite sequences, custom iterators, async control flow (redux-saga), memory-efficient large data processing.' },
      ],
    },
    mcqs: [
      { q: 'Generator syntax?', options: ['function()', 'function*', 'async function', '=>'], answer: 1, explain: 'function* with yield.' },
      { q: 'next() returns?', options: ['value', '{value, done}', 'array', 'promise'], answer: 1, explain: '{value, done} object.' },
    ],
    exercises: {
      easy: ['Ek generator banao jo 3 values yield kare.'],
      medium: ['range(a,b) generator banao aur spread karो.'],
      advanced: ['Infinite fibonacci generator + first 10 nikaalो.'],
    },
    summary: [
      'Iterator: next()→{value,done}.',
      'Generator: function* + yield, pausable.',
      'Lazy — infinite sequences memory-safe.',
      'Iterable (for...of, spread) chalता.',
    ],
    cheatsheet: [
      { h: 'Generator', code: `function* g(){ yield 1; yield 2 }\nconst it=g()\nit.next() // {value:1,done:false}\n[...g()]` },
    ],
    advanced:
      'Async generators (async function* + for-await-of) async streams ke liye. Generators co-routines implement karte (cooperative pausing). redux-saga generators se side-effects manage karता. Custom iterables Symbol.iterator generator se aasaan bante.',
    quiz: [
      { q: 'Generators kaise?', options: ['Eager', 'Lazy', 'Async only', 'Blocking'], answer: 1, explain: 'Lazy — on demand.' },
      { q: 'for...of kis par?', options: ['Iterables', 'Objects', 'Numbers', 'Booleans'], answer: 0, explain: 'Iterables (Symbol.iterator).' },
    ],
    related: ['array-methods', 'symbols', 'async-await'],
  },

  symbols: {
    overview:
      '**Symbol** ek primitive type hai jo **unique aur immutable** value deता — koi do symbols kabhi equal nahi (chahe same description ho). Use: unique object keys (collision-proof), hidden properties, aur well-known symbols (Symbol.iterator) jo language behaviour customize karte.',
    why:
      'Symbol.iterator (for...of), library internal keys, metadata ke liye. Advanced topic — interview mein "Symbol kya aur kyun" poocha jaता.',
    concept: [
      { h: 'Unique values', p: 'Symbol() har baar unique. Same description ke 2 symbols bhi equal nahi.', code: `const a = Symbol('id')\nconst b = Symbol('id')\nconsole.log(a === b) // false (unique!)` },
      { h: 'As object keys', p: 'Symbols object keys ban sakte — collision-proof, normal iteration (for...in, keys) mein hidden.', code: `const id = Symbol('id')\nconst user = { name: 'A', [id]: 123 }\nuser[id] // 123\nObject.keys(user) // ['name'] (id hidden)` },
      { h: 'Well-known symbols', p: 'Built-in symbols jo behaviour customize karte: Symbol.iterator (iterable banाना), Symbol.toPrimitive (coercion).', code: `const obj = {\n  *[Symbol.iterator]() { yield 1; yield 2 }\n}\n[...obj] // [1, 2]` },
      { h: 'Symbol.for (global registry)', p: 'Symbol.for(key) global registry mein shared symbol — same key same symbol.', code: `Symbol.for('app') === Symbol.for('app') // true` },
    ],
    analogy:
      'Symbol ek **fingerprint** jaisा hai — do logon ka naam (description) same ho sakta, par fingerprint (symbol) hamesha unique. Object mein symbol key ek **secret drawer** jaisा — normal listing mein nahi dikhता, sirf jise key pata ho. 🔑',
    syntax: { code: `const sym = Symbol('desc')\nobj[sym] = value\nSymbol.for('key')   // global\nSymbol.iterator     // well-known`, note: 'Symbol() new ke bina call hota. Description sirf debugging ke liye.' },
    examples: [
      { level: 'Advanced', title: 'Unique keys', code: `const ID = Symbol('id')\nconst user = { name: 'A', [ID]: 42 }\nconsole.log(user[ID])\nconsole.log(Object.keys(user))\nconsole.log(JSON.stringify(user))`, result: ['42', "[ 'name' ]", '{"name":"A"}'], explain: 'Symbol key hidden — normal iteration/JSON mein nahi.' },
    ],
    memory:
      'Symbols primitive hain par unique identity rakhte. Symbol-keyed properties normal enumeration se chhupe rehte (Object.getOwnPropertySymbols se milte). Symbol.for global registry mein symbols hold karता (memory mein rehte poore lifetime).',
    notes: {
      concept: 'Symbol = unique immutable primitive; collision-proof keys.',
      tip: 'Library internal keys ke liye symbols (user collision se safe).',
      warning: 'Symbol keys JSON.stringify aur for...in mein skip hote.',
      error: 'new Symbol() — error! Bina new ke call karो.',
    },
    compare: {
      headers: ['Feature', 'String key', 'Symbol key'],
      rows: [
        ['Unique?', 'Nahi (collision)', 'Haan (always)'],
        ['Enumerable', 'for...in/keys', 'Hidden'],
        ['JSON', 'Included', 'Skipped'],
        ['Use', 'Normal props', 'Meta/internal'],
      ],
    },
    mistakes: [
      { bad: 'new Symbol() likhna.', fix: 'Symbol() — bina new.' },
      { bad: 'Symbol keys ko JSON mein expect karna.', fix: 'Wo skip hote — strings use karो data ke liye.' },
    ],
    best: ['Internal/meta keys ke liye symbols.', 'Symbol.iterator se custom iterables.', 'Global shared ke liye Symbol.for.', 'Public data ke liye normal keys.'],
    interview: {
      advanced: [
        { q: 'Symbol kya hai?', a: 'Ek unique, immutable primitive. Har Symbol() unique hai (same description bhi equal nahi). Collision-proof object keys aur hidden properties ke liye.' },
        { q: 'Symbol ka use case?', a: 'Unique object keys (library internals collision se safe), well-known symbols (Symbol.iterator se iterable banाना), metadata.' },
      ],
    },
    mcqs: [
      { q: 'Symbol("a") === Symbol("a")?', options: ['true', 'false', 'Error', 'undefined'], answer: 1, explain: 'Har Symbol unique.' },
      { q: 'Symbol keys for...in mein?', options: ['Dikhte', 'Hidden', 'Error', 'First'], answer: 1, explain: 'Hidden hote.' },
    ],
    exercises: {
      easy: ['2 symbols banao aur === se compare karो.'],
      medium: ['Symbol key se object mein hidden property banao.'],
      advanced: ['Symbol.iterator se ek custom iterable object banao.'],
    },
    summary: [
      'Symbol = unique immutable primitive.',
      'Collision-proof object keys.',
      'Symbol-keyed props hidden (for...in/JSON skip).',
      'Well-known symbols behaviour customize karte.',
    ],
    cheatsheet: [
      { h: 'Symbol', code: `const s=Symbol('d')\nobj[s]=val\nSymbol.for('k')\n[Symbol.iterator]` },
    ],
    advanced:
      'Symbol.toPrimitive coercion control karта. Symbol.asyncIterator (for-await-of). Symbol.hasInstance (instanceof customize). Libraries symbols se "private" API banाती. getOwnPropertySymbols se symbol keys milte.',
    quiz: [
      { q: 'Symbol type?', options: ['Object', 'Primitive', 'Function', 'Array'], answer: 1, explain: 'Primitive type.' },
      { q: 'Custom iterable key?', options: ['Symbol.for', 'Symbol.iterator', 'Symbol()', 'iterator'], answer: 1, explain: 'Symbol.iterator.' },
    ],
    related: ['generators-iterators', 'objects', 'data-types'],
  },

  'map-set': {
    overview:
      'ES6 ne 4 modern collections diye: **Map** (any-type keys, ordered key-value), **Set** (unique values), **WeakMap** & **WeakSet** (weakly-held object keys, garbage-collectable). Yeh plain objects/arrays se behtar specific use-cases mein.',
    why:
      'Map (object keys, frequent add/delete), Set (uniqueness/dedup) daily kaam. WeakMap memory-safe metadata. Interview: "Map vs Object", "Set se duplicates kaise".',
    concept: [
      { h: 'Map', p: 'Key-value jahan key **kuch bhi** ho (object bhi). Insertion order maintain, size property, easy iterate.', code: `const m = new Map()\nm.set('a', 1)\nm.set(obj, 'val') // object key!\nm.get('a')   // 1\nm.has('a')   // true\nm.size       // 2` },
      { h: 'Set', p: 'Sirf **unique values**. Duplicates automatically ignore. Dedup ka best tarika.', code: `const s = new Set([1, 2, 2, 3])\ns.size       // 3 (dedup)\ns.has(2)     // true\ns.add(4)\n[...new Set(arr)] // dedup array` },
      { h: 'WeakMap & WeakSet', p: 'Sirf object keys, **weakly held** — agar key ka koi aur reference na ho to GC kar deta. Iterate/size nahi. Metadata/cache ke liye (memory-safe).', code: `const wm = new WeakMap()\nwm.set(domNode, data)\n// domNode hata to entry auto GC` },
      { h: 'Map vs Object', p: 'Map: any key, ordered, size, fast frequent add/delete. Object: string/symbol keys, JSON-friendly, prototype.', code: `// dedup + count pattern\nconst count = new Map()\nfor (const x of arr) count.set(x, (count.get(x) || 0) + 1)` },
    ],
    analogy:
      'Map ek **flexible dictionary** hai — kisi bhi cheez (object bhi) ko key bana sakte. Set ek **guest list jisme duplicate naam nahi** — same naam dubara add karो, ignore. WeakMap ek **sticky note jo cheez hatte hi khud gir jaye** (memory-safe). 📒',
    syntax: { code: `const m = new Map([[k, v]])\nm.set(k, v); m.get(k); m.has(k); m.delete(k)\nconst s = new Set([...])\ns.add(v); s.has(v); s.delete(v)\nconst wm = new WeakMap() // object keys only`, note: 'Set se array dedup: [...new Set(arr)].' },
    examples: [
      { level: 'Beginner', title: 'Set dedup', code: `const arr = [1, 2, 2, 3, 3, 3]\nconst unique = [...new Set(arr)]\nconsole.log(unique)`, result: '[ 1, 2, 3 ]', explain: 'Set duplicates hata deta — sabse clean dedup.' },
      { level: 'Intermediate', title: 'Map frequency count', code: `const words = ['a', 'b', 'a', 'c', 'a']\nconst freq = new Map()\nfor (const w of words) freq.set(w, (freq.get(w) || 0) + 1)\nconsole.log([...freq])`, result: "[ [ 'a', 3 ], [ 'b', 1 ], [ 'c', 1 ] ]", explain: 'Map counting ka perfect tool.' },
    ],
    memory:
      'Map/Set strong references rakhte (keys/values GC nahi hote jab tak Map/Set zinda). WeakMap/WeakSet weak references — agar key object ka koi aur reference na ho to garbage collect ho jaता (memory leaks rokता). Isliye WeakMap iterate/size support nahi karता.',
    notes: {
      concept: 'Map any-key key-value, Set unique values, Weak* GC-friendly.',
      tip: 'Dedup → Set. Object keys ya frequent add/delete → Map.',
      warning: 'WeakMap/WeakSet iterate/size nahi (weak refs).',
      error: 'Map ko object ki tarah m.key access karna — m.get(key) use karो.',
    },
    compare: {
      headers: ['Feature', 'Object', 'Map'],
      rows: [
        ['Keys', 'String/Symbol', 'Koi bhi (object too)'],
        ['Order', 'Mostly insertion', 'Insertion guaranteed'],
        ['Size', 'Manual', '.size'],
        ['Iterate', 'Object.keys etc', 'Directly (for...of)'],
        ['Performance', 'OK', 'Frequent add/delete fast'],
      ],
    },
    mistakes: [
      { bad: 'Map ko m.key se access.', fix: 'm.get(key) / m.set(key, val).' },
      { bad: 'WeakMap iterate karne ki koshish.', fix: 'Weak refs — iterate/size nahi.' },
    ],
    best: ['Dedup → Set.', 'Dynamic/object keys → Map.', 'Metadata/cache → WeakMap (memory-safe).', 'JSON data → plain object.'],
    interview: {
      intermediate: [
        { q: 'Map vs Object?', a: 'Map: koi bhi key (object bhi), guaranteed order, .size, fast frequent add/delete, directly iterable. Object: string/symbol keys, JSON-friendly, prototype.' },
        { q: 'Set kya hai?', a: 'Unique values ka collection — duplicates auto ignore. [...new Set(arr)] se array dedup.' },
      ],
      advanced: [
        { q: 'WeakMap ka use aur fayda?', a: 'Object keys ke saath metadata/cache; keys weakly held — object hatne par entry auto GC, memory leak nahi. DOM node metadata ke liye great.' },
      ],
    },
    mcqs: [
      { q: 'Duplicates hataता?', options: ['Map', 'Set', 'Object', 'Array'], answer: 1, explain: 'Set unique values.' },
      { q: 'Object key allowed?', options: ['Object', 'Map', 'Dono', 'Koi nahi'], answer: 1, explain: 'Map any-type key.' },
    ],
    exercises: {
      easy: ['Set se ek array dedup karो.'],
      medium: ['Map se word frequency count karो.'],
      advanced: ['WeakMap se object metadata store karके memory behaviour samjhao.'],
    },
    summary: [
      'Map: any-key key-value, ordered, .size.',
      'Set: unique values (dedup).',
      'WeakMap/WeakSet: object keys, GC-friendly.',
      'Dedup→Set, dynamic keys→Map.',
    ],
    cheatsheet: [
      { h: 'Collections', code: `new Map().set(k,v).get(k)\nnew Set([1,2,2]) // {1,2}\n[...new Set(arr)] // dedup` },
    ],
    advanced:
      'Map iteration order insertion-based (Object thoda tricky integer keys ke saath). Set operations (union/intersection) spread + filter se. WeakRef + FinalizationRegistry advanced memory management. Map JSON-serializable nahi directly (Array.from karो).',
    quiz: [
      { q: 'Array dedup?', options: ['new Map', 'new Set', 'Object', 'sort'], answer: 1, explain: '[...new Set(arr)].' },
      { q: 'WeakMap iterate?', options: ['Haan', 'Nahi', 'Sometimes', 'Only keys'], answer: 1, explain: 'Weak refs — nahi.' },
    ],
    related: ['objects', 'arrays', 'memory-management'],
  },

  'proxy-reflect': {
    overview:
      '**Proxy** ek object ko **wrap** karके uske operations (get, set, delete) ko **intercept/customize** karता — meta-programming. **Reflect** ek built-in object hai jo wahi default operations methods ke roop mein deता (Proxy ke andar use hote). Frameworks (Vue 3 reactivity) inhe use karte.',
    why:
      'Vue 3 reactivity, validation, logging, observable objects Proxy se bante. Advanced/senior interview topic — "Proxy kaise reactivity deता".',
    concept: [
      { h: 'Proxy basics', p: 'new Proxy(target, handler). Handler "traps" (get/set/etc) define karता jo operations intercept karte.', code: `const p = new Proxy(target, {\n  get(obj, key) { return obj[key] },\n  set(obj, key, val) { obj[key] = val; return true }\n})` },
      { h: 'Common traps', p: 'get (read), set (write), has (in), deleteProperty (delete), apply (function call).', code: `const safe = new Proxy({}, {\n  get(o, k) { return k in o ? o[k] : 'N/A' }\n})\nsafe.missing // 'N/A'` },
      { h: 'Reflect', p: 'Default behaviour methods — Reflect.get/set/has. Proxy traps ke andar clean default ke liye.', code: `const p = new Proxy(obj, {\n  get(o, k) {\n    console.log('reading', k)\n    return Reflect.get(o, k)\n  }\n})` },
      { h: 'Use cases', p: 'Validation, logging, default values, reactive systems (Vue 3), read-only objects, API wrappers.', code: `// Validation\nconst validated = new Proxy({}, {\n  set(o, k, v) {\n    if (k === 'age' && v < 0) throw Error('Invalid')\n    o[k] = v; return true\n  }\n})` },
    ],
    analogy:
      'Proxy ek **security guard/receptionist** hai object ke aage. Koi object se kuch maange (get) ya de (set), pehle guard (trap) se guzarта — wo log kar sakta, rok sakta, ya badal sakta. Reflect guard ka "normal procedure manual" hai (default kaam kaise karna). 🛡️',
    syntax: { code: `const p = new Proxy(target, {\n  get(obj, prop, receiver) { return Reflect.get(...arguments) },\n  set(obj, prop, val) { return Reflect.set(...arguments) },\n  has(obj, prop) {},\n  deleteProperty(obj, prop) {}\n})`, note: 'set trap ko true return karna zaroori (success).' },
    examples: [
      { level: 'Advanced', title: 'Default values', code: `const withDefault = new Proxy({ a: 1 }, {\n  get(obj, key) {\n    return key in obj ? obj[key] : 0\n  }\n})\nconsole.log(withDefault.a, withDefault.xyz)`, result: '1 0', explain: 'Missing keys par default 0 — get trap.' },
      { level: 'Advanced', title: 'Validation + Reflect', code: `const user = new Proxy({}, {\n  set(obj, key, val) {\n    if (key === 'age' && (val < 0 || val > 120)) {\n      throw new Error('Invalid age')\n    }\n    return Reflect.set(obj, key, val)\n  }\n})\nuser.age = 25\nconsole.log(user.age)`, result: '25', explain: 'set trap validation; Reflect.set default assignment.' },
    ],
    memory:
      'Proxy original target ko wrap karता (extra layer, slight overhead per operation). Reflect operations native speed. Reactive frameworks Proxy se dependency tracking karte (kaun-si property read hui — re-render trigger). Heavy hot-path mein Proxy overhead consider karो.',
    notes: {
      concept: 'Proxy operations intercept karta; Reflect default operations deta.',
      tip: 'Traps ke andar Reflect use karो clean default ke liye.',
      warning: 'set/deleteProperty traps ko boolean (true) return karna zaroori.',
      error: 'Proxy har operation par overhead — performance-critical mein dhyan.',
    },
    compare: {
      headers: ['Feature', 'Proxy', 'Reflect'],
      rows: [
        ['Kya hai', 'Wrapper (intercept)', 'Default ops methods'],
        ['Use', 'Customize behaviour', 'Default behaviour call'],
        ['Example', 'new Proxy(t, h)', 'Reflect.get(o, k)'],
      ],
    },
    mistakes: [
      { bad: 'set trap se true na return karna.', fix: 'return true (ya Reflect.set ka result).' },
      { bad: 'Har object Proxy mein wrap karna.', fix: 'Sirf zaroorat par (overhead).' },
    ],
    best: ['Traps mein Reflect use karो.', 'Validation/logging/reactivity ke liye Proxy.', 'Performance-critical paths mein avoid.', 'set/delete traps boolean return karein.'],
    interview: {
      advanced: [
        { q: 'Proxy kya hai?', a: 'Ek object jo target ke operations (get/set/delete) ko traps se intercept/customize karता. Meta-programming — validation, logging, reactivity ke liye.' },
        { q: 'Reflect ka role?', a: 'Default object operations ko methods ki tarah deता (Reflect.get/set/has). Proxy traps ke andar clean default behaviour invoke karne ke liye.' },
        { q: 'Vue 3 reactivity Proxy se kaise?', a: 'Vue 3 reactive objects ko Proxy mein wrap karता — get trap dependencies track karता (kis property ko padha), set trap changes par re-render trigger karता.' },
      ],
    },
    mcqs: [
      { q: 'Operations intercept?', options: ['Reflect', 'Proxy', 'Map', 'Symbol'], answer: 1, explain: 'Proxy traps.' },
      { q: 'set trap return?', options: ['undefined', 'true', 'value', 'null'], answer: 1, explain: 'Boolean true (success).' },
    ],
    exercises: {
      easy: ['Ek Proxy banao jo get par log kare.'],
      medium: ['Missing keys par default dene wala Proxy banao.'],
      advanced: ['Validation Proxy banao (age 0-120) using Reflect.'],
    },
    summary: [
      'Proxy operations intercept/customize karta.',
      'Traps: get, set, has, deleteProperty.',
      'Reflect default operations deta (traps ke andar).',
      'Use: validation, logging, reactivity (Vue 3).',
    ],
    cheatsheet: [
      { h: 'Proxy', code: `new Proxy(target,{\n  get(o,k){return Reflect.get(o,k)},\n  set(o,k,v){return Reflect.set(o,k,v)}\n})` },
    ],
    advanced:
      'Revocable proxies (Proxy.revocable) access band kar sakte. Proxy se observable/immutable structures, ORM-like APIs, mocking. MobX/Vue reactivity Proxy par. Traps ka invariants honां chahiye (consistency rules) warna TypeError.',
    quiz: [
      { q: 'Vue 3 reactivity?', options: ['Object.defineProperty', 'Proxy', 'Map', 'Closures'], answer: 1, explain: 'Proxy-based (Vue 2 defineProperty tha).' },
      { q: 'Reflect kya deta?', options: ['Wrapper', 'Default ops', 'Events', 'Promises'], answer: 1, explain: 'Default operations as methods.' },
    ],
    related: ['objects', 'symbols', 'oop-principles'],
  },

  'memory-management': {
    overview:
      'JavaScript **automatic memory management** karता — **Garbage Collector (GC)** un objects ko hata deता jinka koi reference nahi bacha. **Memory Heap** mein objects, **Call Stack** mein execution. **Memory leaks** tab hote jab unused references zinda reh jaayein (GC hata nahi sakta).',
    why:
      'Bade apps mein memory leaks se slowdown/crash. Leak sources (listeners, timers, closures, detached DOM) pehchaanna senior-level skill + interview topic.',
    concept: [
      { h: 'Stack vs Heap', p: '**Stack**: primitives + references + execution contexts (fast, fixed). **Heap**: objects/arrays/functions (dynamic).', code: `let x = 5        // stack (primitive)\nlet obj = {}     // obj reference stack, {} heap` },
      { h: 'Garbage Collection', p: 'GC "reachability" check karता — jo objects root (global, stack) se reachable nahi, unhe free kar deta. Algorithm: **Mark-and-Sweep**.', code: `let user = { name: 'A' }\nuser = null // ab object unreachable → GC free karega` },
      { h: 'Memory Leaks', p: 'Object reachable rehता par use nahi — GC hata nahi sakta. Sources: forgotten timers, listeners, closures holding big data, detached DOM, global variables.', code: `// Leak: listener kabhi remove nahi hua\nel.addEventListener('click', bigHandler)\n// Leak: timer chalta raha\nsetInterval(() => use(bigData), 1000)` },
      { h: 'Leak prevention', p: 'Listeners/timers cleanup karो, references null karो, WeakMap use karो, closures mein sirf zaroori data.', code: `clearInterval(id)\nel.removeEventListener('click', handler)\nref = null` },
    ],
    analogy:
      'Memory ek **hotel** hai. Har guest (object) ko room (memory). GC ek **housekeeping** hai jo khaali rooms (no reference) ko free kar deta. Memory leak = ek guest checkout kar gaya par "do not disturb" board (reference) laga chhod gaya — room blocked rehता bekaar. 🏨',
    syntax: { code: `// Cleanup patterns\nclearTimeout(id); clearInterval(id)\nel.removeEventListener('click', fn)\nobjRef = null\nconst wm = new WeakMap() // auto-GC keys`, note: 'GC manual control nahi (automatic) — par references manage kar sakte.' },
    steps: [
      'Object banta → heap mein allocate, reference stack mein.',
      'Use ke dauraan reachable rehता.',
      'Reference hatne par (null/scope end) unreachable ban sakta.',
      'GC mark phase: root se reachable objects mark.',
      'Sweep phase: unmarked (unreachable) free.',
    ],
    examples: [
      { level: 'Advanced', title: 'Leak vs cleanup', code: `// LEAK\nfunction setup() {\n  const big = new Array(1e6).fill('x')\n  setInterval(() => console.log(big.length), 1000)\n  // big kabhi free nahi (timer holds it)\n}\n// FIX\nfunction setupFixed() {\n  const big = new Array(1e6).fill('x')\n  const id = setInterval(() => {}, 1000)\n  return () => clearInterval(id) // cleanup\n}`, explain: 'Timer big array ko zinda rakhता — clearInterval se free.' },
    ],
    memory:
      'V8 generational GC use karता: "young generation" (naye objects, frequent fast GC — Scavenger) aur "old generation" (purane, kam-frequent Mark-Sweep-Compact). Zyada short-lived objects fast collect hote. Bade long-lived structures old gen mein.',
    browser:
      'Chrome DevTools "Memory" tab heap snapshots aur allocation timeline deता — leaks dhoondne ke liye. "Detached DOM nodes" (removed par JS-referenced) common leak. Performance monitor live memory dikhता.',
    notes: {
      concept: 'GC unreachable objects free karta (mark-and-sweep).',
      tip: 'Listeners/timers cleanup karो; WeakMap auto-GC.',
      warning: 'Global variables, closures, detached DOM common leak sources.',
      error: 'setInterval cleanup na karna — callback + captured data hamesha zinda.',
    },
    compare: {
      headers: ['Storage', 'Stack', 'Heap'],
      rows: [
        ['Stores', 'Primitives, references', 'Objects, arrays, fn'],
        ['Speed', 'Fast', 'Slower'],
        ['Size', 'Fixed/small', 'Dynamic/large'],
        ['Cleanup', 'Auto (scope end)', 'GC'],
      ],
    },
    mistakes: [
      { bad: 'Listeners/timers cleanup na karna.', fix: 'removeEventListener / clearInterval.' },
      { bad: 'Bade data ko global/closure mein hold.', fix: 'Scope chhota rakho, references null karो.' },
    ],
    best: ['Timers/listeners cleanup karो.', 'Unused references null.', 'WeakMap/WeakSet for metadata.', 'DevTools se leaks profile karो.'],
    interview: {
      intermediate: [
        { q: 'JS memory kaise manage karता?', a: 'Automatic — Garbage Collector reachability check karता (mark-and-sweep) aur unreachable objects free karता. Manual free nahi.' },
        { q: 'Memory leak kya aur sources?', a: 'Unused object reachable reh jaaye (GC hata nahi sakta). Sources: forgotten timers/listeners, closures holding data, detached DOM, global variables.' },
      ],
      advanced: [
        { q: 'Mark-and-sweep kaise?', a: 'GC roots (global, stack) se reachable objects "mark" karता, phir unmarked (unreachable) ko "sweep" (free) karता. Reference cycles bhi handle (reachability-based).' },
      ],
    },
    mcqs: [
      { q: 'Objects kahan?', options: ['Stack', 'Heap', 'Queue', 'Cache'], answer: 1, explain: 'Heap mein.' },
      { q: 'GC kya free karता?', options: ['Sab', 'Unreachable objects', 'Primitives', 'Stack'], answer: 1, explain: 'Unreachable (no reference).' },
    ],
    exercises: {
      easy: ['Stack aur heap mein kya jaता likho.'],
      medium: ['Ek memory leak example aur uska fix likho.'],
      advanced: ['DevTools se heap snapshot lekar detached DOM dhoondो.'],
    },
    summary: [
      'JS automatic memory management (GC).',
      'Stack: primitives/refs; Heap: objects.',
      'GC unreachable objects free karता (mark-sweep).',
      'Leaks: timers, listeners, closures, detached DOM.',
    ],
    cheatsheet: [
      { h: 'Avoid leaks', code: `clearInterval(id)\nremoveEventListener\nref=null\nWeakMap for meta` },
    ],
    advanced:
      'V8 generational + incremental + concurrent GC (main thread pauses minimize). WeakRef/FinalizationRegistry advanced control. Object pooling high-perf (games) mein allocations kam karता. Memory profiling regular practice production apps mein.',
    quiz: [
      { q: 'GC algorithm?', options: ['Sort', 'Mark-and-sweep', 'Binary', 'Hash'], answer: 1, explain: 'Reachability-based mark-and-sweep.' },
      { q: 'Leak source?', options: ['null refs', 'Forgotten timers', 'Primitives', 'GC'], answer: 1, explain: 'Uncleaned timers/listeners.' },
    ],
    related: ['browser-internals', 'closures', 'performance'],
  },

  performance: {
    overview:
      'Performance optimization se app fast aur smooth banती. Key techniques: **memory leaks fix**, **lazy loading** (zaroorat par load), **code splitting** (bundle todना), **tree shaking** (dead code hatना), **debounce/throttle**, **event delegation**, aur efficient DOM updates.',
    why:
      'Fast apps better UX + SEO + conversions. Bundle size, lazy loading, debounce real interview + production concerns. "App slow hai, kaise optimize karein" common discussion.',
    concept: [
      { h: 'Lazy loading & code splitting', p: 'Sab kuch ek saath load mat karो — jab chahiye tab. Routes/components dynamic import se (React.lazy). Initial bundle chhota.', code: `const Page = React.lazy(() => import('./Page'))\n// images\n<img loading="lazy" src="..." />` },
      { h: 'Tree shaking', p: 'Bundler unused exports ko bundle se hata deta (dead code elimination). Named ES imports zaroori.', code: `import { add } from 'lib'\n// sirf 'add' bundle mein, baaki nahi` },
      { h: 'Debounce/Throttle & delegation', p: 'Frequent events (scroll/input) control karो. Bahut listeners ki jagah delegation.', code: `input.oninput = debounce(search, 400)\nwindow.onscroll = throttle(update, 200)` },
      { h: 'Efficient DOM & rendering', p: 'Batch DOM updates, reflows minimize, virtual DOM (React) diffing, memoization (useMemo). Bhaari kaam Web Workers.', code: `// Batch\nconst frag = document.createDocumentFragment()\nitems.forEach(i => frag.appendChild(make(i)))\nlist.appendChild(frag)` },
    ],
    analogy:
      'Performance ek **restaurant efficiency** jaisा. Lazy loading = "order aane par hi pakाओ" (sab pehle nahi). Code splitting = menu ko sections mein. Tree shaking = bina-bike dishes menu se hatाना. Debounce = "customer decide kare tab order lo". Sab milkar fast service. 🍴',
    syntax: { code: `React.lazy(() => import('./X'))   // code split\nimport { fn } from 'lib'           // tree-shakeable\ndebounce(fn, 400); throttle(fn, 200)\n<img loading="lazy" />`, note: 'Measure pehle (DevTools), phir optimize — guess mat karो.' },
    steps: [
      'Measure: DevTools Performance/Lighthouse se bottleneck dhoondो.',
      'Bundle: code splitting + tree shaking se size kam.',
      'Load: lazy load images/routes/components.',
      'Runtime: debounce/throttle, memoize, batch DOM.',
      'Re-measure: improvement verify karो.',
    ],
    examples: [
      { level: 'Advanced', title: 'Batch DOM (fragment)', code: `// Slow: 1000 reflows\n// for (let i=0;i<1000;i++) list.appendChild(make(i))\n// Fast: 1 reflow\nconst frag = document.createDocumentFragment()\nfor (let i = 0; i < 1000; i++) frag.appendChild(make(i))\nlist.appendChild(frag)`, explain: 'DocumentFragment se ek hi reflow — bahut fast.' },
    ],
    memory:
      'Memory leaks performance ko slowly degrade karte (GC pressure, swapping). Bade bundles parse/compile time badhाते (CPU). Efficient data structures (Map/Set) aur memoization repeated work bachाते. Web Workers heavy CPU kaam ko alag thread par (main thread free).',
    notes: {
      concept: 'Lazy load, code split, tree shake, debounce, batch DOM.',
      tip: 'Pehle measure (DevTools/Lighthouse), phir optimize.',
      warning: 'Premature optimization — readability maar deta. Bottleneck pe focus.',
      error: 'Sab kuch upfront load karna (huge initial bundle).',
    },
    compare: {
      headers: ['Technique', 'Kya karता', 'Fayda'],
      rows: [
        ['Lazy loading', 'On-demand load', 'Fast initial'],
        ['Code splitting', 'Bundle todна', 'Chhota chunk'],
        ['Tree shaking', 'Dead code hatना', 'Chhota bundle'],
        ['Debounce/throttle', 'Event control', 'Kam work'],
        ['Memoization', 'Cache results', 'Repeat work bachao'],
      ],
    },
    mistakes: [
      { bad: 'Bina measure ke optimize karna.', fix: 'DevTools/Lighthouse se pehle profile.' },
      { bad: 'Pura app ek bundle.', fix: 'Code splitting + lazy load.' },
    ],
    best: ['Measure first.', 'Lazy load + code split.', 'Tree-shakeable imports.', 'Debounce/throttle + memoize + batch DOM.'],
    interview: {
      intermediate: [
        { q: 'JS app performance kaise improve?', a: 'Lazy loading, code splitting, tree shaking (chhota bundle), debounce/throttle, event delegation, memoization, batch DOM updates, Web Workers heavy kaam ke liye.' },
        { q: 'Tree shaking kya hai?', a: 'Bundler unused exports (dead code) ko final bundle se hata deta — chhota bundle. Static ES imports zaroori.' },
      ],
      advanced: [
        { q: 'Reflow vs repaint?', a: 'Reflow (layout) = geometry change (size/position) — mehnga. Repaint = visual change (color) — sasta. Batch DOM updates se reflows minimize karो.' },
      ],
    },
    mcqs: [
      { q: 'Dead code hataता?', options: ['Lazy load', 'Tree shaking', 'Debounce', 'Memo'], answer: 1, explain: 'Tree shaking.' },
      { q: 'Bundle todна?', options: ['Tree shaking', 'Code splitting', 'Throttle', 'GC'], answer: 1, explain: 'Code splitting.' },
    ],
    exercises: {
      easy: ['3 performance techniques likho.'],
      medium: ['DocumentFragment se batch DOM update karो.'],
      advanced: ['Ek heavy list ko lazy load + debounce search ke saath optimize karो.'],
    },
    summary: [
      'Lazy load + code split = fast initial.',
      'Tree shaking = chhota bundle.',
      'Debounce/throttle, memoize, batch DOM.',
      'Measure first, then optimize.',
    ],
    cheatsheet: [
      { h: 'Optimize', code: `React.lazy(()=>import())\nimport {x} from 'lib'\ndebounce/throttle\nDocumentFragment\nuseMemo/useCallback` },
    ],
    projects: ['Lazy-loaded image gallery', 'Virtualized long list', 'Debounced search', 'Code-split routes', 'Web Worker computation'],
    advanced:
      'Virtual scrolling (sirf visible items render), Web Workers (CPU offload), Service Workers (caching/offline), requestIdleCallback, image optimization (WebP, srcset), critical CSS, prefetch/preload, CDN. Core Web Vitals (LCP, FID/INP, CLS) measure karta.',
    quiz: [
      { q: 'Heavy CPU kaam?', options: ['Main thread', 'Web Worker', 'setTimeout', 'GC'], answer: 1, explain: 'Web Worker (alag thread).' },
      { q: 'Reflow kya?', options: ['Color change', 'Layout change', 'Network', 'GC'], answer: 1, explain: 'Geometry/layout change (mehnga).' },
    ],
    related: ['debounce-throttle', 'memory-management', 'browser-internals'],
  },

  'browser-internals': {
    overview:
      'Browser HTML/CSS/JS ko page mein convert karता ek **rendering pipeline** se: HTML→**DOM**, CSS→**CSSOM**, dono→**Render Tree**, phir **Layout**→**Paint**→**Composite**. JS engine (V8) + event loop alag chalte. Yeh sab samajhna performance + deep interview ke liye.',
    why:
      'Render-blocking resources, reflow/repaint, "page slow kyun", critical rendering path — sab yahin se. Senior frontend interview ka deep topic.',
    concept: [
      { h: 'Critical Rendering Path', p: 'HTML parse → DOM. CSS parse → CSSOM. DOM+CSSOM → Render Tree (visible elements). Phir Layout, Paint, Composite.', code: `// HTML → DOM\n// CSS  → CSSOM\n// DOM + CSSOM → Render Tree\n// → Layout → Paint → Composite` },
      { h: 'Layout, Paint, Composite', p: '**Layout (reflow)**: geometry calc (size/position). **Paint**: pixels (color, text). **Composite**: layers ko screen par combine (GPU).', code: `// Reflow trigger: width, position change\n// Repaint: color, visibility change\n// Composite-only: transform, opacity (fast!)` },
      { h: 'Render-blocking', p: 'CSS render-blocking (CSSOM zaroori). Sync JS parser-blocking. async/defer JS se bachो.', code: `<script defer src="app.js"></script>\n<script async src="analytics.js"></script>` },
      { h: 'JS + rendering', p: 'JS main thread par chalता (rendering ke saath same thread). Heavy JS = jank (rendering rukता). Event loop rendering ke beech kaam karता.', code: `// requestAnimationFrame — render se pehle\nrequestAnimationFrame(() => updateUI())` },
    ],
    analogy:
      'Browser ek **construction site** hai. DOM = building ka structure plan, CSSOM = design/paint plan. Render tree = final blueprint (sirf visible). Layout = naap-jokh (kahan kya). Paint = rang bharना. Composite = alag layers ko jodकर final building. 🏗️',
    syntax: { code: `<link rel="stylesheet" href="...">  // render-blocking\n<script defer src="...">            // parse continue\n<script async src="...">            // independent\nrequestAnimationFrame(cb)            // before paint`, note: 'CSS top mein, JS defer/bottom — fast first paint.' },
    steps: [
      'HTML parse → DOM tree.',
      'CSS parse → CSSOM tree.',
      'DOM + CSSOM → Render Tree (visible only).',
      'Layout: har element ka size/position.',
      'Paint: pixels draw; Composite: layers combine (GPU) → screen.',
    ],
    visual: {
      type: 'boxes',
      items: [
        { label: 'DOM', sub: 'HTML', color: '#F59E0B' },
        { label: 'CSSOM', sub: 'CSS', color: '#6366F1' },
        { label: 'Render Tree', sub: 'Visible', color: '#22C55E' },
        { label: 'Layout→Paint', sub: 'Pixels', color: '#EC4899' },
        { label: 'Composite', sub: 'Screen (GPU)', color: '#EF4444' },
      ],
    },
    memory:
      'DOM/CSSOM/render tree browser memory mein. JS heap V8 mein. Layers (composite) GPU memory use karte. Bahut saari layers (will-change overuse) memory badhाती. transform/opacity composite-only (layout/paint skip — fast, GPU).',
    notes: {
      concept: 'HTML→DOM, CSS→CSSOM → Render Tree → Layout→Paint→Composite.',
      tip: 'Animations ke liye transform/opacity (composite-only, GPU fast).',
      warning: 'Sync JS parser-blocking — defer/async use karो.',
      error: 'Layout-trigger properties (width/top) animate karna — janky. transform use karो.',
    },
    compare: {
      headers: ['Operation', 'Trigger', 'Cost'],
      rows: [
        ['Layout (reflow)', 'Size/position change', 'Mehnga'],
        ['Paint', 'Color/visibility', 'Medium'],
        ['Composite', 'transform/opacity', 'Sasta (GPU)'],
      ],
    },
    mistakes: [
      { bad: 'width/top/left animate karna.', fix: 'transform: translate/scale (composite-only).' },
      { bad: 'Sync JS head mein.', fix: 'defer ya body bottom.' },
    ],
    best: ['CSS head mein, JS defer/bottom.', 'Animate transform/opacity.', 'Reflows batch karो.', 'Critical CSS inline; rest lazy.'],
    interview: {
      advanced: [
        { q: 'Browser rendering pipeline?', a: 'HTML→DOM, CSS→CSSOM, dono milkar Render Tree (visible), phir Layout (geometry), Paint (pixels), Composite (layers→screen, GPU).' },
        { q: 'Reflow vs repaint?', a: 'Reflow = layout recalc (geometry change — mehnga, sab affected). Repaint = visual change without layout (color). transform/opacity dono skip karte (composite-only).' },
        { q: 'Render-blocking kya?', a: 'CSS render-blocking (CSSOM ke bina render nahi). Sync JS parser ko rokта. defer/async se JS non-blocking.' },
      ],
    },
    mcqs: [
      { q: 'CSS banta?', options: ['DOM', 'CSSOM', 'Render tree', 'Layout'], answer: 1, explain: 'CSS → CSSOM.' },
      { q: 'Composite-only (fast)?', options: ['width', 'top', 'transform', 'margin'], answer: 2, explain: 'transform/opacity GPU composite.' },
    ],
    exercises: {
      easy: ['Rendering pipeline ke steps likho.'],
      medium: ['Reflow vs repaint vs composite ke examples do.'],
      advanced: ['Ek janky animation ko transform se smooth karो.'],
    },
    summary: [
      'HTML→DOM, CSS→CSSOM → Render Tree.',
      'Layout (geometry) → Paint (pixels) → Composite (GPU).',
      'Reflow mehnga, composite (transform/opacity) sasta.',
      'CSS head, JS defer; animate transform.',
    ],
    cheatsheet: [
      { h: 'Pipeline', code: `DOM + CSSOM\n→ Render Tree\n→ Layout → Paint\n→ Composite (GPU)` },
    ],
    advanced:
      'Layers + GPU compositing (will-change hint). Paint flashing/Layers panel DevTools. Speculative parsing, preload scanner. INP (Interaction to Next Paint) new Core Web Vital. Hydration (SSR), partial hydration, streaming SSR modern rendering strategies.',
    quiz: [
      { q: 'Render tree mein?', options: ['Sab elements', 'Visible elements', 'Sirf text', 'Scripts'], answer: 1, explain: 'Sirf visible (display:none nahi).' },
      { q: 'JS kis thread par?', options: ['Alag', 'Main (render ke saath)', 'GPU', 'Network'], answer: 1, explain: 'Main thread — heavy JS jank.' },
    ],
    related: ['event-loop', 'performance', 'dom'],
  },

  'interview-questions': {
    overview:
      'Yeh ek **rapid-fire interview prep** topic hai — output-based questions, tricky scenarios, output predictions, aur frequently-asked concepts ek jagah. Inhe practice karke aap pattern pehchaanna seekhoge jo real interviews mein aate hain.',
    why:
      'Companies output-based aur conceptual questions se fundamentals test karti hain. Yeh tricky cases (hoisting, closures, this, coercion, event loop) ek baar dekh lo to confidence aata.',
    concept: [
      { h: 'Output-based questions kaise approach', p: 'Step 1: hoisting/scope socho. Step 2: sync vs async. Step 3: this binding. Step 4: coercion rules. Patiently trace karो.' },
      { h: 'Top concept areas', p: 'Closures, hoisting/TDZ, this, event loop (micro/macro), coercion (== vs ===), prototype chain, var/let scope, promises order.' },
      { h: 'Tip', p: 'Interview mein loud thinking karो — interviewer aapka reasoning dekhna chahta hai, sirf answer nahi.' },
    ],
    analogy:
      'Output questions ek **magic trick** jaisे hain — pehli baar confusing, par rule pata ho (hoisting, event loop) to "trick" obvious ho jaता. Practice se aap magician ban jaते ho. 🎩',
    tricky: [
      { title: 'Hoisting + var', code: `console.log(a)\nvar a = 1\nconsole.log(a)`, output: ['undefined', '1'], explain: 'var hoist hokar undefined; assignment baad mein.' },
      { title: 'let TDZ', code: `console.log(x)\nlet x = 5`, output: 'ReferenceError', explain: 'let TDZ mein — declare se pehle access nahi.' },
      { title: 'Closure loop (var)', code: `for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0)\n}`, output: ['3', '3', '3'], explain: 'var ek hi i share; loop khatam hone par i=3. let se 0,1,2.' },
      { title: 'Event loop order', code: `console.log(1)\nsetTimeout(() => console.log(2), 0)\nPromise.resolve().then(() => console.log(3))\nconsole.log(4)`, output: ['1', '4', '3', '2'], explain: 'Sync(1,4) → microtask(3) → macrotask(2).' },
      { title: 'this in method vs standalone', code: `const o = { x: 1, get() { return this.x } }\nconst f = o.get\nconsole.log(o.get())\nconsole.log(f())`, output: ['1', 'undefined'], explain: 'o.get() this=o; f() this lost (undefined.x).' },
      { title: 'Coercion', code: `console.log(1 + '2')\nconsole.log('3' - 1)\nconsole.log([] + [])\nconsole.log(true + true)`, output: ['12', '2', '(empty string)', '2'], explain: '+ string concat; - number; [] → ""; true → 1.' },
      { title: '== vs ===', code: `console.log(0 == '')\nconsole.log(null == undefined)\nconsole.log(NaN === NaN)`, output: ['true', 'true', 'false'], explain: '== coercion; null==undefined true; NaN kisi se equal nahi.' },
    ],
    notes: {
      concept: 'Output questions hoisting + async + this + coercion test karte.',
      tip: 'Loud thinking karो — reasoning dikhाओ.',
      warning: 'Rush mat karो — step-by-step trace karो.',
      error: 'Async output ko sync order mein predict karna.',
    },
    interview: {
      beginner: [
        { q: 'var, let, const difference?', a: 'var function-scoped + hoisted undefined. let/const block-scoped + TDZ. const re-assign nahi. Default const use karo.' },
        { q: '== vs ===?', a: '== coercion ke saath (type convert). === strict (type+value). Hamesha === use karo.' },
        { q: 'undefined vs null?', a: 'undefined = value assign nahi hui. null = jaan-bujhkar khaali. typeof null === "object" (bug).' },
      ],
      intermediate: [
        { q: 'Closure kya aur use?', a: 'Function jo outer scope variables yaad rakhता. Data privacy, counters, debounce, currying, hooks.' },
        { q: 'Event loop explain karo.', a: 'Stack khaali hone par queues se callbacks laता. Microtasks (promises) macrotasks (setTimeout) se pehle.' },
        { q: 'Promise vs async/await?', a: 'async/await promises ka clean syntax (sync jaisा). Internally promises hi. Error handling try/catch se aasaan.' },
      ],
      advanced: [
        { q: 'this kaise decide hota?', a: 'Call-site se: obj.method()→obj, plain fn→window/undefined, arrow→lexical, call/apply/bind→given, new→naya object.' },
        { q: 'Prototype chain?', a: 'object→prototype→prototype→null. Property na mile to chain mein upar dhoondता. Inheritance ka base.' },
        { q: 'Debounce implement karo.', a: 'Closure mein timer; har call par clearTimeout phir setTimeout(fn, delay). Sirf last call survive.' },
      ],
    },
    mcqs: [
      { q: 'typeof null?', options: ['null', 'object', 'undefined', 'number'], answer: 1, explain: 'object (bug).' },
      { q: 'Microtask example?', options: ['setTimeout', 'Promise.then', 'setInterval', 'event'], answer: 1, explain: 'Promise.then microtask.' },
      { q: '[] == false?', options: ['true', 'false', 'Error', 'undefined'], answer: 0, explain: '[]→"" →0, false→0 (coercion).' },
      { q: 'Arrow this?', options: ['Own', 'Lexical', 'window', 'caller'], answer: 1, explain: 'Lexical parent.' },
    ],
    exercises: {
      easy: ['5 var/let/const output questions trace karो.'],
      medium: ['3 event loop output questions predict karो.'],
      advanced: ['this + closure + hoisting mix wale 5 tricky questions solve karो.'],
    },
    summary: [
      'Output questions: hoisting, async, this, coercion test.',
      'Step-by-step trace karो, loud thinking.',
      'Top areas: closures, event loop, this, prototype.',
      'Practice se patterns obvious ho jaते.',
    ],
    cheatsheet: [
      { h: 'Trace order', code: `1. Hoisting/scope\n2. Sync vs async\n3. this binding\n4. Coercion rules` },
      { h: 'Event loop', code: `sync → microtasks → 1 macrotask` },
    ],
    projects: ['Mock interview practice', 'Output-prediction flashcards', 'Concept cheat-sheet banao', 'Daily 5 tricky questions'],
    advanced:
      'Company-specific: FAANG deep internals (event loop, prototypes, polyfills — implement map/bind/debounce). Startups practical (DOM, API, projects). System design + JS combine senior roles mein. Practice: implement Promise, debounce, deepClone, flatten, curry from scratch.',
    quiz: [
      { q: 'Best equality?', options: ['==', '===', '=', '!='], answer: 1, explain: '=== strict.' },
      { q: 'Closure use?', options: ['Privacy', 'CSS', 'HTML', 'Threads'], answer: 0, explain: 'Data privacy + more.' },
    ],
    related: ['machine-coding', 'closures', 'event-loop'],
  },

  'machine-coding': {
    overview:
      'Machine coding rounds mein aapko **chhote apps/components** banाने hote (vanilla JS ya React) — Counter, Todo, Calculator, Image Slider, etc. Yeh DOM, events, state, aur clean code test karte. Yahan har project ka approach + key concepts diye hain.',
    why:
      'Frontend interviews mein machine coding round bahut common hai. Yeh aapki practical ability test karta — sirf theory nahi. In projects se DOM/events/state strong hote.',
    concept: [
      { h: 'Approach (har project)', p: '1) UI structure (HTML). 2) State decide karो. 3) Events bind karो. 4) State change par UI update. 5) Edge cases handle. Clean + modular rakho.' },
      { h: 'Easy projects', p: '**Counter** (state + buttons), **Stopwatch** (setInterval + start/stop/reset), **Accordion/Tabs** (toggle active), **Calculator** (input + eval logic).' },
      { h: 'Medium projects', p: '**Todo** (add/delete/toggle + render list), **Search Filter** (filter array), **Debounce Search** (debounce + API), **Image Slider** (index + next/prev), **Pagination** (slice by page).' },
      { h: 'Advanced projects', p: '**Infinite Scroll** (IntersectionObserver/scroll + throttle), **Drag and Drop** (drag events), **Weather App** (fetch API), **Memory Game** (grid + match logic + state).' },
    ],
    analogy:
      'Machine coding ek **cooking test** jaisा hai — recipe (concept) pata ho, par actually dish banाni padti time limit mein. Practice se haath set ho jaता — interview mein bina ghabraye banा dete ho. 👨‍🍳',
    examples: [
      { level: 'Beginner', title: 'Counter (live)', code: `// HTML: <button id="dec">-</button> <span id="v">0</span> <button id="inc">+</button>\nlet count = 0\nconst v = document.getElementById('v')\nconst render = () => (v.textContent = count)\ndocument.getElementById('inc').onclick = () => { count++; render() }\ndocument.getElementById('dec').onclick = () => { count--; render() }`, preview: { html: '<button id="dec">-</button> <b id="v" style="margin:0 12px;font-size:20px">0</b> <button id="inc">+</button>', js: "let c=0;const v=document.getElementById('v');document.getElementById('inc').onclick=()=>v.textContent=++c;document.getElementById('dec').onclick=()=>v.textContent=--c", height: 80 }, explain: 'State (count) + events + render — har project ka core pattern.' },
      { level: 'Intermediate', title: 'Todo (add/render)', code: `const todos = []\nfunction addTodo(text) {\n  todos.push({ id: Date.now(), text, done: false })\n  render()\n}\nfunction render() {\n  list.innerHTML = todos\n    .map(t => \`<li>\${t.text}</li>\`)\n    .join('')\n}`, explain: 'State array + render function — add/delete/toggle isi pattern se.' },
      { level: 'Advanced', title: 'Debounced search', code: `function debounce(fn, d) {\n  let t\n  return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), d) }\n}\nconst search = debounce(async (q) => {\n  const res = await fetch('/api?q=' + q)\n  render(await res.json())\n}, 400)\ninput.addEventListener('input', e => search(e.target.value))`, explain: 'Debounce + fetch — API spam roka, smooth UX.' },
    ],
    notes: {
      concept: 'State + events + render — har machine coding project ka core.',
      tip: 'Pehle working version banao, phir improve (UI/edge cases).',
      warning: 'Time limit hota — over-engineer mat karो. Core feature pehle.',
      error: 'State aur UI ko sync rakhna bhoolना (render call karना).',
    },
    mistakes: [
      { bad: 'Direct DOM manipulation bina state.', fix: 'State source of truth; UI usse render karो.' },
      { bad: 'Search par har keystroke API call.', fix: 'Debounce use karो.' },
    ],
    best: ['State-driven UI (render function).', 'Event delegation for lists.', 'Debounce search/inputs.', 'Clean, modular, readable code.', 'Edge cases (empty, loading, error).'],
    interview: {
      intermediate: [
        { q: 'Machine coding round mein kya dekhते?', a: 'Working feature, clean/modular code, state management, event handling, edge cases, aur reasoning (loud thinking).' },
        { q: 'Counter/Todo ka core pattern?', a: 'State (variable/array) → events update state → render function UI ko state se sync karता. Single source of truth.' },
      ],
      advanced: [
        { q: 'Infinite scroll kaise?', a: 'IntersectionObserver (ya throttled scroll) se bottom detect karो, next page fetch + append. Loading state + dedup handle karो.' },
        { q: 'Image slider kaise?', a: 'currentIndex state; next/prev se index update (modulo wrap); transform/translateX se slide; optional auto-play (setInterval) + cleanup.' },
      ],
    },
    mcqs: [
      { q: 'Search input optimize?', options: ['Throttle', 'Debounce', 'None', 'Loop'], answer: 1, explain: 'Debounce — user ruke tab call.' },
      { q: 'Stopwatch kis se?', options: ['setTimeout', 'setInterval', 'fetch', 'Promise'], answer: 1, explain: 'setInterval + clear.' },
    ],
    exercises: {
      easy: ['Counter aur Stopwatch banao.'],
      medium: ['Todo app (add/delete/toggle) + Search filter banao.'],
      advanced: ['Image slider + Debounced search + Pagination banao.'],
    },
    summary: [
      'Machine coding = chhote apps (DOM/events/state).',
      'Core pattern: state + events + render.',
      'Easy: Counter, Stopwatch, Tabs.',
      'Advanced: Infinite scroll, Drag-drop, Memory game.',
    ],
    cheatsheet: [
      { h: 'Project pattern', code: `let state = ...\nfunction render(){ /* UI from state */ }\nel.onclick = ()=>{ state=...; render() }` },
    ],
    projects: ['Counter', 'Stopwatch', 'Todo App', 'Calculator', 'Image Slider', 'Infinite Scroll', 'Pagination', 'Accordion', 'Tabs', 'Search Filter', 'Debounce Search', 'Drag and Drop', 'Weather App', 'Memory Game'],
    advanced:
      'React mein same projects hooks (useState/useEffect/useRef) se. Custom hooks (useDebounce, useFetch) reusable. Accessibility (ARIA, keyboard) bonus points. Testing (Jest/RTL) senior rounds. State management patterns (reducer) complex apps mein.',
    quiz: [
      { q: 'Core pattern?', options: ['Only DOM', 'State+events+render', 'Only CSS', 'Only fetch'], answer: 1, explain: 'State-driven UI.' },
      { q: 'List events efficient?', options: ['Per item listener', 'Delegation', 'No events', 'Inline'], answer: 1, explain: 'Event delegation.' },
    ],
    related: ['dom', 'events', 'debounce-throttle'],
  },
}
