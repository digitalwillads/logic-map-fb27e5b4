// The morning run, the top of the map since 2026-11-08. Will, Nov 8: "If we were to make a high view overview of like, so
// these are all modules, right? But for like the runs and everything else, what would that look like?", then "Make one for
// the morning run. Let's do just that right now." Each module box opens that module's own top chart (Money and Setup
// and market since the merge of Nov 8); Results, Search terms and reach, Ads and pages and Decide are rule boxes until each gets its own map. Drawn as it
// works today, from comm-chat at origin/main 1c24d43a (read 2026-11-08): src/claude_code_jobs.rs:477-494 (MODULE_SCOPE: the
// run is the manager, it reads the answers and asks no questions in its thread), :496-527 (MODULE_PROTOCOL: step 0, one
// subagent for each line, the search-term judging before step 2, the finish and the paperwork), :2131-2140 (MODULE_RUNS, one
// switch for every client), :2333-2440 (`tick_slot`: what opens a client's morning); src/modules/mod.rs:58-61 (7 days, at
// most 8 campaigns), :119 (ACCOUNT_FACTS: the four campaign modules and Decide need Tracking, the client module, In motion
// and Money), :121-293 (the ten modules, their questions, who answers each and their words); src/modules/day.rs:108-182
// (`reason` and `due`: what is due, and when Decide runs), :190-224 (`text`: the day's lines, and a quiet morning starts no
// subagent), :254-308 (`read_day`: In motion and Money first); src/modules/brief/code.rs:239-320 (`money`: its verdict);
// src/modules/brief/numbers.rs:727-763 (what Decide reads); src/chat/tools/mod.rs:419-428 (the stops in code, in order);
// docs/design/modules/README.md:59-75 (the daily run), :239-260 (what each module reads); docs/superpowers/specs/2026-11-04-
// modules-in-the-daily-run-design.md:15-34 (why), :63-69 (the anti-goals), :83-148 (the run, step by step). Status: #136
// merged on the evening of Nov 6 (Nov 7 in UTC), and live keeps MODULE_RUNS off "until Will has tested it and said yes to its
// cost, about twice a full run's" (docs/claude-code-bridge-setup.md:2260-2264); Barbara's list_automations, read 2026-11-08:
// all 14 client runs are off, 8 of them held, and only the A&R check-in opens by the clock, at 8:30 AM ET. Real cases: the
// dry run 260 of C2 on a copy of Barbara (Nov 4, 11:21 PM to Nov 5, 4:03 AM ET; ~/Library/Application Support/barbara-local/
// instances/modrun2/barbara.db read with immutable=1: answers 69 to 91, the run's turns and its report; its transcript
// ~/.claude/projects/-Users-williamarnett/001d002e-cd1c-432b-bc04-b47ca584989a.jsonl: the day's text, step 0, 20 helpers
// started; its subagents folder: 54 helper threads); the memory note project_modules_daily_run_2026_11_04.md (380M against
// 192M tokens); C2's run #250 of Nov 4 (the spec :17-26; list_automations client:13); Tracking's test answer 11 of Nov 1.
// Will's notes on this map, Nov 8: the search step is the search term module's ("Doesn't this happen in the search term
// module?"), so the search box says the module finds each new search and Opus judges it; and every morning runs the modules,
// with no switch ("I don’t want to have this be an option I want to have it always run themodules"; his pick: "Turn it on,
// then turn on each client run that you want"). The switch's removal is not built: live keeps MODULE_RUNS off.
LOGIC.flow({
  id: 'morning',
  title: 'The morning run', short: 'The morning run', level: 'The run', status: 'Built; live keeps it off until the code drops its switch (Will, Nov 8)',
  head: 'Each morning the run answers only the questions where something changed, then Decide puts the work in order, and the run carries it out within Will’s limits',
  chart: [
    'flowchart TB',
    'START(["The client’s run opens at<br/>its own time, on Will’s<br/>computer"]):::code',
    'PULL["Code pulls the day’s data<br/>and scores each follow-up<br/>that is due"]:::code',
    'subgraph EVERY["Every morning, by code"]',
    'direction LR',
    'MOTION["In motion lists what<br/>is already under way"]:::code',
    'MONEY["Money says how much<br/>room there is to spend"]:::code',
    'MOTION ~~~ MONEY',
    'end',
    'DUE{"Is a module due, or does<br/>In motion or Money<br/>find a problem?"}:::code',
    'QUIET(["Nothing is due, so no<br/>module runs, and the run<br/>does only its case work<br/>and paperwork"]):::keep',
    'subgraph ACCOUNT["For the account, when due"]',
    'direction LR',
    'TRACK["Tracking asks if each<br/>platform’s count is true"]:::opus',
    'CLIENT["The client module asks<br/>what the client wants and<br/>what they last said"]:::opus',
    'SETUP["Setup and market asks if<br/>the account can run, and<br/>who it competes with"]:::opus',
    'TRACK ~~~ CLIENT ~~~ SETUP',
    'end',
    'JUDGE["The search term module finds<br/>each new search that cost<br/>money, and Opus judges it"]:::opus',
    'subgraph CAMPAIGNS["For each campaign, when due"]',
    'direction LR',
    'RESULTS["Results asks if the<br/>campaign does its job"]:::opus',
    'REACH["Search terms and reach<br/>asks if the right people<br/>see it"]:::opus',
    'ADS["Ads and pages asks if<br/>the ads and the pages<br/>are strong"]:::opus',
    'BIDS["Bid and budget asks<br/>if the bid is right"]:::opus',
    'RESULTS ~~~ REACH ~~~ ADS ~~~ BIDS',
    'end',
    'DECIDE["Decide puts all the work in<br/>order, and names who must<br/>say yes first"]:::opus',
    'DO["The run makes each change<br/>through Chad, and each one<br/>must pass every stop"]:::will',
    'END(["Last the paperwork, then Jev<br/>asks what is left, and the<br/>run looks back"]):::code',
    'START --> PULL', 'PULL --> EVERY', 'EVERY --> DUE',
    'DUE -- yes --> ACCOUNT', 'DUE -- no --> QUIET',
    'ACCOUNT --> JUDGE', 'JUDGE --> CAMPAIGNS', 'CAMPAIGNS --> DECIDE', 'DECIDE --> DO', 'DO --> END',
    'QUIET --> END'
  ],
  links: { START: 'runstart', PULL: 'runfirst', MOTION: 'motion', MONEY: 'money', DUE: 'runfirst', QUIET: 'runquiet', TRACK: 'tracking', CLIENT: 'client', SETUP: 'market', JUDGE: 'waterfall', RESULTS: 'runresults', REACH: 'runreach', ADS: 'runads', BIDS: 'bids', DECIDE: 'rundecide', DO: 'runstops', END: 'runend' },
  leaves: {
    runquiet: 'A quiet morning',
    runresults: 'The Results module',
    runreach: 'The Search terms and reach module',
    runads: 'The Ads and pages module',
    rundecide: 'The Decide module'
  },

  // Each slide belongs to one view: the run's own slides first, then the slides of its rules.
  deck: [
    { about: ['morning'], kicker: 'The idea',
      head: 'One long thread used to do the whole morning, so the run now cuts it into small questions, and each one gets a fresh look',
      visual: { type: 'flow', rows: [
        { title: 'C2’s old run, Nov 4 at 7:00 AM', steps: [
          ['One Opus thread reads everything', '12 verifiers, the audit, 19 cases, the report and the story', 'opus'],
          ['Its memory fills up, and Claude Code shortens it at 1:35 PM', '', 'block']],
          end: [['It writes “942 right” in four places, where the record holds 962', '', 'block']] },
        { title: 'The module run', steps: [
          ['Code picks the questions that are due', '', 'code'],
          ['One fresh Opus helper answers each question', '', 'opus']],
          end: [['Decide puts the answers in order, and the run does the work', '', 'keep']] }] },
      vcap: 'The old run read 177 million tokens from its cache, and its slips came from too much to hold at once. A fresh helper reads only what its own question needs, and the run reads only the answers.',
      quote: ['I want to see if we need more subagents because it\'s not getting to the end in a satifactory way.', 'Nov 4'] },
    { about: ['morning'], kicker: 'A real morning · C2 · Nov 4',
      head: 'The only full module run of a real client was a dry run on C2, on a copy of Barbara, and it took almost five hours',
      visual: { type: 'timeline', items: [
        ['11:21 PM', 'A person starts the dry run by hand, on a copy of Barbara, so nothing can change.'],
        ['11:25 PM', 'Code answers In motion, which is good, and Money, which finds a problem, because Meta’s real pace passes its $200 cap.'],
        ['11:45 PM', 'Setup and market answers, and the client module answers ten minutes later.'],
        ['12:00 AM', 'Sixteen helpers start at once, four modules on each of C2’s four live campaigns.'],
        ['2:15 AM', 'The last helper answers, Search terms and reach on LA + New York, after about two hours.'],
        ['2:48 AM', 'Decide answers with 18 proposals and 8 questions for Will.'],
        ['3:36 AM', 'Jev asks the run to carry out 17 of Decide’s items, because the run took no step on them.'],
        ['4:03 AM', 'The run says that it changed nothing, because it is a dry run, and the tab closes.']] },
      vcap: 'Tracking did not run that night, because its answer from a test of Nov 1 still counted then. Since Nov 6 an answer from a test no longer counts, so a first live morning would run Tracking too.' },
    { about: ['morning'], kicker: 'The cost',
      head: 'That dry run read about twice the tokens of C2’s old full run of the same day',
      visual: { type: 'bars', max: 380, rows: [
        { label: 'C2’s old full run, Nov 4', parts: [[192, 'code', '192M tokens']] },
        { label: 'The module dry run, Nov 4', parts: [[380, 'opus', '380M tokens']] }] },
      vcap: 'The dry run used 54 helper threads, and it wrote 3.6 million tokens against 0.96 million for the old run. On Nov 8 Will said that every morning should run the modules, and that he turns on each client’s run himself.',
      stats: [['About 2x', 'the tokens of the old full run', 'real'], ['54', 'helper threads in one morning', 'real'], ['4 hours 42 minutes', 'from start to close', 'real']] },
    { about: ['morning'], kicker: 'Status · Nov 8',
      head: 'The module run is built and merged, and Will wants every morning to run it, but the code still has a switch that keeps it off in live',
      visual: { type: 'timeline', items: [
        ['Oct 31', 'The modules are built, and Will can test one module on one client under Validators and then Modules.'],
        ['Nov 4, 7:00 AM', 'C2’s old run makes no call to a module, so Will asks for the modules to take its place.'],
        ['Nov 4, 11:21 PM', 'The dry run on a copy of Barbara works through every step and changes nothing.'],
        ['Nov 6, evening', 'The module run is merged, with one switch for every client.'],
        ['Nov 7', 'Live keeps that switch off until Will tests the module run and says yes to its cost.'],
        ['Nov 8', 'Will says that every morning runs the modules, with no switch, and that he turns on each client’s run himself.'],
        ['Nov 8', 'All 14 client runs are off, so no client morning opens. Only the A&R check-in opens by the clock, at 8:30 AM.']] },
      vcap: 'Until the code drops the switch, a client run that Will turns on gets the old kind of morning run, with no modules. A person can still test one module on one client.',
      quote: ['and have it be replacing the normal runs', 'Nov 4'] },
    { about: ['morning'], kicker: 'The search step today',
      head: 'The search term module finds and judges each new search that cost money, but today the run still uses the older review in its place',
      visual: { type: 'gate', rows: [
        ['The older review’s switch is on for 52 clients', 'The run lists their new searches in batches, and one Opus helper judges each batch.', 'pass'],
        ['It is off for C2 and ADI since Nov 8', 'The run goes on with no batch, so nothing judges their new searches.', 'stop'],
        ['The search term module on this map', 'It takes over this step once Jacob accepts the code change that waits for him.', 'hold']],
        end: ['A campaign with a new search makes Search terms and reach due', 'opus'] },
      vcap: 'On Nov 4 the older review found no new search for C2, because all 253 searches that cost money in 90 days already had a verdict. That night it also checked 1,001 of the live negatives again, and it left 481 for later runs.' },

    { about: ['runquiet'], kicker: 'A quiet morning',
      head: 'When nothing new came in, and In motion and Money find no problem, no module runs that morning',
      visual: { type: 'flow', rows: [
        { title: 'A quiet morning', steps: [
          ['Code pulls the day’s data, and In motion and Money answer', 'and neither finds a problem', 'code'],
          ['No module is due', 'nothing came in since each one answered', 'code']],
          end: [['No module helper starts', '', 'keep'], ['The run does its case work, the weekly report when it is due, and its report', '', 'code']] }] },
      vcap: 'A quiet morning writes no client story. But each module must answer at least once in {runFresh} days on each campaign, so a quiet week still ends with a morning that runs them again.',
      quote: ['I want it to run everyday. I just don\'t want it to have to check everything.', 'Oct 30'] },

    { about: ['runresults'], kicker: 'The Results module',
      head: 'Results asks if each campaign does its job, and one Opus helper answers it for each campaign that is due',
      visual: { type: 'flow', rows: [
        { title: 'What it reads', steps: [
          ['13 months and 14 weeks of the campaign', 'its clicks, and its changes with who made them and why', 'code'],
          ['The four account answers', 'Tracking, the client module, In motion and Money', 'code']],
          end: [['Its verdict, its largest move and the day it began', 'each cause marked as known or a guess', 'opus']] },
        { title: 'C2’s Brand campaign, Nov 4', steps: [['It shows on 77% of searches for C2’s name, at $3.44 a click', '', 'code']],
          end: [['Good, because both October leads were good', '', 'keep']] }] },
      vcap: 'If Tracking does not trust a platform’s count, Results judges that platform on clicks and cost. A week that turns worse on a platform makes Results run again on that platform’s campaigns.' },

    { about: ['runreach'], kicker: 'The Search terms and reach module',
      head: 'Search terms and reach asks if the right people see each campaign, and it reads only what is new since its last answer',
      visual: { type: 'gate', rows: [
        ['Its searches, keywords, places and devices', 'And on Meta its audiences, placements, regions and ages.', 'pass'],
        ['The judged searches', 'It reads the verdicts that the search-term judging kept.', 'pass'],
        ['Each negative or keyword', 'It gives each one exactly, tested against the searches that bought.', 'pass'],
        ['A paused campaign', 'It proposes nothing there, because a negative on a paused campaign does nothing.', 'stop']],
        end: ['One answer for the campaign, with each change it proposes', 'opus'] },
      vcap: 'In the dry run of Nov 4 this module took about two hours on LA + New York. It found that the keyword music publicity agency had cost $927 since Oct 1 with no lead.' },

    { about: ['runads'], kicker: 'The Ads and pages module',
      head: 'Ads and pages asks if each campaign’s ads and pages are strong, and it puts an offer that ends soon first',
      visual: { type: 'flow', rows: [
        { title: 'What it reads', steps: [
          ['The ads, their assets and their end dates', '', 'code'],
          ['The real pages, not their names, and the feed', '', 'code']],
          end: [['What a fix costs, and what it buys', '', 'opus']] },
        { title: 'C2’s LA + New York, Nov 4', steps: [
          ['The Core ad promises a free consultation', 'that no page offers', 'block'],
          ['The homepage loads in 4.8 seconds on phones', '', 'block']],
          end: [['A problem, with 8 proposals', '', 'block']] }] },
      vcap: 'On Meta an ad cannot be edited, so a fix is a new ad. We took the second row from the answer that Ads and pages wrote for C2 in the dry run of Nov 4.' },

    { about: ['rundecide'], kicker: 'The Decide module',
      head: 'Decide reads every fresh answer, puts all the work in one order, and keeps only what a person must settle',
      visual: { type: 'gate', rows: [
        ['What has a deadline, or what we owe', 'It comes first.', 'pass'],
        ['Then the money', 'Each proposal ranks by what it is worth a month.', 'pass'],
        ['Two modules propose the same thing', 'Decide merges them into one.', 'pass'],
        ['Each case that waits on a person', 'It keeps the ones that still need that person, in order, and settles the rest with why.', 'hold'],
        ['Each change that missed its check', 'Keep it, undo it, or try another way.', 'stop'],
        ['Each live campaign', 'Its budget for next week.', 'pass']],
        end: ['One answer that the run carries out, in that order', 'opus'] },
      vcap: 'Decide runs when any module ran that morning, when In motion or Money finds a problem, when the morning’s read failed, or when its own answer is {runFresh} days old. Code refuses an answer that leaves out a case that waits on a person.' },
    { about: ['rundecide'], kicker: 'C2’s answer of Nov 4',
      head: 'On Nov 4 Decide gave C2 18 proposals and kept 8 questions for Will',
      visual: { type: 'card', title: 'Decide for C2, in the dry run of Nov 4', fields: [
        ['First', 'Send Waylon the checked weekly report for Oct 26 to Nov 1, which waits for Will’s Approve.'],
        ['Then', 'Reply to Waylon’s Nov 4 mail, and tell him that Facebook costs about $30 a day, not $10.'],
        ['The money', 'Keep LA + New York at $150 a day with Isaac’s $7 click cap until the Nov 25 read.'],
        ['For Will', '8 questions, such as whether he will grant the Data Manager sign-in by Nov 14.'],
        ['What would prove it wrong', 'Waylon marks two of the three leads from Meta’s form as good.']],
        stamp: ['18 proposals', 'opus'] },
      vcap: 'The run’s report then listed 7 things that wait on Will, against 6 after C2’s old run that morning. The design calls a module run that gives Will more questions than the old run a failure.' }
  ],

  examples: {
    START: { tag: 'real', rows: [{ steps: [['C2’s time is 7:00 AM', '', 'code'], ['Nov 4, 7:00 AM', 'run #250 opens on Will’s desktop', 'code']], end: [['It is the old kind of run, with no modules', 'the module run was not merged yet', 'code']] }], note: 'This is from C2’s runs in Barbara. It was C2’s last run that the clock started, and on Nov 8 all 14 client runs are off.' },
    PULL: { tag: 'real', rows: [{ steps: [['C2, Nov 4, 11:22 PM', 'the dry run on a copy of Barbara', 'code'], ['Code pulls the accounts and scores the follow-ups', 'in about a minute', 'code']], end: [['11 flags for the day', '8 of them follow-ups that are due', 'code']] }], note: 'This is from C2’s dry run of Nov 4, which ran on a copy of Barbara and changed nothing.' },
    MOTION: { tag: 'real', rows: [{ steps: [['11:25 PM', 'code makes In motion’s list for C2', 'code']], end: [['No problem', '3 tests run, 6 questions wait on a person, 30 people’s changes, and 1 follow-up is due', 'keep']] }], note: 'This is from C2’s dry run of Nov 4, which ran on a copy of Barbara and changed nothing.' },
    MONEY: { tag: 'real', rows: [{ steps: [['11:25 PM', 'Meta spends $14.82 a day', 'code']], end: [['Money finds a problem', 'a whole month at that rate is $444.60, past Meta’s $200 cap', 'block']] }], note: 'This is from C2’s dry run of Nov 4, which ran on a copy of Barbara and changed nothing.' },
    DUE: { tag: 'real', rows: [{ steps: [['Money finds a problem with Meta’s spend', '', 'block']], end: [['So Decide runs after the 18 module helpers answer', '', 'opus']] }], note: 'This is from C2’s dry run of Nov 4. Code listed 2 modules for the whole account and 16 for the campaigns.' },
    QUIET: { tag: 'made', rows: [{ steps: [['Nothing new came in', '', 'code'], ['Neither In motion nor Money finds a problem', '', 'code']], end: [['No module runs', 'the run does only its case work and paperwork', 'keep']] }], note: 'We made this up from code’s own test of a quiet morning on C2’s campaigns, because no live morning has run yet.' },
    TRACK: { tag: 'real', rows: [{ steps: [['A test of Tracking on C2, Nov 1', '', 'opus']], end: [['Google’s lead count is right from Oct 1, but Meta’s count is not', 'two tags send each lead twice', 'block']] }], note: 'This is Tracking’s answer in a test of Nov 1. On Nov 4 that test answer still counted, so Tracking did not run that night.' },
    CLIENT: { tag: 'real', rows: [{ steps: [['The client module, 11:55 PM', '81 quotes, each with its source', 'opus']], end: [['Waylon wants Google to grow only on good leads near $500 each', 'and his Nov 4 mail asks what one organic lead means', 'will']] }], note: 'The client module wrote this answer for C2 on Nov 4, in a dry run on a copy of Barbara, so nothing changed.' },
    SETUP: { tag: 'real', rows: [{ steps: [['Setup and market, 11:45 PM', '', 'opus']], end: [['The account can run, but Google’s auto-apply is still on', 'and the homepage takes 15 seconds to show in Google’s phone test', 'block']] }], note: 'Setup and market wrote this answer for C2 on Nov 4, in a dry run on a copy of Barbara, so nothing changed.' },
    JUDGE: { tag: 'real', rows: [{ steps: [['C2, Nov 4, 11:24 PM', 'the run asks the verifiers’ older search-term review', 'code']], end: [['No search to judge', 'all 253 searches that cost money in 90 days already had a verdict', 'keep']] }], note: 'This is from C2’s dry run of Nov 4. The verifiers’ older review is on for 52 clients, and it is off for C2 and ADI since Nov 8. The search term module on this map will do this step once Jacob accepts the code change that waits for him.' },
    RESULTS: { tag: 'real', rows: [{ steps: [['Results on C2’s Brand campaign', '', 'opus']], end: [['Good', 'it shows on 77% of searches for C2’s name, and both October leads were good', 'keep']] }], note: 'Results wrote this answer for C2 on Nov 4, in a dry run on a copy of Barbara, so nothing changed.' },
    REACH: { tag: 'real', rows: [{ steps: [['Search terms and reach on LA + New York', 'about two hours', 'opus']], end: [['A problem', 'music publicity agency cost $927 since Oct 1 with no lead', 'block']] }], note: 'Search terms and reach wrote this answer for C2 on Nov 4, in a dry run on a copy of Barbara, so nothing changed.' },
    ADS: { tag: 'real', rows: [{ steps: [['Ads and pages on LA + New York', '', 'opus']], end: [['A problem', 'the Core ad promises a free consultation that no page offers', 'block']] }], note: 'Ads and pages wrote this answer for C2 on Nov 4, in a dry run on a copy of Barbara, so nothing changed.' },
    BIDS: { tag: 'real', rows: [{ steps: [['Bid and budget on C2’s Competitor campaign', '', 'opus']], end: [['A problem', '10 of its 41 clicks cost $8 to $19 each, so it proposed the planned $7 cap on each click', 'block']] }], note: 'Bid and budget wrote this answer for C2 on Nov 4, in a dry run on a copy of Barbara, so nothing changed.' },
    DECIDE: { tag: 'real', rows: [{ steps: [['Decide, 2:48 AM', 'it read every fresh answer', 'opus']], end: [['18 proposals and 8 questions for Will', 'the weekly report for Waylon first', 'opus']] }], note: 'Decide wrote this answer for C2 on Nov 4, in a dry run on a copy of Barbara, so nothing changed.' },
    DO: { tag: 'made', rows: [{ steps: [['A run raises KDX’s target from $42 to $60', 'with no Approve from Will', 'code'], ['Will’s own test holds the same campaign and kind', 'case #20', 'will']], end: [['Code stops it, so it waits', '', 'block']] }], note: 'We made this from KDX’s real cases #196 and #20 of Oct 31. That change went out then, because the limits in code did not exist yet.' },
    END: { tag: 'real', rows: [{ steps: [['3:36 AM', 'Jev asks the run to carry out 17 items of Decide’s answer', 'code'], ['4:03 AM', 'the run says that a dry run changes nothing', 'code']], end: [['The tab closes', 'with no look back, as for every dry run', 'keep']] }], note: 'This is from C2’s dry run of Nov 4, which ran on a copy of Barbara and changed nothing.' }
  },

  reviewed: { self: '5cfb7616', on: '2026-11-08' }
});
