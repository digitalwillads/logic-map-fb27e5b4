// The client: step 1 of Barbara's daily client run, with the question "What does the client want, and what did they
// last say?" (comm-chat src/modules/mod.rs:139-154). Will, 2026-11-07, calls it "how the client is feeling". It answers
// for the whole account, needs no other answer, and is one of the four account answers that the campaign modules and
// Decide need (mod.rs:119, ACCOUNT_FACTS). Mapped as it works today; live keeps module runs off since Nov 7
// (docs/claude-code-bridge-setup.md:2254-2263). Sources: day.rs, brief/, chat/tools/module_tools.rs,
// client_profile/client_words.rs, the verifiers' verify/src/modules.rs, answer 44 (C2, Nov 1).
LOGIC.flow({
  id: 'client',
  title: 'The client module', short: 'Client module', status: 'Built; off in live until Will says yes',
  head: 'The client module: what does the client want, and what did they last say?',
  chart: [
    'flowchart TB',
    'MORN(["A client’s morning:<br/>step 0 of the module run"]):::code',
    'PTEST(["Or a person tests it<br/>from Validators → Modules"]):::will',
    'DUE{"Is The client due?<br/>The client wrote or called,<br/>a blank strategy page,<br/>or {clientFresh} days"}:::code',
    'QUIET(["Not due: no subagent.<br/>Its last answer stands"]):::code',
    'BRIEF["Code builds the brief:<br/>the strategy page, targets,<br/>newest words, calls"]:::code',
    'OPUS["Opus reads mail, calls,<br/>Slack and files, and<br/>writes one answer"]:::opus',
    'CHK["Opus runs the check:<br/>inbox, meetings and<br/>CRM goals"]:::will',
    'SAVE{"Code checks the answer<br/>before it saves"}:::code',
    'QUO{"Code reads each quote<br/>at its source"}:::code',
    'NO(["Refused: nothing saves.<br/>Opus fixes it and<br/>calls again"]):::code',
    'SAVED["Saved: one answer<br/>for the whole account"]:::code',
    'NEEDS(["Four campaign modules<br/>and Decide need it under<br/>{clientFresh} days old"]):::code',
    'MOTION(["In motion lists<br/>its summary"]):::code',
    'TEST(["Tomorrow’s brief<br/>tests it first"]):::code',
    'DRAFT(["A blank strategy page:<br/>the main thread drafts it<br/>from this answer"]):::code',
    'MORN --> DUE', 'DUE -- no --> QUIET', 'DUE -- yes --> BRIEF', 'PTEST -- "no due check" --> BRIEF', 'BRIEF --> OPUS', 'OPUS --> CHK', 'CHK --> SAVE',
    'SAVE -- "shape, fixes, run:<br/>all pass" --> QUO', 'SAVE -- "a refusal" --> NO', 'QUO -- "a refusal" --> NO', 'NO -. again .-> SAVE',
    'QUO -- "all pass,<br/>then Jev reads" --> SAVED',
    'SAVED --> NEEDS', 'SAVED --> MOTION', 'SAVED --> TEST', 'SAVED --> DRAFT'
  ],
  links: { MORN: 'clientline', PTEST: 'clienttest', DUE: 'clientdue', BRIEF: 'clientbrief', OPUS: 'clientsays', CHK: 'clientchecks', SAVE: 'clientanswer', QUO: 'clientquotes', NEEDS: 'clientneeds', MOTION: 'clientmotion', DRAFT: 'clientdraft' },
  leaves: {
    clientline: 'One line for one subagent',
    clienttest: 'A module test',
    clientsays: 'What the answer must give',
    clientneeds: 'Who waits for it',
    clientmotion: 'In motion lists its summary',
    clientdraft: 'A blank page: the main thread drafts it'
  },

  // Each slide belongs to one view: the module's own slides first, then one for each of its rules.
  deck: [
    { about: ['clientline'], kicker: 'One line, one subagent',
      head: 'Step 0 writes one line for The client, and the line is the subagent’s whole prompt',
      visual: { type: 'card', title: 'The line step 0 writes for The client (C2)', fields: [
        ['The line', '- The client on the whole account: call module_brief with module client, client_id 13, target "" and thread <thread>, and follow it.'],
        ['When', 'Step 1, all at once, with Tracking and Setup and market'],
        ['Who answers', 'one subagent on the run’s own model: Opus'],
        ['What it may write', 'only write_module_answer: it changes nothing']], stamp: ['Its brief tells it the rest', 'code'] },
      vcap: 'It needs no other module’s answer, so it runs in the first step. In motion and Money answer before it, at step 0, by code.',
      quote: ['What if I make the checking system modular?', 'Oct 31'] },
    { about: ['clienttest'], kicker: 'A module test',
      head: 'Today a person starts every run of The client, as a test that changes nothing',
      visual: { type: 'flow', rows: [
        { title: 'Validators → Modules: The client on one client', steps: [['First', 'the stale account modules, one by one', 'code'], ['Then', 'one subagent on the whole account', 'opus']], end: [['One answer', 'it does not stand: the module stays due', 'code']] },
        { title: 'C2, Nov 1', steps: [['A test of The client', '', 'will'], ['Opus reads mail, calls and texts', '', 'opus']], end: [['Answer 44', 'a problem', 'block']] }] },
      vcap: 'A test asks no due question. Its opening says: change nothing, call no change tool, send nothing. Every real answer on these slides came from a test, as live keeps the morning’s module run off.' },
    { about: ['client'], kicker: 'Why modules',
      head: 'One long thread missed things, so each question gets a fresh reader, at about twice the cost',
      visual: { type: 'bars', max: 380, rows: [
        { label: 'C2’s full run #250: one Opus thread', parts: [[192, 'opus', '192M tokens']] },
        { label: 'C2’s module dry run 260, on a local copy', parts: [[380, 'opus', '380M tokens']] }] },
      vcap: 'Tokens read, Nov 4. Live keeps module runs off until Will tests them and says yes to the cost.',
      stats: [['$70', 'C2’s full run #250, at API prices', 'real'], ['54', 'subagent threads in dry run 260', 'real'], ['about 4.5 h', 'the length of dry run 260', 'real']],
      quote: ['no I don\'t worry about cost. I worry about it being done right', 'Oct 31'] },
    { about: ['client'], kicker: 'The modules plan · Oct 31',
      head: 'The plan Will read gave The client its question, its runs, its brief, its checks and its answer',
      visual: { type: 'card', title: 'The client, in the plan of Oct 31', fields: [
        ['Question', 'What does the client want, and what did they last say?'],
        ['Runs', 'When mail, a call or a Slack message comes in, or 7 days pass.'],
        ['Brief', 'The strategy page, the newest mail and calls, the client’s own tracker if it keeps one.'],
        ['Checks', '27: inbox, meetings, CRM.'],
        ['Answer', 'What they want now. Their newest word, with its date. What we told them. What we owe them. Who says yes first.'],
        ['Tests', 'C2: “do the same again”. Bull: Tyler’s $40. Kogalla: the battery date.']], stamp: ['Built that night', 'code'] },
      vcap: 'The code follows the plan with one gap: no Slack message makes it due. A blank strategy page became a second reason on Nov 4.',
      quote: ['Build them all so I can start testing and clearing each module', 'Oct 31'] },
    { about: ['client'], kicker: 'Status',
      head: 'Built and tested on three clients; live keeps it off until Will says yes',
      visual: { type: 'timeline', items: [
        ['Oct 31', 'Will reads the plan. The modules and the answer’s shape are built that night.'],
        ['Nov 1, about 4 AM ET', 'Tests on Bull Legal, Kogalla and C2. C2’s answer 44 saves.'],
        ['Nov 1, 10:13 AM ET', 'Each fix must say its effect, Jev reads each fix, and a quote names its kind: mail, call, case reply or text.'],
        ['Nov 2', 'The checks ask no AI judge: each Jev check becomes a question for Opus.'],
        ['Nov 4', 'Module runs replace the morning run. Dry runs 259 and 260 run C2 on a local copy.'],
        ['Nov 6', 'An answer is held to the verifiers’ newest module run. PR #136 merges.'],
        ['Nov 7', 'Live keeps module runs off until Will tests them and says yes to the cost.']] },
      quote: ['we should just run it yes?', 'Nov 4'] },
    { about: ['client'], kicker: 'A real answer · C2 · Nov 1',
      head: 'Answer 44: what Waylon wants, his newest word, what we told him and what we owe him',
      visual: { type: 'card', title: 'Answer 44: The client on C2, verdict problem', fields: [
        ['What he wants', 'More budget that brings real leads, at about $500 a conversion; remarketing to site visitors; his SEO list, with his OK on visible changes; a page that shows where leads come from'],
        ['His newest word', 'Waylon, Oct 30, by mail: “Can you send me the invite?” Texts later that day asked about the call.'],
        ['What we told him', 'Oct 27: remarketing shows only to site visitors, at about $10 a day. Not true on Nov 1.'],
        ['What we owe him', 'The weekly report, the sources page, a true word on remarketing, his OK on 7 website changes'],
        ['Who says yes', 'Waylon OKs each change to the site’s looks or words. Will’s hold: every write waits for Will.']], stamp: ['17 proof lines · 60 quotes · 5 fixes', 'opus'] },
      vcap: 'It saved at about 4 AM ET, from a module test, before the rules of 10:13 AM.',
      stats: [['60', 'quotes, each found in its source', 'real'], ['5', 'fixes, each on an open case', 'real'], ['12', 'checks, answered in words', 'real']] },

    { about: ['clientsays'], kicker: 'What the answer must give',
      head: 'The words ask for five things; how the client feels is not one of them',
      visual: { type: 'gate', rows: [
        ['What they want now, in their words', 'each with who and when', 'pass'],
        ['Their newest word on each live campaign', 'for or against what we do', 'pass'],
        ['What we told them', '', 'pass'],
        ['What we owe them', '', 'pass'],
        ['Who says yes before a change', '', 'pass'],
        ['How they feel about our work', 'no line of the words asks it', 'hold']], end: ['One answer in the fixed shape', 'opus'] },
      vcap: 'The newest word on each campaign, for or against, comes closest to a feeling. Answer 44 gave all five for C2. Two more lines steer how it reads: quote whole sentences, and read what a word means in its call.',
      quote: ['have it do the bid code and the how the client is feeling in the same way so I can audit them both tomorrow', 'Nov 7'] },
    { about: ['clientneeds'], kicker: 'Who waits for it',
      head: 'Five modules stop until The client has an answer under {clientFresh} days old',
      visual: { type: 'flow', rows: [
        { title: 'A fresh answer', steps: [['The client’s answer', 'under {clientFresh} New York days old', 'opus']], end: [['Results', 'each campaign', 'code'], ['Search terms and reach', 'each campaign', 'code'], ['Ads and pages', 'each campaign', 'code'], ['Bid and budget', 'each campaign', 'code'], ['Decide', 'the whole account', 'code']] },
        { title: 'No fresh answer', steps: [['A campaign module’s brief', '“WAIT: The client has no answer from the last {clientFresh} days. Stop here.”', 'code']], end: [['write_module_answer refuses it', 'nothing saves', 'block']] }] },
      vcap: 'Their wait counts any answer, a test’s too; the day’s list does not. Bull, Nov 1: answer 39 read “the client module says Tyler wants a few Hedge Funds and PE form leads a month”.' },
    { about: ['clientmotion'], kicker: 'In motion reads it',
      head: 'In motion lists The client’s whole summary as “What we told the client”',
      visual: { type: 'timeline', items: [
        ['Step 0', 'In motion answers by code. C2, Nov 1, answer 3: “What we told the client is not listed: The client has no answer yet.”'],
        ['Step 1', 'The client answers: answer 44.'],
        ['Later tests that day', 'In motion answers 46, 47 and 49 list answer 44’s whole summary under “What we told the client”.']] },
      vcap: 'In motion runs before The client, so it reads the answer of an earlier morning. The summary says what Waylon wants, not only what we told him: the answer has no field for what we told the client.' },
    { about: ['clientdraft'], kicker: 'A blank strategy page',
      head: 'The client answers first; then the main thread drafts the page from that answer',
      visual: { type: 'flow', rows: [
        { title: 'The module run', steps: [['A blank page, Will never asked', 'an item each morning', 'code'], ['The client is due', 'the strategy page is blank', 'opus'], ['Case work: draft the page', 'the main thread reads no raw data', 'code']], end: [['propose_client_strategy checks each want', 'the client’s own words, whole sentences', 'code']] },
        { title: 'When the draft passes', steps: [['Barbara sets the page at once', 'by rule', 'code']], end: [['One notice tells Will what changed', '', 'will']] }] },
      vcap: 'Before module runs, morning looks drafted pages the same way: Affordable Tree Service’s page came from run #239’s draft, and AAFE’s from run #241’s. The draft check reads who said each want; an answer’s quote check does not.',
      quote: ['can we automatically set and update the stratagy pages? Just have it as a notification in the cases that there was a change. It is so much more likely that a human doesn\'t do the job than a robot will make a mistake', 'Nov 1'] }
  ],

  examples: {
    MORN: { tag: 'made', rows: [{ steps: [['C2’s morning', 'step 0: module_brief with day true', 'code'], ['What is due today', 'one line for each subagent', 'code']], end: [['The client on the whole account', 'one subagent', 'opus']] }], note: 'No live morning has run a module run: live keeps it off since Nov 7. Dry runs 259 and 260 ran C2 on a local copy on Nov 4; no record of their due list was read here.' },
    PTEST: { tag: 'real', rows: [{ steps: [['C2, Nov 1', 'a module test of The client', 'will'], ['One subagent on the whole account', 'no due question', 'opus']], end: [['Answer 44', 'a problem', 'block']] }], note: 'C2, Nov 1: a module test saved answer 44. A test changes nothing, and its answer does not stand, so the module stays due.' },
    DUE: { tag: 'made', rows: [{ steps: [['Waylon, Nov 4, 4:43 PM', '“Wow so what does this mean? Non ads conversion?”', 'will'], ['A mail from the client that still waits', 'C2’s brief of Nov 7 lists it as new', 'code']], end: [['Due: the client wrote or called', '', 'opus']] }], note: 'The mail is real, and C2’s brief of Nov 7 lists it. No morning run took this path: live keeps module runs off.' },
    QUIET: { tag: 'made', rows: [{ steps: [['A real answer from yesterday', 'no mail or call since, the page written', 'code'], ['Is The client due?', 'no reason fits', 'code']], end: [['No subagent: its last answer stands', '', 'code']] }], note: 'No real case: no live morning has run a module run. The code’s test of a quiet morning takes this path.' },
    BRIEF: { tag: 'real', rows: [{ steps: [['C2, Nov 7', 'module_brief for The client', 'code'], ['The brief', 'the strategy page by Will, 4 targets, 1 rule, 3 addresses, 6 calls', 'code']], end: [['What is new: Waylon’s mail of Nov 4 and Isaac’s changes', '', 'code']] }], note: 'C2’s brief of Nov 7 (module_brief, client 13). It opens with what answer 44 said would prove it wrong.' },
    OPUS: { tag: 'real', rows: [{ steps: [['Opus, Nov 1', 'mail in two team mailboxes, 5 recorded calls, the C2 Ads texts, the lead app', 'opus'], ['One answer', 'verdict problem, 17 proof lines, 60 quotes, 5 fixes', 'opus']], end: [['Answer 44', 'The client on the whole account', 'code']] }], note: 'C2, Nov 1, answer 44, from a module test. It read Waylon’s texts on Will’s computer and quoted none of them.' },
    CHK: { tag: 'real', rows: [{ steps: [['verify module client, C2', 'Nov 1, 3:34 AM ET, 77.4 s', 'will'], ['Inbox, meetings, CRM', 'each run once: none had a run that day', 'will']], end: [['8 failed, 3 could not check, 5 passed', '', 'will']] }], note: 'Run folder 2026-11-01T083453-c2-management, in the verifiers’ state/modules/client/runs.' },
    SAVE: { tag: 'real', rows: [{ steps: [['write_module_answer, C2', 'Nov 1, about 4 AM ET', 'opus'], ['Code’s checks', 'the shape, plain words, a fix for the problem', 'code']], end: [['They pass', 'no module run was pushed then, so none held it', 'code']] }], note: 'Answer 44, C2, Nov 1. It saved before the rules of 10:13 AM, so its fixes have no effect line and its quotes no kind.' },
    QUO: { tag: 'real', rows: [{ steps: [['60 quotes', '18 from mail, 42 from calls', 'opus'], ['Code reads each source once', 'the mail as the mail tools read it, and the transcript', 'code']], end: [['All 60 checked', '', 'code']] }], note: 'Answer 44, C2, Nov 1.' },
    NO: { tag: 'real', rows: [{ steps: [['“Anything that changes looks or words, Will to submit for approval”', 'Waylon’s mail of Oct 21 bolds the line', 'will'], ['The quote starts after the two bold marks', 'code reads that as the middle of a sentence', 'code']], end: [['Refused as a cut sentence: nothing saves', '', 'code']] }], note: 'C2, Nov 1 (the note in client_words.rs). Answer 44 then quoted the line with its bold marks, which passed. Since 10:13 AM that day, code leaves bold and code marks out.' },
    SAVED: { tag: 'real', rows: [{ steps: [['Answer 44', 'The client on the whole account, Nov 1', 'code'], ['Verdict: problem', '“Waylon wants more budget that brings real leads …”', 'code']], end: [['In the store for the next modules', '', 'code']] }], note: 'C2, Nov 1. The Modules page shows it to Will with Right or Wrong.' },
    NEEDS: { tag: 'real', rows: [{ steps: [['Bull’s client answer', 'Nov 1: Tyler wants a few Hedge Funds and PE leads a month', 'code'], ['Search terms and reach on Hedge Funds & PE', 'answer 39 reads it', 'code']], end: [['Its proof cites “the client module”', '', 'code']] }], note: 'Bull Legal, Nov 1, answer 39. Bull’s brief of Nov 7 names the client answer it read (Nov 1, Problem).' },
    MOTION: { tag: 'real', rows: [{ steps: [['In motion, C2, Nov 1', 'answer 3, before The client answered', 'code'], ['“What we told the client is not listed”', 'The client had no answer yet', 'code']], end: [['Answers 46, 47 and 49: answer 44’s whole summary', 'under “What we told the client”', 'code']] }], note: 'C2, Nov 1: In motion answers 3, 46, 47 and 49.' },
    TEST: { tag: 'real', rows: [{ steps: [['Answer 44 said', '“Isaac’s or Will’s account of the Oct 30 call …” would prove it wrong', 'code'], ['C2’s brief of Nov 7', 'opens with it', 'code']], end: [['Test it first, from today’s data', '', 'opus']] }], note: 'C2, the brief of Nov 7, and answer 44.' },
    DRAFT: { tag: 'made', rows: [{ steps: [['A blank strategy page', 'Will never asked for it', 'code'], ['The client answers', 'due: the strategy page is blank', 'opus']], end: [['The main thread drafts the page from that answer', 'propose_client_strategy', 'code']] }], note: 'No module run has taken this path. Morning looks did the same job before module runs: Affordable Tree Service’s page and AAFE’s were set by rule from the drafts of runs #239 and #241.' }
  },

  reviewed: { self: '05476235', on: '2026-11-07' }
});
