// What everyone else gets: Tracking's answer, handed on. Today (comm-chat, read 2026-11-07): src/modules/mod.rs:119
// (ACCOUNT_FACTS: Results, Search terms and reach, Ads and pages, Bid and budget and Decide all need Tracking), :59
// (FRESH_DAYS 7), :211 (Results' words: "If Tracking does not trust the count, judge on clicks and cost"), :260-264 (Bid and
// budget's words name no such rule); src/modules/brief/mod.rs:113-136 (WAIT); src/spend_box.rs:29-31 and :75 (a raise needs
// the newest 2 full weeks trusted by code's own week rules; Google Ads only), :265-277; src/modules/brief/code.rs:358-361
// and src/scorecard/mod.rs:366-368 (C2's Meta target of $60 had no counted day on Nov 3); HANDOFF-tracking.md, box 9 and
// surprise 2 (the spend box and the target lines read code's own week rules; a person's broken days never reach them). In
// the plan every reader gets the same answer, so the old question "Which one decides a week?" is settled: the record decides
// (Claude's call from Will's words of Nov 7). The question on the spend box is new (Nov 7): Will's words do not say if a
// rebuilt week may open a raise. Real cases: C2's campaign answers of Nov 1 (52, 56, 61, 66, as HANDOFF-tracking.md lists
// them), C2's trust calendar and Tracking brief, read 2026-11-07; C2's Tracking answer of Nov 1 (the live Meta ad set
// optimizes on Lead); the spend box's own notes on C2, Nov 2 (src/modules/brief/code.rs:276-287).
LOGIC.flow({
  id: 'thand', parent: 'tracking', status: 'Partly built; the rest is not built yet',
  title: 'What everyone else gets', short: 'What others get',
  head: 'Every reader after Tracking gets one answer for each platform and day',
  chart: [
    'flowchart TB',
    'ANS(["One answer for each platform<br/>and day: trusted, or rebuilt<br/>with the true numbers"]):::next',
    'MODS["The five modules after<br/>Tracking judge on<br/>that answer"]:::next',
    'BOX["The spend box lets a run raise<br/>spend only while the newest<br/>{boxWeeks} full weeks are trusted"]:::code',
    'TARGET["The target lines judge each<br/>target on the same numbers"]:::next',
    'ANS --> MODS', 'ANS --> BOX', 'ANS --> TARGET'
  ],
  links: { ANS: 'thone', MODS: 'thmods', BOX: 'thbox', TARGET: 'thtarget' },
  leaves: {
    thone: 'One judge of trust',
    thmods: 'The modules after it',
    thbox: { title: 'The spend box', open: {
      q: 'Say a platform’s count breaks, and the record rebuilds its true numbers until the fix goes out. May a run raise spend on that platform in the meantime?',
      since: 'Nov 7',
      opts: [
        ['No: only a trusted week opens the box', true, 'The true numbers show what the money bought. But the platform’s bidding still learns from its own wrong count until the fix goes out, so more money there buys more of the wrong thing.'],
        ['Yes: a rebuilt week opens the box too', false, 'A raise is judged on the true numbers, so a campaign can grow while its fix waits. The platform’s bidding keeps learning from the wrong count.'],
        ['Only where the bids do not follow the platform’s count', false, 'A campaign on smart bidding waits for the fix. A campaign with bids set by hand may grow on the true numbers.']] } },
    thtarget: 'The target lines'
  },

  deck: [
    { about: ['thand'], kicker: 'Who waits for it',
      head: 'Five modules wait for Tracking’s answer before they judge anything',
      visual: { type: 'gate', rows: [
        ['Results', 'Is this campaign doing its job?', 'pass'],
        ['Search terms and reach', 'Are the right people seeing it?', 'pass'],
        ['Ads and pages', 'Are the ads and pages strong?', 'pass'],
        ['Bid and budget', 'Is the bid right, and what would more or less money do?', 'pass'],
        ['Decide', 'Where does the money go, what comes first, and who says yes?', 'pass']],
        end: ['With no Tracking answer from the last {freshDays} days, their answers cannot save', 'will'] },
      vcap: 'Today each of them reads Tracking’s summary, its verdict and its day. In the plan each reads the true numbers of each platform and day, so none of them waits for an answer about the whole account.' },
    { about: ['thand'], kicker: 'Today and the plan',
      head: 'Today Tracking hands on one answer for the whole account, and in the plan one for each platform and day',
      visual: { type: 'flow', rows: [
        { title: 'Today', steps: [['One answer for the whole account', 'a summary, a verdict and its day', 'opus']], end: [['It counts for {freshDays} days', '', 'code']] },
        { title: 'The plan', steps: [['One answer for each platform and day', 'trusted, or rebuilt', 'next']], end: [['Every reader gets the true numbers', '', 'next']] }] },
      vcap: 'C2’s answer of Nov 1 had to fit Google’s trust from Oct 1 and Meta’s broken count into one summary. Split by platform and day, each campaign module reads exactly the days it needs.' },

    { about: ['thone'], kicker: 'One judge of trust',
      head: 'The client’s record is now the one judge of which days to trust',
      visual: { type: 'flow', rows: [
        { title: 'Today', steps: [['Code’s five warning signs', 'for the spend box and the target lines', 'code'], ['The trust calendar', 'a label on each day', 'will'], ['Tracking’s answer', 'for the campaign modules', 'opus']], end: [['They can disagree', 'C2’s Meta, Nov 7', 'block']] },
        { title: 'The plan', steps: [['The client’s record', 'does each week match?', 'next']], end: [['Every reader gets the same answer', '', 'next']] }] },
      vcap: 'On Nov 7 C2’s trust calendar marks its Meta days broken from Sep 14, from Will’s answer on case #260, while code’s five warning signs flag none of those weeks. This settles the old question “Which one decides a week?”: the record decides, which is Claude’s call from Will’s words of Nov 7.' },

    { about: ['thmods'], kicker: 'The modules after it',
      head: 'C2’s campaign answers judged on what Tracking trusted, and in the plan they judge on the true numbers',
      visual: { type: 'flow', rows: [
        { title: 'Results, Meta remarketing', steps: [['Tracking says Meta’s lead count cannot be trusted', '', 'opus']], end: [['It judged Meta on clicks, landing page views and GA4’s leads', '', 'keep']] },
        { title: 'Results, LA and New York', steps: [['Tracking says Google’s count is true from Oct 1', '', 'opus']], end: [['September’s 4.5 conversions were no true count', '', 'keep']] },
        { title: 'Bid and budget, Brand', steps: [['Tracking says the count is true from Oct 1 only', '', 'opus']], end: [['It did not judge on the September conversions', '', 'keep']] }] },
      vcap: 'These are C2’s campaign answers of Nov 1, and each names Tracking’s answer as its source. Results’ instructions say what to do when Tracking does not trust a count, but Bid and budget’s instructions give no such rule.' },

    { about: ['thbox'], kicker: 'A question for Will',
      head: 'A rebuilt week shows the true numbers, but the platform still bids on its own wrong count',
      visual: { type: 'flow', rows: [{ title: 'C2’s Meta, if its days were rebuilt', steps: [['The true numbers come from the record', '', 'next'], ['Meta’s tag still sends each lead twice', '', 'block'], ['Meta’s bidding learns from that tag', 'the live ad set optimizes on Lead', 'block']], end: [['May a run raise spend here?', '', 'will']] }] },
      vcap: 'Today the box takes raises on Google Ads only, and it opens only while code trusts the newest {boxWeeks} full weeks. Rebuilt numbers make a raise easy to judge, but they do not fix what the platform learns from.',
      open: 'thbox' },

    { about: ['thtarget'], kicker: 'The target lines',
      head: 'With no trusted day a target cannot be judged, and the true numbers would fix that',
      visual: { type: 'flow', rows: [
        { title: 'C2’s Meta, Nov 3', steps: [['Its target is $60 a lead', '', 'code'], ['None of its last 30 settled days counted', 'it spent about $330', 'block']], end: [['No day to judge the target on', '', 'block']] },
        { title: 'The plan', steps: [['The same 30 days, rebuilt from the record', '', 'next']], end: [['The target is judged on the true leads', '', 'next']] }] },
      vcap: 'Today the target lines read code’s five warning signs, as the spend box does. In the plan they read the same answer as every module.' }
  ],

  examples: {
    ANS: { tag: 'plan', rows: [{ steps: [['C2, a morning', '', 'next']], end: [['Google is trusted from Oct 1', '', 'keep'], ['Meta is not trusted until its fix goes out', 'rebuilt where the record keeps Meta’s click', 'next']] }], note: 'Today one answer covers the whole account, and nothing is rebuilt.' },
    MODS: { tag: 'plan', rows: [{ steps: [['C2’s Tracking answer, Nov 1', 'Meta’s lead count cannot be trusted', 'opus'], ['C2’s Results answer for Meta', '', 'opus']], end: [['It judged Meta on clicks, landing page views and GA4’s leads', '', 'keep']] }], note: 'The answers are real, from C2’s module tests of Nov 1, but they judged on one answer for the whole account.' },
    BOX: { tag: 'real', rows: [{ steps: [['C2, Nov 2', 'the box reads Google’s weeks alone', 'code'], ['Google’s week of Oct 26 is trusted', '', 'keep']], end: [['A raise on Meta still waits for Will', 'the box takes raises on Google only', 'will']] }], note: 'The spend box’s own notes on C2, Nov 2.' },
    TARGET: { tag: 'plan', rows: [{ steps: [['C2’s Meta target, Nov 3', '$60 a lead', 'code'], ['None of its last 30 settled days counted', '', 'block']], end: [['No day to judge it on', 'it spent about $330', 'block']] }], note: 'The case is real, from C2’s target line of Nov 3. Nothing rebuilds those days yet.' }
  },

  reviewed: { self: '56f12656', above: '7441c765', on: '2026-11-07' }
});
