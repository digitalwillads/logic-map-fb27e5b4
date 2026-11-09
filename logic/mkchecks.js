// The verifiers' checks of the Setup and market module. The verifiers at 4445307f, read 2026-11-08: verify/src/modules.rs:72
// (`verify module setup` runs the Google Ads audit, meta-ads, microsoft-ads and merchant-center), :92 (the Competitors area
// is Setup's: cm-competitor-profiles and cm-cpc-vs-market, verify/src/coverage_areas.rs:142-145), :123-144 (`GOAL_MODULES`:
// sa-account; Meta's five-types, structure-planned, names-readable, delivery-issues, ad-delivery-errors, account-can-spend
// and unplanned-changes; Microsoft's account-can-run and campaigns-serve; Merchant Center's ads-link, site-claimed,
// business-info and account-issues; cm-demand and cm-gaps go to Reach), :36 (`OUT`: a limit, tool or delete goal is in no
// module), counted from the trees on 2026-11-08 (16 goals, all alarm or playbook); cli/src/verify_cmd/module.rs:1-35 (today's
// data, no Jev, each FAIL, could-not-check and QUESTION shown, the run in its own folder); verify/src/audit/market.rs:86-140
// (cm-competitor-profiles warns on every check, and cm-cpc-vs-market-1-2 always warns, so neither goal can pass); the trees'
// `jev_blocks = []` (google-ads-audit, meta-ads, microsoft-ads, merchant-center). Moved on Nov 3: 0f424d35 (demand and gaps to
// Reach; the module's check reads the market once, within $1), 10ed3742 (Meta's structure goals into Setup). comm-chat at
// origin/main 1c24d43a: src/modules/brief/checks.rs:13-22 (the stored checks of the exam's Settings and Market areas, 14
// days, src/validators_api/exam.rs:31, :70-151, :201-208), src/modules/brief/mod.rs:46 (`CHECK_QUESTIONS`), src/modules/
// run.rs:84-130 (held to the newest module run under 24 hours, once one is pushed); docs/design/modules/README.md:151-152
// (the two lists are not one push yet). Real runs: the verifiers' state/modules/setup/runs/ (Nov 1, Kogalla 197.2 s, Bull
// 63.7 s and 0.2 s, C2 133.7 s) and ~/Projects/verifiers-dev/state/modules/setup/runs/ (C2, Nov 3 and Nov 4, the market read
// in 5 calls for $0.12). Barbara's Setup answers 8, 10 and 12 of Nov 1 (module_brief, answer_id); C2's answer 73 of Nov 3 and
// the copy's verifier events (no module run pushed by Nov 3), in a copy of Barbara's data (barbara-local, read-only).
LOGIC.flow({
  id: 'mkchecks', parent: 'market',
  title: 'The verifiers’ checks', short: 'The checks',
  head: 'The verifiers check up to {marketGoals} things about the account and the market, and Opus must answer each one that fails or asks it a question',
  chart: [
    'flowchart TB',
    'RUN["Opus runs the verifiers’<br/>check on the client"]:::will',
    'WHICH["Only the checks of the<br/>client’s own platforms run"]:::will',
    'GOOGLE["Google, 1 check on the<br/>account’s settings"]:::will',
    'MARKET["The market, 2 checks that<br/>cannot pass yet"]:::will',
    'MC["Merchant Center, 4 checks"]:::will',
    'META["Meta, 7 checks"]:::will',
    'MS["Microsoft, 2 checks"]:::will',
    'OUT["Left out are the limits, which<br/>run before each change"]:::will',
    'LINES["Each check that does not pass<br/>becomes a failure, a question,<br/>or a check that could not run"]:::will',
    'OLD["The fact sheet also lists the<br/>stored failures of the last<br/>{marketChecksDays} days"]:::code',
    'ANS(["Opus answers each failure and<br/>each question"]):::opus',
    'RUN --> WHICH',
    'WHICH --> GOOGLE', 'WHICH --> MARKET', 'WHICH --> MC', 'WHICH --> META', 'WHICH --> MS',
    'OUT -. "never part of<br/>this module" .-> RUN',
    'GOOGLE --> LINES', 'MARKET --> LINES', 'MC --> LINES', 'META --> LINES', 'MS --> LINES',
    'LINES --> ANS', 'OLD --> ANS'
  ],
  links: { RUN: 'mkcrun', MARKET: 'mkcmarket', MC: 'mkcmc', META: 'mkcmeta', OUT: 'mkcout', OLD: 'mkcold', ANS: 'mkcanswer' },
  leaves: {
    mkcrun: 'What the module’s check runs',
    mkcmarket: 'The two market checks',
    mkcmc: 'Merchant Center’s four checks',
    mkcmeta: 'Meta’s seven checks',
    mkcout: 'What the checks leave out',
    mkcold: 'The stored failures',
    mkcanswer: 'How Opus answers each line'
  },

  // Each slide belongs to one view: the part's own slides first, then one or more for each rule.
  deck: [
    { about: ['mkchecks'], kicker: '{marketGoals} checks',
      head: 'The module answers {marketGoals} of the verifiers’ checks, and each client gets only those of its own platforms',
      visual: { type: 'bars', max: 16, rows: [
        { label: 'Bull Legal, on Google only', parts: [[3, 'will', '3']] },
        { label: 'C2, on Google and Meta', parts: [[10, 'will', '10']] },
        { label: 'Kogalla, on Google, Meta and Merchant Center', parts: [[14, 'will', '14']] },
        { label: 'A client on every platform', parts: [[16, 'will', '16']] }] },
      vcap: 'Google gives 1 check, the market 2, Merchant Center 4, Meta 7 and Microsoft 2. The modules plan of Oct 31 counted 18, before two market checks moved to Search terms and reach.',
      stats: [['16', 'checks that this module answers', 'real'], ['2', 'of them can never pass today', 'real']] },
    { about: ['mkchecks'], kicker: 'Three clients, Nov 1',
      head: 'On Nov 1 the checks found one failure on C2 and one on Kogalla, the same Meta rule on both',
      visual: { type: 'bars', max: 13, rows: [
        { label: 'Kogalla, in 197.2 s', parts: [[1, 'block', '1 failed'], [6, 'wait', '6 could not run'], [6, 'keep', '6 passed']] },
        { label: 'Bull Legal, in 63.7 s', parts: [[4, 'wait', '4 could not run'], [1, 'keep', '1 passed']] },
        { label: 'C2, in 133.7 s', parts: [[1, 'block', '1 failed'], [4, 'wait', '4 could not run'], [4, 'keep', '4 passed']] }] },
      vcap: 'On Nov 1 the market still had four checks, so each run had more checks that could not run than it would today. On both C2 and Kogalla the live ad set let Meta pick the placements, which our rules forbid.' },

    { about: ['mkcrun'], kicker: 'What it runs',
      head: 'The module’s check reads today’s data, and runs each of its four checks at most once a day',
      visual: { type: 'timeline', items: [
        ['Nov 1, 3:15 AM ET', 'Kogalla has no run of the day, so the check reads the Google account once and runs the Meta and Merchant Center checks, in 197.2 s.'],
        ['3:16 AM', 'Bull Legal, in 63.7 s. Merchant Center has nothing of Bull’s to check.'],
        ['3:16 AM', 'C2, in 133.7 s.'],
        ['3:17 AM', 'Bull Legal again, and this time the check reuses the day’s saved data, in 0.2 s.']] },
      vcap: 'Since Nov 3 the check also reads the market once from DataForSEO when the day’s data has none, for at most $1. On Nov 4, in a test on C2, that market read took 5 calls and cost $0.12. The check keeps its runs in a folder of their own, so they never count as a full check of the client.' },

    { about: ['mkcmarket'], kicker: 'The market checks',
      head: 'Both market checks come back as could not check on every client, because the readers they need are not built',
      visual: { type: 'gate', rows: [
        ['“Each main competitor is known: what they say, offer, and prove”', 'Nothing reads the rivals’ ads, pages, reviews or local ads yet.', 'hold'],
        ['“Our cost per click against the market”', 'Nothing reads how much of each keyword’s reach is lost to rank yet.', 'hold']],
        end: ['Opus answers both in words, and nothing makes them pass', 'opus'] },
      vcap: 'On Nov 3 the check on rivals told C2’s answer that C2’s record named 11 rivals, and that the live search pages showed no advertiser at all. The check on click cost has two halves, and its first half looks for keywords that cost more than the market’s high price, but its second half can never run yet.' },

    { about: ['mkcmc'], kicker: 'Merchant Center',
      head: 'Merchant Center’s four checks look at its link to Google Ads, the claimed site, the store’s policies and any issue on the account',
      visual: { type: 'gate', rows: [
        ['“Merchant Center is linked to the right Google Ads account”', 'Passed on Kogalla.', 'pass'],
        ['“The website is verified and claimed, on the domain products link to”', 'Passed on Kogalla.', 'pass'],
        ['“Business info, returns, shipping, and tax match the site”', 'Could not run, because Kogalla’s written delivery time is not on record.', 'hold'],
        ['“No account issue or suspension goes unseen”', 'Passed on Kogalla.', 'pass']],
        end: ['3 passed and 1 could not run on Kogalla, Nov 1', 'keep'] },
      vcap: 'A link to the wrong Google Ads account would spend one client’s budget on another client’s products, and a suspension stops every Shopping ad the same day. Bull Legal and C2 have no Merchant Center, so these checks have nothing of theirs to check.' },

    { about: ['mkcmeta'], kicker: 'Meta',
      head: 'Meta’s seven checks ask whether the account can spend, whether its ads deliver, and whether our rules and the house structure still hold',
      visual: { type: 'gate', rows: [
        ['“Every live client account can spend”', 'Passed on C2 on Nov 1 and Nov 3.', 'pass'],
        ['“Every ad set and ad meant to run is delivering”', 'Passed on Nov 1. On Nov 3 it could not run, because the live ad set was still learning.', 'hold'],
        ['“Every ad-level delivery error is read and flagged”', 'Passed on Nov 1 and Nov 3.', 'pass'],
        ['“Every change is seen, and our rules still hold”', 'Failed on Nov 1 and Nov 3, because the live ad set lets Meta pick the placements.', 'stop'],
        ['“Every setup has the five campaign types, and the builders stay off”', 'Not judged in C2’s run of Nov 3.', 'wait'],
        ['“The account holds exactly what the plan holds”', 'Passed on Nov 3.', 'pass'],
        ['“Every name can be read for its stage and its type”', 'Could not run on Nov 3, because no campaign name reads as a builder or a cold campaign.', 'hold']],
        end: ['1 failed on C2, Nov 3', 'block'] },
      vcap: 'The last three joined this module on Nov 3, so the runs of Nov 1 did not hold them. The failure on both days is the one that Opus proposed to fix by switching to the house campaign.' },

    { about: ['mkcout'], kicker: 'Left out',
      head: 'This module leaves out the rules that are checked before every change, and two market checks that now belong to each campaign',
      visual: { type: 'gate', rows: [
        ['“Search Partners and Display are off on Search”', 'A limit, checked before each change.', 'hold'],
        ['“AI Max, auto-assets, auto-apply, and broad match switch are off”', 'A limit, checked before each change.', 'hold'],
        ['“Search demand and its trend”', 'Moved to Search terms and reach, at Will’s word of Nov 2.', 'pass'],
        ['“Buying searches we do not cover”', 'Moved to Search terms and reach, at Will’s word of Nov 2.', 'pass']],
        end: ['Opus still reads Google’s own tips from the fact sheet', 'opus'] },
      vcap: 'So the module’s check never shows that Google may apply its own tips on C2, though our rules keep them off. Opus found it from the exact read in the fact sheet instead.' },

    { about: ['mkcold'], kicker: 'Two lists',
      head: 'Opus also answers the failed checks that Barbara stored in the last {marketChecksDays} days, so it answers two lists of checks',
      visual: { type: 'flow', rows: [
        { title: 'From the stored results', steps: [['Each failed check on the settings and the market, from the last {marketChecksDays} days', 'the same results that Barbara’s account exam shows', 'code']], end: [['Opus answers each one', '', 'opus']] },
        { title: 'From the day’s module check', steps: [['Each failure, question and check that could not run', '', 'will']], end: [['Opus answers each failure and question by its id', '', 'opus']] }] },
      vcap: 'On Nov 1 C2’s fact sheet still held two older warnings about Meta’s campaign names, and C2’s answer replied to both, even though that morning’s module check did not list them. The plan is for both lists to come from the same run, but that is not built.' },

    { about: ['mkcanswer'], kicker: 'Each line',
      head: 'Opus must answer each failure with a no and its fix, and each question with a yes or a no',
      visual: { type: 'flow', rows: [
        { title: 'A failure', steps: [['A check failed', 'on Nov 3, Meta picked the placements of C2’s live ad set', 'block']], end: [['Opus says no, with its fix or its case', '', 'opus']] },
        { title: 'A question', steps: [['A check that Jev answers when the verifiers run in full', 'here it asks Opus instead, and says what yes and no mean', 'will']], end: [['Opus says yes or no from what it read', '', 'opus']] },
        { title: 'Could not run', steps: [['The check had nothing to read', 'both market checks, every time', 'wait']], end: [['Opus may answer it, but nothing makes it pass', '', 'opus']] }] },
      vcap: 'When the verifiers start sending their module runs to Barbara, code will refuse an answer that skips a line of the newest run, or that says good while a failure stands. It will also refuse an answer whose run is more than {marketRunAge} hours old. No module run had reached Barbara by Nov 3, so each answer so far replied to its checks in plain words, without their ids. Will has approved no line of these four checks for Jev, so Jev never reads Opus’s yes or no here.' }
  ],

  examples: {
    RUN: { tag: 'real', rows: [{ steps: [['The module’s check on C2', 'Nov 1, 3:16 AM ET', 'will']], end: [['Done in 133.7 s', 'the Meta check had not run that day, so this check ran it once', 'will']] }], note: 'We took this from the verifiers’ run of the module’s check on C2, Nov 1.' },
    WHICH: { tag: 'real', rows: [{ steps: [['Bull Legal, Nov 1', 'no Meta, no Microsoft and no Merchant Center', 'will']], end: [['Only the Google and market checks run', 'so 5 checks ran on Nov 1, when the market still had four', 'will']] }], note: 'We took this from the verifiers’ run of the module’s check on Bull Legal, Nov 1.' },
    GOOGLE: { tag: 'real', rows: [{ steps: [['The check on the account’s settings', 'Nov 1', 'will']], end: [['Passed on C2, Bull Legal and Kogalla', '', 'keep']] }], note: 'We took this from the verifiers’ three runs of the module’s check on Nov 1.' },
    MARKET: { tag: 'real', rows: [{ steps: [['The market checks, Nov 1', '', 'will']], end: [['Could not check, on all three clients', '', 'wait']] }], note: 'We took this from the verifiers’ three runs of the module’s check on Nov 1.' },
    MC: { tag: 'real', rows: [{ steps: [['Merchant Center’s checks on Kogalla', 'Nov 1', 'will']], end: [['3 passed and 1 could not run', 'the delivery time is not on record', 'wait']] }], note: 'We took this from the verifiers’ run of the module’s check on Kogalla, Nov 1.' },
    META: { tag: 'real', rows: [{ steps: [['Meta’s checks on C2', 'Nov 3', 'will']], end: [['1 failed, 2 could not run, and 3 passed', 'the placements rule failed', 'block']] }], note: 'We took this from the verifiers’ run of the module’s check on C2 on Nov 3, in a test on a copy of Barbara’s data.' },
    MS: { tag: 'made', rows: [{ steps: [['A client with a Microsoft account', '', 'will']], end: [['The verifiers add the two Microsoft checks to the run', '', 'will']] }], note: 'We made this up from the verifiers’ list of checks, because no test client runs Microsoft ads.' },
    OUT: { tag: 'real', rows: [{ steps: [['C2, Nov 1', 'Google may apply 4 kinds of its own tips', 'block'], ['The module’s check', 'our rule against Google’s tips is checked before each change, so it is not in this check', 'will']], end: [['Opus found it from the fact sheet’s read', '', 'opus']] }], note: 'We took this from the answer that the Setup and market module wrote for C2 in a test on Nov 1, and from the verifiers’ run that morning.' },
    LINES: { tag: 'real', rows: [{ steps: [['C2’s module check, Nov 1', '', 'will']], end: [['1 failure and 4 checks that could not run', 'the 4 that passed need no answer', 'will']] }], note: 'We took this from the verifiers’ run of the module’s check on C2, Nov 1.' },
    OLD: { tag: 'real', rows: [{ steps: [['C2’s fact sheet, Nov 1', 'two stored warnings about Meta’s names', 'code']], end: [['Opus answered them too', 'the names cost no money', 'opus']] }], note: 'We took this from the answer that the Setup and market module wrote for C2 in a test on Nov 1.' },
    ANS: { tag: 'real', rows: [{ steps: [['C2’s answer, Nov 1', '6 checks', 'opus'], ['Answered in words', 'with no ids, and no run named', 'opus']], end: [['The placements failure, the names, and four market checks', '', 'opus']] }], note: 'We took this from the answer that the Setup and market module wrote for C2 in a test on Nov 1.' }
  },

  reviewed: { self: 'a282f991', above: 'a09a8b52', on: '2026-11-08' }
});
