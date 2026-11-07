// The answer and its rules: the one fixed answer (comm-chat src/modules/mod.rs Answer, 631-663; problem, 667-702;
// model_problem, 707-722) and write_module_answer's order (src/chat/tools/module_tools.rs save_answer, 485-560): its own
// client and a model module, plain words (cases/words.rs:91), the shape and the fix, the needs (none for The client), the
// module run (src/modules/run.rs of_answer 115-141, problem 142-185), each quote (the quotes part), Jev on approved
// questions (run.rs hear, 189-266) and Jev on each fix (module_tools.rs read_proposals, 566-617), then the store
// (src/modules/store.rs save, 53-80).
LOGIC.flow({
  id: 'clientanswer', parent: 'client',
  title: 'The answer and its rules', short: 'The answer',
  head: 'Code checks The client’s answer in a fixed order; any no saves nothing',
  chart: [
    'flowchart TB',
    'WRITE(["Opus calls<br/>write_module_answer"]):::opus',
    'subgraph CK[" "]',
    'OWN["Its own client, and<br/>a model module"]:::code',
    'PLAIN["Plain words in the summary,<br/>each fix and its effect"]:::code',
    'SHAPE["A summary, proof, and what<br/>would prove it wrong"]:::code',
    'FIX["A problem names its fix,<br/>and each fix its effect"]:::code',
    'HELD["Its checks answer the<br/>newest module run"]:::code',
    'QUOTES["Each quote stands<br/>in its source"]:::code',
    'JEVQ["Jev agrees on each<br/>approved question"]:::code',
    'JEVP["Jev reads no fix as one<br/>a person could not act on"]:::code',
    'end',
    'SAVED(["Saved: the reply names<br/>each quote not checked"]):::code',
    'NO(["Refused: nothing saves.<br/>Opus fixes it and<br/>calls again"]):::code',
    'WRITE -- "code’s checks,<br/>in this order" --> OWN', 'OWN --> PLAIN', 'PLAIN --> SHAPE', 'SHAPE --> FIX', 'FIX --> HELD',
    'HELD --> QUOTES', 'QUOTES --> JEVQ', 'JEVQ --> JEVP',
    'JEVP -- "all pass" --> SAVED',
    'CK -- "any no" --> NO', 'NO -. again .-> WRITE'
  ],
  links: { PLAIN: 'clientplain', SHAPE: 'clientshape', FIX: 'clientfix', HELD: 'clientheld', JEVQ: 'clientjevq', JEVP: 'clientjevp' },
  leaves: {
    clientplain: 'Plain words',
    clientshape: 'The shape',
    clientfix: 'A problem names its fix',
    clientheld: 'Held to the newest run',
    clientjevq: 'Jev on approved questions',
    clientjevp: 'Jev on each fix'
  },

  // Each slide belongs to one view: the part's own slides first, then one or more for each box.
  deck: [
    { about: ['clientanswer'], kicker: 'The one fixed answer',
      head: 'Every module answers in one shape; The client fills it with the client’s words',
      visual: { type: 'card', title: 'The fixed answer, with answer 44’s values', fields: [
        ['verdict', 'good, problem, too few to tell, or ask a person: problem'],
        ['summary', 'one or two plain sentences'],
        ['proof', 'each fact with its source: 17 lines'],
        ['quotes', 'each person’s words, whole sentences, with kind and source: 60'],
        ['would prove wrong', 'what would show it wrong: tomorrow’s brief tests it'],
        ['proposes', 'each fix: what, why, effect, waits on, money a month, its case: 5'],
        ['asks', 'who, and what to ask them: none'],
        ['checks', 'each failed check, and each FAIL and QUESTION of its run by id: 12'],
        ['module run', 'the run its checks answer: none on Nov 1']], stamp: ['It changes nothing: the next modules read it', 'code'] },
      vcap: 'Answer 44, C2, Nov 1. The client needs no other answer, so it never waits at the needs check, which sits between the fix and the run.' },
    { about: ['clientanswer'], kicker: 'A refusal is a retry',
      head: 'Each refusal says what is wrong and saves nothing; Opus fixes it and calls again',
      visual: { type: 'flow', rows: [
        { title: 'A cut quote', steps: [['“Anything that changes looks or words …”', 'C2, Nov 1', 'will'], ['“… cuts a sentence … Quote the whole sentence”', 'code’s words', 'code']], end: [['Nothing was saved', '', 'block']] },
        { title: 'A problem with no fix', steps: [['Bull’s Hedge Funds bid answer, Nov 1', 'a problem, and no fix', 'code'], ['The rule it led to', '“A problem names its fix …”', 'code']], end: [['Today: nothing would save', '', 'block']] },
        { title: 'A stale run', steps: [['A check run over {clientRunAge} hours old', '', 'code'], ['“… is over a day old. Run the module’s check …”', 'code’s words', 'code']], end: [['Nothing was saved', '', 'block']] }] },
      vcap: 'The quote refusal is real. Bull’s answer saved before the rule, and led to it. No client answer has met the stale run yet.' },

    { about: ['clientplain'], kicker: 'Plain words',
      head: 'Ids, paths and links stay out of the summary and the fixes',
      visual: { type: 'flow', rows: [
        { title: 'Passes', steps: [['“Spend fell 12% on Oct 12.”', '', 'code']], end: [['Plain words: it passes', '', 'keep']] },
        { title: 'Refused', steps: [['“Ad group 161332849374 blocks 3 keywords.”', '', 'code']], end: [['“write it in plain words for Will, and put ids, file paths and links in details”', '', 'block']] }] },
      vcap: 'Code’s own test cases. It checks the summary, and each fix’s what and effect. The proof may hold ids: it names sources.' },
    { about: ['clientshape'], kicker: 'The shape',
      head: 'Code refuses an answer with a hole in its shape, its own answers too',
      visual: { type: 'gate', rows: [
        ['A summary', '', 'pass'],
        ['Proof: at least one fact, with its source', '', 'pass'],
        ['What would prove it wrong', '', 'pass'],
        ['Verdict ask: at least one ask, each with who and what', '', 'pass'],
        ['Each fix: what and why; its money a month 0 or more', '', 'pass'],
        ['Each quote: its words and its source; a mail names its mailbox', '', 'pass']], end: ['The shape holds', 'code'] },
      vcap: 'The store checks the shape again as it saves. In motion and Money, which code answers, pass the same shape.' },
    { about: ['clientfix'], kicker: 'A problem names its fix',
      head: 'A problem must propose a fix, and each fix must say what it should do',
      visual: { type: 'flow', rows: [
        { title: 'The rule', steps: [['Verdict problem', 'at least one fix', 'opus'], ['Each fix has its effect', 'what it should do, the number that will show it, and when', 'code']], end: [['It may save', '', 'keep']] },
        { title: 'Answer 44 today', steps: [['Verdict problem, 5 fixes', 'none has an effect line: it saved before the rule', 'code']], end: [['Refused: each fix needs its effect', '', 'block']] }] },
      vcap: 'A fix that must wait says what it waits on, in place of proposing nothing.',
      quote: ['NO I want to have as many proposals as needed. But yes a problem should always name a fix. They should be intelligable though and thought through.', 'Nov 1'] },
    { about: ['clientheld'], kicker: 'Held to the newest run',
      head: 'Its checks must answer the newest module run, line by line',
      visual: { type: 'gate', rows: [
        ['It names the newest run of The client on the whole account', '', 'pass'],
        ['The run is under {clientRunAge} hours old', '', 'pass'],
        ['Each FAIL and each QUESTION is answered by its id', '', 'pass'],
        ['A FAIL says no; yes answers a QUESTION only', 'a check Opus holds wrong goes to the verifiers’ misses', 'pass'],
        ['The verdict is not good while a FAIL stands', '', 'pass']], end: ['Its checks hold', 'code'] },
      vcap: 'Answer 44 saved before any run was pushed: it answered the run’s 8 FAILs and 3 could-not-checks in words, with no ids. Once the verifiers push module runs, an answer like it is refused.' },
    { about: ['clientjevq'], kicker: 'Jev on approved questions',
      head: 'On a question Will approved for Jev, Opus’s yes or no must match Jev’s reading',
      visual: { type: 'scale', label: 'Jev’s reading of “Does that later team mail answer what they asked?”',
        lines: [['{clientAsk}', 'the line: {clientAsk}', 'will']],
        dots: [[0.36, 'C2, Nov 1: “Issue with site?”', 'block']],
        zones: [[0, '{clientAsk}', 'Jev reads no', 'block'], ['{clientAsk}', 1, 'Jev reads yes', 'keep']] },
      vcap: 'On Nov 1 Jev read this question inside the verifiers, at 0.36, and the goal failed. Now the question goes to Opus, and Jev reads Opus’s answer. If they differ, or Jev gives no reading, nothing saves. Only the inbox approves lines for Jev; meetings and CRM approve none.' },
    { about: ['clientjevp'], kicker: 'Jev on each fix',
      head: 'Jev reads each fix once: a clear no refuses it, an unsure reading lets it save',
      visual: { type: 'scale', label: 'Jev: could the account’s manager act on this fix as written?',
        lines: [['{clientJevNo}', 'refused at or under {clientJevNo}', 'block'], ['{clientJevYes}', 'sure from {clientJevYes}', 'keep']],
        dots: [],
        zones: [[0, '{clientJevNo}', 'Refused: the manager could not act on it', 'block'], ['{clientJevNo}', '{clientJevYes}', 'Unsure: it saves', 'wait'], ['{clientJevYes}', 1, 'Yes: it saves', 'keep']] },
      vcap: 'Jev reads each fix’s what, why, effect, waits on and money. If Jev does not answer, the fixes save unread. No client answer has a reading on record: answer 44 saved before this rule.' }
  ],

  examples: {
    WRITE: { tag: 'real', rows: [{ steps: [['Opus, C2', 'Nov 1, about 4 AM ET, a module test', 'opus'], ['write_module_answer', 'module client, the whole account', 'opus']], end: [['Code’s checks start', '', 'code']] }], note: 'C2, Nov 1, answer 44.' },
    OWN: { tag: 'real', rows: [{ steps: [['A run for C2', 'it writes for C2 only', 'code'], ['The client is a model module', 'code answers only In motion and Money', 'code']], end: [['Yes: the next check', '', 'code']] }], note: 'C2, Nov 1, answer 44. A run that names another client’s id is refused: “This run writes only for client 13.”' },
    PLAIN: { tag: 'real', rows: [{ steps: [['Its summary', '“Waylon wants more budget that brings real leads …”', 'opus'], ['No id, path or link', '', 'code']], end: [['Plain words: yes', '', 'code']] }], note: 'C2, Nov 1, answer 44.' },
    SHAPE: { tag: 'real', rows: [{ steps: [['A summary, 17 proof lines', 'and what would prove it wrong', 'opus'], ['Each quote with its source; each mail with its mailbox', '', 'code']], end: [['The shape holds', '', 'code']] }], note: 'C2, Nov 1, answer 44.' },
    FIX: { tag: 'real', rows: [{ steps: [['Verdict problem', '5 fixes, each on an open case', 'opus'], ['A problem names its fix', 'yes', 'code']], end: [['It passed', 'before the effect rule, which came at 10:13 AM', 'code']] }], note: 'C2, Nov 1, answer 44. Today each of its fixes would also need its effect.' },
    HELD: { tag: 'real', rows: [{ steps: [['Answer 44’s checks', '12, answered in words, with no ids', 'opus'], ['A pushed module run?', 'none on Nov 1', 'code']], end: [['Compared with nothing: it passes', '', 'code']] }], note: 'C2, Nov 1, answer 44. Until the verifiers push module runs, an answer saves as before.' },
    QUOTES: { tag: 'real', rows: [{ steps: [['60 quotes', '18 from mail, 42 from calls', 'opus'], ['Each found in its source', '', 'code']], end: [['All 60 checked', '', 'code']] }], note: 'C2, Nov 1, answer 44. The quotes part shows each check.' },
    JEVQ: { tag: 'made', rows: [{ steps: [['A QUESTION of an approved inbox line', '“Does that later team mail answer what they asked?”', 'will'], ['Opus says yes; Jev reads 0.36', 'under the line {clientAsk}', 'code']], end: [['Refused: they differ', '', 'code']] }], note: 'No client answer has met an approved question yet. The 0.36 is Jev’s reading of C2’s “Issue with site?” inside the verifiers on Nov 1.' },
    JEVP: { tag: 'made', rows: [{ steps: [['A fix: “Ship the lead-source page.”', 'from answer 44, with no where, from or to', 'opus'], ['Jev: could a manager act on it as written?', 'a clear no', 'code']], end: [['Refused, naming the fix', '', 'code']] }], note: 'Made: answer 44 saved before Jev read fixes, so no reading exists. The fix text is real.' },
    SAVED: { tag: 'real', rows: [{ steps: [['“Saved answer 44”', 'The client on the whole account, Problem', 'code'], ['Not checked', 'none: every quote was checked', 'code']], end: [['The next modules read it', '', 'code']] }], note: 'C2, Nov 1.' },
    NO: { tag: 'real', rows: [{ steps: [['A quote cut from Waylon’s bolded line', 'Oct 21 mail', 'will'], ['“cuts a sentence … Quote the whole sentence”', '', 'code']], end: [['Nothing was saved; Opus quoted the line whole', '', 'opus']] }], note: 'C2, Nov 1 (the note in client_words.rs). Answer 44 holds the quote with its bold marks.' }
  },

  reviewed: { self: '5a834bbd', above: '47369265', on: '2026-11-07' }
});
