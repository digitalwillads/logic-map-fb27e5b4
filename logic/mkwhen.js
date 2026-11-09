// When the Setup and market module reads the account again. comm-chat at origin/main 1c24d43a, read 2026-11-08:
// src/modules/day.rs `reason` (110-156). For Setup only four reasons fit, in this order: a person's change that names no
// live campaign (:115 `names_none`, :127, SETTING "a person changed the account"), an alert that names no live campaign
// (:117, :136, ALERT; a leads alert wakes Tracking too, :133), a follow-up on a case whose change is to the product feed
// (:103 `module_of`, :146, FOLLOW_UP), and no answer that stands from the last 7 New York days (:155, STALE; store.rs
// `stale`). Only what came after its newest answer that stands counts (:111-112); a dry run's or a module test's answer
// does not stand (`stands`, :244-252). A failed morning read leaves only the 7 days (:279-286, `items_read`). The items:
// src/triggers/morning.rs:66-85 (`ItemKind`), :213-220 (an alert is spend, leads, policy or site), :231-236 (a change is a
// person's only: team, client or an unknown login); src/results/compute.rs:676-702 (`who_of`: Google's own tips, Meta's own
// reviews and Microsoft's budget pauses are Google's or the platform's). A live campaign: src/modules/brief/mod.rs:81-106
// (`targets`: spent in the last 30 stored days, or a paused one a plan would turn on) and brief/numbers.rs:30. A test:
// src/modules/brief/mod.rs:348-384 (`test_prompt`: change nothing; a module that needs no answer runs alone). Code's own
// tests: day.rs:416-423 (C2, "auto-apply off ()" wakes Setup; a $7 Max CPC on LA + New York wakes its four modules),
// :441-449 ("Chad Ads: Leads stopped" wakes Tracking and Setup; "A landing page broke" on Brand wakes Brand's four). Real
// cases: Isaac's pause of C2's two webinar campaigns on Nov 2 (C2's answer 73, in the copy of Barbara's data); Kogalla's
// product-feed case #230, planned on Nov 1 (the copy's cases); the answers of Nov 1 and Nov 3 (all tests). The plan of Oct
// 31: "Once a week, or when a setting changes."
LOGIC.flow({
  id: 'mkwhen', parent: 'market',
  title: 'When the Setup and market module reads again', short: 'When it reads',
  head: 'The module reads the account again when a person changes the account, when an alert names no campaign, when a change to the product feed is due its follow-up, or when its answer is {marketFresh} days old',
  chart: [
    'flowchart TB',
    'NEW["Code looks at what has come<br/>in since the module’s last<br/>real answer"]:::code',
    'TEST(["Or a person tests it, and<br/>no reason is needed"]):::will',
    'CHANGE{"Did a person change the<br/>account in a way that names<br/>no live campaign?"}:::code',
    'ALERT{"Did an alert come that<br/>names no live campaign?"}:::code',
    'FEED{"Is a follow-up due on a<br/>change to the product feed?"}:::code',
    'STALE{"Is the last real answer<br/>{marketFresh} days old, or is<br/>there none?"}:::code',
    'DUE(["The module reads the account<br/>today, for the first reason<br/>that fits"]):::opus',
    'NOT(["No reason to read today, so<br/>the last answer still counts"]):::code',
    'NEW --> CHANGE',
    'CHANGE -- yes --> DUE', 'CHANGE -- no --> ALERT',
    'ALERT -- yes --> DUE', 'ALERT -- no --> FEED',
    'FEED -- yes --> DUE', 'FEED -- no --> STALE',
    'STALE -- yes --> DUE', 'STALE -- no --> NOT',
    'TEST --> DUE'
  ],
  links: { NEW: 'mkwnew', TEST: 'mkwtest', CHANGE: 'mkwchange', ALERT: 'mkwalert', FEED: 'mkwfeed', STALE: 'mkwstale' },
  leaves: {
    mkwnew: 'Only what came in since the last real answer',
    mkwtest: 'Today only a person’s test runs it',
    mkwchange: 'A person changed the account',
    mkwalert: 'An alert that names no campaign',
    mkwfeed: 'A change to the product feed',
    mkwstale: '{marketFresh} days, counted by the calendar in New York'
  },

  // Each slide belongs to one view: the part's own slides first, then one or more for each rule.
  deck: [
    { about: ['mkwhen'], kicker: 'The idea',
      head: 'Four kinds of news make the module read the account again, because each one can mean that the account no longer runs as it did',
      visual: { type: 'gate', rows: [
        ['A person changed the account', 'A change by a teammate or the client that names no live campaign, such as a setting for the whole account.', 'pass'],
        ['An alert that names no campaign', 'Such as “Leads stopped”, which wakes Tracking too.', 'pass'],
        ['A follow-up is due on a change to the product feed', 'A change in Merchant Center comes up for its check.', 'pass'],
        ['The last real answer is {marketFresh} days old', 'Or there is no real answer at all, because a test’s answer does not count.', 'pass']],
        end: ['Code gives the first reason that fits', 'code'] },
      vcap: 'A change or an alert that names a live campaign wakes that campaign’s four modules instead. C2, Bull Legal and Kogalla have only test answers, so if nothing else came in, a live morning would read each of them for the last reason.' },
    { about: ['mkwhen'], kicker: 'The plan and the code',
      head: 'The plan of Oct 31 said once a week or when a setting changes, and the code adds alerts and the product feed',
      visual: { type: 'flow', rows: [
        { title: 'The plan of Oct 31', steps: [['Once a week, or when a setting changes', '', 'will']], end: [['Setup and market reads again', '', 'opus']] },
        { title: 'The code today', steps: [['A person’s change to the account, an alert that names no campaign, a feed follow-up, or {marketFresh} days', '', 'code']], end: [['Setup and market reads again', '', 'opus']] }] },
      vcap: 'Code has no list of settings. It counts any change by a person that names no live campaign as a change to the account, and the module answers at most once a morning, however many reasons fit.' },

    { about: ['mkwnew'], kicker: 'Only what is new',
      head: 'Only what came in since the module’s last real answer counts, and a test does not count as a real answer',
      visual: { type: 'flow', rows: [
        { title: 'Counts', steps: [['An answer from a real morning run', '', 'code']], end: [['Only news after it counts', '', 'keep']] },
        { title: 'Counts', steps: [['An answer from a person’s own session', 'with no run behind it', 'code']], end: [['Only news after it counts', '', 'keep']] },
        { title: 'Does not count', steps: [['An answer from a test or a dry run', 'nobody acted on it', 'code']], end: [['As if the module never answered', '', 'wait']] }] },
      vcap: 'Every Setup and market answer so far came from a test, so a live morning would treat C2, Bull Legal and Kogalla as never answered. Then everything new would count, and the module would read each account on its first live morning.' },

    { about: ['mkwtest'], kicker: 'Today',
      head: 'Today the module runs only when a person tests it, and a test changes nothing',
      visual: { type: 'flow', rows: [
        { title: 'In Barbara, under Validators and then Modules', steps: [['A person picks Setup and market and one client', '', 'will'], ['One Opus subagent reads the whole account', 'no other module runs first, because it needs none', 'opus']], end: [['One answer', 'it does not count as a real answer, so the module is still due', 'code']] },
        { title: 'Kogalla, Nov 1', steps: [['A test of Setup and market', '3:35 AM ET', 'will']], end: [['Kogalla’s answer', 'a problem', 'block']] }] },
      vcap: 'A test needs no reason. Its first lines tell Opus to change nothing, call no change tool and send nothing. Every answer of this module came from a test, because the morning module run is off in live.' },

    { about: ['mkwchange'], kicker: 'A person changed the account',
      head: 'A person’s change counts as a change to the account when it names no live campaign, so it can be a setting or a campaign that no longer spends',
      visual: { type: 'flow', rows: [
        { title: 'Wakes this module', steps: [['A teammate turns off Google’s tips on C2', 'a setting for the whole account', 'will']], end: [['Setup and market reads again', '', 'opus']] },
        { title: 'Wakes this module too', steps: [['Isaac pauses C2’s two webinar campaigns, Nov 2', 'neither had spent, so neither is live', 'will']], end: [['Setup and market reads again', '', 'opus']] },
        { title: 'Wakes the campaign’s modules instead', steps: [['A teammate sets a $7 click limit on LA + New York', 'a live campaign', 'will']], end: [['Its four campaign modules read again', '', 'opus']] }] },
      vcap: 'The first and third rows come from code’s own tests on C2, and the second is a real change. A live campaign is one that spent in the last {marketLive} days, or a paused one that an open plan would turn on. Code finds the campaign by looking for its name in the change.' },
    { about: ['mkwchange'], kicker: 'What wakes nothing',
      head: 'A change that Google or a platform makes by itself never wakes the module, though the module lists such changes for Opus',
      visual: { type: 'flow', rows: [
        { title: 'Counts as a person’s change', steps: [['A teammate, the client, or a login that nobody knows', '', 'will']], end: [['It can wake the module', '', 'keep']] },
        { title: 'Wakes nothing', steps: [['A tip that Google applied by itself, Meta’s own review of an ad, or Microsoft pausing a campaign for its budget', '', 'code']], end: [['It waits for the next read', 'at most {marketFresh} days later', 'wait']] }] },
      vcap: 'On Nov 1 and Nov 3 C2’s account still let Google apply 4 kinds of tips by itself, though none had changed anything since Oct 3. Had one changed a campaign, the module would see it at its next read, but the change itself would not cause that read.' },

    { about: ['mkwalert'], kicker: 'An alert',
      head: 'An alert that names no campaign wakes this module, and one about leads wakes Tracking too',
      visual: { type: 'flow', rows: [
        { title: 'Names no campaign', steps: [['“Chad Ads: Leads stopped”', '', 'block']], end: [['Tracking and Setup and market read again', '', 'opus']] },
        { title: 'Names a campaign', steps: [['“A landing page broke” on C2’s Brand campaign', '', 'block']], end: [['Brand’s four campaign modules read again', '', 'opus']] }] },
      vcap: 'Both rows come from code’s own tests on C2. An alert can be about spend, leads, a policy or the site, and code decides which campaign it names by looking for a live campaign’s name in its words.' },

    { about: ['mkwfeed'], kicker: 'The product feed',
      head: 'A follow-up on a change to the product feed wakes this module, because Merchant Center belongs to it',
      visual: { type: 'flow', rows: [
        { title: 'Kogalla’s case #230', steps: [['Show only the RA Light Kit in PMax’s Shopping ads', 'a change to the product feed, planned on Nov 1', 'code'], ['Once the change goes out, its follow-up day comes', '', 'code']], end: [['Setup and market reads Kogalla again', '', 'opus']] }] },
      vcap: 'Each kind of change sends its follow-up to the module whose question it answers. A change to tracking goes to Tracking, a budget or a bid to Bid and budget, and the product feed to this module. In the copy of Barbara’s data from Nov 3, three cases were changes to a product feed, two of them Kogalla’s.' },

    { about: ['mkwstale'], kicker: '{marketFresh} days',
      head: 'With no news at all, the module still reads each account every {marketFresh} days, counted by the calendar in New York',
      visual: { type: 'flow', rows: [
        { title: 'Bull Legal', steps: [['Its only answer is from the test of Nov 1', 'a test does not count', 'code'], ['No change to the account, no alert, and no feed follow-up', '', 'code']], end: [['So on its first live morning, the module reads Bull because it has no real answer', '', 'opus']] },
        { title: 'After a real answer', steps: [['A real answer on a Wednesday at 7:30 AM', '', 'code']], end: [['It reads again the next Wednesday morning', 'because {marketFresh} calendar days have passed in New York', 'opus']] }] },
      vcap: 'Counting calendar days means an answer never runs out in the middle of a morning. On a morning when code cannot read the news, the module reads the account only if its answer is {marketFresh} days old.' }
  ],

  examples: {
    NEW: { tag: 'made', rows: [{ steps: [['C2, on its first live morning', 'every answer so far came from a test', 'code']], end: [['Everything that came in counts as new', '', 'code']] }], note: 'We made this up from the real answers of C2, which all came from tests. No live morning has run the module yet.' },
    TEST: { tag: 'real', rows: [{ steps: [['Kogalla, Nov 1, 3:35 AM ET', 'a person tests the module', 'will'], ['One Opus subagent reads the whole account', 'no reason needed', 'opus']], end: [['Kogalla’s answer', 'a problem, with 4 fixes', 'block']] }], note: 'We took this from the answer that the Setup and market module wrote for Kogalla in a test on Nov 1. A test changes nothing, and its answer does not count as a real answer.' },
    CHANGE: { tag: 'made', rows: [{ steps: [['Isaac pauses C2’s two webinar campaigns', 'Nov 2', 'will'], ['Does it name a live campaign?', 'no, because neither had spent', 'code']], end: [['Yes, a person changed the account', '', 'code']] }], note: 'Isaac really paused the two campaigns on Nov 2, as C2’s answer of Nov 3 says, but no live morning has run this module yet.' },
    ALERT: { tag: 'made', rows: [{ steps: [['An alert says “Chad Ads: Leads stopped”', '', 'block'], ['Does it name a live campaign?', 'no', 'code']], end: [['So this module and Tracking both read the account again', '', 'opus']] }], note: 'No real alert has woken this module yet, so this example uses the alert from code’s own test on C2.' },
    FEED: { tag: 'made', rows: [{ steps: [['Kogalla’s case #230', 'show only the RA Light Kit, a change to the product feed', 'code'], ['The day for its follow-up check comes', '', 'code']], end: [['Yes, so this module reads Kogalla again', '', 'opus']] }], note: 'We made this up from Kogalla’s real case #230, whose change had not gone out by Nov 3.' },
    STALE: { tag: 'made', rows: [{ steps: [['Bull Legal', 'its only answer came from the test of Nov 1', 'code'], ['Is there a real answer from the last {marketFresh} days?', 'no', 'code']], end: [['Yes, so the module reads Bull', '', 'opus']] }], note: 'We made this up from Bull’s real answers, which all came from tests. No live morning has run the module yet.' },
    DUE: { tag: 'made', rows: [{ steps: [['C2, on the first morning after Isaac paused two campaigns', '', 'code'], ['Code picks the first reason that fits', 'a person changed the account', 'code']], end: [['One Opus subagent reads the whole account', 'beside Tracking and the client module', 'opus']] }], note: 'We made this up from C2’s real change of Nov 2. No live morning has run the module yet.' },
    NOT: { tag: 'made', rows: [{ steps: [['An answer from yesterday’s real run', '', 'code'], ['No change to the account, no alert and no feed follow-up', '', 'code']], end: [['No reason to read today, so that answer still counts', '', 'code']] }], note: 'We made this up from code’s own test of a quiet morning, because no live morning has run.' }
  },

  reviewed: { self: '69cea5d7', above: 'a09a8b52', on: '2026-11-08' }
});
