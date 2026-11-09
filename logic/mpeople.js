// People's own work on In motion's list. comm-chat at origin/main 1c24d43a, read 2026-11-08: src/modules/brief/code.rs:27-28
// (14 days of changes, scorecard::CHANGES_DAYS), :34-36 (21 days and 300 characters of comments), :38-65 (`task_words`: every
// comment of kind comment on the client's tasks that are not done and not archived, by any user, the newest first, cut by
// text::clip at 300 characters, src/text.rs:9-21), :179-184 (the words, then the changes, the newest first);
// src/modules/brief/numbers.rs:114-143 (`peoples_of`: a change by the team, the client or an unknown login; those on a paused
// campaign that nothing keeps are left out), :162-169 (`change_words`: the day, who, the campaign, what, and why);
// src/results/compute.rs:676-702 (`who_of`: a login on the team's list or at digitalwillads.com is the team's, any other is
// the client's), :876-921 (a run's change is Barbara's own). Real cases, read 2026-11-08: Bull's In motion answer 1, C2's 49
// and Kogalla's 15 (Nov 1), and Bull's Decide answer 58, with module_brief and answer_id; in a copy of Barbara's data from
// Nov 3 (barbara-local, read-only): Bull's weekly-update tasks 4345 (closed Oct 29, 16:25 UTC; Yasir's comment of Oct 28,
// 2,778 characters, its hold at character 2,614) and 7131 (in review; his comment of Nov 2, 1,200 characters, its hold at
// 1,075), both measured after code's own folding; C2's test answer 75 of Nov 3 (12 teammates' words, all posted as William,
// 6 that begin "Automation run" and 1 "Done on 10/28 by Claude for Will"). The runs post task comments under Will's login.
LOGIC.flow({
  id: 'mpeople', parent: 'motion',
  title: 'People’s own work on the list', short: 'People’s own work',
  head: 'The list holds each change a person made in the last {motionChanges} days, and each comment on the client’s open tasks from the last {motionWords} days',
  chart: [
    'flowchart TB',
    'HIST(["The change history of every<br/>platform the account runs on,<br/>for the last {motionChanges} days"]):::code',
    'WHO{"Did a person<br/>make the change?"}:::code',
    'MACHINE(["Left out, because Google,<br/>the platform or one of<br/>Barbara’s runs made it"]):::code',
    'NAME["Code names the person from<br/>our team’s list of logins,<br/>and any other login reads<br/>as the client"]:::code',
    'CHANGE["A person’s change, with the<br/>day, who, the campaign, what<br/>changed, and why, when<br/>someone wrote a why"]:::code',
    'TASKS(["Every comment on the client’s<br/>tasks of the last {motionWords} days,<br/>by a person or by a run"]):::code',
    'OPEN{"Is the task<br/>still open?"}:::code',
    'CLOSED(["Left out, whatever<br/>the comment says"]):::block',
    'WORD["A teammate’s word, with the<br/>task, a first name, the day,<br/>and the first {motionWordChars} characters<br/>of the comment"]:::code',
    'HIST --> WHO',
    'WHO -- no --> MACHINE',
    'WHO -- yes --> NAME',
    'NAME --> CHANGE',
    'TASKS --> OPEN',
    'OPEN -- no --> CLOSED',
    'OPEN -- yes --> WORD'
  ],
  links: { NAME: 'mpwho', TASKS: 'mpruns', CLOSED: 'mpwhole', WORD: 'mpwhole' },
  leaves: {
    mpwho: 'Who made a change',
    mpruns: 'The runs’ own notes on tasks',
    mpwhole: { title: 'Should a teammate’s words reach the list whole, from any task?', open: {
      q: 'Yasir writes Bull’s weekly report as a comment on a task, and he puts his holds near the end. But code keeps only the first {motionWordChars} characters of each comment, and only from open tasks. On Oct 28 his hold started at character 2,614, and that task closed the next day. On Nov 2 his hold starts at character 1,075 of 1,200. How should the list read a teammate’s words?',
      since: 'Nov 8',
      opts: [
        ['Keep each comment whole, from any task with a comment in the last {motionWords} days, open or closed', true, 'Both of Yasir’s holds would reach the list. Code would stop cutting the comments, both in the list and where the Decide module reads it. The runs’ own notes would come in whole too, so the list gets longer, but the Decide module already reads long facts page by page.'],
        ['Keep each comment whole, but only from open tasks', false, 'Yasir’s hold of Nov 2 would reach the list whole. His hold of Oct 28 would still be missed, because its task closed on Oct 29.'],
        ['Keep it as it is', false, 'Only open tasks, and only the first {motionWordChars} characters of each comment. Neither hold reaches the list, and the Decide module finds them only if it reads Yasir’s mail.']] } }
  },

  // Each slide belongs to one view: the part's own slides first, then one or more for each rule.
  deck: [
    { about: ['mpeople'], kicker: 'The idea',
      head: 'People change the account and write about their work outside the cases, so the list reads the change history and the comments on tasks',
      visual: { type: 'flow', rows: [
        { title: 'In the change history', steps: [['Kathryn raises Kogalla’s Meta campaign from $10 to $12 a day', 'Oct 29', 'code']], end: [['A person’s change', 'and its why says that no record gives a reason', 'code']] },
        { title: 'In a comment on a task', steps: [['Yasir’s weekly report for Bull, Nov 2', '“Next: I’m holding bids one more week so we get a clean read with the new tracking.”', 'will']], end: [['A teammate’s word', 'but the list keeps only its first {motionWordChars} characters', 'code']] }] },
      vcap: 'Code reads {motionChanges} days of changes and {motionWords} days of comments, because a hold said for two weeks should still count a week later. Barbara’s own runs, Google and the platforms make changes too, but those are not a person’s work, so they stay off this part of the list.' },
    { about: ['mpeople'], kicker: 'A person’s change',
      head: 'Each change line says when, who, where, what changed and why, so the Decide module can see whose fresh work a proposal would touch',
      visual: { type: 'card', title: 'One of the 18 changes on C2’s list of Nov 1', fields: [
        ['When', 'Oct 30'],
        ['Who', 'Isaac, on our team'],
        ['Where', 'DWA - C2 LA + New York [Search] - Sep 2026'],
        ['What changed', 'The daily budget, from $200 to $150'],
        ['Why', 'Isaac cut it while he was on the call with Waylon, as a run worked out the next day']],
        stamp: ['A person’s change', 'code'] },
      vcap: 'A why comes from a write-up, either the person’s own or one that a run writes the day after. When nobody has written one, the line says “no why is written yet”. The newest change comes first.' },

    { about: ['mpwho'], kicker: 'Who made a change',
      head: 'Code names a teammate only when the login is on our team’s list, so any other login reads as the client',
      visual: { type: 'flow', rows: [
        { title: 'Bull, Oct 28', steps: [['Yasir adds 2 ads from his own Gmail', 'a login that is not on our team’s list', 'code']], end: [['The list says the client made them', '', 'block']] },
        { title: 'C2, Oct 30', steps: [['Isaac edits a Meta ad set during his call with Waylon', 'Meta logs him as Isaac Stuart', 'code']], end: [['The list says the client made it', '', 'block']] },
        { title: 'Kogalla, Oct 25', steps: [['Igor takes off PMax’s 300% return target', 'from a login on our team’s list', 'code']], end: [['The list says Igor, on our team', '', 'keep']] }] },
      vcap: 'So a list can tell the Decide module that the client is working in the account, when it was our own teammate. A change with no record of who made it still counts as a person’s change.' },

    { about: ['mpruns'], kicker: 'The runs’ own notes',
      head: 'The runs post their notes on tasks under Will’s login, so the list counts each note as a teammate’s word',
      visual: { type: 'dots', groups: [[6, 'block', 'begin with “Automation run”'], [1, 'block', 'says “Done on 10/28 by Claude for Will”'], [5, 'code', 'more were posted as William']] },
      vcap: 'We counted the 12 teammates’ words that the list held for C2, in a test on a copy of Barbara’s data from Nov 3. All 12 were posted as William, and none came from Isaac or another teammate. So the count of teammates’ words can be high when no teammate wrote anything.' },

    { about: ['mpwhole'], kicker: 'A question for Will',
      head: 'Yasir’s holds sit near the end of long weekly reports, so the list lost both of them',
      visual: { type: 'flow', rows: [
        { title: 'Oct 28, on task 4345', steps: [['Yasir’s weekly report for Bull, 2,778 characters', '“Next I’m keeping bids and budgets as they are while we get one to two weeks of clean tracking.”', 'will'], ['The task closed the next day', 'and the hold starts at character 2,614', 'block']], end: [['Not on the list', '', 'block']] },
        { title: 'Nov 2, on task 7131, open on Nov 3', steps: [['Yasir’s weekly report for Bull, 1,200 characters', '“Next: I’m holding bids one more week so we get a clean read with the new tracking.”', 'will'], ['The list keeps the first {motionWordChars} characters', 'and the hold starts at character 1,075', 'block']], end: [['The hold is cut off', '', 'block']] }] },
      vcap: 'On Nov 1 the Decide module still found the hold of Oct 28, but only because it read Yasir’s mail. The campaign modules see these comments only as a count.',
      open: 'mpwhole' }
  ],

  examples: {
    HIST: { tag: 'real', rows: [{ steps: [['Kogalla’s change history', 'the 14 days to Nov 1', 'code']], end: [['7 people’s changes', 'by Kathryn, Samia, Igor and Will', 'code']] }], note: 'We took this from the list that the In motion module made for Kogalla in a test on Nov 1.' },
    WHO: { tag: 'real', rows: [{ steps: [['Igor takes off PMax’s 300% target', 'Kogalla, Oct 25', 'code'], ['Did a person make the change?', 'yes, Igor did', 'code']], end: [['On the list', '', 'code']] }], note: 'We took this from the list that the In motion module made for Kogalla in a test on Nov 1.' },
    MACHINE: { tag: 'made', rows: [{ steps: [['Meta’s own system changes an ad', 'and its log names Meta as the maker', 'code'], ['Did a person make the change?', 'no, the platform did', 'code']], end: [['Left out', '', 'wait']] }], note: 'We made this up from the rule in code. Meta writes its own changes in its log under the name Meta, and code counts a run’s changes as Barbara’s own.' },
    NAME: { tag: 'real', rows: [{ steps: [['Yasir adds 2 ads on Bull’s Securities campaign', 'from his own Gmail login', 'code']], end: [['The list says the client made them', '', 'block']] }], note: 'We took this from the list that the In motion module made for Bull in a test on Nov 1.' },
    CHANGE: { tag: 'real', rows: [{ steps: [['Isaac cuts LA + New York’s daily budget from $200 to $150', 'Oct 30, during his call with Waylon', 'code']], end: [['A person’s change on the list, with who made it and why', '', 'code']] }], note: 'We took this from the list that the In motion module made for C2 in a test on Nov 1.' },
    TASKS: { tag: 'made', rows: [{ steps: [['Bull’s task 7131', 'Yasir’s report of Nov 2', 'will']], end: [['One comment from the last {motionWords} days', '', 'code']] }], note: 'The comment is real, read in a copy of Barbara’s data from Nov 3. No saved list came after code began to read comments on tasks.' },
    OPEN: { tag: 'real', rows: [{ steps: [['Bull’s task 4345', 'closed on Oct 29', 'code'], ['Is the task still open?', 'no', 'code']], end: [['Yasir’s report of Oct 28 is left out', '', 'block']] }], note: 'The task and its comment are real, read in a copy of Barbara’s data from Nov 3.' },
    CLOSED: { tag: 'made', rows: [{ steps: [['Yasir holds Bull’s bids and budgets on Oct 28', 'for one to two weeks', 'will']], end: [['Left out, because its task is closed', '', 'block']] }], note: 'We made this up from Yasir’s real comment, because no saved list came after code began to read comments on tasks.' },
    WORD: { tag: 'made', rows: [{ steps: [['Yasir’s report of Nov 2', '1,200 characters, on an open task', 'will']], end: [['A teammate’s word that stops at character {motionWordChars}', 'His hold starts at character 1,075, so the list cuts it off.', 'block']] }], note: 'We made this up from Yasir’s real comment, because no saved list came after code began to read comments on tasks.' }
  },

  reviewed: { self: 'c18ebd8d', above: 'e5411c45', on: '2026-11-08' }
});
