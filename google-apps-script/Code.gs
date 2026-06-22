/**
 * LifeFlow ⇄ Google Sheets backend (Google Apps Script Web App)
 * ────────────────────────────────────────────────────────────────────────────
 * Yeh aapka "no-backend" backend hai — Google ke server par free chalta hai.
 * React app isi ke deployed URL ko fetch() karti hai. CRUD yahin hota hai.
 *
 * SETUP (ek hi baar):
 *  1. Ek naya Google Sheet banao (koi bhi naam, e.g. "LifeFlow DB").
 *  2. Extensions → Apps Script → yeh poora code paste karo (default Code.gs replace).
 *  3. Save (💾).  Deploy → New deployment → type: "Web app".
 *       - Execute as: Me
 *       - Who has access: Anyone
 *     → Deploy → "Authorize access" → apna Google account allow karo.
 *  4. Jo "Web app URL" mile (…/exec se end hoti hai) usse copy karo.
 *  5. React project ke .env me daalo:  VITE_SHEETS_API_URL=<woh URL>
 *
 * Tabs (Expenses / Progress / Settings) script khud bana lega — manually mat banao.
 *
 * SECURITY (optional): SECRET set karo (niche) + React .env me same VITE_SHEETS_TOKEN.
 * Tab sirf woh request allowed jisme sahi token ho. Khaali = check off (single-user OK).
 * ────────────────────────────────────────────────────────────────────────────
 */

var SECRET = ''; // optional shared token; khaali = security check off

// ── HTTP entry points ───────────────────────────────────────────────────────
function doGet(e) {
  if (!authorized(e)) return json({ error: 'unauthorized' });
  return json({
    expenses: readExpenses(),
    progress: readProgress(),
    settings: readSettings(),
    habits: readHabits(),
    goals: readGoals(),
    topics: readTopics(),
    notifications: readNotifications(),
  });
}

function doPost(e) {
  if (!authorized(e)) return json({ error: 'unauthorized' });
  var body = {};
  try { body = JSON.parse(e.postData.contents); } catch (err) { return json({ error: 'bad json' }); }
  var tab = body.tab;
  var payload = body.payload;
  if (tab === 'expenses') writeExpenses(payload);
  else if (tab === 'progress') writeProgress(payload);
  else if (tab === 'settings') writeSettings(payload);
  else if (tab === 'habits') writeHabits(payload);
  else if (tab === 'goals') writeGoals(payload);
  else if (tab === 'topics') writeTopics(payload);
  else if (tab === 'notifications') writeNotifications(payload);
  else if (tab === 'loginActivity') return json({ ok: true, loginId: appendLoginActivity(payload) });
  else return json({ error: 'unknown tab: ' + tab });
  return json({ ok: true });
}

function authorized(e) {
  if (!SECRET) return true;
  var token = (e && e.parameter && e.parameter.token) || tokenFromBody(e);
  return token === SECRET;
}
function tokenFromBody(e) {
  try { return JSON.parse(e.postData.contents).token; } catch (err) { return null; }
}

// ── Expenses tab:  id | type | title | amount | category | date ──────────────
function readExpenses() {
  var sh = tab('Expenses', ['id', 'type', 'title', 'amount', 'category', 'date']);
  return sh.getDataRange().getValues().slice(1)
    .filter(function (r) { return r[0] !== ''; })
    .map(function (r) {
      return { id: String(r[0]), type: r[1], title: r[2], amount: Number(r[3]) || 0, category: r[4], date: asDate(r[5]) };
    });
}
function writeExpenses(list) {
  var sh = tab('Expenses', ['id', 'type', 'title', 'amount', 'category', 'date']);
  sh.clearContents();
  sh.appendRow(['id', 'type', 'title', 'amount', 'category', 'date']);
  var rows = (list || []).map(function (t) {
    return [t.id, t.type, t.title, t.amount, t.category, t.date];
  });
  if (rows.length) sh.getRange(2, 1, rows.length, 6).setValues(rows);
}

// ── Progress tab:  course | completed | bookmarks | notes  (JSON cells) ──────
function readProgress() {
  var sh = tab('Progress', ['course', 'completed', 'bookmarks', 'notes']);
  var out = {};
  sh.getDataRange().getValues().slice(1).forEach(function (r) {
    if (!r[0]) return;
    out[r[0]] = {
      completed: parseJson(r[1], {}),
      bookmarks: parseJson(r[2], {}),
      notes: parseJson(r[3], {}),
    };
  });
  return out;
}
function writeProgress(map) {
  var sh = tab('Progress', ['course', 'completed', 'bookmarks', 'notes']);
  sh.clearContents();
  sh.appendRow(['course', 'completed', 'bookmarks', 'notes']);
  var keys = Object.keys(map || {});
  var rows = keys.map(function (c) {
    var p = map[c] || {};
    return [c, JSON.stringify(p.completed || {}), JSON.stringify(p.bookmarks || {}), JSON.stringify(p.notes || {})];
  });
  if (rows.length) sh.getRange(2, 1, rows.length, 4).setValues(rows);
}

// ── Settings tab:  key | value  (JSON values; profile + settings) ────────────
function readSettings() {
  var sh = tab('Settings', ['key', 'value']);
  var out = {};
  sh.getDataRange().getValues().slice(1).forEach(function (r) {
    if (r[0]) out[r[0]] = parseJson(r[1], r[1]);
  });
  return out;
}
function writeSettings(obj) {
  var sh = tab('Settings', ['key', 'value']);
  sh.clearContents();
  sh.appendRow(['key', 'value']);
  var keys = Object.keys(obj || {});
  var rows = keys.map(function (k) { return [k, JSON.stringify(obj[k])]; });
  if (rows.length) sh.getRange(2, 1, rows.length, 2).setValues(rows);
}

// ── Habits / Goals tabs:  id | data  (full object as JSON; nested fields safe) ─
function readHabits() {
  var sh = tab('Habits', ['id', 'data']);
  return sh.getDataRange().getValues().slice(1)
    .map(function (r) { return parseJson(r[1], null); })
    .filter(function (x) { return x; });
}
function writeHabits(list) {
  var sh = tab('Habits', ['id', 'data']);
  sh.clearContents();
  sh.appendRow(['id', 'data']);
  var rows = (list || []).map(function (h) { return [h.id, JSON.stringify(h)]; });
  if (rows.length) sh.getRange(2, 1, rows.length, 2).setValues(rows);
}
function readGoals() {
  var sh = tab('Goals', ['id', 'data']);
  return sh.getDataRange().getValues().slice(1)
    .map(function (r) { return parseJson(r[1], null); })
    .filter(function (x) { return x; });
}
function writeGoals(list) {
  var sh = tab('Goals', ['id', 'data']);
  sh.clearContents();
  sh.appendRow(['id', 'data']);
  var rows = (list || []).map(function (g) { return [g.id, JSON.stringify(g)]; });
  if (rows.length) sh.getRange(2, 1, rows.length, 2).setValues(rows);
}

// ── Topics / Notifications tabs:  id | data  (full object as JSON) ────────────
function readTopics() {
  var sh = tab('Topics', ['id', 'data']);
  return sh.getDataRange().getValues().slice(1)
    .map(function (r) { return parseJson(r[1], null); })
    .filter(function (x) { return x; });
}
function writeTopics(list) {
  var sh = tab('Topics', ['id', 'data']);
  sh.clearContents();
  sh.appendRow(['id', 'data']);
  var rows = (list || []).map(function (t) { return [t.id, JSON.stringify(t)]; });
  if (rows.length) sh.getRange(2, 1, rows.length, 2).setValues(rows);
}
function readNotifications() {
  var sh = tab('Notifications', ['id', 'data']);
  return sh.getDataRange().getValues().slice(1)
    .map(function (r) { return parseJson(r[1], null); })
    .filter(function (x) { return x; });
}
function writeNotifications(list) {
  var sh = tab('Notifications', ['id', 'data']);
  sh.clearContents();
  sh.appendRow(['id', 'data']);
  var rows = (list || []).map(function (n) { return [n.id, JSON.stringify(n)]; });
  if (rows.length) sh.getRange(2, 1, rows.length, 2).setValues(rows);
}

// ── LoginActivity tab: APPEND-ONLY audit log (overwrite nahi) ────────────────
function appendLoginActivity(rec) {
  var headers = ['LoginId', 'Username', 'LoginDate', 'LoginTime', 'DeviceType', 'Browser', 'LoginStatus'];
  var sh = tab('LoginActivity', headers);
  var loginId = sh.getLastRow(); // header row 1 → pehli entry ki id = 1
  sh.appendRow([
    loginId,
    rec.username,
    rec.loginDate,
    rec.loginTime,
    rec.deviceType,
    rec.browser,
    rec.loginStatus,
  ]);
  return loginId;
}

// ── helpers ──────────────────────────────────────────────────────────────────
function tab(name, headers) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(name);
  if (!sh) { sh = ss.insertSheet(name); sh.appendRow(headers); }
  return sh;
}
function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
function parseJson(v, fallback) {
  if (v === '' || v == null) return fallback;
  try { return JSON.parse(v); } catch (err) { return fallback; }
}
function asDate(v) {
  if (Object.prototype.toString.call(v) === '[object Date]') {
    var y = v.getFullYear(), m = ('0' + (v.getMonth() + 1)).slice(-2), d = ('0' + v.getDate()).slice(-2);
    return y + '-' + m + '-' + d;
  }
  return String(v);
}
