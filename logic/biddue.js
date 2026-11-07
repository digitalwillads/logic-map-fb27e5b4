// When is Bid and budget due? comm-chat src/modules/day.rs:22-182: `reason` asks, for each campaign of the target list,
// the reasons in the design's order and gives the first that fits; staleness comes last. For Bid and budget: a person's
// change, a Chad Ads alert, a follow-up of a budget, bid or bid strategy change, a target that moved, then 7 days.
// The target list is brief::targets (brief/mod.rs:81-106). Sources for each box: HANDOFF-bids-client.md.
LOGIC.flow({
  id: 'biddue', parent: 'bids',
  title: 'When is Bid and budget due?', short: 'When is it due?',
  head: 'Bid and budget runs on a campaign when something new names it, or after {bidFresh} days',
  chart: [
    'flowchart TB',
    'LIST["The campaigns: live with spend,<br/>the most money first,<br/>at most {bidMost}"]:::code',
    'P1{"A person changed it<br/>since its last answer?"}:::code',
    'P2{"A Chad Ads alert<br/>names it?"}:::code',
    'P3{"A follow-up of its budget,<br/>bid or strategy came due?"}:::code',
    'P4{"A target of the client<br/>moved since then?"}:::code',
    'P5{"No answer that stands<br/>in {bidFresh} days?"}:::code',
    'DUE(["Due: one subagent,<br/>with the first reason"]):::code',
    'NOT(["Not due today"]):::code',
    'GAP["Never asked: a share that moved,<br/>or spend that moved<br/>with no Chad alert"]:::code',
    'LIST --> P1',
    'P1 -- yes --> DUE', 'P1 -- no --> P2',
    'P2 -- yes --> DUE', 'P2 -- no --> P3',
    'P3 -- yes --> DUE', 'P3 -- no --> P4',
    'P4 -- yes --> DUE', 'P4 -- no --> P5',
    'P5 -- yes --> DUE', 'P5 -- no --> NOT',
    'NOT -. "even when" .-> GAP'
  ],
  links: { LIST: 'bidlist', P1: 'bidnew', P2: 'bidnew', P3: 'bidnew', P4: 'bidtarget', P5: 'bidstale', GAP: 'biddesign' },
  leaves: {
    bidlist: 'Which campaigns it answers',
    bidnew: 'Something new names it',
    bidtarget: 'A target moved',
    bidstale: '{bidFresh} days, and what counts as an answer',
    biddesign: { title: 'A share or spend that moved', open: {
      q: 'The design says spend, a target or a share that moved makes Bid and budget due. Code never reads a share. Should a moved share make it due?',
      since: 'Nov 7',
      opts: [
        ['Keep it as it is: a person\'s change, a Chad alert, a follow-up, a target, and {bidFresh} days', true, 'The {bidFresh}-day floor catches a moved share within a week, and each due campaign costs one Opus subagent.'],
        ['Add a share that moved: the share lost to budget or to rank up by a set amount in a week', false, 'It catches a campaign that starts to lose searches before a week passes, but it needs a share read every morning.'],
        ['Add spend that moved with no Chad alert', false, 'The Spend alert stays off until its trigger is on, so today a runaway day can wait up to {bidFresh} days.']] } }
  },

  // Each slide belongs to one view: the part's own slides first, then one or more for each rule.
  deck: [
    { about: ['biddue'], kicker: 'Shared and its own',
      head: 'Three reasons come from the morning\'s items, and one reason is Bid and budget\'s own',
      visual: { type: 'gate', rows: [
        ['A person changed it', 'every campaign module runs on that campaign', 'pass'],
        ['A Chad Ads alert names it', 'every campaign module runs on that campaign', 'pass'],
        ['A follow-up came due', 'only the module of that kind of change: a budget, bid or bid strategy is Bid and budget\'s', 'pass'],
        ['A target moved', 'Bid and budget alone, on every campaign', 'pass'],
        ['No answer that stands in {bidFresh} days', 'every model module, on each of its targets', 'pass']], end: ['The day shows the first reason that fits', 'code'] },
      vcap: 'Only what came after its last answer on that campaign counts. Decide runs when any module runs.' },
    { about: ['biddue'], kicker: 'Before the first live morning',
      head: 'Every bids answer so far came from a test, so the first live morning finds each campaign due',
      visual: { type: 'flow', rows: [
        { steps: [['Nov 1: module tests', 'Kogalla, Bull and C2', 'code'], ['A test is a rehearsal', 'its answer does not stand', 'code']], end: [['The first live morning: due on every campaign', 'up to {bidMost} a client', 'opus']] }] },
      vcap: 'With no answer that stands, code asks "a target moved" before the {bidFresh} days. So a client with any target that ever moved shows "a target moved" as the reason.' },

    { about: ['bidlist'], kicker: 'The campaigns',
      head: 'It answers each live campaign with spend, the most money first, at most {bidMost}',
      visual: { type: 'flow', rows: [
        { title: 'Bull, Nov 7', steps: [['Startups', 'Google', 'code'], ['Securities', 'Google', 'code'], ['Hedge Funds & PE', 'Google', 'code']], end: [['3 campaigns', 'DeFi is not on the list', 'opus']] },
        { title: 'Kogalla, Nov 7', steps: [['PMax - RA - US', 'Google', 'code'], ['A second Google campaign', '', 'code'], ['A Meta campaign', '', 'code']], end: [['3 campaigns', '', 'opus']] }] },
      vcap: 'Live means it spent in the last {bidLive} stored days, and the campaign map does not read it as paused. Past {bidMost}, code leaves the rest out and logs each one.' },
    { about: ['bidlist'], kicker: 'Paused campaigns',
      head: 'KDX has 10 campaigns, and only its 2 live ones get a Bid and budget answer',
      visual: { type: 'dots', groups: [[2, 'opus', 'live: one answer each'], [8, 'code', 'paused: no answer, unless an open plan would turn one on']] },
      vcap: 'A paused campaign that a plan would turn on joins the list after the live ones. Its brief shows months, not empty weeks, so it is judged as it would run.' },
    { about: ['bidnew'], kicker: 'Something new',
      head: 'A change, an alert or a follow-up counts only when its words name the campaign',
      visual: { type: 'card', title: 'Two real items, from the briefs of Nov 7', fields: [
        ['Bull Securities', 'Yasir changed the account on Nov 2: Daily budget $65 → $80'],
        ['Kogalla PMax', 'No record of who changed the account on Nov 4: Campaign changed'],
        ['Names it', 'each item ends with the campaign\'s name'],
        ['Counts when', 'it came after the last answer that stands on that campaign']], stamp: ['A person changed it: due', 'opus'] },
      vcap: 'A change with no record of who counts as a person\'s. Barbara\'s own run wrote that one Kogalla change was most likely Google\'s own work, and one most likely its own pushes.' },
    { about: ['bidnew'], kicker: 'Alerts and follow-ups',
      head: 'A Chad Ads alert must name the campaign, and a follow-up must be of a money change',
      visual: { type: 'gate', rows: [
        ['Spend runs away', 'a day over {bidSpendAlert}% of a campaign\'s budget; Chad checks every hour while it is on', 'hold'],
        ['A landing page breaks', 'twice in a row, an hour apart', 'hold'],
        ['The account or an ad is stopped', 'suspended, disapproved, or it stopped spending', 'hold'],
        ['A follow-up of a budget, bid or bid strategy change', 'due on a case whose words name the campaign', 'pass']], end: ['Each Chad alert starts off until its trigger is on', 'wait'] },
      vcap: 'A Leads alert names no campaign, so it runs Tracking and Setup, never Bid and budget.' },
    { about: ['bidtarget'], kicker: 'A target moved',
      head: 'One target that moves makes Bid and budget due on every campaign of the client',
      visual: { type: 'flow', rows: [
        { title: 'C2, Nov 1, 12:43 PM', steps: [['Barbara\'s rule approves 4 targets', '$500 a lead and an $11,800 cap on Google; $60 a lead and a $200 cap on Meta', 'will']], end: [['The next morning: due on every campaign', 'the Meta rows move the Google campaigns too', 'opus']] }] },
      vcap: 'Code takes the newest approval or retirement among all the client\'s targets. It does not ask if that target covers the campaign.' },
    { about: ['bidstale'], kicker: '{bidFresh} days',
      head: 'An answer counts for {bidFresh} New York days, and only an answer that stands counts',
      visual: { type: 'timeline', items: [
        ['Day 0', 'An answer saves, at any hour.'],
        ['Days 1 to 6', 'It stands: with no new reason, no subagent.'],
        ['Day 7', 'It is stale by New York day, for the morning list and for the needs alike.'],
        ['Not counted', 'A dry run\'s answer, a module test\'s answer, and a Decide whose run was cut short.']] },
      vcap: 'One rule serves both: by the hour, an answer 6 days and 23 hours old read fresh to the 7:00 list and stale an hour later, so every module that needed it waited.' },
    { about: ['biddesign'], kicker: 'The design and the code',
      head: 'The design names spend, a target or a share that moved, and code never reads a share',
      visual: { type: 'gate', rows: [
        ['A target moved', 'built: any target of the client', 'pass'],
        ['A test ended', 'built as a follow-up of a budget, bid or bid strategy change', 'pass'],
        ['Spend moved', 'only through Chad\'s Spend alert, off until its trigger is on', 'hold'],
        ['A share moved', 'not a reason in code', 'stop']] },
      vcap: 'The design left what "moved" means to the builder. The {bidFresh}-day floor still runs each campaign once a week.',
      open: 'biddesign' }
  ],

  examples: {
    LIST: { tag: 'real', rows: [{ steps: [['Bull, Nov 7', 'live campaigns with spend', 'code'], ['The list', 'Startups, Securities, Hedge Funds & PE', 'code']], end: [['3 campaigns', '', 'opus']] }], note: 'Bull, Nov 7: the target list that module_brief gave for Bid and budget.' },
    P1: { tag: 'made', rows: [{ steps: [['Bull Securities', 'Yasir: daily budget $65 → $80, Nov 2', 'code'], ['A person changed it?', 'yes', 'code']], end: [['Due: a person changed it', '', 'opus']] }], note: 'Made from a real item: Bull\'s bids brief of Nov 7 lists it as new. No live morning has read it.' },
    P2: { tag: 'made', rows: [{ steps: [['Spend runs away', 'on C2\'s LA + New York campaign', 'code'], ['An alert names it?', 'yes', 'code']], end: [['Due: a Chad Ads alert', 'all four campaign modules', 'opus']] }], note: 'Made: the module run\'s own test, on C2\'s campaign names. No live alert has reached a module run.' },
    P3: { tag: 'made', rows: [{ steps: [['Case #82', 'a budget change on C2 Brand: follow-up 1 is due', 'code'], ['A follow-up of its kind?', 'a budget: yes', 'code']], end: [['Due: a follow-up came due', 'Bid and budget only', 'opus']] }], note: 'Made: the module run\'s own test.' },
    P4: { tag: 'made', rows: [{ steps: [['C2, Nov 1, 12:43 PM', 'Barbara\'s rule approves 4 targets', 'will'], ['A target moved?', 'yes, after the last answer', 'code']], end: [['Due on every campaign', '', 'opus']] }], note: 'Made from real targets: C2\'s four target rows of Nov 1. No live morning has run since.' },
    P5: { tag: 'made', rows: [{ steps: [['Bull Securities', 'its last answer: a module test, Nov 1', 'code'], ['An answer that stands?', 'no: a test does not count', 'code']], end: [['Due', 'unless a reason above fits first', 'opus']] }], note: 'Made: no live morning has run. Bull has targets that moved, so code would show "a target moved" first.' },
    DUE: 'P1',
    NOT: { tag: 'made', rows: [{ steps: [['A campaign answered yesterday', 'nothing new names it', 'code'], ['Due?', 'no', 'code']], end: [['Not due', 'its answer stands', 'code']] }], note: 'Made: the module run\'s quiet-morning test.' },
    GAP: { tag: 'made', rows: [{ steps: [['A campaign starts to lose searches to budget', '', 'code'], ['Code asks', 'no reason reads a share', 'code']], end: [['Not due until a reason fits, or {bidFresh} days pass', '', 'wait']] }], note: 'Made: no real case yet.' }
  },

  reviewed: { self: 'dfa8bff9', above: '142877dc', on: '2026-11-07' }
});
