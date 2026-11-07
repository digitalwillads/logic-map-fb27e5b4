// The tracking module: step 1 of Barbara's daily client run, with the question "Can we trust the tracking?" (Will,
// 2026-11-07: "Lets do tracking next"). This maps it as it works today, so Will can argue its logic box by box.
// Sources (comm-chat, read 2026-11-07): src/modules/mod.rs (the module, its words, ACCOUNT_FACTS, FRESH_DAYS),
// src/modules/day.rs (what is due), src/modules/brief/ (the brief), src/chat/tools/module_tools.rs (the save),
// src/chat/tools/mark_tools.rs, src/chat/tools/trust_calendar.rs, docs/claude-code-bridge-setup.md:2254-2263 (the
// switch); the verifiers' verify/src/modules.rs and trees; Barbara's Tracking answers of Nov 1 (Bull, Kogalla, C2).
// Will's notes of 2026-11-07 on this chart (not built): "Is it due today?" goes ("I want it to check that it hasen't broken
// via code ever time it's called"); Will's marks go ("I want this automated. Opus should choose"); and "IT would make
// sense to have this split by platform yes?" (Claude: yes). So each platform runs on its own, code checks it on each call,
// and Opus answers only a new break.
LOGIC.flow({
  id: 'tracking',
  title: 'The tracking module', short: 'Tracking module', status: 'Built, off in live; Nov 7 changes not built',
  head: 'The tracking module: can we trust the tracking?',
  chart: [
    'flowchart TB',
    'CALL(["Called each morning at step 1<br/>of the daily run, or by a person<br/>as a module test"]):::code',
    'subgraph MOD[" "]',
    'GOO(["Google"]):::next',
    'MET(["Meta"]):::next',
    'MSF(["Microsoft"]):::next',
    'MARKS["Not built: Opus chooses<br/>which actions count"]:::next',
    'FACTS["Code reads the facts<br/>of the platform"]:::code',
    'CHECKS["The tracking checks run,<br/>and their run goes to Barbara"]:::will',
    'BROKE{"Not built: code checks<br/>each call: has it broken?"}:::next',
    'TRUST["The trust calendar marks each<br/>day trusted, suspect or broken"]:::will',
    'OPUS["Opus answers: can the<br/>platform\'s count be trusted,<br/>and from which day?"]:::opus',
    'SAVE{"Code checks the answer:<br/>does it pass every rule?"}:::code',
    'end',
    'OKAY(["Not broken:<br/>trusted"]):::code',
    'STAND(["The last answer<br/>stands"]):::code',
    'OUT(["Handed on, one result for<br/>each platform: the campaign<br/>modules and Decide judge on it"]):::code',
    'CALL --> GOO', 'CALL --> MET', 'CALL --> MSF',
    'GOO --> FACTS', 'MET --> FACTS', 'MSF --> FACTS', 'MARKS --> FACTS',
    'FACTS --> CHECKS', 'CHECKS --> BROKE',
    'BROKE -- no --> OKAY', 'BROKE -- "a known break" --> STAND', 'BROKE -- "a new break" --> OPUS',
    'TRUST --> OPUS', 'OPUS --> SAVE',
    'SAVE -- "no: refused, with why" --> OPUS',
    'SAVE -- yes --> OUT', 'OKAY --> OUT', 'STAND --> OUT'
  ],
  links: { CALL: 'tcall', BROKE: 'tbroken', MARKS: 'tmarks', FACTS: 'tfacts', CHECKS: 'tchecks', TRUST: 'ttrust', OPUS: 'tanswer', SAVE: 'tsave', OUT: 'thand' },
  leaves: { tcall: 'Who calls it, and when', thand: 'Who judges on the answer' },

  // Each slide belongs to one view: the module's own slides first, then one or more for each of its rules.
  deck: [
    { about: ['tracking'], kicker: 'In and out',
      head: 'Each platform on its own: code checks it on each call, and Opus answers only a new break',
      lede: 'Tracking is step 1 of the daily client run. It changes nothing. It only answers, with one result for each platform.',
      visual: { type: 'flow', rows: [
        { title: 'Google', steps: [['Code checks', 'each call, no tokens', 'code'], ['Not broken', '', 'code']], end: [['Trusted', '', 'keep']] },
        { title: 'Meta', steps: [['Code checks', 'each call, no tokens', 'code'], ['A new break', '', 'block'], ['Opus answers', 'for Meta alone', 'opus']], end: [['Not trusted, with its fix', '', 'block']] },
        { title: 'Microsoft', steps: [['Code checks', 'each call, no tokens', 'code'], ['A known break', 'the last answer named it', 'block']], end: [['The last answer stands', '', 'code']] }] },
      vcap: 'Not built yet: today one Opus subagent answers for the whole account when Tracking is due. A problem always names its fix. A person or a later step makes the change, never the module.',
      quote: ['IT would make sense to have this split by platform yes?', 'Nov 7'] },
    { about: ['tracking'], kicker: 'Why it comes first',
      head: 'A wrong count misleads every module after it, so Tracking answers first',
      visual: { type: 'flow', rows: [
        { title: 'C2, Meta', steps: [['Two tags send each lead twice', 'since May 20', 'block'], ['Tracking: Meta’s count is not trusted', 'Nov 1', 'opus']], end: [['Results judges Meta on clicks, landing page views and GA4 leads', '', 'keep']] },
        { title: 'C2, Google', steps: [['Each Google lead matches a send in the lead app', 'from Oct 1', 'code'], ['Tracking: Google’s count is true from Oct 1', 'Nov 1', 'opus']], end: [['Results calls September’s 4.5 conversions no true count', '', 'keep']] }] },
      vcap: 'C2’s module tests of Nov 1. Each campaign answer names the Tracking answer as its source.' },
    { about: ['tracking'], kicker: 'Status · Nov 7',
      head: 'Built and tested on three clients. Live keeps the module run off until Will says yes.',
      visual: { type: 'timeline', items: [
        ['Oct 31', 'Will: “Build them all so I can start testing and clearing each module”. The ten client modules are built.'],
        ['Nov 1', 'Module tests on Bull Legal, C2 and Kogalla: three Tracking answers, saved from 3:29 to 3:33 AM.'],
        ['Nov 1 and Nov 2', 'The verifiers run the tracking checks six times for these three clients.'],
        ['Nov 4', 'Will: “we should just run it yes?” The module run joins the daily run, first as a dry run on a copy.'],
        ['Nov 7', 'The change is merged. Live keeps the morning module run off until Will tests it and says yes to its cost.'],
        ['Nov 7, on this map', 'Will: each platform on its own, a code check on each call in place of the due day, and Opus chooses which actions count. Not built yet.']] },
      vcap: 'A module test still runs in live: Will presses Run on Validators, Modules. Only the morning module run is off.' },
    { about: ['tracking'], kicker: 'Three answers · Nov 1',
      head: 'The first three answers: two good, and one problem with its fixes',
      visual: { type: 'gate', rows: [
        ['Bull Legal: good', 'Google’s form count matches the lead app and GA4 week by week, from May 11.', 'pass'],
        ['Kogalla: good', 'Google, GA4 and Shopify’s server feed fell together in October, so the fall is real.', 'pass'],
        ['C2: a problem', 'Google’s count is true from Oct 1. Meta’s is not: two tags send each lead from the contact form twice.', 'hold']],
        end: ['The campaign modules judge on these', 'opus'] },
      vcap: 'Barbara keeps each answer. Will marks it Right or Wrong on Validators, Modules.' },

    { about: ['tcall'], kicker: 'Who calls it',
      head: 'The daily run calls it at step 1, beside The client and Setup and market',
      visual: { type: 'flow', rows: [
        { title: 'The daily run', steps: [['Step 0', 'code reads the day, and answers In motion and Money', 'code'], ['Step 1, all at once', 'Tracking, The client, Setup and market', 'opus'], ['Step 2', 'the campaign modules, on each campaign', 'opus']], end: [['Step 3: Decide', '', 'opus']] },
        { title: 'A module test', steps: [['Will presses Run', 'one module, one client', 'will'], ['The module runs', 'it changes nothing', 'opus']], end: [['An answer for Will to mark', '', 'will']] }] },
      vcap: 'Each line of a step is one subagent. Tracking needs no other answer, so it can run first.',
      quote: ['we should just run it yes?', 'Nov 4'] },
    { about: ['tcall'], kicker: 'Why it is off in live',
      head: 'A module run read about twice the tokens of a full run',
      visual: { type: 'bars', max: 380, rows: [
        { label: 'C2’s full run, Nov 4', parts: [[192, 'code', '192M tokens']] },
        { label: 'The module dry run, Nov 4, on a copy', parts: [[380, 'opus', '380M tokens']] }] },
      vcap: 'Live keeps the morning module run off since the merge of Nov 7. Will decides if every client may cost about twice as much.',
      stats: [['About 2x', 'the tokens of a module run against a full run', 'real']] },

    { about: ['thand'], kicker: 'Who waits for it',
      head: 'Five modules need a Tracking answer from the last {freshDays} days',
      visual: { type: 'gate', rows: [
        ['Results', 'Is this campaign doing its job?', 'pass'],
        ['Search terms and reach', 'Are the right people seeing it?', 'pass'],
        ['Ads and pages', 'Are the ads and pages strong?', 'pass'],
        ['Bid and budget', 'Is the bid right, and what would more or less money do?', 'pass'],
        ['Decide', 'Where does the money go, what comes first, and who says yes?', 'pass']],
        end: ['No fresh Tracking answer: their save refuses', 'will'] },
      vcap: 'Each one reads Tracking’s summary, verdict and day in its brief. Decide can also read the whole answer. With no answer from the last {freshDays} days, the brief says to wait, and the save refuses. Not built: with a check on each call, each platform has a result of the day.' },
    { about: ['thand'], kicker: 'A real hand-on · C2, Nov 1',
      head: 'C2’s campaign answers judged on what Tracking trusted',
      visual: { type: 'flow', rows: [
        { title: 'Results, Meta remarketing', steps: [['Tracking: Meta’s lead count is not trusted', '', 'opus']], end: [['Judge Meta on clicks, landing page views and GA4 leads', '', 'keep']] },
        { title: 'Results, LA + New York', steps: [['Tracking: Google’s count is true from Oct 1', '', 'opus']], end: [['September’s 4.5 conversions are no true count', '', 'keep']] },
        { title: 'Bid and budget, Brand', steps: [['Tracking: true from Oct 1 only', '', 'opus']], end: [['The September conversions are not checked', '', 'keep']] }] },
      vcap: 'Each line comes from C2’s campaign answers of Nov 1. Each one names the Tracking answer as its source.' },
    { about: ['thand'], kicker: 'Two judges of trust',
      head: 'Code’s own week rules, not Tracking’s answer, set the spend box and the target lines',
      visual: { type: 'gate', rows: [
        ['The spend box', 'A run may raise Google spend only while code’s rules trust the last {boxWeeks} full weeks.', 'hold'],
        ['The target lines', 'C2’s Meta, Nov 3: no trusted day in the last 30 settled days to judge its $60 target.', 'hold'],
        ['The words of Results', '“If Tracking does not trust the count, judge on clicks and cost.”', 'pass'],
        ['The words of Bid and budget', 'They give no rule for a count that Tracking does not trust.', 'wait']] },
      vcap: 'So two judges of trust can disagree: code’s rules and Tracking’s answer. The part on which days count shows a real case.' }
  ],

  examples: {
    CALL: { tag: 'real', rows: [{ steps: [['Will presses Run on Tracking', 'Validators, Modules', 'will'], ['A module test for C2', 'Nov 1, 3:13 AM', 'code']], end: [['C2’s Tracking answer', 'saved at 3:33 AM', 'opus']] }], note: 'The same morning, the tests for Bull Legal and Kogalla saved their Tracking answers at 3:29 and 3:30 AM.' },
    GOO: { tag: 'plan', rows: [{ steps: [['C2’s Google', 'its own check and answer', 'code']], end: [['Trusted from Oct 1', 'its answer of Nov 1', 'keep']] }], note: 'Not built: today one answer covers both of C2’s platforms. Split, Google’s result stands on its own while Meta waits on its fix.' },
    MET: { tag: 'plan', rows: [{ steps: [['C2’s Meta', 'two tags send each lead twice', 'block']], end: [['Not trusted, with its fix', 'case #58', 'block']] }], note: 'Not built. A break on Meta starts no work on Google.' },
    MSF: { tag: 'plan', rows: [{ steps: [['A client with a Microsoft account', 'Microsoft’s 2 goals', 'code']], end: [['Its own result', '', 'code']] }], note: 'Not built, and made up: none of the three test clients has a Microsoft account.' },
    MARKS: { tag: 'plan', rows: [{ steps: [['KDX’s Contact_Phone_GA4', '2 in the last 30 settled days, no choice yet', 'code'], ['Opus chooses', 'order, lead or no, with why', 'next']], end: [['Counted, or left out, that morning', '', 'code']] }], note: 'Not built. On Nov 7 it still waits for Will’s mark (KDX’s brief).' },
    BROKE: { tag: 'plan', rows: [{ steps: [['KDX’s Google', 'the week of Oct 26 is not trusted', 'block'], ['Has it broken?', 'yes, and KDX has no answer: a new break', 'next']], end: [['Opus answers for KDX’s Google', '', 'opus']] }], note: 'Not built. The finding is real: KDX’s brief, Nov 7.' },
    OKAY: { tag: 'plan', rows: [{ steps: [['Bull Legal’s Google', 'no week, goal or swing found', 'code']], end: [['Not broken: trusted', 'no Opus starts', 'keep']] }], note: 'Not built. Made from Bull’s run of Nov 1: 4 goals passed, 2 could not check, none failed.' },
    STAND: { tag: 'plan', rows: [{ steps: [['C2’s Meta, Nov 2', 'the same failure as Nov 1', 'block'], ['The last answer named it', 'Nov 1', 'code']], end: [['The last answer stands', 'no Opus starts', 'code']] }], note: 'Not built. The failure is real: the verifiers’ replay of Nov 2.' },
    FACTS: { tag: 'real', rows: [{ steps: [['C2, Nov 7', 'Google and Meta', 'code'], ['The brief', '14 weeks a platform, 13 weeks of the lead app, 4 actions that wait for a mark', 'code']], end: [['One page for Opus', 'with the reads it must run', 'opus']] }], note: 'C2’s Tracking brief as Barbara gives it on Nov 7.' },
    CHECKS: { tag: 'real', rows: [{ steps: [['C2’s tracking checks', 'Nov 1, 3:15 AM, 164 seconds', 'will'], ['The run', '2 failed, 1 needs a decision, 9 could not check, 3 passed', 'code']], end: [['Opus answers each line', '', 'opus']] }], note: 'Both failures are Meta’s: each lead counted twice, and broken days with no person’s yes then.' },
    TRUST: { tag: 'real', rows: [{ steps: [['C2’s Meta lead days', 'Sep 14 to Oct 26', 'code'], ['Will’s answer on case #260', 'two Meta Lead tags fired on each form', 'will']], end: [['Broken: no number is read from them', '', 'block']] }], note: 'The trust calendar on Nov 7: 49 broken days and 1 suspect day of C2’s Meta, from Sep 14 to Nov 2.' },
    OPUS: { tag: 'real', rows: [{ steps: [['C2, Nov 1', 'Opus reads, then answers', 'opus']], end: [['Google: trusted from Oct 1', '', 'keep'], ['Meta: not trusted', 'judge it on clicks and GA4 leads', 'block']] }], note: 'C2’s Tracking answer of Nov 1: a problem, with four fixes.' },
    SAVE: { tag: 'real', rows: [{ steps: [['C2’s answer', 'a problem, 4 fixes, 6 checks answered', 'opus'], ['Code checks it', 'every rule of that day passes', 'code']], end: [['Saved, Nov 1, 3:33 AM', '', 'keep']] }], note: 'No check run had reached Barbara, so the save held it to none, as it does today.' },
    OUT: { tag: 'real', rows: [{ steps: [['C2’s Tracking answer', 'Nov 1, 3:33 AM', 'opus'], ['C2’s Results answer for Meta', 'it reads Tracking’s summary', 'opus']], end: [['Meta judged on clicks, landing page views and GA4 leads', '', 'keep']] }], note: 'The campaign modules ran after Tracking in C2’s tests of Nov 1.' }
  },

  reviewed: { self: '188799ed', on: '2026-11-07' }
});
