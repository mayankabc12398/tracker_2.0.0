// JS content — Part 2: Operators, Control Flow, Functions

export const jsContentB = {
  operators: {
    overview:
      'Operators wo symbols hain jo values par **operation** karte hain — jod, ghata, compare, logic. Main categories: **Arithmetic** (+ - * / %), **Assignment** (= += -=), **Comparison** (=== > <), **Logical** (&& || !). Inke bina koi calculation ya decision possible nahi.',
    why:
      'Har program calculations aur conditions par chalता hai. Comparison aur logical operators conditions/loops ki neev hain. `==` vs `===` interview ka classic sawaal hai.',
    concept: [
      { h: 'Arithmetic', p: 'Math operations: `+` jod, `-` ghata, `*` guna, `/` bhaag, `%` remainder (modulus), `**` power.', code: `10 + 3   // 13\n10 % 3   // 1 (remainder)\n2 ** 3   // 8 (power)\n10 / 3   // 3.333...` },
      { h: 'Assignment', p: 'Value assign + shortcut: `=`, `+=`, `-=`, `*=`, `/=`, `%=`.', code: `let x = 5\nx += 3  // x = x + 3 → 8\nx *= 2  // 16\nx -= 1  // 15` },
      { h: 'Comparison', p: '`===` strict equal (best), `==` loose (coercion), `!==`, `>`, `<`, `>=`, `<=`. Result boolean.', code: `5 === 5    // true\n5 === '5'  // false (type alag)\n5 == '5'   // true (coercion)\n5 !== 3    // true` },
      { h: 'Logical', p: '`&&` AND (dono true), `||` OR (koi ek true), `!` NOT (ulta). Short-circuit karte hain.', code: `true && false  // false\ntrue || false  // true\n!true          // false\n(age > 18) && (age < 60)` },
    ],
    analogy:
      'Operators kitchen ke **tools** hain. `+` mixer (cheezein milाता), comparison ek **taraazu** (kaun bada/barabar), logical operators **traffic signals** (&& = dono green ho tabhi jao, || = koi ek green ho to jao). 🚦',
    syntax: { code: `a + b      // arithmetic\na === b    // comparison (strict)\na && b     // logical AND\na || b     // logical OR\nx += 1     // assignment shortcut`, note: 'Comparison ka result hamesha true/false (boolean) hota hai.' },
    examples: [
      { level: 'Beginner', title: 'Calculator', code: `const a = 15, b = 4\nconsole.log(a + b, a - b, a * b, a % b)`, result: '19 11 60 3' },
      { level: 'Intermediate', title: 'Short-circuit trick', code: `const name = '' \nconst display = name || 'Guest'\nconsole.log(display)\n\nconst user = { isAdmin: true }\nuser.isAdmin && console.log('Welcome admin')`, result: ['Guest', 'Welcome admin'], explain: '|| pehli truthy value deta, && pehli falsy ya last value. Default + conditional run.' },
      { level: 'Advanced', title: 'Even/Odd + chaining', code: `const n = 7\nconsole.log(n % 2 === 0 ? 'Even' : 'Odd')\nconsole.log(5 > 3 && 3 > 1)  // true\nconsole.log(0 || '' || 'fallback')`, result: ['Odd', 'true', 'fallback'] },
    ],
    notes: {
      concept: '% remainder deta hai (even/odd check ke liye useful). ** power.',
      tip: '`||` default value ke liye, `&&` conditional execution ke liye use hota hai.',
      warning: '`==` coercion karता hai — `0 == ""` true! Hamesha `===`.',
      error: '`=` (assignment) ko `==`/`===` (comparison) ke saath confuse karna — common bug.',
    },
    compare: {
      headers: ['Operator', 'Naam', 'Example', 'Result'],
      rows: [
        ['===', 'Strict equal', "5 === '5'", 'false'],
        ['==', 'Loose equal', "5 == '5'", 'true (coercion)'],
        ['&&', 'AND', 'true && false', 'false'],
        ['||', 'OR', 'false || true', 'true'],
        ['%', 'Modulus', '10 % 3', '1'],
      ],
    },
    mistakes: [
      { bad: '`if (x = 5)` (assignment).', fix: '`if (x === 5)` (comparison).' },
      { bad: '`==` use karna.', fix: '`===` use karo — no coercion.' },
    ],
    best: ['Hamesha `===` aur `!==`.', '`||` default values ke liye (ya `??`).', '% se even/odd check.', 'Complex conditions ko brackets se clear karo.'],
    interview: {
      beginner: [
        { q: '== aur === mein fark?', a: '== coercion karke compare (type convert), === strict — type aur value dono same hone chahiye.' },
        { q: '% operator kya karता?', a: 'Remainder deta hai. 10 % 3 = 1. Even/odd check ke liye useful.' },
      ],
      intermediate: [
        { q: '&& aur || ka short-circuit?', a: '&& pehli falsy value (ya last) return karता, || pehli truthy value. Default values aur conditional execution mein use hote hain.' },
      ],
      advanced: [
        { q: '5 + "5" - 5 ka output?', a: '"55" - 5 = 50. Pehle + concat ("55"), phir - coercion (50).' },
      ],
    },
    mcqs: [
      { q: '10 % 4 = ?', options: ['2', '2.5', '40', '6'], answer: 0, explain: 'Remainder of 10/4 = 2.' },
      { q: 'Strict equality?', options: ['=', '==', '===', '!='], answer: 2, explain: '=== no coercion.' },
    ],
    exercises: {
      easy: ['Do numbers ka sum, difference, product print karo.'],
      medium: ['Ek number even hai ya odd, ternary se batao.'],
      advanced: ['Bina if ke (sirf && ||) ek default + conditional message banao.'],
    },
    summary: [
      'Arithmetic: + - * / % **.',
      'Comparison result boolean; === strict.',
      'Logical && || ! short-circuit karte hain.',
      'Hamesha === use karo, == nahi.',
    ],
    cheatsheet: [
      { h: 'Arithmetic', code: `+ - * / % **` },
      { h: 'Compare', code: `=== !== > < >= <=` },
      { h: 'Logical', code: `&& (and) || (or) ! (not)` },
    ],
    advanced:
      'Logical operators value return karte hain, boolean nahi: `"a" && "b"` → "b", `0 || "x"` → "x". Yeh "short-circuit evaluation" React jaise frameworks mein bahut use hota: `isLoggedIn && <Dashboard />`. Bitwise operators (`& | ^ << >>`) bhi hain — low-level bit manipulation ke liye.',
    quiz: [
      { q: '"a" && "b" deta?', options: ['true', '"a"', '"b"', 'false'], answer: 2, explain: '&& last truthy → "b".' },
      { q: '0 || "x" deta?', options: ['0', '"x"', 'true', 'false'], answer: 1, explain: '|| pehli truthy → "x".' },
    ],
    related: ['modern-operators', 'type-conversion', 'conditionals'],
  },

  'modern-operators': {
    overview:
      'ES2020 ne 3 super-useful operators diye: **Nullish Coalescing (`??`)** — sirf null/undefined par default; **Optional Chaining (`?.`)** — safe nested access bina error; aur purana **Ternary (`? :`)** — short if-else. Ye code ko clean aur crash-proof banाते hain.',
    why:
      'Real apps mein API se data aata hai jisme properties missing ho sakti hain. `?.` aur `??` ke bina "Cannot read property of undefined" crash aam hai. Modern interview mein ye expected hain.',
    concept: [
      { h: 'Optional Chaining ?.', p: 'Nested property safely access karता hai. Agar koi cheez null/undefined ho, to error ke बजाय `undefined` return karता hai.', code: `const user = { address: { city: 'Delhi' } }\nuser.address?.city    // 'Delhi'\nuser.profile?.age     // undefined (no crash)\nuser.getName?.()      // safe method call` },
      { h: 'Nullish Coalescing ??', p: 'Left value `null` ya `undefined` ho tabhi right (default) deta. `||` se behtar — kyunki `0` aur `""` ko valid maanता hai.', code: `null ?? 'default'    // 'default'\n0 ?? 'default'       // 0 (|| hota to 'default')\n'' ?? 'x'            // '' \nundefined ?? 'x'     // 'x'` },
      { h: 'Ternary ? :', p: 'Short if-else: `condition ? agar_true : agar_false`. Value return karता hai.', code: `const age = 20\nconst type = age >= 18 ? 'Adult' : 'Minor'\n// nested (avoid zyada)\nconst grade = m > 90 ? 'A' : m > 75 ? 'B' : 'C'` },
    ],
    analogy:
      '`?.` ek **careful explorer** hai — har darwaza kholne se pehle check karता hai "darwaza hai bhi?" Agar nahi to ruk jaता hai (undefined), crash nahi. `??` ek **strict default** — sirf "bilkul khaali" (null/undefined) hone par backup deता, jabki `||` "0 ya empty" ko bhi khaali maan leta. 🚪',
    syntax: { code: `obj?.prop          // optional chaining\nobj?.[key]         // dynamic key\nobj?.method?.()    // method call\nvalue ?? default   // nullish default\ncond ? a : b       // ternary`, note: '?? aur || ko ek saath bina bracket ke use nahi kar sakte — SyntaxError.' },
    examples: [
      { level: 'Beginner', title: 'Safe access', code: `const data = { user: null }\nconsole.log(data.user?.name)\nconsole.log(data.user?.name ?? 'No name')`, result: ['undefined', 'No name'] },
      { level: 'Intermediate', title: '?? vs ||', code: `const count = 0\nconsole.log(count || 10)  // 10 (0 falsy)\nconsole.log(count ?? 10)  // 0  (0 valid)`, result: ['10', '0'], explain: '?? sirf null/undefined check karता — 0 aur "" valid rehte hain.' },
      { level: 'Advanced', title: 'Real API data', code: `const res = { data: { items: [{ id: 1 }] } }\nconst first = res?.data?.items?.[0]?.id ?? 'none'\nconsole.log(first)\nconst missing = res?.data?.users?.[0]?.name ?? 'none'\nconsole.log(missing)`, result: ['1', 'none'], explain: 'Deeply nested data safely access — crash nahi hota.' },
    ],
    notes: {
      concept: '?. safe access, ?? nullish default, ? : short if-else.',
      tip: 'Default value ke liye `??` prefer karo over `||` (0/"" preserve hote hain).',
      warning: '`a ?? b || c` SyntaxError — brackets lagao: `(a ?? b) || c`.',
      error: 'Ternary ko statement (jaise console.log inside) ke liye use karna — wo expression ke liye hai.',
    },
    compare: {
      headers: ['Case', '|| (OR)', '?? (Nullish)'],
      rows: [
        ['null', 'default', 'default'],
        ['undefined', 'default', 'default'],
        ['0', 'default ❌', '0 ✅'],
        ['"" (empty)', 'default ❌', '"" ✅'],
        ['false', 'default ❌', 'false ✅'],
      ],
    },
    mistakes: [
      { bad: '`count || 10` jab 0 valid ho.', fix: '`count ?? 10` use karo.' },
      { bad: '`a ?? b || c` likhna.', fix: 'Brackets: `(a ?? b) || c`.' },
    ],
    best: ['Nested API data ke liye `?.`.', 'Default values ke liye `??`.', 'Simple condition ke liye ternary; complex ke liye if-else.', 'Ternary nesting 2 se zyada avoid karो.'],
    interview: {
      beginner: [
        { q: 'Optional chaining kya hai?', a: '?. operator — nested property safely access karता hai. Agar koi null/undefined ho to undefined deta hai, crash nahi karता.' },
      ],
      intermediate: [
        { q: '?? aur || mein fark?', a: '|| har falsy (0, "", false, null, undefined) par default deta. ?? sirf null/undefined par. 0 ya "" valid value ho to ?? use karo.' },
      ],
      advanced: [
        { q: 'obj?.method?.() kya karता?', a: 'Pehle check karता obj exist karता, phir method exist karता — tabhi call karता. Warna undefined, no error.' },
      ],
    },
    mcqs: [
      { q: '0 ?? 5 = ?', options: ['0', '5', 'null', 'undefined'], answer: 0, explain: '?? sirf null/undefined par default — 0 valid.' },
      { q: 'null?.x = ?', options: ['Error', 'null', 'undefined', '0'], answer: 2, explain: 'Optional chaining undefined deta, no crash.' },
    ],
    exercises: {
      easy: ['Ek nested object banao aur ?. se ek deep property access karo.'],
      medium: ['?? use karke 0 ko valid rakhte hue default lagao.'],
      advanced: ['Ek function likho jo user object se safely user.settings.theme nikaale, default "light".'],
    },
    summary: [
      '?. = safe nested access (no crash).',
      '?? = default sirf null/undefined par.',
      '? : = short if-else (returns value).',
      '?? ko || se prefer karo defaults ke liye.',
    ],
    cheatsheet: [
      { h: 'Operators', code: `obj?.a?.b     // safe\nx ?? default  // nullish\nc ? a : b     // ternary` },
      { h: '?? vs ||', code: `0 || 5  → 5\n0 ?? 5  → 0` },
    ],
    advanced:
      'Optional chaining "short-circuits" — `a?.b.c` mein agar `a` null hai to `b.c` evaluate hi nahi hota (poora expression undefined). Logical assignment operators bhi aaye: `a ??= b` (null/undefined ho to assign), `a ||= b`, `a &&= b` — clean conditional assignment.',
    quiz: [
      { q: 'Nullish coalescing operator?', options: ['??', '?.', '||', '?:'], answer: 0, explain: '?? nullish coalescing.' },
      { q: 'a ??= b ka matlab?', options: ['Hamesha assign', 'null/undefined ho to assign', 'Kabhi nahi', 'Compare'], answer: 1, explain: 'Logical nullish assignment.' },
    ],
    related: ['operators', 'objects', 'conditionals'],
  },

  conditionals: {
    overview:
      'Conditionals program ko **decisions** lene dete hain — "agar yeh ho to woh karo". Main tools: **if / else if / else**, **switch** (multiple fixed cases), aur **ternary** (short if-else). Inke bina program seedha-saadा ek hi raasta chalेga.',
    why:
      'Har real logic conditions par chalता hai — login check, form validation, pricing. switch vs if-else kab use karna, yeh practical interview question hai.',
    concept: [
      { h: 'if / else if / else', p: 'Condition true ho to block chalता. Multiple conditions ke liye else if. Koi match na ho to else.', code: `const marks = 75\nif (marks >= 90) {\n  console.log('A')\n} else if (marks >= 60) {\n  console.log('B')\n} else {\n  console.log('Fail')\n}` },
      { h: 'switch', p: 'Ek value ko kai fixed cases se compare karता. `break` zaroori (warna fall-through). `default` = else.', code: `switch (day) {\n  case 'Mon':\n    console.log('Start')\n    break\n  case 'Sat':\n  case 'Sun':\n    console.log('Weekend')\n    break\n  default:\n    console.log('Mid week')\n}` },
      { h: 'Ternary', p: 'Short if-else jo value deta hai. Simple conditions ke liye best.', code: `const fee = isMember ? 0 : 500` },
    ],
    analogy:
      'if-else ek **fork in the road** hai — "left ya right?". switch ek **lift ke buttons** — exact floor (case) dabao, wahi khulेga. Ternary ek **quick yes/no** decision — coin toss jitnа fast. 🛣️',
    syntax: { code: `if (condition) {\n  // ...\n} else if (cond2) {\n  // ...\n} else {\n  // ...\n}\n\nswitch (value) {\n  case x: ...; break\n  default: ...\n}`, note: 'switch mein har case ke baad break lagao warna fall-through hoga.' },
    steps: [
      'if ki condition boolean (truthy/falsy) mein evaluate hoti hai.',
      'True ho to uska block chalता hai, baaki skip.',
      'else if upar wali false hone par check hoti hai.',
      'switch value ko `===` se cases se match karता hai.',
      'break milte hi switch se bahar; na ho to agla case bhi chalेga (fall-through).',
    ],
    examples: [
      { level: 'Beginner', title: 'Grade system', code: `const score = 82\nlet grade\nif (score >= 90) grade = 'A'\nelse if (score >= 75) grade = 'B'\nelse grade = 'C'\nconsole.log(grade)`, result: 'B' },
      { level: 'Intermediate', title: 'switch with fall-through', code: `const fruit = 'apple'\nswitch (fruit) {\n  case 'apple':\n  case 'mango':\n    console.log('Sweet')\n    break\n  default:\n    console.log('Unknown')\n}`, result: 'Sweet', explain: 'apple aur mango dono "Sweet" — intentional fall-through.' },
      { level: 'Advanced', title: 'switch(true) trick', code: `const age = 25\nswitch (true) {\n  case age < 13: console.log('Child'); break\n  case age < 20: console.log('Teen'); break\n  default: console.log('Adult')\n}`, result: 'Adult', explain: 'switch(true) se ranges handle kar sakte ho (if-else jaisा).' },
    ],
    notes: {
      concept: 'if-else flexible (ranges, complex). switch fixed values ke liye clean.',
      tip: 'switch mein break mat bhoolो. Multiple cases same kaam → stack karo.',
      warning: 'switch `===` use karता hai (strict, no coercion). "1" aur 1 alag.',
      error: 'break bhoolna → fall-through bug (agla case bhi chal jaता hai).',
    },
    compare: {
      headers: ['Feature', 'if-else', 'switch'],
      rows: [
        ['Best for', 'Ranges, complex conditions', 'Ek value, kai fixed cases'],
        ['Comparison', 'Koi bhi (>, <, &&)', 'Strict === only'],
        ['Readability', 'Bahut cases mein ganda', 'Bahut cases mein clean'],
        ['Fall-through', 'Nahi', 'Haan (break na ho to)'],
      ],
    },
    mistakes: [
      { bad: 'switch mein break bhoolna.', fix: 'Har case ke baad break (ya intentional comment).' },
      { bad: '`if (x = 5)` (assignment).', fix: '`if (x === 5)`.' },
    ],
    best: ['Simple → ternary, ranges → if-else, fixed values → switch.', 'switch mein default zaroor rakho.', 'Deep nesting avoid karo (early return use karo).'],
    interview: {
      beginner: [
        { q: 'if-else vs switch kab?', a: 'if-else ranges/complex conditions ke liye. switch ek value ke kai fixed equal cases ke liye (cleaner).' },
      ],
      intermediate: [
        { q: 'switch fall-through kya hai?', a: 'break na ho to current case ke baad agle cases bhi chal jaate hain. Kabhi intentional (multiple cases same kaam), warna bug.' },
      ],
      advanced: [
        { q: 'switch kaunsi equality use karता?', a: 'Strict (===). "1" aur 1 match nahi karenge, koi coercion nahi.' },
      ],
    },
    mcqs: [
      { q: 'switch kaunsi equality?', options: ['==', '===', 'both', 'none'], answer: 1, explain: 'Strict ===.' },
      { q: 'break na ho to switch mein?', options: ['Error', 'Fall-through', 'Skip', 'Loop'], answer: 1, explain: 'Agle cases chal jaate hain.' },
    ],
    exercises: {
      easy: ['if-else se number positive/negative/zero batao.'],
      medium: ['switch se day number (1-7) ko day name mein convert karo.'],
      advanced: ['switch(true) se age groups (child/teen/adult/senior) banao.'],
    },
    summary: [
      'if/else if/else = flexible decisions.',
      'switch = ek value, kai fixed cases (break zaroori).',
      'Ternary = short if-else jo value deta.',
      'switch strict === use karता.',
    ],
    cheatsheet: [
      { h: 'if', code: `if (c) {} else if (c2) {} else {}` },
      { h: 'switch', code: `switch(x){ case a: ...; break;\n  default: ... }` },
      { h: 'ternary', code: `c ? a : b` },
    ],
    advanced:
      'Bahut saare cases ke liye object lookup (map) switch se fast aur clean hota hai: `const actions = { start: fn1, stop: fn2 }; actions[type]?.()`. Yeh "dispatch table" pattern Redux jaise state managers mein use hota hai.',
    quiz: [
      { q: 'Ranges ke liye best?', options: ['switch', 'if-else', 'dono same', 'koi nahi'], answer: 1, explain: 'if-else ranges handle karता hai.' },
      { q: 'default kab chalता?', options: ['Hamesha', 'Koi case match na ho', 'Pehle', 'Kabhi nahi'], answer: 1, explain: 'else jaisा — koi match na ho.' },
    ],
    related: ['operators', 'loops', 'modern-operators'],
  },

  loops: {
    overview:
      'Loops ek kaam ko **baar-baar** karne dete hain bina code repeat kiye. Types: **for** (count pata ho), **while** (condition tak), **do-while** (kam se kam ek baar), aur modern **for...of** (values), **for...in** (keys). `break` rok deta, `continue` skip karता.',
    why:
      'Lists/arrays process karna, data render karna, repeat tasks — sab loops par chalते hain. Loop choice aur off-by-one errors interview + real code dono mein common hain.',
    concept: [
      { h: 'for loop', p: 'Teen parts: init, condition, update. Jab iterations count pata ho.', code: `for (let i = 0; i < 5; i++) {\n  console.log(i) // 0,1,2,3,4\n}` },
      { h: 'while & do-while', p: '`while` pehle condition check karता. `do-while` pehle body chalाता phir check (kam se kam ek baar pakka).', code: `let i = 0\nwhile (i < 3) { console.log(i); i++ }\n\nlet j = 5\ndo { console.log(j) } while (j < 3) // 1 baar` },
      { h: 'for...of & for...in', p: '`for...of` array/string ki **values** par. `for...in` object ki **keys** par.', code: `for (const x of [10, 20]) console.log(x) // 10,20\nfor (const key in {a:1, b:2}) console.log(key) // a,b` },
      { h: 'break & continue', p: '`break` loop turant rokता. `continue` current iteration skip karke agli par jaता.', code: `for (let i = 0; i < 5; i++) {\n  if (i === 3) break      // ruko\n  if (i === 1) continue   // skip\n  console.log(i) // 0, 2\n}` },
    ],
    analogy:
      'Loop ek **gym ke reps** jaisा — "10 push-ups karo". for = "exactly 10 reps". while = "jab tak thak na jao". do-while = "kam se kam 1 rep to karo hi". break = "chot lag gayi, ruko". continue = "yeh rep galat thi, skip karke agli karo". 💪',
    syntax: { code: `for (init; condition; update) { }\nwhile (condition) { }\ndo { } while (condition)\nfor (const item of array) { }\nfor (const key in object) { }`, note: 'Array values ke liye for...of, object keys ke liye for...in.' },
    steps: [
      'for: init ek baar chalता (let i=0).',
      'Condition check — true ho to body chalती.',
      'Body ke baad update (i++).',
      'Wapas condition par — false hone tak repeat.',
      'break poora loop rokта; continue body ka baaki skip karke update par jaता.',
    ],
    examples: [
      { level: 'Beginner', title: 'Sum 1 to 5', code: `let sum = 0\nfor (let i = 1; i <= 5; i++) sum += i\nconsole.log(sum)`, result: '15' },
      { level: 'Intermediate', title: 'Array iterate', code: `const fruits = ['apple', 'mango', 'kiwi']\nfor (const f of fruits) console.log(f)`, result: ['apple', 'mango', 'kiwi'] },
      { level: 'Advanced', title: 'break vs continue', code: `for (let i = 1; i <= 5; i++) {\n  if (i === 4) break\n  if (i % 2 === 0) continue\n  console.log(i)\n}`, result: ['1', '3'], explain: 'Even skip (continue), 4 par ruk gaya (break) → sirf 1, 3.' },
    ],
    notes: {
      concept: 'for...of values, for...in keys. while condition-based.',
      tip: 'Arrays par for...of (clean) ya forEach/map. for...in objects ke liye.',
      warning: 'for...in arrays par avoid — index strings deta + inherited keys aa sakti hain.',
      error: 'Infinite loop — update/condition galat (i++ bhoolna). Page freeze!',
    },
    compare: {
      headers: ['Loop', 'Kab use', 'Check kab'],
      rows: [
        ['for', 'Count pata ho', 'Pehle'],
        ['while', 'Condition tak', 'Pehle'],
        ['do-while', 'Min 1 baar chahiye', 'Baad mein'],
        ['for...of', 'Array/string values', 'Har item'],
        ['for...in', 'Object keys', 'Har key'],
      ],
    },
    mistakes: [
      { bad: 'for...in arrays ke liye use karna.', fix: 'for...of ya indexed for use karo.' },
      { bad: 'Update bhoolna (infinite loop).', fix: 'i++ ya condition change zaroor karo.' },
    ],
    best: ['Array values → for...of / map/filter.', 'Object keys → for...in / Object.entries.', 'Infinite loops se bacho.', 'Loop ke andar bhaari DOM work avoid karo (batch karo).'],
    interview: {
      beginner: [
        { q: 'for...of aur for...in mein fark?', a: 'for...of array/string ki values deता hai, for...in object (ya array) ki keys/indexes.' },
        { q: 'while vs do-while?', a: 'while pehle condition check karता (0 baar bhi chal sakta). do-while pehle body chalाता, kam se kam ek baar pakka.' },
      ],
      intermediate: [
        { q: 'break aur continue?', a: 'break poora loop turant rokта. continue current iteration skip karke agli par jaता.' },
      ],
      advanced: [
        { q: 'for...in arrays par kyun avoid?', a: 'Index strings deta hai aur prototype ki enumerable inherited properties bhi iterate ho sakti hain — unpredictable.' },
      ],
    },
    mcqs: [
      { q: 'Min ek baar chalने wala loop?', options: ['for', 'while', 'do-while', 'for...of'], answer: 2, explain: 'do-while body pehle chalाता.' },
      { q: 'Array values ke liye best?', options: ['for...in', 'for...of', 'while', 'do-while'], answer: 1, explain: 'for...of values deता.' },
    ],
    exercises: {
      easy: ['1 se 10 tak print karo.', 'Ek array ke saare elements print karo.'],
      medium: ['Ek array ka sum aur max nikaalo loop se.'],
      advanced: ['Nested loop se multiplication table (1-5) banao.'],
    },
    summary: [
      'for = count pata ho, while = condition tak, do-while = min 1 baar.',
      'for...of values, for...in keys.',
      'break rokта, continue skip karता.',
      'Infinite loops se bacho.',
    ],
    cheatsheet: [
      { h: 'Loops', code: `for(let i=0;i<n;i++){}\nwhile(c){}\ndo{}while(c)\nfor(const v of arr){}\nfor(const k in obj){}` },
      { h: 'Control', code: `break    // stop\ncontinue // skip` },
    ],
    advanced:
      'Modern array methods (`map`, `filter`, `reduce`, `forEach`) declarative loops hain — zyada readable. Lekin `break` nahi kar sakte unme (sirf for/for...of mein). Performance-critical code mein classic `for` thoda fast hota hai. `for await...of` async iterables ke liye hai.',
    quiz: [
      { q: 'continue kya karता?', options: ['Loop rokта', 'Iteration skip', 'Restart', 'Error'], answer: 1, explain: 'Current iteration skip, agli par.' },
      { q: 'Object keys ke liye?', options: ['for...of', 'for...in', 'while', 'do'], answer: 1, explain: 'for...in keys deता.' },
    ],
    related: ['conditionals', 'array-methods', 'arrays'],
  },

  'functions-basics': {
    overview:
      'Function ek **reusable block of code** hai jo ek kaam karता hai — ek baar likho, baar-baar call karo. Types: **Declaration** (named, hoisted), **Expression** (variable mein), **Arrow** (short, lexical this), **Anonymous** (bina naam), aur **IIFE** (turant chalने wala). Functions JS ke "first-class citizens" hain.',
    why:
      'Functions code ko reusable, organized aur testable banाते hain. Arrow vs normal function (especially `this`) interview ka top question hai. Sab advanced topics (closures, callbacks, HOF) functions par khade hain.',
    concept: [
      { h: 'Function Declaration', p: 'Named function, **hoisted** (declare se pehle bhi call ho sakta). Sabse common.', code: `function add(a, b) {\n  return a + b\n}\nadd(2, 3) // 5 (declare se pehle bhi chalega)` },
      { h: 'Function Expression', p: 'Function ko variable mein store. **Hoisted nahi** (declare ke baad hi call). Anonymous ho sakti hai.', code: `const multiply = function (a, b) {\n  return a * b\n}\nmultiply(2, 3) // 6` },
      { h: 'Arrow Function', p: 'Short syntax. Apna `this`, `arguments` nahi — parent se leta (lexical). Single expression mein implicit return.', code: `const square = x => x * x\nconst sum = (a, b) => a + b\nconst greet = () => 'Hi'` },
      { h: 'IIFE', p: 'Immediately Invoked Function Expression — define hote hi chal jaता hai. Private scope banाने ke liye.', code: `(function () {\n  console.log('Turant chala!')\n})()` },
    ],
    analogy:
      'Function ek **coffee machine** hai — input (beans + paani) do, button dabao (call), output (coffee) milta. Ek baar bana di, roz use karo. Arrow function ek **compact travel machine** — chhoti, par apna alag setting (`this`) nahi rakhती, ghar wali (parent) setting use karती hai. ☕',
    syntax: { code: `// Declaration\nfunction name(params) { return value }\n\n// Expression\nconst name = function(params) { }\n\n// Arrow\nconst name = (params) => value\n\n// IIFE\n(() => { })()`, note: 'Arrow function ka apna this nahi hota — yahi sabse bada fark hai.' },
    steps: [
      'Function define hota hai (declaration hoist ho jaता).',
      'Call karne par naya **execution context** banता hai.',
      'Parameters arguments se bind hote hain.',
      'Body chalती hai; `return` value wapas deti (na ho to undefined).',
      'Context call stack se pop ho jaता hai.',
    ],
    examples: [
      { level: 'Beginner', title: 'Declaration vs arrow', code: `function greet(name) {\n  return 'Hi ' + name\n}\nconst greet2 = name => 'Hi ' + name\nconsole.log(greet('A'), greet2('B'))`, result: 'Hi A Hi B' },
      { level: 'Intermediate', title: 'Default + rest params', code: `function total(tax = 0.1, ...prices) {\n  const sum = prices.reduce((a, p) => a + p, 0)\n  return sum + sum * tax\n}\nconsole.log(total(0.18, 100, 200))`, result: '354', explain: 'Default param + rest (...) se variable arguments collect.' },
      { level: 'Advanced', title: 'Arrow this trap', code: `const obj = {\n  name: 'JS',\n  normal() { return this.name },\n  arrow: () => this?.name\n}\nconsole.log(obj.normal()) // 'JS'\nconsole.log(obj.arrow())  // undefined`, explain: 'Arrow ka this parent (yahan global) se aata, isliye object method ke liye normal function use karo.' },
    ],
    memory:
      'Har function call ek naya execution context (stack par) banाता hai jisme apne local variables aur arguments hote hain. Function khatam hone par wo context pop ho jaता hai aur uske local variables garbage collect ho jaते hain (jab tak koi closure unhe pakad na le).',
    notes: {
      concept: 'Declaration hoisted, expression nahi. Arrow ka apna this nahi.',
      tip: 'Object methods ke liye normal function, callbacks ke liye arrow (this preserve).',
      warning: 'Arrow functions ko object method ya constructor ki tarah use mat karo (this problem).',
      error: 'return ke baad newline → automatic semicolon insertion se undefined return. return aur value same line.',
    },
    compare: {
      headers: ['Feature', 'Declaration', 'Expression', 'Arrow'],
      rows: [
        ['Hoisted', 'Haan', 'Nahi', 'Nahi'],
        ['Apna this', 'Haan', 'Haan', 'Nahi (lexical)'],
        ['arguments object', 'Haan', 'Haan', 'Nahi'],
        ['Constructor (new)', 'Haan', 'Haan', 'Nahi'],
        ['Syntax', 'Lamba', 'Medium', 'Short'],
      ],
    },
    mistakes: [
      { bad: 'Arrow function ko object method banाना (this galat).', fix: 'Method ke liye normal function use karo.' },
      { bad: 'Expression ko declare se pehle call karna.', fix: 'Expressions hoist nahi hote — declare ke baad call.' },
    ],
    best: ['Callbacks ke liye arrow (concise + this).', 'Object methods/constructors ke liye normal function.', 'Default params use karo (undefined check ki jagah).', 'Ek function = ek kaam (single responsibility).'],
    interview: {
      beginner: [
        { q: 'Function declaration aur expression mein fark?', a: 'Declaration hoist hoti hai (pehle call ho sakti), expression nahi (variable assign ke baad hi).' },
      ],
      intermediate: [
        { q: 'Arrow aur normal function mein fark?', a: 'Arrow ka apna this/arguments nahi (lexical, parent se). Constructor nahi ban sakta. Syntax chhota.' },
      ],
      advanced: [
        { q: 'IIFE kya aur kyun?', a: 'Immediately Invoked Function Expression — define hote hi chalता hai. Private scope banाने aur global pollution rokने ke liye (modules se pehle bahut use hota tha).' },
      ],
    },
    mcqs: [
      { q: 'Kaunsा hoist hota hai?', options: ['Arrow', 'Expression', 'Declaration', 'Koi nahi'], answer: 2, explain: 'Function declaration fully hoist hoti.' },
      { q: 'Arrow function ka this?', options: ['Apna', 'Lexical (parent)', 'undefined hamesha', 'window hamesha'], answer: 1, explain: 'Lexical — parent scope se.' },
    ],
    exercises: {
      easy: ['Ek function likho jo do numbers ka max de.'],
      medium: ['Default parameter use karke greet(name = "Guest") banao.'],
      advanced: ['Ek IIFE likho jo private counter rakhe aur increment function de.'],
    },
    summary: [
      'Function = reusable code block.',
      'Declaration hoisted, expression nahi.',
      'Arrow = short + lexical this (apna this nahi).',
      'IIFE = turant chalने wala, private scope.',
    ],
    cheatsheet: [
      { h: 'Forms', code: `function f(){}        // declaration\nconst f=function(){}  // expression\nconst f=()=>{}        // arrow\n(()=>{})()            // IIFE` },
    ],
    advanced:
      'Functions "first-class citizens" hain — variables mein store, arguments mein pass, return ho sakte hain. Yahi callbacks, HOF, currying, closures sabki neev hai. Arrow functions React mein bahut use hote (event handlers mein this binding ki zarurat nahi).',
    quiz: [
      { q: 'IIFE kab chalता?', options: ['Call par', 'Define hote hi', 'Page load par', 'Kabhi nahi'], answer: 1, explain: 'Immediately invoked.' },
      { q: 'first-class function matlab?', options: ['Sabse fast', 'Values ki tarah use', 'Sirf class mein', 'Hoisted'], answer: 1, explain: 'Pass/store/return ho sakte values ki tarah.' },
    ],
    related: ['callbacks-hof', 'closures', 'this-keyword'],
  },

  'callbacks-hof': {
    overview:
      '**Callback** ek function hai jo doosre function ko **argument** ke roop mein pass hota hai aur baad mein call hota hai. **Higher-Order Function (HOF)** wo hai jo function ko argument leता hai ya function return karता hai. **Pure function** wahi output deता hai same input par, koi side-effect nahi. Yeh functional programming ki neev hain.',
    why:
      'map/filter/reduce, event listeners, setTimeout, promises — sab callbacks/HOF par chalte hain. Pure functions React/Redux ka core hain. Interview mein "HOF example do" bahut aata hai.',
    concept: [
      { h: 'Callback Function', p: 'Function jo dusre function ko pass hota hai, baad mein "call back" hota hai. Async kaam aur array methods ka base.', code: `function greet(name, callback) {\n  console.log('Hi ' + name)\n  callback()\n}\ngreet('A', () => console.log('Done'))` },
      { h: 'Higher-Order Function', p: 'Function jo (a) function ko argument leता hai, ya (b) function return karता hai. map, filter, forEach sab HOF hain.', code: `// leता hai\n[1,2,3].map(x => x * 2)\n// return karता hai\nconst multiplier = n => x => x * n\nconst double = multiplier(2)` },
      { h: 'Pure Function', p: 'Same input → same output, hamesha. Koi side-effect nahi (bahar ki cheez nahi badalता, no API/DOM). Testable + predictable.', code: `// Pure ✅\nconst add = (a, b) => a + b\n// Impure ❌ (bahar par asar)\nlet total = 0\nconst addToTotal = x => { total += x }` },
    ],
    analogy:
      'Callback ek **"kaam ho jaaye to mujhe call karna"** instruction hai — jaise courier ko bolo "parcel pahunche to phone karna". HOF ek **manager** hai jo kaam (functions) doosron ko deता ya naye kaam banाता hai. Pure function ek **vending machine** — wahi code dabाओ, wahi cheez milेgi, har baar. 📞',
    syntax: { code: `// Callback\nfn(arg, callback)\narr.forEach(item => { })\n\n// HOF returning function\nconst hof = (x) => (y) => x + y\n\n// Pure\nconst pure = (a, b) => a + b`, note: 'Array methods (map/filter/reduce) sabse common HOFs hain.' },
    examples: [
      { level: 'Beginner', title: 'Callback basics', code: `function process(num, cb) {\n  return cb(num)\n}\nconsole.log(process(5, x => x * x))`, result: '25', explain: 'cb (callback) ko process ne call kiya.' },
      { level: 'Intermediate', title: 'HOF returns function', code: `const greetMaker = greeting => name => greeting + ', ' + name\nconst hello = greetMaker('Hello')\nconsole.log(hello('Devendra'))\nconsole.log(greetMaker('Hi')('Amit'))`, result: ['Hello, Devendra', 'Hi, Amit'], explain: 'greetMaker function return karता — yahi HOF + closure.' },
      { level: 'Advanced', title: 'Pure vs impure', code: `// Pure\nconst tax = price => price * 0.18\n// Impure (random/Date side-effect)\nconst id = () => Math.random()\nconsole.log(tax(100))`, result: '18', explain: 'tax pure hai (predictable), id impure (har baar alag).' },
    ],
    memory:
      'Callback function ek reference ki tarah pass hota hai (heap mein function object). Jab HOF use return-kiye function ko hold karता hai, to closure ke through outer variables memory mein zinda rehte hain. Pure functions koi external state hold nahi karte — easy to garbage collect.',
    notes: {
      concept: 'Callback = pass kiya function. HOF = function leता/return karता. Pure = no side-effects.',
      tip: 'Callback pass karte time () mat lagao — `fn` pass karo, `fn()` (call) nahi.',
      warning: 'Bahut nested callbacks = "Callback Hell". Promises/async-await use karo.',
      error: '`setTimeout(myFn(), 1000)` — yeh turant call karता. `setTimeout(myFn, 1000)` ya `() => myFn()` use karo.',
    },
    compare: {
      headers: ['Concept', 'Definition', 'Example'],
      rows: [
        ['Callback', 'Pass kiya function', 'arr.forEach(fn)'],
        ['HOF', 'Function leता/return karता', 'map, filter, debounce'],
        ['Pure function', 'No side-effect, predictable', '(a,b)=>a+b'],
        ['Impure function', 'Side-effect rakhता', 'Math.random(), API call'],
      ],
    },
    mistakes: [
      { bad: 'Callback pass karte time `fn()` (call) likhna.', fix: '`fn` (reference) pass karo.' },
      { bad: 'Nested callbacks (callback hell).', fix: 'Promises ya async/await use karo.' },
    ],
    best: ['Callbacks ke liye arrow functions.', 'Pure functions prefer karo (testable).', 'Callback hell → promises/async.', 'Side-effects ek jagah isolate karo.'],
    interview: {
      beginner: [
        { q: 'Callback function kya hai?', a: 'Ek function jo doosre function ko argument ki tarah pass hota hai aur baad mein call hota hai. Jaise array.forEach(cb).' },
        { q: 'Higher-order function kya hai?', a: 'Wo function jo ya to function ko argument leता hai ya function return karता hai. map, filter, reduce HOF hain.' },
      ],
      intermediate: [
        { q: 'Pure function kya hai?', a: 'Same input par hamesha same output deta hai aur koi side-effect nahi (bahar ki state nahi badalता). Testable aur predictable.' },
      ],
      advanced: [
        { q: 'Callback hell kya aur solution?', a: 'Nested callbacks ka deeply-indented mess (pyramid of doom). Solution: Promises, async/await, ya modular named functions.' },
      ],
    },
    mcqs: [
      { q: 'map kya hai?', options: ['Callback', 'HOF', 'Pure value', 'Loop keyword'], answer: 1, explain: 'map ek HOF hai jo callback leता.' },
      { q: 'Pure function side-effect?', options: ['Haan', 'Nahi', 'Kabhi-kabhi', 'Sirf async'], answer: 1, explain: 'Pure = no side-effects.' },
    ],
    exercises: {
      easy: ['Ek function likho jo callback ko 3 baar call kare.'],
      medium: ['Ek HOF banao jo multiplier function return kare.'],
      advanced: ['Ek pure aur ek impure function likho, fark samjhao.'],
    },
    summary: [
      'Callback = pass kiya jaane wala function.',
      'HOF = function ko leता ya return karता.',
      'Pure function = same input→output, no side-effect.',
      'map/filter/reduce HOF hain; callback hell ko async se solve karo.',
    ],
    cheatsheet: [
      { h: 'Patterns', code: `arr.map(fn)      // HOF + callback\nconst hof=x=>y=>x+y\nconst pure=(a,b)=>a+b` },
    ],
    projects: ['Custom forEach/map banao', 'Event system (pub-sub)', 'Retry-with-callback utility', 'Pipeline of pure transforms'],
    advanced:
      'Functional programming mein HOF se composition banता hai: `compose(f, g)(x) = f(g(x))`. Pure functions + immutability = predictable apps (Redux reducers pure hote hain). React components ideally pure functions of props hote hain.',
    quiz: [
      { q: 'HOF kya kar sakta?', options: ['Sirf number return', 'Function leta/return', 'Sirf loop', 'DOM only'], answer: 1, explain: 'Function le ya return kare.' },
      { q: 'setTimeout(fn, 100) mein fn kaise pass?', options: ['fn()', 'fn', 'fn;', '()fn'], answer: 1, explain: 'Reference pass — fn (call nahi).' },
    ],
    related: ['functions-basics', 'currying', 'array-methods'],
  },

  currying: {
    overview:
      '**Currying** ek technique hai jisme ek multi-argument function ko **ek-ek argument** leने wale nested functions ki chain mein todा jaता hai: `add(a, b, c)` → `add(a)(b)(c)`. **Composition** chhote functions ko jodकर bada function banाता hai. Dono functional programming ke power tools hain.',
    why:
      'Currying se reusable specialized functions bante hain (partial application). React/Redux, Lodash, Ramda mein bahut use. Interview mein "implement curry()" classic advanced question hai.',
    concept: [
      { h: 'Currying basics', p: 'Har call ek argument leता hai aur agla function return karता (closure se previous yaad rakhता). Last call result deता.', code: `const add = a => b => c => a + b + c\nadd(1)(2)(3) // 6\n\nconst add5 = add(5)   // partial\nadd5(10)(20)  // 35` },
      { h: 'Partial application', p: 'Kuch arguments pehle fix kar do, baaki baad mein. Reusable specialized functions.', code: `const multiply = a => b => a * b\nconst double = multiply(2)\nconst triple = multiply(3)\ndouble(5)  // 10\ntriple(5)  // 15` },
      { h: 'Function composition', p: 'Output of one = input of next. Right-to-left chalता (math jaisा).', code: `const compose = (...fns) => x =>\n  fns.reduceRight((acc, fn) => fn(acc), x)\nconst clean = compose(trim, toLower)` },
    ],
    analogy:
      'Currying ek **chai banाने ka step-by-step recipe** hai — pehle paani(a), phir patti(b), phir doodh(c). Har step ke baad "ab agla daalो" wala adha-bana cup milta. Composition ek **assembly line** — ek machine ka output agli machine ka input. ☕🏭',
    syntax: { code: `// Curried\nconst fn = a => b => c => a + b + c\n\n// Generic curry\nfunction curry(fn) {\n  return function curried(...args) {\n    return args.length >= fn.length\n      ? fn(...args)\n      : (...next) => curried(...args, ...next)\n  }\n}`, note: 'Currying closures par based hai — har level previous args yaad rakhता.' },
    examples: [
      { level: 'Intermediate', title: 'Curried sum', code: `const sum = a => b => c => a + b + c\nconsole.log(sum(1)(2)(3))\nconst add10 = sum(10)\nconsole.log(add10(5)(5))`, result: ['6', '20'] },
      { level: 'Advanced', title: 'Generic curry()', code: `function curry(fn) {\n  return function curried(...a) {\n    return a.length >= fn.length\n      ? fn(...a)\n      : (...b) => curried(...a, ...b)\n  }\n}\nconst add = curry((a, b, c) => a + b + c)\nconsole.log(add(1)(2)(3), add(1, 2)(3), add(1, 2, 3))`, result: '6 6 6', explain: 'curry flexible — kisi bhi tarah call karo.' },
      { level: 'Advanced', title: 'Compose', code: `const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x)\nconst addOne = x => x + 1\nconst dbl = x => x * 2\nconsole.log(compose(dbl, addOne)(5))`, result: '12', explain: 'addOne(5)=6, phir dbl(6)=12 (right-to-left).' },
    ],
    memory:
      'Har curried call ek closure banाता hai jo previous arguments ko memory mein hold karता hai. Isliye `add(1)` ka returned function `1` ko yaad rakhता hai jab tak wo function reference zinda hai. Zyada deep currying = zyada closures = thodi memory.',
    notes: {
      concept: 'Currying = ek-ek arg. Composition = functions jodना.',
      tip: 'Currying closures par chalता — har level args yaad rakhता.',
      warning: 'Zyada deep currying readability kam karता — balance rakhो.',
      error: 'curried function ko ek saath saare args dena (add(1,2,3)) — manual currying mein kaam nahi karता (generic curry mein karta).',
    },
    compare: {
      headers: ['Concept', 'Currying', 'Partial Application'],
      rows: [
        ['Args per call', 'Exactly 1', 'Ek ya zyada'],
        ['Returns', 'Function tak last', 'Function ya result'],
        ['Example', 'add(1)(2)(3)', 'add(1, 2)(3)'],
      ],
    },
    mistakes: [
      { bad: 'Curried fn ko add(1, 2, 3) call karna (manual).', fix: 'add(1)(2)(3) ya generic curry banao.' },
      { bad: 'compose ka order ulta samajhna.', fix: 'compose right-to-left; pipe left-to-right.' },
    ],
    best: ['Reusable specialized functions ke liye currying.', 'Data transforms ke liye composition.', 'Lodash/Ramda use karo production mein.', 'Readability balance rakhो.'],
    interview: {
      intermediate: [
        { q: 'Currying kya hai?', a: 'Multi-arg function ko single-arg functions ki chain mein todना: f(a,b,c) → f(a)(b)(c). Closures se previous args yaad rehte hain.' },
        { q: 'Currying ka fayda?', a: 'Partial application — kuch args fix karke reusable specialized functions banते hain (jaise multiply(2) = double).' },
      ],
      advanced: [
        { q: 'curry() implement karo.', a: 'Recursion + closure: agar collected args >= fn.length to fn(...args) call karo, warna ek function return karo jo aur args collect kare.' },
        { q: 'compose vs pipe?', a: 'compose right-to-left (f(g(x))), pipe left-to-right (g phir f). Dono functions chain karte hain.' },
      ],
    },
    mcqs: [
      { q: 'add(1)(2)(3) kya hai?', options: ['Composition', 'Currying', 'Recursion only', 'Loop'], answer: 1, explain: 'Currying — ek-ek arg.' },
      { q: 'compose order?', options: ['Left-right', 'Right-left', 'Random', 'Parallel'], answer: 1, explain: 'compose right-to-left.' },
    ],
    exercises: {
      easy: ['Curried multiply a=>b=>a*b likho aur double banao.'],
      medium: ['3 args ka curried sum banao.'],
      advanced: ['Generic curry() function likho jo kisi bhi tarah call ho.'],
    },
    summary: [
      'Currying = multi-arg ko single-arg chain mein todना.',
      'Partial application = kuch args pehle fix.',
      'Composition = functions ko jodकर naya function.',
      'Dono closures par based hain.',
    ],
    cheatsheet: [
      { h: 'Curry', code: `const f=a=>b=>c=>a+b+c\nf(1)(2)(3) // 6` },
      { h: 'Compose', code: `compose(f,g)(x)=f(g(x))` },
    ],
    advanced:
      'Currying + composition = "point-free style" (data ko explicitly mention kiye bina functions banाना). Ramda/Lodash-fp libraries auto-curried functions dete hain. React HOCs (Higher-Order Components) bhi currying-like pattern follow karte hain.',
    quiz: [
      { q: 'Currying kis par based hai?', options: ['Loops', 'Closures', 'Classes', 'Promises'], answer: 1, explain: 'Closures se args yaad rehte.' },
      { q: 'Partial application deta?', options: ['Specialized function', 'Number only', 'Array', 'Error'], answer: 0, explain: 'Kuch args fix karke specialized fn.' },
    ],
    related: ['callbacks-hof', 'closures', 'functional-programming'],
  },

  'debounce-throttle': {
    overview:
      '**Debounce** aur **Throttle** performance patterns hain jo bar-bar chalने wale events (typing, scroll, resize) ko control karte hain. **Debounce**: last call ke baad ek delay tak ruk kar chalता ("user ruk gaya tab chalo"). **Throttle**: fixed interval par max ek baar chalता ("har 200ms mein ek baar"). Dono closures + setTimeout par bante hain.',
    why:
      'Search box, scroll handlers, resize, button spamming — bina debounce/throttle ke API spam aur lag hota hai. Interview mein "implement debounce/throttle" sabse common machine-coding round question hai.',
    concept: [
      { h: 'Debounce', p: 'Har call par timer reset. Function tabhi chalता jab calls **ruk jaayein** (delay tak koi naya call na ho). Search-as-you-type ke liye perfect.', code: `function debounce(fn, delay) {\n  let timer\n  return (...args) => {\n    clearTimeout(timer)\n    timer = setTimeout(() => fn(...args), delay)\n  }\n}` },
      { h: 'Throttle', p: 'Fixed interval mein **max ek baar** chalता, chahe kitni baar call ho. Scroll/resize ke liye perfect (regular updates).', code: `function throttle(fn, limit) {\n  let wait = false\n  return (...args) => {\n    if (wait) return\n    fn(...args)\n    wait = true\n    setTimeout(() => (wait = false), limit)\n  }\n}` },
      { h: 'Kab kaunsा?', p: 'Debounce: "final action chahiye" (search, auto-save, validation). Throttle: "regular updates chahiye" (scroll position, drag, FPS).' },
    ],
    analogy:
      'Debounce ek **lift** hai — log aate rehte hain to darwaza band nahi hota; jab koi 3 sec na aaye tabhi chalती hai. Throttle ek **metro train** — har 5 min mein ek baar chalती hai chahe kitne log aayein. 🛗🚇',
    syntax: { code: `const onSearch = debounce(apiCall, 400)\ninput.addEventListener('input', onSearch)\n\nconst onScroll = throttle(updatePos, 200)\nwindow.addEventListener('scroll', onScroll)`, note: 'Debounce delay typically 300-500ms; throttle limit scroll ke liye 100-200ms.' },
    steps: [
      'Debounce: har call par purana timer clearTimeout se cancel.',
      'Naya timer set; delay tak koi call na aaye to fn chalता.',
      'Throttle: pehli call turant chalती, "wait" flag on.',
      'Wait period mein calls ignore.',
      'Interval baad wait off — agli call phir chalेgi.',
    ],
    examples: [
      { level: 'Advanced', title: 'Debounce implementation', code: `function debounce(fn, delay) {\n  let timer\n  return function (...args) {\n    clearTimeout(timer)\n    timer = setTimeout(() => fn.apply(this, args), delay)\n  }\n}\nconst log = debounce(() => console.log('Fired!'), 300)\n// Type fast → sirf last ke 300ms baad ek baar`, explain: 'clearTimeout har call par timer reset — sirf last call survive.' },
      { level: 'Advanced', title: 'Throttle implementation', code: `function throttle(fn, limit) {\n  let wait = false\n  return function (...args) {\n    if (wait) return\n    fn.apply(this, args)\n    wait = true\n    setTimeout(() => (wait = false), limit)\n  }\n}\nconst onScroll = throttle(() => console.log(scrollY), 200)`, explain: 'Har 200ms mein max ek baar chalेga.' },
    ],
    memory:
      'Dono closure se `timer`/`wait` variable ko memory mein hold karte hain (returned function ke through). Component unmount par debounce/throttle ka pending timer clearTimeout karna zaroori — warna memory leak ya unexpected call ho sakti hai.',
    notes: {
      concept: 'Debounce = ruk jaane par chalता. Throttle = regular interval par.',
      tip: 'Search → debounce. Scroll/resize → throttle.',
      warning: 'Component unmount par pending timer clear karo (leak/error se bachne ke liye).',
      error: 'Debounce/throttle ko render ke andar inline banाना (har render naya banता) — useCallback/useRef use karo React mein.',
    },
    compare: {
      headers: ['Feature', 'Debounce', 'Throttle'],
      rows: [
        ['Kab chalता', 'Calls ruk jaane ke baad', 'Fixed interval par'],
        ['Use case', 'Search, auto-save', 'Scroll, resize, drag'],
        ['Calls in burst', 'Sirf last (ya first)', 'Regular fixed rate'],
        ['Goal', 'Final state', 'Smooth updates'],
      ],
    },
    mistakes: [
      { bad: 'Scroll ke liye debounce use karna.', fix: 'Scroll ke liye throttle (regular updates).' },
      { bad: 'Har render naya debounce banाना.', fix: 'useRef/useCallback se stable rakho.' },
    ],
    best: ['Search input → debounce (~400ms).', 'Scroll/resize → throttle (~200ms).', 'Cleanup par timers clear karo.', 'Lodash debounce/throttle production mein use karo.'],
    interview: {
      intermediate: [
        { q: 'Debounce kya hai?', a: 'Function tabhi chalता jab calls ruk jaayein (last call ke delay baad). Har naye call par timer reset. Search-as-you-type ke liye.' },
        { q: 'Throttle kya hai?', a: 'Function ko fixed interval mein max ek baar chalने deta, chahe kitni baar call ho. Scroll/resize ke liye.' },
      ],
      advanced: [
        { q: 'Debounce implement karo.', a: 'Closure mein timer rakho; har call par clearTimeout(timer) phir setTimeout(fn, delay). Sirf last call survive karता.' },
        { q: 'Debounce vs throttle kab?', a: 'Debounce jab final result chahiye (search). Throttle jab continuous updates chahiye fixed rate par (scroll position).' },
      ],
    },
    mcqs: [
      { q: 'Search box ke liye?', options: ['Throttle', 'Debounce', 'Dono', 'Koi nahi'], answer: 1, explain: 'Debounce — user ruke tab API call.' },
      { q: 'Throttle kya guarantee karता?', options: ['Sirf last call', 'Max rate', 'No calls', 'Sync'], answer: 1, explain: 'Fixed max rate par calls.' },
    ],
    exercises: {
      easy: ['Debounce ka use-case aur throttle ka use-case likho.'],
      medium: ['Ek debounce function implement karo.'],
      advanced: ['Throttle with leading + trailing call implement karo.'],
    },
    summary: [
      'Debounce: calls ruk jaane par chalता (search).',
      'Throttle: fixed interval par max ek baar (scroll).',
      'Dono closure + setTimeout par bante hain.',
      'Cleanup par timers clear karo.',
    ],
    cheatsheet: [
      { h: 'Debounce', code: `clearTimeout(t)\nt=setTimeout(fn,delay)` },
      { h: 'Throttle', code: `if(wait)return\nfn(); wait=true\nsetTimeout(()=>wait=false,limit)` },
    ],
    projects: ['Debounced search bar', 'Infinite scroll (throttle)', 'Window resize handler', 'Auto-save editor', 'Drag with throttle'],
    advanced:
      'Production debounce mein "leading/trailing" options hote hain (pehli call turant + last bhi), aur `cancel()`/`flush()` methods. Lodash ka `_.debounce`/`_.throttle` battle-tested hain. RxJS `debounceTime`/`throttleTime` reactive streams ke liye yahi pattern dete hain.',
    quiz: [
      { q: 'Debounce timer har call par?', options: ['Reset hota', 'Add hota', 'Ignore', 'Doubles'], answer: 0, explain: 'clearTimeout se reset.' },
      { q: 'Scroll handler ke liye?', options: ['Debounce', 'Throttle', 'None', 'Both same'], answer: 1, explain: 'Throttle regular updates deta.' },
    ],
    related: ['callbacks-hof', 'closures', 'performance'],
  },
}
