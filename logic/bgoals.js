// The bids check: the verifiers' `verify module bids` (cli/src/verify_cmd/module.rs:1-36) runs the audit and the daily check
// (verify/src/modules.rs:76) and keeps the goals of the areas bidding and budgets (:87-99, line 95; coverage_areas.rs:60 and
// :122-128); a goal sorted limit, tool or delete is in no module (:33-36, OUT); the verifiers' own test counts 8 goals
// (verify/tests/coverage_areas.rs:84). The goals: verify/trees/google-ads-audit.toml:1105-1290 (seven goals, at 1114, 1142,
// 1173, 1199, 1224, 1250, 1277) and verify/trees/google-ads.toml:412-433 (the click-price goal, Welch's real case :422); the
// limits: google-ads.toml:375-410 (the sort :378, C2's real case :396), meta-ads.toml:883-886, microsoft-ads.toml:636-639.
// comm-chat: the listed failures, brief/checks.rs:13-22 (the bids line 20), :64-124, src/validators_api/exam.rs:31 (14 days),
// :203 and :494 (a limit in its own block); the check's campaign flag, brief/mod.rs:205-216; one push for both is the design's
// (docs/design/modules/README.md:151-152), not built. Real runs: the verifiers' state/modules/bids/runs of Nov 1 (12) and
// 2026-11-03T052051-c2-management (C2's Meta campaign); Will's words of Nov 2 at google-ads.toml:395 (case #241). Old part:
// retired/2026-11-07-bids-redo/bidchecks.js, and the failed checks of bidbrief.js.
LOGIC.flow({
  id: 'bgoals', parent: 'bids',
  title: 'The bids check', short: 'The bids check',
  head: 'Eight of Will’s checks judge bids and budgets, only on Google, and Opus must answer each one that fails',
  chart: [
    'flowchart TB',
    'LISTED["Code lists the newest failure of<br/>each bids goal, its own first,<br/>then the account’s"]:::code',
    'RUN["Opus runs the bids check on<br/>this campaign’s data of today"]:::will',
    'GOOGLE{"Is it a Google<br/>campaign?"}:::code',
    'NONE(["No goal judges it, so no<br/>check can call it clean"]):::will',
    'AUDIT["The audit: seven goals on<br/>where the money goes"]:::will',
    'DAILY["The daily check: no search costs<br/>far more a click than its<br/>campaign’s norm"]:::will',
    'OUT["Left out: the limit goals, such as<br/>“Every bid strategy fits<br/>the client’s targets”"]:::code',
    'LINES["Opus sends the run to Barbara,<br/>and each failure keeps its id"]:::code',
    'ANSWER(["Opus answers each<br/>failure by its id"]):::opus',
    'SAME["Not built: the listed failures<br/>and the run from one place"]:::next',
    'LISTED --> RUN', 'RUN --> GOOGLE',
    'GOOGLE -- no --> NONE', 'GOOGLE -- yes --> AUDIT', 'GOOGLE -- yes --> DAILY',
    'AUDIT --> LINES', 'DAILY --> LINES',
    'OUT -. "never in<br/>this module" .-> LINES',
    'LINES --> ANSWER', 'NONE --> ANSWER',
    'SAME -.-> LISTED'
  ],
  links: { LISTED: 'bglisted', RUN: 'bgcampaign', NONE: 'bgmeta', AUDIT: 'bgaudit', DAILY: 'bgcpc', OUT: 'bidlimit', SAME: 'bgsame' },
  leaves: {
    bglisted: 'The failures code lists',
    bgcampaign: 'One campaign’s own results',
    bgmeta: 'Meta and Microsoft',
    bgaudit: 'The audit’s seven goals',
    bgcpc: 'The click-price goal',
    bidlimit: { title: 'The limit goals', open: {
      q: '“Every bid strategy fits the client’s targets” is a limit goal, so its failure reaches neither the facts code gathers for Bid and budget nor the bids check. Should Bid and budget answer it?',
      since: 'Nov 7',
      opts: [
        ['Yes, show the limit goals of bidding and budgets in the bids check and in the facts, and answer each failure like the others', true, 'The bid limits are this module’s own question. C2’s Competitor gap reached its answer only because Opus read the clicks itself.'],
        ['No, limits stay in the change check and the daily check', false, 'This is how it works today. A change still cannot break a limit, but no morning answer weighs a live bid that breaks one.'],
        ['Move the click ceiling into its own alarm goal of the bidding area', false, 'The module then sees the ceiling, and the part about targets stays a limit.']] } },
    bgsame: 'One push for both'
  },

  // Each slide belongs to one view: the part's own slides first, then one or more for each rule.
  deck: [
    { about: ['bgoals'], kicker: 'Where they come from',
      head: 'Every goal of Will’s trees on bidding and budgets comes to Bid and budget, unless it is a limit',
      visual: { type: 'dots', groups: [[7, 'opus', 'goals of the Google Ads audit'], [1, 'route', 'goal of the daily check'], [3, 'next', 'limits left out, one each on Google, Meta and Microsoft']] },
      vcap: 'The verifiers’ own test counts exactly 8 goals for this module, and it checks that the module’s runs judge every one of them.' },
    { about: ['bgoals'], kicker: 'The real runs · Nov 1',
      head: 'The first bids checks found 5 failures, all on the audit’s goals',
      visual: { type: 'bars', max: 8, rows: [
        { label: 'Kogalla, the account', parts: [[2, 'block', '2 failed'], [1, 'wait', '1 not checked'], [5, 'keep', '5 passed']] },
        { label: 'Bull, the account', parts: [[2, 'block', '2 failed'], [1, 'wait', '1 not checked'], [5, 'keep', '5 passed']] },
        { label: 'C2, the account', parts: [[1, 'block', '1 failed'], [1, 'wait', '1 not checked'], [6, 'keep', '6 passed']] }] },
      vcap: 'Kogalla and C2 could not be checked against a monthly cap, because neither has one, and Bull has no brand clicks to compare. The brand failures said to bid with Target Impression Share, and Will changed that rule the next day.',
      quote: ['lets change the rule and remove the rule on the brand campaign that says it needs to be impression share based bidding', 'Nov 2'] },

    { about: ['bglisted'], kicker: 'The failures code lists',
      head: 'Opus gets each bids goal’s newest result, the campaign’s own first and then the account’s',
      visual: { type: 'card', title: 'Bull’s Hedge Funds and PE campaign, Nov 7', fields: [
        ['Its own', 'No failed check names this campaign.'],
        ['The account’s', '“Each bid strategy has enough data to work” failed on Nov 2.'],
        ['The account’s', '“Targets are realistic against the real results” failed on Nov 2.'],
        ['Could not check', '“Brand clicks are not overpaid”'],
        ['Opus must say', 'which part of each one, if any, is this campaign’s']], stamp: ['The newest result of each goal, from the last {bidChecksDays} days', 'will'] },
      vcap: 'A result that names another campaign stays out, and so does one of another platform. Barbara’s exam page reads the same results, so the two never disagree.' },

    { about: ['bgcampaign'], kicker: 'One campaign',
      head: 'The bids check shows one campaign’s own results, beside the account’s results that name no campaign',
      visual: { type: 'flow', rows: [
        { title: 'Bull, Nov 1, before the fix', steps: [['Each campaign’s bids check', 'named no campaign', 'code'], ['The account’s failures', 'which sat on Startups', 'block']], end: [['Each campaign got the failures of Startups', '', 'block']] },
        { title: 'Now', steps: [['The bids check with the campaign’s id', '', 'will'], ['Its own results', 'and the problems kept apart on it', 'will']], end: [['Startups, 2 failed', 'too few conversions for smart bidding, and a $150 bid target against the client’s $300', 'block']] }] },
      vcap: 'A Meta or Microsoft campaign names its platform, so only that platform’s checks run. A result that sits only on paused campaigns is left out, with one line that says so.' },

    { about: ['bgmeta'], kicker: 'Meta and Microsoft',
      head: 'No goal of Will’s trees judges the bids of a Meta or Microsoft campaign',
      visual: { type: 'flow', rows: [
        { title: 'C2’s Meta campaign, Nov 3', steps: [['The bids check on the Meta campaign', '', 'will'], ['No goal of Meta in this module', '', 'next']], end: [['Could not check', 'so Opus judges it from its numbers and reads, and says that no check stands behind that', 'wait']] }] },
      vcap: 'Meta’s goal “Budgets are present and add up” and Microsoft’s budget goal are limits, so they stay out. On Nov 1 the same Meta campaign’s check had shown Google’s brand failure, before the check named its platform.' },

    { about: ['bgaudit'], kicker: 'The audit’s seven goals',
      head: 'The audit judges where the money goes, and whether each bid strategy has what it needs',
      visual: { type: 'gate', rows: [
        ['Good campaigns held back by budget are found', 'A campaign at or under target that loses {bidLimited}% or more of its searches to budget.', 'pass'],
        ['Spend on campaigns over target is sized', 'A campaign {bidOver}% or more over target for {bidOverDays} trusted days, in dollars a month.', 'pass'],
        ['Each bid strategy has enough data to work', 'Fewer than {bidSmart} conversions in 30 days fails, and a value strategy needs {bidValue}.', 'pass'],
        ['Targets are realistic against the real results', 'A target under {bidStarve}% or over {bidLoose}% of the 30-day result.', 'pass'],
        ['Spend paces to the monthly cap', 'Off pace by more than {bidPace}%.', 'pass'],
        ['Brand clicks are not overpaid', 'A brand click at {bidBrandCpc}% or more of the price of a non-brand click.', 'pass'],
        ['Bids and budgets are not changed too often', 'More than {bidChurn} changes in {bidChurnDays} days on one smart bidding campaign.', 'pass']] },
      vcap: 'Every check of these goals is code and none asks a model, so a bids check holds no question for Opus to answer.' },

    { about: ['bgcpc'], kicker: 'The click-price goal',
      head: 'One search can cost far more than its campaign’s norm, and only this goal sees it',
      visual: { type: 'bars', max: 220, rows: [
        { label: 'Welch Vacuum, its 90-day norm', parts: [[10.21, 'code', '$10.21 a click']] },
        { label: '“anderson negele”, Oct 11', parts: [[218.89, 'block', '$218.89 a click, 21 times the norm']] }] },
      vcap: 'A search that cost ${bidCpcMin} or more, at {bidCpcTimes} times the norm or more and with no conversion, fails. A campaign under {bidCpcClicks} clicks has no norm. Nothing flagged Welch’s search before this goal.' },

    { about: ['bidlimit'], kicker: 'The limit goals',
      head: 'The goal that checks bids against the targets is a limit, so Bid and budget never sees it',
      visual: { type: 'flow', rows: [
        { title: 'C2’s Competitor campaign, Nov 1', steps: [['Maximize clicks with no click ceiling', '', 'code'], ['Its bids check', '0 failed', 'keep'], ['Answer 53', '6 clicks over $10, the dearest $19.46', 'opus']], end: [['A new check fails a missing ceiling', 'inside a limit goal', 'will']] },
        { title: 'Today', steps: [['The daily check fails it', '', 'will'], ['The facts and the bids check', 'leave every limit out', 'code']], end: [['The bid answer never sees it', '', 'block']] }] },
      vcap: 'The tree sorts this goal as a limit, because a bid past the client’s own target breaks a money rule. A limit runs in the change check, and Barbara’s exam shows it in its own block.',
      open: 'bidlimit' },

    { about: ['bgsame'], kicker: 'Not built',
      head: 'The failures code lists and the failures of today’s check still come from two places',
      visual: { type: 'flow', rows: [
        { title: 'Today', steps: [['The listed failures', 'the newest stored result of each goal, up to {bidChecksDays} days old', 'code'], ['Today’s check', 'its lines, each with an id', 'will']], end: [['Opus answers both', 'one in words, one by id', 'opus']] },
        { title: 'The design', steps: [['One push', '', 'next']], end: [['The listed failures come from the run itself', '', 'next']] }] },
      vcap: 'On Nov 7 Bull’s facts listed the account’s failures of Nov 2. The design of the verifiers’ move to Barbara asks for one push, so there is one source.' }
  ],

  examples: {
    LISTED: { tag: 'real', rows: [{ steps: [['Bull’s Hedge Funds and PE campaign, Nov 7', 'none of its own', 'code']], end: [['2 of the account’s failures, from Nov 2', 'Opus must say which part is this campaign’s', 'block']] }], note: 'The facts that code gathered for that campaign on Nov 7.' },
    RUN: { tag: 'real', rows: [{ steps: [['Bull’s Startups campaign, Nov 1, 3:59 AM', 'the bids check with the campaign’s id', 'will']], end: [['2 failed, and 0 could not check', '', 'block']] }], note: 'The verifiers’ bids run of Nov 1 on Bull’s Startups campaign.' },
    GOOGLE: { tag: 'real', rows: [{ steps: [['C2’s Meta campaign, Nov 3', '', 'code'], ['Is it a Google campaign?', 'no', 'code']], end: [['No goal judges it', '', 'next']] }], note: 'The verifiers’ bids run of Nov 3 on C2’s Meta campaign.' },
    NONE: 'GOOGLE',
    AUDIT: { tag: 'real', rows: [{ steps: [['Kogalla, Nov 1', 'the audit’s goals, on the saved data of 3:17 AM', 'will']], end: [['2 failed, 1 could not check, 5 passed', '', 'block']] }], note: 'The verifiers’ bids run of Nov 1 on Kogalla. The failures were its brand clicks, and too few conversions on PMax.' },
    DAILY: { tag: 'real', rows: [{ steps: [['C2’s Competitor campaign, Nov 1', 'no search far over its norm?', 'will']], end: [['0 failed on the campaign', '', 'keep']] }], note: 'The verifiers’ bids run of Nov 1 on that campaign.' },
    OUT: { tag: 'real', rows: [{ steps: [['C2’s Competitor campaign', 'no click ceiling', 'code'], ['A limit goal', 'not in this module', 'code']], end: [['Its bids check, 0 failed', '', 'keep']] }], note: 'The verifiers’ bids run of Nov 1 on that campaign. Answer 53 found the clicks over $10 by itself.' },
    LINES: { tag: 'real', rows: [{ steps: [['Bull, the account, Nov 1', '2 failed, and 1 could not check', 'will']], end: [['Each line names its goal', '', 'code']] }], note: 'The verifiers’ bids run of Nov 1 on Bull’s account.' },
    ANSWER: { tag: 'made', rows: [{ steps: [['A failure, too few conversions', 'on Startups', 'will'], ['Opus answers it', 'no, with its fix or its case', 'opus']], end: [['It saves with the answer', '', 'code']] }], note: 'Made, because the answers of Nov 1 answered their checks in words, before each line had an id.' },
    SAME: { tag: 'plan', rows: [{ steps: [['One push', 'the run and its failures', 'next'], ['The facts', 'read the failures from it', 'next']], end: [['No second source', '', 'next']] }], note: 'Not built yet. The modules design names it.' }
  },

  reviewed: { self: 'ad83125f', above: '4bfe1dd5', on: '2026-11-07' }
});
