// How the run carries out Decide's answer, past the stops. comm-chat at origin/main 1c24d43a, read 2026-11-08:
// src/claude_code_jobs.rs:513-519 (MODULE_PROTOCOL's finish: the case work first, then Decide's answer in its order; each
// proposal: its case, its plan, its check with --case, act cases push, the change, the check after it went out; a change that
// the switches keep for Will waits in To approve; each missed change: keep, undo or another way; each settled case:
// propose_close; ask_person only for a step only a person can do; a tool that refuses goes to propose_tool or report_bug and
// the plan's blocked_by; a story with slides for each case), :526 (three honest tries, then the step stays undone and goes in
// log.md); src/chat/tools/mod.rs:419-428 (the order in code: Will's switches, his hold, the account scorecard read today,
// then the limits); src/chat/tools/run_may.rs:1-30 (the switches: a Fix and an Optimize switch for each kind, money locked
// on every client, a person's call always goes); src/cases/scores.rs:51-84 (the defaults: team messages, the record and the
// targets on; the client's mail and the ad kinds off); src/chat/tools/run_hold.rs:1-45 (Will's hold, "Everything waits for
// you", and "No box, no raise"; one approval lets one push through); src/spend_box.rs:1-46 (the box: caps, bid ceilings, the
// real pace of 14 days, trusted tracking, Google Ads only, a cut needs none of it); src/chat/tools/run_wall.rs:1-32 (the
// limits in code: a typed change that names its open case, its check passed since its newest plan, an approval waives no
// limit, no open test or question on the same campaign and kind for a change that goes alone; a run may undo its own case's
// change, never one that saved spend); docs/design/modules/README.md:77-95 (the same, with KDX #196 and AAFE #415);
// docs/superpowers/specs/2026-11-04-modules-in-the-daily-run-design.md:71-81 (questions only for what only a person holds),
// :119-135 (the finish), :174-179 (what Will sees). Barbara's list_automations, read 2026-11-08: C2's switches (budgets and
// bids on since Nov 2, team messages off since Oct 28, the client's mail at its default, off), the 8 held clients. Real
// cases: Decide's answer 91 for C2 in the dry run 260 (instances/modrun2/barbara.db, immutable=1): its first proposal on case
// 429, case 259's keyword, its 8 asks; the run reports of run #250 (6 waits on Will) and of the dry run (7).
LOGIC.flow({
  id: 'runstops', parent: 'morning',
  title: 'Past the stops', short: 'Past the stops',
  head: 'The run carries out Decide’s answer in its order, and a change goes out only when it passes every stop',
  chart: [
    'flowchart TB',
    'ORDER["First the day’s case work, then<br/>each item of Decide’s answer,<br/>in Decide’s order"]:::code',
    'CASE["Each change gets its case<br/>and a written plan"]:::code',
    'REST["Each settled case closes, and<br/>Will is asked only what<br/>only he can do"]:::code',
    'CHECK{"Does the verifiers’ check<br/>pass the change?"}:::will',
    'TRY(["The run fixes the change, and<br/>after three honest tries the<br/>step stays undone"]):::block',
    'MAY{"Do Will’s switches let this<br/>kind of change go alone?"}:::will',
    'HOLD{"Has Will set the client<br/>to wait for him?"}:::will',
    'BOX{"Does it raise spend<br/>outside the spend box?"}:::will',
    'WALL{"Does an open test or question<br/>hold the same campaign and<br/>the same kind of change?"}:::code',
    'SEND(["It goes out through Chad Ads,<br/>and the verifiers check it<br/>again once it is out"]):::keep',
    'WAIT(["It waits for Will’s Approve,<br/>or for the test to end"]):::will',
    'ORDER --> CASE', 'ORDER --> REST', 'CASE --> CHECK',
    'CHECK -- no --> TRY', 'CHECK -- yes --> MAY',
    'MAY -- no --> WAIT', 'MAY -- yes --> HOLD',
    'HOLD -- yes --> WAIT', 'HOLD -- no --> BOX',
    'BOX -- yes --> WAIT', 'BOX -- no --> WALL',
    'WALL -- yes --> WAIT', 'WALL -- no --> SEND'
  ],
  links: { CASE: 'rpcase', CHECK: 'rpcheck', TRY: 'rpcheck', SEND: 'rpcheck', MAY: 'rpmay', HOLD: 'rphold', BOX: 'rpbox', WALL: 'rpwall', WAIT: 'rpwill', REST: 'rpwill' },
  leaves: {
    rpcase: 'A case and a plan for each change',
    rpcheck: 'The verifiers’ check',
    rpmay: 'Will’s switches',
    rphold: 'Will’s hold',
    rpbox: 'The spend box',
    rpwall: 'The limits in code',
    rpwill: 'What reaches Will'
  },

  // Each slide belongs to one view: the part's own slides first, then one or more for each rule.
  deck: [
    { about: ['runstops'], kicker: 'The idea',
      head: 'Decide says what to do, but code decides what may go out, so a module’s mistake cannot reach an account by itself',
      visual: { type: 'gate', rows: [
        ['The verifiers’ check', 'The change passes the platform’s limits, on its own case.', 'pass'],
        ['Will’s switches', 'This kind of change may go without him.', 'pass'],
        ['Will’s hold', 'He has not set the client to wait for him.', 'pass'],
        ['The spend box', 'A raise stays inside the caps that he approved.', 'pass'],
        ['The limits in code', 'No open test or question holds the same campaign and kind.', 'pass']],
        end: ['The change goes out through Chad Ads', 'keep'] },
      vcap: 'A change that a person makes by hand passes every stop, because that person approves it. Only a run’s changes meet the stops, and a module never changes anything by itself.',
      quote: ['I want it to be able to play with budgets and bids as long as we have caps on them.', 'Oct 30'] },
    { about: ['runstops'], kicker: 'Why the stops exist · KDX',
      head: 'On Oct 31 a run raised KDX’s target from $42 to $60 by itself, 6 days into Will’s own test',
      visual: { type: 'flow', rows: [
        { title: 'KDX’s DWA NonBrand, Oct 31', steps: [['Will tests a $42 target', 'from Oct 23, to be read on Nov 6', 'will'], ['A run raises it to $60', 'Every switch lets it through', 'block']], end: [['The test ends 6 days early', '', 'block']] },
        { title: 'Today', steps: [['The same change from a run', '', 'code'], ['An open test holds the same campaign and kind', '', 'code']], end: [['Code stops it, and it waits', '', 'will']] }] },
      vcap: 'The switches held only kinds of settings, so they knew nothing of a test or of Will’s open question on it. Now the limits in code also look at the open cases.' },

    { about: ['rpcase'], kicker: 'A case for each change',
      head: 'Each change belongs to an open case with a written plan, and it goes out in a form that code can check',
      visual: { type: 'flow', rows: [
        { steps: [['Find or open its case', '', 'code'], ['Write its plan', 'what changes, why, and how it will be checked', 'code'], ['Send the change with its case', 'as a typed call, never in words', 'code']],
          end: [['Each case gets a story with slides', '', 'keep']] }] },
      vcap: 'Code refuses a change that names no open case, or that describes the change only in words, because no stop can check words. Will sees each finished change as slides, under Cases and then Check these.' },

    { about: ['rpcheck'], kicker: 'The verifiers’ check',
      head: 'The verifiers check each change on its case before it goes out, and again once it is out',
      visual: { type: 'gate', rows: [
        ['Google Ads', 'The change check reads the change file for its case.', 'pass'],
        ['Meta', 'The plan check reads the plan for its case.', 'pass'],
        ['Microsoft and the others', 'No check covers them yet, so the plan must say so.', 'hold'],
        ['Once it is out', 'The run sends the check of what really changed.', 'pass']],
        end: ['A change that fails is fixed, and after three honest tries it waits', 'block'] },
      vcap: 'An approval from Will waives no limit, so a change that he approved still needs its passing check. The verifiers stay fixed during a run, so a run never changes a check to pass it.' },

    { about: ['rpmay'], kicker: 'Will’s switches',
      head: 'Will’s switches say which kinds of change a run may make by itself, client by client',
      visual: { type: 'card', title: 'C2’s switches, Nov 8', fields: [
        ['May go alone', 'Budgets, bids, campaigns on or off, bid strategies, keywords, negatives, ads, landing pages, rebuilds, tracking, the product feed, the client’s record and targets.'],
        ['Waits for Will', 'Every message to the client, and every message to the team.'],
        ['Always waits for Will', 'Money, such as a stopped charge or a payment link.']],
        stamp: ['Two switches for each kind', 'will'] },
      vcap: 'A change that a switch keeps for Will waits in To approve, and one approval lets one change through. A message to the client is off until Will turns it on, as it is for C2.' },

    { about: ['rphold'], kicker: 'Will’s hold',
      head: 'When Will sets a client to “Everything waits for you”, every write of its run waits for his Approve',
      visual: { type: 'dots', groups: [[8, 'will', 'clients that Will holds'], [6, 'code', 'clients with no hold']] },
      vcap: 'On Nov 8 Will holds KeyBar, Trailer Jacks, Extreme Tactical Dynamics, Welch, Flexan, ADI, ILC Dover and Thomas. Under the hold, only a case’s question or task for Will or Jacob, a record field and a payer’s billing link go without him.' },

    { about: ['rpbox'], kicker: 'The spend box',
      head: 'A run may raise a budget or a bid only inside the spend box, which comes from the caps and targets that Will approved',
      visual: { type: 'gate', rows: [
        ['A monthly cap', 'The month’s spend, plus the real pace of the last {runPace} days, stays under it.', 'pass'],
        ['A bid ceiling', 'A target or a bid stays inside the approved target.', 'pass'],
        ['Trusted tracking', 'The newest full weeks were read whole and are trusted.', 'pass'],
        ['Google Ads only', 'A raise on Meta or Microsoft waits for Will.', 'hold']],
        end: ['Inside the box a raise goes by itself, and a cut needs no box', 'keep'] },
      vcap: 'With no box there is no raise. In the dry run of Nov 4, C2’s box was open for Google, while Meta had no room under its $200 cap.',
      quote: ['No box, no raise', 'Oct 30'] },

    { about: ['rpwall'], kicker: 'The limits in code',
      head: 'Last, code checks that the change names its case, passed its check, and crosses no test or open question',
      visual: { type: 'gate', rows: [
        ['The change names its open case, in a form that code can read', 'A change in words is refused, because code cannot check it.', 'pass'],
        ['Its check passed after its newest plan', 'An approval waives no limit.', 'pass'],
        ['No open test or question holds it', 'This holds a change that Will did not approve, when the test or question is on the same campaign and the same kind of change.', 'stop'],
        ['The run read the account scorecard today', 'The change tools wait for that read.', 'pass']],
        end: ['Then the change goes out through Chad Ads', 'keep'] },
      vcap: 'A run may undo its own case’s change, as the Undo on the Cases page would, but never a change that saved spend. Only Will puts that back.' },

    { about: ['rpwill'], kicker: 'What reaches Will',
      head: 'The run asks Will only for a step that only he can take, and a tool that refuses is never his problem',
      visual: { type: 'gate', rows: [
        ['A charge, a refund, or a raise past the spend box', 'It waits for his Approve.', 'hold'],
        ['A message that his switches keep for him', 'It waits in To approve, with its words.', 'hold'],
        ['An access that only he can grant', 'It asks him, with a link that does it in one click.', 'hold'],
        ['A tool that refuses, or a check that cannot read the change', 'It goes to Jacob as a bug or a tool request, never to Will.', 'stop']],
        end: ['Each question for Will waits on its own case, never in the run’s thread', 'will'] },
      vcap: 'In the dry run of Nov 4 the run’s report listed 7 things that wait on Will, against 6 after C2’s old run that morning. The design calls a module run that gives Will more questions than the old run a failure.' }
  ],

  examples: {
    ORDER: { tag: 'real', rows: [{ steps: [['Decide’s answer for C2', '18 proposals, with the weekly report first', 'opus']], end: [['The run takes them in that order', 'after case #442', 'code']] }], note: 'This is from C2’s dry run of Nov 4, so the run carried out none of them.' },
    CASE: { tag: 'made', rows: [{ steps: [['Decide’s proposal on case 259', 'add [music publicity agency] as an exact keyword', 'opus'], ['Its plan on case 259', '', 'code']], end: [['The change names case 259', '', 'code']] }], note: 'We made this from Decide’s real proposal on case 259 in the dry run of Nov 4, because a dry run carries out nothing.' },
    REST: { tag: 'real', rows: [{ steps: [['8 questions in Decide’s answer', 'such as the Data Manager sign-in by Nov 14', 'will']], end: [['Each question waits for Will on its own case', '', 'will']] }], note: 'Decide wrote this answer in C2’s dry run of Nov 4, and it closed no case.' },
    CHECK: { tag: 'made', rows: [{ steps: [['The change file for case 259', '', 'code'], ['The Google Ads change check, on case 259', '', 'will']], end: [['A pass, sent to Barbara', '', 'keep']] }], note: 'We made this up from the run’s rule, because a dry run checks no change.' },
    TRY: { tag: 'made', rows: [{ steps: [['A change fails its check', '', 'block'], ['The run fixes it and checks again', 'three times', 'code']], end: [['The step stays undone, in the client’s log', '', 'block']] }], note: 'We made this up from the run’s rule, because no module run has gone live.' },
    MAY: { tag: 'real', rows: [{ steps: [['C2’s switch for keywords', 'on since Nov 2', 'will']], end: [['A keyword change may go alone', '', 'keep']] }], note: 'This is from C2’s switches in Barbara on Nov 8.' },
    HOLD: { tag: 'real', rows: [{ steps: [['ADI', 'held by Will since Nov 1', 'will']], end: [['Every write of its run waits for his Approve', '', 'will']] }], note: 'This is from the Automations list in Barbara on Nov 8.' },
    BOX: { tag: 'real', rows: [{ steps: [['A raise of Meta’s budget for C2', '', 'code'], ['The box takes raises on Google Ads only', '', 'will']], end: [['It waits for Will', '', 'will']] }], note: 'The rule comes from Money’s answer in C2’s dry run of Nov 4, which says that a raise on Meta waits for Will.' },
    WALL: { tag: 'made', rows: [{ steps: [['A run raises KDX’s target from $42 to $60', 'with no Approve from Will', 'code'], ['Will’s own test holds the same campaign and kind', 'case #20', 'will']], end: [['Code stops it, so it waits', '', 'block']] }], note: 'We made this from KDX’s real cases #196 and #20 of Oct 31. That change went out then, because the limits in code did not exist yet.' },
    SEND: { tag: 'made', rows: [{ steps: [['The run sends the change to Google through Chad Ads', '', 'code'], ['The check of what really changed', '', 'will']], end: [['Case 259 is watched until its follow-up day', '', 'keep']] }], note: 'We made this up from the run’s rule, because a dry run sends no change.' },
    WAIT: { tag: 'real', rows: [{ steps: [['Send Waylon the weekly report', 'case 429', 'opus'], ['Messages to the client wait for Will', '', 'will']], end: [['It waits for Will’s Approve on case 429', '', 'will']] }], note: 'Decide wrote this for C2 on Nov 4, in a dry run on a copy of Barbara.' }
  },

  reviewed: { self: '795411b2', above: '2525099a', on: '2026-11-08' }
});
