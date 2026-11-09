// The logic map page: routing, the flowchart, the slides, the pictures, the examples, notes and the self-check.
// It holds no content: every part comes from logic/*.js.
(function () {
  'use strict';
  var STAMP = 'v10 2026-11-07';
  var LEVELS = ['Module', 'Part', 'Rule', 'Detail'];
  var TAG = { real: 'Real', will: "Will's words", claude: "Claude's call" };
  var OUT = { keep: 'keep', block: 'block', route: 'route', opus: 'Opus', unclear: 'unclear', wait: 'waits for Will' };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  // A hidden cmux split freezes animations at their first frame: move only when someone can see it.
  function animOK() { return !reduce && document.visibilityState === 'visible'; }
  console.log('[flowdocs] build', { stamp: STAMP, dark: dark, reduce: reduce });

  // ---------------------------------------------------------------------------------------------
  // The map comes from the logic files: one file per part (logic/*.js), each with its flowchart, its
  // slides and its examples. The facts (the lines) are filled in here, so each number lives in one place.
  // ---------------------------------------------------------------------------------------------
  var FP = window.FLOWDOCS_FP, F = LOGIC._facts, RAW = LOGIC._flows;
  var FLOWS = {}, N = {}, DECKS = {}, EX = {};
  Object.keys(RAW).forEach(function (id) {
    var f = FP.fill(RAW[id], F), kids = [];
    Object.keys(f.links || {}).forEach(function (box) { if (kids.indexOf(f.links[box]) < 0) kids.push(f.links[box]); });
    FLOWS[id] = f;
    N[id] = { title: f.title, short: f.short, status: f.status, head: f.head, chart: f.chart, links: f.links || {}, kids: kids };
    DECKS[id] = f.deck || [];
    EX[id] = f.examples || {};
  });
  Object.keys(FLOWS).forEach(function (id) {
    Object.keys(FLOWS[id].leaves || {}).forEach(function (leaf) {
      var v = FLOWS[id].leaves[leaf];
      if (!N[leaf]) N[leaf] = typeof v === 'string' ? { title: v } : { title: v.title, open: v.open };
    });
  });
  // Each top part is a module, in load order. With no hash the page opens the first one.
  var MODULES = Object.keys(FLOWS).filter(function (id) { return !FLOWS[id].parent; }), ROOT = MODULES[0];
  // The yellow glow pulses by SVG animation, which ignores the reduced-motion setting: drop it for those viewers.
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) document.querySelectorAll('svg.defs animate').forEach(function (x) { x.remove(); });
  var STALE = FP.stale(RAW, F); // parts whose flowchart, or the flowchart above them, changed since their review
  var EXTAG = { real: ['Real', 't-real'], made: ['Made-up example', 't-claude'], plan: ['Not built yet', 't-plan'] };
  console.log('[flowdocs] logic loaded', { parts: Object.keys(FLOWS).length, boxes: Object.keys(N).length, facts: Object.keys(F).length, outOfDate: STALE.length });

  // ---------------------------------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------------------------------
  var PARENT = {};
  Object.keys(N).forEach(function (id) { (N[id].kids || []).forEach(function (k) { PARENT[k] = id; }); });
  function pathOf(id) { var p = []; for (var x = id; x; x = PARENT[x]) p.unshift(x); return p; }
  function depthOf(id) { return pathOf(id).length - 1; }
  function titleOf(id) { return N[id].short || N[id].title; }
  function statusOf(id) { var p = pathOf(id).reverse(); for (var i = 0; i < p.length; i++) if (N[p[i]].status) return N[p[i]].status; return ''; }
  function pathText(id) { return pathOf(id).map(titleOf).join(' › '); }
  function nearest(id, has) { var p = pathOf(id).reverse(); for (var i = 0; i < p.length; i++) if (has(p[i])) return p[i]; return pathOf(id)[0]; }
  function deckOf(id) { return nearest(id, function (x) { return !!DECKS[x]; }); }
  function flowOf(id) { return nearest(id, function (x) { return !!N[x].chart; }); }
  // The slideshow of one box: the slides of its part that name it in `about`, in their order. Each slide belongs to
  // one view, so a part's slideshow and each rule's slideshow hold different slides (Will, Nov 6).
  function deckSlidesOf(id) {
    var d = deckOf(id);
    return (DECKS[d] || []).map(function (s, k) { return { deck: d, k: k, s: s }; }).filter(function (x) { return x.s.about.indexOf(id) >= 0; });
  }
  // Each slideshow ends with the example of its box, from the chart above it (Will, Nov 6: "make it so [the
  // slideshows] hold examples"). The top part has no box above it, so it gets no example slide.
  function exampleSlidesOf(id) {
    var p = PARENT[id], seen = [];
    if (!p) return [];
    return Object.keys(N[p].links || {}).filter(function (key) { return N[p].links[key] === id; }).map(function (key) {
      var ex = exOf(p, key);
      if (!ex || seen.indexOf(ex) >= 0) return null;
      seen.push(ex);
      return { deck: p, k: -1, s: { about: [id], example: true, kicker: 'Example · ' + EXTAG[ex.tag][0], head: 'An example: ' + labelOf(p, key), visual: { type: 'flow', rows: ex.rows }, vcap: ex.note } };
    }).filter(Boolean);
  }
  function slidesOf(id) { return deckSlidesOf(id).concat(exampleSlidesOf(id)); }
  // 2 decimals, or 3 when 2 would round a number onto a line (0.746 must not read as 0.75).
  function num(x) { return Math.abs(x * 100 - Math.round(x * 100)) < 1e-9 ? x.toFixed(2) : x.toFixed(3); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function tn(t) { return ' tn-' + (t || 'code'); }
  // The steps of a flowchart: every line that defines a box, like  R1{"Unknown<br/>word?"}:::code
  var BOXDEF = /^\s*([A-Za-z0-9_]+)\s*(\(\[|\[|\{|\()"(.*?)"/;
  function chartKeys(id) { return (N[id].chart || []).map(function (l) { var m = l.match(BOXDEF); return m && m[1]; }).filter(Boolean); }
  function labelOf(id, key) {
    var line = (N[id].chart || []).filter(function (l) { var m = l.match(BOXDEF); return m && m[1] === key; })[0];
    return line ? line.match(BOXDEF)[3].replace(/<br\/>/g, ' ').replace(/\\'/g, "'") : key;
  }
  function exOf(id, key) { var e = (EX[id] || {})[key]; return typeof e === 'string' ? EX[id][e] : e; }

  var VIS_TYPES = ['flow', 'gate', 'dots', 'bars', 'scale', 'card', 'journey', 'timeline'];

  function partName(id) { return RAW[id] ? (RAW[id].short || RAW[id].title) : id; }
  function staleText(s) {
    return partName(s.id) + ' is out of date: ' + (s.what === 'above' ? partName(s.parent) + ' changed above it.' : 'its flowchart, or a line it uses, changed.');
  }

  // Self-check: the map and the slides point at real boxes, every slide has a picture, every box has
  // a slide that explains it, the "Try it" walk gives each search's real outcome from the live run,
  // and no part is out of date against the part above it.
  function checkTree() {
    var problems = [], seen = {};
    Object.keys(N).forEach(function (id) {
      var n = N[id];
      (n.kids || []).forEach(function (k) { if (!N[k]) problems.push(id + ': kid ' + k + ' is missing'); seen[k] = (seen[k] || 0) + 1; });
      Object.keys(n.links || {}).forEach(function (box) {
        var t = n.links[box];
        if (!N[t]) problems.push(id + ': box ' + box + ' opens ' + t + ', which is missing');
        else if ((n.kids || []).indexOf(t) < 0) problems.push(id + ': box ' + box + ' opens ' + t + ', which is not one of its kids');
        var re = new RegExp('(^|[\\s>])' + box + '[\\[\\(\\{]');
        if (!(n.chart || []).some(function (l) { return re.test(l); })) problems.push(id + ': box ' + box + ' is not in the chart');
      });
      if (n.chart && !n.head) problems.push(id + ': no head');
      if (n.chart && !DECKS[id]) problems.push(id + ': a flow with no slides');
      if (n.chart) {
        var keys = chartKeys(id), ex = EX[id] || {};
        keys.forEach(function (k) { if (!ex[k]) problems.push(id + ': step ' + k + ' (' + labelOf(id, k) + ') has no example'); });
        Object.keys(ex).forEach(function (k) {
          var e = exOf(id, k);
          if (keys.indexOf(k) < 0) problems.push(id + ': example ' + k + ' is not a step in the chart');
          if (!e || !e.rows || !e.rows.length) problems.push(id + ': example ' + k + ' has no picture');
          else if (!EXTAG[e.tag]) problems.push(id + ': example ' + k + ' is not tagged real, made or plan');
        });
      }
    });
    Object.keys(seen).forEach(function (k) { if (seen[k] > 1) problems.push(k + ' has ' + seen[k] + ' parents'); });
    Object.keys(N).forEach(function (id) { if (MODULES.indexOf(id) < 0 && !PARENT[id]) problems.push(id + ' has no parent'); });
    // A second part with the same id would replace the first one in silence (index.html's LOGIC.flow keeps the names).
    (LOGIC._dups || []).forEach(function (id) { problems.push(id + ' is the id of two parts: give one a new id'); });
    Object.keys(DECKS).forEach(function (d) {
      if (!N[d]) problems.push('deck ' + d + ' has no box');
      DECKS[d].forEach(function (s, k) {
        var at = 'deck ' + d + ' slide ' + (k + 1);
        if (!s.head) problems.push(at + ': no head');
        if (!s.visual || VIS_TYPES.indexOf(s.visual.type) < 0) problems.push(at + ': no picture (every slide needs an animation or a visual aid)');
        if (!s.about || !s.about.length) problems.push(at + ': about nothing');
        // A slide belongs to one view: its part, or one of that part's rules. So no two views show the same slides
        // (Will, Nov 6, on "Clean?": "This is showing the same slideshow as the other one").
        if (s.about && s.about.length > 1) problems.push(at + ': it belongs to one view, but it is about ' + s.about.join(', '));
        var mine = [d].concat(Object.keys((FLOWS[d] && FLOWS[d].leaves) || {}));
        (s.about || []).forEach(function (a) {
          if (!N[a]) problems.push(at + ': about ' + a + ', which is missing');
          else if (mine.indexOf(a) < 0) problems.push(at + ': about ' + a + ', which is not ' + d + ' or one of its rules');
        });
        if (s.open && !(N[s.open] && N[s.open].open)) problems.push(at + ': open ' + s.open + ' has no decision');
        var v = s.visual || {};
        if (v.type === 'bars') v.rows.forEach(function (r) {
          var sum = r.parts.reduce(function (t, p) { return t + p[0]; }, 0);
          if (sum > v.max + 1e-9) problems.push(at + ': a bar adds to ' + sum + ', over its max ' + v.max);
        });
        if (v.type === 'scale') (v.dots || []).concat(v.lines || []).forEach(function (x) { if (x[0] < (v.min || 0) || x[0] > (v.max === undefined ? 1 : v.max)) problems.push(at + ': ' + x[1] + ' is off the scale'); });
      });
    });
    Object.keys(N).forEach(function (id) {
      if (!deckSlidesOf(id).length) problems.push(id + ' has no slideshow: no slide of ' + deckOf(id) + ' is about it');
      // A question Will cannot answer is no question: one of its own slides must show its choices (Nov 7: "Clean?" got a
      // question with no slide that asked it).
      if (N[id].open && !deckSlidesOf(id).some(function (x) { return x.s.open === id; })) problems.push(id + ': its question has no slide that asks it: give one of its slides open: \'' + id + '\'');
    });
    // Plain names only, never designators like F3, J1 or Part 3 (Will, Nov 6: "Let's never refer to things as their
    // designators when talking to me"). Box keys and ids are not shown, so only shown text is read.
    // The tracking module adds the verifiers' codes (GA32, AR5; GA4 is a product name) and their goal ids.
    // The bid and budget module adds its goal ids: the audit's bidding and budget goals, and the daily check's.
    // The client module adds the goal ids of the inbox, meetings and CRM trees.
    var DESIG = /\b(F[1-4]|J[12])\b|\bPart \d\b|\b(GA\d{2,}|AR\d+|MA\d+)\b|\bct-(real|once|primary|values|offline)\b|\b(tracking-works|uet-live|goals-right|sources-read|dataset-right|fires-on-site|optimizes-on-real|counted-once|values-present|conversions-api|instant-forms|settings-as-planned|tag-alive|changes-caught|trust-calendar|past-broken-days-found)\b|\b(ct|tc|pb|co|ca|fs|or|vp|if|sp|ta|cc|dr|sr)-[a-z0-9]+-[a-z0-9-]+\b|\bbb-[a-z0-9]+(-[a-z0-9]+)*\b|\b(bids-fit-targets|cpc-near-norm|budgets-ready|account-can-spend)\b|\b(clients-answered|prospects-answered|teammates-answer|no-google-reps|no-cold-pitches|machine-filed|cleanup-never-hides|sources-loaded|matched-right|transcript-read|items-complete|proposals-reviewed|tasks-done-on-time|decisions-in-notebook|sales-next-step|item-shows-source|write-(right-target|fields-allowed|values-valid|backed-by-source|keeps-record-passing|not-destructive|once|read-back|routed)|prospect-(named|not-paying|not-stale)|onboarding-(record-complete|contract-billing|plan|not-stuck)|active-(record-complete|billed|plan-contract|not-leaving)|client-set-up|family-known|payment-attributed|plan-resolved|payment-matches-plan|plan-sources-agree|link-well-formed|link-owner-valid|links-agree|mirror-whole|results-explained|alerts-once)\b/;
    // Show it here; never send the reader to another part for it (Will, Nov 7, on "The five rules are in the part on
    // which days count.": "Why is this not showing me the 5 rules? Thatas dumb").
    var POINTER = /\b(?:are|is|sits?|lives?)\s+(?:listed\s+|shown\s+|explained\s+|described\s+)?(?:in|under)\s+(?:the|its|their|another)\s+(?:\w+\s+)?(?:part|slides?|view)\b|\bsee\s+(?:the|its|their)\s+(?:\w+\s+)?(?:part|slides?|view)\b|\b(?:listed|shown|explained|described)\s+(?:in|under)\s+(?:the|its|another)\s+(?:\w+\s+)?(?:part|slides?|view)\b/i;
    // No robot speak (Will, Nov 7: "It's sound like robot speak"): no chain of colons, and no coined name where plain words
    // belong. His real case: "So: a new break: Opus answers for KDX's Google". A quote of someone's own words is exempt.
    // shortcut: only the modules written in plain words fail it; each rebuild or new module adds its id, until all are in.
    var PLAIN = ['tracking', 'client', 'bids', 'motion', 'money'];
    var COINED = /\bbrief\b|\bknown break\b|\bBarbara’s (?:weeks|list)\b|\bweek rules\b|\bthe walls\b|\bread-back\b/i;
    Object.keys(FLOWS).forEach(function (id) {
      var shown = [], quoted = [];
      var walk = function (v, key, q) {
        if (key === 'links' || key === 'about' || key === 'reviewed' || key === 'parent' || key === 'id' || key === 'chart') return;
        q = q || key === 'quote';
        if (typeof v === 'string') (q ? quoted : shown).push(v);
        else if (Array.isArray(v)) v.forEach(function (x) { walk(x, null, q); });
        else if (v && typeof v === 'object') Object.keys(v).forEach(function (k) { walk(v[k], k, q); });
      };
      walk(FLOWS[id]);
      (FLOWS[id].chart || []).forEach(function (l) { (l.match(/"[^"]*"/g) || []).forEach(function (q) { shown.push(q); }); });
      var all = shown.concat(quoted);
      all.filter(function (t) { return DESIG.test(t); }).forEach(function (t) { problems.push(id + ': a designator in “' + t.slice(0, 70) + '”: use the plain name'); });
      all.filter(function (t) { return POINTER.test(t); }).forEach(function (t) { problems.push(id + ': “' + t.slice(0, 70) + '” sends the reader to another part: show it here'); });
      if (PLAIN.indexOf(pathOf(id)[0]) >= 0) shown.forEach(function (t) {
        if ((t.replace(/\d:\d\d|https?:/g, '').match(/:/g) || []).length > 1) problems.push(id + ': “' + t.slice(0, 70) + '” chains colons: say it in sentences');
        var c = t.match(COINED);
        if (c) problems.push(id + ': “' + t.slice(0, 70) + '” uses the coined name “' + c[0] + '”: say it in plain words');
      });
    });
    // Each part sits under the part that opens it, and each box opens a rule of its own part or a part below it.
    Object.keys(FLOWS).forEach(function (id) {
      var f = FLOWS[id], up = f.parent && FLOWS[f.parent];
      if (f.parent && !up) problems.push(id + ': the part above it, ' + f.parent + ', is missing');
      if (up && !Object.keys(up.links || {}).some(function (b) { return up.links[b] === id; })) problems.push((up.short || up.title) + ' has no box that opens ' + (f.short || f.title));
      Object.keys(f.links || {}).forEach(function (b) {
        var t = f.links[b], ok = (f.leaves && Object.prototype.hasOwnProperty.call(f.leaves, t)) || (FLOWS[t] && FLOWS[t].parent === id);
        if (!ok) problems.push(id + ': box ' + b + ' opens ' + t + ', which is not a rule of this part or a part below it');
      });
      Object.keys(f.leaves || {}).forEach(function (l) { if (FLOWS[l]) problems.push(l + ' is both a part and a rule'); });
      var unknown = Object.keys(FP.tokens(RAW[id])).filter(function (k) { return !Object.prototype.hasOwnProperty.call(F, k); });
      if (unknown.length) problems.push(id + ': no such fact ' + unknown.map(function (k) { return '{' + k + '}'; }).join(', '));
    });
    // A change above must reach every part below it (Will, Nov 6): an out-of-date part fails the check.
    STALE.forEach(function (s) { problems.push(staleText(s)); });
    problems.forEach(function (p) { console.error('[flowdocs] check', p); });
    console.log('[flowdocs] map check', { boxes: Object.keys(N).length, decks: Object.keys(DECKS).length, slides: Object.keys(DECKS).reduce(function (s, d) { return s + DECKS[d].length; }, 0), problems: problems.length });
    return problems;
  }

  // ---------------------------------------------------------------------------------------------
  // The flowchart (Mermaid, the same colors as the waterfall decks)
  // ---------------------------------------------------------------------------------------------
  var C = dark
    ? { text: '#f5f5f7', line: '#8e8e93', bg: '#2c2c2e', code: ['#3a3a3c', '#8e8e93'], deep: ['#123430', '#30b0a0'], opus: ['#2f2340', '#bf5af2'],
        keep: ['#183a22', '#34c759'], route: ['#16304d', '#0a84ff'], block: ['#451c1a', '#ff453a'], will: ['#3d2e12', '#ff9f0a'], next: ['#262628', '#8e8e93'] }
    : { text: '#1d1d1f', line: '#86868b', bg: '#ffffff', code: ['#f2f2f7', '#8e8e93'], deep: ['#e6f6f4', '#30b0a0'], opus: ['#f5ecfc', '#af52de'],
        keep: ['#e9f9ee', '#34c759'], route: ['#e8f1fd', '#0071e3'], block: ['#fdecea', '#ff3b30'], will: ['#fff6e5', '#ff9500'], next: ['#fafafa', '#aeaeb2'] };
  function def(name, extra) {
    var p = C[name];
    return 'classDef ' + name + ' fill:' + p[0] + ',stroke:' + p[1] + ',color:' + C.text + ',stroke-width:1.5px' + (extra ? ',' + extra : '') + ';';
  }
  var DEFS = [def('code'), def('deep'), def('opus'), def('keep'), def('route'), def('block'), def('will'), def('next', 'stroke-dasharray:5 4')];
  var KIND = { code: 'code', deep: 'DeepSeek', opus: 'Opus', will: 'Will, or a check', keep: 'keep', route: 'route', block: 'block', next: 'not built yet' };

  if (window.mermaid) {
    mermaid.initialize({
      startOnLoad: false, securityLevel: 'antiscript', theme: 'base',
      themeVariables: { fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif', fontSize: '14px', primaryTextColor: C.text, lineColor: C.line,
        edgeLabelBackground: C.bg, textColor: C.text, titleColor: C.text, clusterBkg: dark ? '#262628' : '#fafafa', clusterBorder: C.line },
      flowchart: { htmlLabels: true, curve: 'basis', nodeSpacing: 26, rankSpacing: 34, padding: 8, useMaxWidth: false, wrappingWidth: 220 }
    });
  } else {
    console.error('[flowdocs] mermaid did not load');
  }

  var seq = 0;
  function drawCharts(root) {
    var els = Array.prototype.slice.call(root.querySelectorAll('.chart:not([data-drawn])')).filter(function (el) { return el.offsetParent !== null; });
    return Promise.all(els.map(drawChart));
  }
  function drawChart(el) {
    var id = el.getAttribute('data-node');
    el.setAttribute('data-drawn', '1');
    if (!window.mermaid) { el.innerHTML = '<p class="chart-err">The chart library did not load.</p>'; return Promise.resolve(); }
    var t0 = performance.now();
    return mermaid.render('mmd' + (++seq), N[id].chart.concat(DEFS).join('\n')).then(function (out) {
      el.innerHTML = out.svg;
      bindBoxes(el, id);
      console.log('[flowdocs] chart drawn', { node: id, ms: Math.round(performance.now() - t0) });
    }).catch(function (e) {
      el.innerHTML = '<p class="chart-err">The chart did not draw.</p>';
      console.error('[flowdocs] chart failed', { node: id, error: String(e) });
    });
  }
  // Example off: a box that opens glows on hover in its own color (a flow opens its flowchart, a rule
  // opens its slide). Example on: every step glows, and a click shows that step's example below.
  function bindBoxes(el, id) {
    var links = N[id].links || {}, bound = 0;
    el.querySelectorAll('g.node').forEach(function (g) {
      var m = (g.id || '').match(/flowchart-([A-Za-z0-9_]+)-\d+$/);
      if (!m) return;
      var key = m[1], target = links[key], hasEx = !!exOf(id, key);
      if (!target && !hasEx) return;
      var shape = g.querySelector('rect, polygon, path');
      if (shape) g.style.setProperty('--glow', getComputedStyle(shape).stroke);
      g.setAttribute('data-key', key);
      g.setAttribute('role', 'button');
      if (target) { g.classList.add('drill'); g.setAttribute('data-open', (N[target].chart ? 'Open ' : 'Explain ') + N[target].title); bound++; }
      if (target && asksIn(target)) { g.classList.add('ask'); g.setAttribute('data-open', g.getAttribute('data-open') + ' · a question for you'); }
      if (hasEx) { g.classList.add('ex'); g.setAttribute('data-example', 'Example: ' + labelOf(id, key)); }
      var act = function () {
        if (exOn) { if (hasEx) showExample(key, g); }
        else if (target) zoomTo(target, g);
      };
      g.addEventListener('click', act);
      g.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); act(); } });
    });
    setBoxMode(el);
    if (bound !== Object.keys(links).length) console.warn('[flowdocs] some boxes did not bind', { node: id, bound: bound, links: Object.keys(links).length });
  }
  // A box glows yellow while a question for Will waits in it or anywhere below it, until he picks an answer on this
  // page (Will, Nov 6: "glow yellow or something so I can know that there is a question inside of a slide").
  function asksIn(id) {
    if (N[id].open && answerOf(id) < 0) return true;
    var below = (N[id].kids || []).concat(Object.keys((FLOWS[id] && FLOWS[id].leaves) || {}));
    return below.some(function (k) { return k !== id && asksIn(k); });
  }
  // Labels and keyboard focus follow the Example switch.
  function setBoxMode(root) {
    root.querySelectorAll('g.node[data-key]').forEach(function (g) {
      var label = exOn ? g.getAttribute('data-example') : g.getAttribute('data-open');
      g.setAttribute('tabindex', label ? '0' : '-1');
      if (label) g.setAttribute('aria-label', label); else g.removeAttribute('aria-label');
    });
  }

  function kickerHTML(id, label) {
    var d = depthOf(id), st = statusOf(id);
    var s = '<p class="kicker">' + esc(label || (LEVELS[d] + ' · level ' + (d + 1)));
    if (st) s += ' <span class="st' + (/not (built|live)/i.test(st) ? ' next' : '') + '">' + esc(st) + '</span>';
    return s + '</p>';
  }
  function legendHTML(id) {
    var used = {};
    (N[id].chart.join(' ').match(/:::(\w+)/g) || []).forEach(function (m) { used[m.slice(3)] = 1; });
    var ask = Object.keys(N[id].links || {}).some(function (k) { return asksIn(N[id].links[k]); });
    return '<div class="legend">' + ['code', 'deep', 'opus', 'will', 'keep', 'route', 'block', 'next'].filter(function (k) { return used[k]; }).map(function (k) {
      return '<span class="chip' + tn(k) + '">' + KIND[k] + '</span>';
    }).join('') + (ask ? '<span class="chip ask">a question for you</span>' : '') + '</div>';
  }
  // The flowchart view: only the flowchart (Will, Nov 6), and the example under it when Example is on.
  function pageHTML(id) {
    return '<div class="page">' + kickerHTML(id) + '<h1>' + esc(N[id].head) + '</h1>' + legendHTML(id) +
      '<div class="chart" data-node="' + id + '"><p class="drawing">Drawing the chart…</p></div>' +
      '<section class="expanel" id="expanel" aria-live="polite" hidden></section></div>';
  }

  // ---------------------------------------------------------------------------------------------
  // Slide text parts
  // ---------------------------------------------------------------------------------------------
  function statsHTML(stats) {
    return '<div class="stats">' + stats.map(function (s) {
      return '<div class="stat"><div class="v">' + esc(s[0]) + '</div><div class="d">' + esc(s[1]) + '</div><span class="tag t-' + s[2] + '">' + TAG[s[2]] + '</span></div>';
    }).join('') + '</div>';
  }
  function cell(v, i, head) {
    if (OUT[v]) return '<td><span class="pill p-' + v + '">' + OUT[v] + '</span></td>';
    if (/^[\d.]+$/.test(v)) return '<td class="num">' + esc(v) + '</td>';
    return '<td' + (i === 0 && /search|pattern/i.test(head[0]) ? ' class="s"' : '') + '>' + esc(v) + '</td>';
  }
  function tableHTML(cs) {
    return '<div class="tbl"><table><thead><tr>' + cs.head.map(function (h) { return '<th>' + esc(h) + '</th>'; }).join('') +
      '</tr></thead><tbody>' + cs.rows.map(function (r) { return '<tr>' + r.map(function (c, i) { return cell(c, i, cs.head); }).join('') + '</tr>'; }).join('') +
      '</tbody></table></div><p class="note"><span class="tag t-real">Real</span>' + esc(cs.note || '') + '</p>';
  }
  function quoteHTML(q) { return '<div class="quote"><q>' + esc(q[0]) + '</q><span>Will, ' + esc(q[1]) + '</span></div>'; }
  function openHTML(id) {
    var o = N[id].open, chosen = answerOf(id);
    return '<section class="decide" data-decide="' + id + '"><p class="kicker">Will’s call · ' + esc(o.since) + '</p><p class="q">' + esc(o.q) + '</p><div class="opts">' +
      o.opts.map(function (x, i) {
        return '<button type="button" class="opt' + (chosen === i ? ' on' : '') + '" data-opt="' + i + '" aria-pressed="' + (chosen === i) + '"><span class="n">' + (i + 1) +
          '</span><span><b>' + esc(x[0]) + (x[1] ? '<em class="pick">★ Claude’s pick</em>' : '') + '</b><small>' + esc(x[2]) + '</small></span></button>';
      }).join('') + '</div><p class="decide-note">Your pick stays on this page. “Copy answers” puts it on your clipboard.</p></section>';
  }
  function slideHTML(d, s, k) {
    var h = '<div class="page">' + kickerHTML(d, s.kicker) + '<h1>' + esc(s.head) + '</h1>';
    if (s.lede) h += '<p class="lede">' + esc(s.lede) + '</p>';
    h += '<div class="visual" data-v="' + d + ':' + k + '"></div>';
    if (s.vcap) h += '<p class="vcap">' + esc(s.vcap) + '</p>';
    if (s.stats) h += statsHTML(s.stats);
    if (s.table) h += tableHTML(s.table);
    if (s.quote) h += quoteHTML(s.quote);
    if (s.open) h += openHTML(s.open);
    return h + '</div>';
  }

  // ---------------------------------------------------------------------------------------------
  // Pictures. Each one is drawn in its final state, then moves only when someone can see it.
  // ---------------------------------------------------------------------------------------------
  var ICON = { pass: '✓', stop: '✕', hold: '!', wait: '→' };
  function every(el, ms, n, step, done) {
    clearInterval(el._timer);
    var i = 0;
    el._timer = setInterval(function () { if (i >= n) { clearInterval(el._timer); if (done) done(); return; } step(i++); }, ms);
  }
  function boxHTML(s) { return '<div class="vbox' + tn(s[2]) + '"><b>' + esc(s[0]) + '</b>' + (s[1] ? '<span>' + esc(s[1]) + '</span>' : '') + '</div>'; }

  var VIS = {
    flow: {
      html: function (v) {
        return '<div class="vflow">' + v.rows.map(function (r) {
          var parts = [];
          r.steps.forEach(function (s, i) { if (i) parts.push('<i class="varrow"></i>'); parts.push(boxHTML(s)); });
          if (r.end) parts.push('<i class="varrow"></i><div class="vend">' + r.end.map(boxHTML).join('') + '</div>');
          return '<div>' + (r.title ? '<p class="vtitle">' + esc(r.title) + '</p>' : '') + '<div class="vrow">' + parts.join('') + '</div></div>';
        }).join('') + '</div>';
      },
      play: function (el, animate) {
        var seqEls = [];
        el.querySelectorAll('.vrow').forEach(function (row) { Array.prototype.forEach.call(row.children, function (c) { seqEls.push(c); }); });
        var lit = function (c, on) { (c.classList.contains('vend') ? Array.prototype.slice.call(c.querySelectorAll('.vbox')) : [c]).forEach(function (b) { b.classList.toggle('on', on); }); };
        var fin = function () {
          seqEls.forEach(function (c) { if (c.classList.contains('varrow')) c.classList.add('on'); else lit(c, false); });
          el.querySelectorAll('.vrow').forEach(function (row) { lit(row.lastElementChild, true); });
        };
        if (!animate || !animOK()) { fin(); return; }
        seqEls.forEach(function (c) { c.classList.remove('on'); lit(c, false); });
        var prev = null;
        every(el, 300, seqEls.length, function (i) {
          var c = seqEls[i];
          if (c.classList.contains('varrow')) { c.classList.add('on'); return; }
          if (prev) lit(prev, false);
          lit(c, true); prev = c;
        }, fin);
      }
    },
    gate: {
      html: function (v) {
        return '<div class="vgate">' + v.rows.map(function (r) {
          return '<div class="g ' + r[2] + '"><span class="ic">' + ICON[r[2]] + '</span><div><b>' + esc(r[0]) + '</b>' + (r[1] ? '<span>' + esc(r[1]) + '</span>' : '') + '</div></div>';
        }).join('') + (v.end ? '<div class="gend"><i class="varrow"></i>' + boxHTML([v.end[0], v.end[2] || '', v.end[1]]) + '</div>' : '') + '</div>';
      },
      play: function (el, animate) {
        var gs = el.querySelectorAll('.g'), end = el.querySelector('.gend .vbox'), arrow = el.querySelector('.gend .varrow');
        var fin = function () { gs.forEach(function (g) { g.classList.add('on'); }); if (end) { end.classList.add('on'); arrow.classList.add('on'); } };
        if (!animate || !animOK()) { fin(); return; }
        gs.forEach(function (g) { g.classList.remove('on'); });
        if (end) { end.classList.remove('on'); arrow.classList.remove('on'); }
        every(el, 380, gs.length, function (i) { gs[i].classList.add('on'); }, fin);
      }
    },
    dots: {
      html: function (v) {
        var total = v.groups.reduce(function (s, g) { return s + g[0]; }, 0), dots = '';
        v.groups.forEach(function (g) { for (var i = 0; i < g[0]; i++) dots += '<i class="' + tn(g[1]).trim() + '"></i>'; });
        return '<div class="vdots' + (total <= 40 ? ' big' : '') + '">' + dots + '</div><div class="vlegend">' +
          v.groups.map(function (g) { return '<span class="' + tn(g[1]).trim() + '"><b>' + g[0] + '</b> ' + esc(g[2]) + '</span>'; }).join('') + '</div>';
      },
      play: function (el, animate) {
        var ds = el.querySelectorAll('.vdots i');
        if (!animate || !animOK()) { ds.forEach(function (d) { d.classList.add('on'); }); return; }
        ds.forEach(function (d) { d.classList.remove('on'); });
        var per = Math.max(1, Math.ceil(ds.length / 28)), at = 0;
        every(el, 45, Math.ceil(ds.length / per), function () { for (var k = 0; k < per && at < ds.length; k++) ds[at++].classList.add('on'); });
      }
    },
    bars: {
      html: function (v) {
        var marks = v.rows.some(function (r) { return r.marks; });
        return '<div class="vbars' + (marks ? ' marks' : '') + '">' + v.rows.map(function (r) {
          var sum = r.parts.reduce(function (s, p) { return s + p[0]; }, 0);
          var w = 100 * sum / v.max, outside = r.parts.length === 1 && w < 12; // a short bar puts its number beside it
          return '<div><div class="vbar-label">' + esc(r.label) + '</div><div class="vbar"><div class="fill" style="width:' + w + '%">' +
            r.parts.map(function (p) { return '<div class="seg' + tn(p[1]) + '" style="width:' + (100 * p[0] / sum) + '%">' + (outside ? '' : esc(p[2])) + '</div>'; }).join('') + '</div>' +
            (outside ? '<span class="vval" style="left:calc(' + w + '% + 8px)">' + esc(r.parts[0][2]) + '</span>' : '') +
            (r.marks || []).map(function (m) { return '<i class="mark" style="left:' + (100 * m[0] / v.max) + '%"><span>' + esc(m[1]) + ' ' + m[0].toFixed(2) + '</span></i>'; }).join('') + '</div></div>';
        }).join('') + '</div>';
      },
      play: function (el, animate) {
        var fills = el.querySelectorAll('.fill');
        if (!animate || !animOK()) { fills.forEach(function (f) { f.style.setProperty('--g', 1); }); return; }
        fills.forEach(function (f) { f.style.transition = 'none'; f.style.setProperty('--g', 0.03); });
        void el.offsetWidth;
        fills.forEach(function (f, i) { f.style.transition = ''; setTimeout(function () { f.style.setProperty('--g', 1); }, 80 + i * 180); });
      }
    },
    scale: {
      html: function (v) {
        var min = v.min || 0, max = v.max === undefined ? 1 : v.max, pos = function (x) { return 100 * (x - min) / (max - min); };
        var zones = (v.zones || []).map(function (z) { return '<i class="zone' + tn(z[3]) + '" style="left:' + pos(z[0]) + '%;width:' + (pos(z[1]) - pos(z[0])) + '%"></i>'; }).join('');
        var lines = (v.lines || []).map(function (l, i) { return '<i class="line' + tn(l[2]) + '" style="left:' + pos(l[0]) + '%;--ly:' + (i % 2 ? 16 : 0) + 'px"><span>' + esc(l[1]) + '</span></i>'; }).join('');
        var stack = {};
        var dots = (v.dots || []).map(function (d) {
          var key = Math.round(pos(d[0]) / 2), lift = (stack[key] = (stack[key] || 0) + 1) - 1;
          return '<i class="dot' + tn(d[2] || 'route') + '" data-lift="' + (-lift * 14) + '" style="left:' + pos(d[0]) + '%;transform:translateY(' + (-lift * 14) + 'px)" title="' + esc(d[1] + ' · ' + num(d[0])) + '"></i>';
        }).join('');
        var ticks = [0, 0.25, 0.5, 0.75, 1].map(function (t) { return '<i class="tick" style="left:' + (t * 100) + '%">' + (min + t * (max - min)).toFixed(2) + '</i>'; }).join('');
        var groups = (v.zones || []).map(function (z) {
          var names = (v.dots || []).filter(function (d) { return d[0] >= z[0] && (d[0] < z[1] || (z[1] >= max && d[0] <= max)); }).map(function (d) { return d[1] + ' ' + num(d[0]); });
          return '<div class="' + tn(z[3]).trim() + '"><h5>' + esc(z[2]) + '</h5><p>' + (names.length ? esc(names.join(' · ')) : 'none') + '</p></div>';
        }).join('');
        return (v.label ? '<p class="vtitle">' + esc(v.label) + '</p>' : '') + '<div class="vscale"><div class="vaxis"><i class="track"></i>' + zones + lines + dots + ticks + '</div></div>' +
          (groups ? '<div class="vzones">' + groups + '</div>' : '');
      },
      play: function (el, animate) {
        if (!animate || !animOK()) return;
        el.querySelectorAll('.dot').forEach(function (d, i) {
          var lift = +d.getAttribute('data-lift');
          d.animate([{ transform: 'translateY(' + (lift - 30) + 'px)' }, { transform: 'translateY(' + lift + 'px)' }], { duration: 520, delay: i * 90, easing: 'cubic-bezier(.3,1.5,.5,1)', fill: 'backwards' });
        });
      }
    },
    card: {
      html: function (v) {
        return '<div class="vcard"><h4>' + esc(v.title) + '</h4><dl>' + v.fields.map(function (f) { return '<dt>' + esc(f[0]) + '</dt><dd>' + esc(f[1]) + '</dd>'; }).join('') + '</dl>' +
          (v.stamp ? '<div class="stamp' + tn(v.stamp[1]) + '">' + esc(v.stamp[0]) + '</div>' : '') + '</div>';
      },
      play: function (el, animate) {
        if (!animate || !animOK()) return;
        var dds = el.querySelectorAll('dd'), st = el.querySelector('.stamp');
        dds.forEach(function (d, i) { d.animate([{ transform: 'translateX(16px)' }, { transform: 'none' }], { duration: 380, delay: i * 120, easing: 'ease-out', fill: 'backwards' }); });
        if (st) st.animate([{ transform: 'rotate(-1.5deg) scale(1.3)' }, { transform: 'rotate(-1.5deg) scale(1)' }], { duration: 420, delay: dds.length * 120 + 150, easing: 'cubic-bezier(.3,1.5,.5,1)', fill: 'backwards' });
      }
    }
  };

  // Stateful pictures: a search walking through steps.
  function reveal(el, animate) {
    var lis = el.querySelectorAll('.steps > li'), prog = el.querySelector('.prog'), n = lis.length;
    var set = function (i) { if (prog) prog.style.setProperty('--p', n > 1 ? i / (n - 1) : 1); };
    if (!animate || !animOK()) { clearInterval(el._timer); lis.forEach(function (l) { l.classList.add('on'); }); set(n - 1); return; }
    lis.forEach(function (l) { l.classList.remove('on'); });
    set(0);
    every(el, 600, n, function (i) { lis[i].classList.add('on'); set(i); });
  }
  function chipsHTML(names, pick, italic) {
    return '<div class="runs">' + names.map(function (x, i) { return '<button type="button" data-pick="' + i + '" class="' + (italic ? 's' : '') + (i === pick ? ' on' : '') + '">' + esc(x) + '</button>'; }).join('') + '</div>';
  }
  function mountJourney(el, w) {
    var pick = 0, timeline = w.type === 'timeline';
    function draw(animate) {
      var run = timeline ? { steps: w.items } : w.runs[pick];
      el.innerHTML = (!timeline && w.runs.length > 1 ? chipsHTML(w.runs.map(function (r) { return r.name; }), pick, true) : '') +
        '<ol class="steps' + (timeline ? ' time' : '') + '"><span class="prog"></span>' + run.steps.map(function (s) { return '<li><b>' + esc(s[0]) + '</b><span>' + esc(s[1]) + '</span></li>'; }).join('') + '</ol>' +
        '<div class="jfoot">' + (timeline ? '' : 'Where it ends: <span class="pill p-' + run.out + '">' + OUT[run.out] + '</span>') + '<button type="button" class="again">Play again</button></div>';
      reveal(el, animate);
    }
    el.addEventListener('click', function (e) {
      var b = e.target.closest('[data-pick]');
      if (b) { pick = +b.getAttribute('data-pick'); console.log('[flowdocs] journey pick', { search: w.runs[pick].name }); draw(true); }
      if (e.target.closest('.again')) reveal(el, true);
    });
    el._replay = function () { reveal(el, true); };
    draw(true);
  }
  function mountVisuals(slide) {
    slide.querySelectorAll('.visual').forEach(function (el) {
      if (el.getAttribute('data-mounted')) { if (el._replay) el._replay(); return; }
      var x = deckSet[+slide.getAttribute('data-k')], v = x.s.visual; // the slide's own picture: example slides are not in a deck
      el.setAttribute('data-mounted', '1');
      try {
        if (v.type === 'journey' || v.type === 'timeline') mountJourney(el, v);
        else { el.innerHTML = VIS[v.type].html(v); el._replay = function () { VIS[v.type].play(el, true); }; el._replay(); }
        console.log('[flowdocs] picture drawn', { view: deckFor, slide: +slide.getAttribute('data-k') + 1, example: !!x.s.example, type: v.type });
      } catch (e) {
        console.error('[flowdocs] picture failed', { view: deckFor, slide: +slide.getAttribute('data-k') + 1, type: v && v.type, error: String(e) });
        el.innerHTML = '<p class="chart-err">This picture did not draw.</p>';
      }
    });
  }

  // ---------------------------------------------------------------------------------------------
  // Notes and answers: they stay on this page. One button copies them all. Nothing is sent anywhere.
  // ---------------------------------------------------------------------------------------------
  var KEY = 'flowdocs-notes-v1';
  var notes = (function () {
    try { var v = JSON.parse(localStorage.getItem(KEY) || '[]'); return Array.isArray(v) ? v : []; }
    catch (e) { console.warn('[flowdocs] notes load failed', String(e)); return []; }
  })();
  function saveNotes() {
    try { localStorage.setItem(KEY, JSON.stringify(notes)); }
    catch (e) { console.warn('[flowdocs] notes save failed (they stay until you reload)', String(e)); }
    document.getElementById('ncount').textContent = notes.length;
    drawHere();
    drawQuestions();
  }
  function answerOf(id) { for (var i = 0; i < notes.length; i++) if (notes[i].kind === 'answer' && notes[i].id === id) return notes[i].opt; return -1; }
  // An answer button stays lit only while its answer is in the notes.
  function unmarkGone() {
    document.querySelectorAll('.opt.on').forEach(function (o) {
      if (answerOf(o.closest('[data-decide]').getAttribute('data-decide')) < 0) { o.classList.remove('on'); o.setAttribute('aria-pressed', 'false'); }
    });
  }

  // ---------------------------------------------------------------------------------------------
  // Views and routing
  // ---------------------------------------------------------------------------------------------
  var view = document.getElementById('view'), nav = document.getElementById('nav'), crumbsEl = document.getElementById('crumbs');
  var zoombox = document.getElementById('zoombox'), toastEl = document.getElementById('toast');
  var vFlow = document.getElementById('v-flow'), vSlides = document.getElementById('v-slides');
  var cur = null, deckFor = null, deckSet = [], slideAt = 0, zoomPending = false, pullBack = false;
  var exOn = false, exSel = null, exToggle = document.getElementById('ex-toggle');

  function route() {
    var m = location.hash.match(/^#\/([a-z0-9]+)(\/slides(?:\/(\d+))?)?$/i);
    var id = m && N[m[1]] ? m[1] : ROOT;
    var slides = !!(m && m[2]), slide = m && m[3] ? +m[3] : 0;
    if (!slides && !N[id].chart) slides = true; // a rule has no flowchart: it lives in its own slides
    if (slides && !slidesOf(id).length) id = flowOf(id); // no slides of its own: show its part's
    return { id: id, slides: slides, slide: slide };
  }
  function go(id, slides, slide) {
    var h = '#/' + id + (slides ? '/slides' + (slide ? '/' + slide : '') : '');
    if (location.hash === h) render(); else location.hash = h;
  }
  // Each view has its own slideshow: the slides about the box you are looking at (Will, Nov 6).
  function openSlides(id) { go(id, true, 0); }
  function slideNow() { return cur && cur.slides && deckSet[slideAt] ? deckSet[slideAt].s : null; }
  function aboutId() { return cur ? cur.id : ROOT; }
  function aboutText() {
    var s = slideNow();
    if (s) return pathText(cur.id) + ' — slide ' + (slideAt + 1) + ' “' + s.head + '”';
    if (exOn && exSel) return pathText(cur.id) + ' — example: ' + labelOf(cur.id, exSel);
    return pathText(aboutId());
  }

  function render() {
    var r = route(), t0 = performance.now(), prev = cur;
    cur = r;
    console.log('[flowdocs] render', { from: prev && prev.id, to: r.id, view: r.slides ? 'slides' : 'flowchart', slide: r.slide });
    if (menuOn) setMenu(false);
    try {
      drawCrumbs(r.id);
      if (!prev || pathOf(prev.id)[0] !== pathOf(r.id)[0]) drawQuestions(); // another module: its own questions
      vFlow.setAttribute('aria-pressed', String(!r.slides));
      vSlides.setAttribute('aria-pressed', String(r.slides));
      exToggle.hidden = r.slides; // examples belong to the flowchart
      if (!prev || prev.id !== r.id || prev.slides !== r.slides) exSel = null;
      var done = r.slides ? renderDeck(r.id, r.slide) : renderPage(r.id);
      Promise.resolve(done).then(function () {
        window.__rendered = r.id + (r.slides ? '/slides/' + slideAt : '');
        console.log('[flowdocs] rendered', { id: r.id, ms: Math.round(performance.now() - t0) });
      });
    } catch (e) {
      console.error('[flowdocs] render failed', { id: r.id, error: String(e), stack: e.stack });
      if (zoomPending) finishZoom();
      view.innerHTML = '<div class="page"><h1>This did not open.</h1><p class="lede">' + esc(String(e)) + '</p></div>';
    }
  }

  function renderPage(id) {
    deckFor = null; deckSet = []; slideAt = 0;
    view.className = 'view' + (exOn ? ' ex-on' : '');
    nav.hidden = true;
    view.innerHTML = pageHTML(id);
    view.scrollTop = 0;
    drawHere();
    drawExample();
    var drawn = drawCharts(view);
    if (zoomPending) return Promise.race([drawn, wait(1200)]).then(finishZoom);
    if (animOK()) view.animate(pullBack ? [{ transform: 'scale(1.04)' }, { transform: 'none' }] : [{ transform: 'translateY(6px)' }, { transform: 'none' }], { duration: 260, easing: 'ease-out' });
    pullBack = false;
    return drawn;
  }

  function renderDeck(id, i) {
    view.className = 'view slides';
    nav.hidden = false;
    if (deckFor !== id) {
      deckFor = id;
      deckSet = slidesOf(id);
      view.innerHTML = '<div class="deck">' + deckSet.map(function (x, n) { return '<section class="slide" data-k="' + n + '">' + slideHTML(x.deck, x.s, x.k) + '</section>'; }).join('') + '</div>';
      document.getElementById('dots').innerHTML = deckSet.map(function (x, n) {
        return '<button type="button" class="dot" data-dot="' + n + '" aria-label="Slide ' + (n + 1) + ': ' + esc(x.s.head) + '"></button>';
      }).join('');
      console.log('[flowdocs] slideshow built', { view: id, slides: deckSet.length });
    }
    var total = deckSet.length;
    slideAt = Math.max(0, Math.min(i, total - 1));
    var slides = view.querySelectorAll('.slide');
    slides.forEach(function (s, k) { s.classList.toggle('on', k === slideAt); });
    document.querySelectorAll('.dot').forEach(function (d, k) { d.classList.toggle('on', k === slideAt); });
    document.getElementById('count').textContent = (slideAt + 1) + ' / ' + total;
    document.getElementById('prev').disabled = slideAt === 0;
    document.getElementById('next').disabled = slideAt === total - 1;
    var on = slides[slideAt];
    on.scrollTop = 0;
    if (animOK() && !zoomPending) on.animate([{ transform: 'translateX(14px)' }, { transform: 'none' }], { duration: 220, easing: 'ease-out' });
    mountVisuals(on);
    drawHere();
    if (zoomPending) return wait(60).then(finishZoom);
    return Promise.resolve();
  }
  function stepSlide(d) {
    if (!cur || !cur.slides) return;
    var k = slideAt + d;
    if (k < 0 || k >= deckSet.length) return;
    go(cur.id, true, k);
  }

  // The first crumb is the module's name: a button that opens the list of modules (click only, no keyboard shortcut).
  function drawCrumbs(id) {
    crumbsEl.innerHTML = pathOf(id).map(function (x, i) {
      if (!i) return '<button type="button" class="modbtn' + (x === id ? ' here' : '') + '" id="modbtn" data-modmenu aria-expanded="' + menuOn + '" aria-controls="modmenu">' + esc(titleOf(x)) + '<span class="chev" aria-hidden="true"></span></button>';
      return '<span class="sep" aria-hidden="true">›</span><button type="button" data-crumb="' + x + '"' + (x === id ? ' aria-current="page"' : '') + '>' + esc(titleOf(x)) + '</button>';
    }).join('');
    crumbsEl.scrollLeft = crumbsEl.scrollWidth;
  }

  // The module list: each top part, in load order. A click on one opens its top flowchart.
  var menuOn = false, modmenu = document.getElementById('modmenu');
  function setMenu(on) {
    menuOn = on;
    var b = document.getElementById('modbtn'), here = cur ? pathOf(cur.id)[0] : ROOT;
    if (b) b.setAttribute('aria-expanded', String(on));
    modmenu.hidden = !on;
    if (on) {
      modmenu.innerHTML = MODULES.map(function (m) {
        return '<li><button type="button" data-module="' + m + '"' + (m === here ? ' aria-current="true"' : '') + '>' + esc(titleOf(m)) + '</button></li>';
      }).join('');
      var r = b ? b.getBoundingClientRect() : { left: 16, bottom: 52 };
      modmenu.style.top = Math.round(r.bottom + 4) + 'px';
      modmenu.style.left = Math.round(Math.max(16, Math.min(r.left, window.innerWidth - modmenu.offsetWidth - 16))) + 'px';
    }
    console.log('[flowdocs] module menu', { on: on, here: here, modules: MODULES.length });
  }

  // Going inside: the clicked box grows to fill the page, then the next page takes its place.
  function zoomThen(fromEl, open, label) {
    if (!animOK() || !fromEl) { open(); return; }
    var r = fromEl.getBoundingClientRect(), v = view.getBoundingClientRect();
    var svgBox = fromEl.tagName.toLowerCase() === 'g', shape = svgBox && fromEl.querySelector('rect, polygon, path');
    var cs = getComputedStyle(shape || fromEl);
    zoombox.style.background = shape ? cs.fill : (cs.backgroundColor === 'rgba(0, 0, 0, 0)' ? 'var(--card)' : cs.backgroundColor);
    zoombox.style.borderColor = shape ? cs.stroke : cs.borderColor;
    zoombox.hidden = false;
    zoomPending = true;
    console.log('[flowdocs] zoom in', { from: cur && cur.id, to: label });
    view.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 180, fill: 'forwards' });
    var a = zoombox.animate([
      { left: r.left + 'px', top: r.top + 'px', width: r.width + 'px', height: r.height + 'px', borderRadius: '12px' },
      { left: v.left + 'px', top: v.top + 'px', width: v.width + 'px', height: v.height + 'px', borderRadius: '0px' }
    ], { duration: 380, easing: 'cubic-bezier(.3,.7,.2,1)', fill: 'forwards' });
    var went = false;
    var once = function () { if (went) return; went = true; open(); };
    a.onfinish = once;
    setTimeout(once, 450); // if the animation stalls, open it anyway
  }
  // A part opens its flowchart; a rule opens its own slides.
  function zoomTo(target, fromEl) {
    var toSlides = (cur && cur.slides) || !N[target].chart;
    zoomThen(fromEl, function () { if (toSlides) openSlides(target); else go(target, false); }, target);
  }
  function finishZoom() {
    zoomPending = false;
    view.getAnimations().forEach(function (a) { a.cancel(); });
    var gone = false;
    var hide = function () { if (gone) return; gone = true; zoombox.hidden = true; zoombox.getAnimations().forEach(function (x) { x.cancel(); }); };
    zoombox.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 240, fill: 'forwards' }).onfinish = hide;
    setTimeout(hide, 320); // never leave the box over the page
  }
  function pullBackTo(id) {
    console.log('[flowdocs] zoom out', { from: cur && cur.id, to: id });
    pullBack = animOK() && !(cur && cur.slides);
    if (cur && cur.slides) openSlides(id); else go(id, false);
  }
  function wait(ms) { return new Promise(function (res) { setTimeout(res, ms); }); }

  // ---------------------------------------------------------------------------------------------
  // Example mode: a click on a step shows a real example of it under the flowchart.
  // ---------------------------------------------------------------------------------------------
  function setExample(on) {
    exOn = on;
    exToggle.setAttribute('aria-checked', String(on));
    view.classList.toggle('ex-on', on);
    if (!on) exSel = null;
    view.querySelectorAll('g.node.sel').forEach(function (g) { g.classList.remove('sel'); });
    setBoxMode(view);
    drawExample();
    drawHere();
    console.log('[flowdocs] example mode', { on: on, flow: cur && cur.id });
  }
  function showExample(key, g) {
    exSel = key;
    view.querySelectorAll('g.node.sel').forEach(function (x) { x.classList.remove('sel'); });
    if (g) g.classList.add('sel');
    console.log('[flowdocs] example shown', { flow: cur.id, step: key, tag: exOf(cur.id, key).tag });
    drawExample();
    drawHere();
    var panel = document.getElementById('expanel');
    if (panel) panel.scrollIntoView({ block: 'nearest', behavior: animOK() ? 'smooth' : 'auto' });
  }
  function drawExample() {
    var panel = document.getElementById('expanel');
    if (!panel) return;
    panel.hidden = !exOn;
    if (!exOn) { panel.innerHTML = ''; return; }
    if (!exSel) { panel.innerHTML = '<p class="exhint">Click a step on the flowchart to see an example of it.</p>'; return; }
    var e = exOf(cur.id, exSel), tag = EXTAG[e.tag];
    panel.innerHTML = '<p class="kicker">Example <span class="tag ' + tag[1] + '">' + tag[0] + '</span></p><h2>' + esc(labelOf(cur.id, exSel)) + '</h2>' +
      '<div class="visual exv"></div>' + (e.note ? '<p class="vcap">' + esc(e.note) + '</p>' : '');
    var vis = panel.querySelector('.exv');
    vis.innerHTML = VIS.flow.html({ rows: e.rows });
    VIS.flow.play(vis, true);
  }

  // ---------------------------------------------------------------------------------------------
  // Notes bar
  // ---------------------------------------------------------------------------------------------
  var q = document.getElementById('q'), here = document.getElementById('here');
  // Unsent text in the box survives a reload: each change to the map reloads Will's tab.
  var DRAFT = 'flowdocs-draft-v1';
  function keepDraft() {
    try { localStorage.setItem(DRAFT, q.value); }
    catch (e) { console.warn('[flowdocs] draft save failed', String(e)); }
  }
  try { q.value = localStorage.getItem(DRAFT) || ''; }
  catch (e) { console.warn('[flowdocs] draft load failed', String(e)); }
  if (q.value) console.log('[flowdocs] unsent text restored', { chars: q.value.length });
  q.addEventListener('input', keepDraft);
  function drawHere() {
    var s = slideNow(), id = aboutId();
    document.getElementById('about').textContent = s ? 'slide ' + (slideAt + 1) + ' of ' + titleOf(cur.id) : (exOn && exSel ? 'example: ' + labelOf(cur.id, exSel) : titleOf(id));
    var where = aboutText();
    var mine = notes.map(function (x, i) { return { x: x, i: i }; }).filter(function (o) { return o.x.where === where || (o.x.kind === 'answer' && s && s.open === o.x.id); });
    here.hidden = !mine.length;
    here.innerHTML = mine.map(function (o) {
      return '<li><span><em>' + (o.x.kind === 'answer' ? 'Answer' : 'Note') + '</em>' + esc(o.x.show || o.x.text) + '</span><button type="button" data-del="' + o.i + '" aria-label="Remove">×</button></li>';
    }).join('');
  }
  function addNote(text) {
    notes.push({ id: aboutId(), where: aboutText(), kind: 'note', text: text, at: new Date().toISOString() });
    console.log('[flowdocs] note added', { where: aboutText(), chars: text.length, total: notes.length });
    saveNotes();
  }
  function setAnswer(id, i) {
    var o = N[id].open;
    notes = notes.filter(function (x) { return !(x.kind === 'answer' && x.id === id); });
    notes.push({ id: id, where: pathText(id), kind: 'answer', opt: i, show: (i + 1) + '. ' + o.opts[i][0], text: (i + 1) + '. ' + o.opts[i][0] + ' (question: ' + o.q + ')', at: new Date().toISOString() });
    console.log('[flowdocs] answer picked', { node: id, opt: i + 1 });
    saveNotes();
    document.querySelectorAll('[data-decide="' + id + '"] .opt').forEach(function (b, k) { b.classList.toggle('on', k === i); b.setAttribute('aria-pressed', String(k === i)); });
    toast('Saved on this page. Press “Copy answers” when you are done.');
  }
  function copyText(list) {
    var lines = ['My notes on the logic map mockup (' + list.length + '):', ''];
    list.forEach(function (x, i) { lines.push((i + 1) + '. ' + x.where); lines.push('   ' + (x.kind === 'answer' ? 'Answer' : 'Note') + ': ' + x.text); });
    return lines.join('\n');
  }
  function copyAll() {
    var pending = q.value.trim();
    if (pending) { addNote(pending); q.value = ''; keepDraft(); }
    if (!notes.length) { toast('Nothing to copy yet. Write a note or pick an answer first.'); return; }
    var copied = notes.slice(), text = copyText(copied), count = copied.length;
    var finish = function (ok, how) {
      console.log('[flowdocs] copy', { ok: ok, how: how, items: count, chars: text.length });
      if (ok) clearSoon(copied);
      else { document.getElementById('fbtext').value = text; document.getElementById('fallback').showModal(); }
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(function () { finish(true, 'clipboard'); }, function (e) {
        console.warn('[flowdocs] clipboard API failed, trying the old way', String(e));
        finish(oldCopy(text), 'execCommand');
      });
    } else finish(oldCopy(text), 'execCommand');
  }
  function oldCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { console.error('[flowdocs] copy failed', String(e)); }
    ta.remove();
    return ok;
  }
  // Will, Nov 6: after a copy, a 5-second timer clears the copied notes, so the next round starts empty.
  var clearTimer = null;
  function clearSoon(copied) {
    var left = 5, n = copied.length, what = n + (n === 1 ? ' note' : ' notes');
    clearInterval(clearTimer);
    toast('', 'Keep them', function () {
      clearInterval(clearTimer);
      console.log('[flowdocs] clear timer stopped: the notes stay', { count: n });
      toast('Kept. Your notes stay on this page.');
    });
    var msg = toastEl.querySelector('span');
    var tick = function () {
      if (left === 0) { clearInterval(clearTimer); clearNotes(copied); return; }
      if (msg.isConnected) msg.textContent = 'Copied ' + what + '. Clearing them in ' + left + ' s.';
      left--;
    };
    console.log('[flowdocs] clear timer started', { count: n, seconds: left });
    tick();
    clearTimer = setInterval(tick, 1000);
  }
  function clearNotes(copied) {
    // Only the copied notes go: a note written during the countdown stays.
    notes = notes.filter(function (x) { return copied.indexOf(x) < 0; });
    console.log('[flowdocs] copied notes cleared', { cleared: copied.length, left: notes.length });
    saveNotes();
    unmarkGone();
    toast('Cleared the ' + copied.length + ' copied ' + (copied.length === 1 ? 'note' : 'notes') + '.');
  }
  var toastTimer = null;
  function toast(msg, action, fn) {
    toastEl.innerHTML = '<span>' + esc(msg) + '</span>' + (action ? '<button type="button" id="toast-act">' + esc(action) + '</button>' : '');
    toastEl.hidden = false;
    if (action) document.getElementById('toast-act').onclick = function () { toastEl.hidden = true; fn(); };
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.hidden = true; }, action ? 7000 : 3200);
  }

  // ---------------------------------------------------------------------------------------------
  // Events (click and tap; the slides also take the left and right arrow keys)
  // ---------------------------------------------------------------------------------------------
  crumbsEl.addEventListener('click', function (e) {
    if (e.target.closest('[data-modmenu]')) { setMenu(!menuOn); return; }
    var b = e.target.closest('[data-crumb]');
    if (!b) return;
    var id = b.getAttribute('data-crumb');
    if (cur.slides ? (id !== cur.id || slideAt !== 0) : id !== cur.id) pullBackTo(id);
  });
  modmenu.addEventListener('click', function (e) {
    var b = e.target.closest('[data-module]');
    if (!b) return;
    var to = b.getAttribute('data-module');
    console.log('[flowdocs] module', { from: cur && pathOf(cur.id)[0], to: to, view: cur && cur.slides ? 'slides' : 'flowchart' });
    setMenu(false);
    go(to, false);
  });
  // A click anywhere else closes the list.
  document.addEventListener('click', function (e) { if (menuOn && !e.target.closest('#modmenu, [data-modmenu]')) setMenu(false); });
  window.addEventListener('resize', function () { if (menuOn) setMenu(false); });
  vFlow.addEventListener('click', function () { if (cur.slides) go(flowOf(cur.id), false); });
  exToggle.addEventListener('click', function () { setExample(!exOn); });

  // The Questions switch: a list of the open questions of the module you are in, and where each waits; a click opens
  // its slide (Will, Nov 6: "Can we have a toogle that opens a list of where the questions are?"; Nov 7: "each module
  // only shows the questions that it has for that module"). It shows in both views.
  var qOn = false, qToggle = document.getElementById('q-toggle'), qPanel = document.getElementById('qpanel');
  function moduleNow() { return pathOf(cur ? cur.id : ROOT)[0]; }
  function openQuestions() {
    var m = moduleNow();
    return Object.keys(N).filter(function (id) { return N[id].open && pathOf(id)[0] === m; }).map(function (id) {
      var k = slidesOf(id).map(function (x) { return x.s.open; }).indexOf(id);
      return { id: id, q: N[id].open.q, where: pathText(id), slide: Math.max(0, k), answered: answerOf(id) >= 0 };
    });
  }
  function drawQuestions() {
    var list = openQuestions(), waiting = list.filter(function (x) { return !x.answered; }).length, qn = document.getElementById('qn');
    qn.textContent = waiting;
    qn.classList.toggle('zero', !waiting);
    qToggle.setAttribute('aria-label', 'Questions in ' + titleOf(moduleNow()) + ': ' + waiting + (waiting === 1 ? ' waits' : ' wait') + ' for you');
    if (!qOn) return;
    qPanel.innerHTML = list.length ? '<ul>' + list.map(function (x) {
      return '<li><button type="button" data-q="' + x.id + '"><span class="qq">' + esc(x.q) + '</span><span class="qwhere">' + esc(x.where) + '</span><span class="qstate' + (x.answered ? ' done' : '') + '">' + (x.answered ? 'Answered on this page' : 'Waits for you') + '</span></button></li>';
    }).join('') + '</ul>' : '<p class="empty">No questions wait for you in ' + esc(titleOf(moduleNow())) + '.</p>';
  }
  function setQuestions(on) {
    qOn = on;
    qToggle.setAttribute('aria-checked', String(on));
    qPanel.hidden = !on;
    console.log('[flowdocs] questions list', { on: on, module: moduleNow(), open: openQuestions().length });
    drawQuestions();
  }
  qToggle.addEventListener('click', function () { setQuestions(!qOn); });
  qPanel.addEventListener('click', function (e) {
    var b = e.target.closest('[data-q]');
    if (!b) return;
    var x = openQuestions().filter(function (o) { return o.id === b.getAttribute('data-q'); })[0];
    console.log('[flowdocs] question opened', { id: x.id, slide: x.slide + 1 });
    setQuestions(false);
    go(x.id, true, x.slide);
  });
  vSlides.addEventListener('click', function () { if (!cur.slides) openSlides(cur.id); });
  view.addEventListener('click', function (e) {
    var opt = e.target.closest('[data-opt]');
    if (opt) setAnswer(opt.closest('[data-decide]').getAttribute('data-decide'), +opt.getAttribute('data-opt'));
  });
  document.getElementById('prev').addEventListener('click', function () { stepSlide(-1); });
  document.getElementById('next').addEventListener('click', function () { stepSlide(1); });
  document.getElementById('dots').addEventListener('click', function (e) { var d = e.target.closest('[data-dot]'); if (d) go(cur.id, true, +d.getAttribute('data-dot')); });
  document.addEventListener('keydown', function (e) {
    if (!cur || !cur.slides || /^(INPUT|TEXTAREA)$/.test(e.target.tagName)) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); stepSlide(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); stepSlide(-1); }
  });
  document.getElementById('ask').addEventListener('submit', function (e) {
    e.preventDefault();
    var text = q.value.trim();
    if (!text) return;
    addNote(text);
    q.value = '';
    keepDraft();
    toast('Saved on this page. Press “Copy answers” when you are done.');
  });
  document.getElementById('copy').addEventListener('click', copyAll);
  here.addEventListener('click', function (e) {
    var b = e.target.closest('[data-del]');
    if (!b) return;
    var i = +b.getAttribute('data-del');
    console.log('[flowdocs] note removed', { index: i });
    notes.splice(i, 1);
    saveNotes();
    unmarkGone();
  });
  window.addEventListener('hashchange', render);
  window.addEventListener('error', function (e) { console.error('[flowdocs] page error', e.message); });

  var problems = checkTree();
  // Out-of-date parts show in a bar under the top, so Will sees which parts still need a review.
  var staleBar = document.getElementById('stale');
  if (STALE.length) {
    var below = {}, own = [];
    STALE.forEach(function (s) {
      if (s.what === 'above') (below[s.parent] = below[s.parent] || []).push(partName(s.id));
      else if (own.indexOf(partName(s.id)) < 0) own.push(partName(s.id));
    });
    var lines = Object.keys(below).map(function (p) { return esc(partName(p)) + ' changed. Review the parts below it: ' + esc(below[p].join(', ')) + '.'; });
    own.forEach(function (n) { lines.push(esc(n) + ': its flowchart or a line changed. Review its slides and examples.'); });
    staleBar.innerHTML = '<b>Out of date.</b> ' + lines.join(' ');
    staleBar.hidden = false;
  }
  var other = problems.length - STALE.length;
  if (other > 0) toast('The map has ' + other + ' problems. See the console.');
  window.__flowdocs = { N: N, DECKS: DECKS, EX: EX, FLOWS: FLOWS, STALE: STALE, problems: problems, stamp: STAMP, modules: MODULES, // read by check.cjs
    slidesOf: function (id) { return slidesOf(id).map(function (x) { return { deck: x.deck, k: x.k, type: x.s.visual && x.s.visual.type, open: x.s.open || null, head: x.s.head }; }); } };
  document.getElementById('ncount').textContent = notes.length;
  drawQuestions();
  render();
})();
