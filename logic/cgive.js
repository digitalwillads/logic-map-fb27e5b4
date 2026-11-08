// What the other modules get from The client: comm-chat src/modules/mod.rs:119 (ACCOUNT_FACTS: Tracking, The client, In
// motion, Money) and :207-277 (Results, Search terms and reach, Ads and pages, Bid and budget and Decide need them);
// src/modules/store.rs:129-147 (`missing` counts any answer under 7 New York days, a test's too, while the day's list drops a
// test's, day.rs:241-252); src/modules/brief/mod.rs:113-136 (each account answer as one line, with its verdict, its day and
// its summary, and the line that says to wait); src/chat/tools/module_tools.rs:513-517 (the save refuses). In motion lists
// The client's whole summary as what we told the client (src/modules/brief/code.rs:174-177) and runs at step 0, before The
// client (day.rs:259-268). The next morning: brief/mod.rs `retest_part` (156-171, 600 characters) and `last_line` with Will's
// mark (store.rs `set_mark`; src/ui/modules.rs, Right or Wrong). A blank page: day.rs:275-278 (the run drafts the page from
// The client's answer), src/results/strategy_case.rs (set by rule, one notice tells Will). Real cases, read 2026-11-07:
// Bull's answer 39 (Search terms and reach, Nov 1); C2's In motion answers 3 and 46 (Nov 1); C2's facts of Nov 7; the
// strategy pages of Affordable Tree Service and AAFE (runs #239 and #241). Old parts: retired/2026-11-07-client-redo/
// client.js (who waits for it, In motion, tomorrow's test, the draft).
LOGIC.flow({
  id: 'cgive', parent: 'client',
  title: 'What the other modules get', short: 'What others get',
  head: 'Five modules wait for The client’s answer, and the next morning tests it first',
  chart: [
    'flowchart TB',
    'ONE(["One answer for the<br/>whole account, with its<br/>verdict, its day and<br/>its summary"]):::code',
    'NEEDS["Five modules after it save nothing<br/>without an answer of The client<br/>under {clientFresh} days old"]:::code',
    'MOTION["In motion lists its summary<br/>as what we told the client"]:::code',
    'DRAFT["A blank strategy page is drafted<br/>from this answer, and set<br/>by rule"]:::code',
    'NEXT["The next morning’s answer first<br/>tests what would prove<br/>this one wrong"]:::code',
    'MARK(["Will marks it right or wrong,<br/>and the next morning<br/>reads his mark"]):::will',
    'ONE --> NEEDS', 'ONE --> MOTION', 'ONE --> DRAFT', 'ONE --> NEXT',
    'MARK -.-> NEXT'
  ],
  links: { ONE: 'chneeds', NEEDS: 'chneeds', MOTION: 'chmotion', DRAFT: 'chdraft', NEXT: 'chnext', MARK: 'chnext' },
  leaves: {
    chneeds: 'Who waits for it',
    chmotion: 'In motion lists it',
    chdraft: 'A blank page is drafted from it',
    chnext: 'The next morning, and Will’s mark'
  },

  // Each slide belongs to one view: the part's own slides first, then one or more for each rule.
  deck: [
    { about: ['cgive'], kicker: 'The idea',
      head: 'Five modules lean on The client, because a number alone cannot say what the client wants',
      visual: { type: 'gate', rows: [
        ['Results', 'Is this campaign doing its job?', 'pass'],
        ['Search terms and reach', 'Are the right people seeing it?', 'pass'],
        ['Ads and pages', 'Are the ads and pages strong?', 'pass'],
        ['Bid and budget', 'Is the bid right, and what would more or less money do?', 'pass'],
        ['Decide', 'Where does the money go, what comes first, and who says yes?', 'pass']],
        end: ['With no answer of The client from the last {clientFresh} days, none of them can save', 'code'] },
      vcap: 'Each of them gets The client’s answer as one line, with its verdict, its day and its summary. On Nov 1 Bull’s Search terms and reach answer on Hedge Funds and PE named it as its source, because Tyler wants a few of those leads a month.' },

    { about: ['chneeds'], kicker: 'Who waits for it',
      head: 'The modules that wait count any answer under {clientFresh} days, a test’s too, but the morning’s list does not',
      visual: { type: 'flow', rows: [
        { title: 'A fresh answer', steps: [['The client’s answer', 'under {clientFresh} New York days old', 'opus']], end: [['The four campaign modules and Decide read it', 'as one line', 'code']] },
        { title: 'No fresh answer', steps: [['A campaign module’s facts', 'say to wait for The client, and stop there', 'code']], end: [['Its save refuses, so nothing saves', '', 'block']] }] },
      vcap: 'So a test’s answer, like answer 44, lets the campaign modules save while the morning’s list still reads The client as due. Bull’s account answers of Nov 1 stay fresh through Nov 7, and from Nov 8 Bull’s campaign modules wait.' },

    { about: ['chmotion'], kicker: 'In motion lists it',
      head: 'In motion lists The client’s whole summary as what we told the client',
      visual: { type: 'timeline', items: [
        ['Step 0', 'In motion answers by code. On C2’s first test, its answer 3 said “What we told the client is not listed: The client has no answer yet.”'],
        ['Step 1', 'The client answers, and that is answer 44.'],
        ['Later tests that day', 'In motion’s answers 46, 47 and 49 list the whole summary of answer 44 as what we told the client.']] },
      vcap: 'In motion runs before The client each morning, so it reads the answer of an earlier morning. The summary says what Waylon wants, not only what we told him, because the answer has no field for what we told the client.' },

    { about: ['chdraft'], kicker: 'A blank strategy page',
      head: 'The client answers first, and then the run drafts the strategy page from that answer',
      visual: { type: 'flow', rows: [
        { title: 'The module run', steps: [['A blank page that Will was never asked for', 'an item each morning', 'code'], ['The client reads the account', 'because the page is blank', 'opus'], ['The run drafts the page from The client’s answer', 'because the run reads no raw data itself', 'code']], end: [['The strategy check reads each want', 'in the client’s own words, in whole sentences', 'code']] },
        { title: 'When the draft passes', steps: [['Barbara sets the page at once', 'by rule', 'code']], end: [['One notice tells Will what changed', '', 'will']] }] },
      vcap: 'Before the module runs, the morning run drafted blank pages the same way, so Affordable Tree Service’s page came from the draft of run #239 and AAFE’s from run #241. The strategy check reads who said each want, but the answer’s quote check does not.',
      quote: ['can we automatically set and update the stratagy pages? Just have it as a notification in the cases that there was a change. It is so much more likely that a human doesn\'t do the job than a robot will make a mistake', 'Nov 1'] },

    { about: ['chnext'], kicker: 'The next morning',
      head: 'The next answer must first test what this one said would prove it wrong',
      visual: { type: 'timeline', items: [
        ['Nov 1', 'Answer 44 saves, and says that Isaac’s or Will’s account of the call of Oct 30 would prove it wrong.'],
        ['Nov 7', 'C2’s facts open with that test, and tell Opus to test it first from today’s data.'],
        ['If it holds', 'The new answer must say that the last one was wrong, and why.'],
        ['Will’s mark', 'Under Validators and then Modules, Will marks each answer right or wrong with a note, and the next facts carry his mark.']] },
      vcap: 'Code quotes at most {clientWrong} characters of the test. Nobody else reads the answer again, because the next morning’s data is the second reader.',
      quote: ['on the second run the next day it would catch this again, if something was truly wrong', 'Nov 1'] }
  ],

  examples: {
    ONE: { tag: 'real', rows: [{ steps: [['C2’s answer 44, Nov 1', '', 'opus']], end: [['One line for each module after it', 'its verdict, its day and its summary', 'code']] }], note: 'C2’s answer 44 is what the campaign modules of C2 read on Nov 1.' },
    NEEDS: { tag: 'real', rows: [{ steps: [['Bull’s client answer, Nov 1', 'Tyler wants a few Hedge Funds and PE leads a month', 'opus'], ['Search terms and reach on Hedge Funds and PE', 'answer 39 reads it', 'opus']], end: [['Its proof names the client module as its source', '', 'code']] }], note: 'Bull Legal, answer 39, of Nov 1.' },
    MOTION: { tag: 'real', rows: [{ steps: [['In motion, C2, Nov 1', 'answer 3, before The client answered', 'code'], ['“What we told the client is not listed”', 'because The client had no answer yet', 'code']], end: [['Answers 46, 47 and 49 list the whole summary of answer 44', '', 'code']] }], note: 'C2, Nov 1, In motion’s answers 3, 46, 47 and 49.' },
    DRAFT: { tag: 'made', rows: [{ steps: [['A blank strategy page', 'Will was never asked for it', 'code'], ['The client answers', 'because the page is blank', 'opus']], end: [['The run drafts the page from that answer', '', 'code']] }], note: 'Made, because no module run has taken this path. Before the module runs, the morning run drafted the pages of Affordable Tree Service and AAFE the same way.' },
    NEXT: { tag: 'real', rows: [{ steps: [['Answer 44 said', '“Isaac’s or Will’s account of the Oct 30 call …” would prove it wrong', 'opus'], ['C2’s facts of Nov 7', 'open with it', 'code']], end: [['Test it first, from today’s data', '', 'opus']] }], note: 'The facts that code gathered for C2 on Nov 7, and answer 44.' },
    MARK: { tag: 'made', rows: [{ steps: [['Will marks an answer wrong', 'with a note', 'will'], ['The next morning’s facts', 'carry his mark and his note', 'code']], end: [['Opus reads his mark before it answers', '', 'opus']] }], note: 'Made, because no client answer carries a mark yet. The facts of Nov 7 show none on C2, Bull Legal or Kogalla.' }
  },

  reviewed: { self: 'e31efb96', above: 'a94aa4ce', on: '2026-11-07' }
});
