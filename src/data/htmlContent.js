// ─────────────────────────────────────────────────────────────
// HTML Course content (Hindi + Hinglish), keyed by topic slug.
// Section keys (all optional — renderer hides empty ones):
//   overview, history{why,when,importance}, theory[{h,p,code}],
//   syntax{code,note}, examples[{level,title,code,explain}],
//   visual{type,...}, best[], mistakes[{bad,fix}], support,
//   interview{beginner,intermediate,advanced}[{q,a}], summary[],
//   keyPoints[], exercises{easy,medium,challenge}[], quiz[{q,options,answer,explain}],
//   related[slug]
// ─────────────────────────────────────────────────────────────

export const htmlContent = {
  // ════════════════════════════ INTRODUCTION ════════════════════════════
  introduction: {
    overview:
      'HTML ka full form **HyperText Markup Language** hai. Ye web page ka *structure* (dhaancha) banane ke liye use hoti hai. Jab aap koi website dekhte ho — heading, paragraph, image, button — ye sab HTML se banta hai. Browser HTML code ko padhta hai aur usko ek sundar page ki tarah screen par dikhata hai.\n\nSimple shabdon mein: **HTML web ki bhasha (language) hai jisme hum browser ko batate hain ki page par kya-kya cheezein honi chahiye aur kis order mein.**',
    history: {
      why: 'Internet par documents ko share karna tha jisme heading, link aur formatting ho — isliye ek common markup language ki zaroorat padi.',
      when: 'HTML ko 1991 mein Tim Berners-Lee ne banaya tha (CERN, Switzerland mein). Ye World Wide Web ka foundation bani.',
      importance: 'Aaj duniya ki har website — Google, YouTube, Amazon — sabki base HTML hi hai. Web development seekhne ka pehla step HTML hai.',
    },
    theory: [
      { h: 'HTML "Markup" language hai, "Programming" language nahi', p: 'Markup ka matlab — hum content ko tags se "mark" karte hain taaki browser samjhe ki ye heading hai, ye paragraph hai. Isme logic (if-else, loops) nahi hota, isliye ise programming language nahi kehte.' },
      { h: '"HyperText" ka matlab', p: 'HyperText matlab aisa text jisme links ho. Ek page se doosre page par jump karne ki power isi "hyper" se aati hai — yahi web ko "web" (jaal) banata hai.' },
      { h: 'Teeno mil kar website banti hai', p: 'HTML = structure (dhaancha), CSS = design (rang-roop), JavaScript = behaviour (kaam-kaaj). Ghar ki tarah samjho: HTML deewaarein, CSS paint, JS bijli-pani.' },
    ],
    syntax: {
      code: `<!DOCTYPE html>
<html lang="hi">
  <head>
    <title>Meri Pehli Website</title>
  </head>
  <body>
    <h1>Namaste Duniya!</h1>
    <p>Ye mera pehla HTML page hai.</p>
  </body>
</html>`,
      note: 'Ye sabse chhota complete HTML page hai. Isko ".html" extension se save karke browser mein khol lo.',
    },
    examples: [
      {
        level: 'Beginner',
        title: 'Ek simple greeting page',
        code: `<h1>Hello!</h1>
<p>Mera naam Mayank hai.</p>`,
        explain: 'h1 ek badi heading banata hai, p ek paragraph banata hai. Browser inhe alag-alag dikhata hai.',
      },
      {
        level: 'Practical',
        title: 'Heading + image + link',
        code: `<h1>Mera Blog</h1>
<img src="photo.jpg" alt="Meri photo" />
<a href="https://google.com">Google kholo</a>`,
        explain: 'Ek real page mein aksar heading, image aur link saath hote hain — yahi pattern har website mein milega.',
      },
    ],
    visual: { type: 'boxes', items: [
      { label: 'HTML', sub: 'Structure / Dhaancha', color: '#6366F1' },
      { label: 'CSS', sub: 'Design / Rang-roop', color: '#22C55E' },
      { label: 'JavaScript', sub: 'Behaviour / Kaam', color: '#F59E0B' },
    ] },
    best: [
      'Hamesha `<!DOCTYPE html>` se page shuru karo.',
      'Tags ko lowercase mein likho (`<p>` na ki `<P>`).',
      'Code ko indentation (spaces) ke saath saaf likho taaki padhne mein aasaan ho.',
    ],
    mistakes: [
      { bad: 'HTML ko programming language samajhna.', fix: 'HTML markup language hai — ye structure deti hai, logic nahi.' },
      { bad: 'File ko `.txt` mein save karna.', fix: 'Hamesha `.html` extension use karo, warna browser usko web page nahi samjhega.' },
    ],
    support: 'HTML har browser mein chalta hai — Chrome, Firefox, Edge, Safari, mobile browsers — sab. Koi installation nahi chahiye, sirf ek browser kaafi hai.',
    interview: {
      beginner: [
        { q: 'HTML ka full form kya hai?', a: 'HyperText Markup Language.' },
        { q: 'HTML programming language hai ya markup language?', a: 'Markup language — ye content ko tags se structure deti hai, isme programming logic nahi hota.' },
      ],
      intermediate: [
        { q: 'HTML, CSS aur JS mein kya fark hai?', a: 'HTML structure deta hai, CSS design/styling karta hai, JavaScript interactivity/behaviour add karta hai.' },
      ],
      advanced: [
        { q: '"HyperText" term ka kya matlab hai?', a: 'Aisa text jisme hyperlinks ho — jisse ek document se doosre document par jump kiya ja sake. Yahi web ko jaal (web) banata hai.' },
      ],
    },
    summary: [
      'HTML = HyperText Markup Language, web page ka structure banati hai.',
      'Ye markup language hai, programming nahi.',
      'HTML + CSS + JS milke complete website banate hain.',
      '1991 mein Tim Berners-Lee ne banayi.',
    ],
    keyPoints: [
      'Browser HTML padhkar page render karta hai.',
      'Tags content ko "mark" karte hain.',
      'Har page `<!DOCTYPE html>` se shuru hota hai.',
    ],
    exercises: {
      easy: ['Ek HTML file banao jisme tumhara naam h1 mein ho aur ek introduction p mein ho.'],
      medium: ['Ek "About Me" page banao jisme heading, 2 paragraph aur ek link ho.'],
      challenge: ['Bina dekhe pura basic HTML boilerplate (DOCTYPE se body tak) memory se likho.'],
    },
    quiz: [
      { q: 'HTML ka full form kya hai?', options: ['HyperText Markup Language', 'High Tech Modern Language', 'Hyperlink Text Mode Language', 'Home Tool Markup Language'], answer: 0, explain: 'HyperText Markup Language — web ki standard markup language.' },
      { q: 'HTML kis kaam aati hai?', options: ['Page ko style karne', 'Page ka structure banane', 'Database banane', 'Server chalane'], answer: 1, explain: 'HTML page ka structure/dhaancha banati hai. Styling CSS karta hai.' },
    ],
    related: ['history', 'document-structure', 'tags'],
  },

  // ════════════════════════════ HISTORY ════════════════════════════
  history: {
    overview:
      'HTML ka safar 1991 se shuru hua. **Tim Berners-Lee** naam ke scientist ne CERN (Switzerland) mein documents share karne ke liye HTML banayi. Tab se ab tak HTML kai versions se guzri hai aur aaj **HTML5** chalta hai.',
    history: {
      why: 'Scientists ko apne research documents aapas mein links ke saath share karne the. Email se ye possible nahi tha — isliye ek "linked documents" system banaya gaya.',
      when: '1991 mein pehla HTML, 1995 mein HTML 2.0, 1997 mein HTML 3.2 aur 4.0, 1999 mein HTML 4.01, aur 2014 mein modern HTML5 aaya.',
      importance: 'Har version ne web ko zyada powerful banaya — pehle sirf text tha, aaj video, audio, forms, games sab HTML se chalte hain.',
    },
    theory: [
      { h: 'Shuruaat (1991)', p: 'Pehla HTML mein sirf 18 tags the. Sirf headings, paragraphs aur links — bas itna hi.' },
      { h: 'Beech ka daur (1995-1999)', p: 'Tables, forms aur images add hue. Websites zyada useful banne lagi. W3C (World Wide Web Consortium) ne standards banaye.' },
      { h: 'HTML5 (2014 - aaj tak)', p: 'Semantic tags (header, footer, article), audio, video, canvas, local storage — sab HTML5 mein aaya. Ab Flash jaisi cheezon ki zaroorat khatam ho gayi.' },
    ],
    visual: { type: 'timeline', items: [
      { year: '1991', text: 'HTML banaya gaya (Tim Berners-Lee)' },
      { year: '1995', text: 'HTML 2.0 — pehla official standard' },
      { year: '1997', text: 'HTML 3.2 & 4.0 — tables, forms' },
      { year: '1999', text: 'HTML 4.01 — lamba time tak chala' },
      { year: '2014', text: 'HTML5 — modern web (video, audio, semantic)' },
    ] },
    keyPoints: [
      'HTML 1991 mein Tim Berners-Lee ne banayi.',
      'W3C HTML standards maintain karta hai.',
      'Aaj HTML5 latest aur sabse zyada use hone wala version hai.',
    ],
    summary: [
      '1991: HTML janam, 18 tags.',
      'Dheere-dheere tables, forms, images aaye.',
      'HTML5 (2014) ne audio/video/semantic diye.',
    ],
    quiz: [
      { q: 'HTML kisne banayi?', options: ['Bill Gates', 'Tim Berners-Lee', 'Mark Zuckerberg', 'Dennis Ritchie'], answer: 1, explain: 'Tim Berners-Lee ne 1991 mein CERN mein HTML banayi.' },
    ],
    related: ['introduction', 'versions'],
  },

  // ════════════════════════════ VERSIONS ════════════════════════════
  versions: {
    overview:
      'HTML ke ab tak kai versions aa chuke hain. Har naye version mein naye features add hue. Aaj hum **HTML5** use karte hain jo sabse modern aur powerful hai.',
    theory: [
      { h: 'HTML 4.01 (1999)', p: 'Bahut lambe time tak use hua. Lekin isme audio/video ke liye Flash plugin chahiye tha.' },
      { h: 'XHTML (2000)', p: 'HTML ka strict version — har tag close karna zaroori tha. Thoda kadak rules ki wajah se kam popular hua.' },
      { h: 'HTML5 (2014)', p: 'Game changer! Native audio/video, semantic tags, canvas, geolocation, local storage — sab built-in. Aaj ka standard.' },
    ],
    syntax: {
      code: `<!-- HTML5 doctype — bas itna simple -->
<!DOCTYPE html>

<!-- Purana HTML4 doctype — bahut lamba tha -->
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
  "http://www.w3.org/TR/html4/strict.dtd">`,
      note: 'HTML5 ne doctype ko itna chhota kar diya — yaad rakhna aasaan.',
    },
    visual: { type: 'boxes', items: [
      { label: 'HTML 4.01', sub: '1999 — Flash era', color: '#64748B' },
      { label: 'XHTML', sub: '2000 — strict rules', color: '#8B5CF6' },
      { label: 'HTML5', sub: '2014 — modern ⭐', color: '#22C55E' },
    ] },
    keyPoints: [
      'HTML5 latest aur recommended version hai.',
      'HTML5 ka doctype sabse simple: `<!DOCTYPE html>`.',
      'HTML5 mein Flash ki zaroorat khatam.',
    ],
    summary: ['HTML4 → XHTML → HTML5 ka safar.', 'HTML5 modern features ke saath aaj ka standard hai.'],
    quiz: [
      { q: 'Aaj kaunsa HTML version use hota hai?', options: ['HTML 4.01', 'XHTML', 'HTML5', 'HTML 3.2'], answer: 2, explain: 'HTML5 modern standard hai.' },
      { q: 'HTML5 ka doctype kya hai?', options: ['<!DOCTYPE html5>', '<!DOCTYPE html>', '<doctype html>', '<DOCTYPE HTML5>'], answer: 1, explain: 'Sirf `<!DOCTYPE html>` — simple aur chhota.' },
    ],
    related: ['history', 'introduction', 'document-structure'],
  },

  // ════════════════════════════ DOCUMENT STRUCTURE ════════════════════════════
  'document-structure': {
    overview:
      'Har HTML page ka ek fixed *dhaancha* (structure) hota hai. Ye dhaancha har website mein same rehta hai — isko **boilerplate** kehte hain. Ismein 4 main parts hote hain: `<!DOCTYPE>`, `<html>`, `<head>` aur `<body>`. Inhe ek baar samajh lo to har page banana aasaan ho jaata hai.',
    history: {
      why: 'Browser ko ek consistent tarika chahiye tha ye samajhne ka ki page kahan se shuru hota hai, page ki info kahan hai aur dikhne wala content kahan hai.',
      when: 'Ye structure HTML ke shuruaati dino se hai, lekin HTML5 ne ise bahut simple bana diya.',
      importance: 'Galat structure se page TUT (quirks mode) mein chal sakta hai jisse design bigad jaata hai. Sahi structure = predictable page.',
    },
    theory: [
      { h: '1. <!DOCTYPE html>', p: 'Ye browser ko batata hai ki "ye HTML5 page hai". Sabse upar likhna zaroori hai. Ye tag nahi, ek declaration hai.' },
      { h: '2. <html>', p: 'Pura page isi ke andar hota hai — ye "root" (jad) element hai. `lang="hi"` likhne se browser ko bhasha pata chalti hai (accessibility/SEO ke liye accha).' },
      { h: '3. <head>', p: 'Ismein page ki "info" hoti hai jo user ko dikhti nahi — jaise title, character set, CSS links, meta tags. Soch lo ye page ka "settings" section hai.' },
      { h: '4. <body>', p: 'Jo bhi screen par dikhta hai — heading, text, image, button — sab `<body>` ke andar aata hai. Ye page ka "asli content" hai.' },
    ],
    syntax: {
      code: `<!DOCTYPE html>
<html lang="hi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Page ka Title</title>
  </head>
  <body>
    <!-- Yahan dikhne wala content aata hai -->
    <h1>Main Heading</h1>
  </body>
</html>`,
      note: 'Ye standard boilerplate hai. Har naya page isi se shuru karo.',
    },
    examples: [
      {
        level: 'Beginner',
        title: 'Minimum chalने wala page',
        code: `<!DOCTYPE html>
<html>
  <head><title>Test</title></head>
  <body><p>Chal gaya!</p></body>
</html>`,
        explain: 'Itna kaafi hai ek page chalने ke liye. Lekin real projects mein charset aur viewport zaroor add karo.',
      },
      {
        level: 'Practical',
        title: 'CSS aur JS ke saath',
        code: `<!DOCTYPE html>
<html lang="hi">
  <head>
    <meta charset="UTF-8" />
    <title>Mera App</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <h1>Welcome</h1>
    <script src="app.js"></script>
  </body>
</html>`,
        explain: 'CSS file ko head mein link karte hain, JS file ko body ke end mein — taaki page pehle dikhe phir script chale.',
      },
    ],
    visual: { type: 'tree', root: 'html', children: [
      { label: 'head', sub: 'Page ki info (dikhti nahi)', color: '#8B5CF6', children: [
        { label: 'meta', sub: 'charset, viewport' },
        { label: 'title', sub: 'Tab ka naam' },
        { label: 'link', sub: 'CSS' },
      ] },
      { label: 'body', sub: 'Dikhne wala content', color: '#22C55E', children: [
        { label: 'h1', sub: 'Heading' },
        { label: 'p', sub: 'Paragraph' },
        { label: 'img', sub: 'Image' },
      ] },
    ] },
    best: [
      '`<meta charset="UTF-8">` hamesha daalo taaki special characters (₹, é, emoji) sahi dikhe.',
      'Viewport meta tag se page mobile par sahi dikhta hai — zaroor add karo.',
      '`lang` attribute set karo (`lang="hi"` ya `lang="en"`).',
      'JS `<script>` ko `<body>` ke end mein rakho (performance ke liye).',
    ],
    mistakes: [
      { bad: 'DOCTYPE bhool jaana.', fix: 'Bina DOCTYPE ke browser "quirks mode" mein chala jaata hai aur design bigad sakta hai.' },
      { bad: 'Content ko `<head>` mein likhna.', fix: 'Dikhne wala content hamesha `<body>` mein jaata hai, `<head>` sirf info ke liye hai.' },
      { bad: 'Viewport meta tag na lagana.', fix: 'Iske bina mobile par page zoom-out aur tooti hui dikhती hai.' },
    ],
    support: 'Ye structure har browser mein 100% supported hai. HTML5 doctype purane browsers mein bhi safely chalta hai.',
    interview: {
      beginner: [
        { q: '<head> aur <body> mein kya fark hai?', a: '<head> mein page ki info (title, meta, CSS) hoti hai jo dikhti nahi. <body> mein dikhne wala content hota hai.' },
        { q: 'DOCTYPE kyun zaroori hai?', a: 'Ye browser ko batata hai ki page HTML5 hai, jisse browser standard mode mein render karta hai.' },
      ],
      intermediate: [
        { q: 'Viewport meta tag kya karta hai?', a: 'Mobile devices par page ki width ko device ki width ke barabar set karta hai, jisse responsive design sahi dikhta hai.' },
      ],
      advanced: [
        { q: 'Quirks mode kya hai?', a: 'Jab DOCTYPE missing ho, browser purane (non-standard) tarike se page render karta hai — isse layout bugs aate hain. Isko quirks mode kehte hain.' },
      ],
    },
    summary: [
      '4 parts: DOCTYPE, html, head, body.',
      'head = info (chhupa), body = content (dikhता).',
      'charset + viewport meta hamesha lagao.',
    ],
    keyPoints: [
      '`<!DOCTYPE html>` sabse upar.',
      '`<html>` root element hai.',
      'Dikhne wala sab kuch `<body>` mein.',
    ],
    exercises: {
      easy: ['Memory se pura HTML5 boilerplate likho.'],
      medium: ['Ek page banao jisme title "My Portfolio" ho aur body mein ek heading ho.'],
      challenge: ['Ek page banao jisme external CSS aur JS dono linked ho, aur batao kaunsa kahan jaata hai.'],
    },
    quiz: [
      { q: 'Dikhne wala content kahan likhte hain?', options: ['<head>', '<body>', '<title>', '<meta>'], answer: 1, explain: 'Sab visible content `<body>` mein jaata hai.' },
      { q: 'charset meta tag kis liye hai?', options: ['Page ki speed', 'Special characters sahi dikhane', 'SEO', 'Animation'], answer: 1, explain: 'UTF-8 charset special characters/emoji ko sahi render karta hai.' },
    ],
    related: ['introduction', 'tags', 'meta-tags'],
  },

  // ════════════════════════════ TAGS ════════════════════════════
  tags: {
    overview:
      'HTML **tags** wo keywords hote hain jo `< >` (angle brackets) ke beech likhe jaate hain, jaise `<p>` ya `<h1>`. Tags browser ko batate hain ki content ke saath kya karna hai. Zyादातर tags **jode (pair)** mein aate hain — ek *opening tag* `<p>` aur ek *closing tag* `</p>`.',
    history: {
      why: 'Content ko "mark" karne ke liye ek aasaan syntax chahiye tha — angle brackets `< >` isi ke liye chune gaye.',
      when: 'Tags HTML ke pehle din se hain (1991).',
      importance: 'Tags hi HTML ki buniyaad (foundation) hain — inke bina koi structure nahi banta.',
    },
    theory: [
      { h: 'Opening aur Closing tag', p: 'Opening tag `<p>` content ki shuruaat batata hai, closing tag `</p>` (slash ke saath) ant batata hai. Beech mein content hota hai.' },
      { h: 'Self-closing (empty) tags', p: 'Kuch tags ka content nahi hota, isliye unka closing tag nahi hota — jaise `<img>`, `<br>`, `<hr>`, `<input>`. Inhe empty ya void tags kehte hain.' },
      { h: 'Tags ko nest karna', p: 'Tags ek doosre ke andar aa sakte hain (nesting), lekin sahi order mein close karna zaroori hai. `<b><i>text</i></b>` sahi hai, `<b><i>text</b></i>` galat.' },
    ],
    syntax: {
      code: `<!-- Paired tag -->
<p>Ye ek paragraph hai.</p>

<!-- Self-closing / void tag -->
<br />
<img src="cat.jpg" alt="billi" />

<!-- Nesting (andar-andar) -->
<p>Ye <strong>important</strong> hai.</p>`,
      note: 'Opening tag, content, closing tag — ye basic pattern yaad rakho.',
    },
    examples: [
      {
        level: 'Beginner',
        title: 'Paired vs void tag',
        code: `<h1>Title</h1>      <!-- pair -->
<hr />              <!-- void: ek horizontal line -->
<p>Neeche text.</p> <!-- pair -->`,
        explain: 'h1 aur p ko close karna padta hai, hr apne aap close ho jaata hai.',
      },
    ],
    visual: { type: 'anatomy' },
    best: [
      'Hamesha tag ko sahi se close karo.',
      'Lowercase tags use karo.',
      'Nesting sahi order mein band karo (jo pehle khula wo baad mein band).',
    ],
    mistakes: [
      { bad: '`<p>Text` — closing tag bhool jaana.', fix: '`<p>Text</p>` — har paired tag ko close karo.' },
      { bad: '`<b><i>x</b></i>` — galat nesting.', fix: '`<b><i>x</i></b>` — andar wala pehle band hota hai.' },
    ],
    support: 'Sab tags sab browsers mein supported hain (purane deprecated tags chhod kar).',
    interview: {
      beginner: [
        { q: 'Tag aur element mein kya fark hai?', a: 'Tag sirf `<p>` ya `</p>` hota hai. Element = opening tag + content + closing tag (pura `<p>...</p>`).' },
      ],
      intermediate: [
        { q: 'Void tags kya hote hain? 3 example do.', a: 'Jinka closing tag nahi hota — `<img>`, `<br>`, `<hr>`, `<input>`, `<meta>`.' },
      ],
      advanced: [
        { q: 'Kya `<br/>` aur `<br>` mein fark hai?', a: 'HTML5 mein dono valid hain. Slash optional hai. XHTML mein slash zaroori tha.' },
      ],
    },
    summary: [
      'Tags `< >` ke beech likhe jaate hain.',
      'Zyादातर tags pair mein (open + close).',
      'Void tags (img, br, hr) self-closing hote hain.',
    ],
    keyPoints: ['Opening: `<p>`, Closing: `</p>`.', 'Void tags close nahi hote.', 'Nesting ka order maintain karo.'],
    exercises: {
      easy: ['3 paired tags aur 3 void tags likho.'],
      medium: ['Ek paragraph banao jisme ek shabd bold aur ek italic ho (nesting use karo).'],
      challenge: ['Galat nesting wala code dhoondo aur theek karo: `<p><b>Hi</p></b>`.'],
    },
    quiz: [
      { q: 'Inme se kaunsa void (self-closing) tag hai?', options: ['<p>', '<img>', '<div>', '<h1>'], answer: 1, explain: '<img> ka content nahi hota, isliye self-closing hai.' },
      { q: 'Closing tag kaise likhte hain?', options: ['<p>', '<p/>', '</p>', '<\\p>'], answer: 2, explain: 'Closing tag mein slash naam se pehle: `</p>`.' },
    ],
    related: ['elements', 'attributes', 'document-structure'],
  },

  // ════════════════════════════ ELEMENTS ════════════════════════════
  elements: {
    overview:
      'Ek HTML **element** = opening tag + content + closing tag, sab milakar. Jaise `<p>Namaste</p>` ek pura element hai. Log "tag" aur "element" ko same samajhte hain, lekin **tag sirf `<p>` hota hai, jabki element pura `<p>...</p>` hota hai.**',
    theory: [
      { h: 'Element ke teen hisse', p: 'Opening tag (`<h1>`), content (`Hello`), closing tag (`</h1>`). Teeno milke element banta hai.' },
      { h: 'Empty elements', p: 'Kuch elements ka content nahi hota jaise `<img>` ya `<br>`. Inhe empty elements kehte hain — sirf ek tag se kaam ho jaata hai.' },
      { h: 'Nested elements', p: 'Element ke andar element ho sakta hai. Pura HTML page asal mein elements ka ek tree (ped) hota hai jise DOM kehte hain.' },
    ],
    syntax: {
      code: `<!-- Pura element -->
<h1>Main Heading</h1>
 │       │        │
 opening content closing
 tag              tag

<!-- Empty element (sirf tag) -->
<img src="logo.png" alt="Logo" />`,
      note: 'Element = tag + content + tag. Empty element = sirf ek tag.',
    },
    examples: [
      {
        level: 'Beginner',
        title: 'Element pehchano',
        code: `<p>Ye <a href="#">link</a> hai.</p>`,
        explain: 'Yahan do elements hain: bahar wala `<p>` element, aur andar wala `<a>` element (nested).',
      },
    ],
    visual: { type: 'anatomy' },
    best: [
      'Har element ko sahi se band karo.',
      'Elements ko sahi tarike se nest karo (tree structure maintain karo).',
      'Sahi element sahi kaam ke liye use karo (heading ke liye `<h1>`, na ki bada `<p>`).',
    ],
    mistakes: [
      { bad: 'Tag aur element ko same samajhna.', fix: 'Tag = `<p>`. Element = `<p>content</p>` (pura).' },
      { bad: 'Heading dikhane ke liye bold paragraph use karna.', fix: 'Heading ke liye `<h1>`-`<h6>` use karo — ye semantic aur SEO ke liye sahi hai.' },
    ],
    support: 'Sab standard elements har modern browser mein supported hain.',
    interview: {
      beginner: [
        { q: 'Element kya hota hai?', a: 'Opening tag + content + closing tag — teeno milkar ek element.' },
      ],
      intermediate: [
        { q: 'Empty element kya hai?', a: 'Jiska content aur closing tag nahi hota, jaise `<img>`, `<br>`, `<input>`.' },
      ],
      advanced: [
        { q: 'DOM kya hai?', a: 'Document Object Model — browser HTML elements ko ek tree (object) ke roop mein represent karta hai jise JS access kar sakta hai.' },
      ],
    },
    summary: [
      'Element = opening + content + closing tag.',
      'Tag aur element alag cheezein hain.',
      'Empty elements (img, br) ka content nahi hota.',
    ],
    keyPoints: ['Element pura hota hai, tag ek piece.', 'Page = elements ka tree (DOM).'],
    exercises: {
      easy: ['Ek line likho jisme 2 elements ho.'],
      medium: ['Ek nested element banao (element ke andar element).'],
      challenge: ['Diagram banao jo `<p>Hi <b>there</b></p>` ka tree dikhaye.'],
    },
    quiz: [
      { q: 'Element kis-kis se milkar banta hai?', options: ['Sirf opening tag', 'Opening + content + closing tag', 'Sirf content', 'Sirf closing tag'], answer: 1, explain: 'Teeno milkar element banate hain.' },
    ],
    related: ['tags', 'attributes', 'block-inline'],
  },

  // ════════════════════════════ ATTRIBUTES ════════════════════════════
  attributes: {
    overview:
      '**Attributes** tags ko *extra information* dete hain. Ye opening tag ke andar likhe jaate hain aur `name="value"` format mein hote hain. Jaise `<img src="cat.jpg">` mein `src` ek attribute hai jo batata hai ki image kahan se laani hai.',
    history: {
      why: 'Sirf tag se kaam nahi chalta — image ko kahan se laana hai, link kahan jaayega, ye batane ke liye attributes chahiye the.',
      when: 'Attributes HTML ke shuru se hain. HTML5 ne `data-*` jaise custom attributes diye.',
      importance: 'Attributes ke bina links, images, forms — kuch kaam nahi karte.',
    },
    theory: [
      { h: 'Format: name="value"', p: 'Attribute ka naam, phir `=`, phir value double quotes mein. Jaise `href="https://google.com"`.' },
      { h: 'Common attributes', p: '`href` (link ka address), `src` (image/file source), `alt` (image ka text backup), `id` aur `class` (naam dene ke liye), `style` (inline CSS).' },
      { h: 'Boolean attributes', p: 'Kuch attributes ki value nahi hoti — sirf likhna hi kaafi hai, jaise `disabled`, `required`, `checked`. Inka hona hi "true" hai.' },
    ],
    syntax: {
      code: `<a href="https://google.com" target="_blank">Google</a>
<img src="cat.jpg" alt="ek billi" width="200" />
<input type="text" placeholder="Naam likho" required />
<button disabled>Click nahi hoga</button>`,
      note: 'Attribute hamesha opening tag mein, name="value" format mein.',
    },
    examples: [
      {
        level: 'Beginner',
        title: 'Link with attributes',
        code: `<a href="about.html" title="About page">Mere baare mein</a>`,
        explain: '`href` batata hai link kahan jaayega, `title` hover par tooltip dikhata hai.',
      },
      {
        level: 'Practical',
        title: 'Custom data attribute',
        code: `<button data-user-id="42" data-role="admin">Profile</button>`,
        explain: '`data-*` attributes apni custom info store karne ke liye hote hain — JavaScript inhe padh sakta hai.',
      },
    ],
    best: [
      'Attribute values ko hamesha double quotes mein likho.',
      '`alt` attribute har image par lagao (accessibility + SEO).',
      'Custom data ke liye `data-*` attributes use karo.',
    ],
    mistakes: [
      { bad: 'Quotes bhool jaana: `<a href=about.html>`.', fix: 'Quotes lagao: `<a href="about.html">` — spaces wali values toot sakti hain.' },
      { bad: 'Image par `alt` na dena.', fix: 'Hamesha `alt` do — blind users aur tooti images ke liye zaroori.' },
    ],
    support: 'Standard attributes sab browsers mein chalte hain. `data-*` HTML5 se supported hai (har modern browser).',
    interview: {
      beginner: [
        { q: 'Attribute kya hota hai?', a: 'Tag ko extra info dene wali cheez, jaise `src`, `href`, `alt` — name="value" format mein.' },
      ],
      intermediate: [
        { q: 'Boolean attribute kya hai? Example?', a: 'Jiski value nahi hoti, sirf presence matter karti hai — `disabled`, `required`, `checked`.' },
      ],
      advanced: [
        { q: '`data-*` attributes ka kya use hai?', a: 'Custom data ko HTML mein store karne ke liye, jo JavaScript `dataset` property se access kar sakta hai.' },
      ],
    },
    summary: [
      'Attributes tag ko extra info dete hain.',
      'Format: `name="value"`, opening tag mein.',
      'Common: href, src, alt, id, class.',
    ],
    keyPoints: ['Values double quotes mein.', '`alt` har image par.', 'Boolean attrs sirf likhne se on.'],
    exercises: {
      easy: ['Ek image tag likho jisme src, alt aur width ho.'],
      medium: ['Ek link banao jo nayi tab mein khule (`target="_blank"`).'],
      challenge: ['Ek button par 2 custom `data-*` attributes lagao.'],
    },
    quiz: [
      { q: 'Attribute ka sahi format kya hai?', options: ['value=name', 'name="value"', 'name->value', '{name:value}'], answer: 1, explain: '`name="value"` — naam, equals, value quotes mein.' },
      { q: 'Image ka backup text kaunsा attribute deta hai?', options: ['src', 'title', 'alt', 'href'], answer: 2, explain: '`alt` image ka text alternative deta hai.' },
    ],
    related: ['tags', 'elements', 'class-id'],
  },

  // ════════════════════════════ HEADINGS ════════════════════════════
  headings: {
    overview:
      'Headings page ke titles aur sub-titles hote hain. HTML mein 6 heading levels hain: `<h1>` (sabse badi) se `<h6>` (sabse chhoti) tak. `<h1>` page ka main title hota hai, baaki sub-sections ke liye.',
    theory: [
      { h: 'Hierarchy (kram) zaroori hai', p: '`<h1>` sabse important, phir `<h2>`, phir `<h3>`... Sahi order mein use karo — level skip mat karo (h1 ke baad seedha h4 mat lagao).' },
      { h: 'Ek page par ek hi h1', p: 'Best practice — har page par sirf ek `<h1>` ho jo page ka main topic batata hai. SEO ke liye accha.' },
      { h: 'Size ke liye nahi, meaning ke liye', p: 'Heading ko sirf "bada dikhne" ke liye mat use karo — wo CSS ka kaam hai. Heading meaning (structure) ke liye hai.' },
    ],
    syntax: {
      code: `<h1>Sabse Badi Heading</h1>
<h2>Section Heading</h2>
<h3>Sub-section</h3>
<h4>Chhoti heading</h4>
<h5>Aur chhoti</h5>
<h6>Sabse chhoti heading</h6>`,
      note: 'h1 se h6 — number jitna bada, heading utni chhoti.',
    },
    examples: [
      {
        level: 'Practical',
        title: 'Blog post structure',
        code: `<h1>HTML Seekho</h1>
  <h2>Introduction</h2>
  <h2>Tags</h2>
    <h3>Paired Tags</h3>
    <h3>Void Tags</h3>`,
        explain: 'h1 pura blog ka title, h2 main sections, h3 unke andar sub-points. Ye proper hierarchy hai.',
      },
    ],
    visual: { type: 'boxes', items: [
      { label: 'h1', sub: 'Main title', color: '#6366F1' },
      { label: 'h2', sub: 'Section', color: '#8B5CF6' },
      { label: 'h3-h6', sub: 'Sub-sections', color: '#22C55E' },
    ] },
    best: [
      'Page par sirf ek `<h1>` rakho.',
      'Heading levels order mein use karo, skip mat karo.',
      'Bada dikhane ke liye CSS use karo, heading tag nahi.',
    ],
    mistakes: [
      { bad: 'Sirf bade font ke liye `<h1>` use karna.', fix: 'Size CSS se badhao; heading tag meaning ke liye hai.' },
      { bad: 'Level skip karna (h1 → h4).', fix: 'Sequence maintain karo: h1 → h2 → h3.' },
    ],
    support: 'h1-h6 har browser mein 100% supported.',
    interview: {
      beginner: [
        { q: 'Kitne heading levels hote hain?', a: '6 — h1 se h6 tak.' },
        { q: 'Sabse important heading kaunsi?', a: '`<h1>` — page ka main title.' },
      ],
      intermediate: [
        { q: 'Ek page par kitne h1 hone chahiye?', a: 'Best practice ek h1 — page ke main topic ke liye.' },
      ],
      advanced: [
        { q: 'Headings SEO ko kaise affect karti hain?', a: 'Search engines headings se page ka structure aur topics samajhte hain. Sahi hierarchy ranking aur accessibility dono ko help karti hai.' },
      ],
    },
    summary: ['6 levels: h1 (badi) se h6 (chhoti).', 'Ek page = ek h1.', 'Hierarchy meaning ke liye, size ke liye nahi.'],
    keyPoints: ['h1 = main title.', 'Level skip mat karo.', 'SEO ke liye headings important.'],
    exercises: {
      easy: ['Saari 6 headings likhkar browser mein farq dekho.'],
      medium: ['Ek recipe page ki heading hierarchy banao (title, sections, steps).'],
      challenge: ['Ek galat hierarchy theek karo jisme h1 ke baad h3 aata hai.'],
    },
    quiz: [
      { q: 'Kitne heading tags hote hain?', options: ['3', '5', '6', '10'], answer: 2, explain: 'h1 se h6 — total 6.' },
      { q: 'Sabse chhoti heading kaunsi?', options: ['h1', 'h3', 'h6', 'h10'], answer: 2, explain: 'h6 sabse chhoti heading hai.' },
    ],
    related: ['paragraphs', 'formatting', 'seo'],
  },

  // ════════════════════════════ LINKS ════════════════════════════
  links: {
    overview:
      'Links (anchor) ek page se doosre page par jaane ka rasta hain. Ye `<a>` tag se bante hain aur `href` attribute mein destination ka address hota hai. Yahi "HyperText" ka asli jaadू hai — click karo aur kahin bhi pahunch jao.',
    history: {
      why: 'Documents ko aapas mein jodne ke liye links banaye gaye — yahi web ka core idea tha.',
      when: '`<a>` tag HTML ke pehle version (1991) se hai.',
      importance: 'Links ke bina web "web" (jaal) nahi banta — har website pages ko links se jodti hai.',
    },
    theory: [
      { h: 'href = destination', p: '`<a href="...">` mein href batata hai click karne par kahan jaana hai — ek website, ek page, ya page ke andar ek section.' },
      { h: 'Types of links', p: 'External (doosri website), Internal (apni hi site ka page), Anchor (same page ka section `#id`), aur special (`mailto:`, `tel:`).' },
      { h: 'target attribute', p: '`target="_blank"` link ko nayi tab mein kholta hai. Iske saath `rel="noopener noreferrer"` security ke liye lagao.' },
    ],
    syntax: {
      code: `<!-- External link -->
<a href="https://google.com">Google</a>

<!-- Internal page -->
<a href="about.html">About</a>

<!-- Same page section -->
<a href="#contact">Contact section</a>

<!-- Email aur phone -->
<a href="mailto:hi@test.com">Email karo</a>
<a href="tel:+919876543210">Call karo</a>

<!-- Nayi tab mein -->
<a href="https://x.com" target="_blank" rel="noopener noreferrer">X kholo</a>`,
      note: 'Sab links `<a>` tag se, bas href ki value badalti hai.',
    },
    examples: [
      {
        level: 'Beginner',
        title: 'Simple link',
        code: `<a href="https://youtube.com">YouTube par jao</a>`,
        explain: 'Click karne par YouTube khulega. Text "YouTube par jao" clickable hota hai.',
      },
      {
        level: 'Practical',
        title: 'Image ko link banana',
        code: `<a href="home.html">
  <img src="logo.png" alt="Logo" />
</a>`,
        explain: 'Image ko `<a>` ke andar daalo to image bhi clickable link ban jaati hai (jaise website ka logo).',
      },
    ],
    best: [
      'Link text descriptive rakho ("yahan click karo" nahi, "Resume download karo" likho).',
      'External links par `rel="noopener noreferrer"` lagao.',
      'Toote (broken) links check karte raho.',
    ],
    mistakes: [
      { bad: 'Link text "click here" likhna.', fix: 'Meaningful text likho — accessibility aur SEO dono behtar.' },
      { bad: '`target="_blank"` bina `rel` ke.', fix: 'Security risk — hamesha `rel="noopener noreferrer"` add karo.' },
    ],
    support: '`<a>` tag har browser mein supported. `mailto:`/`tel:` device ke app par depend karte hain.',
    interview: {
      beginner: [
        { q: 'Link kaunsे tag se banta hai?', a: '`<a>` (anchor) tag se, `href` attribute ke saath.' },
      ],
      intermediate: [
        { q: '`target="_blank"` kya karta hai?', a: 'Link ko nayi browser tab/window mein kholta hai.' },
      ],
      advanced: [
        { q: '`rel="noopener noreferrer"` kyun zaroori hai?', a: 'noopener nayi tab ko original page ko control karne se rokta hai (security), noreferrer referrer info nahi bhejता.' },
      ],
    },
    summary: ['Links `<a href="...">` se bante hain.', 'Types: external, internal, anchor, mailto/tel.', '`target="_blank"` = nayi tab.'],
    keyPoints: ['href = destination.', '#id = same page section.', 'External links par rel lagao.'],
    exercises: {
      easy: ['3 links banao: ek website, ek email, ek phone number.'],
      medium: ['Ek page banao jisme "Top" button neeche se upar (`#top`) le jaaye.'],
      challenge: ['Ek navigation bar banao 4 links ke saath jo alag pages par jaaye.'],
    },
    quiz: [
      { q: 'Link ka destination kaunsा attribute set karta hai?', options: ['src', 'link', 'href', 'to'], answer: 2, explain: '`href` link ka destination batata hai.' },
      { q: 'Same page ke section par jaane ke liye href kya hoga?', options: ['page.html', '#section', 'mailto:', 'http://'], answer: 1, explain: '`#section` us id wale element par scroll karta hai.' },
    ],
    related: ['images', 'attributes', 'accessibility'],
  },

  // ════════════════════════════ IMAGES ════════════════════════════
  images: {
    overview:
      'Images page mein photos dikhane ke liye `<img>` tag use hota hai. Ye ek **void tag** hai (closing nahi hota). Do important attributes: `src` (image kahan hai) aur `alt` (agar image na dikhe to kya text dikhe).',
    theory: [
      { h: 'src = image ka address', p: '`src` mein image ka path hota hai — local file (`photo.jpg`) ya internet URL (`https://...jpg`).' },
      { h: 'alt = backup text', p: 'Agar image load na ho ya user blind ho (screen reader), to `alt` ka text kaam aata hai. SEO ke liye bhi zaroori.' },
      { h: 'width aur height', p: 'Image ka size set kar sakte ho. Best practice — width/height dena taaki page load hote waqt jagah reserve rahe (layout jump na ho).' },
    ],
    syntax: {
      code: `<img src="photo.jpg" alt="Mountain ka view" width="400" height="300" />

<!-- Internet se image -->
<img src="https://picsum.photos/400" alt="Random image" />`,
      note: '`<img>` self-closing hai. src aur alt dono zaroor do.',
    },
    examples: [
      {
        level: 'Beginner',
        title: 'Local image',
        code: `<img src="images/dog.jpg" alt="Mera kutta" />`,
        explain: 'src mein folder ka path — yahan "images" folder ke andar dog.jpg.',
      },
      {
        level: 'Practical',
        title: 'Responsive image',
        code: `<img src="banner.jpg" alt="Sale banner"
     style="width:100%; height:auto;" />`,
        explain: 'width 100% aur height auto se image apne container ke hisaab se chhoti-badi hoti hai — mobile par sahi dikhti hai.',
      },
    ],
    best: [
      'Har image par meaningful `alt` do.',
      'width/height set karo (layout shift roko).',
      'Modern format use karo (WebP) — fast load hota hai.',
      'Image file size optimize karo (compress).',
    ],
    mistakes: [
      { bad: '`alt` na dena.', fix: 'Accessibility/SEO ke liye `alt` zaroori. Decorative image ke liye `alt=""` do.' },
      { bad: 'Bahut bada image (5MB) use karna.', fix: 'Compress karo — bada image page slow karta hai.' },
    ],
    support: 'JPG, PNG, GIF har jagah chalti hain. WebP modern browsers mein (99%+) supported hai.',
    interview: {
      beginner: [
        { q: '`<img>` paired tag hai ya void?', a: 'Void (self-closing) — iska closing tag nahi hota.' },
        { q: '`alt` attribute kyun zaroori hai?', a: 'Image na dikhe to text dikhane, screen readers ke liye, aur SEO ke liye.' },
      ],
      intermediate: [
        { q: 'Image responsive kaise banate hain?', a: '`width:100%; height:auto` ya CSS `max-width:100%` se, ya `<picture>`/`srcset` se.' },
      ],
      advanced: [
        { q: 'Layout shift (CLS) kya hai aur kaise roke?', a: 'Image load hone par content ka hilna. width/height ya aspect-ratio set karke jagah reserve karo.' },
      ],
    },
    summary: ['`<img>` void tag se images.', 'src = path, alt = backup text.', 'width/height set karo.'],
    keyPoints: ['alt har image par.', 'WebP fast hota hai.', 'Compress karke use karo.'],
    exercises: {
      easy: ['Ek image dikhao with proper alt.'],
      medium: ['3 images ek row mein dikhao.'],
      challenge: ['Ek image ko clickable link banao jo bade version par jaaye.'],
    },
    quiz: [
      { q: 'Image ka source kaunsा attribute batata hai?', options: ['href', 'src', 'link', 'img'], answer: 1, explain: '`src` image ka path/URL batata hai.' },
      { q: '`<img>` kaunsे type ka tag hai?', options: ['Paired', 'Void/self-closing', 'Block container', 'Comment'], answer: 1, explain: '`<img>` void tag hai — closing tag nahi hota.' },
    ],
    related: ['links', 'attributes', 'accessibility'],
  },

  // ════════════════════════════ FORMS ════════════════════════════
  forms: {
    overview:
      'Forms se users data daalte hain — login, signup, search, contact — sab forms hote hain. Form `<form>` tag se banta hai aur uske andar inputs, buttons hote hain. Jab user submit karta hai, data kisi server ko bhej diya jaata hai.',
    history: {
      why: 'Web ko sirf padhne ki jagah se "interactive" banane ke liye — users se input lene ka tarika chahiye tha.',
      when: 'Forms HTML 2.0 (1995) mein aaye. HTML5 ne naye input types aur validation diye.',
      importance: 'Har login, payment, search, comment — sab forms par chalta hai. Backend se baat karne ka main zariya.',
    },
    theory: [
      { h: '<form> container', p: '`<form>` sab inputs ko ghera deta hai. `action` batata hai data kahan jaayega, `method` batata hai kaise (GET ya POST).' },
      { h: '<input> aur <label>', p: '`<input>` data box hota hai. `<label>` uska naam batata hai. Dono ko jodo `for`/`id` se — accessibility ke liye zaroori.' },
      { h: 'name attribute', p: 'Har input ka `name` hona chahiye — isi naam se server data pehchानता hai. Bina name ke data bheja nahi jaata.' },
      { h: 'Submit button', p: '`<button type="submit">` form ko bhejta hai. Type "submit" default hota hai button ke andar form ke.' },
    ],
    syntax: {
      code: `<form action="/submit" method="post">
  <label for="naam">Naam:</label>
  <input type="text" id="naam" name="naam" required />

  <label for="email">Email:</label>
  <input type="email" id="email" name="email" required />

  <label for="msg">Message:</label>
  <textarea id="msg" name="msg" rows="4"></textarea>

  <button type="submit">Bhejo</button>
</form>`,
      note: 'label + input jode mein, har input ka name, aur ek submit button.',
    },
    examples: [
      {
        level: 'Beginner',
        title: 'Simple login form',
        code: `<form>
  <input type="text" name="user" placeholder="Username" />
  <input type="password" name="pass" placeholder="Password" />
  <button type="submit">Login</button>
</form>`,
        explain: 'Username text box, password (chhupa hua) box, aur login button — basic login form.',
      },
      {
        level: 'Practical',
        title: 'Validation ke saath',
        code: `<form>
  <input type="email" name="email" required
         placeholder="Email daalo" />
  <input type="number" name="age" min="18" max="100" />
  <button>Register</button>
</form>`,
        explain: '`required` khali nahi chhodne deta, `type="email"` galat email rokта hai, `min`/`max` age limit karte hain — sab browser khud check karta hai.',
      },
    ],
    best: [
      'Har input ke saath `<label>` do (for/id se jodo).',
      'Sahi input type use karo (email, tel, number) — mobile par sahi keyboard aata hai.',
      'Client aur server dono par validation karo.',
      '`required`, `minlength` jaise HTML validation use karo.',
    ],
    mistakes: [
      { bad: 'Input par `name` na dena.', fix: 'Bina `name` ke us input ka data submit nahi hota.' },
      { bad: 'Label na dena.', fix: 'Label se accessibility behtar — screen reader user ko pata chalta hai box kis cheez ke liye hai.' },
      { bad: 'Sirf client-side validation par bharosa.', fix: 'Server par bhi validate karo — client validation bypass ho sakti hai.' },
    ],
    support: 'Forms aur HTML5 validation har modern browser mein supported hain.',
    interview: {
      beginner: [
        { q: 'Form kis tag se banta hai?', a: '`<form>` tag se, jiske andar inputs aur button hote hain.' },
        { q: '`action` attribute kya karta hai?', a: 'Batata hai form ka data kis URL par bheja jaayega.' },
      ],
      intermediate: [
        { q: 'GET aur POST method mein fark?', a: 'GET data URL mein bhejta hai (visible, chhota data, search). POST data body mein (hidden, bada/sensitive data jaise password).' },
        { q: 'Label ko input se kaise jodte hain?', a: 'Label ke `for` ko input ke `id` ke barabar rakho: `<label for="x">` aur `<input id="x">`.' },
      ],
      advanced: [
        { q: 'Client-side validation par akele bharosa kyun nahi?', a: 'User JS off kar sakta hai ya request modify kar sakta hai — isliye server par bhi validate karna zaroori hai.' },
      ],
    },
    summary: [
      'Forms users se data lete hain.',
      '`<form>` + inputs + submit button.',
      'Har input ka `name` zaroori, har input par label.',
      'GET (URL) vs POST (body).',
    ],
    keyPoints: ['action = kahan, method = kaise.', 'label for = input id.', 'name ke bina data nahi jaata.'],
    exercises: {
      easy: ['Ek contact form banao: naam, email, message, submit.'],
      medium: ['Ek signup form jisme email validation aur required fields ho.'],
      challenge: ['Ek form banao jisme radio buttons, checkbox aur dropdown teeno ho.'],
    },
    quiz: [
      { q: 'Form data kahan jaayega — kaunsा attribute batata hai?', options: ['method', 'action', 'name', 'href'], answer: 1, explain: '`action` destination URL batata hai.' },
      { q: 'Password ke liye kaunsा input type?', options: ['text', 'secret', 'password', 'hidden'], answer: 2, explain: '`type="password"` characters ko chhupa deta hai.' },
    ],
    related: ['input-types', 'attributes', 'accessibility'],
  },

  // ════════════════════════════ CONCISE TOPICS ════════════════════════════
  paragraphs: {
    overview: 'Paragraph `<p>` tag se banta hai — ye text ka ek block hota hai. Browser har paragraph ke upar-neeche thodi jagah (margin) automatic deta hai. Line ttodne ke liye `<br>` aur horizontal line ke liye `<hr>` use hota hai.',
    theory: [
      { h: '<p> = text block', p: 'Jab bhi normal text likhna ho, `<p>` mein likho. Multiple spaces aur new lines browser ignore karta hai — wo automatic ek hi space dikhata hai.' },
      { h: '<br> aur <hr>', p: '`<br>` ek line break deta hai (nayi line). `<hr>` ek horizontal divider line banata hai. Dono void tags hain.' },
    ],
    syntax: { code: `<p>Ye pehla paragraph hai.</p>
<p>Ye doosra paragraph hai.<br />Ye nayi line par.</p>
<hr />`, note: '<p> block text ke liye, <br> line break, <hr> divider.' },
    examples: [{ level: 'Beginner', title: 'Do paragraphs', code: `<p>Mera naam Mayank hai.</p>
<p>Main HTML seekh raha hoon.</p>`, explain: 'Dono alag blocks hain, beech mein gap automatic aata hai.' }],
    best: ['Text hamesha `<p>` mein rakho.', 'Layout spacing ke liye `<br>` ka galat use mat karo — wo CSS ka kaam hai.'],
    mistakes: [{ bad: 'Khaali jagah ke liye bahut saare `<br>` lagana.', fix: 'Spacing CSS margin se karo, `<br>` sirf genuine line break ke liye.' }],
    keyPoints: ['`<p>` = paragraph.', '`<br>` = line break (void).', 'Extra spaces ignore hote hain.'],
    summary: ['Paragraph `<p>` se.', 'Browser extra space/lines collapse karta hai.', '`<br>` aur `<hr>` void tags.'],
    quiz: [{ q: 'Paragraph kaunsे tag se banta hai?', options: ['<para>', '<p>', '<text>', '<pg>'], answer: 1, explain: '`<p>` paragraph banata hai.' }],
    related: ['headings', 'formatting', 'tags'],
  },

  formatting: {
    overview: 'Formatting tags text ko bold, italic, underline, highlight wagairah banate hain. Jaise `<strong>` important text ke liye, `<em>` zor (emphasis) ke liye. Ye chhote-chhote tags text ko meaning aur look dono dete hain.',
    theory: [
      { h: 'Meaning wale tags', p: '`<strong>` (important, bold dikhता), `<em>` (emphasis, italic dikhता) — ye semantic hain, screen readers inhe samajhte hain.' },
      { h: 'Sirf look wale tags', p: '`<b>` (bold), `<i>` (italic), `<u>` (underline), `<mark>` (highlight), `<small>`, `<sub>`/`<sup>` (neeche/upar) — ye sirf dikhne ke liye.' },
    ],
    syntax: { code: `<p><strong>Important</strong> aur <em>zor diya</em>.</p>
<p><mark>Highlight</mark>, <sub>2</sub>, <sup>nd</sup>, <del>kaata</del></p>`, note: 'strong/em meaning ke saath, b/i sirf look.' },
    examples: [{ level: 'Beginner', title: 'Mix formatting', code: `<p>Price: <del>₹999</del> <strong>₹499</strong></p>`, explain: '`<del>` kati hui price dikhata hai, `<strong>` nayi price highlight karta hai.' }],
    best: ['Meaning ke liye `<strong>`/`<em>` prefer karo.', 'Sirf design ke liye CSS use karo, formatting tags nahi.'],
    mistakes: [{ bad: 'Headings ke liye `<b>` use karna.', fix: 'Heading ke liye h1-h6 use karo.' }],
    keyPoints: ['`<strong>` = important.', '`<em>` = emphasis.', '`<mark>` = highlight.'],
    summary: ['Formatting tags text ko style/meaning dete hain.', 'strong/em semantic, b/i visual.'],
    quiz: [{ q: 'Important text ke liye semantic tag?', options: ['<b>', '<strong>', '<big>', '<important>'], answer: 1, explain: '`<strong>` semantic important tag hai.' }],
    related: ['paragraphs', 'headings', 'entities'],
  },

  comments: {
    overview: 'Comments wo notes hote hain jo code mein likhe jaate hain lekin browser unhe dikhata nahi. Ye `<!-- -->` ke beech likhe jaate hain. Inka use code samjhane ya temporary kuch hide karne ke liye hota hai.',
    theory: [{ h: 'Syntax', p: '`<!--` se shuru, `-->` par khatam. Beech mein kuch bhi likho — wo page par nahi dikhega lekin code mein rahega.' }],
    syntax: { code: `<!-- Ye ek comment hai, dikhega nahi -->
<p>Ye dikhega</p>
<!-- <p>Ye temporarily band hai</p> -->`, note: 'Comments page par invisible hote hain.' },
    examples: [{ level: 'Beginner', title: 'Section label', code: `<!-- Header section shuru -->
<header>...</header>
<!-- Header section khatam -->`, explain: 'Bade code mein sections ko comment se label karna padhne mein madad karta hai.' }],
    best: ['Comments se code ke tricky parts samjhao.', 'Sensitive info (password) comments mein mat likho — wo page source mein dikhता hai.'],
    mistakes: [{ bad: 'Comment nest karna `<!-- a <!-- b --> -->`.', fix: 'HTML comments nest nahi hote — alag-alag likho.' }],
    keyPoints: ['`<!-- -->` syntax.', 'Browser ignore karta hai.', 'View-source mein dikhता hai (secret na rakho).'],
    summary: ['Comments code mein notes hote hain.', 'Page par invisible.', 'Code samjhane/temporarily hide karne ke liye.'],
    quiz: [{ q: 'HTML comment kaise likhte hain?', options: ['// comment', '/* comment */', '<!-- comment -->', '# comment'], answer: 2, explain: 'HTML mein `<!-- -->` comment syntax hai.' }],
    related: ['tags', 'best-practices'],
  },

  lists: {
    overview: 'Lists items ko ek kram mein dikhane ke liye hoti hain. Teen type: `<ul>` (bullet points), `<ol>` (numbered), aur `<dl>` (definition list). Har item `<li>` (list item) mein hota hai.',
    theory: [
      { h: 'Unordered list <ul>', p: 'Bullet points (•) wali list — jab order important na ho, jaise shopping list.' },
      { h: 'Ordered list <ol>', p: 'Numbered list (1,2,3) — jab order matter kare, jaise steps/recipe.' },
      { h: 'Nesting', p: 'List ke andar list daal sakte ho (sub-points), bas `<li>` ke andar nayi `<ul>`/`<ol>`.' },
    ],
    syntax: { code: `<ul>
  <li>Doodh</li>
  <li>Bread</li>
</ul>

<ol>
  <li>Pani ubaalo</li>
  <li>Chai patti daalo</li>
</ol>`, note: 'ul = bullets, ol = numbers, har item li mein.' },
    examples: [{ level: 'Practical', title: 'Nested menu', code: `<ul>
  <li>Frontend
    <ul>
      <li>HTML</li>
      <li>CSS</li>
    </ul>
  </li>
  <li>Backend</li>
</ul>`, explain: 'Frontend ke andar HTML aur CSS sub-list hain — navigation menus aise hi bante hain.' }],
    best: ['Sahi list type chuno (order matter kare to ol).', 'Navigation menus ke liye `<ul>` use karo.'],
    mistakes: [{ bad: '`<li>` ko `<ul>`/`<ol>` ke bahar likhna.', fix: 'Har `<li>` kisi list ke andar hona chahiye.' }],
    keyPoints: ['ul = bullets.', 'ol = numbers.', 'li = har item.'],
    summary: ['3 list types: ul, ol, dl.', 'Items `<li>` mein.', 'Lists nest ho sakti hain.'],
    quiz: [
      { q: 'Numbered list kaunsी?', options: ['<ul>', '<ol>', '<li>', '<dl>'], answer: 1, explain: '`<ol>` ordered (numbered) list hai.' },
      { q: 'List item kaunsे tag se?', options: ['<item>', '<li>', '<list>', '<p>'], answer: 1, explain: '`<li>` list item hai.' },
    ],
    related: ['tables', 'semantic', 'paragraphs'],
  },

  tables: {
    overview: 'Tables data ko rows aur columns mein dikhane ke liye hoti hain — jaise Excel sheet. `<table>` container hai, `<tr>` row, `<th>` header cell, `<td>` data cell. Tables sirf "tabular data" ke liye use karo, layout ke liye nahi.',
    theory: [
      { h: 'Basic parts', p: '`<table>` (pura table), `<tr>` (table row), `<th>` (header cell — bold/center), `<td>` (normal data cell).' },
      { h: 'Structure tags', p: '`<thead>` (header rows), `<tbody>` (main data), `<tfoot>` (footer) — table ko organize karte hain.' },
      { h: 'Merge cells', p: '`colspan` se ek cell ko kai columns tak failao, `rowspan` se kai rows tak.' },
    ],
    syntax: { code: `<table>
  <thead>
    <tr><th>Naam</th><th>Age</th></tr>
  </thead>
  <tbody>
    <tr><td>Mayank</td><td>22</td></tr>
    <tr><td>Riya</td><td>21</td></tr>
  </tbody>
</table>`, note: 'table → tr → th/td. Header th, data td.' },
    examples: [{ level: 'Practical', title: 'colspan se merge', code: `<tr>
  <td colspan="2">Pura width cell</td>
</tr>`, explain: '`colspan="2"` ek cell ko 2 columns jitna chaudा kar deta hai.' }],
    best: ['Tables sirf data ke liye, layout ke liye nahi (uske liye CSS Grid/Flexbox).', 'Header cells ke liye `<th>` use karo.'],
    mistakes: [{ bad: 'Page layout banane ke liye table use karna.', fix: 'Layout CSS se karo; table sirf tabular data ke liye.' }],
    keyPoints: ['table → tr → th/td.', 'colspan/rowspan se merge.', 'thead/tbody se organize.'],
    summary: ['Tables = rows + columns data.', 'th header, td data.', 'Layout ke liye mat use karo.'],
    quiz: [{ q: 'Table row kaunsे tag se?', options: ['<td>', '<tr>', '<th>', '<row>'], answer: 1, explain: '`<tr>` table row hai.' }],
    related: ['lists', 'forms', 'semantic'],
  },

  'input-types': {
    overview: 'Input ka `type` attribute batata hai input kis tarah ka data lega — text, email, password, number, date, checkbox, radio wagairah. Sahi type use karne se validation aur mobile keyboard automatic sahi aate hain.',
    theory: [
      { h: 'Text inputs', p: '`text`, `email`, `password`, `tel`, `url`, `search` — alag-alag keyboard aur validation dete hain.' },
      { h: 'Choice inputs', p: '`checkbox` (multiple choone), `radio` (ek hi chuno), `<select>` dropdown.' },
      { h: 'Special inputs', p: '`number`, `date`, `time`, `color`, `range` (slider), `file` (upload).' },
    ],
    syntax: { code: `<input type="email" placeholder="Email" />
<input type="password" placeholder="Password" />
<input type="number" min="0" max="10" />
<input type="date" />
<input type="checkbox" /> Yaad rakho
<input type="radio" name="g" /> Male
<input type="color" />
<input type="range" min="0" max="100" />`, note: 'type badalne se input ka behaviour badalta hai.' },
    examples: [{ level: 'Practical', title: 'Mobile-friendly', code: `<input type="tel" placeholder="Phone" />
<input type="email" placeholder="Email" />`, explain: 'Mobile par `tel` number-pad aur `email` @ wala keyboard kholता hai.' }],
    best: ['Hamesha sahi type chuno (email ke liye type="email").', 'radio buttons ko same `name` do taaki sirf ek select ho.'],
    mistakes: [{ bad: 'Sab cheez ke liye type="text".', fix: 'Specific type use karo — better UX aur free validation.' }],
    keyPoints: ['type behaviour decide karta hai.', 'radio = ek, checkbox = multiple.', 'Mobile keyboard type se badalta hai.'],
    summary: ['Input type data ka kism batata hai.', 'Sahi type = better UX + validation.'],
    quiz: [{ q: 'Sirf ek option chunne ke liye?', options: ['checkbox', 'radio', 'select multiple', 'text'], answer: 1, explain: 'Same name wale radio buttons mein sirf ek select hota hai.' }],
    related: ['forms', 'attributes', 'accessibility'],
  },

  semantic: {
    overview: 'Semantic elements wo tags hain jinka naam unke kaam ko batata hai — jaise `<header>`, `<nav>`, `<main>`, `<footer>`, `<article>`, `<section>`. Inke jagah pehle log sirf `<div>` use karte the. Semantic tags code ko meaningful, accessible aur SEO-friendly banate hain.',
    theory: [
      { h: 'Kyun semantic?', p: '`<div>` ka koi matlab nahi hota. `<header>` se browser, search engine aur screen reader sabko pata chalta hai ki ye page ka header hai.' },
      { h: 'Common semantic tags', p: '`<header>` (upar wala part), `<nav>` (menu), `<main>` (main content), `<article>` (independent content), `<section>` (ek section), `<aside>` (side content), `<footer>` (neeche).' },
    ],
    syntax: { code: `<header>Logo aur menu</header>
<nav>Links</nav>
<main>
  <article>Blog post</article>
  <aside>Related links</aside>
</main>
<footer>Copyright 2026</footer>`, note: 'Naam hi kaam batata hai — yahi semantic ka matlab.' },
    examples: [{ level: 'Practical', title: 'div vs semantic', code: `<!-- Purana tarika -->
<div id="header">...</div>

<!-- Semantic tarika ✅ -->
<header>...</header>`, explain: 'Dono dikhne mein same, lekin semantic tag meaning deta hai — SEO aur accessibility better.' }],
    best: ['`<div>` ki jagah semantic tags prefer karo.', 'Ek page par ek `<main>` rakho.'],
    mistakes: [{ bad: 'Sab kuch `<div>` se banana.', fix: 'Jahan fit ho semantic tag use karo — header, nav, footer wagairah.' }],
    keyPoints: ['Semantic = meaning wale tags.', 'SEO + accessibility better.', 'div ki jagah use karo.'],
    summary: ['Semantic tags naam se kaam batate hain.', 'header, nav, main, article, footer.', 'div se behtar.'],
    quiz: [{ q: 'Inme se semantic tag kaunsा?', options: ['<div>', '<span>', '<article>', '<b>'], answer: 2, explain: '`<article>` semantic hai — independent content batata hai.' }],
    related: ['block-inline', 'accessibility', 'seo'],
  },

  audio: {
    overview: 'Audio file (music, podcast) page mein play karne ke liye `<audio>` tag use hota hai. `controls` attribute play/pause buttons dikhata hai. Pehle iske liye Flash chahiye tha, ab HTML5 mein built-in hai.',
    syntax: { code: `<audio controls>
  <source src="song.mp3" type="audio/mpeg" />
  Tumhara browser audio support nahi karta.
</audio>`, note: 'controls = buttons. Multiple <source> different formats ke liye.' },
    theory: [{ h: 'Attributes', p: '`controls` (buttons dikhao), `autoplay` (apne aap chale — avoid karo), `loop` (baar-baar), `muted` (chup).' }],
    examples: [{ level: 'Beginner', title: 'Simple audio', code: `<audio src="beep.mp3" controls></audio>`, explain: 'src direct dene se bhi chalta hai, controls se play button aata hai.' }],
    best: ['`controls` zaroor do warna user play nahi kar paayega.', 'autoplay avoid karo — annoying hota hai.'],
    mistakes: [{ bad: 'autoplay with sound.', fix: 'Zyादातर browsers ise block karte hain; user-friendly nahi.' }],
    keyPoints: ['`<audio controls>` se player.', 'MP3 sab jagah chalti hai.'],
    summary: ['`<audio>` se sound play.', 'controls buttons deta hai.'],
    support: 'MP3 har modern browser mein supported. <audio> HTML5 feature hai.',
    quiz: [{ q: 'Audio par play buttons kaunsा attribute deta hai?', options: ['play', 'controls', 'buttons', 'autoplay'], answer: 1, explain: '`controls` play/pause/volume buttons dikhata hai.' }],
    related: ['video', 'iframes'],
  },

  video: {
    overview: 'Video play karne ke liye `<video>` tag. Audio jaisा hi — `controls`, `width`, `poster` (thumbnail) attributes ke saath. YouTube wagairah iframe se embed hote hain, lekin apni video file `<video>` se.',
    syntax: { code: `<video controls width="600" poster="thumb.jpg">
  <source src="movie.mp4" type="video/mp4" />
  Browser video support nahi karta.
</video>`, note: 'controls, width, poster (preview image). MP4 best format.' },
    theory: [{ h: 'Attributes', p: '`controls`, `width`/`height`, `poster` (play se pehle dikhne wali image), `autoplay muted loop` (background videos ke liye).' }],
    examples: [{ level: 'Practical', title: 'Background video', code: `<video autoplay muted loop>
  <source src="bg.mp4" type="video/mp4" />
</video>`, explain: 'autoplay+muted+loop se hero section ki background video banti hai (muted zaroori, warna autoplay block hota hai).' }],
    best: ['MP4 (H.264) use karo — sabse compatible.', 'poster image do better UX ke liye.'],
    mistakes: [{ bad: 'Sound ke saath autoplay.', fix: 'autoplay ke liye `muted` zaroori hai.' }],
    keyPoints: ['`<video controls>` se player.', 'MP4 best.', 'poster = thumbnail.'],
    summary: ['`<video>` se apni video files play.', 'YouTube ke liye iframe.'],
    support: 'MP4 har modern browser mein. <video> HTML5 feature.',
    quiz: [{ q: 'Video se pehle dikhne wali image kaunsा attribute?', options: ['thumbnail', 'poster', 'preview', 'cover'], answer: 1, explain: '`poster` play se pehle wali image set karta hai.' }],
    related: ['audio', 'iframes'],
  },

  iframes: {
    overview: 'Iframe se ek page ke andar doosra page/website embed (ghusa) kar sakte ho. YouTube videos, Google Maps, ads — sab iframe se aate hain. `<iframe src="...">` mein doosre page ka URL daalo.',
    syntax: { code: `<iframe src="https://www.youtube.com/embed/VIDEO_ID"
        width="560" height="315"
        title="YouTube video"
        allowfullscreen></iframe>`, note: 'src = embed karne wala URL. title accessibility ke liye.' },
    theory: [{ h: 'Use cases', p: 'YouTube/Vimeo videos, Google Maps, payment widgets, ads — sab iframe se embed hote hain.' }, { h: 'Security', p: 'Anjaan sites ko iframe mat karo. `sandbox` attribute se iframe ki permissions limit kar sakte ho.' }],
    examples: [{ level: 'Practical', title: 'Google Map embed', code: `<iframe src="https://maps.google.com/maps?q=Delhi&output=embed"
        width="100%" height="300"></iframe>`, explain: 'Map ka embed URL daalkar live map page mein dikhता hai.' }],
    best: ['`title` zaroor do (accessibility).', 'Bharosemand sources hi embed karo.', '`loading="lazy"` se performance better.'],
    mistakes: [{ bad: 'Anjaan/random site ko iframe karna.', fix: 'Security risk — sirf trusted sources, ya `sandbox` use karo.' }],
    keyPoints: ['iframe = page ke andar page.', 'YouTube/Maps embed.', 'title zaroori.'],
    summary: ['`<iframe>` doosri site embed karta hai.', 'src mein embed URL.'],
    support: 'iframe har browser mein supported. Kuch sites apne ko iframe hone se rokti hain (X-Frame-Options).',
    quiz: [{ q: 'YouTube video kaise embed karte hain?', options: ['<video>', '<iframe>', '<embed file>', '<youtube>'], answer: 1, explain: 'YouTube embed URL ko `<iframe>` mein daalte hain.' }],
    related: ['video', 'audio'],
  },

  'meta-tags': {
    overview: 'Meta tags `<head>` ke andar hote hain aur page ke baare mein "info" dete hain — jo dikhti nahi lekin browser aur search engines ke liye important hai. Jaise character set, page description, viewport settings.',
    theory: [
      { h: 'Zaroori meta tags', p: '`charset` (UTF-8 — characters sahi dikhe), `viewport` (mobile responsive), `description` (Google par dikhne wali summary).' },
      { h: 'SEO & social', p: '`description`, `keywords`, aur Open Graph (`og:title`, `og:image`) — WhatsApp/social par link share karne par preview banate hain.' },
    ],
    syntax: { code: `<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="HTML Hindi mein seekho" />
  <meta property="og:title" content="HTML Course" />
  <meta property="og:image" content="preview.jpg" />
</head>`, note: 'charset + viewport har page par zaroori. description SEO ke liye.' },
    examples: [{ level: 'Practical', title: 'Social preview', code: `<meta property="og:title" content="Mera Blog" />
<meta property="og:description" content="Tech articles" />
<meta property="og:image" content="cover.jpg" />`, explain: 'Ye Open Graph tags WhatsApp/Facebook par link bhejne par sundar preview card banate hain.' }],
    best: ['charset aur viewport hamesha do.', 'Har page par unique `description` likho.', 'Open Graph tags add karo for social sharing.'],
    mistakes: [{ bad: 'description na dena.', fix: 'Google search result mein description dikhती hai — har page ke liye likho.' }],
    keyPoints: ['Meta head mein hota hai.', 'charset + viewport zaroori.', 'og: tags social preview banate.'],
    summary: ['Meta tags page ki info dete hain.', 'charset, viewport, description important.', 'Open Graph = social preview.'],
    support: 'Sab standard meta tags har browser/search engine mein supported.',
    quiz: [{ q: 'Mobile responsive ke liye kaunsा meta tag?', options: ['charset', 'viewport', 'description', 'robots'], answer: 1, explain: '`viewport` meta tag mobile responsiveness ke liye zaroori hai.' }],
    related: ['document-structure', 'seo', 'accessibility'],
  },

  entities: {
    overview: 'HTML entities special characters likhne ka tarika hain jo seedhे type nahi kar sakte — jaise `<`, `>`, `&`, ya symbols (©, ₹, →). Ye `&naam;` format mein likhe jaate hain, jaise `&lt;` ka matlab `<`.',
    theory: [
      { h: 'Reserved characters', p: '`<`, `>`, `&` ko seedhे likhoge to browser confuse hoga (wo tags samajhega). Inke liye entities: `&lt;` (<), `&gt;` (>), `&amp;` (&).' },
      { h: 'Symbols', p: '`&copy;` (©), `&rupee;`/`&#8377;` (₹), `&rarr;` (→), `&nbsp;` (non-breaking space), `&hearts;` (♥).' },
    ],
    syntax: { code: `<p>5 &lt; 10 aur 10 &gt; 5</p>
<p>Tom &amp; Jerry</p>
<p>&copy; 2026 &mdash; All rights reserved &hearts;</p>`, note: '&lt; = <, &gt; = >, &amp; = &, &copy; = ©' },
    examples: [{ level: 'Beginner', title: 'Code dikhana', code: `<p>Tag likhne ke liye &lt;p&gt; type karo</p>`, explain: 'Agar page par literally `<p>` dikhana ho to entities se likho, warna browser use tag samajh lega.' }],
    best: ['`<`, `>`, `&` ke liye hamesha entities use karo.', '`&nbsp;` ka zyada use mat karo — spacing CSS se karo.'],
    mistakes: [{ bad: 'Text mein seedha `&` likhna.', fix: '`&amp;` use karo — kabhi-kabhi `&` se aage ka text galat parse hota hai.' }],
    keyPoints: ['Format: `&naam;`.', '&lt; &gt; &amp; reserved.', '&copy; &nbsp; common.'],
    summary: ['Entities special characters likhne ke liye.', '`&lt;` `&gt;` `&amp;` zaroori.'],
    support: 'Sab standard entities har browser mein supported.',
    quiz: [{ q: '`&lt;` kya represent karta hai?', options: ['>', '<', '&', 'space'], answer: 1, explain: '`&lt;` less-than `<` ke liye hai.' }],
    related: ['formatting', 'comments'],
  },

  'block-inline': {
    overview: 'HTML elements do tarah ke hote hain: **block** aur **inline**. Block elements (jaise `<div>`, `<p>`, `<h1>`) puri width lete hain aur nayi line se shuru hote hain. Inline elements (jaise `<span>`, `<a>`, `<strong>`) sirf apni zaroorat jitni jagah lete hain aur same line mein rehte hain.',
    theory: [
      { h: 'Block elements', p: 'Puri line lete hain, upar-neeche stack hote hain. Examples: `<div>`, `<p>`, `<h1>`-`<h6>`, `<ul>`, `<section>`. Inme width/height set kar sakte ho.' },
      { h: 'Inline elements', p: 'Sirf content jitni jagah, line mein flow karte hain. Examples: `<span>`, `<a>`, `<strong>`, `<em>`, `<img>`. Inme width/height kaam nahi karta (normally).' },
    ],
    syntax: { code: `<!-- Block: alag-alag line -->
<p>Pehla</p>
<p>Doosra</p>

<!-- Inline: same line -->
<span>Ye</span> <span>same</span> <span>line</span>`, note: 'Block = nayi line, Inline = same line.' },
    examples: [{ level: 'Beginner', title: 'Farq dekho', code: `<div>Block — puri width</div>
<a href="#">Inline</a> <a href="#">side by side</a>`, explain: 'div neeche chala jaata hai, links saath-saath rehte hain.' }],
    best: ['Layout ke bade blocks ke liye block elements (div/section).', 'Text ke andar chhote parts ke liye inline (span).'],
    mistakes: [{ bad: 'Inline element mein block daalna (jaise `<a>` ke andar `<div>` — purane HTML mein galat).', fix: 'HTML5 mein `<a>` block wrap kar sakta hai, lekin generally sahi nesting maintain karo.' }],
    keyPoints: ['Block = puri width, nayi line.', 'Inline = content jitni, same line.', 'div block, span inline.'],
    summary: ['2 display types: block aur inline.', 'Block stack hote, inline flow karte.'],
    quiz: [{ q: 'Kaunsा inline element hai?', options: ['<div>', '<p>', '<span>', '<section>'], answer: 2, explain: '`<span>` inline element hai.' }],
    related: ['elements', 'semantic', 'class-id'],
  },

  'class-id': {
    overview: '`class` aur `id` elements ko "naam" dene ke liye hote hain taaki CSS aur JavaScript unhe pakad sakein. **`id` unique hota hai** (ek page par ek baar), **`class` multiple elements par** laga sakte ho.',
    theory: [
      { h: 'id — unique naam', p: 'Ek page par koi id sirf ek baar. CSS mein `#naam` se, JS mein `getElementById` se access hota hai. Page ke andar link (`#naam`) ke liye bhi.' },
      { h: 'class — reusable naam', p: 'Same class kai elements par laga sakte ho. CSS mein `.naam` se style hote hain. Ek element par kai classes bhi (space se).' },
    ],
    syntax: { code: `<h1 id="main-title">Title</h1>

<p class="highlight">Ek</p>
<p class="highlight">Do</p>

<div class="card big">Multiple classes</div>`, note: 'id = unique (#), class = reusable (.). Multiple classes space se.' },
    examples: [{ level: 'Practical', title: 'CSS ke saath', code: `<button class="btn primary">Save</button>
<!-- CSS: .btn { ... } .primary { color: white } -->`, explain: 'Ek button par do classes — `btn` common styles, `primary` color. Reusable design system aise banta hai.' }],
    best: ['Styling ke liye `class` prefer karo (reusable).', 'id sirf jab unique cheez chahiye (anchor link, JS hook).', 'Naam meaningful rakho (`.nav-link` na ki `.red`).'],
    mistakes: [{ bad: 'Same id ko 2 jagah use karna.', fix: 'id unique honi chahiye — repeat ke liye class use karo.' }],
    keyPoints: ['id = unique (#).', 'class = reusable (.).', 'Ek element par multiple classes.'],
    summary: ['class aur id elements ko naam dete hain.', 'id unique, class reusable.', 'CSS/JS inse elements pakadte hain.'],
    quiz: [
      { q: 'Kaunsा unique hona chahiye?', options: ['class', 'id', 'dono', 'koi nahi'], answer: 1, explain: 'id ek page par unique honi chahiye.' },
      { q: 'CSS mein class ko kaise select karte hain?', options: ['#name', '.name', '*name', '@name'], answer: 1, explain: 'Class ko dot `.name` se select karte hain.' },
    ],
    related: ['attributes', 'block-inline', 'best-practices'],
  },

  accessibility: {
    overview: 'Accessibility (a11y) ka matlab — website aisi banao jo *sabke* liye chale, including blind, deaf ya disabled users. Screen readers, keyboard navigation, proper alt text aur labels — ye sab accessibility ke hisse hain. Ye ek acche developer ki nishaani hai.',
    theory: [
      { h: 'Semantic HTML', p: 'Sahi tags (header, nav, button) use karne se screen readers page ko sahi padh paate hain. Ye accessibility ka 50% kaam hai.' },
      { h: 'alt, label, aria', p: 'Images par `alt`, inputs par `<label>`, aur jaroorat par `aria-*` attributes (jaise `aria-label`) extra info dete hain.' },
      { h: 'Keyboard navigation', p: 'Bahut log mouse use nahi karte. Tab key se sab buttons/links tak pahuncha jaa sake — ye zaroori hai.' },
    ],
    syntax: { code: `<img src="logo.png" alt="Company logo" />
<label for="email">Email</label>
<input id="email" type="email" />
<button aria-label="Menu kholo">☰</button>`, note: 'alt, label, aria-label se elements accessible bante hain.' },
    examples: [{ level: 'Practical', title: 'Icon button', code: `<button aria-label="Search">🔍</button>`, explain: 'Sirf icon wale button par `aria-label` se screen reader ko pata chalta hai button ka kaam.' }],
    best: ['Semantic tags use karo.', 'Har image par alt, har input par label.', 'Color ke saath text/icon bhi do (sirf color par depend mat karo).', 'Keyboard se test karo (sirf Tab use karke).'],
    mistakes: [{ bad: 'Button ke liye `<div onclick>` use karna.', fix: '`<button>` use karo — wo keyboard aur screen reader dono support karta hai.' }],
    keyPoints: ['a11y = sabke liye web.', 'Semantic + alt + label.', 'Keyboard navigation zaroori.'],
    summary: ['Accessibility sabke liye website banata hai.', 'Semantic HTML, alt, labels, keyboard support.'],
    support: 'ARIA aur semantic HTML har modern browser/screen reader mein supported.',
    quiz: [{ q: 'Icon-only button ko accessible kaise banate hain?', options: ['color do', 'aria-label do', 'bada karo', 'animation do'], answer: 1, explain: '`aria-label` screen reader ko button ka matlab batata hai.' }],
    related: ['semantic', 'forms', 'images'],
  },

  seo: {
    overview: 'SEO (Search Engine Optimization) ka matlab — apni website ko Google par upar laana. HTML ka role bada hai: sahi headings, meta description, alt text, semantic tags aur fast page — ye sab Google ko page samjhane mein madad karte hain.',
    theory: [
      { h: 'On-page HTML SEO', p: 'Ek `<h1>`, proper heading hierarchy, unique `<title>` aur `<meta description>`, images par `alt`, semantic tags — Google inse content samajhta hai.' },
      { h: 'Title aur description', p: '`<title>` Google result ka neela link banta hai, `<meta description>` neeche ka grey text. Dono attractive aur unique rakho.' },
    ],
    syntax: { code: `<head>
  <title>HTML Hindi mein Seekho — Beginner Guide</title>
  <meta name="description" content="HTML ko simple Hindi mein step-by-step seekho." />
</head>
<body>
  <h1>HTML Tutorial</h1>
  <img src="x.jpg" alt="HTML code example" />
</body>`, note: 'title, description, ek h1, alt text — basic on-page SEO.' },
    examples: [{ level: 'Practical', title: 'Good title tag', code: `<title>Best Pizza in Delhi | Mario's</title>`, explain: 'Keyword (pizza, Delhi) + brand. Google par yahi clickable heading dikhती hai.' }],
    best: ['Ek h1, proper heading order.', 'Unique title + meta description har page par.', 'Images par descriptive alt.', 'Fast loading aur mobile-friendly page.'],
    mistakes: [{ bad: 'Saare pages par same title.', fix: 'Har page ka title aur description unique rakho.' }],
    keyPoints: ['HTML structure SEO ko affect karta hai.', 'title + description important.', 'alt + semantic + speed.'],
    summary: ['SEO = Google par upar aana.', 'Sahi headings, title, description, alt.', 'Semantic + fast + mobile-friendly.'],
    quiz: [{ q: 'Google search result ka neela link kahan se aata hai?', options: ['<h1>', '<title>', '<meta description>', '<a>'], answer: 1, explain: '`<title>` tag search result ka clickable heading banta hai.' }],
    related: ['meta-tags', 'headings', 'semantic'],
  },

  'best-practices': {
    overview: 'Best practices wo aadatein hain jo professional developers follow karte hain — saaf code, sahi indentation, semantic tags, accessibility aur performance. Inhe shuru se apnao to aage chalkar bahut faayda hota hai.',
    theory: [
      { h: 'Clean & semantic code', p: 'Lowercase tags, proper indentation, semantic elements, har attribute value quotes mein. Code padhne mein aasaan hona chahiye.' },
      { h: 'Performance & accessibility', p: 'Images compress karo, alt do, labels do, viewport set karo. Tezi se load hone wala aur sabke liye chalने wala page.' },
    ],
    syntax: { code: `<!-- ✅ Accha code -->
<article class="post">
  <h2>Title</h2>
  <p>Content...</p>
  <img src="x.webp" alt="Description" />
</article>`, note: 'Semantic, indented, alt ke saath — yahi professional code dikhता hai.' },
    examples: [{ level: 'Practical', title: 'Boilerplate checklist', code: `<!DOCTYPE html>
<html lang="hi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>...</title>
</head>`, explain: 'DOCTYPE, lang, charset, viewport, title — har professional page mein ye 5 cheezein zaroor hoti hain.' }],
    best: [
      'Lowercase tags aur quoted attributes.',
      'Semantic elements use karo.',
      'Proper indentation (2 spaces).',
      'Images optimize + alt.',
      'Validator se code check karo (validator.w3.org).',
    ],
    mistakes: [
      { bad: 'Inline styles everywhere (`style="..."`).', fix: 'CSS file mein styles rakho — maintain karna aasaan.' },
      { bad: 'Sab kuch div mein (div soup).', fix: 'Semantic tags use karo.' },
    ],
    keyPoints: ['Clean + semantic + accessible.', 'Optimize images.', 'Validate karo.'],
    summary: ['Best practices = professional aadatein.', 'Semantic, clean, accessible, fast.'],
    quiz: [{ q: 'Styling kahan rakhni chahiye?', options: ['Har tag mein inline', 'Alag CSS file mein', 'Comments mein', 'Title mein'], answer: 1, explain: 'CSS file mein — maintainable aur reusable.' }],
    related: ['accessibility', 'seo', 'semantic'],
  },

  'interview-questions': {
    overview: 'HTML interviews mein basics se lekar advanced concepts tak puchа jaata hai. Yahan sabse common questions answers ke saath diye hain — beginner, intermediate aur advanced levels mein. Inhe revise karke interview crack karo.',
    theory: [{ h: 'Tip', p: 'Interview mein concept clear hona zaroori hai, ratta nahi. Har answer ko apne shabdon mein, example ke saath samjhao.' }],
    interview: {
      beginner: [
        { q: 'HTML kya hai?', a: 'HyperText Markup Language — web pages ka structure banane wali markup language.' },
        { q: 'Tag aur element mein fark?', a: 'Tag = `<p>`. Element = `<p>content</p>` (opening + content + closing).' },
        { q: 'Void/empty elements kya hain?', a: 'Jinka closing tag nahi hota — img, br, hr, input, meta.' },
        { q: 'Semantic elements kya hote hain?', a: 'Jinka naam unka kaam batata hai — header, nav, main, article, footer.' },
        { q: 'id aur class mein fark?', a: 'id unique (ek page par ek), class reusable (multiple elements par).' },
      ],
      intermediate: [
        { q: 'Block vs inline elements?', a: 'Block (div, p) puri width lete hain aur nayi line se; inline (span, a) content jitni jagah, same line.' },
        { q: 'GET vs POST?', a: 'GET data URL mein (visible, chhota), POST body mein (hidden, bada/sensitive).' },
        { q: 'alt attribute kyun zaroori?', a: 'Image na dikhe to backup text, screen readers, aur SEO ke liye.' },
        { q: 'meta viewport tag kya karta hai?', a: 'Page ko mobile devices par responsive banata hai.' },
      ],
      advanced: [
        { q: 'DOM kya hai?', a: 'Document Object Model — HTML ka tree representation jise JavaScript access/modify kar sakti hai.' },
        { q: 'Quirks mode kya hai?', a: 'DOCTYPE missing hone par browser ka non-standard rendering mode jo layout bugs deta hai.' },
        { q: 'Accessibility kaise improve karein?', a: 'Semantic HTML, alt text, labels, aria attributes, keyboard navigation, aur color contrast.' },
        { q: 'data-* attributes ka use?', a: 'Custom data HTML mein store karne ke liye, JS `dataset` se access hota hai.' },
      ],
    },
    keyPoints: ['Concepts clear rakho, ratta nahi.', 'Example ke saath samjhao.', 'Basics par strong hona zaroori.'],
    summary: ['Beginner: HTML, tags, elements, semantic, id/class.', 'Intermediate: block/inline, GET/POST, alt, viewport.', 'Advanced: DOM, quirks mode, accessibility, data-*.'],
    related: ['introduction', 'semantic', 'best-practices'],
  },
}
