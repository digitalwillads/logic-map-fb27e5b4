// Code's first pass of a module run, its step 0. comm-chat at origin/main 1c24d43a, read 2026-11-08:
// src/claude_code_jobs.rs:500-511 (MODULE_PROTOCOL: act pull, verify check case-followups, verify check ar, verify
// client-report due, act search-terms todo, then module_brief with day true and the campaigns todo gave; one subagent, never a
// fork, for each line; a step's answers before the next; the search-term judging before step 2; a verifier miss logged once);
// src/modules/day.rs:22-35 (the reasons), :94-106 (`module_of`: a follow-up's module by its kind of change), :108-156
// (`reason`), :158-182 (`due`, and when Decide runs), :190-224 (`text`: the day's lines, the case work, the paperwork),
// :241-252 (`stands`: a dry run's, a test's or a cut-short Decide's answer does not count; git 19b43eee, Nov 6), :254-308
// (`read_day`: In motion and Money first, the campaigns, the answers that stand, the morning gate's items, the targets);
// src/modules/brief/mod.rs:81-106 (`targets`: live campaigns with spend, most money first, then a paused one an open plan
// would turn on, at most 8), :342-345 (`subagent_line`); src/modules/brief/numbers.rs:28-29 (live means spend in 30 stored
// days); src/modules/store.rs (`stale`: 7 New York days); src/triggers/morning.rs:63-95 (each item's kind). The verifiers at
// 4445307f: verify/trees/case-followups.toml (a prediction scored on its follow-up day), cli/src/act_cmd/search_terms.rs:1-31
// and :103-120 (todo, and the switch: verify/src/search_terms/mod.rs:174-221, on for 52 clients, off for C2 and ADI since
// Nov 8), verify/src/report/due.rs:1-17 (the weekly report's day). Real case: the dry run 260 of C2 (Nov 4, 11:22 to 11:25
// PM ET; its transcript's step 0 and the day's text; answers 69, 70 and 73 in instances/modrun2/barbara.db, immutable=1;
// server.log: "account=2 campaigns=16 decide=Some("In motion or Money reads a problem")"). KDX's 10 campaigns, 8 paused:
// docs/design/modules/README.md:239. Will, Nov 8, on the step "It lists each search that cost money and has no verdict
// yet": "Doesn't this happen in the search term module?" It does (its own chart picks the searches that cost money and skips
// the ones with a verdict), so `act search-terms todo` is drawn in the morning run's search box, not here.
LOGIC.flow({
  id: 'runfirst', parent: 'morning',
  title: 'Code’s first pass', short: 'Code’s first pass',
  head: 'Before any module starts, code pulls the day’s data, answers In motion and Money, and lists only the modules that must run',
  chart: [
    'flowchart TB',
    'PULL["Code pulls the day’s numbers,<br/>mail and calls for each of<br/>the client’s accounts"]:::code',
    'SCORE["It scores each change<br/>whose follow-up day<br/>has come"]:::code',
    'BILL["It checks the client’s billing,<br/>and asks if the weekly<br/>report is due"]:::code',
    'TWO["Code answers In motion and<br/>Money with no AI, and saves<br/>both answers"]:::code',
    'CAMPS["Code lists the live campaigns,<br/>the most money first, and<br/>keeps at most {runMost}"]:::code',
    'NEW["For each module and campaign,<br/>code reads what came in since<br/>its last real answer"]:::code',
    'DUE{"Is any module due, or does<br/>In motion or Money find<br/>a problem?"}:::code',
    'LIST(["One line for each module that<br/>is due, then Decide, then the<br/>case work and the paperwork"]):::opus',
    'QUIET(["Nothing is due, so no<br/>module runs today"]):::keep',
    'PULL --> SCORE', 'SCORE --> BILL', 'BILL --> TWO', 'TWO --> CAMPS', 'CAMPS --> NEW', 'NEW --> DUE',
    'DUE -- yes --> LIST', 'DUE -- no --> QUIET'
  ],
  links: { SCORE: 'rfscore', CAMPS: 'rfcamps', NEW: 'rfreal', DUE: 'rfdue', LIST: 'rfline' },
  leaves: {
    rfscore: 'The follow-ups come first',
    rfcamps: 'Which campaigns',
    rfreal: 'Only a real answer counts',
    rfdue: 'What makes a module due',
    rfline: 'One line, one helper'
  },

  // Each slide belongs to one view: the part's own slides first, then one or more for each rule.
  deck: [
    { about: ['runfirst'], kicker: 'The idea',
      head: 'Code does the cheap work first, so Opus starts only for the questions that something new has touched',
      visual: { type: 'flow', rows: [
        { title: 'C2, in the dry run of Nov 4', steps: [
          ['11:22 PM', 'code pulls C2’s accounts in under a minute', 'code'],
          ['11:23 PM', 'it scores the follow-ups and checks the billing', 'code'],
          ['11:25 PM', 'In motion finds no problem, and Money finds one', 'code']],
          end: [['2 account modules, 16 campaign lines and Decide', '', 'opus']] }] },
      vcap: 'The run’s own thread runs each step on Will’s computer, because the verifiers live there, but code makes every choice in this pass. The whole pass took about three minutes.' },
    { about: ['runfirst'], kicker: 'C2’s list · Nov 4',
      head: 'On Nov 4 code gave C2’s run 18 module helpers to start, then Decide, the case work and the paperwork',
      visual: { type: 'flow', rows: [
        { title: 'For the whole account, at once', steps: [['The client module', '', 'opus'], ['Setup and market', '', 'opus']], end: [['2 helpers', '', 'opus']] },
        { title: 'For each campaign, at once', steps: [['Results, Search terms and reach, Ads and pages, Bid and budget', 'on each of 4 campaigns', 'opus']], end: [['16 helpers', '', 'opus']] },
        { title: 'Last', steps: [['Decide', '', 'opus']], end: [['Then case #442, the client’s record, the weekly report, the story and the run’s report', '', 'code']] }] },
      vcap: 'Each line is the whole prompt of one helper. The list had no line for Tracking, because its test answer of Nov 1 still counted then.' },

    { about: ['rfscore'], kicker: 'The follow-ups come first',
      head: 'Code scores each follow-up before In motion reads, so a change whose day has come does not show as overdue',
      visual: { type: 'flow', rows: [
        { title: 'With the score first', steps: [['A budget change reaches its follow-up day', '', 'code'], ['The follow-up check scores it', 'from the account’s own data', 'code']], end: [['In motion lists a scored follow-up', '', 'keep']] },
        { title: 'With no score', steps: [['The same change, with no score', '', 'code'], ['Its day passes', '', 'code']], end: [['In motion calls it overdue, which is a problem', '', 'block']] }] },
      vcap: 'An overdue follow-up is one of the two things that turn In motion into a problem. In the dry run of Nov 4, In motion said at 11:25 PM that one follow-up was due, and at midnight that it was overdue.' },

    { about: ['rfcamps'], kicker: 'Which campaigns',
      head: 'The campaign modules answer each live campaign with spend, the most money first, and at most {runMost} of them',
      visual: { type: 'flow', rows: [
        { title: 'C2, Nov 4', steps: [['4 live campaigns', 'LA + New York, Competitor, Brand, and Meta’s remarketing', 'code']], end: [['All 4 get the campaign modules', '', 'opus']] },
        { title: 'KDX', steps: [['10 campaigns, and 8 of them are paused', '', 'code']], end: [['Only its 2 live ones, unless a plan would turn a paused one on', '', 'code']] }] },
      vcap: 'A campaign is live when it spent in the last {runLive} stored days. A paused campaign joins the list only when an open plan would turn it on.' },

    { about: ['rfreal'], kicker: 'Only a real answer counts',
      head: 'An answer keeps its module from running again for {runFresh} days, but only when it came from a real run',
      visual: { type: 'gate', rows: [
        ['An answer from a real run, or from a person', 'It counts for {runFresh} days, by the calendar in New York.', 'pass'],
        ['An answer from a test or a dry run', 'Since Nov 6 it does not count, because nobody carried it out.', 'stop'],
        ['A Decide whose run was cut short', 'It does not count, so Decide answers again.', 'stop']],
        end: ['So the first live morning will find every module due', 'opus'] },
      vcap: 'Every answer so far came from a test or from the dry run. In the dry run of Nov 4, Tracking’s test answer of Nov 1 still counted, so Tracking did not run that night.' },

    { about: ['rfdue'], kicker: 'What makes a module due',
      head: 'Something new that touches a module makes it due, and each module runs again once its answer is {runFresh} days old',
      visual: { type: 'gate', rows: [
        ['The client wrote or called', 'The client module.', 'pass'],
        ['The strategy page is blank', 'The client module.', 'pass'],
        ['A person changed a campaign', 'All four campaign modules on that campaign.', 'pass'],
        ['A person changed the account', 'Setup and market.', 'pass'],
        ['A Chad Ads alert names a campaign', 'All four campaign modules on it.', 'pass'],
        ['An alert names no campaign', 'Setup and market, and Tracking too when leads stopped.', 'pass'],
        ['A week turned worse', 'Tracking, then Results on that platform’s campaigns.', 'pass'],
        ['A follow-up came due', 'The module of that kind of change, on its campaign.', 'pass'],
        ['Searches wait for a verdict', 'Search terms and reach, on that campaign.', 'pass'],
        ['A target moved', 'Bid and budget, on every campaign.', 'pass'],
        ['No real answer from the last {runFresh} days', 'That module, on that campaign or account.', 'hold']],
        end: ['Decide runs when any of these ran, or when In motion or Money finds a problem', 'opus'] },
      vcap: 'Only what came in after a module’s last real answer counts. Decide also runs when the morning’s read failed, or when its own answer is {runFresh} days old.',
      quote: ['if you checked all the months search terms don\'t do that again. Just the new ones.', 'Oct 30'] },

    { about: ['rfline'], kicker: 'One line, one helper',
      head: 'Each line of the list is the whole prompt of one helper, and the run waits for each step before the next one',
      visual: { type: 'flow', rows: [
        { title: 'One line of C2’s list', steps: [['Bid and budget on DWA - C2 Brand [Search]', 'read the facts code gathered, follow them, and save the answer', 'code']], end: [['One fresh Opus helper, never a copy of the run', '', 'opus']] },
        { title: 'The order', steps: [['The whole account, all at once', '', 'opus'], ['The search-term judging', '', 'opus'], ['Each campaign, all at once', '', 'opus']], end: [['Decide, last', '', 'opus']] }] },
      vcap: 'A helper starts with an empty memory, so it reads only its own question. After each step the run reads each reply for a check that got it wrong, and logs each new one once.' }
  ],

  examples: {
    PULL: { tag: 'real', rows: [{ steps: [['C2, Nov 4, 11:22 PM', '', 'code'], ['Code pulls C2’s accounts in under a minute', 'with no read that failed', 'code']], end: [['11 flags for the day', '8 of them follow-ups that are due', 'code']] }], note: 'This is from C2’s dry run of Nov 4, which ran on a copy of Barbara and changed nothing.' },
    SCORE: { tag: 'real', rows: [{ steps: [['C2, Nov 4, 11:23 PM', 'the follow-up check runs for C2', 'code']], end: [['Then In motion counts 1 follow-up that is due', '', 'code']] }], note: 'This is from C2’s dry run of Nov 4. In motion made its list two minutes after that check.' },
    BILL: { tag: 'real', rows: [{ steps: [['C2’s billing check, Nov 4', '11 of its billing goals pass, and 2 cannot be checked', 'code'], ['The weekly report check', 'no report to write that night', 'code']], end: [['Money reads the billing check', '', 'code']] }], note: 'This is from C2’s dry run of Nov 4, which ran on a copy of Barbara and changed nothing.' },
    TWO: { tag: 'real', rows: [{ steps: [['In motion, 11:25 PM', 'no problem, with 3 tests running and 6 questions waiting on a person', 'code'], ['Money, 11:25 PM', 'a problem, because Meta would spend past its $200 cap', 'block']], end: [['Code saves both answers', '', 'code']] }], note: 'Code gave these two answers for C2 on Nov 4, in a dry run on a copy of Barbara, so nothing changed.' },
    CAMPS: { tag: 'real', rows: [{ steps: [['C2’s live campaigns, Nov 4', 'LA + New York, Competitor, Brand and Meta’s remarketing', 'code']], end: [['4 campaigns, under the most of {runMost}', '', 'code']] }], note: 'This is from C2’s dry run of Nov 4. C2’s five paused campaigns stayed off the list.' },
    NEW: { tag: 'real', rows: [{ steps: [['Tracking’s newest answer', 'a test of Nov 1, 4 days old', 'code']], end: [['It still counted on Nov 4, so Tracking did not run', '', 'code']] }], note: 'This happened in C2’s dry run of Nov 4. Since Nov 6 a test’s answer no longer counts, so today Tracking would run.' },
    DUE: { tag: 'real', rows: [{ steps: [['Money finds a problem with Meta’s spend', '', 'block']], end: [['So Decide runs after the 18 module helpers answer', '', 'opus']] }], note: 'This is from C2’s dry run of Nov 4, which ran on a copy of Barbara and changed nothing.' },
    LIST: { tag: 'real', rows: [{ steps: [['The whole account', 'the client module, and Setup and market', 'opus'], ['Each campaign', '16 lines, four modules on four campaigns', 'opus'], ['Decide', '', 'opus']], end: [['Then the run handles case #442 and does the paperwork', '', 'code']] }], note: 'This is the list that code made for C2 on Nov 4, in a dry run.' },
    QUIET: { tag: 'made', rows: [{ steps: [['Nothing new came in', '', 'code'], ['Neither In motion nor Money finds a problem', '', 'code']], end: [['No module runs today', '', 'keep']] }], note: 'We made this up from code’s own test of a quiet morning on C2’s campaigns, because no live morning has run yet.' }
  },

  reviewed: { self: '3922eccd', above: '2525099a', on: '2026-11-08' }
});
