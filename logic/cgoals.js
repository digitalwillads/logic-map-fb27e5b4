// Nov 8, 2026: plain-words pass (Will: "The client module needs a run that removes robot speak. Please make this
// intelligable"). Only the words changed, and the logic and every fact stayed the same. The module is "the client module",
// never "The client" alone; C2's answer 44 is "C2's test answer"; the brief is "the fact sheet". check-plain.cjs judges it.
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
  head: 'The client module answers 27 of Will’s checks on the inbox, the meetings and the client’s record, and each failure needs an answer',
  chart: [
    'flowchart TB',
    'LISTED["Code passes on what the account<br/>scorecard flags, such as a client<br/>gone quiet or no strategy page"]:::code',
    'RUN["Opus runs Will’s client checks<br/>on Will’s computer"]:::will',
    'INBOX["6 inbox checks, on who waits<br/>for us and a clean inbox"]:::will',
    'MEET["6 meeting checks, on recordings,<br/>action items and decisions"]:::will',
    'CRM["15 checks on the client’s<br/>record and its money"]:::will',
    'OUT["Left out are the limit checks and<br/>tool checks of those three groups"]:::will',
    'TODAY{"Did each of the three groups<br/>already run today?"}:::will',
    'LINES["Each check that did not pass<br/>becomes an item to answer, as<br/>a failure, a question, or a<br/>check that could not run"]:::will',
    'PUSH["The results go to Barbara,<br/>and each item keeps its id"]:::code',
    'ANS(["Opus answers each failure and<br/>each question, naming its id"]):::opus',
    'LISTED --> RUN',
    'RUN --> INBOX', 'RUN --> MEET', 'RUN --> CRM', 'OUT -. "never part of<br/>this module" .-> RUN',
    'INBOX --> TODAY', 'MEET --> TODAY', 'CRM --> TODAY',
    'TODAY -- "yes, so it does not<br/>run them again" --> LINES', 'TODAY -- "no, so it runs each once" --> LINES',
    'LINES --> PUSH', 'PUSH --> ANS'
  ],
  links: { LISTED: 'cglisted', INBOX: 'cginbox', MEET: 'cgmeet', CRM: 'cgcrm', OUT: 'cgout', TODAY: 'cgtoday', LINES: 'cglines', PUSH: 'cgpush' },
  leaves: {
    cglisted: 'What the account scorecard flags',
    cginbox: 'The inbox checks',
    cgmeet: 'The meeting checks',
    cgcrm: 'The record checks',
    cgout: 'The checks left out',
    cgtoday: 'A run from earlier today counts',
    cglines: 'Each check that did not pass becomes an item to answer',
    cgpush: 'Sending the results to Barbara'
  },

  // Each slide belongs to one view: the part's own slides first, then one or more for each rule.
  deck: [
    { about: ['cgoals'], kicker: '27 of 52',
      head: 'The client module answers 27 of the 52 checks on the inbox, the meetings and the client’s record',
      visual: { type: 'bars', max: 35, rows: [
        { label: 'The inbox, with 1 left out', parts: [[6, 'will', '6 in'], [1, 'next', '']] },
        { label: 'The meetings, with 4 left out', parts: [[6, 'will', '6 in'], [4, 'next', '']] },
        { label: 'The client’s record, with 20 left out', parts: [[15, 'will', '15 in'], [20, 'next', '20 out']] }] },
      vcap: 'The modules plan of Oct 31 picked these same 27 checks. The A&R check-in has its own module that answers the record checks for every client at once.',
      stats: [['27', 'checks that the client module answers', 'real'], ['52', 'checks on the inbox, the meetings and the record', 'real']] },
    { about: ['cgoals'], kicker: 'Three clients, Nov 1',
      head: 'Will’s client checks found 8 failures on C2, and none on Bull Legal or Kogalla',
      visual: { type: 'bars', max: 16, rows: [
        { label: 'Bull Legal, in 91.2 s', parts: [[2, 'wait', '2 could not run'], [9, 'keep', '9 passed']] },
        { label: 'Kogalla, in 64.2 s', parts: [[3, 'wait', '3 could not run'], [5, 'keep', '5 passed']] },
        { label: 'C2, in 77.4 s', parts: [[8, 'block', '8 failed'], [3, 'wait', '3 could not run'], [5, 'keep', '5 passed']] }] },
      vcap: 'These are the verifiers’ runs of the client checks on Nov 1, between 3:30 and 3:36 AM ET. One check, on cancel requests, could not run on any of the three, because the code that reads cancel requests is not built.' },

    { about: ['cglisted'], kicker: 'What the scorecard flags',
      head: 'Barbara’s account scorecard flags what looks wrong on each client, and two of its flags are for the client module to answer',
      visual: { type: 'gate', rows: [
        ['No strategy page is written', 'The account’s goal is blank.', 'hold'],
        ['The client has gone quiet', 'No mail or recorded call has come from the client’s people for {clientQuiet} days or more.', 'hold']],
        end: ['Answered in words, among the answer’s checks', 'opus'] },
      vcap: 'KDX’s fact sheet of Nov 7 says the client has been quiet for 69 days, because Kevin last wrote on Aug 27. None of Will’s checks covers strategy and the client yet, so for the other five test clients the fact sheet says “No stored check covers this yet.”',
      stats: [['69', 'days with no word from KDX’s people, Nov 7', 'real'], ['5 of 6', 'test clients with nothing flagged, Nov 7', 'real']] },

    { about: ['cginbox'], kicker: 'The inbox checks',
      head: 'Six inbox checks look at one mailbox, Will’s',
      visual: { type: 'gate', rows: [
        ['No client waits on us', 'C2 failed it, because Waylon’s “Issue with site?” of Oct 12 had waited 19.7 days.', 'stop'],
        ['No client waits on a teammate', 'C2 failed it, because Waylon’s question to Isaac about the lead sheet, of Oct 5, had no answer.', 'stop'],
        ['No prospect waits on us', 'C2 had nothing to check here.', 'wait'],
        ['Machine mail is filed, not piled', 'C2 failed it, with an OpenAI mail that names no client and Waylon’s 2 declined invites.', 'stop'],
        ['Google reps never stay in the inbox', 'C2 had nothing to check here.', 'wait'],
        ['Cold pitches never stay in the inbox', 'C2 had nothing to check here.', 'wait']],
        end: ['3 failed on C2, Nov 1', 'block'] },
      vcap: 'Kogalla writes to Daniel, so the inbox checks found nothing of Kogalla’s in Will’s mailbox. C2’s run led to a new rule, so Will may now excuse one message that a call or a text already answered.' },

    { about: ['cgmeet'], kicker: 'The meeting checks',
      head: 'Six meeting checks ask that each call is recorded, its action items are written up, and its decisions are logged on time',
      visual: { type: 'gate', rows: [
        ['Each meeting is recorded and transcribed, or has a known reason', 'C2 failed it, because the SEO call of Oct 5 has no recording.', 'stop'],
        ['Every action item is drafted, with an owner, a due date, and whose it is', 'C2 failed it, because an item of Oct 7 names a day but has no due date.', 'stop'],
        ['Each proposal is approved or discarded within 1 business day', 'C2 failed it, because proposals of Oct 14 and Oct 21 were reviewed on Oct 26.', 'stop'],
        ['Each task from a meeting is done by its due date', 'C2 failed it, because tasks from 5 calls were late or archived.', 'stop'],
        ['Each decision made in a client meeting reaches the client’s notebook within 1 business day', 'C2 failed it, because the decisions of Oct 7, 14 and 21 were logged on Oct 26.', 'stop'],
        ['Each sales call ends with a next step, and the prospect hears from us within 1 business day', 'C2 had no sales call.', 'wait']],
        end: ['5 failed on C2, Nov 1', 'block'] },
      vcap: 'C2’s test answer called three of them history, because a late log entry cannot be on time now. It named the gap that was still open, because the call of Oct 30 has no recording, so its decisions are in no notebook.' },

    { about: ['cgcrm'], kicker: 'The record checks',
      head: 'Fifteen checks look at the client’s record and its money, depending on the client’s stage',
      visual: { type: 'gate', rows: [
        ['The record has a type, a start date, and a live service', '', 'pass'],
        ['The active client is billed, and the billing is healthy', '', 'pass'],
        ['Each payment is linked to exactly one real client', '', 'pass'],
        ['Links on the same money name the same client', '', 'pass'],
        ['The plan sources agree with the billing schedule', '', 'pass'],
        ['An active client has not ended', 'It could not run, because the code that reads cancel requests is not built.', 'hold'],
        ['Billing agrees with the plan, and the contract is signed', 'It could not run, because billing and the plan disagree.', 'hold'],
        ['Each payment matches the plan in amount, rail, and timing', 'It could not run, because $1,715 was paid against a $3,000 plan.', 'hold']],
        end: ['C2, Nov 1, with 5 passed and 3 that could not run', 'wait'] },
      vcap: 'The checks for prospects and for onboarding have nothing to check on an active client. C2’s test answer explained the $1,715 as the old $2,500 plan, less a $285 prorate and a $500 credit.' },

    { about: ['cgout'], kicker: 'Left out',
      head: 'The client module leaves out two kinds of check, because the limit checks run on every change and the tool checks run with each tool’s tests',
      visual: { type: 'dots', groups: [[27, 'will', 'checks that this module answers'], [6, 'next', 'limit checks, which run in the change check for every module'], [19, 'next', 'tool checks, which each tool’s own tests cover']] },
      vcap: 'For example, “The cleanup never hides real mail” is a limit, and “Each meeting is filed under the right client or prospect” is a tool check. We plan to delete none of the 52.' },

    { about: ['cgtoday'], kicker: 'A run from earlier today',
      head: 'If a group of checks already ran today, the module reads that run, and if not, it runs the group once',
      visual: { type: 'timeline', items: [
        ['3:30 AM ET', 'Bull Legal has no run of the inbox, the meetings or the record that day, so the module runs each group once, in 91.2 s.'],
        ['3:31 AM ET', 'Kogalla’s inbox and meetings hold nothing of Kogalla’s, and the record checks run once, in 64.2 s.'],
        ['3:32 AM ET', 'Bull Legal again, and this time it reads the runs of 3:30, 3:31 and 3:32 AM, in 0.0 s.'],
        ['3:34 AM ET', 'C2 has no run that day, so each of the three groups runs once, in 77.4 s.']] },
      vcap: 'Some checks ask Jev a question in a normal run. The module sends those questions to Opus instead, so it reuses only an earlier module run, never a normal run that asked Jev. The module’s own runs are kept apart, so they never count as a normal check of the client.' },

    { about: ['cglines'], kicker: 'From a check to an item',
      head: 'Each check that did not pass becomes an item that Opus must answer, or in one case may answer',
      visual: { type: 'flow', rows: [
        { title: 'A failure', steps: [['A check failed', 'C2’s “No client waits on us”', 'block']], end: [['Opus must say no, with its fix or its case', '', 'opus']] },
        { title: 'A question', steps: [['A check that used to ask Jev, now with no AI judge', 'it says what yes and no mean, and what it judges', 'will']], end: [['Opus must say yes or no from what it read', '', 'opus']] },
        { title: 'Could not run', steps: [['The check had nothing to read', 'C2’s check on cancel requests', 'wait']], end: [['Opus may answer it, but nothing makes it pass', '', 'opus']] }] },
      vcap: 'The runs of Nov 1 came before this change, so Jev still judged inside them. They show failures and checks that could not run, but no questions.',
      quote: ['lets then have the questions run with just the model and no judge', 'Nov 2'] },

    { about: ['cgpush'], kicker: 'Sending the results',
      head: 'Will’s client checks send their results to Barbara, so code can see which checks the answer must respond to',
      visual: { type: 'flow', rows: [
        { steps: [['Will’s client checks on C2', 'on Will’s computer', 'will'], ['The results go to Barbara', 'as a module run', 'code'], ['The last line of the output', 'gives the run’s id', 'code']], end: [['Opus’s answer names that run', '', 'opus']] }] },
      vcap: 'On Nov 1 the checks could not send results to Barbara yet, so C2’s test answer names no run.' }
  ],

  examples: {
    LISTED: { tag: 'real', rows: [{ steps: [['KDX, Nov 7', 'the account scorecard’s flag', 'code']], end: [['The client has been quiet for 69 days', 'their newest message was a mail of Aug 27', 'block']] }], note: 'We took this from KDX’s fact sheet of Nov 7.' },
    RUN: { tag: 'real', rows: [{ steps: [['Will’s client checks on C2', 'Nov 1, 3:34 AM ET', 'will'], ['The inbox, the meetings and the record', 'for C2 alone', 'will']], end: [['Done in 77.4 s', '', 'will']] }], note: 'We took this from the verifiers’ run of Will’s client checks on C2, Nov 1.' },
    INBOX: { tag: 'real', rows: [{ steps: [['The inbox checks, C2', 'Nov 1', 'will'], ['3 failed', 'a client waits on us, a client waits on a teammate, and machine mail is not filed', 'block']], end: [['Items for the answer', '', 'will']] }], note: 'We took this from the verifiers’ run of Will’s client checks on C2, Nov 1.' },
    MEET: { tag: 'real', rows: [{ steps: [['The meeting checks, C2', 'Nov 1', 'will'], ['5 failed', 'recordings, items, proposals, tasks and decisions', 'block']], end: [['Items for the answer', '', 'will']] }], note: 'We took this from the verifiers’ run of Will’s client checks on C2, Nov 1.' },
    CRM: { tag: 'real', rows: [{ steps: [['The record checks, C2', 'Nov 1', 'will'], ['5 passed, and 3 could not run', 'a cancel request, the contract, and the $1,715 payment', 'wait']], end: [['Items for the answer', '', 'will']] }], note: 'We took this from the verifiers’ run of Will’s client checks on C2, Nov 1.' },
    OUT: { tag: 'real', rows: [{ steps: [['“The cleanup never hides real mail”', 'a limit check', 'will'], ['Not in the client module', '', 'will']], end: [['No item in any client run', '', 'will']] }], note: 'None of the five client runs of Nov 1 shows a limit check or a tool check.' },
    TODAY: { tag: 'real', rows: [{ steps: [['Bull Legal, 3:32 AM ET', 'Nov 1', 'will'], ['The runs of 3:30 to 3:32 AM', 'all from that day', 'will']], end: [['Read, not run again, in 0.0 s', '', 'will']] }], note: 'We took this from the verifiers’ second run of the client checks on Bull Legal, Nov 1. The first run ran each of the three groups once, in 91.2 s.' },
    LINES: { tag: 'real', rows: [{ steps: [['C2’s run', 'Nov 1', 'will'], ['8 failures and 3 checks that could not run', 'the 5 checks that passed need no answer', 'will']], end: [['11 items for the answer', '', 'opus']] }], note: 'We took this from the verifiers’ run of Will’s client checks on C2, Nov 1. The run has no questions for Opus, because Jev still judged those checks then.' },
    PUSH: { tag: 'made', rows: [{ steps: [['A run of Will’s client checks from today', '', 'will'], ['Its results go to Barbara', '', 'code']], end: [['Barbara keeps them, with the run’s id', '', 'code']] }], note: 'Made up, because no client run has been sent to Barbara yet. The runs of Nov 1 came before results could be sent.' },
    ANS: { tag: 'real', rows: [{ steps: [['The checks in C2’s test answer', 'the 8 failures, the 3 that could not run, and the scorecard’s flag', 'opus'], ['Answered in words', 'with no ids, and no run named', 'opus']], end: [['12 checks answered', '', 'opus']] }], note: 'We took this from the answer that the client module wrote for C2 on Nov 1.' }
  },

  reviewed: { self: '7775fd23', above: 'f4196f57', on: '2026-11-08' }
});
