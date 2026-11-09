// Nov 8, 2026: plain-words pass (Will: "The client module needs a run that removes robot speak. Please make this
// intelligable"). Only the words changed, and the logic and every fact stayed the same. The module is "the client module",
// never "The client" alone; C2's answer 44 is "C2's test answer"; the brief is "the fact sheet". check-plain.cjs judges it.
// The client module, rebuilt concept first on 2026-11-07. Will: "It's sound like robot speak. Redo the tracking but break it
// down into the concepts so I can read through it", then, on this module and the bid map, "Redo both the same way after
// Tracking". He asked for this module as "the how the client is feeling" (Nov 7). The logic is the one that works today;
// only its shape and words changed. Sources (comm-chat at c275da71, read 2026-11-07): src/modules/mod.rs:139-154 (its
// question and its instructions), :119 and :207-277 (the five modules that need it), :59 (an answer counts 7 days);
// src/modules/day.rs:108-182 (when it reads), :241-252 (a test's answer does not stand); src/modules/brief/ (what code
// gathers: numbers.rs `client` :500-555, checks.rs, mod.rs `memory_part` :183-196); src/chat/tools/module_tools.rs:483-669
// (the save rules and the quote check); src/client_profile/client_words.rs (the one quote check); src/modules/run.rs (held
// to its client check); src/modules/brief/code.rs:174-177 (In motion lists its summary); src/results/strategy_case.rs (a
// blank page is drafted and set by rule); the verifiers' verify/src/modules.rs:36-39 (the inbox, meetings and CRM trees).
// The run: #136 merged on Nov 6 (4:50 PM Pacific), off in live from Nov 7 (docs/claude-code-bridge-setup.md:2254-2263); the
// cost: the memory note of the Nov 4 dry run and the design's spec :18-24. Real cases, read 2026-11-07: Barbara's client
// answer 44 (C2, Nov 1, read whole); the facts that code gathered for The client on Nov 7 for C2 (13), Bull Legal (2),
// Kogalla (31), KDX (93), Affordable Tree Service (64) and AAFE (42); the verifiers' client runs of Nov 1
// (state/modules/client/runs/); the modules plan of Oct 31 (~/.agent/diagrams/modules-plan-2026-10-31-slides.html).
// The old parts: retired/2026-11-07-client-redo/.
LOGIC.flow({
  id: 'client',
  title: 'The client module', short: 'Client module', status: 'Built; off in live until Will says yes',
  head: 'The client module reads what the client has said, so every module after it knows what the client wants and how they feel',
  chart: [
    'flowchart TB',
    'WHEN(["It reads again when the client<br/>writes or calls, when their<br/>strategy page is blank, or when<br/>its answer is {clientFresh} days old"]):::code',
    'WANT["What does the client want? Their<br/>strategy page, their targets and<br/>their newest words say"]:::opus',
    'FEEL["How do they feel about our work?<br/>Their newest word on each live<br/>campaign shows it"]:::opus',
    'OWE["What did we tell them, what do<br/>we owe them, and who must say<br/>yes before a change?"]:::opus',
    'PROOF["Every point rests on a quote, and<br/>code finds each quote in the<br/>mail or call it came from"]:::code',
    'GOALS["Will’s 27 checks run on the<br/>inbox, the meetings and the<br/>client’s record, and Opus<br/>answers each one that<br/>does not pass"]:::will',
    'CHECK{"Does the answer pass<br/>code’s checks?"}:::code',
    'GIVE(["The modules after it use this<br/>one answer for the whole account<br/>for up to {clientFresh} days"]):::code',
    'WHEN --> WANT', 'WANT --> FEEL', 'FEEL --> OWE', 'OWE --> PROOF', 'PROOF --> GOALS', 'GOALS --> CHECK',
    'CHECK -. "no, so Opus fixes<br/>it and tries again" .-> WANT',
    'CHECK -- yes --> GIVE'
  ],
  links: { WHEN: 'cwhen', WANT: 'cwant', FEEL: 'cfeel', OWE: 'ctold', PROOF: 'cproof', GOALS: 'cgoals', CHECK: 'ccheck', GIVE: 'cgive' },
  leaves: { ctold: 'What we told the client, and what we owe them' },

  // Each slide belongs to one view: the module's own slides first, then the slides of its rule.
  deck: [
    { about: ['client'], kicker: 'The idea',
      head: 'Before we change a client’s ads, we should know what they want and how they feel about our work',
      visual: { type: 'flow', rows: [
        { title: 'C2, in the test of Nov 1', steps: [
          ['Waylon wants more budget, but only if it brings real leads', 'at about $500 a conversion', 'will'],
          ['His newest message only asked for the call link', 'Oct 30', 'will'],
          ['Two things we told him on Oct 27 were no longer true', '', 'block']],
          end: [['So the answer said there was a problem, and gave 5 fixes', 'each on an open case', 'opus']] }] },
      vcap: 'That is the whole module on one client. Opus read Waylon’s mail, his calls and the team’s texts with him. It found each thing he wants in his own words, and it set what we had told him beside what was true. The module only answers, and never changes the account, so each fix went on a case for a person.',
      quote: ['have it do the bid code and the how the client is feeling in the same way so I can audit them both tomorrow', 'Nov 7'] },
    { about: ['client'], kicker: 'What the answer holds',
      head: 'The module’s instructions ask Opus for five things, and the second one comes closest to how the client feels',
      visual: { type: 'gate', rows: [
        ['What they want now, in their own words', 'Each want says who said it and when.', 'pass'],
        ['Their newest word on each live campaign', 'It shows whether they are for or against what we do.', 'pass'],
        ['What we told them', '', 'pass'],
        ['What we owe them', '', 'pass'],
        ['Who must say yes before a change', '', 'pass'],
        ['How they feel about our work', 'The instructions never ask for it by name.', 'hold']],
        end: ['One answer, in the same shape that every module uses', 'opus'] },
      vcap: 'The answer Opus wrote for C2 on Nov 1 gave all five. Two more instructions tell Opus how to read. Opus must quote whole sentences, and it must check what a word meant in the call where it was said.' },
    { about: ['client'], kicker: 'A real answer',
      head: 'C2’s test answer of Nov 1 says what Waylon wants, what he said last, what we told him and what we owe him',
      visual: { type: 'card', title: 'The client module’s answer for C2, Nov 1, a problem', fields: [
        ['What he wants', 'More budget that brings real leads, at about $500 a conversion. Ads that follow people who visited the site. His SEO list done, with his OK before anything visible changes. And a page that shows where each lead comes from.'],
        ['His newest word', 'On Oct 30 he mailed only to ask for the call invite. His texts later that day asked about the call.'],
        ['What we told him', 'On Oct 27 we wrote that remarketing shows only to people who visited the site, at about $10 a day. By Nov 1 that was not true.'],
        ['What we owe him', 'The weekly report, the page that shows where leads come from, a true word on remarketing, and his OK on 7 website changes.'],
        ['Who says yes', 'Waylon OKs every change to how the site looks or reads. And Will has put C2 on hold, so every change waits for Will.']],
        stamp: ['17 facts in its proof, 60 quotes and 5 fixes', 'opus'] },
      vcap: 'Opus wrote it in a test at about 4 AM ET on Nov 1. That was a few hours before three new rules for fixes and quotes came in at 10:13 AM.',
      stats: [['60', 'quotes, and code found each one in its source', 'real'], ['5', 'fixes, each on an open case', 'real'], ['12', 'checks that it answered in words', 'real']] },
    { about: ['client'], kicker: 'Where it runs',
      head: 'The client module runs early in the morning, beside Tracking, because it needs no other module’s answer',
      visual: { type: 'flow', rows: [
        { title: 'First, code answers two modules by itself', steps: [['The In motion and Money modules', 'code answers both, with no AI', 'code']], end: [['Their answers are saved', 'before any Opus starts', 'code']] },
        { title: 'Then the modules about the whole account, side by side', steps: [['Each module that is due gets its own Opus subagent', 'on the run’s own model', 'code']], end: [['Tracking', '', 'opus'], ['The client module', '', 'opus'], ['Setup and market', '', 'opus']] },
        { title: 'Then each campaign, and last the Decide module', steps: [['Results, Search terms and reach, Ads and pages, and Bid and budget', 'each of them needs the client module’s answer', 'opus']], end: [['Decide', 'it reads every fresh answer, the client module’s too', 'opus']] }] },
      vcap: 'The client module’s subagent starts from a fact sheet that code gives it, and then follows it. It can write only its one answer, so it never changes anything in the account.',
      quote: ['What if I make the checking system modular?', 'Oct 31'] },
    { about: ['client'], kicker: 'The plan of Oct 31',
      head: 'The plan Will read on Oct 31 already set the module’s question, when it runs, what it reads, its checks and its answer',
      visual: { type: 'card', title: 'The client module, in the modules plan of Oct 31', fields: [
        ['Its question', 'What does the client want, and what did they last say?'],
        ['When it runs', 'When mail, a call or a Slack message comes in, or 7 days pass.'],
        ['What it reads', 'The strategy page, the newest mail and calls, and the client’s own tracker if they keep one.'],
        ['Its checks', '27 of them, from the inbox, the meetings and the client’s record.'],
        ['Its answer', 'What they want now, their newest word and its date, what we told them, what we owe them, and who says yes first.'],
        ['Its tests', 'C2’s “do the same again”, ETD’s “We will push this until restructure is complete.”, Tyler’s $40 at Bull, and Kogalla’s battery date.']],
        stamp: ['Built that night', 'code'] },
      vcap: 'The code follows the plan with one gap, because a Slack message never makes the module read again. A blank strategy page became a second reason to read again on Nov 4.',
      quote: ['Build them all so I can start testing and clearing each module', 'Oct 31'] },
    { about: ['client'], kicker: 'Why modules',
      head: 'One long Opus thread missed things, so each question now gets its own fresh Opus, at about twice the tokens',
      visual: { type: 'bars', max: 380, rows: [
        { label: 'C2’s full run on Nov 4, in one Opus thread', parts: [[192, 'code', '192M tokens']] },
        { label: 'A test of the module run on a copy of C2, Nov 4', parts: [[380, 'opus', '380M tokens']] }] },
      vcap: 'These are the tokens that each run read on Nov 4. The module run stays off in live until Will tests it and says yes to the cost.',
      stats: [['$70', 'what C2’s full run cost at API prices', 'real'], ['54', 'Opus subagents in that test run', 'real'], ['About 4.5 h', 'how long that test run took', 'real']],
      quote: ["no I don't worry about cost. I worry about it being done right", 'Oct 31'] },
    { about: ['client'], kicker: 'Where it stands',
      head: 'The module is built and tested on three clients, but it stays off in live until Will says yes',
      visual: { type: 'timeline', items: [
        ['Oct 31', 'Will reads the plan, and the modules are built that night, each with the same shape of answer.'],
        ['Nov 1, about 4 AM ET', 'Tests run on Bull Legal, Kogalla and C2, and C2’s test answer is saved.'],
        ['Nov 1, 10:13 AM ET', 'Three new rules come in. Each fix must say what it should change, Jev reads each fix, and each quote says what kind of source it came from.'],
        ['Nov 2', 'Will’s checks stop asking an AI judge, so the questions in them go to Opus.'],
        ['Nov 4', 'Module runs replace the morning run, and two test runs try C2 on a copy of its data.'],
        ['Nov 6', 'Each answer must now answer the newest run of Will’s client checks, and the module run is merged.'],
        ['Nov 7', 'The module run stays off in live until Will tests it and says yes to its cost.']] },
      quote: ['we should just run it yes?', 'Nov 4'] },

    { about: ['ctold'], kicker: 'What we told them',
      head: 'Something we told the client can stop being true, so Opus sets each promise beside what is true today',
      visual: { type: 'flow', rows: [
        { title: 'What Will wrote to Waylon on Oct 27', steps: [['Will’s mail to Waylon', 'Oct 27', 'will']], end: [['Remarketing is on, only for people who visited the site from LA and NY, at about $10 a day', '', 'will'], ['Its leads come into the tracker marked as Meta', '', 'will']] },
        { title: 'What was true on Nov 1', steps: [['Opus reads the ad accounts and the tracker', '', 'opus']], end: [['The campaign for site visitors had been paused since Oct 28', '', 'block'], ['An older campaign for people who engaged on Facebook and Instagram ran at $20 a day', '', 'block'], ['The tracker could not mark where a lead came from', '', 'block']] },
        { title: 'What we owe him now', steps: [['Two promises that are no longer true', '', 'block']], end: [['A true word on remarketing', 'on case #53', 'opus']] }] },
      vcap: 'The test answer found both from our own mail and the ad accounts. No code compares what we told a client with what is true, so Opus does it from what it reads.' },
    { about: ['ctold'], kicker: 'What we owe them',
      head: 'What we owe the client comes from our own promises, and who must say yes comes from the client’s own rules',
      visual: { type: 'card', title: 'What C2’s test answer of Nov 1 says', fields: [
        ['What we owe Waylon', 'The weekly report, the lead-source page we promised on Oct 7 and Oct 14, a true word on remarketing and on how his leads are marked, and his OK on 7 website changes.'],
        ['What still has no answer', 'His “What can we do?” of Oct 12, and his question of Oct 5 about the lead sheet.'],
        ['Who says yes first', 'Waylon OKs every change to how the site looks or reads. He owns half the business, so he does not decide spend alone.'],
        ['Inside our team', 'Since Oct 28 Will has had C2 on hold, so every change waits for his yes.']],
        stamp: ['Most of what we owe sits on a case or a task', 'opus'] },
      vcap: 'Waylon set his rule in a mail of Oct 21 and said it again on the call that day. The answer has no field of its own for these, so they go in its summary and its proof.' }
  ],

  examples: {
    WHEN: { tag: 'made', rows: [{ steps: [['Waylon, Nov 4, 4:43 PM', '“Wow so what does this mean? Non ads conversion?”', 'will'], ['A mail from the client that no run has handled yet', '', 'code']], end: [['The module reads C2 the next morning', '', 'opus']] }], note: 'Made up from a real mail, which C2’s fact sheet of Nov 7 lists as new. No live morning has run the module yet, because it is off in live.' },
    WANT: { tag: 'real', rows: [{ steps: [['C2’s strategy page, Nov 7', 'written by Will, from 11 calls and 3 mails', 'code'], ['Waylon, on the call of Sep 24', '“i really want to scale the budget i just don\'t want it to be in vain”', 'will']], end: [['Five wants, each with who said it and when', '', 'opus']] }], note: 'We took this from C2’s fact sheet of Nov 7.' },
    FEEL: { tag: 'real', rows: [{ steps: [['LA + NY, Oct 14', 'he approved the raise to $200 a day', 'keep'], ['Oct 21', 'he asked for another raise, and Will held it', 'wait']], end: [['No word from him on the cut of Oct 30', '', 'block']] }], note: 'We took this from the answer that the client module wrote for C2 on Nov 1.' },
    OWE: { tag: 'real', rows: [{ steps: [['What we told him on Oct 27', 'remarketing only for site visitors, at about $10 a day', 'will'], ['On Nov 1', 'no longer true', 'block']], end: [['We owe him a true word on remarketing, on case #53', '', 'opus']] }], note: 'We took this from the answer that the client module wrote for C2 on Nov 1.' },
    PROOF: { tag: 'real', rows: [{ steps: [['60 quotes', '18 from mail and 42 from calls', 'opus'], ['Code opens each source once', '', 'code']], end: [['All 60 found where they came from', '', 'keep']] }], note: 'We took this from the answer that the client module wrote for C2 on Nov 1.' },
    GOALS: { tag: 'real', rows: [{ steps: [['Will’s client checks on C2', 'Nov 1, 3:34 AM ET, in 77.4 s', 'will']], end: [['8 failed, 3 could not run, and 5 passed', '', 'block']] }], note: 'We took this from the verifiers’ run of Will’s client checks on C2, Nov 1.' },
    CHECK: { tag: 'real', rows: [{ steps: [['Opus quoted Waylon’s bold line without its bold marks', 'his mail of Oct 21', 'will'], ['Refused as a cut sentence, because of the bold marks', 'so nothing was saved', 'block']], end: [['Opus quoted the line again with its bold marks, and the answer was saved', '', 'opus']] }], note: 'Code’s record of C2’s test on Nov 1 shows this refusal. The saved answer keeps the line, bold marks and all.' },
    GIVE: { tag: 'real', rows: [{ steps: [['C2’s test answer, Nov 1', 'a problem', 'opus'], ['The In motion module’s later answers that day', 'they repeat its whole summary', 'code']], end: [['C2’s fact sheet of Nov 7 asks Opus to test that answer first', '', 'code']] }], note: 'We took these from the client module’s answer for C2 on Nov 1, the In motion module’s answers that day, and C2’s fact sheet of Nov 7.' }
  },

  reviewed: { self: '9e79099d', above: '2525099a', on: '2026-11-08' }
});
