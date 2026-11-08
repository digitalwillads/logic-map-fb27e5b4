// Will's checks on the client: the verifiers' verify/src/modules.rs puts every goal of the trees inbox, meetings and crm in
// the client module (CLIENT_TREES, :39), but each goal sorted limit, tool or delete (OUT, :36); read 2026-11-07, inbox has 7
// goals (6 alarm, 1 limit), meetings 10 (6 alarm, 4 tool) and crm 35 (15 alarm, 15 tool, 5 limit), so 27 of 52. `verify module
// client --client <id>` (cli/src/verify_cmd/module.rs:1-36) reuses a tree's run of today or runs it once, asks Jev nothing
// (each Jev check is a QUESTION for the model since Nov 2), shows each FAIL, could-not-check and QUESTION with its id, and keeps
// its run in state/modules/client/runs/. `act cases push` sends the run to Barbara (comm-chat src/modules/run.rs:1-10).
// The account scorecard's two items for strategy and client (comm-chat src/validators_api/exam.rs:166-167, :447-466;
// src/scorecard/mod.rs:53, 30 days); no tree goal maps to that area, so the facts say "No stored check covers this yet."
// (src/modules/brief/checks.rs:13-22). The inbox reads will@ only (verify/trees/inbox.toml:24). Real runs: the verifiers'
// client runs of Nov 1 (Bull Law, Kogalla, C2); C2's answer 44; the inbox waivers it led to (inbox.toml:191, :349); KDX's
// facts of Nov 7. Old part: retired/2026-11-07-client-redo/clientchecks.js, and the failed checks of clientbrief.js.
LOGIC.flow({
  id: 'cgoals', parent: 'client',
  title: 'Will’s checks on the client', short: 'Will’s checks',
  head: 'The client answers 27 of Will’s checks on the inbox, the meetings and the client’s record, and each failure needs an answer',
  chart: [
    'flowchart TB',
    'LISTED["Code lists what the account<br/>scorecard says, such as a client<br/>gone quiet or no strategy page"]:::code',
    'RUN["Opus runs the client check<br/>on Will’s computer"]:::will',
    'INBOX["The inbox: 6 checks on who<br/>waits on us, and a clean inbox"]:::will',
    'MEET["The meetings: 6 checks on<br/>recordings, action items<br/>and decisions"]:::will',
    'CRM["The client’s record: 15 checks<br/>on the record and its money"]:::will',
    'OUT["Left out: the limit and tool<br/>checks of those three"]:::will',
    'TODAY{"Did each of the three<br/>already run today?"}:::will',
    'LINES["Each check that did not pass<br/>becomes a line: a failure, a<br/>question, or could not check"]:::will',
    'PUSH["The run goes to Barbara,<br/>and each line keeps its id"]:::code',
    'ANS(["Opus answers each failure<br/>and each question by its id"]):::opus',
    'LISTED --> RUN',
    'RUN --> INBOX', 'RUN --> MEET', 'RUN --> CRM', 'OUT -. "never in<br/>this module" .-> RUN',
    'INBOX --> TODAY', 'MEET --> TODAY', 'CRM --> TODAY',
    'TODAY -- "yes, so it reads that run" --> LINES', 'TODAY -- "no, so it runs each once" --> LINES',
    'LINES --> PUSH', 'PUSH --> ANS'
  ],
  links: { LISTED: 'cglisted', INBOX: 'cginbox', MEET: 'cgmeet', CRM: 'cgcrm', OUT: 'cgout', TODAY: 'cgtoday', LINES: 'cglines', PUSH: 'cgpush' },
  leaves: {
    cglisted: 'What the account scorecard lists',
    cginbox: 'The inbox checks',
    cgmeet: 'The meeting checks',
    cgcrm: 'The record checks',
    cgout: 'Left out',
    cgtoday: 'A run of today counts',
    cglines: 'From check to line',
    cgpush: 'The push'
  },

  // Each slide belongs to one view: the part's own slides first, then one or more for each rule.
  deck: [
    { about: ['cgoals'], kicker: '27 of 52',
      head: 'The client answers 27 of the 52 checks on the inbox, the meetings and the client’s record',
      visual: { type: 'bars', max: 35, rows: [
        { label: 'The inbox, with 1 left out', parts: [[6, 'will', '6 in'], [1, 'next', '']] },
        { label: 'The meetings, with 4 left out', parts: [[6, 'will', '6 in'], [4, 'next', '']] },
        { label: 'The client’s record, with 20 left out', parts: [[15, 'will', '15 in'], [20, 'next', '20 out']] }] },
      vcap: 'The modules plan of Oct 31 named the same 27. The A&R check-in also has a module, The record, that answers the record checks for every client at once.',
      stats: [['27', 'checks The client answers', 'real'], ['52', 'checks on the inbox, the meetings and the record', 'real']] },
    { about: ['cgoals'], kicker: 'Three clients · Nov 1',
      head: 'The client check found 8 failures on C2, and none on Bull Legal or Kogalla',
      visual: { type: 'bars', max: 16, rows: [
        { label: 'Bull Legal, in 91.2 s', parts: [[2, 'wait', '2 unchecked'], [9, 'keep', '9 passed']] },
        { label: 'Kogalla, in 64.2 s', parts: [[3, 'wait', '3 unchecked'], [5, 'keep', '5 passed']] },
        { label: 'C2, in 77.4 s', parts: [[8, 'block', '8 failed'], [3, 'wait', '3 unchecked'], [5, 'keep', '5 passed']] }] },
      vcap: 'These are the verifiers’ client runs of Nov 1, between 3:30 and 3:36 AM ET. An unchecked check is one that could not run, and the check of a cancel request could not run on any of the three, because its read is not built.' },

    { about: ['cglisted'], kicker: 'What the account scorecard lists',
      head: 'Barbara’s account scorecard lists what looks wrong on each client, and two of its items are for The client to answer',
      visual: { type: 'gate', rows: [
        ['No strategy page is written', 'The account’s goal is blank.', 'hold'],
        ['The client has gone quiet', 'No mail or recorded call has come from the client’s people for {clientQuiet} days or more.', 'hold']],
        end: ['Answered in words, among the answer’s checks', 'opus'] },
      vcap: 'KDX’s facts of Nov 7 list that the client has been quiet for 69 days, because Kevin last wrote on Aug 27. No check of Will’s maps to strategy and client, so the facts of the other five test clients say “No stored check covers this yet.”',
      stats: [['69', 'days with no word from KDX’s people, Nov 7', 'real'], ['5 of 6', 'test clients with nothing listed, Nov 7', 'real']] },

    { about: ['cginbox'], kicker: 'The inbox checks',
      head: 'Six inbox checks read one mailbox, Will’s',
      visual: { type: 'gate', rows: [
        ['No client waits on us', 'C2 failed it, because Waylon’s “Issue with site?” of Oct 12 had waited 19.7 days.', 'stop'],
        ['No client waits on a teammate', 'C2 failed it, because Waylon’s lead-sheet question to Isaac of Oct 5 had no answer.', 'stop'],
        ['No prospect waits on us', 'Nothing of C2’s to check.', 'wait'],
        ['Machine mail is filed, not piled', 'C2 failed it, with an OpenAI mail that names no client and Waylon’s 2 declined invites.', 'stop'],
        ['Google reps never stay in the inbox', 'Nothing of C2’s to check.', 'wait'],
        ['Cold pitches never stay in the inbox', 'Nothing of C2’s to check.', 'wait']],
        end: ['3 failed on C2, Nov 1', 'block'] },
      vcap: 'Kogalla writes to Daniel, so its inbox checks found nothing of Kogalla’s to check. C2’s run led to a new rule, because Will may now waive one message that a call or a text already answered.' },

    { about: ['cgmeet'], kicker: 'The meeting checks',
      head: 'Six meeting checks ask that each call is recorded, its items drafted, and its decisions logged on time',
      visual: { type: 'gate', rows: [
        ['Each meeting is recorded and transcribed, or has a known reason', 'C2 failed it, because the SEO call of Oct 5 has no recording.', 'stop'],
        ['Every action item is drafted, with an owner, a due date, and whose it is', 'C2 failed it, because an item of Oct 7 names a day but has no due date.', 'stop'],
        ['Each proposal is approved or discarded within 1 business day', 'C2 failed it, because proposals of Oct 14 and Oct 21 were reviewed on Oct 26.', 'stop'],
        ['Each task from a meeting is done by its due date', 'C2 failed it, with tasks from 5 calls late or archived.', 'stop'],
        ['Each decision made in a client meeting reaches the client’s notebook within 1 business day', 'C2 failed it, because Oct 7, 14 and 21 were logged on Oct 26.', 'stop'],
        ['Each sales call ends with a next step, and the prospect hears from us within 1 business day', 'No sales call of C2’s.', 'wait']],
        end: ['5 failed on C2, Nov 1', 'block'] },
      vcap: 'Answer 44 called three of them history, because a late log line cannot be on time now. It named the gap that was still open, since the call of Oct 30 has no recording, so its decisions are in no notebook.' },

    { about: ['cgcrm'], kicker: 'The record checks',
      head: 'Fifteen record checks look at the client’s record and its money, by the client’s stage',
      visual: { type: 'gate', rows: [
        ['The record has a type, a start date, and a live service', '', 'pass'],
        ['The active client is billed, and the billing is healthy', '', 'pass'],
        ['Each payment is linked to exactly one real client', '', 'pass'],
        ['Links on the same money name the same client', '', 'pass'],
        ['The plan sources agree with the billing schedule', '', 'pass'],
        ['An active client has not ended', 'Could not check, because the read of a cancel request is not built.', 'hold'],
        ['Billing agrees with the plan, and the contract is signed', 'Could not check, because billing and the plan conflict.', 'hold'],
        ['Each payment matches the plan in amount, rail, and timing', 'Could not check, because $1,715 was paid against a $3,000 plan.', 'hold']],
        end: ['C2, Nov 1, with 5 passed and 3 that could not check', 'wait'] },
      vcap: 'The checks of prospects and of onboarding have nothing to check on an active client. Answer 44 explained the $1,715 as the old $2,500 plan, less a $285 prorate and a $500 credit.' },

    { about: ['cgout'], kicker: 'Left out',
      head: 'The client leaves out two kinds of check, because each limit runs in the change check and each tool check is tested with its tool',
      visual: { type: 'dots', groups: [[27, 'will', 'checks The client answers'], [6, 'next', 'limit checks, which run in the change check for every module'], [19, 'next', 'tool checks, which each tool’s own tests hold']] },
      vcap: 'For example, “The cleanup never hides real mail” is a limit, and “Each meeting is filed under the right client or prospect” is a tool check. None of the 52 is marked for deletion.' },

    { about: ['cgtoday'], kicker: 'A run of today',
      head: 'A check that already ran today is read again, and one that did not runs once',
      visual: { type: 'timeline', items: [
        ['3:30 AM ET', 'Bull Legal has no run of the inbox, the meetings or the record that day, so the module runs each once, in 91.2 s.'],
        ['3:31 AM ET', 'Kogalla’s inbox and meetings hold nothing of Kogalla’s, and the record runs once, in 64.2 s.'],
        ['3:32 AM ET', 'Bull Legal again, and this time it reads the runs of 3:30, 3:31 and 3:32 AM, in 0.0 s.'],
        ['3:34 AM ET', 'C2 has no run that day, so each of the three runs once, in 77.4 s.']] },
      vcap: 'A check that holds a question for Jev reuses only an earlier module run that asked Jev nothing, because its own runs still ask Jev. The module’s run is kept apart, so it never counts as a check of the whole client.' },

    { about: ['cglines'], kicker: 'From check to line',
      head: 'Each check that did not pass becomes one line, which Opus must answer, or may',
      visual: { type: 'flow', rows: [
        { title: 'A failure', steps: [['A check failed', 'C2’s “No client waits on us”', 'block']], end: [['Opus must say no, with its fix or its case', '', 'opus']] },
        { title: 'A question', steps: [['A check for Jev, with no AI judge now', 'it says what yes and no mean, and what it judges', 'will']], end: [['Opus must say yes or no from its own reads', '', 'opus']] },
        { title: 'Could not check', steps: [['The check had nothing to read', 'C2’s read of a cancel request', 'wait']], end: [['Opus may answer it, but nothing passes it', '', 'opus']] }] },
      vcap: 'The runs of Nov 1 came before this change, so Jev still judged inside them, and they show failures and could-not-checks but no question.',
      quote: ['lets then have the questions run with just the model and no judge', 'Nov 2'] },

    { about: ['cgpush'], kicker: 'The push',
      head: 'The push sends the run to Barbara, and its last line gives the id that the answer must name',
      visual: { type: 'flow', rows: [
        { steps: [['The client check on C2', 'on Will’s computer', 'will'], ['The push', 'it sends the run to Barbara as a module run', 'code'], ['Its last line', 'the run’s id', 'code']], end: [['The answer names that id', '', 'opus']] }] },
      vcap: 'The five client runs of Nov 1 came before the push, so answer 44 names no run.' }
  ],

  examples: {
    LISTED: { tag: 'real', rows: [{ steps: [['KDX, Nov 7', 'the account scorecard’s line', 'code']], end: [['The client has been quiet for 69 days', 'their newest word was a mail of Aug 27', 'block']] }], note: 'The facts that code gathered for KDX on Nov 7.' },
    RUN: { tag: 'real', rows: [{ steps: [['The client check on C2', 'Nov 1, 3:34 AM ET', 'will'], ['The inbox, the meetings and the record', 'for C2 alone', 'will']], end: [['Done in 77.4 s', '', 'will']] }], note: 'The verifiers’ client run of Nov 1 on C2.' },
    INBOX: { tag: 'real', rows: [{ steps: [['The inbox, C2', 'Nov 1', 'will'], ['3 failed', 'a client waits on us, a client waits on a teammate, and machine mail is not filed', 'block']], end: [['Lines for the answer', '', 'will']] }], note: 'The verifiers’ client run of Nov 1 on C2.' },
    MEET: { tag: 'real', rows: [{ steps: [['The meetings, C2', 'Nov 1', 'will'], ['5 failed', 'recordings, items, proposals, tasks and decisions', 'block']], end: [['Lines for the answer', '', 'will']] }], note: 'The verifiers’ client run of Nov 1 on C2.' },
    CRM: { tag: 'real', rows: [{ steps: [['The record, C2', 'Nov 1', 'will'], ['5 passed, and 3 could not check', 'a cancel request, the contract, and the $1,715 payment', 'wait']], end: [['Lines for the answer', '', 'will']] }], note: 'The verifiers’ client run of Nov 1 on C2.' },
    OUT: { tag: 'real', rows: [{ steps: [['“The cleanup never hides real mail”', 'a limit check', 'will'], ['Not in the client module', '', 'will']], end: [['No line in any client run', '', 'will']] }], note: 'None of the five client runs of Nov 1 shows a limit or a tool check.' },
    TODAY: { tag: 'real', rows: [{ steps: [['Bull Legal, 3:32 AM ET', 'Nov 1', 'will'], ['The runs of 3:30 to 3:32 AM', 'all from that day', 'will']], end: [['Read, not run again, in 0.0 s', '', 'will']] }], note: 'The verifiers’ second client run of Nov 1 on Bull Legal. Its first one ran each of the three once, in 91.2 s.' },
    LINES: { tag: 'real', rows: [{ steps: [['C2’s run', 'Nov 1', 'will'], ['8 failures and 3 could-not-checks', 'and the 5 that passed make no line', 'will']], end: [['11 lines for the answer', '', 'opus']] }], note: 'The verifiers’ client run of Nov 1 on C2. It has no question line, because Jev still judged inside the runs then.' },
    PUSH: { tag: 'made', rows: [{ steps: [['A client check of today', '', 'will'], ['The push', '', 'code']], end: [['Barbara holds it, with its id', '', 'code']] }], note: 'Made, because no client run has been pushed yet. The runs of Nov 1 came before the push.' },
    ANS: { tag: 'real', rows: [{ steps: [['Answer 44’s checks', 'the 8 failures, the 3 could-not-checks and the scorecard’s item', 'opus'], ['Answered in words', 'with no ids, and no run named', 'opus']], end: [['12 checks answered', '', 'opus']] }], note: 'C2’s answer 44, of Nov 1.' }
  },

  reviewed: { self: '5bd74288', above: 'a94aa4ce', on: '2026-11-07' }
});
