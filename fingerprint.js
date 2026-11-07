// Fingerprints for the logic map. A fingerprint is a short hash of what a part says. Each part keeps the
// fingerprints it was last reviewed against (its `reviewed` line), so a change above it, or in its own
// flowchart, shows as out of date until someone reviews the part and stamps it (stamp.cjs).
// The page (app.js) and stamp.cjs both load this file, so they judge "out of date" the same way.
(function (root) {
  'use strict';
  var own = Object.prototype.hasOwnProperty;

  // FNV-1a, 32 bits: enough to see a change, not a security hash.
  function fnv(text) {
    var h = 0x811c9dc5;
    for (var i = 0; i < text.length; i++) { h ^= text.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
    return ('0000000' + h.toString(16)).slice(-8);
  }
  function fmt(n) { return typeof n === 'number' && n > 0 && n < 1 ? n.toFixed(2) : String(n); }

  // Put the facts into a value: "{f1}" alone becomes the number 0.8; "{f1}" inside text becomes "0.80".
  function fill(v, facts) {
    if (typeof v === 'string') {
      var whole = v.match(/^\{(\w+)\}$/);
      if (whole && own.call(facts, whole[1])) return facts[whole[1]];
      return v.replace(/\{(\w+)\}/g, function (m, k) { return own.call(facts, k) ? fmt(facts[k]) : m; });
    }
    if (Array.isArray(v)) return v.map(function (x) { return fill(x, facts); });
    if (v && typeof v === 'object') {
      var o = {};
      Object.keys(v).forEach(function (k) { o[k] = k === 'reviewed' ? v[k] : fill(v[k], facts); });
      return o;
    }
    return v;
  }

  // The names written as {name} anywhere in a value.
  function tokens(v, out) {
    out = out || {};
    if (typeof v === 'string') v.replace(/\{(\w+)\}/g, function (m, k) { out[k] = 1; return m; });
    else if (Array.isArray(v)) v.forEach(function (x) { tokens(x, out); });
    else if (v && typeof v === 'object') Object.keys(v).forEach(function (k) { if (k !== 'reviewed') tokens(v[k], out); });
    return out;
  }

  // Lines that only set how the chart is drawn (left to right, top to bottom). A new layout says nothing new.
  var DRAWING = /^\s*(flowchart|graph|direction)\s+(LR|RL|TB|TD|BT)\s*$/;

  // What a part's flowchart says: its claim, its status, its boxes and arrows (with the facts filled in),
  // and what each box opens. The parts below a part rest on this.
  function chartPrint(flow, facts) {
    var says = (flow.chart || []).filter(function (l) { return !DRAWING.test(l); });
    return fnv(JSON.stringify([flow.head || '', flow.status || '', fill(says, facts), flow.links || {}]));
  }

  // What a part's own slides and examples rest on: its flowchart, and the value of each fact they show.
  function selfPrint(flow, facts) {
    var used = Object.keys(tokens([flow.deck, flow.examples, flow.leaves])).filter(function (k) { return own.call(facts, k); }).sort();
    return fnv(JSON.stringify([chartPrint(flow, facts), used.map(function (k) { return [k, facts[k]]; })]));
  }

  // The parts that are out of date. "self": its own flowchart, or a fact it shows, changed since its review.
  // "above": the flowchart of the part above it changed since its review.
  function stale(flows, facts) {
    var out = [];
    Object.keys(flows).forEach(function (id) {
      var f = flows[id], r = f.reviewed || {}, self = selfPrint(f, facts);
      if (r.self !== self) out.push({ id: id, what: 'self', was: r.self || null, now: self });
      if (f.parent && flows[f.parent]) {
        var above = chartPrint(flows[f.parent], facts);
        if (r.above !== above) out.push({ id: id, what: 'above', parent: f.parent, was: r.above || null, now: above });
      }
    });
    return out;
  }

  var api = { fnv: fnv, fmt: fmt, fill: fill, tokens: tokens, chartPrint: chartPrint, selfPrint: selfPrint, stale: stale };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.FLOWDOCS_FP = api;
})(this);
