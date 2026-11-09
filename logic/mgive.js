// Who reads In motion's list. comm-chat at origin/main 1c24d43a, read 2026-11-08: src/modules/mod.rs:119 (ACCOUNT_FACTS: the
// four campaign modules and Decide need In motion, :207, :223, :241, :258, :277; Tracking, The client and Setup need nothing);
// src/modules/store.rs:129-147 (`stale`, `missing`: 7 New York days; a test's answer counts); src/modules/brief/mod.rs
// :113-136 (`needs_part`: each needed answer as one line, its title, day, verdict and summary; a missing one ends the facts
// with WAIT); src/modules/brief/numbers.rs:212-233 (a campaign's own facts list its open cases and its changes), :727-763
// (Decide's facts: :755 every line of In motion's proof, each cut at 300 characters); mod.rs:279-289 (Decide's words: each
// proposal names what in motion it touches); src/modules/brief/mod.rs:198-203 and :235-238 (a code module's facts are its
// answer: no last answer, no mark, no test of what would prove it wrong); src/modules/store.rs:149-157 (`set_mark`, Will's
// mark); src/ui/modules.rs (Right or Wrong). Real cases, read 2026-11-08: C2's In motion answer of Nov 1 (49) and Bull's
// Decide answer 58 (Nov 1), with module_brief and answer_id; the line that code handed Bid and budget for Bull's campaigns on
// Nov 7 (HANDOFF-bids-redo.md, logic/bneeds.js). No answer in the copy of Barbara's data from Nov 3 carries a mark.
LOGIC.flow({
  id: 'mgive', parent: 'motion',
  title: 'Who reads the list', short: 'Who reads the list',
  head: 'The campaign modules get the list’s counts, the Decide module reads every line, and none of them saves without a list from the last {motionFresh} days',
  chart: [
    'flowchart TB',
    'ONE(["The list is saved as one<br/>answer, with a verdict,<br/>its counts and its lines"]):::code',
    'FRESH{"Is it under {motionFresh}<br/>New York days old?"}:::code',
    'WAIT(["No, so the campaign modules<br/>and the Decide module wait,<br/>and save nothing"]):::block',
    'CAMP["The four campaign modules<br/>get one line, with the<br/>verdict, the day and<br/>the counts"]:::code',
    'DEC["The Decide module also reads<br/>every line, each cut to<br/>{motionLine} characters"]:::code',
    'TOUCH(["Each change it proposes names<br/>the things under way<br/>that it touches"]):::opus',
    'MARK(["Will can mark the list right<br/>or wrong, but no code<br/>reads the mark"]):::will',
    'ONE --> FRESH',
    'FRESH -- no --> WAIT',
    'FRESH -- yes --> CAMP', 'FRESH -- yes --> DEC',
    'DEC --> TOUCH',
    'ONE --> MARK'
  ],
  links: { FRESH: 'mgwait', WAIT: 'mgwait', CAMP: 'mgcamp', DEC: 'mgdecide', TOUCH: 'mgdecide', MARK: 'mgmark' },
  leaves: {
    mgwait: 'They wait for a fresh list',
    mgcamp: 'The campaign modules get the counts',
    mgdecide: 'The Decide module reads every line',
    mgmark: 'Will’s mark on a list'
  },

  // Each slide belongs to one view: the part's own slides first, then one or more for each rule.
  deck: [
    { about: ['mgive'], kicker: 'The idea',
      head: 'The In motion module proposes nothing itself, so its worth lies in what the modules after it do with the list',
      visual: { type: 'gate', rows: [
        ['Results', 'It gets the counts.', 'pass'],
        ['Search terms and reach', 'It gets the counts.', 'pass'],
        ['Ads and pages', 'It gets the counts.', 'pass'],
        ['Bid and budget', 'It gets the counts, and its instructions say to read In motion first.', 'hold'],
        ['Decide', 'It gets the counts and reads every line.', 'pass']],
        end: ['None of them saves without a list from the last {motionFresh} days', 'code'] },
      vcap: 'Tracking, the client module and Setup and market answer at the same early step, and none of them reads the list.' },

    { about: ['mgwait'], kicker: 'A fresh list',
      head: 'Without a list from the last {motionFresh} days, the campaign modules and the Decide module wait and save nothing',
      visual: { type: 'flow', rows: [
        { title: 'Bull, Nov 8', steps: [['Its newest list is from the test of Nov 1', '', 'code'], ['{motionFresh} New York days have passed', '', 'code']], end: [['A test of a campaign module makes a new list first', '', 'code']] },
        { title: 'A live morning', steps: [['Code makes the list before any other module', '', 'code']], end: [['So a live morning never waits for it', '', 'keep']] }] },
      vcap: 'The wait matters only in a test, because a live morning makes the list first. Code counts the days by the calendar in New York, the same way for every module.' },

    { about: ['mgcamp'], kicker: 'The counts',
      head: 'A campaign module gets the list as one line of counts, while its own facts list the cases and the changes on its campaign',
      visual: { type: 'card', title: 'What Bid and budget got from the In motion module for Bull, Nov 7', fields: [
        ['The line', 'The In motion module’s list of Nov 1 is good. 0 tests run, 19 questions wait on a person, 18 people’s changes and 0 follow-ups are due.'],
        ['Its own facts', 'Each open case on its campaign, with its number and where it is, and the campaign’s own changes with who made them and why.'],
        ['Not in it', 'The words of a question, the days of a test, and a teammate’s words on a task.']],
        stamp: ['Counts, not lines', 'code'] },
      vcap: 'Bid and budget’s instructions say to wait on a test, an open question or a teammate’s fresh change. It sees the cases and the changes on its own campaign, but a teammate’s words on a task reach it only as a number.' },

    { about: ['mgdecide'], kicker: 'Every line',
      head: 'The Decide module reads every line, and names the things under way that each change it proposes would touch',
      visual: { type: 'flow', rows: [
        { title: 'What Bull’s list said on Nov 1', steps: [['19 questions wait on a person, and 18 people’s changes are recent', '', 'code']], end: [['No test, and no line for a hold', '', 'wait']] },
        { title: 'What the Decide module found on its own', steps: [['Yasir’s mail of Oct 28', '“I’m keeping bids and budgets as they are while we get one to two weeks of clean tracking.”', 'will'], ['Case #149, waiting until Nov 11', 'for two weeks of results', 'code']], end: [['Keep each budget and bid as it is until the Nov 11 read', 'and it named both as under way', 'opus']] }] },
      vcap: 'The Decide module’s instructions say that each proposal names what in motion it touches, so the lines matter even when the counts look quiet. On Nov 1 the Decide module saw Yasir’s hold only because it read his mail.' },

    { about: ['mgmark'], kicker: 'Will’s mark',
      head: 'Will can mark a list right or wrong, but no code reads the mark, so a wrong list gets fixed only in code',
      visual: { type: 'timeline', items: [
        ['Under Validators, then Modules', 'Will opens a client’s In motion cell and reads its newest list.'],
        ['Right or wrong', 'He marks it with a note, and the mark stays on that answer.'],
        ['The next morning', 'Code makes the list again from Barbara’s tables, and never reads his mark, because a code module keeps no memory.']] },
      vcap: 'A module that Opus answers gets its last answer and Will’s mark in front of it the next morning. The In motion module gets neither. No list read for this map carries a mark.' }
  ],

  examples: {
    ONE: { tag: 'real', rows: [{ steps: [['C2’s list, Nov 1', 'good', 'code']], end: [['Its summary', '0 tests run, 29 questions wait on a person, 18 people’s changes and 0 follow-ups are due', 'code']] }], note: 'We took this from the list that the In motion module made for C2 in a test on Nov 1.' },
    FRESH: { tag: 'made', rows: [{ steps: [['Bull’s newest list', 'from the test of Nov 1', 'code'], ['Is it under {motionFresh} New York days old on Nov 8?', 'no', 'code']], end: [['The modules after it wait', '', 'block']] }], note: 'We made this up from the real day of Bull’s last list, because no module ran on Bull on Nov 8.' },
    WAIT: { tag: 'made', rows: [{ steps: [['A test of Bid and budget on Bull, Nov 8', 'with no list from the last {motionFresh} days', 'code']], end: [['Nothing saves until a new list exists', 'so the test makes one first', 'block']] }], note: 'We made this up from the rule in code and the real day of Bull’s last list, because no test ran on Bull on Nov 8.' },
    CAMP: { tag: 'real', rows: [{ steps: [['Bid and budget on Bull’s campaigns, Nov 7', '', 'code']], end: [['One line from In motion', '0 tests run, 19 questions wait on a person, 18 people’s changes', 'code']] }], note: 'This is the line that code gave Bid and budget for each of Bull’s campaigns on Nov 7.' },
    DEC: { tag: 'real', rows: [{ steps: [['Bull’s Decide answer, Nov 1', '', 'opus']], end: [['“In motion: 19 questions wait on a person, and 18 people’s changes are recent”', '', 'code']] }], note: 'We took this from the answer that the Decide module wrote for Bull in a test on Nov 1.' },
    TOUCH: { tag: 'real', rows: [{ steps: [['Keep each budget and bid until the Nov 11 read', 'a proposal for Bull, Nov 1', 'opus']], end: [['It named what is under way, such as Yasir’s hold of Oct 28, the new Securities page, Will’s hold on DeFi and case 149', '', 'opus']] }], note: 'We took this from the answer that the Decide module wrote for Bull in a test on Nov 1.' },
    MARK: { tag: 'made', rows: [{ steps: [['Will marks a list wrong', 'with a note', 'will'], ['The next morning', 'code makes a new list', 'code']], end: [['His mark stays on the old answer, and nothing reads it', '', 'wait']] }], note: 'We made this up, because no list that we read for this map carries a mark from Will.' }
  },

  reviewed: { self: '5eaf85a5', above: 'e5411c45', on: '2026-11-08' }
});
