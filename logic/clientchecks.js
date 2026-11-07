// The checks it answers: the verifiers' verify/src/modules.rs puts every goal of the trees inbox, meetings and crm in
// the client module (CLIENT_TREES, 39; runs, 68-80; module_of, 185-194), but each goal of sort limit, tool or delete (OUT,
// 36). The goals: verify/trees/inbox.toml, meetings.toml, crm.toml. `verify module client --client <id>` (cli/src/
// verify_cmd/module.rs:1-36) reuses a tree's run of today or runs it once, shows each FAIL, could-not-check and QUESTION
// with its id, and `act cases push` sends the run to Barbara (comm-chat src/modules/run.rs:1-10). Real runs:
// ~/Projects/verifiers/state/modules/client/runs/ (Nov 1: Bull Law, Kogalla, C2).
LOGIC.flow({
  id: 'clientchecks', parent: 'client',
  title: 'The checks it answers', short: 'Its checks',
  head: 'The client answers 27 goals of three trees: inbox, meetings and CRM',
  chart: [
    'flowchart TB',
    'CMD(["Opus runs verify module<br/>client for this client"]):::opus',
    'INBOX["Inbox: 6 goals<br/>who waits on us,<br/>a clean inbox"]:::will',
    'MEET["Meetings: 6 goals<br/>recorded, items,<br/>decisions"]:::will',
    'CRM["CRM: 15 goals<br/>the record and<br/>its money"]:::will',
    'OUT["Left out: each limit,<br/>tool and delete goal"]:::will',
    'TODAY{"A run of each tree<br/>from today?"}:::will',
    'LINES["Each goal that did not pass<br/>is a line: FAIL, could not<br/>check, or QUESTION"]:::will',
    'PUSH["act cases push sends the run<br/>to Barbara, with its id"]:::code',
    'ANS(["The answer names the run,<br/>and answers each FAIL<br/>and QUESTION"]):::opus',
    'CMD --> INBOX', 'CMD --> MEET', 'CMD --> CRM', 'CMD -.- OUT',
    'INBOX --> TODAY', 'MEET --> TODAY', 'CRM --> TODAY',
    'TODAY -- "yes: read it" --> LINES', 'TODAY -- "no: run it once" --> LINES',
    'LINES --> PUSH', 'PUSH --> ANS'
  ],
  links: { INBOX: 'clientinbox', MEET: 'clientmeet', CRM: 'clientcrm', OUT: 'clientout', TODAY: 'clientreuse', LINES: 'clientlines', PUSH: 'clientpush' },
  leaves: {
    clientinbox: 'The inbox goals',
    clientmeet: 'The meeting goals',
    clientcrm: 'The CRM goals',
    clientout: 'Left out',
    clientreuse: 'A run of today',
    clientlines: 'From goal to line',
    clientpush: 'The push'
  },

  // Each slide belongs to one view: the part's own slides first, then one or more for each box.
  deck: [
    { about: ['clientchecks'], kicker: '27 of 52',
      head: 'The client takes every goal of three trees, but the limit, tool and delete goals',
      visual: { type: 'bars', max: 35, rows: [
        { label: 'Inbox', parts: [[6, 'will', '6 in'], [1, 'next', '1 out']] },
        { label: 'Meetings', parts: [[6, 'will', '6 in'], [4, 'next', '4 out']] },
        { label: 'CRM', parts: [[15, 'will', '15 in'], [20, 'next', '20 out']] }] },
      vcap: 'The modules plan of Oct 31 named the same 27. The A&R check-in’s module The record answers the CRM goals too, for the whole book.',
      stats: [['27', 'goals The client answers', 'real'], ['52', 'goals in the three trees', 'real']] },
    { about: ['clientchecks'], kicker: 'Three clients · Nov 1',
      head: 'The client’s check found 8 failures on C2, and none on Bull Legal or Kogalla',
      visual: { type: 'bars', max: 16, rows: [
        { label: 'Bull Legal, 91.2 s', parts: [[2, 'wait', '2 could not check'], [9, 'keep', '9 passed']] },
        { label: 'Kogalla, 64.2 s', parts: [[3, 'wait', '3 could not check'], [5, 'keep', '5 passed']] },
        { label: 'C2, 77.4 s', parts: [[8, 'block', '8 failed'], [3, 'wait', '3 could not check'], [5, 'keep', '5 passed']] }] },
      vcap: 'The verifiers’ client runs of Nov 1, 3:30 to 3:36 AM ET. One goal could not check on all three: the read of a cancel request is not built.' },

    { about: ['clientinbox'], kicker: 'The inbox goals',
      head: 'Six inbox goals, read from one mailbox: will@',
      visual: { type: 'gate', rows: [
        ['No client waits on us', 'C2: Waylon’s “Issue with site?” of Oct 12, 19.7 days', 'stop'],
        ['No client waits on a teammate', 'C2: Waylon’s lead-sheet question to Isaac, Oct 5', 'stop'],
        ['No prospect waits on us', 'nothing of C2’s to check', 'wait'],
        ['Machine mail is filed, not piled', 'C2: an OpenAI mail with no client, and Waylon’s 2 declined invites', 'stop'],
        ['Google reps never stay in the inbox', 'nothing of C2’s to check', 'wait'],
        ['Cold pitches never stay in the inbox', 'nothing of C2’s to check', 'wait']], end: ['3 failed on C2, Nov 1', 'block'] },
      vcap: 'Kogalla writes to Daniel, so its inbox goals found nothing of Kogalla’s. C2’s run led to a new check: Will may waive one message that a call or a text answered.' },
    { about: ['clientmeet'], kicker: 'The meeting goals',
      head: 'Six meeting goals: recorded, drafted, reviewed, done, in the notebook, followed up',
      visual: { type: 'gate', rows: [
        ['Each meeting is recorded and transcribed, or has a known reason', 'C2: the SEO call of Oct 5 has no recording', 'stop'],
        ['Every action item is drafted, with an owner, a due date, and whose it is', 'C2: an item of Oct 7 names a day but has no due date', 'stop'],
        ['Each proposal is approved or discarded within 1 business day', 'C2: proposals of Oct 14 and Oct 21, reviewed Oct 26', 'stop'],
        ['Each task from a meeting is done by its due date', 'C2: tasks from 5 calls, late or archived', 'stop'],
        ['Each decision made in a client meeting reaches the client’s notebook within 1 business day', 'C2: Oct 7, 14 and 21 logged on Oct 26', 'stop'],
        ['Each sales call ends with a next step, and the prospect hears from us within 1 business day', 'no sales call of C2’s', 'wait']], end: ['5 failed on C2, Nov 1', 'block'] },
      vcap: 'Answer 44 called three of them history: a late log line cannot be on time now. It named the open gap: the Oct 30 call has no recording, so its decisions are in no notebook.' },
    { about: ['clientcrm'], kicker: 'The CRM goals',
      head: 'Fifteen CRM goals check the record and its money, by the client’s stage',
      visual: { type: 'gate', rows: [
        ['The record has a type, a start date, and a live service', '', 'pass'],
        ['The active client is billed, and the billing is healthy', '', 'pass'],
        ['Each payment is linked to exactly one real client', '', 'pass'],
        ['Links on the same money name the same client', '', 'pass'],
        ['The plan sources agree with the billing schedule', '', 'pass'],
        ['An active client has not ended', 'could not check: the read of a cancel request is not built', 'hold'],
        ['Billing agrees with the plan, and the contract is signed', 'could not check: billing and the plan conflict', 'hold'],
        ['Each payment matches the plan in amount, rail, and timing', 'could not check: $1,715 paid against a $3,000 plan', 'hold']], end: ['C2, Nov 1: 5 passed, 3 could not check', 'wait'] },
      vcap: 'The prospect and onboarding goals have nothing to check on an active client. Answer 44 explained the $1,715: the old $2,500 plan, less a $285 prorate and a $500 credit.' },
    { about: ['clientout'], kicker: 'Left out',
      head: 'A limit runs in the change check, and a tool goal in its tool’s own tests',
      visual: { type: 'dots', groups: [[27, 'will', 'goals The client answers'], [6, 'next', 'limit goals: they run in the change check, for every module'], [19, 'next', 'tool goals: each tool’s own tests hold them']] },
      vcap: 'For example, “The cleanup never hides real mail” is a limit, and “Each meeting is filed under the right client or prospect” is a tool goal. No goal of the three trees is a delete goal.' },
    { about: ['clientreuse'], kicker: 'A run of today',
      head: 'A tree’s run of today counts; with none, the module runs it once',
      visual: { type: 'timeline', items: [
        ['3:30 AM ET', 'Bull Legal: no run of inbox, meetings or CRM that day, so the module runs each once: 91.2 s.'],
        ['3:31 AM ET', 'Kogalla: inbox and meetings hold nothing of Kogalla’s; CRM runs once: 64.2 s.'],
        ['3:32 AM ET', 'Bull Legal again: it reads the runs of 3:30, 3:31 and 3:32 AM: 0.0 s.'],
        ['3:34 AM ET', 'C2: each tree runs once: 77.4 s.']] },
      vcap: 'A tree that holds a Jev question for this module reuses only a run that asked no Jev. The run stays in the module’s own folder, so it never reads as a check of the whole client.' },
    { about: ['clientlines'], kicker: 'From goal to line',
      head: 'Each goal that did not pass becomes one line, which Opus must answer, or may',
      visual: { type: 'flow', rows: [
        { title: 'FAIL', steps: [['A check failed', 'C2: “No client waits on us”', 'block']], end: [['Opus must say no, with its fix or its case', '', 'opus']] },
        { title: 'QUESTION', steps: [['A Jev check, with no AI judge', 'what yes and no mean, and what it judges', 'will']], end: [['Opus must say yes or no, from its own reads', '', 'opus']] },
        { title: 'Could not check', steps: [['The check had nothing to read', 'C2: the read of a cancel request', 'wait']], end: [['Opus may answer it; nothing passes it', '', 'opus']] }] },
      vcap: 'The runs of Nov 1 came before this change: Jev still judged inside them, so they show FAILs and could-not-checks, and no QUESTION.',
      quote: ['lets then have the questions run with just the model and no judge', 'Nov 2'] },
    { about: ['clientpush'], kicker: 'The push',
      head: 'act cases push sends the run to Barbara; its last line gives the id the answer must name',
      visual: { type: 'flow', rows: [{ steps: [['verify module client --client 13', 'on Will’s computer', 'will'], ['act cases push', 'the run goes to Barbara as a module run', 'code'], ['Its last line', 'the run’s id', 'code']], end: [['The answer names it in module_run', '', 'opus']] }] },
      vcap: 'The five client runs of Nov 1 came before the push: answer 44 names no run.' }
  ],

  examples: {
    CMD: { tag: 'real', rows: [{ steps: [['verify module client, C2', 'Nov 1, 3:34 AM ET', 'will'], ['Inbox, meetings, CRM', 'for C2 only', 'will']], end: [['77.4 s', '', 'will']] }], note: 'Run folder 2026-11-01T083453-c2-management.' },
    INBOX: { tag: 'real', rows: [{ steps: [['Inbox, C2', 'Nov 1', 'will'], ['3 failed', 'a client waits on us, a client waits on a teammate, machine mail not filed', 'will']], end: [['Lines for the answer', '', 'will']] }], note: 'Run folder 2026-11-01T083453-c2-management.' },
    MEET: { tag: 'real', rows: [{ steps: [['Meetings, C2', 'Nov 1', 'will'], ['5 failed', 'recorded, items, proposals, tasks, decisions', 'will']], end: [['Lines for the answer', '', 'will']] }], note: 'Run folder 2026-11-01T083453-c2-management.' },
    CRM: { tag: 'real', rows: [{ steps: [['CRM, C2', 'Nov 1', 'will'], ['5 passed, 3 could not check', 'a cancel request, the contract, the $1,715 payment', 'will']], end: [['Lines for the answer', '', 'will']] }], note: 'Run folder 2026-11-01T083453-c2-management.' },
    OUT: { tag: 'real', rows: [{ steps: [['“The cleanup never hides real mail”', 'a limit goal', 'will'], ['Not in the client module', '', 'will']], end: [['No line in any client run', '', 'will']] }], note: 'None of the five client runs of Nov 1 shows a limit or tool goal.' },
    TODAY: { tag: 'real', rows: [{ steps: [['Bull Legal, 3:32 AM ET', 'Nov 1', 'will'], ['The runs of 3:30 to 3:32 AM', 'from today', 'will']], end: [['Read, not run again: 0.0 s', '', 'will']] }], note: 'Run folder 2026-11-01T083216-bull-law. Its first run, 2026-11-01T083034-bull-law, ran each tree once in 91.2 s.' },
    LINES: { tag: 'real', rows: [{ steps: [['C2’s run', 'Nov 1', 'will'], ['8 FAIL, 3 could not check', '5 goals passed: no line', 'will']], end: [['11 lines for the answer', '', 'opus']] }], note: 'Run folder 2026-11-01T083453-c2-management. No QUESTION lines: Jev still judged inside the runs then.' },
    PUSH: { tag: 'made', rows: [{ steps: [['A client run of today', '', 'will'], ['act cases push', '', 'code']], end: [['Barbara holds it, with its id', '', 'code']] }], note: 'No client run has been pushed: the runs of Nov 1 came before the push.' },
    ANS: { tag: 'real', rows: [{ steps: [['Answer 44’s checks', 'the 8 FAILs and 3 could-not-checks, and Barbara’s list', 'opus'], ['Answered in words', 'no ids, and no run named', 'opus']], end: [['12 checks', '', 'opus']] }], note: 'C2, Nov 1, answer 44.' }
  },

  reviewed: { self: '6b4963c2', above: '47369265', on: '2026-11-07' }
});
