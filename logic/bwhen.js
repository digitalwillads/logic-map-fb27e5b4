// When Bid and budget answers: comm-chat src/modules/day.rs:108-182 (`reason` asks, for each campaign of the list, the
// reasons in the design's order and gives the first that fits: a person's change, a Chad Ads alert, a follow-up of a budget,
// bid or bid strategy change, a target that moved, then 7 days; `due`), :89-92 and store.rs:129-135 (7 New York days),
// :241-252 (`stands`: a dry run's or a module test's answer does not count), :289-290 (`targets_ms`: the newest approval or
// retirement of any target); the list: brief/mod.rs:81-106 (`targets`), brief/numbers.rs:71-102 (`live_campaigns`, 30 days),
// mod.rs:61 (at most 8); an item names a campaign by its words: brief/mod.rs:146-154 (`fits`); a change with no record of who
// counts as a person's: src/triggers/morning.rs:71; the alerts: src/triggers/kinds.rs:196-235; the morning's list:
// day.rs:193-224 (`text`), brief/mod.rs:340-345; a test: brief/mod.rs:347-384 (`test_prompt`). The design asks for a share or
// spend that moved: docs/superpowers/specs/2026-11-04-modules-in-the-daily-run-design.md:165 and :172; the Spend alert stays
// off until its trigger is on: docs/claude-code-bridge-setup.md:2246-2249. Real items: the facts that code gathered on Nov 7
// for Bull and Kogalla, C2's four targets of Nov 1 (get_client_info, client 13), KDX's 10 campaigns (docs/design/modules/
// README.md:239), C2's answer 53. Old part: retired/2026-11-07-bids-redo/biddue.js.
LOGIC.flow({
  id: 'bwhen', parent: 'bids',
  title: 'When Bid and budget answers', short: 'When it answers',
  head: 'Bid and budget answers a campaign when something new names it, or when its last answer is {bidFresh} days old',
  chart: [
    'flowchart TB',
    'LIST["Each live campaign with spend,<br/>the most money first,<br/>at most {bidMost}"]:::code',
    'TEST(["Or a person tests the<br/>module, and code asks<br/>for no reason"]):::will',
    'P1{"Did a person change it<br/>since its last answer?"}:::code',
    'P2{"Does a Chad Ads<br/>alert name it?"}:::code',
    'P3{"Did a follow-up of its budget,<br/>bid or bid strategy come due?"}:::code',
    'P4{"Did a target of the<br/>client move since then?"}:::code',
    'P5{"Has it gone {bidFresh} days with<br/>no answer that stands?"}:::code',
    'DUE(["It answers today, with<br/>the first reason that fits"]):::opus',
    'NOT(["Not today, so its<br/>last answer stands"]):::code',
    'GAP["Never asked: a share of searches<br/>that moved, or spend that moved<br/>with no Chad alert"]:::code',
    'LIST --> P1',
    'P1 -- yes --> DUE', 'P1 -- no --> P2',
    'P2 -- yes --> DUE', 'P2 -- no --> P3',
    'P3 -- yes --> DUE', 'P3 -- no --> P4',
    'P4 -- yes --> DUE', 'P4 -- no --> P5',
    'P5 -- yes --> DUE', 'P5 -- no --> NOT',
    'NOT -. "even when" .-> GAP',
    'TEST --> DUE'
  ],
  links: { LIST: 'bwlist', TEST: 'bwtest', P1: 'bwnew', P2: 'bwnew', P3: 'bwnew', P4: 'bwtarget', P5: 'bwstale', GAP: 'biddesign' },
  leaves: {
    bwlist: 'Which campaigns it answers',
    bwtest: 'Today a person tests it',
    bwnew: 'Something new names it',
    bwtarget: 'A target moved',
    bwstale: '{bidFresh} days, and which answers count',
    biddesign: { title: 'A share or spend that moved', open: {
      q: 'The modules design says Bid and budget should answer when spend, a target or a share of searches moves. Code never reads a share. Should a share that moves make it answer?',
      since: 'Nov 7',
      opts: [
        ['Keep it as it is, with a person’s change, a Chad alert, a follow-up, a target that moved, and {bidFresh} days', true, 'The {bidFresh}-day floor catches a moved share within a week, and each campaign that answers costs one Opus subagent.'],
        ['Add a share that moved, such as the share lost to budget or to rank rising by a set amount in a week', false, 'It catches a campaign that starts to lose searches before a week passes, but it needs a share read every morning.'],
        ['Add spend that moved with no Chad alert', false, 'The Spend alert stays off until its trigger is on, so today a day of runaway spend can wait up to {bidFresh} days.']] } }
  },

  // Each slide belongs to one view: the part's own slides first, then one or more for each rule.
  deck: [
    { about: ['bwhen'], kicker: 'The reasons',
      head: 'Most reasons wake every campaign module, but a moved target wakes only Bid and budget',
      visual: { type: 'gate', rows: [
        ['A person changed it', 'Every campaign module answers that campaign.', 'pass'],
        ['A Chad Ads alert names it', 'Every campaign module answers that campaign.', 'pass'],
        ['A follow-up came due', 'Only the module of that kind of change answers, and a budget, bid or bid strategy change is Bid and budget’s.', 'pass'],
        ['A target of the client moved', 'Bid and budget alone answers, on every campaign.', 'pass'],
        ['No answer that stands in {bidFresh} days', 'Every module that Opus answers runs on each of its campaigns.', 'pass']], end: ['The morning’s list shows the first reason that fits', 'code'] },
      vcap: 'Only what came after its last answer on that campaign counts, so old news never wakes it twice. Decide runs whenever any module runs.' },
    { about: ['bwhen'], kicker: 'The morning’s list',
      head: 'Each campaign that answers is one line of the morning’s list, and that line is the whole prompt of one subagent',
      visual: { type: 'card', title: 'A Bid and budget line, in the morning’s list', fields: [
        ['The module', 'Bid and budget'],
        ['On', 'one campaign, by its name and its id'],
        ['It reads', 'the facts that code gathered for that campaign, then follows them'],
        ['Its thread', 'the run’s own, so the answer belongs to the run'],
        ['Its model', 'the run’s own, which is the latest Opus']], stamp: ['One subagent, never a fork', 'opus'] },
      vcap: 'The run itself never reads these facts or the raw numbers. It reads the saved answers, then carries out Decide’s answer, and a quiet morning starts no subagent at all.' },
    { about: ['bwhen'], kicker: 'Before the first live morning',
      head: 'Every answer so far came from a test, so the first live morning will find every campaign due',
      visual: { type: 'flow', rows: [
        { steps: [['Nov 1, module tests', 'on Kogalla, Bull and C2', 'will'], ['A test is a rehearsal', 'its answer does not stand', 'code']], end: [['The first live morning', 'every campaign is due, up to {bidMost} a client', 'opus']] }] },
      vcap: 'With no answer that stands, code asks about a moved target before the {bidFresh} days. So a client with any target that ever moved will show “a target moved” as the reason.' },

    { about: ['bwlist'], kicker: 'The campaigns',
      head: 'It answers each live campaign with spend, the most money first, and at most {bidMost} of them',
      visual: { type: 'flow', rows: [
        { title: 'Bull, Nov 7', steps: [['Startups', 'Google', 'code'], ['Securities', 'Google', 'code'], ['Hedge Funds and PE', 'Google', 'code']], end: [['3 campaigns', 'DeFi is not on the list', 'opus']] },
        { title: 'Kogalla, Nov 7', steps: [['PMax - RA - US', 'Google', 'code'], ['A second Google campaign', '', 'code'], ['A Meta campaign', '', 'code']], end: [['3 campaigns', '', 'opus']] }] },
      vcap: 'Live means it spent in the last {bidLive} stored days and the campaign map does not read it as paused. Past {bidMost} campaigns, code leaves the rest out and logs each one.' },
    { about: ['bwlist'], kicker: 'Paused campaigns',
      head: 'KDX has 10 campaigns, and only its 2 live ones get an answer',
      visual: { type: 'dots', groups: [[2, 'opus', 'live, so one answer each'], [8, 'code', 'paused, so no answer unless an open plan would turn one on']] },
      vcap: 'A paused campaign that an open plan would turn on joins the list after the live ones. Opus then sees its months, not its empty weeks, so it is judged as it would run.' },

    { about: ['bwtest'], kicker: 'Today',
      head: 'Today a person starts every run of Bid and budget, as a test that changes nothing',
      visual: { type: 'flow', rows: [
        { title: 'Validators, then Modules, on one client', steps: [['First', 'each stale account module, one by one', 'code'], ['Then, all at once', 'one subagent on each campaign of the list', 'opus']], end: [['One answer for each campaign', 'it does not stand, so the module stays due', 'code']] },
        { title: 'C2, Nov 1', steps: [['A test of Bid and budget', '', 'will'], ['One subagent on each campaign', '', 'opus']], end: [['Answer 53 on Competitor', 'too few to tell', 'wait']] }] },
      vcap: 'A test asks for no reason. Its opening tells Opus to change nothing, call no change tool and send nothing. Each real answer on this map came from a test, because the morning’s module run stays off in live.' },

    { about: ['bwnew'], kicker: 'Something new',
      head: 'A change, an alert or a follow-up counts only when its words name the campaign',
      visual: { type: 'card', title: 'Two real changes, as code showed them to Opus on Nov 7', fields: [
        ['Bull’s Securities', 'Yasir raised its daily budget from $65 to $80 on Nov 2.'],
        ['Kogalla’s PMax', 'On Nov 4 the campaign changed, and Google’s history keeps no record of who did it.'],
        ['How it names it', 'Each item ends with the campaign’s name.'],
        ['When it counts', 'It came after the last answer that stands on that campaign.']], stamp: ['A person changed it, so it is due', 'opus'] },
      vcap: 'A change with no record of who made it counts as a person’s change. Barbara’s own run wrote that one of Kogalla’s changes was most likely Google’s own work, and another most likely its own pushes of Nov 3.' },
    { about: ['bwnew'], kicker: 'Alerts and follow-ups',
      head: 'A Chad Ads alert must name the campaign, and a follow-up must be of a money change',
      visual: { type: 'gate', rows: [
        ['Spend runs away', 'A day goes over {bidSpendAlert}% of a campaign’s budget, and Chad checks every hour while this alert is on.', 'hold'],
        ['A landing page breaks', 'It fails twice in a row, an hour apart.', 'hold'],
        ['The account or an ad is stopped', 'It is suspended, disapproved, or it stopped spending.', 'hold'],
        ['A follow-up of a budget, bid or bid strategy change', 'It comes due on a case whose words name the campaign.', 'pass']], end: ['Each Chad alert stays off until its trigger is on', 'wait'] },
      vcap: 'A Leads alert names no campaign, so it wakes Tracking and Setup, never Bid and budget.' },

    { about: ['bwtarget'], kicker: 'A target moved',
      head: 'One target that moves makes Bid and budget answer on every campaign of the client',
      visual: { type: 'flow', rows: [
        { title: 'C2, Nov 1, 12:43 PM', steps: [['Barbara’s rule approves 4 targets', '$500 a lead and an $11,800 cap on Google, and $60 a lead and a $200 cap on Meta', 'will']], end: [['The next morning, every campaign is due', 'the Meta rows move the Google campaigns too', 'opus']] }] },
      vcap: 'Code takes the newest approval or retirement among all the client’s targets. It does not ask if that target covers the campaign.' },

    { about: ['bwstale'], kicker: '{bidFresh} days',
      head: 'An answer counts for {bidFresh} New York days, and only an answer that stands counts',
      visual: { type: 'timeline', items: [
        ['Day 0', 'An answer saves, at any hour.'],
        ['Days 1 to 6', 'It stands, so with no new reason no subagent starts.'],
        ['Day 7', 'It is stale by New York day, for the morning’s list and for the modules that need it alike.'],
        ['Never counted', 'A dry run’s answer, a module test’s answer, and a Decide whose run was cut short.']] },
      vcap: 'The morning’s list and the modules that need an answer count the same New York days. When they counted by the hour, an answer 6 days and 23 hours old read fresh to the 7:00 list and stale an hour later, so every module that needed it waited.' },

    { about: ['biddesign'], kicker: 'The design and the code',
      head: 'The design names spend, a target or a share that moved, and code never reads a share',
      visual: { type: 'gate', rows: [
        ['A target moved', 'Built, and any target of the client counts.', 'pass'],
        ['A test ended', 'Built, as a follow-up of a budget, bid or bid strategy change.', 'pass'],
        ['Spend moved', 'Only through Chad’s Spend alert, which stays off until its trigger is on.', 'hold'],
        ['A share moved', 'Not a reason in code.', 'stop']] },
      vcap: 'The design left what “moved” means to the builder. The {bidFresh}-day floor still makes each campaign answer once a week.',
      open: 'biddesign' }
  ],

  examples: {
    LIST: { tag: 'real', rows: [{ steps: [['Bull, Nov 7', 'its live campaigns with spend', 'code'], ['The list', 'Startups, Securities, and Hedge Funds and PE', 'code']], end: [['3 campaigns', '', 'opus']] }], note: 'The campaigns that code listed for Bid and budget on Bull, Nov 7.' },
    TEST: { tag: 'real', rows: [{ steps: [['C2, Nov 1', 'a person tests Bid and budget', 'will'], ['A subagent on Competitor', 'no reason asked', 'opus']], end: [['Answer 53', 'too few to tell', 'wait']] }], note: 'A test changes nothing, and its answer does not stand, so the module stays due.' },
    P1: { tag: 'made', rows: [{ steps: [['Bull’s Securities campaign', 'Yasir raised its daily budget from $65 to $80 on Nov 2', 'code'], ['Did a person change it?', 'yes', 'code']], end: [['It answers, because a person changed it', '', 'opus']] }], note: 'Made from a real change, which the facts of Nov 7 list as new. No live morning has read it yet.' },
    P2: { tag: 'made', rows: [{ steps: [['Spend runs away', 'on C2’s LA + New York campaign', 'code'], ['Does an alert name it?', 'yes', 'code']], end: [['It answers, because of a Chad Ads alert', 'and so do the other three campaign modules', 'opus']] }], note: 'Made from the module run’s own test, on C2’s campaign names. No live alert has reached a module run yet.' },
    P3: { tag: 'made', rows: [{ steps: [['Case #82', 'a budget change on C2’s Brand campaign, whose first follow-up is due', 'code'], ['A follow-up of a money change?', 'a budget, so yes', 'code']], end: [['It answers, because a follow-up came due', 'and only Bid and budget does', 'opus']] }], note: 'Made from the module run’s own test.' },
    P4: { tag: 'made', rows: [{ steps: [['C2, Nov 1, 12:43 PM', 'Barbara’s rule approves 4 targets', 'will'], ['Did a target move?', 'yes, after the last answer', 'code']], end: [['It answers on every campaign', '', 'opus']] }], note: 'Made from C2’s four real target rows of Nov 1. No live morning has run since.' },
    P5: { tag: 'made', rows: [{ steps: [['Bull’s Securities campaign', 'its last answer came from a module test on Nov 1', 'code'], ['Does an answer stand?', 'no, because a test does not count', 'code']], end: [['It answers', 'unless a reason above fits first', 'opus']] }], note: 'Made, because no live morning has run. Bull has targets that moved, so code would show “a target moved” first.' },
    DUE: { tag: 'real', rows: [{ steps: [['C2’s dry module run 259, Nov 4', 'on a copy of the database', 'code'], ['One subagent starts for each campaign that is due', '', 'code']], end: [['13 subagents of the campaign modules still at work at its 13th turn', '', 'opus']] }], note: 'A dry run on a copy, so it changed nothing. The four campaign modules ran at the same time. No live morning has run the module yet.' },
    NOT: { tag: 'made', rows: [{ steps: [['A campaign that answered yesterday', 'nothing new names it', 'code'], ['Is it due?', 'no', 'code']], end: [['Not today', 'its answer stands', 'code']] }], note: 'Made from the module run’s own test of a quiet morning.' },
    GAP: { tag: 'made', rows: [{ steps: [['A campaign starts to lose searches to budget', '', 'code'], ['Code asks its reasons', 'none of them reads a share', 'code']], end: [['It waits until a reason fits, or {bidFresh} days pass', '', 'wait']] }], note: 'Made, because no real case has come up yet.' }
  },

  reviewed: { self: '63f41669', above: '4bfe1dd5', on: '2026-11-07' }
});
