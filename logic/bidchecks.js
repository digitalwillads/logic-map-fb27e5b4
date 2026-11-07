// The checks it answers: the verifiers' `verify module bids` (cli/src/verify_cmd/module.rs) runs the audit and the daily
// check (verify/src/modules.rs:76) and keeps the goals of the areas bidding and budgets (modules.rs:95, coverage_areas.rs).
// A goal sorted limit, tool or delete is in no module (modules.rs:34-36). The answer is held to the run (comm-chat
// src/modules/run.rs). Sources for each box: HANDOFF-bids-client.md.
LOGIC.flow({
  id: 'bidchecks', parent: 'bids',
  title: 'The checks it answers', short: 'Its checks',
  head: 'Eight goals of Will\'s trees judge bids and budgets, and only on Google',
  chart: [
    'flowchart TB',
    'CMD["The bids check runs on<br/>this campaign\'s data of today"]:::will',
    'P{"A Google<br/>campaign?"}:::code',
    'NONE(["No goal judges it:<br/>no check can call it clean"]):::will',
    'AUDIT["The audit: 7 goals<br/>of bids and budgets"]:::will',
    'DAILY["The daily check: no search<br/>costs far more per click<br/>than its campaign\'s norm"]:::will',
    'OUT["Left out: limits, such as<br/>“Every bid strategy fits<br/>the client’s targets”"]:::code',
    'LINES["Each FAIL, could-not-check<br/>and to-decide line, with its id"]:::will',
    'PUSH["act cases push sends<br/>the run to Barbara"]:::code',
    'TO(["Opus answers each FAIL<br/>in its checks"]):::opus',
    'SAME["Not built: the brief\'s failed<br/>checks from the same push"]:::next',
    'CMD --> P', 'P -- no --> NONE', 'P -- yes --> AUDIT', 'P -- yes --> DAILY',
    'AUDIT --> LINES', 'DAILY --> LINES',
    'OUT -. "never in<br/>this module" .-> LINES',
    'LINES --> PUSH', 'PUSH --> TO', 'SAME -.-> TO'
  ],
  links: { CMD: 'bidcampaign', NONE: 'bidmeta', AUDIT: 'bidaudit', DAILY: 'bidcpc', OUT: 'bidlimit', SAME: 'bidsamepush' },
  leaves: {
    bidcampaign: "One campaign's results",
    bidmeta: 'Meta and Microsoft',
    bidaudit: "The audit's seven goals",
    bidcpc: 'The click-price goal',
    bidlimit: { title: 'The limit goals', open: {
      q: '“Every bid strategy fits the client’s targets” is a limit, so neither the bids brief nor the bids run shows its FAIL. Should Bid and budget answer it?',
      since: 'Nov 7',
      opts: [
        ['Yes: show the limit goals of bidding and budgets in the bids run and the brief, and answer each FAIL like the others', true, 'The bid limits are this module\'s own question. C2\'s Competitor gap reached its answer only because Opus read the clicks itself.'],
        ['No: limits stay in the change check and the daily check', false, 'As today. A change still cannot pass a limit, but no morning answer weighs a live bid that breaks one.'],
        ['Move the click ceiling into its own alarm goal of the bidding area', false, 'The module then sees the ceiling, and the target part stays a limit.']] } },
    bidsamepush: 'One push for both'
  },

  // Each slide belongs to one view: the part's own slides first, then one or more for each rule.
  deck: [
    { about: ['bidchecks'], kicker: 'Where they come from',
      head: 'Each goal of the areas bidding and budgets goes to Bid and budget, unless it is a limit',
      visual: { type: 'dots', groups: [[7, 'opus', 'goals of the audit'], [1, 'route', 'goal of the daily check'], [3, 'next', 'limits left out: one each on Google, Meta and Microsoft']] },
      vcap: 'The verifiers\' own test counts exactly 8 goals for this module, and checks that its runs judge every one of them.' },
    { about: ['bidchecks'], kicker: 'The real runs · Nov 1',
      head: 'The first bids runs found 5 FAILs, all on the audit\'s goals',
      visual: { type: 'bars', max: 8, rows: [
        { label: 'Kogalla, the account', parts: [[2, 'block', '2 failed'], [1, 'wait', '1 not checked'], [5, 'keep', '5 passed']] },
        { label: 'Bull, the account', parts: [[2, 'block', '2 failed'], [1, 'wait', '1 not checked'], [5, 'keep', '5 passed']] },
        { label: 'C2, the account', parts: [[1, 'block', '1 failed'], [1, 'wait', '1 not checked'], [6, 'keep', '6 passed']] }] },
      vcap: 'Not checked: Kogalla and C2 have no monthly cap, and Bull has no brand clicks to compare. The brand FAILs said "Maximize clicks, not Target Impression Share"; Will changed that rule the next day.',
      quote: ['lets change the rule and remove the rule on the brand campaign that says it needs to be impression share based bidding', 'Nov 2'] },

    { about: ['bidcampaign'], kicker: 'One campaign',
      head: 'The check shows one campaign\'s own results, beside the account\'s results that name no campaign',
      visual: { type: 'flow', rows: [
        { title: 'Bull, Nov 1, before', steps: [['Each campaign\'s bids run', 'with no campaign named', 'code'], ['The account\'s FAILs', 'which sat on Startups', 'block']], end: [['Each campaign got the FAILs of Startups', '', 'block']] },
        { title: 'Now', steps: [['The bids run with the campaign\'s id', '', 'will'], ['Its own results', 'and the problems kept apart on it', 'will']], end: [['Startups: 2 failed', '15 conversions; a $150 bid target against $300', 'block']] }] },
      vcap: 'A Meta or Microsoft campaign names its platform, so only that platform\'s checks run. A result that sits only on paused campaigns is left out, with one line that says so.' },
    { about: ['bidmeta'], kicker: 'Meta and Microsoft',
      head: 'No goal of Will\'s trees judges the bids of a Meta or Microsoft campaign',
      visual: { type: 'flow', rows: [
        { title: 'C2\'s Meta campaign, Nov 3', steps: [['The bids check', 'on the Meta campaign', 'will'], ['No goal of Meta', 'in this module', 'next']], end: [['Could not check: judge it from its numbers and reads, and say no check stands behind that', '', 'wait']] }] },
      vcap: 'The Meta goal “Budgets are present and add up” and Microsoft’s budget goal are limits, so they stay out. On Nov 1 the same Meta campaign\'s check had shown Google\'s brand FAIL.' },
    { about: ['bidaudit'], kicker: 'The audit\'s seven goals',
      head: 'The audit judges where the money goes, and whether each strategy has what it needs',
      visual: { type: 'gate', rows: [
        ['Good campaigns held back by budget are found', 'at or under target, and losing {bidLimited}% or more to budget', 'pass'],
        ['Spend on campaigns over target is sized', '{bidOver}% or more over target for {bidOverDays} trusted days, in dollars a month', 'pass'],
        ['Each bid strategy has enough data to work', 'fewer than {bidSmart} conversions in 30 days fails; a value strategy needs {bidValue}', 'pass'],
        ['Targets are realistic against the real results', 'a target under {bidStarve}% or over {bidLoose}% of the 30-day result', 'pass'],
        ['Spend paces to the monthly cap', 'off pace by more than {bidPace}%', 'pass'],
        ['Brand clicks are not overpaid', 'a brand click at {bidBrandCpc}% or more of the non-brand click', 'pass'],
        ['Bids and budgets are not changed too often', 'more than {bidChurn} changes in {bidChurnDays} days on one smart bidding campaign', 'pass']] },
      vcap: 'Every check of these goals is code. None asks a model, so a bids run holds no QUESTION line.' },
    { about: ['bidcpc'], kicker: 'The click-price goal',
      head: 'One search can cost far more than its campaign\'s norm, and only this goal sees it',
      visual: { type: 'bars', max: 220, rows: [
        { label: 'Welch Vacuum: the 90-day norm', parts: [[10.21, 'code', '$10.21 a click']] },
        { label: '"anderson negele", Oct 11', parts: [[218.89, 'block', '$218.89 a click, 21 times the norm']] }] },
      vcap: 'A search that cost ${bidCpcMin} or more, at {bidCpcTimes} times the norm or more, with no conversion, fails. A campaign under {bidCpcClicks} clicks has no norm. Nothing flagged Welch\'s search before this goal.' },
    { about: ['bidlimit'], kicker: 'The limit goals',
      head: 'The goal that checks bids against the targets is a limit, so Bid and budget never sees it',
      visual: { type: 'flow', rows: [
        { title: 'C2 Competitor, Nov 1', steps: [['Maximize clicks, no click ceiling', '', 'code'], ['The bids run', '0 failed', 'keep'], ['Answer 53', '6 clicks over $10, the top one $19.46', 'opus']], end: [['A new check: no ceiling fails', 'inside a limit goal', 'will']] },
        { title: 'Today', steps: [['The daily check fails it', '', 'will'], ['The bids brief and the bids run', 'leave every limit out', 'code']], end: [['The bids answer never sees it', '', 'block']] }] },
      vcap: 'The tree sorts this goal a limit: a bid past the client\'s own target breaks a money rule. A limit runs in the change check, and Barbara\'s exam shows it in its own block.',
      open: 'bidlimit' },
    { about: ['bidsamepush'], kicker: 'Not built',
      head: 'The brief\'s failed checks and the run\'s lines still come from two places',
      visual: { type: 'flow', rows: [
        { title: 'Today', steps: [['The brief', 'the newest stored result of each goal, up to {bidChecksDays} days old', 'code'], ['The run', 'today\'s lines, with ids', 'will']], end: [['Opus answers both', 'one in words, one by id', 'opus']] },
        { title: 'The design', steps: [['One push', '', 'next']], end: [['The brief\'s failed checks come from the run itself', '', 'next']] }] },
      vcap: 'Bull\'s brief of Nov 7 listed the account\'s FAILs of Nov 2. The design of the verifiers\' move to Barbara asks for one push.' }
  ],

  examples: {
    CMD: { tag: 'real', rows: [{ steps: [['Bull Startups', 'Nov 1, 3:59 AM', 'code'], ['The bids check', 'with the campaign\'s id', 'will']], end: [['2 failed, 0 could not check', '', 'block']] }], note: 'Bull, Nov 1: the verifiers\' run 2026-11-01T085955-bull-law.' },
    P: { tag: 'real', rows: [{ steps: [['C2\'s Meta campaign', 'Nov 3', 'code'], ['A Google campaign?', 'no', 'code']], end: [['No goal judges it', '', 'next']] }], note: 'C2, Nov 3: the verifiers\' run 2026-11-03T052051-c2-management.' },
    NONE: 'P',
    AUDIT: { tag: 'real', rows: [{ steps: [['Kogalla', 'Nov 1', 'code'], ['The audit\'s goals', 'on the saved input of 3:17 AM', 'will']], end: [['2 failed, 1 could not check, 5 passed', '', 'block']] }], note: 'Kogalla, Nov 1: the verifiers\' run 2026-11-01T084313-kogalla. The FAILs: brand clicks, and too few conversions on PMax - RA - US.' },
    DAILY: { tag: 'real', rows: [{ steps: [['C2 Competitor', 'Nov 1', 'code'], ['No search far over its norm?', '', 'will']], end: [['0 failed on the campaign', '', 'keep']] }], note: 'C2, Nov 1: the verifiers\' run 2026-11-01T091024-c2-management.' },
    OUT: { tag: 'real', rows: [{ steps: [['C2 Competitor', 'no click ceiling', 'code'], ['A limit goal', 'not in this module', 'code']], end: [['The bids run: 0 failed', '', 'keep']] }], note: 'C2, Nov 1: run 2026-11-01T091024-c2-management. Answer 53 found the clicks over $10 by itself.' },
    LINES: { tag: 'real', rows: [{ steps: [['Bull, the account', 'Nov 1', 'will'], ['Its lines', '2 failed, 1 could not check', 'will']], end: [['Each line names its goal', '', 'code']] }], note: 'Bull, Nov 1: the verifiers\' run 2026-11-01T084625-bull-law.' },
    PUSH: { tag: 'made', rows: [{ steps: [['A bids run', '', 'will'], ['act cases push', '', 'code']], end: [['Barbara holds the run, under its id', '', 'code']] }], note: 'Made: the four bids answers of Nov 1 name no pushed run.' },
    TO: { tag: 'made', rows: [{ steps: [['A FAIL: too few conversions', 'on Startups', 'will'], ['Opus\'s answer to it', 'no, with its fix or its case', 'opus']], end: [['Saved with the answer', '', 'code']] }], note: 'Made: the answers of Nov 1 answered their checks in words, before lines had ids.' },
    SAME: { tag: 'plan', rows: [{ steps: [['One push', 'the run and its failed checks', 'next'], ['The brief', 'reads them from it', 'next']], end: [['No second source', '', 'next']] }], note: 'Not built yet. The modules design names it.' }
  },

  reviewed: { self: 'a6662709', above: '142877dc', on: '2026-11-07' }
});
