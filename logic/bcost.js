// What each lead or sale really cost: comm-chat src/modules/brief/numbers.rs:283-303 (`periods`: a stretch per change of
// bid or bid strategy, and on Meta of budget), :313-343 (`period_lines`: from the next full day on the account's clock to the
// day before the next change or the last settled day; then the 30 days before), :345-357 (`period_cut`), :254-263 (`weeks`,
// each marked as the account scorecard marks it), :270-281 (`change_lines`: 44 days, at most 8 shown), :398-403 (the bids
// branch); src/results/compute.rs:468-489 (`counted` and `sum`: a day counts when it was read whole and is not broken) and
// src/results/load.rs:533 (the slot for broken days is never filled), so today every day read whole counts;
// src/scorecard/compute.rs:280-302 (a week is trusted when code's five warning signs find none). In the plan each day carries
// Tracking's true numbers (Will, Nov 7; the rebuild: HANDOFF-tracking-redo.md); not built. Real cases, read 2026-11-07: the
// facts that code gathered for Bull's Hedge Funds & PE and Securities campaigns and Kogalla's PMax; C2's answer 53 (it read
// the lead app itself); Kogalla's Tracking answer of Nov 1 as its line shows it; C2's $7 ceiling of Oct 30 (numbers.rs:812-839,
// the fix of Nov 4). Old part: retired/2026-11-07-bids-redo/bidbrief.js (the periods and the weeks).
LOGIC.flow({
  id: 'bcost', parent: 'bids', status: 'Partly built; the true numbers are not built yet',
  title: 'What each lead or sale really cost', short: 'What it really cost',
  head: 'The cost is read again from each change of bid or bid strategy, so each stretch shows what that setting did',
  chart: [
    'flowchart TB',
    'DAYS["The campaign’s stored days:<br/>spend, clicks and the<br/>main conversion"]:::code',
    'TRUST{"Does Tracking trust<br/>that day’s count?"}:::next',
    'AS(["The platform’s<br/>count stands"]):::next',
    'REBUILT(["The true count takes its place,<br/>rebuilt from the client’s own<br/>leads and orders"]):::next',
    'CUTS["A new stretch starts after each<br/>change of bid or bid strategy,<br/>and on Meta of budget"]:::code',
    'STRETCH["The real cost of each stretch:<br/>what it spent, what it got,<br/>and the cost of each one"]:::code',
    'WEEKS["The newest {bidWeeks} weeks beside it,<br/>each marked when code’s<br/>warning signs flag it"]:::code',
    'DAYS -- "today, every day<br/>read whole" --> CUTS',
    'DAYS -. "in the plan" .-> TRUST',
    'TRUST -- yes --> AS', 'TRUST -- no --> REBUILT',
    'AS --> CUTS', 'REBUILT --> CUTS',
    'CUTS --> STRETCH', 'STRETCH --> WEEKS'
  ],
  links: { DAYS: 'bctoday', TRUST: 'bctrue', AS: 'bctrue', REBUILT: 'bctrue', CUTS: 'bcstretch', STRETCH: 'bcstretch', WEEKS: 'bcweeks' },
  leaves: {
    bctoday: 'What it adds up today',
    bctrue: 'The true numbers',
    bcstretch: 'Each stretch on its own',
    bcweeks: 'The newest weeks'
  },

  // Each slide belongs to one view: the part's own slides first, then one or more for each rule.
  deck: [
    { about: ['bcost'], kicker: 'The idea',
      head: 'A cost means something only beside the setting that made it, so the cost starts again at each change',
      visual: { type: 'flow', rows: [
        { title: 'Kogalla’s PMax, as code showed it to Opus on Nov 7', steps: [['The 30 days before, Sep 25 to Oct 24', 'a 125% return on $1,018.48', 'code'], ['On Oct 25 Igor removes its 300% target', 'to push it harder', 'will']], end: [['Oct 26 to Oct 31, after the change', 'a 116% return on $186.16', 'block']] }] },
      vcap: 'Igor took off PMax’s return target on purpose, to push it harder. The stretch after his change stands on its own, so Opus can see what that one change did, and its first six days returned less than the 30 before.' },

    { about: ['bctoday'], kicker: 'Today',
      head: 'Today every day read whole counts, even a day that does not match the client’s own record',
      visual: { type: 'flow', rows: [
        { title: 'Bull’s Securities campaign, as code showed it to Opus on Nov 7', steps: [['The week of Oct 5 is marked not trusted', 'Google counted 1 lead for the whole account, where 3 came in with a Google click', 'block'], ['The stretch of Sep 13 to Oct 12 still adds its days', '$1,126.07 spent, and 1 lead', 'code']], end: [['Only the mark on the week warns Opus', '', 'block']] }] },
      vcap: 'Code leaves out only a day it did not read whole, because nothing ever passes it the days marked broken. So a week that does not match still counts in the cost of its stretch.' },
    { about: ['bctoday'], kicker: 'Opus checks it itself',
      head: 'Because the numbers are the platform’s own, Opus checks them against the client’s record itself',
      visual: { type: 'flow', rows: [
        { title: 'C2’s Competitor campaign, answer 53', steps: [['Google counted no conversion', 'on 33 clicks', 'code'], ['Opus read the lead app', '25 leads since Oct 6, and 13 came with a Google click', 'opus']], end: [['None of the 13 came from this campaign', 'so its zero is true', 'keep']] }] },
      vcap: 'This took Opus extra reads on every answer that needs it. In the plan Tracking sets each platform’s count beside the client’s record once, for every module.' },

    { about: ['bctrue'], kicker: 'The plan',
      head: 'In the plan each day carries Tracking’s true numbers, so the cost of a stretch is what really happened',
      visual: { type: 'flow', rows: [
        { title: 'Bull’s Google, the week of Oct 5', steps: [['Google counted 1 lead', '', 'block'], ['The record holds 2 real leads', 'one person sent the form twice', 'keep']], end: [['The stretch adds the true 2', 'campaign by campaign, from each lead’s click', 'next']] }] },
      vcap: 'This is not built yet. Tracking would rebuild a day that does not match from the client’s own leads and orders, and keep the platform’s number beside it, so Bid and budget judges on the true count while Will can still see what the platform claimed.' },
    { about: ['bctrue'], kicker: 'A store',
      head: 'For a store the true numbers come from its own orders, so no answer has to guess what the tags missed',
      visual: { type: 'flow', rows: [
        { title: 'Kogalla’s PMax, Nov 1', steps: [['Tracking reads that the browser tags see about 4 of every 5 orders', 'that Shopify’s server reports', 'opus'], ['The return on Google’s own count', '124% in the 30 days to Oct 24', 'block']], end: [['The answer had to allow for the missed orders itself', '', 'wait']] },
        { title: 'The plan', steps: [['Each day’s sales come from the store’s own orders', '', 'next']], end: [['The return of each stretch is the true one', '', 'next']] }] },
      vcap: 'Kogalla’s answer named the gap among what would prove it wrong, if Google missed far more PMax orders than the 1 in 5 that Tracking reads. With the store’s orders in the numbers, that guess goes away.' },

    { about: ['bcstretch'], kicker: 'Each stretch on its own',
      head: 'Each stretch shows what one setting did, and on Bull’s Hedge Funds and PE campaign none of the three brought a lead',
      visual: { type: 'bars', max: 1000, rows: [
        { label: 'Sep 5 to Oct 4, the 30 days before', parts: [[911.16, 'code', '$911.16, no lead']] },
        { label: 'Oct 6 to Oct 12, after a $20 click ceiling', parts: [[353.23, 'code', '$353.23, no lead']] },
        { label: 'Oct 14 to Oct 31, after a $15 bid set by hand', parts: [[766.12, 'block', '$766.12, no lead']] }] },
      vcap: 'A stretch starts on the day after a change, because the day of the change mixes before and after. The stretches read back {bidPeriod} days, and the newest ends on the last settled day.' },
    { about: ['bcstretch'], kicker: 'A real fix · C2, Nov 4',
      head: 'C2’s $7 ceiling of Oct 30 showed why the day of a change belongs to neither side',
      visual: { type: 'timeline', items: [
        ['Oct 30, 2:50 PM Pacific', 'Isaac sets a $7 click ceiling on LA + New York, after $130.72 of that day’s spend.'],
        ['Nov 4, before the fix', 'The stretch after the ceiling ran from Oct 30 to Nov 3 and held $669.02, with all of Oct 30 and a Nov 3 that still moved at Google.'],
        ['Now', 'The stretch after starts on Oct 31, the next full day on the account’s clock, and it ends on the last settled day.'],
        ['The 30 days before', 'They run from Sep 30 to Oct 29, so they end the day before the change.']] },
      vcap: 'On Google a budget change starts no new stretch. On Meta it does, because the budget is the lever there.' },

    { about: ['bcweeks'], kicker: 'The newest weeks',
      head: 'Beside the stretches, Opus sees the newest {bidWeeks} weeks, and a week that code flags is marked',
      visual: { type: 'bars', max: 400, rows: [
        { label: 'The week of Nov 2, so far', parts: [[276.19, 'wait', '$276.19']] },
        { label: 'Oct 26, still settling', parts: [[310.11, 'wait', '$310.11']] },
        { label: 'Oct 19', parts: [[264.36, 'code', '$264.36']] },
        { label: 'Oct 12', parts: [[359.09, 'code', '$359.09']] },
        { label: 'Oct 5, not trusted', parts: [[320.80, 'block', '$320.80']] },
        { label: 'Sep 28', parts: [[177.64, 'code', '$177.64']] },
        { label: 'Sep 21', parts: [[149.95, 'code', '$149.95']] },
        { label: 'Sep 14', parts: [[261.14, 'code', '$261.14']] }] },
      vcap: 'These are the weekly spends of Bull’s Hedge Funds and PE campaign on Nov 7, and none of the eight weeks brought a lead. Below the weeks come its changes of the last {bidChanges} days, at most {bidShown} of them, so Bull’s list ends with “And 16 older changes.”' }
  ],

  examples: {
    DAYS: { tag: 'real', rows: [{ steps: [['Bull’s Securities campaign', 'its stored days, Sep 13 to Oct 12', 'code']], end: [['$1,126.07 spent, and 1 lead', 'the week of Oct 5 included', 'code']] }], note: 'The facts that code gathered for that campaign on Nov 7.' },
    TRUST: { tag: 'plan', rows: [{ steps: [['Bull’s Google, Oct 5 to 11', 'Google counted 1, and the record holds 2', 'block'], ['Does Tracking trust the count?', 'no', 'next']], end: [['The true count takes its place', '', 'next']] }], note: 'The week is real, from Barbara’s weekly lead counts for Bull and Bull’s Tracking answer of Nov 1. Nothing rebuilds a day yet.' },
    AS: { tag: 'plan', rows: [{ steps: [['C2’s Google, the week of Oct 19', 'Google counted 3, and the lead app has 3 real leads', 'keep']], end: [['Google’s count stands', '', 'next']] }], note: 'The week is real, from Barbara’s weekly lead counts for C2. Today no day carries Tracking’s word, so every day counts as it is.' },
    REBUILT: { tag: 'plan', rows: [{ steps: [['Bull’s Google, the week of Oct 5', '', 'next']], end: [['The record’s 2 real leads take the place of Google’s 1', '', 'next']] }], note: 'Bull’s Tracking answer of Nov 1 found that one of the 3 sends was the same person again, so the true count is 2.' },
    CUTS: { tag: 'real', rows: [{ steps: [['Bull’s Hedge Funds and PE campaign', 'a $20 click ceiling on Oct 5, and a $15 bid on Oct 13', 'code']], end: [['Two stretches after the changes', 'and the 30 days before', 'code']] }], note: 'The facts that code gathered for that campaign on Nov 7.' },
    STRETCH: { tag: 'real', rows: [{ steps: [['Oct 14 to Oct 31', 'after the $15 bid', 'code']], end: [['$766.12 spent, 52 clicks at $14.73', 'and no lead', 'block']] }], note: 'Bull’s Hedge Funds and PE campaign, from the facts that code gathered on Nov 7.' },
    WEEKS: { tag: 'real', rows: [{ steps: [['Bull’s Hedge Funds and PE campaign', 'its newest {bidWeeks} weeks', 'code']], end: [['The week of Oct 5 is marked not trusted', 'and none of the eight brought a lead', 'block']] }], note: 'The facts that code gathered for that campaign on Nov 7.' }
  },

  reviewed: { self: '30456f83', above: 'a030a55d', on: '2026-11-08' }
});
