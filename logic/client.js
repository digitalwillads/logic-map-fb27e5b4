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
  head: 'For the whole account, The client module asks what the client wants, and what they last said',
  chart: [
    'flowchart TB',
    'WHEN(["Each morning, when the client<br/>wrote or called, the strategy page<br/>is blank, or {clientFresh} days have passed"]):::code',
    'WANT["What the client wants: the<br/>strategy page, the targets, and<br/>their own newest words"]:::opus',
    'FEEL["How they feel about our work:<br/>their newest word on each live<br/>campaign, for or against"]:::opus',
    'OWE["What we told them, what we<br/>owe them, and who says yes<br/>before a change"]:::opus',
    'PROOF["Each point rests on a quote, and<br/>code finds each quote’s words<br/>in its source"]:::code',
    'GOALS["27 of Will’s checks on the inbox,<br/>the meetings and the client’s<br/>record, and an answer to each failure"]:::will',
    'CHECK{"Does the answer pass<br/>code’s checks?"}:::code',
    'GIVE(["The modules after it get one<br/>answer for the whole account,<br/>under {clientFresh} days old"]):::code',
    'WHEN --> WANT', 'WANT --> FEEL', 'FEEL --> OWE', 'OWE --> PROOF', 'PROOF --> GOALS', 'GOALS --> CHECK',
    'CHECK -. "no, so Opus<br/>answers again" .-> WANT',
    'CHECK -- yes --> GIVE'
  ],
  links: { WHEN: 'cwhen', WANT: 'cwant', FEEL: 'cfeel', OWE: 'ctold', PROOF: 'cproof', GOALS: 'cgoals', CHECK: 'ccheck', GIVE: 'cgive' },
  leaves: { ctold: 'What we told them, and what we owe them' },

  // Each slide belongs to one view: the module's own slides first, then the slides of its rule.
  deck: [
    { about: ['client'], kicker: 'The idea',
      head: 'The client module reads the client’s own words, so every module after it knows what the client wants and how they feel',
      visual: { type: 'flow', rows: [
        { title: 'C2, from the test of Nov 1', steps: [
          ['Waylon wants more budget that brings real leads', 'at about $500 a conversion', 'will'],
          ['His last written word asked only for the call link', 'Oct 30', 'will'],
          ['Two things we told him on Oct 27 were no longer true', '', 'block']],
          end: [['So the answer was a problem, with 5 fixes', 'each on an open case', 'opus']] }] },
      vcap: 'That is the whole module on one client. Opus read his mail, his calls and the team’s texts with him, found each want in his own words, and set what we told him beside what was true. Each fix went on a case for a person, because a module only answers and never changes the account.',
      quote: ['have it do the bid code and the how the client is feeling in the same way so I can audit them both tomorrow', 'Nov 7'] },
    { about: ['client'], kicker: 'What it must give',
      head: 'Its instructions ask for five things, and the second one comes closest to how the client feels',
      visual: { type: 'gate', rows: [
        ['What they want now, in their own words', 'Each want comes with who said it and when.', 'pass'],
        ['Their newest word on each live campaign', 'It says whether they are for or against what we do.', 'pass'],
        ['What we told them', '', 'pass'],
        ['What we owe them', '', 'pass'],
        ['Who says yes before a change', '', 'pass'],
        ['How they feel about our work', 'No line of the instructions asks for it by name.', 'hold']],
        end: ['One answer, in the shape that every module uses', 'opus'] },
      vcap: 'These five come straight from the module’s instructions, and answer 44 gave all five for C2. Two more lines steer how Opus reads, so it quotes whole sentences, and it reads what a word means in its call before it uses it.' },
    { about: ['client'], kicker: 'A real answer · C2 · Nov 1',
      head: 'Answer 44 says what Waylon wants, what he said last, what we told him and what we owe him',
      visual: { type: 'card', title: 'Answer 44, The client on C2, a problem', fields: [
        ['What he wants', 'More budget that brings real leads, at about $500 a conversion, remarketing to site visitors, his SEO list done with his OK on visible changes, and a page that shows where leads come from.'],
        ['His newest word', 'On Oct 30 he mailed only to ask for the call invite, and his texts later that day asked about the call.'],
        ['What we told him', 'On Oct 27 we wrote that remarketing shows only to site visitors, at about $10 a day. By Nov 1 that was not true.'],
        ['What we owe him', 'The weekly report, the lead-source page, a true word on remarketing, and his OK on 7 website changes.'],
        ['Who says yes', 'Waylon OKs each change to the site’s looks or words, and Will’s hold makes every write wait for Will.']],
        stamp: ['17 proof lines, 60 quotes and 5 fixes', 'opus'] },
      vcap: 'It saved at about 4 AM ET on Nov 1, from a module test, before the rules that came at 10:13 AM that day.',
      stats: [['60', 'quotes, each found in its source', 'real'], ['5', 'fixes, each on an open case', 'real'], ['12', 'checks, answered in words', 'real']] },
    { about: ['client'], kicker: 'Where it sits',
      head: 'The client runs in the first step, beside Tracking, because it needs no other module’s answer',
      visual: { type: 'flow', rows: [
        { title: 'First, by code', steps: [['In motion and Money', 'code answers both, with no model', 'code']], end: [['Their answers save', 'before any subagent starts', 'code']] },
        { title: 'Then the whole account, all at once', steps: [['One subagent for each module that is due', 'on the run’s own model', 'code']], end: [['Tracking', '', 'opus'], ['The client', '', 'opus'], ['Setup and market', '', 'opus']] },
        { title: 'Then each campaign, and last Decide', steps: [['Results, Search terms and reach, Ads and pages, Bid and budget', 'each one needs The client’s answer', 'opus']], end: [['Decide', 'reads every fresh answer, and needs The client too', 'opus']] }] },
      vcap: 'The subagent reads the facts that code gathered for it, then follows them. It may write only its one answer, so it changes nothing in the account.',
      quote: ['What if I make the checking system modular?', 'Oct 31'] },
    { about: ['client'], kicker: 'The plan of Oct 31',
      head: 'The plan Will read on Oct 31 gave The client its question, when it runs, what it reads, its checks and its answer',
      visual: { type: 'card', title: 'The client, in the modules plan of Oct 31', fields: [
        ['Its question', 'What does the client want, and what did they last say?'],
        ['When it runs', 'When mail, a call or a Slack message comes in, or 7 days pass.'],
        ['What it reads', 'The strategy page, the newest mail and calls, and the client’s own tracker if it keeps one.'],
        ['Its checks', '27 of them, from the inbox, the meetings and the CRM.'],
        ['Its answer', 'What they want now, their newest word with its date, what we told them, what we owe them, and who says yes first.'],
        ['Its tests', 'C2’s “do the same again”, ETD’s “We will push this until restructure is complete.”, Tyler’s $40 at Bull, and Kogalla’s battery date.']],
        stamp: ['Built that night', 'code'] },
      vcap: 'Code follows the plan with one gap, because no Slack message makes The client read again. A blank strategy page became a second reason on Nov 4.',
      quote: ['Build them all so I can start testing and clearing each module', 'Oct 31'] },
    { about: ['client'], kicker: 'Why modules',
      head: 'One long thread missed things, so each question now gets its own fresh reader, at about twice the tokens',
      visual: { type: 'bars', max: 380, rows: [
        { label: 'C2’s full run #250, one Opus thread', parts: [[192, 'code', '192M tokens']] },
        { label: 'C2’s dry module run 260, on a copy', parts: [[380, 'opus', '380M tokens']] }] },
      vcap: 'These are the tokens each run read on Nov 4. The module run stays off in live until Will tests it and says yes to the cost.',
      stats: [['$70', 'what C2’s full run #250 cost at API prices', 'real'], ['54', 'subagents in dry run 260', 'real'], ['About 4.5 h', 'how long dry run 260 took', 'real']],
      quote: ["no I don't worry about cost. I worry about it being done right", 'Oct 31'] },
    { about: ['client'], kicker: 'Status · Nov 7',
      head: 'The module is built and tested on three clients, but it stays off in live until Will says yes',
      visual: { type: 'timeline', items: [
        ['Oct 31', 'Will reads the plan, and the modules and their one shape of answer are built that night.'],
        ['Nov 1, about 4 AM ET', 'Tests run on Bull Legal, Kogalla and C2, and C2’s answer 44 saves.'],
        ['Nov 1, 10:13 AM ET', 'Each fix must now say what it should do, Jev reads each fix, and each quote names its kind of source.'],
        ['Nov 2', 'The checks stop asking an AI judge, so each question in them goes to Opus.'],
        ['Nov 4', 'Module runs take the place of the morning run, and dry runs 259 and 260 run C2 on a copy.'],
        ['Nov 6', 'Each answer is held to the newest client check that the verifiers send to Barbara, and the module run merges.'],
        ['Nov 7', 'The module run stays off in live until Will tests it and says yes to its cost.']] },
      quote: ['we should just run it yes?', 'Nov 4'] },

    { about: ['ctold'], kicker: 'What we told them',
      head: 'What we told the client can stop being true, so Opus sets each promise beside what is true today',
      visual: { type: 'flow', rows: [
        { title: 'What Will wrote to Waylon on Oct 27', steps: [['Will’s mail to Waylon', 'Oct 27', 'will']], end: [['Remarketing is on, only for site visitors in LA and NY, at about $10 a day', '', 'will'], ['Its leads come into the tracker marked as Meta', '', 'will']] },
        { title: 'What was true on Nov 1', steps: [['Opus reads the ad accounts and the tracker', '', 'opus']], end: [['The site-visitor campaign had been paused since Oct 28', '', 'block'], ['The old campaign for people who engaged on Facebook and Instagram ran at $20 a day', '', 'block'], ['The tracker could not mark a source', '', 'block']] },
        { title: 'What we owe him now', steps: [['Two promises that are no longer true', '', 'block']], end: [['A true word on remarketing', 'on case #53', 'opus']] }] },
      vcap: 'Answer 44 found both from our own mail and the ad accounts. Nothing in code compares what we told a client with what is true, so Opus does it from its own reads.' },
    { about: ['ctold'], kicker: 'What we owe them',
      head: 'What we owe the client comes from our own promises, and who says yes comes from the client’s own rules',
      visual: { type: 'card', title: 'C2, in answer 44', fields: [
        ['What we owe Waylon', 'The weekly report, the lead-source page promised on Oct 7 and Oct 14, a true word on remarketing and on his marks, and his OK on 7 website changes.'],
        ['What still has no answer', 'His “What can we do?” of Oct 12, and his question of Oct 5 about the lead sheet.'],
        ['Who says yes first', 'Waylon OKs each change to the site’s looks or words, and as a 50% owner he does not decide spend alone.'],
        ['Inside our team', 'Will’s hold has made every write wait for his yes since Oct 28.']],
        stamp: ['Most owed items sit on a case or a task', 'opus'] },
      vcap: 'Waylon set his rule in a mail of Oct 21 and said it again on the call that day. The answer has no field of its own for these, so they live in its summary and its proof.' }
  ],

  examples: {
    WHEN: { tag: 'made', rows: [{ steps: [['Waylon, Nov 4, 4:43 PM', '“Wow so what does this mean? Non ads conversion?”', 'will'], ['A mail from the client that still waits', '', 'code']], end: [['It reads C2 the next morning', '', 'opus']] }], note: 'Made from a real mail, which C2’s facts of Nov 7 list as new. No live morning has run the module yet, because it stays off in live.' },
    WANT: { tag: 'real', rows: [{ steps: [['C2’s strategy page, Nov 7', 'by Will, from 11 calls and 3 mails', 'code'], ['Waylon, the call of Sep 24', '“i really want to scale the budget i just don\'t want it to be in vain”', 'will']], end: [['Five wants, each with who said it and when', '', 'opus']] }], note: 'The facts that code gathered for C2 on Nov 7.' },
    FEEL: { tag: 'real', rows: [{ steps: [['LA + NY, Oct 14', 'he approved the raise to $200 a day', 'keep'], ['Oct 21', 'he asked for another raise, and Will held it', 'wait']], end: [['No word from him on the cut of Oct 30', '', 'block']] }], note: 'C2’s answer 44, of Nov 1.' },
    OWE: { tag: 'real', rows: [{ steps: [['What we told him on Oct 27', 'remarketing only for site visitors, at about $10 a day', 'will'], ['On Nov 1', 'not true any more', 'block']], end: [['A true word on remarketing, owed on case #53', '', 'opus']] }], note: 'C2’s answer 44, of Nov 1.' },
    PROOF: { tag: 'real', rows: [{ steps: [['60 quotes', '18 from mail and 42 from calls', 'opus'], ['Code reads each source once', '', 'code']], end: [['All 60 found in their sources', '', 'keep']] }], note: 'C2’s answer 44, of Nov 1.' },
    GOALS: { tag: 'real', rows: [{ steps: [['The client check on C2', 'Nov 1, 3:34 AM ET, in 77.4 s', 'will']], end: [['8 failed, 3 could not check, 5 passed', '', 'block']] }], note: 'The verifiers’ client run of Nov 1 on C2.' },
    CHECK: { tag: 'real', rows: [{ steps: [['A quote cut from Waylon’s bolded line', 'his mail of Oct 21', 'will'], ['Refused as a cut sentence', 'so nothing saved', 'block']], end: [['Opus quoted the line whole, and it saved', '', 'opus']] }], note: 'C2, Nov 1, from code’s own note on that refusal. Answer 44 holds the line with its bold marks.' },
    GIVE: { tag: 'real', rows: [{ steps: [['Answer 44, C2, Nov 1', 'a problem', 'opus'], ['In motion’s later answers that day', 'list its whole summary', 'code']], end: [['C2’s facts of Nov 7 open with its test', '', 'code']] }], note: 'C2’s answer 44, In motion’s answers 46 and 49 of Nov 1, and the facts that code gathered for C2 on Nov 7.' }
  },

  reviewed: { self: '9d5f189d', on: '2026-11-07' }
});
