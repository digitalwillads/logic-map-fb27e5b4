// The tracking module, rebuilt on 2026-11-07 around one job. Will, Nov 7: "At the end of the day I think the main thing I
// want it to do is provide validation that the conversion tracking is working correctly"; and "build this as if we can
// always read the real leads and orders. If we don't have access now we will get it". So each platform's count is proved
// against the client's own record of what really happened, and a day that does not match is explained and rebuilt from
// the record. Earlier words that still hold: Nov 7, "I want it to check that it hasen't broken via code ever time it's
// called" and "IT would make sense to have this split by platform yes?"; Oct 30, "Just the new ones".
// Sources (comm-chat, read 2026-11-07): src/lead_match/read.rs:30-34 (the two lead apps), weeks.rs:16-52 (the weekly match),
// mod.rs:1-6 (a gap week is not trusted); src/modules/mod.rs:119-138 (Tracking's words, who needs it), day.rs:108-156 (today's
// due day); src/modules/finish.rs:1-3 and :40-55 (Decide's proposals become the run's cases); the memory note of the Nov 4 dry
// run (380M against 192M tokens). Barbara, read 2026-11-07: client_leads weeks of C2 (13) and Bull Legal (2), C2's trust
// calendar (Meta), KDX's Tracking brief, the cases #58 and #260; Tracking's answers of Nov 1. The old parts:
// retired/2026-11-07-tracking-redo/.
// Will, 2026-11-08, asked "Should Opus's tracking fix wait for a person's yes?": "No, Opus makes the fix itself, and code
// checks it." So the fix no longer goes on a case. A fix that needs access we do not have still goes to a person (his rule
// of 2026-11-03: a person only for missing access, a client action, or money). C2's answer 11 of Nov 1 (Barbara, read
// 2026-11-08): case #58 publishes the staged Tag Manager version and waits on Will; case #57 is the Data Manager sign-in.
LOGIC.flow({
  id: 'tracking',
  title: 'The tracking module', short: 'Tracking module', status: 'Partly built; the rest is not built yet',
  head: 'Tracking works when each platform’s count matches what really happened',
  chart: [
    'flowchart TB',
    'CALL(["Every morning, and on every call:<br/>Google, Meta and Microsoft,<br/>each one on its own"]):::next',
    'COUNT["What the platform counted:<br/>its conversions by day and by<br/>campaign, and which actions count"]:::code',
    'TRUTH["What really happened: the<br/>client’s own leads and sales,<br/>each with its ad click"]:::next',
    'SEND["The record sends each real lead<br/>and sale to its platform, so each<br/>conversion is one we know"]:::next',
    'MATCH{"Do they match, in<br/>count and in value?"}:::next',
    'WORKS(["Tracking works, and the<br/>numbers are safe to use"]):::keep',
    'WHY["Find out why it broke"]:::next',
    'REBUILD["Rebuild the true numbers<br/>from the client’s record"]:::next',
    'FIX(["Opus makes the fix itself,<br/>and code checks that the<br/>counts match again"]):::next',
    'HAND(["Hand on one answer for each<br/>platform: which days to trust,<br/>and the true numbers"]):::next',
    'CALL --> COUNT', 'CALL --> TRUTH',
    'COUNT --> MATCH', 'TRUTH --> MATCH', 'TRUTH --> SEND', 'SEND --> MATCH',
    'MATCH -- yes --> WORKS', 'MATCH -- no --> WHY',
    'WHY --> REBUILD', 'WHY --> FIX',
    'WORKS --> HAND', 'REBUILD --> HAND'
  ],
  links: { CALL: 'tcall', COUNT: 'tcount', TRUTH: 'ttruth', SEND: 'tsend', MATCH: 'tmatch', WHY: 'twhy', REBUILD: 'trebuild', HAND: 'thand' },
  leaves: { tcall: 'Every morning, each platform on its own' },

  // Each slide belongs to one view: the module's own slides first, then the slides of its rule.
  deck: [
    { about: ['tracking'], kicker: 'The idea',
      head: 'A platform’s count is only its own claim, so Tracking holds it up against what really happened',
      visual: { type: 'flow', rows: [
        { title: 'C2’s Google, the week of Oct 19', steps: [['Google counted 3 leads', '', 'code'], ['The lead app took 3 real leads from Google clicks', '', 'keep']], end: [['They match, so Google’s count is true', '', 'keep']] },
        { title: 'C2’s Meta, Oct 26 to Nov 1', steps: [['Meta’s tag counted 7 leads', 'from every visitor to the site', 'code'], ['The lead app took 4 leads in all', 'from every source', 'block']], end: [['They do not match: Meta’s tag counts some leads twice', '', 'block']] }] },
      vcap: 'Each platform grades its own work, so its count proves nothing by itself. The client’s own record of leads and sales holds what really happened, so that record is the proof.',
      quote: ['At the end of the day I think the main thing I want it to do is provide validation that the conversion tracking is working correctly.', 'Nov 7'] },
    { about: ['tracking'], kicker: 'Why it comes first',
      head: 'Every module after Tracking judges on the count, so a wrong count misleads all of them',
      visual: { type: 'flow', rows: [
        { title: 'C2’s Meta', steps: [['Two tags send each lead twice', 'since May 20', 'block'], ['Tracking says Meta’s count cannot be trusted', 'Nov 1', 'opus']], end: [['Results judges Meta on clicks, landing page views and GA4’s leads instead', '', 'keep']] },
        { title: 'C2’s Google', steps: [['Each Google lead matches a lead in the lead app', 'from Oct 1', 'code'], ['Tracking says Google’s count is true from Oct 1', 'Nov 1', 'opus']], end: [['Results does not judge on September’s 4.5 conversions', '', 'keep']] }] },
      vcap: 'These are C2’s module tests of Nov 1. Each campaign answer names Tracking’s answer as its source, so a count that nobody had checked would have misled every one of them.' },
    { about: ['tracking'], kicker: 'Status · Nov 8',
      head: 'Today the match runs for two clients on Google, and most of this design is not built yet',
      visual: { type: 'timeline', items: [
        ['Oct 30', 'Will asks for the lead match, so each morning Barbara reads C2’s and Bull Legal’s lead apps and sets each week’s real leads beside Google’s count.'],
        ['Nov 1', 'The first module tests: Tracking answers for Bull Legal, Kogalla and C2.'],
        ['Nov 4', 'The module run joins the daily run, first as a dry run on a copy.'],
        ['Nov 7', 'The module run is merged, but it stays off in live until Will tests it and says yes to its cost.'],
        ['Nov 7, on this map', 'Will asks for this design: the client’s own record proves each platform’s count, and the true numbers are rebuilt from it.'],
        ['Nov 7, later', 'Will asks if the orders and leads can be matched to the conversions, and says he can make sure we have the data. So in the plan the record sends each one, and the match can be one to one.'],
        ['Nov 8', 'Will asks what happens when a new client’s tracking is broken. So in the plan, code checks the record before the first send, and Opus works on each fix.'],
        ['Nov 8, later', 'Will says that Opus makes each tracking fix itself, with no person’s yes. Code checks it the morning after, and Opus undoes a fix that breaks the count.'],
        ['Nov 8, afternoon', 'Will picks that our code sends every lead and sale, with a marked exception where it cannot. While a platform is rebuilt, a run may raise spend there only where the bids do not follow its count.']] },
      vcap: 'What works today is the weekly match on Google for two clients, code’s five warning signs, the platform checks, and Opus’s answer as a module test. Six things are not built yet: each platform on its own, the Meta and Microsoft clicks in the record, the store’s orders, the sending of each lead and sale from the record, the rebuild, and Opus making each fix itself.' },

    { about: ['tcall'], kicker: 'Every call',
      head: 'Code checks each platform every time the module is called, and that check costs no tokens',
      visual: { type: 'flow', rows: [
        { title: 'Bull Legal’s Google', steps: [['Code sets the count beside the lead app', 'the newest settled weeks match', 'code']], end: [['Tracking works, so Opus does not start', '', 'keep']] },
        { title: 'C2’s Meta', steps: [['Code sets the count beside the lead app', 'Meta’s tag counts more leads than came in', 'block'], ['An answer already explains it', 'Nov 1', 'code']], end: [['Nothing new, so Opus does not start', '', 'code']] },
        { title: 'KDX’s Google', steps: [['Code finds a warning sign', 'two actions changed how they count on Oct 28', 'block'], ['No answer explains it yet', '', 'code']], end: [['Opus starts, for KDX’s Google alone', '', 'opus']] }] },
      vcap: 'None of this is built yet. Today Tracking runs only when it is due, such as when its last answer turns {freshDays} days old. Each row is a real finding of Nov 1 to Nov 7, and only KDX needs Opus, because no answer explains its break yet.',
      quote: ["I want it to check that it hasen't broken via code ever time it's called", 'Nov 7'] },
    { about: ['tcall'], kicker: 'Each platform on its own',
      head: 'Each platform gets its own answer, so a break on Meta never holds up Google',
      visual: { type: 'flow', rows: [
        { title: 'C2’s Google', steps: [['It matches the lead app in every settled week from Oct 5', '', 'code']], end: [['Trusted from Oct 1', '', 'keep']] },
        { title: 'C2’s Meta', steps: [['Its tag counts more leads than came in', 'two Meta Lead tags on each form since May 20', 'block']], end: [['Not trusted until its fix goes out', 'today the fix waits on case #58', 'block']] }] },
      vcap: 'Today one Opus subagent answers for the whole account, so C2’s answer of Nov 1 had to cover both platforms at once. Split by platform, Google’s answer stands on its own while Meta waits for its fix.',
      quote: ['IT would make sense to have this split by platform yes?', 'Nov 7'] },
    { about: ['tcall'], kicker: 'Today',
      head: 'Today Tracking runs only as a test, because a module run reads about twice the tokens of a full run',
      visual: { type: 'bars', max: 380, rows: [
        { label: 'C2’s full run, Nov 4', parts: [[192, 'code', '192M tokens']] },
        { label: 'The module dry run, Nov 4, on a copy', parts: [[380, 'opus', '380M tokens']] }] },
      vcap: 'Since the merge of Nov 7, the morning module run stays off in live until Will says yes to its cost. Until then he can still test one module on one client, with Run under Validators and then Modules.',
      stats: [['About 2x', 'the tokens of a module run against a full run', 'real']] }
  ],

  examples: {
    CALL: { tag: 'plan', rows: [{ steps: [['A morning at C2', '', 'code'], ['Code checks Google, then Meta', 'each one on its own', 'next']], end: [['Two answers, one for each platform', '', 'next']] }], note: 'Today one Opus subagent answers for the whole account when Tracking is due, and the morning module run is off in live.' },
    COUNT: { tag: 'real', rows: [{ steps: [['C2’s Google, the week of Oct 19', 'its main action, the lead form', 'code']], end: [['Google counted 3 leads', 'each on the day it came in', 'code']] }], note: 'Barbara’s weekly lead counts for C2, read on Nov 7.' },
    TRUTH: { tag: 'plan', rows: [{ steps: [['C2’s lead app took 10 leads', 'the week of Oct 19', 'code'], ['4 came from a Google click, and the client marked 1 of those bad', '', 'code']], end: [['3 real Google leads', '', 'keep']] }], note: 'The numbers are real, from Barbara’s weekly lead counts for C2, read on Nov 7. The lead app keeps only Google’s click, so today this record proves Google’s count but not Meta’s.' },
    SEND: { tag: 'real', rows: [{ steps: [['A Summerset lead in ActiveCampaign', '', 'code'], ['Our worker sends it to Google', 'with its gclid and its own id', 'code']], end: [['Google’s count is leads we know, one by one', '', 'keep']] }], note: 'Summerset’s conversion worker, read on Nov 7. Only Summerset’s Google works this way today, and nothing reads ActiveCampaign back to compare yet.' },
    MATCH: { tag: 'plan', rows: [{ steps: [['Google counted 3', '', 'code'], ['The lead app has 3 real leads', '', 'keep']], end: [['They match', 'C2, the week of Oct 19', 'keep']] }], note: 'Today the match judges only Google, a whole week at a time. In Barbara’s weekly lead counts for C2, read on Nov 7, the weeks of Oct 5, Oct 12 and Oct 19 match.' },
    WORKS: { tag: 'real', rows: [{ steps: [['C2’s Google matches the lead app', 'in every settled week from Oct 5', 'keep']], end: [['Its count is safe to use from Oct 1', '', 'keep']] }], note: 'Barbara’s weekly lead counts for C2, read on Nov 7, and C2’s Tracking answer of Nov 1.' },
    WHY: { tag: 'plan', rows: [{ steps: [['Meta’s tag counted 7 leads, but 4 came in', 'Oct 26 to Nov 1', 'block'], ['Two Meta Lead tags fire on each form', 'since May 20', 'opus']], end: [['Meta counts each contact-form lead twice', '', 'block']] }], note: 'Nothing starts on a gap today. The finding is real, from C2’s trust calendar, read on Nov 7, and C2’s Tracking answer of Nov 1, a module test.' },
    REBUILD: { tag: 'plan', rows: [{ steps: [['Bull’s Google, the week of Oct 5', 'Google counted 1, and the record holds 2 real leads', 'block'], ['The record’s count takes the place of Google’s', '', 'next']], end: [['Bull’s true count that week is 2', 'and both numbers are kept', 'next']] }], note: 'The week is real. Barbara’s weekly lead counts for Bull Legal hold 3 sends, and Bull’s answer of Nov 1 found that one of them was the same person again.' },
    FIX: { tag: 'plan', rows: [{ steps: [['C2’s Meta counts each lead twice', 'two Meta Lead tags on each form', 'block'], ['Opus publishes the staged Tag Manager version itself', 'with no person’s yes', 'next']], end: [['Code checks that Meta’s count matches the record again', '', 'next']] }], note: 'The fix is real, from C2’s Tracking answer of Nov 1. Today it waits on Will on case #58, because each fix of a module run goes on a case for a person.' },
    HAND: { tag: 'plan', rows: [{ steps: [['C2, a morning', '', 'next']], end: [['Google is trusted from Oct 1', '', 'keep'], ['Meta is rebuilt from the record each day', 'until its fix goes out', 'next']] }], note: 'Today one answer covers the whole account, and nothing rebuilds a number.' }
  },

  reviewed: { self: 'e037db1e', on: '2026-11-08' }
});
