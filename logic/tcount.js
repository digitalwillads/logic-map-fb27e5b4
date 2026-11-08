// What the platform counted: code's morning read of each platform's conversions, which of them count, and the changes to
// how an action counts. Sources (comm-chat, read 2026-11-07): src/ad_days/mod.rs:18-23 (each day is read again until 30
// days have passed), :245-249 (Google's query: each campaign's days by action), :366-385 (Google's count on the click's day
// and on the conversion's own day), :486-500 (Meta's rows), :520-525 (Microsoft's goals: all conversions only); the read
// check against the platform's totals (KDX's Tracking brief, Nov 7); Will's word: src/chat/tools/mark_tools.rs:1-12 (Nov 1,
// "Your answer sets the mark"; LS Thomas's approved rule), src/results/labels.rs (his click on the Results tab); the wait
// rule: src/results/labels.rs:1-90, src/scorecard/compute.rs:226-262; setting changes: src/results/compute.rs:617-650.
// Will, Nov 7, on "Will's marks say which actions count": "I want this automated. Opus should choose" (not built). Claude's
// call of Nov 7: Will's own word still wins, and code checks Opus's choice against the client's record (not built).
// Real cases: KDX's brief of Nov 7 (its actions over 14 weeks, the change of Oct 28); the marks in Barbara's copy of Nov 7
// (KDX case #235 reply 4504, Bull case #151 reply 2746); Bull's case #219; Bull's Tracking answer of Nov 1 (Will's mail of
// Oct 29); Kogalla's Tracking answer of Nov 1 (its copies of Purchase, case #87); Flexan's change of Sep 13 (the verifiers'
// google-ads-audit.toml:552). Google's help, read 2026-11-07 (support.google.com/google-ads/answer/6270625): the main
// conversion columns count from the time of the click; columns "by conv. time" count from the time of the conversion.
// Microsoft's docs (learn.microsoft.com, AccountProperty): its "all conversions" columns include view-through conversions
// when the account includes them.
LOGIC.flow({
  id: 'tcount', parent: 'tracking', status: 'Partly built; the rest is not built yet',
  title: 'What the platform counted', short: 'What it counted',
  head: 'Each platform counts many kinds of actions, and only real leads and sales belong in its count',
  chart: [
    'flowchart TB',
    'READ["Every morning code reads each<br/>action’s conversions: by day,<br/>by campaign, with their value"]:::code',
    'CHANGE["Code dates each change to<br/>how a counted action counts"]:::code',
    'WORD{"Did Will say what<br/>this action is?"}:::code',
    'OPUS["Opus chooses: a sale, a lead,<br/>or not a real result, and<br/>says why"]:::next',
    'TEST{"Does it move with the<br/>record’s real leads or sales?"}:::next',
    'AGAIN(["Refused, with why:<br/>Opus chooses again"]):::next',
    'COUNT(["The count: every action that<br/>counts, by day and by campaign"]):::code',
    'READ --> CHANGE --> WORD',
    'WORD -- "yes: his word stands" --> COUNT',
    'WORD -- no --> OPUS', 'OPUS --> TEST',
    'TEST -- no --> AGAIN', 'AGAIN -.-> OPUS',
    'TEST -- yes --> COUNT'
  ],
  links: { READ: 'tcread', WORD: 'tcword', OPUS: 'tcopus', TEST: 'tctest', CHANGE: 'tcchange' },
  leaves: { tcread: 'What code reads', tcword: 'Will’s own word', tcopus: 'Opus chooses', tctest: 'Checked against the record', tcchange: 'A change to how an action counts' },

  deck: [
    { about: ['tcount'], kicker: 'The idea',
      head: 'A platform counts a form, a call and a tap on its map listing alike, so someone must say which ones are real',
      visual: { type: 'bars', max: 25, rows: [
        { label: 'Consultation Request: a form sent', parts: [[25, 'keep', '25 in 14 weeks']] },
        { label: 'Local actions, other engagements: someone used the map listing', parts: [[20, 'block', '20 in 14 weeks']] },
        { label: 'Calls from Smart Campaign Ads', parts: [[13, 'block', '13 in 14 weeks']] },
        { label: 'Contact_Phone_GA4: a phone contact that GA4 records', parts: [[10, 'wait', '10 in 14 weeks']] }] },
      vcap: 'These are KDX’s Google actions in the 14 weeks to Nov 7. Google treats all four as primary, but Will said on Nov 2 that the ad calls are not real leads, and the phone contact still waits for someone to choose.' },
    { about: ['tcount'], kicker: 'Today and the plan',
      head: 'Today an action waits for Will until someone says what it is, and in the plan Opus chooses the same morning',
      visual: { type: 'flow', rows: [
        { title: 'Today', steps: [['A person names the main conversion', 'if nobody has, a fixed rule picks one', 'will'], ['Will marks each other action', '', 'will']], end: [['An action he has not marked waits for him', 'KDX’s phone contact, still on Nov 7', 'block']] },
        { title: 'The plan', steps: [['Will’s own word goes first', '', 'will'], ['Opus chooses every action left', 'with its reason', 'next'], ['Code checks each choice against the record', '', 'next']], end: [['Counted or left out the same morning', '', 'keep']] }] },
      vcap: 'KDX’s case #235 said “3 lead actions wait for Will’s mark, so no one knows what a KDX lead costs.” Will marked two of them on Nov 2, and the third still waits on Nov 7.' },

    { about: ['tcread'], kicker: 'What code reads',
      head: 'Code reads all three platforms each morning, and checks its read against each platform’s own totals',
      visual: { type: 'gate', rows: [
        ['Google', 'Code reads each action’s conversions and their value by campaign, both on the day of the click and on the day the conversion happened.', 'pass'],
        ['Meta', 'Code reads each event’s conversions and their value, by campaign and by day.', 'pass'],
        ['Microsoft', 'Code reads each goal’s conversions by campaign. Microsoft gives only its “all conversions” there, and those also count people who saw an ad and never clicked, when the account includes them.', 'pass'],
        ['A check of the read', 'Each morning code compares a day’s spend, clicks and impressions with the platform’s own totals.', 'pass']] },
      vcap: 'On Nov 7, code’s read of KDX’s Nov 6 matched Google Ads on spend ($110.08), clicks (13) and impressions (130). Code reads each day again every morning until 30 days have passed, because conversions keep landing on past days.' },
    { about: ['tcread'], kicker: 'Two days for one conversion',
      head: 'Google can file one conversion under two days, so the match uses the day it really happened',
      visual: { type: 'flow', rows: [
        { title: 'A click on Monday, and a form sent on Wednesday', steps: [['The click', 'Monday', 'code'], ['The form is sent', 'Wednesday', 'keep']], end: [['Google’s main columns file it under Monday', '', 'code'], ['Its columns by conversion time file it under Wednesday', '', 'code']] }] },
      vcap: 'Google’s own help says its main conversion columns count from the time of the click. The client’s record files the lead under the day it came in, so the match uses Google’s count by conversion time, and the two line up.' },

    { about: ['tcword'], kicker: 'Will’s own word',
      head: 'Will’s own word decides an action first, and Opus never replaces it',
      visual: { type: 'flow', rows: [
        { title: 'A click on the Results tab', steps: [['Will marks an action a sale, a lead or neither', '', 'will']], end: [['It is saved at once', '', 'will']] },
        { title: 'A client rule he approved', steps: [['LS Thomas’s rule says “Conversions = GAds_form_sent_all only”', '', 'will']], end: [['The action it names counts, and the rest do not', '', 'code']] },
        { title: 'His answer on a case', steps: [['KDX, case #235', 'his reply of Nov 2', 'will']], end: [['The ad calls and the GA4 email contact are saved as no real leads', '', 'will']] }] },
      vcap: 'Claude’s call is that a word of Will’s beats a model’s choice, and a newer word of his replaces Opus’s. When his word is a reply on a case, Jev reads it once and saves a mark only when its score for a clear answer is {markYes} or more, as it does today.' },
    { about: ['tcword'], kicker: 'Why his word is saved',
      head: 'Once Will answers, his word is saved, so no run asks him the same thing again',
      visual: { type: 'timeline', items: [
        ['Case #151', 'A run asks if Bull Legal’s “Calls from website on click” is a lead. Will answers that it is not.'],
        ['Case #219', 'A run asks him again, because his answer was never saved as a mark.'],
        ['Nov 1', 'Will says “Your answer sets the mark”, and the mark tool is built.'],
        ['After', 'His answer on case #151 is saved as a mark, and the action stops waiting.']] },
      vcap: 'The action counts taps on the site’s phone link, not calls. Opus’s choices will be saved the same way, so an action that has a choice never waits again.',
      quote: ['So keep call clicks out of the lead numbers Tyler sees.', 'Oct 29'] },

    { about: ['tcopus'], kicker: 'Opus chooses',
      head: 'When Will has said nothing, Opus chooses each action that same morning, and its choice names its reason',
      visual: { type: 'card', title: 'KDX’s Contact_Phone_GA4, on Nov 7', fields: [
        ['What it is', 'GA4 records a phone contact on the site and sends it to Google as a call lead.'],
        ['What it counted', 'It counted 10 in the last 14 weeks, and Google treats it as primary.'],
        ['Why it waits', 'It counted in the last 30 days, nobody has said what it is, and no fixed rule leaves it out.'],
        ['What Opus would do', 'Opus would read the action, its counts and KDX’s own words, then choose a lead or not a real result, with its reason.']], stamp: ['Not built yet, so on Nov 7 it still waits for Will', 'next'] },
      vcap: 'The facts that code gathered for KDX on Nov 7 list it as waiting for Will’s mark. In the plan nothing waits for Will: Opus chooses, and code checks the choice before it counts.',
      quote: ['I want this automated. Opus should choose', 'Nov 7'] },
    { about: ['tcopus'], kicker: 'Which actions need a choice',
      head: 'Only an action that no rule decides needs a choice at all',
      visual: { type: 'gate', rows: [
        ['It counted in the last 30 settled days', 'An action that counted nothing changes no number.', 'pass'],
        ['Nobody has chosen yet', 'Will has said nothing, and Opus has not chosen.', 'pass'],
        ['No fixed rule leaves it out', 'A removed or hidden action, one of Google’s own, a step before the lead, a copy of the main event, or a lead action on a store.', 'pass'],
        ['Jev thinks it may count real results', 'Each morning Jev rates every action, and one under {waitFloor} never needs a choice.', 'pass']],
        end: ['Then Opus chooses', 'next'] },
      vcap: 'These four rules are built, and today they decide which actions wait for Will. The facts that code gathered for C2 on Nov 7 show four Meta actions that need a choice, such as a messaging conversation that started.' },

    { about: ['tctest'], kicker: 'Checked against the record',
      head: 'Code holds each choice up against the client’s record, so a chosen action must move with the real leads or sales',
      visual: { type: 'flow', rows: [
        { title: 'A choice that passes', steps: [['Opus calls a form action a lead', '', 'next'], ['Its count moves with the forms in the record, week by week', '', 'next']], end: [['It counts', '', 'keep']] },
        { title: 'A choice that fails', steps: [['Opus calls a tap on the phone link a lead', '', 'next'], ['The call tracker shows no call behind most taps', '', 'next']], end: [['Refused, so Opus chooses again', '', 'block']] },
        { title: 'Never counted', steps: [['A copy of the main action', 'Kogalla’s second Shopify purchase', 'code']], end: [['It counts the same orders again, so it never counts', '', 'block']] }] },
      vcap: 'This is not built yet, and it is Claude’s call from Will’s words of Nov 7: the record is the proof, so it judges each choice too. The first two rows are made up, but Kogalla’s answer of Nov 1 found its second purchase action counting the same orders as Purchase (case #87).' },

    { about: ['tcchange'], kicker: 'A change to how an action counts',
      head: 'A change to how an action counts can move the count while the real leads stay the same',
      visual: { type: 'timeline', items: [
        ['Sep 11 to 13, Flexan', 'The client moves three form actions from counting every conversion to one per click.'],
        ['The week of Sep 13', 'From that week Flexan’s form count reads lower, for the same activity on the site.'],
        ['Oct 28, KDX', 'Someone changes two GA4 contact actions from every conversion to one per click.'],
        ['The next morning', 'Code dates both changes and names the week they touched, the week of Oct 26.']] },
      vcap: 'So code dates every change to a counted action: whether it is primary, whether it counts in conversions, and whether it counts every conversion or one per click. A count that moves on the day of a change is a question about the change first.' }
  ],

  examples: {
    READ: { tag: 'real', rows: [{ steps: [['KDX’s Google, Nov 6', 'code read $110.08, 13 clicks and 130 impressions', 'code']], end: [['It matches Google Ads, so the day is read whole', '', 'keep']] }], note: 'The facts that code gathered for KDX’s Tracking, Nov 7.' },
    WORD: { tag: 'real', rows: [{ steps: [['Bull’s “Calls from website on click”', '', 'code'], ['Will said on case #151 that it is not a lead', '', 'will']], end: [['His word stands, so it stays out of the count', '', 'will']] }], note: 'Barbara keeps the mark with his answer on case #151 as its source.' },
    OPUS: { tag: 'plan', rows: [{ steps: [['KDX’s Contact_Phone_GA4', 'nobody has said what it is', 'code'], ['Opus reads it and chooses', '', 'next']], end: [['A lead, or not a real result, with its reason', '', 'next']] }], note: 'On Nov 7 the action still waits for Will’s mark.' },
    TEST: { tag: 'plan', rows: [{ steps: [['Opus calls a copy of the main action a lead', '', 'next'], ['Does it move with the real leads?', 'no, because it counts each lead a second time', 'next']], end: [['Refused', '', 'block']] }], note: 'Made up, because Opus chooses nothing yet.' },
    AGAIN: 'TEST',
    CHANGE: { tag: 'real', rows: [{ steps: [['KDX, Oct 28', 'two GA4 contact actions', 'code'], ['From every conversion to one per click', '', 'block']], end: [['Dated, with the week it touched', 'the week of Oct 26', 'code']] }], note: 'The facts that code gathered for KDX’s Tracking, Nov 7.' },
    COUNT: { tag: 'real', rows: [{ steps: [['C2’s Google, the week of Oct 19', 'its main action, the lead form', 'code']], end: [['3 conversions, each on the day it happened', '', 'code']] }], note: 'Barbara’s weekly lead counts for C2, read on Nov 7. Today the match uses the main action alone.' }
  },

  reviewed: { self: 'c4e4b027', above: '729bed9e', on: '2026-11-07' }
});
