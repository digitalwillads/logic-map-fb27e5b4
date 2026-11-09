// The open cases on In motion's list. comm-chat at origin/main 1c24d43a, read 2026-11-08: src/modules/brief/code.rs:100-160
// (`cases_moving`: each test, each change that missed its check, each question or wait on a person, each follow-up due, in
// that order), :83-93 (`test_line`), :31-33 (titles cut at 100 characters, questions at 200); :166-172 (the cases that touch
// only a paused campaign are set aside first); src/cases/boxes.rs:207-219 (`place_of`: a case's box by its state; a change
// that went out is checked from its push on; a wait sends a case to Later), :684-709 (`checks`: its follow-up days and
// marks); src/cases/store.rs:866-905 (`missed`: reopened by the verifier after a failed check, a person's reopen is none),
// :1663-1740 (`due_now`, `due_followups`: one follow-up a case, the newest whose day came with no score; a check that waits
// for a fix of ours is not due); src/modules/queue.rs:125-129 (`missed_line`); code.rs:196 (overdue or missed is a problem).
// Code's own tests on KDX's real cases: src/modules/brief/tests.rs:197-305. Real cases, read 2026-11-08: C2's In motion answer
// of Nov 1 (49) and Kogalla's (15), with module_brief and answer_id; Bull's answer 1 has no line for case #149; in a copy of
// Barbara's data from Nov 3 (barbara-local, read-only), KDX's cases #6, #20, #196 and #253 and Bull's case #149 (open from
// Oct 31 to the evening of Nov 1, waiting until Nov 11). Bull's Decide answer 58 names case 149 as under way.
LOGIC.flow({
  id: 'mcases', parent: 'motion',
  title: 'The open cases on the list', short: 'The open cases',
  head: 'Each open case lands on the list by where it is now, as a test, a change that missed its check, or a question for a person',
  chart: [
    'flowchart TB',
    'OPEN(["Each open case of the client,<br/>except those that touch only<br/>a paused campaign"]):::code',
    'STATE{"Where is the<br/>case now?"}:::code',
    'TEST["A test, with where it works, its<br/>follow-up days and their marks, the<br/>day it ends and what it waits for"]:::code',
    'MISSED["A change that missed its check<br/>and is still on the account,<br/>with how it goes back"]:::block',
    'ASK["A question, with whom it waits<br/>on, since when, and what<br/>the answer decides"]:::will',
    'LEFT(["Not listed, because the run is<br/>still working on it, or it<br/>waits for a day"]):::code',
    'DUE{"Has a follow-up’s day come,<br/>with no score yet?"}:::code',
    'NOTYET(["Not yet, so only the test<br/>line, with its next check"]):::code',
    'TODAY(["Listed as due today"]):::code',
    'LATE(["Listed as overdue, and the<br/>whole list is a problem"]):::block',
    'OPEN --> STATE',
    'STATE -- "its change went out" --> TEST',
    'STATE -- "a check failed after it went out" --> MISSED',
    'STATE -- "it waits on a person" --> ASK',
    'STATE -- "anything else" --> LEFT',
    'TEST --> DUE',
    'DUE -- "not yet" --> NOTYET',
    'DUE -- "yes, today" --> TODAY',
    'DUE -- "yes, an earlier day" --> LATE'
  ],
  links: { TEST: 'mctest', MISSED: 'mcmissed', ASK: 'mcask', LEFT: 'mcleft', DUE: 'mcdue', TODAY: 'mcdue', LATE: 'mcdue' },
  leaves: {
    mctest: 'A test and its days',
    mcmissed: 'A change that missed its check',
    mcask: 'A question for a person',
    mcleft: { title: 'Should a case that waits for a day be on the list?', open: {
      q: 'A case that waits for a day stays off the list, because nothing of it has gone out. But such a wait often means that nothing should change there until that day. On Nov 1, Bull’s case #149 waited until Nov 11 for two weeks of results after Yasir’s changes of Oct 28, and Bull’s list had no line for it. The Decide module found it that morning by its own reads, and named it as under way. Should a case that waits for a day be on the list?',
      since: 'Nov 8',
      opts: [
        ['Yes, list each case that waits for a day, with that day and what it waits for', true, 'A wait that the run chose stays in view until its day, for the Decide module and in the counts that the campaign modules see. Code adds one more kind of line.'],
        ['Keep it as it is', false, 'Only work that went out, or that waits on a person, is on the list. A wait until a day shows only in the case itself, and in a campaign module’s own list of open cases on its campaign.']] } },
    mcdue: 'A follow-up that is due, or overdue'
  },

  // Each slide belongs to one view: the part's own slides first, then one or more for each rule.
  deck: [
    { about: ['mcases'], kicker: 'The idea',
      head: 'A case lands on the list by where it is now, so the same piece of work can be a test one day and a question the next',
      visual: { type: 'flow', rows: [
        { title: 'KDX, Oct 31', steps: [['The raise of NonBrand’s target to $60 goes out', 'case #196', 'code']], end: [['A test from that minute, with checks to prove it', '', 'code']] },
        { title: 'KDX, Nov 2', steps: [['Putting $42 back waits for Will’s yes', 'case #253', 'will']], end: [['A question for Will', '', 'will']] },
        { title: 'Bull, Nov 1', steps: [['A case waits until Nov 11 for two weeks of results', 'case #149', 'code']], end: [['Not on the list, because it waits for a day', '', 'wait']] }] },
      vcap: 'These are the places of Barbara’s Cases tab. A change that went out is a test, a check that failed sends the case back, and a case that needs someone waits on a person. Code does not read a case’s words to decide this, only where the case is.' },

    { about: ['mctest'], kicker: 'A test',
      head: 'A test line tells the modules where a change is being proven, when the next check comes and when the test ends',
      visual: { type: 'card', title: 'KDX’s $42 test, as the list would show it on Oct 31', fields: [
        ['Where', 'DWA NonBrand'],
        ['What it tests', 'Its target cost per lead, set back from $55 to $42 on Oct 23'],
        ['Its checks', 'Day 3 on Oct 26 passed, day 14 on Nov 6 is next, and day 30 on Nov 22 comes later'],
        ['It ends', 'Nov 22'],
        ['So far', 'Check 1 is on track']],
        stamp: ['A new bid change here would cross the test', 'block'] },
      vcap: 'Code’s own test sets up this case with KDX’s real plan and writes this line. With it on the list, the run of Oct 31 would have seen that the campaign was in the middle of a test with three weeks to go.' },

    { about: ['mcmissed'], kicker: 'A change that missed its check',
      head: 'A change that failed its check after it went out stays on the list until the Decide module says keep it, undo it or try another way',
      visual: { type: 'flow', rows: [
        { title: 'KDX’s case #6', steps: [['Two new negatives block 2 of NonBrand’s own keywords', 'so a fix goes out', 'code'], ['The read-back of Oct 26 fails', 'the push took out a third keyword that its plan did not name', 'block'], ['The case goes back to the run', 'with no test and no question on it', 'code']], end: [['No list showed it until Nov 1', '', 'block']] }] },
      vcap: 'Now the list shows each one with what the check found and how the change goes back, and the whole list turns into a problem. The Decide module must answer each one, or its own answer does not save.' },

    { about: ['mcask'], kicker: 'A question for a person',
      head: 'A question line names whom the case waits on, since when, and what the answer will decide',
      visual: { type: 'card', title: 'One of C2’s 29 questions, Nov 1', fields: [
        ['It waits on', 'Will'],
        ['Since', 'Oct 28'],
        ['The question', 'Jev picked the Tag Manager fix. May the run publish one version with both fixes? It is staged and nothing is live yet.'],
        ['It decides', 'One new published version of C2’s Tag Manager container, with the fixed Meta Lead tags']],
        stamp: ['Case #58', 'will'] },
      vcap: 'Code keeps the first line of the question, up to {motionAsked} characters. A case that waits on a person with no question written gives its title instead. On Kogalla that day, case #208 waited on Will in this way, because Will had set everything on that client to wait for him.' },

    { about: ['mcleft'], kicker: 'A question for Will',
      head: 'A case that waits for a day never reaches the list, even when the wait means that nothing should change until then',
      visual: { type: 'flow', rows: [
        { title: 'What Bull’s list said, Nov 1', steps: [['19 questions and 18 people’s changes', 'no line for case #149', 'code']], end: [['Nothing about a wait until Nov 11', '', 'wait']] },
        { title: 'What the Decide module did that morning', steps: [['It found case #149 by its own reads', 'waiting until Nov 11 for two weeks of results', 'opus']], end: [['Keep each budget and bid as it is until the Nov 11 read', 'and it named case 149 as under way', 'opus']] }] },
      vcap: 'A plan that the run has not sent yet stays off the list too, because the run sends it within minutes. A campaign module still sees a waiting case in its own list of open cases on its campaign, by its number and where it is, but not the day it waits for.',
      open: 'mcleft' },

    { about: ['mcdue'], kicker: 'A follow-up that is due',
      head: 'A follow-up whose day has passed with no score is overdue, and one overdue follow-up makes the whole list a problem',
      visual: { type: 'timeline', items: [
        ['Oct 23', 'The $42 target goes out on DWA NonBrand, so its days count from here.'],
        ['Oct 26, day 3', 'The first check scores it on track.'],
        ['Nov 6, day 14', 'The second check is due. Each morning the verifiers score the follow-ups that are due before code makes the list.'],
        ['Nov 8', 'If day 14 still has no score, the list says that follow-up 2 of the test is overdue since Nov 6, and the list is a problem.']] },
      vcap: 'Code lists one follow-up for each case, the newest whose day came with no score. Code’s own test runs this on KDX’s $42 test 16 days in. A check that waits for a fix of ours is not due until that fix is in.' }
  ],

  examples: {
    OPEN: { tag: 'made', rows: [{ steps: [['KDX’s open cases', '', 'code'], ['Those only on its 8 paused campaigns are set aside', 'such as a test negative on Midwest Targeting', 'code']], end: [['The rest are read', '', 'code']] }], note: 'Made from code’s own test, which sets up KDX’s real campaigns. No list was saved for KDX.' },
    STATE: { tag: 'made', rows: [{ steps: [['KDX’s case #196', 'its change went out on Oct 31', 'code'], ['Where is the case now?', 'being checked', 'code']], end: [['A test', '', 'code']] }], note: 'Made from KDX’s real case, read in a copy of Barbara’s data from Nov 3. No list was saved for KDX.' },
    TEST: { tag: 'made', rows: [{ steps: [['KDX’s case #20', 'the $42 target on DWA NonBrand', 'code']], end: [['A test with checks on days 3, 14 and 30', 'the next check on Nov 6, and the end on Nov 22', 'code']] }], note: 'Made from code’s own test, which replays KDX’s real test of Oct 23.' },
    MISSED: { tag: 'made', rows: [{ steps: [['KDX’s case #6', 'its read-back failed on Oct 26', 'block']], end: [['A change that missed its check, still on the account', 'and no undo is recorded', 'block']] }], note: 'Made from code’s own test, which replays KDX’s real case #6.' },
    ASK: { tag: 'real', rows: [{ steps: [['C2’s case #58', 'waiting since Oct 28', 'will']], end: [['A question for Will about publishing the Tag Manager fix', '', 'will']] }], note: 'We took this from C2’s In motion answer of Nov 1, saved in a test.' },
    LEFT: { tag: 'real', rows: [{ steps: [['Bull’s case #149', 'waiting until Nov 11', 'code']], end: [['Not on Bull’s list of Nov 1', '', 'wait']] }], note: 'Bull’s In motion answer of Nov 1 has no line for case #149, and the case was open that morning, by a copy of Barbara’s data from Nov 3.' },
    DUE: { tag: 'made', rows: [{ steps: [['KDX’s $42 test', 'day 14 came on Nov 6', 'code'], ['Does day 14 have a score?', 'not yet', 'code']], end: [['A follow-up that is due', '', 'code']] }], note: 'Made from code’s own test on KDX’s $42 test.' },
    NOTYET: { tag: 'made', rows: [{ steps: [['KDX’s $42 test on Oct 31', 'day 14 comes on Nov 6', 'code']], end: [['Only the test line, with its next check', '', 'code']] }], note: 'Made from code’s own test on KDX’s $42 test.' },
    TODAY: { tag: 'made', rows: [{ steps: [['A follow-up whose day is today', 'and the verifiers could not score it this morning', 'code']], end: [['Listed as due today', '', 'code']] }], note: 'Made from the rule in code. No saved list has a follow-up due.' },
    LATE: { tag: 'made', rows: [{ steps: [['KDX’s $42 test on Nov 8', 'day 14 still has no score', 'block']], end: [['Listed as overdue since Nov 6', 'so the whole list is a problem', 'block']] }], note: 'Made from code’s own test, which runs KDX’s $42 test 16 days in.' }
  },

  reviewed: {}
});
