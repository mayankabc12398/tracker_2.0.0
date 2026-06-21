// Browser Internals Course content — Part 3: V8 Engine & JS Runtime Internals

export const browserContentC = {
  'v8-architecture': {
    overview:
      "**V8** Google ka *open-source JavaScript engine* hai jo **Chrome** aur **Node.js** dono ko power karta hai. Iska kaam hai aapka likha hua JS code lena aur use **machine code** (CPU samajhne wali language) mein convert karke *tezi se* chalana. V8 C++ mein likha gaya hai aur duniya ke sabse fast engines mein se ek hai. 🚀",
    why:
      "Interview mein 'JS engine andar kaise kaam karta hai?' ek classic deep question hai. V8 ki pipeline (parser → Ignition → TurboFan → GC) samajhna aapko *hidden classes, inline caches, deopt* jaise advanced concepts samajhne mein madad karta hai — jisse aap **fast JS code** likh sakte ho aur senior-level interviews crack kar sakte ho.",
    concept: [
      { h: 'V8 hota kya hai?', p: 'V8 ek **engine** hai jo JS source code ko padhता hai aur **execute** karta hai. Ye sirf interpreter nahi — ek poora *pipeline* hai: parsing, bytecode generation, JIT compilation aur garbage collection sab isme aate hain.' },
      { h: 'Pipeline (sabse important)', p: 'Source code → **Parser** (AST banata hai) → **Ignition** (interpreter, bytecode banata + chalata hai) → **TurboFan** (hot code ko optimized machine code banata hai) → **Orinoco** (garbage collector memory clean karta hai).', code: "// V8 pipeline ek line mein:\n// JS source -> AST -> Bytecode (Ignition) -> Optimized machine code (TurboFan)\nfunction add(a, b) { return a + b }\n// V8 ise pehle bytecode banayega, baar-baar call hone par optimize karega" },
      { h: 'Ignition (Interpreter)', p: '**Ignition** ek *bytecode interpreter* hai. Ye AST ko **bytecode** mein badalta hai (compact instructions) aur turant chalata hai. Fast startup deta hai kyunki poora machine code banane ka wait nahi karna padta.' },
      { h: 'TurboFan (Optimizing Compiler)', p: '**TurboFan** ek *JIT (Just-In-Time) optimizing compiler* hai. Jo functions baar-baar chalte hain (**hot functions**) unhe ye highly optimized machine code mein compile karta hai *type assumptions* ke saath, taaki super-fast chalein.' },
      { h: 'Hidden Classes & Inline Caches', p: 'JS dynamic hai par V8 internally har object ke liye ek **hidden class** (shape) banata hai — jaise C++ ki struct. **Inline cache (IC)** property access ko yaad rakhता hai taaki agli baar lookup tez ho. Isi liye objects ko *same order* mein properties dena fast hota hai.', code: "// SAME shape -> fast (ek hi hidden class)\nconst p1 = { x: 1, y: 2 }\nconst p2 = { x: 3, y: 4 }\n\n// DIFFERENT order -> nayi hidden class -> slow\nconst p3 = { y: 2, x: 1 } // shape p1 se alag!" },
      { h: 'Orinoco (Garbage Collector)', p: '**Orinoco** V8 ka *modern GC* hai jo *concurrent + parallel + incremental* hai — matlab main thread ko zyada block kiye bina memory clean karta hai. Generational hai: young aur old generation alag-alag handle hote hain.' },
    ],
    analogy:
      "Socho V8 ek **restaurant kitchen** hai. **Parser** order ki list banata hai (AST). **Ignition** ek *fast cook* hai jo turant simple dish bana deta hai (bytecode) — koi customer wait nahi karta. Jab koi dish *baar-baar* order hoti hai (hot function), to **TurboFan** us dish ke liye ek *special assembly line* (optimized machine code) set kar deta hai taaki super-fast bane. Aur **Orinoco** safaai wala staff hai jo jhoothe plates (garbage memory) hata kar table free karta rehta hai. 🍳",
    syntax: {
      code: "// Node.js mein V8 internals dekhne ke flags:\n// node --print-bytecode app.js     -> Ignition bytecode dikhata hai\n// node --trace-opt app.js           -> kaunse function optimize hue\n// node --trace-deopt app.js         -> kaunse deoptimize hue\n// node --allow-natives-syntax       -> %OptimizeFunctionOnNextCall() jaise functions",
      note: "Ye flags V8 ke andar jhaank kar dekhne ke liye hain — interview prep ke liye bahut useful.",
      lang: 'js',
    },
    steps: [
      'V8 source code (string) receive karta hai.',
      'Parser code ko tokenize karke **AST** (Abstract Syntax Tree) banata hai.',
      'Ignition AST se **bytecode** generate karta hai.',
      'Ignition bytecode ko interpret karke turant execute karta hai (fast startup).',
      'Profiler dekhता hai kaunse functions **hot** (baar-baar chalne wale) hain.',
      'Hot functions ko **TurboFan** optimized machine code mein compile karta hai.',
      'Agar type assumption toot jaaye to **deoptimize** karke wapas Ignition par aata hai.',
      'Beech-beech mein **Orinoco GC** unused memory free karta rehta hai.',
    ],
    internals: {
      p: "🧠 **Deep dive:** V8 ka magic *speculative optimization* hai. Ignition se bytecode chalte waqt V8 *feedback* collect karta hai — 'is function mein a aur b hamesha numbers aaye'. TurboFan in assumptions ko maan kar machine code banata hai jismein number ke fast paths hote hain. Agar kabhi a string aa gaya, to assumption toot jaati hai aur V8 **deoptimize (bailout)** karke us optimized code ko phenk deta hai aur Ignition par wapas aata hai. Isi liye **monomorphic** code (ek hi type) sabse fast hai.",
      code: "// V8 ko optimize-friendly code:\nfunction sum(a, b) { return a + b }\nfor (let i = 0; i < 100000; i++) sum(i, i)  // hot -> TurboFan optimize karega\n\n// Deopt trigger (BAD):\nsum(1, 2)          // numbers -> optimized\nsum('a', 'b')      // ab string! -> deopt -> wapas slow path",
      lang: 'js',
    },
    process: {
      type: 'boxes',
      items: [
        { label: 'Source Code', sub: 'aapka JS', color: '#8B5CF6' },
        { label: 'Parser', sub: 'AST banata', color: '#06B6D4' },
        { label: 'Ignition', sub: 'bytecode + interpret', color: '#F97316' },
        { label: 'TurboFan', sub: 'optimized machine code', color: '#22C55E' },
        { label: 'Orinoco GC', sub: 'memory cleanup', color: '#EF4444' },
      ],
    },
    visual: {
      type: 'timeline',
      items: [
        { year: '1', text: 'Source code string V8 ko milti hai.' },
        { year: '2', text: 'Parser tokenize karke AST banata hai.' },
        { year: '3', text: 'Ignition bytecode banakar interpret karta hai.' },
        { year: '4', text: 'Profiler hot functions detect karta hai.' },
        { year: '5', text: 'TurboFan optimized machine code banata hai.' },
        { year: '6', text: 'Deopt hone par wapas Ignition par.' },
      ],
    },
    memory:
      "V8 do main memory regions use karta hai: **Stack** (function calls, primitives, fixed-size data — fast, LIFO) aur **Heap** (objects, arrays, closures — dynamic, GC isi ko manage karta hai). Heap aage **young generation** (naye, short-lived objects) aur **old generation** (purane, survive kiye objects) mein bata hota hai.",
    browser:
      "Chrome **V8** use karta hai, Firefox **SpiderMonkey**, Safari **JavaScriptCore (Nitro)**, purana Edge **Chakra** use karta tha (ab Chromium-based hone se V8). Node.js bhi V8 par chalta hai — isi liye browser aur Node mein JS behaviour mostly same hota hai.",
    notes: {
      concept: "V8 'interpreter + JIT compiler' dono ka combo hai — isi liye JS ko 'JIT-compiled' kehna technically sahi hai.",
      tip: "Objects banate waqt properties **same order** mein add karo — hidden classes reuse honge aur code fast chalega.",
      warning: "Ek function mein mixed types pass karna (kabhi number kabhi string) deopt karwata hai — performance girti hai.",
    },
    compare: {
      headers: ['Stage', 'Component', 'Kaam', 'Speed'],
      rows: [
        ['Parse', 'Parser', 'AST banana', 'One-time'],
        ['Interpret', 'Ignition', 'Bytecode chalana', 'Fast startup'],
        ['Optimize', 'TurboFan', 'Machine code', 'Fast runtime'],
        ['Cleanup', 'Orinoco', 'Garbage collection', 'Background'],
      ],
    },
    mistakes: [
      { bad: "Sochna ki JS sirf 'interpreted' hai.", fix: "Modern JS JIT-compiled hai — V8 hot code ko machine code mein compile karta hai." },
      { bad: "Objects ko alag-alag property order mein banana.", fix: "Same shape rakho taaki hidden classes reuse hon." },
      { bad: "Ek function ko different types se call karna.", fix: "Monomorphic rakho — ek hi type — taaki TurboFan optimize rakhe." },
    ],
    best: [
      'Objects ko consistent shape (same properties, same order) do.',
      'Functions ko ek hi type ke arguments se call karo (monomorphic).',
      'Constructor mein saari properties initialize karo.',
      'Bade arrays mein same type ke elements rakho (packed arrays).',
      'Unnecessary global variables avoid karo.',
    ],
    performance:
      "⚡ V8 ke liye fast code likhne ka mantra: **predictable types + consistent object shapes**. Monomorphic functions, packed arrays, aur stable hidden classes TurboFan ko aggressively optimize karne dete hain. Deopt se bachao — ye optimized code ko throw karke startup jaisa slow path laata hai.",
    tricky: [
      {
        title: 'Hidden class break',
        code: "const a = { x: 1 }; a.y = 2;\nconst b = { x: 1 }; b.z = 2;\n// a aur b ki hidden classes alag ho gayi -> property access slow",
        explain: "Runtime par alag properties add karne se objects ki shapes diverge ho jaati hain, IC megamorphic ho sakta hai.",
        lang: 'js',
      },
      {
        title: 'Deopt kab hota hai?',
        code: "function f(o) { return o.x }\nf({ x: 1 }); f({ x: 2 });   // monomorphic -> fast\nf({ x: 3, y: 9 });          // nayi shape -> polymorphic -> dheere",
        explain: "Alag-alag shapes wale objects pass karne se IC monomorphic se polymorphic/megamorphic ban jaata hai.",
        lang: 'js',
      },
    ],
    interview: {
      beginner: [
        { q: 'V8 kya hai?', a: 'Google ka open-source JavaScript engine jo Chrome aur Node.js ko power karta hai. JS ko machine code mein convert karke chalata hai.' },
        { q: 'V8 kis language mein likha hai?', a: 'C++ mein.' },
      ],
      intermediate: [
        { q: 'V8 ki pipeline kya hai?', a: 'Source -> Parser (AST) -> Ignition (bytecode + interpret) -> TurboFan (optimized machine code) -> Orinoco GC.' },
        { q: 'Hidden class kya hai?', a: 'V8 internally har object ke liye ek shape/structure banata hai taaki property access fast ho — jaise static struct.' },
      ],
      advanced: [
        { q: 'Inline cache kya hai aur monomorphic/polymorphic/megamorphic kya?', a: 'IC property access ke result ko cache karta hai. Ek hi shape = monomorphic (fastest), 2-4 shapes = polymorphic, bahut zyada = megamorphic (slowest).' },
        { q: 'Deoptimization kab hoti hai?', a: 'Jab TurboFan ke type assumptions runtime par toot jaate hain — V8 optimized code ko bailout karke wapas Ignition par aata hai.' },
      ],
    },
    mcqs: [
      { q: 'V8 mein optimizing compiler kaunsa hai?', options: ['Ignition', 'TurboFan', 'SpiderMonkey', 'Chakra'], answer: 1, explain: 'TurboFan JIT optimizing compiler hai; Ignition interpreter hai.' },
      { q: 'Ignition kya generate karta hai?', options: ['Machine code', 'Bytecode', 'AST', 'CSSOM'], answer: 1, explain: 'Ignition AST ko bytecode mein convert karke interpret karta hai.' },
      { q: 'V8 ka garbage collector kaun hai?', options: ['Orinoco', 'TurboFan', 'Blink', 'Nitro'], answer: 0, explain: 'Orinoco V8 ka modern generational GC hai.' },
    ],
    exercises: {
      easy: ['Likho V8 pipeline ke 4 stages.', 'Batao kaunse browsers kaunsa JS engine use karte hain.'],
      medium: ['Ek aisa object example likho jo hidden class break karta ho.', 'node --trace-opt se ek hot function detect karo.'],
      advanced: ['Ek function likho jo monomorphic se megamorphic ban jaaye aur explain karo kyun slow hoga.'],
    },
    summary: [
      'V8 Chrome + Node ka JS engine hai, C++ mein likha.',
      'Pipeline: Parser -> Ignition -> TurboFan -> Orinoco GC.',
      'Ignition = bytecode interpreter (fast startup).',
      'TurboFan = JIT optimizing compiler (hot code).',
      'Hidden classes + inline caches property access fast karte hain.',
      'Deopt tab hota hai jab type assumptions tootein.',
    ],
    cheatsheet: [
      { h: 'Pipeline', code: "Source -> AST -> Bytecode -> Machine code" },
      { h: 'Components', code: "Parser, Ignition, TurboFan, Orinoco" },
      { h: 'Debug flags', code: "--print-bytecode, --trace-opt, --trace-deopt" },
    ],
    projects: [
      'Node.js performance tuning — hot functions identify karke optimize karna.',
      'High-throughput API server jahan GC pauses minimize karna critical hai.',
      'Game engine / heavy computation jahan monomorphic code zaroori hai.',
      'Memory-sensitive serverless functions ka optimization.',
    ],
    advanced:
      "🚀 V8 'lazy compilation' aur 'pre-parsing' use karta hai — functions ko sirf tab fully parse karta hai jab pehli baar call hon. Sparkplug (ek baseline non-optimizing compiler, Ignition aur TurboFan ke beech) ko V8 ne add kiya tha taaki bytecode se thoda fast machine code mil sake bina TurboFan ke heavy cost ke. Ye tiered compilation strategy startup aur peak performance dono ko balance karti hai.",
    quiz: [
      { q: 'TurboFan ka kaam?', options: ['AST banana', 'Hot code ko optimize karna', 'GC', 'Parsing'], answer: 1, explain: 'TurboFan hot functions ko optimized machine code mein compile karta hai.' },
      { q: 'Monomorphic code kaisa hota hai?', options: ['Slowest', 'Fastest', 'Same as polymorphic', 'GC trigger'], answer: 1, explain: 'Ek hi type/shape = monomorphic = sabse fast.' },
    ],
    related: ['parsing-ast', 'ignition-turbofan', 'memory-management', 'execution-context'],
  },

  'parsing-ast': {
    overview:
      "Jab V8 ko aapka JS code milta hai, wo direct samajh nahi sakta — pehle use **parse** karna padta hai. Parsing do steps mein hota hai: **lexing/tokenizing** (code ko chhote tokens mein todna) aur **parsing** (tokens se ek tree banana). Is tree ko **AST (Abstract Syntax Tree)** kehte hain. 🌳",
    why:
      "AST har JS tool ki neev hai — Babel, ESLint, Prettier, TypeScript, minifiers sab AST par kaam karte hain. Parsing samajhne se aap **lazy parsing**, startup performance, aur 'engine code kaise padhta hai' jaise interview questions confidently answer kar sakte ho.",
    concept: [
      { h: 'Tokenizing (Lexing)', p: '**Lexer/tokenizer** code ki string ko *tokens* (chhote meaningful pieces) mein todta hai — keywords, identifiers, operators, literals. Jaise `let x = 5` se tokens: `let`, `x`, `=`, `5`.', code: "// 'let x = 5' ke tokens:\n// [ keyword:let ] [ identifier:x ] [ operator:= ] [ number:5 ]" },
      { h: 'Parsing', p: '**Parser** in tokens ko grammar rules ke hisaab se ek **tree structure (AST)** mein arrange karta hai. Ye batata hai ki code ka *structure aur meaning* kya hai.' },
      { h: 'AST (Abstract Syntax Tree)', p: '**AST** code ka tree representation hai jahan har node ek construct ko represent karta hai (VariableDeclaration, BinaryExpression, etc.). "Abstract" isliye kyunki ye unnecessary details (semicolons, brackets) chhod deta hai.', code: "// 'let x = 5' ka simplified AST:\n// VariableDeclaration\n//   -> VariableDeclarator\n//        id: Identifier (x)\n//        init: Literal (5)" },
      { h: 'Eager vs Lazy Parsing', p: '**Eager (full) parsing** code ko poora parse karta hai. **Lazy (pre-)parsing** functions ko sirf surface-level scan karta hai (syntax check) aur poora parse tab karta hai jab function pehli baar *call* hota hai. Ye startup tezi se karता hai.' },
      { h: 'Pre-parsing kyun?', p: 'Real-world apps mein bahut saara code kabhi run hi nahi hota (e.g. error handlers). Pre-parsing un functions ka full work bachata hai — bas itna check karta hai ki syntax valid hai aur scope kahan hai.' },
    ],
    analogy:
      "Socho aap ek **book** padh rahe ho. **Tokenizing** = har shabd ko alag pehchanna (yahan noun, yahan verb). **Parsing** = un shabdon se grammatically sahi *sentence* banana aur uska matlab samajhna. **AST** = us sentence ka grammar diagram. Aur **lazy parsing** = aap pehle book ka *index/table of contents* dekhते ho, har chapter tabhi detail mein padhते ho jab zaroorat ho. 📖",
    syntax: {
      code: "// AST online dekhne ke liye: astexplorer.net\n// Babel se AST programmatically:\n// const { parse } = require('@babel/parser')\n// const ast = parse('let x = 5')\n// console.log(JSON.stringify(ast, null, 2))",
      note: "astexplorer.net par koi bhi JS code paste karke uska live AST dekh sakte ho.",
      lang: 'js',
    },
    steps: [
      'V8 source code string receive karta hai.',
      'Scanner/Lexer characters ko **tokens** mein todta hai.',
      'Parser tokens ko grammar rules se match karta hai.',
      'Functions ke liye decide hota hai: eager parse ya pre-parse (lazy).',
      'Pre-parsed functions ka sirf syntax + scope check hota hai.',
      'Parser ek **AST** node tree banata hai.',
      'AST aage Ignition ko bytecode banane ke liye di jaati hai.',
    ],
    internals: {
      p: "🧠 **Deep dive:** V8 ka scanner UTF-16 characters padhता hai. Lazy parsing ka funda ye hai ki ek IIFE `(function(){...})()` jaisa pattern V8 ko hint deta hai ki function turant chalega — to use eager parse kar deta hai. Agar aap chahते ho ki ek bada function eager parse ho (taaki pehli call par delay na ho) to use parentheses mein wrap karna ek known trick hai. Pre-parsing 'syntax errors' to catch kar leti hai par scope ki full info baad mein banti hai.",
      code: "// IIFE -> V8 ko 'eager parse' ka hint:\n(function expensive() {\n  // ye turant chalega, V8 isse eagerly parse karega\n})()",
      lang: 'js',
    },
    process: {
      type: 'boxes',
      items: [
        { label: 'Source String', sub: 'raw JS text', color: '#8B5CF6' },
        { label: 'Scanner/Lexer', sub: 'tokens banata', color: '#06B6D4' },
        { label: 'Parser', sub: 'grammar check', color: '#F97316' },
        { label: 'AST', sub: 'tree structure', color: '#22C55E' },
      ],
    },
    visual: {
      type: 'tree',
      root: 'VariableDeclaration',
      children: [
        {
          label: 'VariableDeclarator',
          sub: 'x = 5',
          color: '#8B5CF6',
          children: [
            { label: 'Identifier', sub: 'name: x', color: '#06B6D4' },
            { label: 'Literal', sub: 'value: 5', color: '#22C55E' },
          ],
        },
      ],
    },
    memory:
      "AST heap memory mein store hota hai aur bada ho sakta hai — isi liye V8 lazy parsing karta hai taaki saare functions ka AST ek saath build na karna pade. Pre-parsed functions ka full AST sirf zaroorat par banta hai, jisse memory aur time dono bachte hain.",
    browser:
      "Har JS engine apna parser rakhta hai (V8, SpiderMonkey, JavaScriptCore). Tools jaise **Babel** (@babel/parser), **Acorn**, aur **Esprima** standalone JS parsers hain jo ESTree spec follow karte hain — yahi AST format ESLint/Prettier use karte hain.",
    notes: {
      concept: "AST 'abstract' isliye hai kyunki ye syntax ke extra symbols (brackets, semicolons) ko represent nahi karta, sirf structural meaning.",
      tip: "astexplorer.net par apna code paste karke AST samajho — tooling banane ke liye best starting point.",
      warning: "Bahut bade single functions (huge bundles) parsing ko slow kar sakte hain — code splitting madad karta hai.",
    },
    compare: {
      headers: ['Aspect', 'Eager Parsing', 'Lazy (Pre-)Parsing'],
      rows: [
        ['Kab', 'Turant pura', 'Pehli call par'],
        ['Speed', 'Slow startup', 'Fast startup'],
        ['Use', 'Jo code turant chale', 'Jo code shayad na chale'],
        ['Output', 'Full AST', 'Sirf syntax + scope'],
      ],
    },
    mistakes: [
      { bad: "AST aur DOM tree ko same samajhna.", fix: "AST JS code ka structure hai; DOM HTML ka structure hai — dono alag." },
      { bad: "Sochna parsing aur compilation ek hi cheez hai.", fix: "Parsing AST banata hai; compilation (Ignition/TurboFan) AST ko code mein badalta hai." },
      { bad: "Huge inline scripts likhna performance soche bina.", fix: "Code splitting karo taaki parser ko sab ek saath na karna pade." },
    ],
    best: [
      'astexplorer.net se AST ko visualize karke samjho.',
      'Code splitting karo taaki parsing lazy ho sake.',
      'IIFE pattern samjho — eager parsing ka hint.',
      'Tooling (ESLint plugins) banane ke liye ESTree spec padho.',
    ],
    performance:
      "⚡ Parsing app startup ka ek bada hissa hota hai (kabhi-kabhi 15-20% tak). Lazy parsing isliye crucial hai. Bundle size kam rakhna, dead code eliminate karna, aur code splitting parser ka kaam ghataते hain — jisse Time-to-Interactive improve hota hai.",
    tricky: [
      {
        title: 'AST kaisa dikhta hai?',
        code: "// 'a + b * c' ka AST precedence dikhata hai:\n// BinaryExpression(+)\n//   left: a\n//   right: BinaryExpression(*)\n//            left: b, right: c",
        explain: "Parser operator precedence ko tree structure mein encode karta hai — * pehle, fir +.",
        lang: 'js',
      },
      {
        title: 'Pre-parsing twice work?',
        explain: "Agar pre-parsed function call ho jaaye, V8 use phir se (eagerly) parse karta hai — to galat lazy decision 'double parsing' cost laa sakta hai.",
      },
    ],
    interview: {
      beginner: [
        { q: 'AST kya hai?', a: 'Abstract Syntax Tree — code ka tree representation jisme har node ek language construct hota hai.' },
        { q: 'Tokenizing kya hai?', a: 'Code string ko chhote meaningful tokens (keywords, identifiers, operators) mein todna.' },
      ],
      intermediate: [
        { q: 'Lazy parsing kya hai?', a: 'Functions ko poora parse na karke sirf syntax/scope check karna; full parse tab jab function pehli baar call ho — startup fast hota hai.' },
        { q: 'AST kaun-kaun use karta hai?', a: 'Babel, ESLint, Prettier, TypeScript, minifiers — sab AST par transform/analysis karte hain.' },
      ],
      advanced: [
        { q: 'IIFE eager parsing ko kaise affect karta hai?', a: 'IIFE V8 ko hint deta hai ki function turant chalega, isliye V8 use eagerly (fully) parse karta hai instead of pre-parsing.' },
      ],
    },
    mcqs: [
      { q: 'AST ka full form?', options: ['Auto Syntax Tree', 'Abstract Syntax Tree', 'Async Syntax Tree', 'Abstract Source Tree'], answer: 1, explain: 'Abstract Syntax Tree.' },
      { q: 'Lexer ka kaam?', options: ['Tree banana', 'Tokens banana', 'Machine code', 'GC'], answer: 1, explain: 'Lexer/tokenizer code ko tokens mein todta hai.' },
      { q: 'Lazy parsing ka fayda?', options: ['Memory leak', 'Fast startup', 'Slow startup', 'No AST'], answer: 1, explain: 'Functions ko zaroorat par parse karke startup tez hota hai.' },
    ],
    exercises: {
      easy: ['astexplorer.net par "let x = 5" ka AST dekho.', 'Batao tokenizing aur parsing mein fark.'],
      medium: ['"a + b * c" ka AST draw karo precedence dikhate hue.', 'Ek IIFE likho aur explain karo eager parsing kyun.'],
      advanced: ['@babel/parser se ek code parse karke uske top-level node types list karo.'],
    },
    summary: [
      'Parsing = lexing (tokens) + parsing (tree).',
      'AST = code ka abstract tree representation.',
      'Eager parsing turant; lazy parsing zaroorat par.',
      'Lazy/pre-parsing startup ko fast karta hai.',
      'AST par Babel, ESLint, Prettier sab kaam karte hain.',
      'AST aage Ignition ko bytecode ke liye jaati hai.',
    ],
    cheatsheet: [
      { h: 'Steps', code: "Source -> Tokens -> AST" },
      { h: 'Parse types', code: "Eager (full) | Lazy (pre-parse)" },
      { h: 'Tools', code: "Babel, Acorn, Esprima, ESLint" },
    ],
    projects: [
      'Custom ESLint rule banana (AST traversal).',
      'Code formatter / linter prototype.',
      'Babel plugin se syntax transform karna.',
      'Code metrics tool (functions count, complexity) AST se.',
    ],
    advanced:
      "🚀 ESTree ek de-facto standard AST format hai jise Acorn ne popularize kiya aur ESLint/Babel follow karte hain. V8 ka internal AST ESTree se alag hai (engine-specific). Advanced tooling AST ko *traverse* (visitor pattern), *transform* aur wapas *generate* (codegen) karta hai — yahi compilers/transpilers ki backbone hai.",
    quiz: [
      { q: 'AST par kaun kaam karta hai?', options: ['Sirf browser', 'Babel/ESLint/Prettier', 'Sirf GC', 'CSS engine'], answer: 1, explain: 'Saare JS tools AST par operate karte hain.' },
      { q: 'Pre-parsing kab full parse karwati hai?', options: ['Kabhi nahi', 'Function pehli call par', 'GC par', 'Page load par'], answer: 1, explain: 'Function pehli baar call hone par poora parse hota hai.' },
    ],
    related: ['v8-architecture', 'ignition-turbofan', 'html-parsing-dom', 'execution-context'],
  },

  'ignition-turbofan': {
    overview:
      "**Ignition** aur **TurboFan** V8 ke do dil hain. **Ignition** ek *bytecode interpreter* hai jo fast startup deta hai. **TurboFan** ek *JIT optimizing compiler* hai jo baar-baar chalne wale (**hot**) code ko super-fast machine code banata hai. Inka combo V8 ko fast bhi banata hai aur memory-efficient bhi. 🔥",
    why:
      "'JIT compilation kya hai?', 'deopt kab hota hai?', 'monomorphic vs polymorphic vs megamorphic' — ye senior frontend/Node interviews ke favourite deep questions hain. Yahan se aap performance-critical code likhna seekhते ho.",
    concept: [
      { h: 'Ignition (Bytecode Interpreter)', p: '**Ignition** AST ko **bytecode** (compact, register-based instructions) mein convert karke interpret karता hai. Machine code se chhota hota hai — memory bachata hai aur startup tez karता hai.', code: "// 'a + b' ka simplified bytecode:\n// Ldar a        (load a)\n// Add b         (add b)\n// Return" },
      { h: 'TurboFan (JIT Optimizing Compiler)', p: '**TurboFan** *hot functions* ko machine code mein compile karता hai *type feedback* ke saath. Speculative optimization karता hai — assume karता hai ki types stable rahenge.' },
      { h: 'Hot Functions', p: 'Jo functions *baar-baar* chalte hain unhe **hot** kehते hain. V8 ka profiler inhe detect karता hai aur TurboFan ko bhejता hai optimize karne ke liye.' },
      { h: 'Speculative Optimization', p: 'TurboFan *assume* karता hai ki "is function mein hamesha numbers aayenge" aur uske hisaab se fast machine code banata hai. Ye assumption *runtime feedback* par based hota hai.' },
      { h: 'Deoptimization (Deopt/Bailout)', p: 'Agar assumption *toot jaaye* (jaise number ki jagah string aa gaya), to TurboFan ka optimized code **invalid** ho jaata hai. V8 use **deoptimize** karke wapas Ignition (slow path) par aata hai.', code: "function add(a, b) { return a + b }\nadd(1, 2)      // optimized for numbers\nadd('x', 'y')  // assumption toot gayi -> DEOPT" },
      { h: 'Monomorphic / Polymorphic / Megamorphic', p: '**Monomorphic** = function/property hamesha ek hi shape/type dekhता hai (fastest). **Polymorphic** = 2-4 shapes. **Megamorphic** = bahut saari shapes (slowest, IC give up kar deta hai).', code: "// Monomorphic (fast):\nfunction area(s) { return s.w * s.h }\narea({ w: 2, h: 3 })\narea({ w: 5, h: 6 })   // same shape\n\n// Megamorphic (slow): har baar alag shape" },
    ],
    analogy:
      "Socho ek **chef** (Ignition) jo recipe card (bytecode) padh kar har dish banata hai — flexible par har baar padhna padta hai. Jab koi dish *bahut popular* (hot) ho jaati hai, to chef us dish ka ek **muscle-memory shortcut** (TurboFan machine code) bana leta hai — bina recipe padhe super-fast. Par agar customer kahe 'aaj isme alag ingredient daal do' (type change), to shortcut bekaar ho jaata hai aur chef wapas recipe card (deopt) padhne lagta hai. 👨‍🍳",
    syntax: {
      code: "// Optimization observe karna (Node):\n// node --allow-natives-syntax\nfunction sq(n) { return n * n }\nsq(2); sq(3);\n%OptimizeFunctionOnNextCall(sq);\nsq(4);\nconsole.log(%GetOptimizationStatus(sq));\n// node --trace-opt --trace-deopt app.js",
      note: "%-prefixed functions sirf --allow-natives-syntax flag ke saath chalte hain — debugging ke liye.",
      lang: 'js',
    },
    steps: [
      'Ignition AST se bytecode banata hai.',
      'Bytecode interpret hote waqt type feedback collect hota hai.',
      'Profiler dekhता hai kaunsa function hot ho gaya.',
      'Hot function TurboFan ko bheja jaata hai.',
      'TurboFan type assumptions ke saath optimized machine code banata hai.',
      'Optimized code chalata hai (fast path).',
      'Agar type assumption tooti, deopt hota hai.',
      'Deopt ke baad function wapas Ignition par interpret hota hai.',
    ],
    internals: {
      p: "🧠 **Deep dive:** V8 ab **tiered compilation** use karta hai: Ignition (interpreter) -> **Sparkplug** (fast baseline compiler, no optimization) -> **Maglev** (mid-tier optimizing compiler) -> **TurboFan** (top-tier aggressive optimizer). Jaise-jaise function 'hotter' hota hai, wo upar ke tiers mein jaata hai. Inline caches (ICs) har property access par feedback store karte hain — yahi feedback TurboFan ko batata hai ki kaunse shapes aaye. Megamorphic IC banne par TurboFan inline nahi kar paता aur generic (slow) lookup hota hai.",
      code: "// Tiered pipeline:\n// Ignition -> Sparkplug -> Maglev -> TurboFan\n// (har tier zyada optimization, zyada compile cost)",
      lang: 'js',
    },
    process: {
      type: 'boxes',
      items: [
        { label: 'Ignition', sub: 'bytecode interpret', color: '#8B5CF6' },
        { label: 'Profiler', sub: 'hot detect', color: '#06B6D4' },
        { label: 'TurboFan', sub: 'optimize -> machine code', color: '#22C55E' },
        { label: 'Deopt', sub: 'assumption toota', color: '#EF4444' },
      ],
    },
    visual: {
      type: 'timeline',
      items: [
        { year: '1', text: 'Function bytecode mein chalna shuru hota hai (Ignition).' },
        { year: '2', text: 'Type feedback collect hota hai (inline caches).' },
        { year: '3', text: 'Function hot hone par TurboFan optimize karta hai.' },
        { year: '4', text: 'Optimized machine code fast chalta hai.' },
        { year: '5', text: 'Type change par deopt -> wapas Ignition.' },
      ],
    },
    memory:
      "Bytecode (Ignition) machine code se kaafi chhota hota hai — isliye V8 har function ke liye machine code rakhne ke bajay bytecode rakhता hai aur sirf hot functions ko machine code banata hai. Ye memory aur startup ka smart trade-off hai.",
    browser:
      "TurboFan/Ignition V8-specific hain (Chrome, Node, Edge). Firefox ke SpiderMonkey mein equivalent tiers hain (Baseline Interpreter, Baseline JIT, Warp/IonMonkey). JavaScriptCore (Safari) mein 4 tiers: LLInt, Baseline, DFG, FTL. Concept har jagah same — tiered JIT.",
    notes: {
      concept: "JIT = Just-In-Time: code ko *runtime* par compile karna, na ki pehle se (AOT).",
      tip: "Apne functions ko hamesha same-shaped objects de — IC monomorphic rahega aur TurboFan aggressive optimize karega.",
      warning: "try/catch, arguments object ka misuse, aur changing object shapes deopt ya de-optimization-resistant code bana sakte hain.",
      error: "Megamorphic IC se property access generic ho jaata hai — bade loops mein ye bada slowdown laata hai.",
    },
    compare: {
      headers: ['Aspect', 'Ignition', 'TurboFan'],
      rows: [
        ['Type', 'Interpreter', 'Optimizing compiler'],
        ['Output', 'Bytecode', 'Machine code'],
        ['Speed', 'Fast startup', 'Fast runtime'],
        ['Memory', 'Chhota', 'Bada'],
        ['Kab', 'Hamesha', 'Hot functions'],
      ],
    },
    mistakes: [
      { bad: "Ek function ko alag-alag types se call karna.", fix: "Consistent types do — monomorphic rakho." },
      { bad: "Object shapes runtime par badalna.", fix: "Properties constructor mein hi set karo; shape stable rakho." },
      { bad: "Sochna 'deopt = error'.", fix: "Deopt error nahi, bas V8 optimized code chhod kar safe slow path par aata hai." },
    ],
    best: [
      'Functions ko monomorphic rakho (ek type/shape).',
      'Object properties consistent order mein initialize karo.',
      'Hot loops mein type changes avoid karo.',
      'Packed arrays use karo (no holes, same type).',
      'Premature micro-optimization se pehle profile karo.',
    ],
    performance:
      "⚡ Sabse bada win: **monomorphic, type-stable** code. TurboFan tabhi aggressive optimize karta hai. Deopt loops (jab function baar-baar optimize aur deopt ho) sabse kharaab — ye 'deoptimization storm' hai. Profile karo (--trace-deopt) aur unstable types fix karo.",
    tricky: [
      {
        title: 'Deopt storm',
        code: "function f(x) { return x.v }\nfor (let i = 0; i < 1e6; i++) {\n  f(i % 2 ? { v: 1 } : { v: 1, w: 2 })\n}",
        explain: "Do alag shapes baar-baar aane se IC polymorphic/megamorphic ho jaata hai — TurboFan optimize/deopt loop mein phans sakta hai.",
        lang: 'js',
      },
      {
        title: 'arguments object slow path',
        code: "function slow() { return arguments.length }   // can deopt\nfunction fast(...args) { return args.length }  // better",
        explain: "Classic 'arguments' object kuch cases mein optimization rok deta hai; rest params (...args) prefer karo.",
        lang: 'js',
      },
    ],
    interview: {
      beginner: [
        { q: 'Ignition kya hai?', a: 'V8 ka bytecode interpreter jo AST se bytecode banakar interpret karta hai — fast startup deta hai.' },
        { q: 'TurboFan kya hai?', a: 'V8 ka JIT optimizing compiler jo hot functions ko optimized machine code mein badalta hai.' },
      ],
      intermediate: [
        { q: 'JIT compilation kya hai?', a: 'Just-In-Time — runtime par code ko machine code mein compile karna, type feedback use karke.' },
        { q: 'Deoptimization kya hai?', a: 'Jab optimized code ke type assumptions toot jaate hain, V8 bailout karke wapas interpreter (Ignition) par aata hai.' },
      ],
      advanced: [
        { q: 'Monomorphic, polymorphic, megamorphic mein fark?', a: 'Ek shape = monomorphic (fastest), 2-4 = polymorphic, bahut zyada = megamorphic (IC give up, slowest).' },
        { q: 'V8 ke compilation tiers?', a: 'Ignition -> Sparkplug -> Maglev -> TurboFan — har tier zyada optimization deta hai jaise function hotter hota hai.' },
      ],
    },
    mcqs: [
      { q: 'Ignition kya banata hai?', options: ['Machine code', 'Bytecode', 'AST', 'CSSOM'], answer: 1, explain: 'Ignition AST se bytecode banata hai.' },
      { q: 'Deopt kab hota hai?', options: ['GC par', 'Type assumption tootne par', 'Page load par', 'Kabhi nahi'], answer: 1, explain: 'Type assumptions invalid hone par deopt hota hai.' },
      { q: 'Sabse fast IC state?', options: ['Megamorphic', 'Polymorphic', 'Monomorphic', 'Uninitialized'], answer: 2, explain: 'Monomorphic (ek hi shape) sabse fast hai.' },
    ],
    exercises: {
      easy: ['Ignition aur TurboFan ka ek-ek line difference likho.', 'JIT compilation define karo.'],
      medium: ['Ek monomorphic aur ek megamorphic function example likho.', '--trace-deopt se ek deopt trigger karo.'],
      advanced: ['Ek deopt-storm example likho aur use fix karo type-stable bana kar.'],
    },
    summary: [
      'Ignition = bytecode interpreter (fast startup).',
      'TurboFan = JIT optimizing compiler (hot code).',
      'Hot functions optimize hote hain type feedback se.',
      'Deopt tab jab type assumptions tootein.',
      'Monomorphic code sabse fast; megamorphic slowest.',
      'V8 tiered: Ignition -> Sparkplug -> Maglev -> TurboFan.',
    ],
    cheatsheet: [
      { h: 'Two engines', code: "Ignition (interpret) + TurboFan (optimize)" },
      { h: 'IC states', code: "Mono < Poly < Megamorphic (slow)" },
      { h: 'Debug', code: "--trace-opt --trace-deopt" },
    ],
    projects: [
      'Performance profiling of a Node.js hot path.',
      'Type-stable refactor of a slow data-processing loop.',
      'Benchmarking monomorphic vs polymorphic access.',
      'Game loop / physics engine optimization.',
    ],
    advanced:
      "🚀 **Maglev** (2023) V8 ka naya mid-tier SSA-based compiler hai jo Sparkplug se zyada par TurboFan se kam optimize karta hai — fast compile + decent speed. On-Stack Replacement (OSR) ek technique hai jismein ek lambe-chalte loop ko *beech mein hi* optimized code par switch kar diya jaata hai bina function dobara call kiye. Ye long-running loops ko bhi optimize hone deta hai.",
    quiz: [
      { q: 'TurboFan kya optimize karta hai?', options: ['Sab functions', 'Hot functions', 'Sirf GC', 'CSS'], answer: 1, explain: 'Sirf baar-baar chalne wale hot functions.' },
      { q: 'Megamorphic IC ka matlab?', options: ['Fastest', 'Bahut shapes, slow', 'Ek shape', 'No type'], answer: 1, explain: 'Bahut saari shapes -> IC give up -> slow generic lookup.' },
    ],
    related: ['v8-architecture', 'parsing-ast', 'memory-management', 'async-internals'],
  },

  'memory-management': {
    overview:
      "JavaScript mein memory **automatic** manage hoti hai — aapko manually `malloc/free` nahi karna padta (jaise C mein). JS engine do jagah memory rakhता hai: **Stack** (chhota, fast, primitives + function calls) aur **Heap** (bada, objects + arrays). Jab koi data use mein nahi rehta, **Garbage Collector (GC)** use automatically clean kar deta hai. 🧹",
    why:
      "Memory leaks production apps ko slow/crash karते hain. Stack vs heap, garbage collection algorithms (mark-and-sweep, generational GC), aur common leak patterns (detached DOM, closures, timers) samajhna *must* hai — ye performance interviews ka core hai.",
    concept: [
      { h: 'Stack Memory', p: '**Stack** mein **primitives** (number, string, boolean, null, undefined, symbol, bigint) aur **function call frames** rakhe jaate hain. Fast hai, fixed size, **LIFO** (Last In First Out). Function khatam hote hi uska frame pop ho jaata hai.', code: "function go() {\n  let n = 5        // stack par\n  let s = 'hi'     // stack par (primitive)\n}\n// go() khatam -> n, s stack se pop" },
      { h: 'Heap Memory', p: '**Heap** mein **objects, arrays, functions** (reference types) store hote hain. Bada aur dynamic hai. Variable stack par hota hai par wo heap mein object ka *reference (address)* rakhता hai.', code: "let user = { name: 'Dev' }\n// 'user' stack par hai (reference)\n// { name: 'Dev' } heap par actual object" },
      { h: 'Reference vs Value', p: 'Primitives **value** se copy hote hain; objects **reference** se. Isi liye do variables ek hi heap object ko point kar sakte hain.', code: "let a = { x: 1 }\nlet b = a       // b same object ko point karta hai\nb.x = 99\nconsole.log(a.x)  // 99 (same heap object)" },
      { h: 'Garbage Collection', p: 'GC un objects ko free karता hai jo *reachable nahi* (koi reference nahi). JS reachability-based GC use karता hai — root (global, stack) se jo objects reach nahi hote, wo garbage hain.' },
      { h: 'Mark-and-Sweep', p: 'GC ka main algorithm: **Mark** phase mein roots se reachable saare objects mark hote hain; **Sweep** phase mein un-marked (unreachable) objects ki memory free ho jaati hai.', code: "// Reachable: root -> A -> B  (keep)\n// C ko koi point nahi karta -> unreachable -> sweep (free)" },
      { h: 'Generational GC', p: 'V8 heap ko **young generation** (naye, short-lived) aur **old generation** (purane, survive kiye) mein baant ता hai. **Scavenge** (Minor GC) young ko bar-bar fast clean karता hai; **Major GC** old ko occasionally.' },
    ],
    analogy:
      "Socho **Stack** ek *plate stack* hai (cafeteria) — upar se plate rakho, upar se hi uthao (LIFO), fast aur organized. **Heap** ek bada *warehouse* hai jahan saaman (objects) kahin bhi rakha ja sakta hai aur uska *address (reference)* aap stack par chit pe likhते ho. **Garbage Collector** ek safaai karmchari hai jo warehouse mein ghoom kar dekhता hai konsa saaman ab kisi ke kaam ka nahi (koi address nahi point karta) aur use hata deta hai. 🏬",
    syntax: {
      code: "// Memory profile (Chrome DevTools):\n// 1. F12 -> Memory tab\n// 2. 'Heap snapshot' lo\n// 3. Action karo, dusra snapshot lo\n// 4. 'Comparison' view se leaked objects dhoondo\n\n// Node:\n// node --expose-gc app.js  (global.gc() manually call)",
      note: "DevTools Memory tab + Performance tab leaks dhoondhne ke best tools hain.",
      lang: 'js',
    },
    steps: [
      'Code chalta hai aur memory allocate hoti hai (stack + heap).',
      'Primitives + call frames stack par jaate hain.',
      'Objects/arrays heap par allocate hote hain, references stack par.',
      'GC periodically root set se reachability check karta hai.',
      'Mark phase: reachable objects mark hote hain.',
      'Sweep phase: unreachable objects free hote hain.',
      'Young generation bar-bar (scavenge), old occasionally (major GC).',
      'Surviving objects young se old generation mein promote hote hain.',
    ],
    internals: {
      p: "🧠 **Deep dive:** V8 ka Orinoco GC *generational hypothesis* par based hai — 'zyadatar objects jaldi mar jaate hain'. Young generation **semi-space scavenge** use karta hai: do equal halves (from-space, to-space); live objects ek se dusre mein copy hote hain, baaki free. Survive karne par object old generation mein **promote** hota hai. Old generation **mark-sweep-compact** use karta hai. GC ko fast rakhne ke liye V8 *incremental marking* (kaam ko chhote tukdon mein), *concurrent marking* (background thread), aur *lazy sweeping* karता hai — taaki main thread (UI) zyada na ruke.",
      code: "// Generational layout:\n// Young Gen (scavenge, fast, frequent)\n//   from-space | to-space\n// Old Gen (mark-sweep-compact, slower, rare)\n//   survived objects promoted here",
      lang: 'js',
    },
    process: {
      type: 'boxes',
      items: [
        { label: 'Stack', sub: 'primitives + frames (LIFO)', color: '#8B5CF6' },
        { label: 'Heap', sub: 'objects + arrays', color: '#06B6D4' },
        { label: 'Young Gen', sub: 'scavenge (fast)', color: '#22C55E' },
        { label: 'Old Gen', sub: 'mark-sweep-compact', color: '#F97316' },
      ],
    },
    visual: {
      type: 'tree',
      root: 'Memory',
      children: [
        {
          label: 'Stack',
          sub: 'fast, fixed, LIFO',
          color: '#8B5CF6',
          children: [
            { label: 'Primitives', sub: 'number, string...', color: '#06B6D4' },
            { label: 'Call Frames', sub: 'function calls', color: '#3B82F6' },
          ],
        },
        {
          label: 'Heap',
          sub: 'dynamic, GC managed',
          color: '#F97316',
          children: [
            { label: 'Young Gen', sub: 'scavenge', color: '#22C55E' },
            { label: 'Old Gen', sub: 'mark-sweep', color: '#EF4444' },
          ],
        },
      ],
    },
    memory:
      "**Stack vs Heap (core):** Stack — primitives + function call frames, fast, fixed-size, automatically pop hota hai jab function return kare, LIFO order. Heap — reference types (objects, arrays, functions), dynamic size, GC manage karta hai. Variable stack par rehता hai aur heap object ka *reference* hold karта hai. Stack overflow tab jab recursion bahut deep ho; heap out-of-memory tab jab objects free na hon (leak).",
    browser:
      "Chrome DevTools mein **Memory tab** (heap snapshots, allocation timeline) aur **Performance tab** (GC pauses, memory graph) leaks aur GC behaviour debug karne ke best tools hain. `performance.memory` (Chrome) approximate heap size deta hai.",
    notes: {
      concept: "JS 'reachability-based' GC use karता hai — jo objects root se reach na hon, wo garbage.",
      tip: "Memory leak dhoondhne ke liye do heap snapshots compare karo (before/after action).",
      warning: "GC ko aap control nahi kar sakte; timing predictable nahi. global.gc() sirf debug flag ke saath.",
      error: "Bade objects ko unnecessarily reference karna (closures, global arrays) heap ko bhar deta hai -> Out Of Memory crash.",
    },
    compare: {
      headers: ['Aspect', 'Stack', 'Heap'],
      rows: [
        ['Stores', 'Primitives, frames', 'Objects, arrays'],
        ['Speed', 'Fast', 'Slower'],
        ['Size', 'Fixed/limited', 'Large/dynamic'],
        ['Access', 'LIFO', 'Random (by reference)'],
        ['Cleanup', 'Auto (pop)', 'GC'],
      ],
    },
    mistakes: [
      { bad: "Global variables mein bade data rakhna (kabhi GC nahi hota).", fix: "Scope chhota rakho; use ke baad reference null karo." },
      { bad: "setInterval/setTimeout clear na karna.", fix: "clearInterval/clearTimeout zaroor karo warna callbacks + closures alive rehte hain." },
      { bad: "Detached DOM nodes ko JS variable mein rakhna.", fix: "DOM remove ke baad variable ko null karo taaki node GC ho." },
      { bad: "Closures mein bade objects unnecessarily capture karna.", fix: "Sirf zaroori data capture karo." },
    ],
    best: [
      'Variables ka scope chhota rakho.',
      'Timers/intervals/listeners cleanup karo (removeEventListener, clearInterval).',
      'Bade objects use ke baad null kar do.',
      'WeakMap/WeakSet use karo jahan keys ko GC hone dena ho.',
      'Memory profiling regularly karo (heap snapshots).',
      'Detached DOM references avoid karo.',
    ],
    performance:
      "⚡ GC pauses UI ko 'jank' (lag) de sakte hain. Bahut saare short-lived objects banane se young-gen GC frequent hota hai. Object pooling, avoiding allocations in hot loops, aur leaks fix karna smooth performance deta hai. WeakMap se cache banao taaki entries automatically GC hon.",
    tricky: [
      {
        title: 'Closure leak',
        code: "function outer() {\n  const big = new Array(1000000).fill('x')\n  return function () { return big[0] }\n}\nconst keep = outer()  // 'big' alive rahega kyunki closure use karta hai",
        explain: "Returned function 'big' ko capture karta hai, isliye wo array GC nahi hota jab tak 'keep' alive hai.",
        lang: 'js',
      },
      {
        title: 'Detached DOM leak',
        code: "let node = document.getElementById('x')\ndocument.body.removeChild(node)\n// node DOM se hata par variable abhi point karta hai -> leak\nnode = null  // fix: ab GC ho sakta hai",
        explain: "DOM se remove karne ke baad bhi JS reference object ko zinda rakhta hai jab tak null na karo.",
        lang: 'js',
      },
    ],
    interview: {
      beginner: [
        { q: 'Stack aur Heap mein fark?', a: 'Stack primitives + call frames rakhta hai (fast, LIFO); Heap objects/arrays rakhta hai (dynamic, GC managed). Variable stack par reference rakhta hai jo heap object ko point karta hai.' },
        { q: 'Garbage collection kya hai?', a: 'Engine automatically un objects ki memory free karta hai jo ab reachable nahi (koi reference nahi).' },
      ],
      intermediate: [
        { q: 'Mark-and-sweep kaise kaam karta hai?', a: 'Mark phase mein roots se reachable objects mark hote hain; sweep phase mein un-marked objects ki memory free ho jaati hai.' },
        { q: 'Common memory leaks kaunse?', a: 'Global variables, uncleaned timers, detached DOM nodes, closures jo bade data capture karein, aur forgotten event listeners.' },
      ],
      advanced: [
        { q: 'Generational GC kya hai?', a: 'Heap ko young (short-lived) aur old (long-lived) mein baant kar — young ko scavenge se bar-bar fast clean, old ko mark-sweep-compact se kabhi-kabhi. Generational hypothesis: zyadatar objects jaldi marte hain.' },
        { q: 'WeakMap leaks kaise rokta hai?', a: 'WeakMap keys ko weakly hold karta hai — agar key object kahin aur referenced na ho to wo GC ho sakta hai, entry automatically hat jaati hai.' },
      ],
    },
    mcqs: [
      { q: 'Objects kahan store hote hain?', options: ['Stack', 'Heap', 'Register', 'Cache'], answer: 1, explain: 'Reference types (objects/arrays) heap par hote hain.' },
      { q: 'Mark-and-sweep ka mark phase kya karta hai?', options: ['Memory free', 'Reachable objects mark', 'Compact', 'Promote'], answer: 1, explain: 'Mark phase reachable objects ko mark karta hai.' },
      { q: 'Young generation kis GC se clean hota hai?', options: ['Major GC', 'Scavenge', 'Compaction', 'Manual'], answer: 1, explain: 'Young gen scavenge (minor GC) se frequently clean hota hai.' },
      { q: 'Kaunsa memory leak ka common cause hai?', options: ['Local const', 'Uncleaned setInterval', 'let in loop', 'Arrow function'], answer: 1, explain: 'Timer clear na karna callbacks ko alive rakhta hai.' },
    ],
    exercises: {
      easy: ['Stack aur heap ka ek-ek example variable batao.', 'Garbage collection ko ek line mein define karo.'],
      medium: ['Ek closure leak example likho aur use fix karo.', 'WeakMap se ek cache banao.'],
      advanced: ['Chrome DevTools mein heap snapshot le kar ek detached DOM leak detect karo aur fix karo.'],
    },
    summary: [
      'Stack: primitives + frames, fast, LIFO.',
      'Heap: objects/arrays, dynamic, GC managed.',
      'GC reachability se decide karta hai kya free karna hai.',
      'Mark-and-sweep main algorithm hai.',
      'Generational GC: young (scavenge) + old (mark-sweep).',
      'Leaks: globals, timers, detached DOM, closures.',
    ],
    cheatsheet: [
      { h: 'Stack vs Heap', code: "Stack: primitives | Heap: objects" },
      { h: 'GC algorithm', code: "Mark -> Sweep (-> Compact)" },
      { h: 'Leak fixes', code: "clearInterval, removeEventListener, null refs" },
    ],
    projects: [
      'Memory leak audit of a SPA using heap snapshots.',
      'WeakMap-based caching layer.',
      'Object pooling for a high-allocation render loop.',
      'Long-running Node service memory monitoring.',
      'Debugging a React app with detached DOM leaks.',
    ],
    advanced:
      "🚀 V8 ke advanced GC features: **concurrent marking** (background thread par marking), **parallel scavenging** (multiple threads young gen pe), **incremental marking** (kaam ko chhote steps mein bata kar long pauses avoid), aur **idle-time GC** (jab main thread free ho). WeakRef aur FinalizationRegistry (ES2021) advanced memory-aware patterns dete hain par carefully use karne chahiye — GC timing guaranteed nahi hoti.",
    quiz: [
      { q: 'GC kab object free karta hai?', options: ['Jab unreachable ho', 'Har second', 'Manual call par', 'Kabhi nahi'], answer: 0, explain: 'Jab object root se reachable na ho.' },
      { q: 'Detached DOM leak ka fix?', options: ['Reload', 'Reference null karo', 'GC call', 'Nothing'], answer: 1, explain: 'JS reference ko null karke node ko GC hone do.' },
    ],
    related: ['v8-architecture', 'execution-context', 'event-loop', 'ignition-turbofan'],
  },

  'execution-context': {
    overview:
      "Jab bhi JS code chalता hai, wo ek **Execution Context (EC)** ke andar chalता hai — ek *container* jisme code ki saari info hoti hai (variables, scope, `this`). Sabse pehle ek **Global Execution Context** banta hai. Har function call par ek **Function Execution Context** banता hai. Ye sab ek **Call Stack** par manage hote hain. 📦",
    why:
      "Execution context **hoisting, scope chain, closures, aur `this`** ka foundation hai. 'JS code kaise execute hota hai?', 'hoisting kyun hota hai?', 'call stack kya hai?' — ye interview ke daily questions hain. Bina iske advanced JS samajhna mushkil hai.",
    concept: [
      { h: 'Execution Context kya hai?', p: 'EC ek *environment* hai jisme JS code evaluate aur execute hota hai. Isme variable environment, scope chain, aur `this` binding hota hai.' },
      { h: 'Global vs Function EC', p: '**Global EC** sabse pehle banta hai (poora script). Har **function call** par ek naya **Function EC** banта hai. Browser mein global object `window` hota hai.' },
      { h: 'Do Phases: Creation aur Execution', p: 'Har EC do phases mein banta hai. **Creation (memory) phase**: variables/functions memory mein allocate hote hain (hoisting yahin hota hai). **Execution phase**: code line-by-line chalता hai, values assign hoti hain.', code: "console.log(x)  // undefined (hoisted, not assigned yet)\nvar x = 5\nconsole.log(x)  // 5" },
      { h: 'Hoisting', p: '**Creation phase** mein `var` declarations `undefined` se aur **function declarations** poori memory mein chadh jaate hain — isi liye declaration se pehle use kar sakte ho. `let`/`const` hoist to hote hain par **TDZ** (Temporal Dead Zone) mein rehते hain.', code: "greet()                 // works (hoisted)\nfunction greet() { console.log('hi') }\n\ngetName()               // ReferenceError (TDZ)\nconst getName = () => {}" },
      { h: 'Scope Chain', p: 'Har EC apne parent EC ka reference rakhता hai. Variable na mile to JS *outer* scopes mein dhoondhता hai — yahi **scope chain** hai (lexical scope par based).', code: "let a = 1\nfunction outer() {\n  let b = 2\n  function inner() {\n    console.log(a, b)  // scope chain se a, b mil jaate hain\n  }\n  inner()\n}" },
      { h: 'Call Stack', p: '**Call Stack** ek LIFO structure hai jo execution contexts ko track karта hai. Function call par EC *push*, return par *pop*. JS single-threaded hai — ek hi call stack.', code: "function a() { b() }\nfunction b() { c() }\nfunction c() { console.log('done') }\na()\n// Stack: a -> b -> c (push), fir c -> b -> a (pop)" },
    ],
    analogy:
      "Socho aap **kaam ki to-do stack** rakhते ho. Jab naya kaam (function) aata hai, aap use stack ke **upar** rakhते ho aur usi par focus karते ho (current EC). Us kaam ke andar naya sub-kaam aaya? Wo bhi upar rakh do. Jab koi kaam khatam, use stack se **hata** dete ho aur neeche wale par wapas aate ho (return). Single-threaded matlab aap *ek time par ek hi* kaam karte ho. 📋",
    syntax: {
      code: "// Call stack devtools mein dekho:\n// F12 -> Sources -> breakpoint lagao -> 'Call Stack' panel\n\nfunction first() { second() }\nfunction second() { debugger }  // yahan call stack dekho\nfirst()",
      note: "DevTools Sources panel mein 'Call Stack' live execution contexts dikhata hai.",
      lang: 'js',
    },
    steps: [
      'Script chalne par Global Execution Context banta hai.',
      'Creation phase: global variables/functions memory mein allocate (hoisting).',
      'Global EC call stack par push hota hai.',
      'Function call par naya Function EC banta hai.',
      'Us EC ka creation phase (local hoisting), fir execution phase.',
      'Naya EC call stack par push hota hai.',
      'Function return par EC pop ho jaata hai.',
      'Stack empty hone par program khatam.',
    ],
    internals: {
      p: "🧠 **Deep dive:** Modern spec mein har EC ke do components hote hain: **LexicalEnvironment** (let/const + outer reference) aur **VariableEnvironment** (var). Creation phase mein engine ek 'Environment Record' banata hai jisme bindings register hote hain. `var` ko `undefined` initialize karta hai (isliye hoisting se undefined milता hai), par `let`/`const` ko *uninitialized* state mein rakhta hai (TDZ) — access karne par ReferenceError. `this` binding bhi creation phase mein decide hoti hai (call-site par based: global, object, new, call/apply/bind).",
      code: "// Creation phase (conceptually):\n// var x  -> x = undefined\n// let y  -> y = <uninitialized>  (TDZ)\n// function f -> f = <full function>\n// this -> binding set",
      lang: 'js',
    },
    process: {
      type: 'boxes',
      items: [
        { label: 'Global EC', sub: 'sabse pehle, window', color: '#8B5CF6' },
        { label: 'Creation Phase', sub: 'hoisting, this, scope', color: '#06B6D4' },
        { label: 'Execution Phase', sub: 'line-by-line run', color: '#22C55E' },
        { label: 'Function EC', sub: 'har call par naya', color: '#F97316' },
      ],
    },
    visual: {
      type: 'timeline',
      items: [
        { year: '1', text: 'Global EC banta hai aur push hota hai.' },
        { year: '2', text: 'Creation phase: hoisting + this + scope chain.' },
        { year: '3', text: 'Execution phase: code chalta hai.' },
        { year: '4', text: 'Function call -> naya Function EC push.' },
        { year: '5', text: 'Function return -> EC pop.' },
        { year: '6', text: 'Stack empty -> program complete.' },
      ],
    },
    memory:
      "**Call Stack (stack memory):** har execution context ek stack frame hai. Function call par frame *push*, return par *pop* (LIFO). Local primitives stack frame mein, objects heap mein (frame sirf reference rakhता hai). Bahut deep ya infinite recursion **Maximum call stack size exceeded** (stack overflow) error deता hai kyunki stack ki size limited hai. Closures ke variables heap mein rehte hain taaki function return ke baad bhi alive rahein.",
    browser:
      "Chrome DevTools **Sources -> Call Stack** panel live execution contexts dikhata hai. Browser ka global object `window` hai (Node mein `global`/`globalThis`). Errors ka 'stack trace' bhi call stack se hi banta hai.",
    notes: {
      concept: "Har function call ek naya execution context banata hai apne variable environment, scope chain aur this ke saath.",
      tip: "Hoisting samajhne ke liye yaad rakho: var -> undefined, let/const -> TDZ, function decl -> full.",
      warning: "Infinite recursion -> 'Maximum call stack size exceeded' (stack overflow).",
      error: "let/const ko declaration se pehle access karna ReferenceError (TDZ) deta hai, undefined nahi.",
    },
    compare: {
      headers: ['Aspect', 'Creation Phase', 'Execution Phase'],
      rows: [
        ['Kab', 'Pehle', 'Baad mein'],
        ['Kaam', 'Memory allocate (hoist)', 'Code run, assign'],
        ['var', 'undefined', 'value assign'],
        ['let/const', 'TDZ', 'value assign'],
      ],
    },
    mistakes: [
      { bad: "Sochna let/const hoist nahi hote.", fix: "Hote hain par TDZ mein — access se ReferenceError aata hai." },
      { bad: "Function expression ko declaration se pehle call karna.", fix: "Sirf function declarations hoist hote hain, expressions nahi." },
      { bad: "Deep/infinite recursion bina base case ke.", fix: "Base case do warna stack overflow." },
    ],
    best: [
      'Variables ko top par declare karo (clarity).',
      'let/const prefer karo var ke bajay (TDZ se predictable).',
      'Recursion mein base case zaroor rakho.',
      'Scope chhota rakho — fewer lookups, kam bugs.',
      'this binding samjho function ke type ke hisaab se.',
    ],
    performance:
      "⚡ Bahut deep scope chains lookups ko thoda slow karте hain (har level dhoondhna padta hai). Closures memory hold karte hain — unnecessary closures avoid karo. Deep recursion stack overflow karता hai; tail-call ya iterative approach better. Local variables global se fast access hote hain.",
    tricky: [
      {
        title: 'Hoisting output',
        code: "console.log(a)\nvar a = 10\nfunction a() {}\nconsole.log(a)",
        output: "function a(){}  (pehle line)\n10  (doosri line)",
        explain: "Creation phase mein function declaration var par hawi hota hai, isliye pehla log function dikhata hai; fir execution phase mein a = 10 assign hota hai.",
        lang: 'js',
      },
      {
        title: 'TDZ',
        code: "console.log(x)  // ReferenceError\nlet x = 5",
        explain: "let hoist to hota hai par TDZ mein — initialization se pehle access ReferenceError deta hai (undefined nahi).",
        lang: 'js',
      },
    ],
    interview: {
      beginner: [
        { q: 'Execution context kya hai?', a: 'Ek environment jisme JS code execute hota hai — isme variable environment, scope chain aur this hote hain. Global aur Function EC do types hain.' },
        { q: 'Call stack kya hai?', a: 'Ek LIFO structure jo execution contexts ko track karta hai — function call par push, return par pop.' },
      ],
      intermediate: [
        { q: 'Hoisting kya hai aur kyun hota hai?', a: 'Creation phase mein declarations memory mein chadh jaate hain. var -> undefined, function decl -> full, let/const -> TDZ. Isi liye declaration se pehle var access undefined deta hai.' },
        { q: 'Scope chain kya hai?', a: 'Har EC apne parent ka reference rakhta hai; variable na mile to outer scopes mein dhoondha jaata hai (lexical scope par based).' },
      ],
      advanced: [
        { q: 'EC ke do phases kaunse?', a: 'Creation (memory) phase — hoisting, this, scope chain set; Execution phase — code line-by-line, values assign.' },
        { q: 'TDZ kya hai?', a: 'Temporal Dead Zone — let/const ke declaration ke pehle ka region jahan unhe access karna ReferenceError deta hai kyunki wo uninitialized state mein hote hain.' },
      ],
    },
    mcqs: [
      { q: 'Sabse pehle kaunsa EC banta hai?', options: ['Function EC', 'Global EC', 'Eval EC', 'Block EC'], answer: 1, explain: 'Global Execution Context sabse pehle.' },
      { q: 'var creation phase mein kis value se hoist hota hai?', options: ['null', 'undefined', 'TDZ', '0'], answer: 1, explain: 'var undefined se initialize hota hai.' },
      { q: 'Call stack ka order?', options: ['FIFO', 'LIFO', 'Random', 'Priority'], answer: 1, explain: 'Last In First Out.' },
      { q: 'let access before declaration?', options: ['undefined', 'null', 'ReferenceError', '0'], answer: 2, explain: 'TDZ ki wajah se ReferenceError.' },
    ],
    exercises: {
      easy: ['Global aur Function EC mein fark batao.', 'Ek var hoisting example likho.'],
      medium: ['Ek nested function se scope chain demonstrate karo.', 'TDZ ka example likho.'],
      advanced: ['Ek code likho jo call stack ke push/pop order ko console se dikhaye.'],
    },
    summary: [
      'EC = environment jisme code chalta hai (variables, scope, this).',
      'Global EC pehle, Function EC har call par.',
      'Do phases: creation (hoisting) + execution.',
      'var -> undefined, let/const -> TDZ.',
      'Scope chain outer EC se variables dhoondhta hai.',
      'Call stack (LIFO) ECs ko manage karta hai.',
    ],
    cheatsheet: [
      { h: 'Phases', code: "Creation (hoist) -> Execution (run)" },
      { h: 'Hoisting', code: "var=undefined, let/const=TDZ, fn=full" },
      { h: 'Stack', code: "call=push, return=pop (LIFO)" },
    ],
    projects: [
      'Debugging closures-based bug using call stack.',
      'Building a simple stack-based calculator (mental model).',
      'Explaining hoisting bugs in a code review.',
      'Visualizing call stack for a recursive algorithm.',
    ],
    advanced:
      "🚀 Spec-level: ECMAScript mein 'Execution Context' ke andar Realm, LexicalEnvironment, VariableEnvironment, aur PrivateEnvironment hote hain. Closures isliye kaam karte hain kyunki inner function apne creation ke waqt ka LexicalEnvironment hold karta hai — wo environment heap mein zinda rehता hai even after outer return. Generators/async functions execution context ko *suspend aur resume* kar sakte hain (yield/await par).",
    quiz: [
      { q: 'Creation phase mein kya hota hai?', options: ['Values assign', 'Hoisting', 'GC', 'Paint'], answer: 1, explain: 'Memory allocation (hoisting) creation phase mein.' },
      { q: 'Stack overflow ka karan?', options: ['Bada object', 'Deep/infinite recursion', 'Memory leak', 'Async'], answer: 1, explain: 'Bahut deep recursion call stack bhar deti hai.' },
    ],
    related: ['memory-management', 'event-loop', 'v8-architecture', 'async-internals'],
  },

  'event-loop': {
    overview:
      "JavaScript **single-threaded** hai — ek time par ek hi kaam. Phir bhi wo *non-blocking async* kaise karता hai? Jawab hai **Event Loop**! Ye ek coordinator hai jo **Call Stack**, **Web APIs**, aur **Callback (Task) Queue** ke beech kaam manage karता hai — jab stack khali ho, queue se kaam utha kar stack par daal deता hai. 🔄",
    why:
      "Event loop JS ka *sabse important* concept hai. setTimeout, Promises, fetch, DOM events — sab isi par chalte hain. Output-based questions ('ye kis order mein print hoga?') har frontend interview mein aate hain. Iske bina async JS samajhna namumkin hai.",
    concept: [
      { h: 'Single-threaded + non-blocking', p: 'JS ke paas ek hi **call stack** hai (ek thread). Lekin browser/Node async tasks (timers, network) ko *background* mein chalaते hain aur callback ko queue mein daalte hain — isi liye JS block nahi hota.' },
      { h: 'Call Stack', p: 'Jahan synchronous code chalता hai (LIFO). Event loop tabhi queue se kaam uthata hai jab call stack **empty** ho.' },
      { h: 'Web APIs', p: 'Browser ke provided APIs (setTimeout, fetch, DOM events, geolocation). Ye JS engine ka part nahi — browser inhe *background* mein handle karता hai aur complete hone par callback ko queue mein bhej deता hai.', code: "setTimeout(() => console.log('later'), 1000)\n// timer Web API mein chalta hai, JS block nahi hota" },
      { h: 'Callback (Task) Queue', p: 'Jab Web API ka kaam pura hota hai, uska callback **Task Queue (macrotask queue)** mein jaata hai. Event loop ise FIFO order mein call stack par bhejता hai jab stack khali ho.' },
      { h: 'Event Loop Tick', p: 'Event loop ka kaam: *check karo call stack khali hai? Agar haan, queue se ek task le kar stack par daalo.* Ye loop continuously chalता hai — har round ek **tick** hai.' },
    ],
    analogy:
      "Socho ek **restaurant waiter** (event loop). Ek hi cook (call stack) hai jo ek time par ek dish banaता hai. Customer ne kuch order kiya jisme time lagega (setTimeout, fetch) — waiter use **kitchen helper** (Web API) ko de देता hai aur turant agla order leta hai (non-blocking). Jab helper dish ready kar deta hai, wo **counter** (task queue) par rakh देता hai. Waiter (event loop) tabhi us dish ko cook ke paas le jaata hai jab cook *free* (stack empty) ho. 🍽️",
    syntax: {
      code: "console.log('1')\nsetTimeout(() => console.log('2'), 0)\nconsole.log('3')\n// Output: 1, 3, 2\n// setTimeout 0ms bhi queue mein jaata hai -> stack empty hone ke baad chalta hai",
      note: "setTimeout(fn, 0) bhi turant nahi chalta — wo macrotask queue mein jaata hai aur sync code ke baad.",
      lang: 'js',
    },
    steps: [
      'Synchronous code call stack par chalta hai.',
      'Async API (setTimeout/fetch) milne par wo Web API ko delegate hota hai.',
      'JS thread block nahi hota, aage chalta rehta hai.',
      'Web API ka kaam complete hone par callback Task Queue mein jaata hai.',
      'Saara sync code khatam -> call stack empty.',
      'Event loop check karta hai: stack empty?',
      'Empty hai to Task Queue se ek callback uthakar stack par daalta hai.',
      'Ye loop (tick) continuously repeat hota hai.',
    ],
    internals: {
      p: "🧠 **Deep dive:** Event loop ka asli algorithm: (1) call stack se saara sync code chalao; (2) stack empty hote hi **saari microtasks** (Promise callbacks, queueMicrotask) drain karo; (3) phir **ek macrotask** (setTimeout, event) lo aur chalao; (4) us macrotask ke baad phir **saari microtasks** drain karo; (5) browser mein zaroorat par render (rAF + paint); (6) repeat. Key insight: **microtasks macrotasks se pehle** chalte hain aur **har macrotask ke beech poori tarah drain** hote hain. Isi liye Promise.then setTimeout se pehle chalता hai.",
      code: "console.log('A')\nsetTimeout(() => console.log('B'), 0)        // macrotask\nPromise.resolve().then(() => console.log('C'))  // microtask\nconsole.log('D')\n// Output: A, D, C, B\n// sync (A,D) -> microtask (C) -> macrotask (B)",
      lang: 'js',
    },
    process: {
      type: 'boxes',
      items: [
        { label: 'Call Stack', sub: 'sync code (LIFO)', color: '#8B5CF6' },
        { label: 'Web APIs', sub: 'timer, fetch, events', color: '#06B6D4' },
        { label: 'Task Queue', sub: 'callbacks (FIFO)', color: '#F97316' },
        { label: 'Event Loop', sub: 'stack empty? -> push', color: '#22C55E' },
      ],
    },
    visual: {
      type: 'timeline',
      items: [
        { year: '1', text: 'Sync code call stack par chalta hai.' },
        { year: '2', text: 'Async task Web API ko delegate hota hai.' },
        { year: '3', text: 'Callback ready hone par Task Queue mein.' },
        { year: '4', text: 'Stack empty hone par event loop check karta hai.' },
        { year: '5', text: 'Queue se callback stack par push.' },
        { year: '6', text: 'Loop repeat (tick).' },
      ],
    },
    memory:
      "Call stack stack memory use karता hai (sync execution frames). Pending callbacks aur unke closures heap mein rehte hain jab tak execute na hon. Agar call stack kabhi empty na ho (ek long synchronous task), event loop *block* ho jaata hai — UI freeze (jank). Isi liye heavy computation ko web workers ya chunks mein todna chahiye.",
    browser:
      "Browser mein event loop rendering ke saath coordinate karता hai: macrotask -> microtasks -> (requestAnimationFrame -> style/layout/paint) -> repeat. Long synchronous JS (>50ms) UI ko freeze karता hai. Node.js ka event loop alag phases mein bata hai (timers, pending, poll, check, close) aur libuv use karta hai.",
    notes: {
      concept: "JS single-threaded hai par event loop + Web APIs ki wajah se async/non-blocking behaviour milta hai.",
      tip: "setTimeout(fn,0) ka matlab 'turant' nahi — 'sync code aur microtasks ke baad jaldi se jaldi'.",
      warning: "Long synchronous loops event loop ko block kar dete hain -> page freeze. Heavy kaam chunk karo ya web worker mein bhejo.",
      error: "Sochna setTimeout exact time par chalega — wo minimum delay hai, queue + stack par depend karta hai.",
    },
    compare: {
      headers: ['Part', 'Kaam', 'Owner'],
      rows: [
        ['Call Stack', 'Sync code run', 'JS engine'],
        ['Web APIs', 'Async tasks (timer/fetch)', 'Browser'],
        ['Task Queue', 'Callbacks hold', 'Browser'],
        ['Event Loop', 'Coordinate stack & queue', 'Runtime'],
      ],
    },
    mistakes: [
      { bad: "setTimeout(fn, 0) ko 'turant' samajhna.", fix: "Wo macrotask queue mein jaata hai — sync code aur microtasks ke baad chalta hai." },
      { bad: "Heavy loop main thread par chalana.", fix: "Web worker ya chunking use karo taaki event loop block na ho." },
      { bad: "Sochna JS multi-threaded hai kyunki async chalta hai.", fix: "JS single-threaded hai; async browser ke Web APIs + event loop se hota hai." },
    ],
    best: [
      'Heavy computation ko web workers mein bhejo.',
      'Long tasks ko chhote chunks mein todo (avoid blocking).',
      'Output order samajhne ke liye sync -> micro -> macro yaad rakho.',
      'requestAnimationFrame use karo smooth animations ke liye.',
      'Avoid synchronous blocking APIs (jaise alert, sync XHR).',
    ],
    performance:
      "⚡ Event loop block hona = UI freeze. 'Main thread responsiveness' web vitals (INP) ka core hai. Long tasks (>50ms) ko break karo, expensive work web workers mein bhejo, aur DOM updates ko batch karo. requestIdleCallback se non-urgent kaam idle time mein chalao.",
    tricky: [
      {
        title: 'Classic order',
        code: "console.log('start')\nsetTimeout(() => console.log('timeout'), 0)\nPromise.resolve().then(() => console.log('promise'))\nconsole.log('end')",
        output: "start\nend\npromise\ntimeout",
        explain: "Sync (start, end) pehle -> saari microtasks (promise) -> phir macrotask (timeout).",
        lang: 'js',
      },
      {
        title: 'Blocking loop',
        code: "console.log('A')\nfor (let i = 0; i < 1e9; i++) {}   // blocks!\nsetTimeout(() => console.log('B'), 0)\nconsole.log('C')",
        output: "A\n(C tab tak ruka rehta hai jab tak loop khatam na ho)\nC\nB",
        explain: "Synchronous loop call stack ko block karta hai — event loop kuch nahi kar pata jab tak loop khatam na ho.",
        lang: 'js',
      },
    ],
    interview: {
      beginner: [
        { q: 'Event loop kya hai?', a: 'Ek mechanism jo call stack empty hone par task queue se callbacks ko stack par bhejta hai — isse single-threaded JS async kaam kar pata hai.' },
        { q: 'JS single-threaded hai to async kaise?', a: 'Browser/Node ke Web APIs async tasks background mein chalate hain aur callbacks queue mein daalte hain; event loop unhe stack par laata hai.' },
      ],
      intermediate: [
        { q: 'setTimeout(fn, 0) turant kyun nahi chalta?', a: 'Callback macrotask queue mein jaata hai aur tabhi chalta hai jab call stack empty ho aur saari microtasks drain ho jaayein.' },
        { q: 'Call stack, Web API, task queue ka role?', a: 'Stack sync code chalata hai; Web API async tasks handle karta hai; task queue ready callbacks rakhta hai; event loop coordinate karta hai.' },
      ],
      advanced: [
        { q: 'Event loop ek tick mein kya order follow karta hai?', a: 'Saara sync -> saari microtasks drain -> ek macrotask -> phir saari microtasks -> (render) -> repeat.' },
        { q: 'Browser event loop rendering se kaise relate karta hai?', a: 'Macrotask + microtasks ke baad browser style/layout/paint kar sakta hai (rAF callbacks paint se pehle). Long JS rendering ko delay karta hai.' },
      ],
    },
    mcqs: [
      { q: 'Event loop kab queue se task uthata hai?', options: ['Har second', 'Jab call stack empty ho', 'Random', 'Page load par'], answer: 1, explain: 'Stack empty hone par hi.' },
      { q: 'setTimeout kaun provide karta hai?', options: ['JS engine', 'Browser/Web API', 'GC', 'TurboFan'], answer: 1, explain: 'setTimeout ek Web API hai, JS engine ka part nahi.' },
      { q: 'console.log(1); setTimeout(()=>log(2),0); log(3) ka output?', options: ['1 2 3', '1 3 2', '3 2 1', '2 1 3'], answer: 1, explain: 'Sync 1,3 pehle; setTimeout callback baad mein -> 1 3 2.' },
    ],
    exercises: {
      easy: ['Ek setTimeout aur ek console.log se output order predict karo.', 'Event loop ki ek-line definition likho.'],
      medium: ['Sync + Promise + setTimeout mila kar output order batao.', 'Ek blocking loop likho aur explain karo UI kyun freeze hoti hai.'],
      advanced: ['Ek heavy computation ko web worker mein move karke main thread free karo.'],
    },
    summary: [
      'JS single-threaded, ek call stack.',
      'Web APIs async tasks background mein chalate hain.',
      'Ready callbacks task queue mein jaate hain.',
      'Event loop stack empty hone par queue se task push karta hai.',
      'Order: sync -> microtasks -> macrotask -> repeat.',
      'Long sync code event loop ko block karta hai (UI freeze).',
    ],
    cheatsheet: [
      { h: 'Parts', code: "Call Stack + Web APIs + Task Queue + Loop" },
      { h: 'Order', code: "sync -> micro -> macro -> repeat" },
      { h: 'setTimeout 0', code: "macrotask, not immediate" },
    ],
    projects: [
      'Debouncing/throttling using timers (event loop aware).',
      'Non-blocking file/data processing in chunks.',
      'Smooth animation with requestAnimationFrame.',
      'Offloading heavy work to web workers.',
    ],
    advanced:
      "🚀 Node.js event loop libuv par based hai aur 6 phases rakhta hai: timers -> pending callbacks -> idle/prepare -> poll -> check (setImmediate) -> close. `process.nextTick` aur Promise microtasks har phase ke beech drain hote hain (nextTick Promise se bhi pehle). Browser mein rendering steps (rAF, IntersectionObserver) event loop ke specific points par run hote hain — yahi smooth 60fps ka raaz hai.",
    quiz: [
      { q: 'Promise.then aur setTimeout mein kaun pehle?', options: ['setTimeout', 'Promise.then', 'Dono saath', 'Random'], answer: 1, explain: 'Microtask (Promise) macrotask (setTimeout) se pehle.' },
      { q: 'Event loop block hone par kya hota hai?', options: ['Fast page', 'UI freeze', 'GC', 'Nothing'], answer: 1, explain: 'Long sync code stack ko block karta hai -> UI freeze.' },
    ],
    related: ['microtask-macrotask', 'async-internals', 'execution-context', 'frame-scheduler'],
  },

  'microtask-macrotask': {
    overview:
      "Event loop ke do queues hote hain: **Microtask Queue** aur **Macrotask (Task) Queue**. Ye decide karta hai ki async callbacks *kis order* mein chalenge. Golden rule: **har macrotask ke baad event loop saari microtasks ko poori tarah drain karता hai**. Isi liye Promise hamesha setTimeout se pehle chalता hai. ⚡",
    why:
      "'Is code ka output order kya hoga?' — ye interview ka *sabse common* trick question hai. Microtask/macrotask ordering samajhe bina aap ye galat answer doge. Ye senior-level differentiator hai.",
    concept: [
      { h: 'Macrotask Queue', p: '**Macrotasks** (Task Queue): **setTimeout, setInterval, setImmediate (Node), DOM events, I/O, MessageChannel**. Ek event loop tick mein *sirf ek* macrotask process hota hai.', code: "setTimeout(() => console.log('macro'), 0)\nsetInterval(...)  // bhi macrotask" },
      { h: 'Microtask Queue', p: '**Microtasks**: **Promise.then/catch/finally, queueMicrotask, MutationObserver, await (resume)**. Higher priority — har macrotask ke baad *saari* microtasks chalti hain.', code: "Promise.resolve().then(() => console.log('micro'))\nqueueMicrotask(() => console.log('also micro'))" },
      { h: 'Drain Rule (sabse important)', p: 'Event loop ek macrotask chalata hai, fir **microtask queue poori khali** karता hai (jo microtasks beech mein add huin wo bhi), fir agla macrotask. Isi liye microtasks "jaldi" lagti hain.' },
      { h: 'Ordering', p: 'Sequence: **sync code -> saari microtasks -> ek macrotask -> saari microtasks -> agla macrotask...**. Microtasks macrotasks ko "jump" kar jaati hain.', code: "console.log('1')\nsetTimeout(() => console.log('2'))   // macro\nPromise.resolve().then(() => console.log('3'))  // micro\nconsole.log('4')\n// 1, 4, 3, 2" },
      { h: 'requestAnimationFrame (nuance)', p: '**rAF** na microtask hai na exactly macrotask — ye browser ke *render step* se pehle chalता hai (har frame). Iska timing repaint ke saath synced hota hai, setTimeout se alag.' },
    ],
    analogy:
      "Socho ek **office** mein boss (event loop) kaam baant ता hai. **Microtasks** = *urgent VIP requests* — boss ek bada kaam (macrotask) khatam karte hi *saare* pending VIP requests turant nipta देता hai, chahe beech mein naye VIP requests aa jaayein. **Macrotasks** = *normal queue* mein khade log — ek baar mein sirf ek ko bula ता hai, fir wapas VIP queue check karता hai. Isi liye VIP (Promise) hamesha normal (setTimeout) se aage. 🏢",
    syntax: {
      code: "console.log('A')\nsetTimeout(() => console.log('B'))          // macrotask\nPromise.resolve().then(() => console.log('C'))  // microtask\nqueueMicrotask(() => console.log('D'))      // microtask\nconsole.log('E')\n// Output: A, E, C, D, B",
      note: "Microtasks (C, D) sync (A, E) ke baad par macrotask (B) se pehle — drain rule.",
      lang: 'js',
    },
    steps: [
      'Saara synchronous code call stack par chalta hai.',
      'Async callbacks apne-apne queue mein jaate hain (micro ya macro).',
      'Sync khatam -> call stack empty.',
      'Event loop saari microtasks ek-ek karke chalata hai (queue khali hone tak).',
      'Microtask ke andar bani nayi microtasks bhi isi round mein chalti hain.',
      'Microtask queue khali -> event loop ek macrotask uthata hai.',
      'Us macrotask ke baad phir saari microtasks drain hoti hain.',
      'Ye cycle repeat (browser beech mein render kar sakta hai).',
    ],
    internals: {
      p: "🧠 **Deep dive:** Spec mein microtask queue ko 'job queue' kehte hain. `await` ek hidden microtask hai — `await x` ke baad ka code ek `.then` callback ki tarah microtask queue mein jaata hai. **Khatra:** agar ek microtask aur microtask schedule karti rahe (infinite microtask loop), to macrotasks *kabhi* nahi chalenge aur page freeze ho jaayega — kyunki event loop microtask queue khali kiye bina aage nahi badhता. Node mein `process.nextTick` Promise microtasks se *bhi pehle* chalता hai (alag nextTick queue).",
      code: "// Infinite microtask -> macrotask starvation:\nfunction loop() { Promise.resolve().then(loop) }\nloop()\nsetTimeout(() => console.log('never soon'), 0)  // bahut der/kabhi nahi",
      lang: 'js',
    },
    process: {
      type: 'boxes',
      items: [
        { label: 'Sync Code', sub: 'call stack', color: '#8B5CF6' },
        { label: 'Microtask Q', sub: 'Promises, queueMicrotask', color: '#22C55E' },
        { label: 'Macrotask Q', sub: 'setTimeout, events', color: '#F97316' },
        { label: 'Render', sub: 'rAF -> paint', color: '#06B6D4' },
      ],
    },
    visual: {
      type: 'timeline',
      items: [
        { year: '1', text: 'Saara sync code chalta hai.' },
        { year: '2', text: 'Saari microtasks drain hoti hain.' },
        { year: '3', text: 'Ek macrotask chalta hai.' },
        { year: '4', text: 'Phir se saari microtasks drain.' },
        { year: '5', text: 'Browser render kar sakta hai (rAF).' },
        { year: '6', text: 'Agla macrotask -> cycle repeat.' },
      ],
    },
    memory:
      "Dono queues pending callbacks (aur unke closures) heap mein rakhte hain jab tak execute na hon. Microtask queue ka unbounded growth (infinite scheduling) memory aur responsiveness dono ko maar sakta hai kyunki wo macrotasks aur rendering ko starve kar deता hai.",
    browser:
      "Browser har macrotask + microtask drain ke baad render karne ka mauka deता hai (style/layout/paint). MutationObserver microtask hai — DOM changes batch mein observe hote hain. rAF callbacks render se theek pehle chalte hain — animations ke liye setTimeout se behtar.",
    notes: {
      concept: "Golden rule: har macrotask ke beech microtask queue *poori* drain hoti hai.",
      tip: "Output order yaad karne ka mantra: SYNC -> MICRO (all) -> MACRO (one) -> MICRO (all) -> ...",
      warning: "Infinite microtask scheduling macrotasks ko starve kar deta hai -> page freeze.",
      error: "await ke baad ka code microtask hai — usse 'turant sync' mat samjho.",
    },
    compare: {
      headers: ['Aspect', 'Microtask', 'Macrotask'],
      rows: [
        ['Examples', 'Promise.then, queueMicrotask, await', 'setTimeout, setInterval, events'],
        ['Priority', 'High', 'Low'],
        ['Per tick', 'Saari drain', 'Ek'],
        ['When', 'Macrotask ke baad turant', 'Microtasks ke baad'],
      ],
    },
    mistakes: [
      { bad: "Sochna setTimeout Promise se pehle chalega.", fix: "Microtasks (Promise) hamesha macrotasks (setTimeout) se pehle." },
      { bad: "await ko fully synchronous samajhna.", fix: "await ke baad ka code microtask mein schedule hota hai." },
      { bad: "Microtask mein endless scheduling.", fix: "Macrotask starvation se page freeze — bound rakho." },
    ],
    best: [
      'Output order ke liye drain rule yaad rakho.',
      'Animations ke liye rAF use karo, setTimeout nahi.',
      'Microtask chains ko bounded rakho.',
      'Heavy work microtask mein mat daalo (rendering rok deta hai).',
      'queueMicrotask use karo jab Promise overkill ho.',
    ],
    performance:
      "⚡ Microtasks rendering se *pehle* drain hoti hain — agar bahut saari ya heavy microtasks hon to frame miss ho sakta hai (jank). Macrotask-heavy timers bhi rendering ko delay karte hain. Smooth UI ke liye work ko sahi queue (rAF for visual, idle for non-urgent) mein daalo.",
    tricky: [
      {
        title: 'Full ordering',
        code: "console.log('1')\nsetTimeout(() => console.log('2'), 0)\nPromise.resolve()\n  .then(() => console.log('3'))\n  .then(() => console.log('4'))\nconsole.log('5')",
        output: "1\n5\n3\n4\n2",
        explain: "Sync: 1,5. Microtasks: 3 fir uska .then 4 (chained microtasks same round). Macrotask: 2 last.",
        lang: 'js',
      },
      {
        title: 'await order',
        code: "async function f() {\n  console.log('a')\n  await null\n  console.log('b')\n}\nconsole.log('start')\nf()\nconsole.log('end')",
        output: "start\na\nend\nb",
        explain: "f() sync chalta hai 'a' tak; await null ke baad ka 'b' microtask mein jaata hai, isliye 'end' ke baad.",
        lang: 'js',
      },
      {
        title: 'Nested micro inside macro',
        code: "setTimeout(() => {\n  console.log('timeout')\n  Promise.resolve().then(() => console.log('inner micro'))\n}, 0)\nPromise.resolve().then(() => console.log('outer micro'))",
        output: "outer micro\ntimeout\ninner micro",
        explain: "outer micro pehle (sync ke baad). Fir macrotask 'timeout' chalta hai, uske andar bani microtask 'inner micro' turant us macrotask ke baad drain hoti hai.",
        lang: 'js',
      },
    ],
    interview: {
      beginner: [
        { q: 'Microtask aur macrotask mein fark?', a: 'Microtasks (Promise.then, queueMicrotask) high priority — har macrotask ke baad saari drain hoti hain. Macrotasks (setTimeout, events) low priority — ek baar mein ek.' },
        { q: 'Kaun pehle chalega: Promise.then ya setTimeout?', a: 'Promise.then (microtask) hamesha setTimeout (macrotask) se pehle.' },
      ],
      intermediate: [
        { q: 'Drain rule kya hai?', a: 'Event loop ek macrotask chalata hai phir microtask queue ko poori tarah khali karta hai (beech mein bani microtasks samet), fir agla macrotask.' },
        { q: 'await kis queue mein jaata hai?', a: 'await ke baad ka code microtask queue mein schedule hota hai (jaise .then).' },
      ],
      advanced: [
        { q: 'Macrotask starvation kya hai?', a: 'Agar microtasks lagataar nayi microtasks schedule karein, to event loop kabhi macrotask par nahi pahunchta — page freeze ho jaata hai.' },
        { q: 'requestAnimationFrame micro hai ya macro?', a: 'Na exactly micro na macro — ye browser ke render step se pehle har frame chalta hai, repaint ke saath synced.' },
      ],
    },
    mcqs: [
      { q: 'Kaun microtask hai?', options: ['setTimeout', 'Promise.then', 'setInterval', 'DOM click'], answer: 1, explain: 'Promise.then microtask hai.' },
      { q: 'Per tick kitne macrotasks?', options: ['Saari', 'Ek', 'Do', 'Zero'], answer: 1, explain: 'Ek tick mein ek hi macrotask.' },
      { q: 'console.log(1);Promise.resolve().then(()=>log(2));log(3) output?', options: ['1 2 3', '1 3 2', '3 2 1', '2 1 3'], answer: 1, explain: 'Sync 1,3 -> microtask 2 -> 1 3 2.' },
      { q: 'Macrotask starvation ka karan?', options: ['Bade objects', 'Infinite microtask scheduling', 'GC', 'rAF'], answer: 1, explain: 'Microtasks lagataar schedule hone se macrotasks starve.' },
    ],
    exercises: {
      easy: ['3 microtask aur 3 macrotask examples likho.', 'Ek simple sync+Promise+setTimeout ka output likho.'],
      medium: ['Chained .then ka output order predict karo.', 'async/await wale code ka order batao.'],
      advanced: ['Ek macrotask ke andar microtask daal kar nested order explain karo.'],
    },
    summary: [
      'Do queues: microtask (high) + macrotask (low).',
      'Micro: Promise.then, queueMicrotask, await, MutationObserver.',
      'Macro: setTimeout, setInterval, events, I/O.',
      'Drain rule: har macrotask ke baad saari microtasks.',
      'Order: sync -> all micro -> one macro -> all micro -> ...',
      'Infinite microtasks -> macrotask starvation (freeze).',
    ],
    cheatsheet: [
      { h: 'Micro', code: "Promise.then, queueMicrotask, await" },
      { h: 'Macro', code: "setTimeout, setInterval, events" },
      { h: 'Rule', code: "macro -> drain ALL micro -> next macro" },
    ],
    projects: [
      'Predicting/debugging async output order in code review.',
      'Batching DOM updates with microtasks (MutationObserver).',
      'Building a scheduler that respects task priority.',
      'Avoiding jank by choosing micro vs macro vs rAF.',
    ],
    advanced:
      "🚀 Node.js mein ordering aur granular hai: `process.nextTick` queue (highest) -> Promise microtasks -> phir libuv ke macrotask phases (timers, check/setImmediate, etc.). Isi liye Node mein `setImmediate` vs `setTimeout(fn,0)` ka order context par depend karता hai. Browser mein MutationObserver microtask hai jo DOM mutations ko ek batch microtask mein deliver karta hai — efficient observation.",
    quiz: [
      { q: 'Har macrotask ke baad kya hota hai?', options: ['Ek microtask', 'Saari microtasks drain', 'GC', 'Reload'], answer: 1, explain: 'Saari pending microtasks drain hoti hain.' },
      { q: 'await ke baad ka code kya hai?', options: ['Sync', 'Macrotask', 'Microtask', 'rAF'], answer: 2, explain: 'await ke baad ka code microtask mein schedule hota hai.' },
    ],
    related: ['event-loop', 'async-internals', 'execution-context', 'frame-scheduler'],
  },

  'async-internals': {
    overview:
      "JS mein async kaam **Promises** par bana hai, aur **async/await** unke upar ek *sundar syntax sugar* hai. Promise ek object hai jo ek *future value* represent karता hai (jo abhi nahi par baad mein milegi). **Fetch API** bhi Promise return karта hai. In sabki internal working samajhna aapko async master banata hai. 🔮",
    why:
      "Promises, async/await, aur fetch har modern JS app mein hain. 'Promise internally kaise kaam karता hai?', 'async/await sugar kaise hai?', 'Promise.then kab schedule hota hai?' — ye advanced interview questions hain jo deep understanding test karte hain.",
    concept: [
      { h: 'Promise States', p: 'Promise ke 3 states: **pending** (abhi result nahi), **fulfilled** (success, value ke saath), **rejected** (fail, reason ke saath). Ek baar settle (fulfilled/rejected) hone par state *change nahi* hoti.', code: "const p = new Promise((resolve, reject) => {\n  setTimeout(() => resolve('done'), 1000)\n})\n// pending -> (1s baad) fulfilled with 'done'" },
      { h: '.then schedules a microtask', p: 'Jab Promise settle hota hai, uska `.then`/`.catch` callback **microtask queue** mein schedule hota hai — sync code ke turant baad chalता hai, par stack empty hone par.', code: "Promise.resolve('x').then(v => console.log(v))\nconsole.log('sync first')\n// Output: 'sync first' then 'x'" },
      { h: 'async/await = sugar over Promises', p: '**async function** hamesha ek Promise return karता hai. **await** Promise ke settle hone ka "wait" karता hai *bina thread block kiye* — andar se ye `.then` chaining hai aur await ke baad ka code microtask banता hai.', code: "async function get() {\n  const v = await Promise.resolve(42)\n  return v\n}\n// equivalent: Promise.resolve(42).then(v => v)" },
      { h: 'await aur generators', p: 'Async/await internally **generators + Promises** ki tarah kaam karता hai — function ko `await` par *pause* karता hai, Promise settle hone par *resume*. Generator ka `yield` aur await dono execution ko suspend/resume karte hain.' },
      { h: 'Fetch API internals', p: '**fetch()** ek Promise return karता hai jo **Response** object se resolve hota hai. Response body ek **stream** hai — `.json()`, `.text()` bhi Promises return karte hain (kyunki body async read hoti hai). fetch sirf network error par reject hota hai, HTTP 404/500 par *nahi* (response.ok check karo).', code: "fetch('/api/user')\n  .then(res => {\n    if (!res.ok) throw new Error('HTTP ' + res.status)\n    return res.json()\n  })\n  .then(data => console.log(data))" },
      { h: 'Error handling', p: 'Promise mein `.catch`, async/await mein `try/catch`. Unhandled rejection warning aati hai agar reject ko catch na karo. `Promise.all` ek bhi reject par poora reject; `Promise.allSettled` sabka result deता hai.', code: "try {\n  const data = await fetchUser()\n} catch (err) {\n  console.error('fail:', err)\n}" },
    ],
    analogy:
      "Socho aapne ek **pizza order** kiya (Promise). Abhi pizza nahi hai (**pending**), par aapke paas ek *order receipt* (Promise object) hai. Pizza aa gaya = **fulfilled**, kitchen ne mana kar diya = **rejected**. Aap pizza ka wait karte hue *baaki kaam* karte rehte ho (non-blocking). **await** matlab 'main yahin ruk kar pizza ka intezaar karta hoon, par tab tak office (thread) doosre logon ke liye khula hai'. **.then** = 'pizza aane par ye karna' (instruction note). 🍕",
    syntax: {
      code: "// Promise + async/await dono:\nasync function loadUser(id) {\n  try {\n    const res = await fetch('/api/users/' + id)\n    if (!res.ok) throw new Error('Failed: ' + res.status)\n    const user = await res.json()\n    return user\n  } catch (err) {\n    console.error(err)\n    throw err\n  }\n}",
      note: "async function ka return hamesha Promise mein wrap hota hai; await sirf async function (ya top-level module) mein chalta hai.",
      lang: 'js',
    },
    steps: [
      'Promise banta hai -> state pending.',
      'Executor function (resolve/reject) chalta hai (sync).',
      'Async kaam (timer/network) background mein hota hai.',
      'resolve() ya reject() call hone par Promise settle hota hai.',
      '.then/.catch callbacks microtask queue mein schedule hote hain.',
      'Stack empty hone par microtasks chalti hain (callbacks).',
      'async/await internally yahi .then chaining karta hai (await = pause/resume).',
      'fetch Response stream ko .json()/.text() async read karte hain.',
    ],
    internals: {
      p: "🧠 **Deep dive:** Ek Promise internally callbacks ki list rakhता hai (onFulfilled/onRejected). Jab tak pending hai, `.then` callbacks store hote hain; settle hone par engine unhe **microtask** ke roop mein schedule karता hai (turant call nahi, isiliye `.then` hamesha async lagti hai chahe Promise already resolved ho). **async/await** ek state machine ki tarah compile hota hai: function ko await points par split kiya jaata hai; har await ke baad ka 'continuation' ek microtask ban jaata hai jo Promise resolve hone par resume hota hai. `await` ko `Promise.resolve(x).then(resume)` jaisa samjho. Isi liye `await 5` (non-Promise) bhi ek microtask tick deता hai.",
      code: "// async/await ko Promise mein 'desugar' karke socho:\nasync function f() {\n  const a = await g()\n  console.log(a)\n}\n// roughly:\nfunction f() {\n  return g().then(a => { console.log(a) })\n}",
      lang: 'js',
    },
    process: {
      type: 'boxes',
      items: [
        { label: 'Pending', sub: 'abhi result nahi', color: '#F97316' },
        { label: 'Fulfilled', sub: 'resolve(value)', color: '#22C55E' },
        { label: 'Rejected', sub: 'reject(reason)', color: '#EF4444' },
        { label: '.then microtask', sub: 'settle par schedule', color: '#8B5CF6' },
      ],
    },
    visual: {
      type: 'tree',
      root: 'Promise',
      children: [
        {
          label: 'pending',
          sub: 'initial state',
          color: '#F97316',
          children: [
            { label: 'fulfilled', sub: 'resolve(value)', color: '#22C55E' },
            { label: 'rejected', sub: 'reject(reason)', color: '#EF4444' },
          ],
        },
        {
          label: 'consumers',
          sub: 'callbacks',
          color: '#8B5CF6',
          children: [
            { label: 'then/catch', sub: 'microtask', color: '#06B6D4' },
            { label: 'await', sub: 'pause/resume', color: '#3B82F6' },
          ],
        },
      ],
    },
    memory:
      "Promise object aur uske callbacks heap mein rehte hain jab tak settle + execute na hon. Lambe pending Promises (jo kabhi resolve na hon) ke callbacks alive reh kar memory hold kar sakte hain. Chained Promises ek linked structure banate hain. async function ka 'paused' state (await par) bhi heap mein continuation rakhता hai jab tak resume na ho.",
    browser:
      "fetch browser ka Web API hai (XMLHttpRequest ka modern replacement). Response body ReadableStream hai — bade responses ko chunk-by-chunk read kar sakte ho. AbortController se fetch cancel hota hai. Node.js mein bhi ab native fetch hai (undici). Unhandled promise rejections browser console mein warning deते hain.",
    notes: {
      concept: "async function ka return value automatically Promise mein wrap hota hai; thrown error rejected Promise banta hai.",
      tip: "fetch HTTP error (404/500) par reject NAHI hota — hamesha response.ok check karo.",
      warning: "Promise ek baar settle hone par state nahi badalti; doosra resolve/reject ignore hota hai.",
      error: "await ko non-async function mein use karna SyntaxError (top-level module await chhod kar).",
    },
    compare: {
      headers: ['Aspect', 'Promise (.then)', 'async/await'],
      rows: [
        ['Style', 'Chaining', 'Synchronous-looking'],
        ['Errors', '.catch', 'try/catch'],
        ['Readability', 'Nested-prone', 'Clean'],
        ['Under hood', 'Same Promise', 'Sugar over Promise'],
      ],
    },
    mistakes: [
      { bad: "fetch ke baad response.ok check na karna.", fix: "fetch 404/500 par reject nahi hota — manually ok check karo." },
      { bad: "await ko forget karna (const x = asyncFn()).", fix: "await lagao warna x ek Promise hoga, value nahi." },
      { bad: "Sequential awaits jab parallel ho sakte hon.", fix: "Independent calls ke liye Promise.all use karo." },
    ],
    best: [
      'fetch ke baad response.ok zaroor check karo.',
      'try/catch se async errors handle karo.',
      'Independent async kaam Promise.all se parallel chalao.',
      'Promise.allSettled use karo jab sabka result chahiye.',
      'AbortController se fetch cancel karna seekho.',
      'Unhandled rejections handle karo.',
    ],
    performance:
      "⚡ Sequential `await`s waterfall banaते hain (ek ke baad ek) — slow. Independent calls ko **Promise.all** se parallel karo. Bade responses ke liye streaming (Response body) use karo taaki memory aur time bachay. Unnecessary microtask chains avoid karo (har await ek tick hai).",
    tricky: [
      {
        title: 'then is always async',
        code: "console.log('1')\nPromise.resolve().then(() => console.log('2'))\nconsole.log('3')",
        output: "1\n3\n2",
        explain: "Even already-resolved Promise ka .then microtask mein jaata hai — isliye '2' sync code ke baad.",
        lang: 'js',
      },
      {
        title: 'await vs then order',
        code: "async function f() {\n  console.log('a')\n  await Promise.resolve()\n  console.log('b')\n}\nf()\nconsole.log('c')",
        output: "a\nc\nb",
        explain: "'a' sync chalta hai, await par function pause; 'c' sync; await ke baad 'b' microtask mein resume.",
        lang: 'js',
      },
      {
        title: 'Sequential vs parallel',
        code: "// SLOW (sequential): ~2s\nconst a = await delay1s()\nconst b = await delay1s()\n// FAST (parallel): ~1s\nconst [x, y] = await Promise.all([delay1s(), delay1s()])",
        explain: "Independent awaits ko Promise.all se parallel karo — total time max(individual) hota hai, sum nahi.",
        lang: 'js',
      },
    ],
    interview: {
      beginner: [
        { q: 'Promise kya hai?', a: 'Ek object jo future value represent karta hai — 3 states: pending, fulfilled, rejected.' },
        { q: 'async/await kya hai?', a: 'Promises ke upar syntax sugar jo async code ko synchronous jaisa readable banata hai. async function Promise return karta hai.' },
      ],
      intermediate: [
        { q: '.then kab chalta hai?', a: 'Promise settle hone par callback microtask queue mein schedule hota hai — sync code ke baad par stack empty hone par.' },
        { q: 'fetch HTTP error par reject hota hai?', a: 'Nahi — fetch sirf network failure par reject hota hai. 404/500 par bhi resolve hota hai; response.ok check karna padta hai.' },
      ],
      advanced: [
        { q: 'async/await internally kaise kaam karta hai?', a: 'Function ko await points par state machine ki tarah split kiya jaata hai; har await ke baad ka continuation Promise resolve hone par microtask ke roop mein resume hota hai (generators + Promises).' },
        { q: 'Promise.all vs allSettled?', a: 'all ek bhi reject par turant reject; allSettled sabhi ke results (fulfilled/rejected) ek array mein deta hai, kabhi reject nahi.' },
      ],
    },
    mcqs: [
      { q: 'Promise ke states kitne?', options: ['2', '3', '4', '1'], answer: 1, explain: 'pending, fulfilled, rejected.' },
      { q: 'async function kya return karta hai?', options: ['Value', 'Promise', 'undefined', 'Callback'], answer: 1, explain: 'Hamesha ek Promise.' },
      { q: 'fetch 404 par?', options: ['Reject', 'Resolve (ok=false)', 'Throw', 'Hang'], answer: 1, explain: 'Resolve hota hai; response.ok false hoga.' },
      { q: '.then callback kis queue mein?', options: ['Macrotask', 'Microtask', 'rAF', 'Sync'], answer: 1, explain: 'Microtask queue mein schedule hota hai.' },
    ],
    exercises: {
      easy: ['Ek Promise banao jo 1s baad resolve ho.', 'async/await se ek value print karo.'],
      medium: ['fetch se data lao aur response.ok handle karo.', 'try/catch se async error pakdo.'],
      advanced: ['Do independent API calls ko Promise.all se parallel karo aur time compare karo.'],
    },
    summary: [
      'Promise states: pending, fulfilled, rejected.',
      '.then callbacks microtask queue mein schedule hote hain.',
      'async/await = syntax sugar over Promises.',
      'await function ko pause karta hai bina thread block kiye.',
      'fetch Promise return karta hai; 404/500 par reject nahi.',
      'Promise.all parallel; allSettled sabka result.',
    ],
    cheatsheet: [
      { h: 'States', code: "pending -> fulfilled | rejected" },
      { h: 'async', code: "async fn -> Promise; await -> pause" },
      { h: 'fetch', code: "if (!res.ok) throw; await res.json()" },
    ],
    projects: [
      'API data layer with fetch + async/await + error handling.',
      'Parallel data loading dashboard (Promise.all).',
      'Cancellable search with AbortController.',
      'Retry-with-backoff wrapper around Promises.',
      'Streaming large response with Response body reader.',
    ],
    advanced:
      "🚀 Advanced patterns: **Promise.race** (pehla settle jeet ता — timeout patterns), **Promise.any** (pehla fulfilled), **AbortController + signal** (cancel fetch), aur **async iterators** (`for await...of`) streaming data ke liye. Top-level await ES modules mein allowed hai. async generators (`async function*`) async streams produce karte hain. Internally V8 await ko optimize karta hai (throwaway Promise allocations kam karke).",
    quiz: [
      { q: 'await thread ko block karta hai?', options: ['Haan', 'Nahi (non-blocking)', 'Kabhi-kabhi', 'GC par'], answer: 1, explain: 'await sirf us async function ko pause karta hai, thread free rehta hai.' },
      { q: 'Promise.all kab reject hota hai?', options: ['Sab reject par', 'Ek bhi reject par', 'Kabhi nahi', 'Resolve par'], answer: 1, explain: 'Koi ek reject hote hi poora reject.' },
    ],
    related: ['microtask-macrotask', 'event-loop', 'execution-context', 'browser-apis'],
  },
}
