// Bid and budget: one module of Barbara's daily client run (comm-chat src/modules/mod.rs:250-268, BIDS). Its question:
// "Is the bid right, and what would more or less money do?" Will calls it "the bid code". It answers each campaign, after
// the four account modules. Mapped as it works on 2026-11-07 (comm-chat main). Live keeps the module run off since #136
// merged on Nov 7, until Will tests it and says yes to its cost (docs/claude-code-bridge-setup.md:2254-2263).
// Sources for each box: HANDOFF-bids-client.md.
LOGIC.flow({
  id: 'bids',
  title: 'The bid and budget module', short: 'Bid and budget module', status: 'Built; off in live until Will says yes',
  head: 'The bid and budget module: is the bid right, and what would more or less money do?',
  chart: [
    'flowchart TB',
    'DAY(["The morning\'s module run<br/>lists what is due"]):::code',
    'TEST(["Or a person tests it:<br/>the stale account modules<br/>answer first"]):::will',
    'DUE{"Is Bid and budget due<br/>on this campaign?"}:::code',
    'QUIET(["Not due: no subagent,<br/>its last answer stands"]):::code',
    'NEEDS{"Four account answers,<br/>each under {bidFresh} days old?"}:::code',
    'WAIT(["The brief says WAIT:<br/>no answer can save"]):::code',
    'BRIEF["Code builds the brief from<br/>stored tables: numbers, reads,<br/>failed checks, memory"]:::code',
    'CHECK["The bids check runs<br/>on this campaign and<br/>goes to Barbara"]:::will',
    'ANSWER["Opus answers: keep, raise,<br/>cut or too few to tell"]:::opus',
    'RULES{"Do code\'s rules pass?"}:::code',
    'SAVED["One answer is saved<br/>for this campaign"]:::code',
    'DECIDE(["Decide weighs its proposals,<br/>the most money first"]):::opus',
    'NEXT(["Tomorrow\'s brief tests what<br/>would prove it wrong"]):::code',
    'DAY --> DUE', 'DUE -- no --> QUIET', 'DUE -- yes --> NEEDS', 'TEST -- "no due check" --> NEEDS',
    'NEEDS -- no --> WAIT', 'NEEDS -- yes --> BRIEF',
    'BRIEF --> CHECK', 'CHECK --> ANSWER', 'ANSWER --> RULES',
    'RULES -. "no: refused,<br/>it tries again" .-> ANSWER',
    'RULES -- yes --> SAVED', 'SAVED --> DECIDE', 'SAVED --> NEXT'
  ],
  links: { DAY: 'bidday', TEST: 'bidtest', DUE: 'biddue', NEEDS: 'bidneeds', WAIT: 'bidneeds', BRIEF: 'bidbrief', CHECK: 'bidchecks', ANSWER: 'bidanswer', RULES: 'bidanswer', DECIDE: 'biddecide', NEXT: 'bidnext' },
  leaves: {
    bidday: "The morning's module run",
    bidtest: 'A module test',
    bidneeds: 'Four fresh account answers',
    biddecide: 'Decide and the run',
    bidnext: "Tomorrow's brief, and Will's mark"
  },

  // Each slide belongs to one view: the module's own slides first, then one or more for each of its rules.
  deck: [
    { about: ['bids'], kicker: 'Its place',
      head: 'Bid and budget runs beside three other campaign modules, and it reads only four account answers',
      visual: { type: 'flow', rows: [
        { title: 'The account', steps: [['Code answers first', 'In motion and Money', 'code']], end: [['Tracking', 'one subagent each, all at once', 'code'], ['The client', '', 'code'], ['Setup and market', 'not one of its needs', 'code']] },
        { title: 'Each campaign, all at once', steps: [['The account answers', 'one line each', 'code']], end: [['Results', '', 'code'], ['Search terms and reach', '', 'code'], ['Ads and pages', '', 'code'], ['Bid and budget', 'needs Tracking, The client, In motion and Money', 'opus']] },
        { title: 'Then', steps: [['Decide', 'reads every fresh answer', 'opus']], end: [['The run makes the changes', 'inside the walls and the box', 'code']] }] },
      vcap: 'The four campaign modules run at the same time, so Bid and budget never reads the Results answer on the same campaign. It reads each account answer as one line.',
      quote: ['What if I make the checking system modular?', 'Oct 31'] },
    { about: ['bids'], kicker: 'Three real answers · Nov 1',
      head: 'Follow three real Bid and budget answers from the tests of Nov 1',
      lede: 'Pick a campaign. Watch what the brief gave, and what Opus said.',
      visual: { type: 'journey', runs: [
        { name: 'C2 · Competitor', out: 'keep', steps: [
          ['A test of the module', 'Nov 1: one subagent for each campaign.'],
          ['The brief', 'Maximize clicks, $10 a day, no click ceiling: 33 clicks in 25 days, no lead.'],
          ['The simulator', 'From $10 to $199.31 a day: $1,738 for each added conversion, 3.5 times the $500 guide.'],
          ['Rank or budget?', 'It lost 44.9% of its searches to budget and 16.6% to rank.'],
          ['The answer', 'Too few to tell: keep it at $10 a day. Propose a cut if no lead comes by about $500 spent.']] },
        { name: 'Kogalla · PMax', out: 'wait', steps: [
          ['A test of the module', 'Nov 1.'],
          ['The brief', 'Its strategy page says break-even is a 167% return at a 60% margin.'],
          ['The numbers', 'It returned 124% on its 300% target in the 30 days to Oct 24.'],
          ['The simulator', 'More money would return only 122%.'],
          ['The answer', 'A problem: cut. The cut to $16 a day already waits on Will, so it proposes nothing new.']] },
        { name: 'Bull · Securities', out: 'unclear', steps: [
          ['A test of the module', 'Nov 1.'],
          ['The brief', 'Manual bids of $8 since Oct 13: 3 form leads at $383.70 each.'],
          ['Rank or budget?', 'It lost about half its searches to budget and 39% to rank.'],
          ['The simulator', 'Google has no simulation for this campaign.'],
          ['The answer', 'Too few to tell. It proposes nothing: Will holds $65 a day until Nov 11, and its page changed under 72 hours before.']] }
      ] },
      vcap: 'C2 is answer 53. The other two are the last answers that their briefs of Nov 7 show.' },
    { about: ['bids'], kicker: 'Status',
      head: 'Built and merged, but live keeps it off until Will says yes to its cost',
      visual: { type: 'timeline', items: [
        ['Oct 31', 'Will: "Build them all so I can start testing and clearing each module."'],
        ['Nov 1', 'Tests on Kogalla, Bull and C2: 12 runs of the bids check, and the module\'s first answers.'],
        ['Nov 1', 'Bull\'s Hedge Funds answer finds a problem and proposes nothing. Will: "a problem should always name a fix".'],
        ['Nov 2', 'Meta\'s method joins the words: C2\'s Meta brief had said to price a raise from Google\'s simulator.'],
        ['Nov 3', 'The bids check on C2\'s Meta campaign: no goal judges it.'],
        ['Nov 4', 'Will: "we should just run it yes?" A dry module run of C2, on a copy, reads about twice a full run\'s tokens.'],
        ['Nov 7', 'The module run merges. Live keeps it off until Will tests it and says yes to its cost.']] },
      stats: [['380M', 'tokens the dry module run of C2 read (Nov 4)', 'real'], ['192M', 'tokens C2\'s last full run read (Nov 4)', 'real']] },
    { about: ['bids'], kicker: 'What the answers proposed',
      head: 'None of the four answers proposed a change: each waited on a person or on time',
      visual: { type: 'dots', groups: [[2, 'wait', 'too few to tell'], [2, 'block', 'a problem']] },
      table: { head: ['Campaign', 'Verdict', 'What it said', 'It waited on'], rows: [
        ['C2 · Competitor', 'too few to tell', 'keep $10 a day', 'about $500 spent, near Nov 24'],
        ['Bull · Securities', 'too few to tell', 'hold $65 a day', "Will's hold until Nov 11"],
        ['Bull · Hedge Funds & PE', 'problem', 'keep the $15 bid and $45 a day', "Tyler's budget call after the review"],
        ['Kogalla · PMax', 'problem', 'cut', "Will's yes on the cut to $16 a day"]],
        note: 'The four bids answers of Nov 1 that this map read.' },
      vcap: 'A too-few answer may propose nothing. A problem must now propose its fix, and say whom or what the fix waits on.' },

    { about: ['bidday'], kicker: "The morning's module run",
      head: 'Code lists each subagent of the morning, and a quiet morning starts none',
      visual: { type: 'flow', rows: [
        { title: 'Before the modules, in the run\'s own thread', steps: [['act pull', 'the day\'s data', 'code'], ['The checks of the day', 'case follow-ups, billing, the report day', 'will'], ['act search-terms todo', 'the searches to judge', 'code']], end: [['module_brief, day', 'answers In motion and Money, lists each line', 'code']] },
        { title: 'Then', steps: [['The account modules', 'each due one, at once', 'opus'], ['The campaign modules', 'each due one on each campaign, at once', 'opus'], ['Decide', '', 'opus']], end: [['The finish', 'Decide\'s items, then the paperwork', 'code']] }] },
      vcap: 'A quiet morning starts no subagent: only the weekly report when it is due, and the run report.' },
    { about: ['bidday'], kicker: 'One line of the day',
      head: 'Each Bid and budget line is the whole prompt of one subagent',
      visual: { type: 'card', title: 'A Bid and budget line, in the day\'s list', fields: [
        ['Module', 'Bid and budget'],
        ['On', 'one campaign, by its name and id'],
        ['It calls', 'module_brief with module bids, the client and the campaign, then follows the brief'],
        ['Thread', 'the run\'s own, so the answer belongs to the run'],
        ['Model', 'the run\'s own: the latest Opus']], stamp: ['One subagent, never a fork', 'opus'] },
      vcap: 'The run\'s main thread never reads the brief or the raw numbers. It reads the saved answers, then carries out Decide\'s answer.' },
    { about: ['bidtest'], kicker: 'A module test',
      head: 'Today a person starts every run of Bid and budget, as a test that changes nothing',
      visual: { type: 'flow', rows: [
        { title: 'Validators → Modules: Bid and budget on one client', steps: [['First', 'each stale account module, one by one', 'code'], ['Then, all at once', 'one subagent on each campaign of the list', 'opus']], end: [['One answer for each campaign', 'it does not stand: the module stays due', 'code']] },
        { title: 'C2, Nov 1', steps: [['A test of Bid and budget', '', 'will'], ['One subagent on each campaign', '', 'opus']], end: [['Answer 53 on Competitor', 'too few to tell', 'wait']] }] },
      vcap: 'A test asks no due question. Its opening says: change nothing, call no change tool, send nothing. Each real answer on these slides came from a test, as live keeps the morning\'s module run off.' },
    { about: ['bidneeds'], kicker: 'Four fresh account answers',
      head: 'No Bid and budget answer saves while an account answer is missing or {bidFresh} days old',
      visual: { type: 'gate', rows: [
        ['Tracking', 'Nov 1, Good: judge on the form count alone, from May 11', 'pass'],
        ['The client', 'Nov 1, Problem: Tyler wants a few Hedge Funds and PE leads a month', 'pass'],
        ['In motion', 'Nov 1, Good: 0 tests, 19 questions, 18 people\'s changes', 'pass'],
        ['Money', 'Nov 1, Good: the box is shut, Will holds every change', 'pass']], end: ['Fresh through Nov 7; from Nov 8 the brief says WAIT', 'wait', 'Bull, as its briefs of Nov 7 show it'] },
      vcap: 'Code counts New York days, so an answer of Nov 1 is stale on Nov 8. Then the brief stops at the WAIT line, and the save refuses until each answer is fresh.' },
    { about: ['biddecide'], kicker: 'After the answer',
      head: 'Decide ranks every proposal by money, and only the run makes a change',
      visual: { type: 'flow', rows: [
        { steps: [['A bids proposal', 'what, why, effect, waits on, money a month', 'opus'], ['Decide\'s brief', 'every proposal of every fresh answer, the most money a month first', 'code'], ['Decide', 'merges them, puts deadlines first, names next week\'s budget for each live campaign', 'opus']], end: [['The run', 'a case, a plan, the change check', 'code']] },
        { title: 'Bull, Nov 7', steps: [['A raise', 'a budget or a bid', 'code'], ['The box', 'under $5,800 a month, tracking trusted for 2 full weeks', 'will']], end: [['Shut: the month did not read', '', 'will']] }] },
      vcap: 'The split between campaigns is Decide\'s, not Bid and budget\'s. A raise goes out by itself only inside the box and Will\'s switches, and bids stop at the CPA, ROAS and max CPC he approved.' },
    { about: ['bidnext'], kicker: 'The next morning',
      head: 'Tomorrow\'s brief tests today\'s answer first, and Will marks each answer right or wrong',
      visual: { type: 'timeline', items: [
        ['Nov 1', 'Bull\'s Hedge Funds answer saves: a problem, with what would prove it wrong.'],
        ['The next brief', 'It opens: "Your last answer, of 2026-11-01, said this would prove it wrong ... Test it first, from today\'s data."'],
        ['Its last line', 'The last answer\'s verdict and summary, with Will\'s mark and note when he made one.'],
        ['Validators → Modules', 'Will marks each answer Right or Wrong, with a note.'],
        ['A rehearsal', 'A dry run\'s or a module test\'s answer does not count: the module stays due.']] },
      vcap: 'There is no second reader. When the test holds, the next answer must say the last one was wrong, and why.',
      quote: ['on the second run the next day it would catch this again, if something was truly wrong', 'Nov 1'] }
  ],

  examples: {
    DAY: { tag: 'real', rows: [{ steps: [['C2, dry module run 259', 'Nov 4, on a copy of the database', 'code'], ['The day lists each subagent', '', 'code']], end: [['13 campaign subagents at work', 'at its 13th turn', 'opus']] }], note: 'C2\'s dry run 259 of Nov 4, on a copy: it changed nothing. No live morning has run a module yet.' },
    TEST: { tag: 'real', rows: [{ steps: [['C2, Nov 1', 'a module test of Bid and budget', 'will'], ['A subagent on Competitor', 'no due question', 'opus']], end: [['Answer 53', 'too few to tell', 'wait']] }], note: 'C2, Nov 1: a module test saved answer 53. A test changes nothing, and its answer does not stand, so the module stays due.' },
    DUE: { tag: 'made', rows: [{ steps: [['Kogalla PMax', 'a change with no record of who, Nov 4', 'code'], ['Due?', 'a person changed it', 'code']], end: [['Due: one subagent', '', 'opus']] }], note: 'Made from a real item: Kogalla\'s bids brief of Nov 7 lists that change as new. No live morning has read it, since live keeps the module run off.' },
    QUIET: { tag: 'made', rows: [{ steps: [['A quiet morning', 'every module answered a day ago, nothing new', 'code'], ['Due?', 'no', 'code']], end: [['No subagent', 'only the paperwork that is due', 'code']] }], note: 'Made: the module run\'s own test of a quiet morning, on C2\'s campaigns. No live morning has run yet.' },
    NEEDS: { tag: 'real', rows: [{ steps: [['Bull, Nov 7', 'Tracking, The client, In motion, Money: all of Nov 1', 'code'], ['Each under {bidFresh} days?', 'yes', 'code']], end: [['The brief goes on', '', 'code']] }], note: 'Bull\'s bids briefs, read through module_brief on Nov 7.' },
    WAIT: { tag: 'made', rows: [{ steps: [['Bull, Nov 8', 'the four answers turn {bidFresh} days old', 'code'], ['Each under {bidFresh} days?', 'no', 'code']], end: [['WAIT: the brief stops', 'no answer can save', 'code']] }], note: 'Made: this happens from Nov 8, unless the account modules answer again first.' },
    BRIEF: { tag: 'real', rows: [{ steps: [['Bull Hedge Funds & PE', 'Nov 7', 'code'], ['The brief', 'the last answer\'s test, rules, words, needs, numbers, reads, checks, memory', 'code']], end: [['Opus reads it first', '', 'opus']] }], note: 'Bull\'s bids brief for Hedge Funds & PE, read through module_brief on Nov 7. A read changes nothing.' },
    CHECK: { tag: 'real', rows: [{ steps: [['Bull Startups', 'Nov 1', 'code'], ['The bids check', 'on that campaign\'s data of the day', 'will']], end: [['2 failed', 'too few conversions; a $150 bid target against the $300 target', 'block']] }], note: 'Bull, Nov 1: the verifiers\' run 2026-11-01T085955-bull-law.' },
    ANSWER: { tag: 'real', rows: [{ steps: [['C2 Competitor', '33 clicks, no lead', 'code'], ['Opus answers', '', 'opus']], end: [['Too few to tell', 'keep it at $10 a day', 'wait']] }], note: 'C2, Nov 1: answer 53.' },
    RULES: { tag: 'made', rows: [{ steps: [['Bull Hedge Funds & PE', 'a problem, no proposal', 'opus'], ['Code\'s rules', 'a problem names its fix', 'code']], end: [['Refused today', 'nothing saves', 'block']] }], note: 'Made from a real answer: Bull\'s Hedge Funds answer of Nov 1 saved that day, before this rule. The rule\'s test replays it, and code refuses it today.' },
    SAVED: { tag: 'real', rows: [{ steps: [['C2 Competitor', 'too few to tell', 'opus'], ['Saved', 'answer 53', 'code']], end: [['Its next brief shows it as the last answer', '', 'code']] }], note: 'C2, Nov 1: answer 53.' },
    DECIDE: { tag: 'made', rows: [{ steps: [['A bids proposal', 'with its money a month', 'opus'], ['Decide\'s brief', 'the most money first', 'code']], end: [['Decide\'s order', 'deadlines first, then money', 'opus']] }], note: 'Made: the four bids answers this map read propose nothing, so no Decide brief has ranked a bids proposal yet.' },
    NEXT: { tag: 'real', rows: [{ steps: [['Bull Hedge Funds & PE', 'its answer of Nov 1', 'opus'], ['The brief of Nov 7', 'opens with its test', 'code']], end: [['"Test it first, from today\'s data"', '', 'code']] }], note: 'Bull, Nov 7. The test: the firm\'s own leads, searches lost to budget at the $15 bid, a simulator point near $300, or the Nov 11 read.' }
  },

  reviewed: { self: '5978349f', on: '2026-11-07' }
});
