// What code reads for Tracking: the brief, from the stored tables alone, with no model and no network (comm-chat
// src/modules/brief/mod.rs:159-266, the order of its parts; numbers.rs:408-498, `tracking`; reads.rs:139-152;
// checks.rs:12-22 and 112-124; results/main_pick.rs:1-28; lead_match/weeks.rs:8-16). Real cases: the Tracking briefs of
// C2 and KDX as Barbara gave them on 2026-11-07, and the answers of Nov 1.
LOGIC.flow({
  id: 'tfacts', parent: 'tracking',
  title: 'What code reads for each platform', short: 'What code reads',
  head: 'Code reads the stored tables, and gives Opus one brief',
  chart: [
    'flowchart TB',
    'ACC{"An ad account<br/>linked to the client?"}:::code',
    'NONE(["The brief says: no ad<br/>account is linked"]):::code',
    'MAIN["Each platform: its main<br/>conversion, and how it<br/>was picked"]:::code',
    'WEEKS["Each week: the count, the<br/>spend and the clicks, with<br/>code\'s trust mark"]:::code',
    'ACTS["Each action by week, with<br/>its settings and their changes"]:::code',
    'WAIT["Not built: which actions<br/>count, and who chose"]:::next',
    'LEAD{"A lead app on file<br/>beside Google?"}:::code',
    'APP["The lead app beside Google:<br/>form fills, Bad marks,<br/>real leads"]:::code',
    'READS["The reads for Opus to run:<br/>GA4, Tag Manager, Meta\'s pixels"]:::code',
    'FAILED["The failed checks: the newest<br/>stored result of each<br/>tracking goal"]:::will',
    'BRIEF(["The brief, with what would<br/>prove the last answer<br/>wrong first"]):::code',
    'ACC -- no --> NONE', 'ACC -- yes --> MAIN',
    'MAIN --> WEEKS', 'WEEKS --> ACTS', 'ACTS --> WAIT', 'WAIT --> LEAD',
    'LEAD -- yes --> APP', 'LEAD -- no --> READS', 'APP --> READS', 'NONE --> READS',
    'READS --> FAILED', 'FAILED --> BRIEF'
  ],
  links: { MAIN: 'tfmain', WEEKS: 'tfweeks', ACTS: 'tfactions', LEAD: 'tflead', APP: 'tflead', READS: 'tfreads', FAILED: 'tffailed' },
  leaves: { tfmain: 'The main conversion', tfweeks: 'Each week', tfactions: 'Each action by week', tflead: 'The lead app beside Google', tfreads: 'The reads for Opus', tffailed: 'The failed checks' },

  deck: [
    { about: ['tfacts'], kicker: 'The brief',
      head: 'One brief, always in the same order, from the stored tables alone',
      visual: { type: 'flow', rows: [{ steps: [['What would prove the last answer wrong', 'test it first', 'code'], ['The fixed rules and the module’s words', '', 'code'], ['The numbers of each platform', '', 'code'], ['The failed checks', '', 'will'], ['The check to run', '', 'will']], end: [['The last answer, and what is new since', '', 'code']] }] },
      vcap: 'Nothing is cut for length. A brief over 24,000 characters reads in pages, and each page says how to read the next. Not built: on each call code reads these facts for its own check first, and the brief goes to Opus only for a new break.' },
    { about: ['tfacts'], kicker: 'A real brief · C2, Nov 7',
      head: 'C2’s brief: two platforms, 14 weeks each, and three reads for Opus',
      visual: { type: 'card', title: 'C2’s Tracking brief, Nov 7', fields: [
        ['Google Ads', 'main conversion “Submit Lead Form - 23/3/26”, picked by the rule'],
        ['Meta Ads', 'main conversion “lead”, picked by the rule'],
        ['The lead app', '13 weeks beside Google’s count'],
        ['Waits for a mark today', '4 Meta actions, such as a messaging conversation: Opus would choose (not built)'],
        ['Reads for Opus', 'one GA4 report, and the pixels of two Meta accounts'],
        ['Failed checks', 'offline uploads: it needs a decision (Nov 4)']], stamp: ['Each read checked against the platform’s own totals, Nov 6', 'code'] },
      vcap: 'Each morning code checks its read of a day against the platform’s totals: spend, clicks and impressions. The brief says if they matched.' },

    { about: ['tfmain'], kicker: 'The main conversion',
      head: 'A person names the main conversion. A fixed rule fills a blank one.',
      visual: { type: 'gate', rows: [
        ['Google', 'The client page names it. A blank one gets the rule’s pick from {pickDays} settled days: purchases first, then leads, each with {pickEnough} or more, then the rest. The most conversions wins.', 'pass'],
        ['Meta', '“purchase”, then “lead”, each with {pickEnough} or more. Never an engagement, a view or a cart.', 'pass'],
        ['Microsoft', 'A goal has only its name, so the rule reads the words of the name.', 'pass'],
        ['A person’s mark', 'The rule never changes it. A person’s mark replaces the rule’s.', 'hold']] },
      vcap: 'C2’s brief says “Picked by rule: most conversions in 90 settled days” for both of its platforms. KDX’s brief names its main conversion with no rule line: a person set it.',
      quote: ['I am the bottleneck', 'Oct 30'] },

    { about: ['tfweeks'], kicker: 'Each week',
      head: 'Each week shows the count, the spend and the clicks, and code marks a week it does not trust',
      visual: { type: 'card', title: 'KDX, the week of Oct 26 (its brief, Nov 7)', fields: [
        ['Count', '0 main conversions'], ['Spend', '$143.94'], ['Clicks', '36'], ['State', 'settling: its conversions still arrive'],
        ['Not trusted', 'two GA4 contact actions changed from every conversion to one per click, on Oct 28']], stamp: ['A setting changed on an action that recorded: not trusted', 'block'] },
      vcap: 'The brief shows this week so far and the 13 full weeks before it. Code’s five trust rules are in the part on which days count.' },

    { about: ['tfactions'], kicker: 'Each action by week',
      head: 'The eight actions that counted most, week by week, and each change to their settings',
      visual: { type: 'bars', max: 25, rows: [
        { label: 'Consultation Request: a form, primary', parts: [[25, 'keep', '25 in 14 weeks']] },
        { label: 'Local actions, other engagements: primary', parts: [[19, 'block', '19 in 14 weeks']] },
        { label: 'Calls from Smart Campaign Ads: a call, primary', parts: [[12, 'code', '12 in 14 weeks']] },
        { label: 'Contact_Phone_GA4: a call, primary', parts: [[10, 'code', '10 in 14 weeks']] }] },
      vcap: 'KDX’s brief, Nov 7. Only Google keeps an action’s settings: its category, its status, and primary or secondary. A brief names the setting changes of the last 13 weeks, oldest first.' },

    { about: ['tflead'], kicker: 'The lead app',
      head: 'Real leads: the sends with an ad click, less the leads the client marked Bad',
      visual: { type: 'gate', rows: [
        ['Oct 19: Google 3, real 3', '10 form fills, 1 marked Bad: it matches.', 'pass'],
        ['Oct 12: Google 3, real 3', '7 form fills, 1 marked Bad: it matches.', 'pass'],
        ['Oct 5: Google 1, real 1', '4 form fills, 2 marked Bad: it matches.', 'pass'],
        ['Sep 21: Google 0, real 5', 'Before the lead app saw clicks: totals only, never a mismatch.', 'wait']] },
      vcap: 'C2, from its brief of Nov 7. A week matches when the gap is 0, or when it is under {gapLeads} leads and under a share of {gapShare} of the real leads. A settled week that does not match is not trusted. A Bad mark also takes the conversion back at Google: Google took all 5 of C2’s Bad marks in October.' },

    { about: ['tfreads'], kicker: 'Reads for Opus',
      head: 'Code does not read GA4, Tag Manager or Meta’s pixels: it hands Opus the exact reads',
      visual: { type: 'gate', rows: [
        ['GA4', 'One report by day: key events, transactions and revenue. With no property on file, a list of the properties the login reads.', 'pass'],
        ['Tag Manager', 'The container’s versions, and when the live one was saved, when a container is on file.', 'pass'],
        ['Meta’s pixels', 'Each Meta account’s datasets, and when each one last fired.', 'pass'],
        ['A store’s orders', 'No read at all: use a report from the client, and say so when none came.', 'stop']] },
      vcap: 'Bull’s answer of Nov 1 found its GA4 property among 180 that the login reads, because Barbara had none on file. Kogalla’s answer found that the property Barbara names gives no source to about half of the store’s sales.' },

    { about: ['tffailed'], kicker: 'The failed checks',
      head: 'The brief lists each tracking goal that did not pass in the last 14 days',
      visual: { type: 'flow', rows: [{ title: 'KDX, Nov 7', steps: [['The audit: the right actions are primary', 'failed, Nov 1', 'will'], ['Barbara’s list: the week of Oct 26 is not trusted', '', 'will'], ['Barbara’s list: an action waits for Will’s mark', '', 'will']], end: [['Opus answers each one', '', 'opus']] }] },
      vcap: 'These are stored results, read as the Exam page reads them, so the brief and the Exam never disagree. Not built: the brief’s list and the fresh check run from one source.' }
  ],

  examples: {
    ACC: { tag: 'real', rows: [{ steps: [['Bull Legal', 'one Google Ads account', 'code'], ['An ad account linked?', 'yes', 'code']], end: [['Its Google numbers', '', 'code']] }], note: 'Bull has no Meta or Microsoft account (its Tracking answer of Nov 1).' },
    NONE: { tag: 'made', rows: [{ steps: [['A client with no ad account linked', '', 'code'], ['An ad account linked?', 'no', 'code']], end: [['The brief says so, and still lists the reads', '', 'code']] }], note: 'Made up: each client of these examples has an ad account.' },
    MAIN: { tag: 'real', rows: [{ steps: [['C2, Google Ads', 'its main conversion was blank', 'code'], ['The rule', 'most conversions in {pickDays} settled days', 'code']], end: [['Submit Lead Form - 23/3/26', '', 'keep']] }], note: 'C2’s brief, Nov 7. Meta’s main conversion, “lead”, came from the rule too.' },
    WEEKS: { tag: 'real', rows: [{ steps: [['KDX, the week of Oct 26', '0 main, $143.94, 36 clicks', 'code'], ['Two actions changed how they count', 'Oct 28', 'code']], end: [['Not trusted, with why', '', 'block']] }], note: 'KDX’s brief, Nov 7.' },
    ACTS: { tag: 'real', rows: [{ steps: [['KDX’s actions', '8 shown, 3 more counted less', 'code'], ['Consultation Request', 'a form, primary: 25 in 14 weeks', 'code']], end: [['Its main conversion', '', 'keep']] }], note: 'KDX’s brief, Nov 7: the main conversion, with three primary call actions beside it.' },
    WAIT: { tag: 'plan', rows: [{ steps: [['KDX’s actions', 'Consultation Request is the main conversion', 'code'], ['Two actions Will marked “no”', 'and Contact_Phone_GA4: Opus’s choice', 'next']], end: [['Which actions count, and who chose', '', 'code']] }], note: 'Not built. On Nov 7 KDX’s brief lists Contact_Phone_GA4 as waiting for Will’s mark.' },
    LEAD: { tag: 'real', rows: [
      { title: 'C2', steps: [['A lead app on file?', 'yes: Waylon’s', 'code']], end: [['13 weeks beside Google’s count', '', 'code']] },
      { title: 'KDX', steps: [['A lead app on file?', 'no', 'code']], end: [['On to the reads', '', 'code']] }], note: 'The briefs of Nov 7.' },
    APP: { tag: 'real', rows: [{ steps: [['C2, the week of Oct 19', '10 form fills, 1 marked Bad', 'code'], ['Google 3, real 3', '', 'code']], end: [['It matches', '', 'keep']] }], note: 'C2’s brief, Nov 7.' },
    READS: { tag: 'real', rows: [{ steps: [['C2', 'a GA4 property and two Meta accounts on file', 'code'], ['The reads', 'one GA4 report, two pixel lists', 'code']], end: [['Opus runs them', '', 'opus']] }], note: 'C2’s brief, Nov 7. No Tag Manager container is on file for C2, so no Tag Manager read is listed.' },
    FAILED: { tag: 'real', rows: [{ steps: [['KDX, the last 14 days', '', 'code'], ['3 did not pass', 'primary actions, a week not trusted, a mark that waits', 'will']], end: [['Opus answers each one', '', 'opus']] }], note: 'KDX’s brief, Nov 7.' },
    BRIEF: { tag: 'real', rows: [{ steps: [['C2’s last answer said', '“A settled week from Oct 1 on where Google’s count differs from the lead app…”', 'opus'], ['The brief opens with it', '', 'code']], end: [['Opus tests it first', '', 'opus']] }], note: 'C2’s brief, Nov 7.' }
  },

  reviewed: { self: '2f919b91', above: 'd4e50d2f', on: '2026-11-07' }
});
