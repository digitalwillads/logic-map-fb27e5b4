// How code checks The client's answer: write_module_answer's rules in their own order (comm-chat src/chat/tools/
// module_tools.rs `save_answer`, 483-560): a run writes only for its own client, and a code module answers itself (:493-500);
// plain words in the summary and in each fix's what and effect (src/cases/words.rs:55-96, an id of 9 digits or more); the
// shape and a fix for a problem, each fix with its effect (src/modules/mod.rs:664-722 `problem`, `model_problem`); the
// account answers it needs (none for The client, :513-517); held to its newest client check (src/modules/run.rs:113-177: the
// newest under 24 hours, each FAIL and QUESTION answered by its id, no good verdict beside a FAIL; compared with nothing
// until the verifiers push their first module run, :107-121); each quote at its source (module_tools.rs:619-669); Jev on each
// QUESTION of a line Will approved (run.rs `hear`, 182-266; only the inbox approves lines, verify/trees/inbox.toml:36,
// meetings and crm `jev_blocks = []`); Jev on each fix (module_tools.rs `read_proposals`, 562-617; src/chat/jev.rs:19, 0.3 to
// 0.7); then the store (src/modules/store.rs). The rules came at 10:13 AM ET on Nov 1 (commit c5e2d960) and on Nov 6
// (2091e395, 1d425319). Real cases: C2's answer 44 (read whole on 2026-11-07); C2's run of Nov 1 (Jev read "Issue with site?"
// at 0.36); the bold-mark refusal (src/client_profile/client_words.rs:270-276); Bull's Hedge Funds bids answer of Nov 1,
// which led to the rule (mod.rs:800-821). Old part: retired/2026-11-07-client-redo/clientanswer.js.
LOGIC.flow({
  id: 'ccheck', parent: 'client',
  title: 'How code checks the answer', short: 'How code checks it',
  head: 'Code checks The client’s answer before it saves, the cheap rules first, and any miss sends it back to Opus',
  chart: [
    'flowchart TB',
    'ANS["Opus writes one answer: its<br/>verdict, its proof, what would<br/>prove it wrong, and each fix"]:::opus',
    'OWN{"Is it for this run’s<br/>own client?"}:::code',
    'PLAIN{"Is it in plain words, with<br/>no id, file path or link?"}:::code',
    'SHAPE{"Is it whole, and does a<br/>problem name its fix?"}:::code',
    'RUN{"Does it answer each line<br/>of the newest client check?"}:::code',
    'QUO{"Are the words of each<br/>quote in its source?"}:::code',
    'JEVQ{"On a check Will approved for Jev,<br/>does Opus’s yes or no<br/>match Jev’s reading?"}:::code',
    'JEVP{"Could the account’s manager<br/>act on each fix as written?"}:::code',
    'NO(["Refused, with why, so<br/>nothing saves"]):::code',
    'OK(["Saved as the newest answer<br/>for the whole account"]):::code',
    'ANS --> OWN',
    'OWN -- yes --> PLAIN', 'PLAIN -- yes --> SHAPE', 'SHAPE -- yes --> RUN', 'RUN -- yes --> QUO', 'QUO -- yes --> JEVQ', 'JEVQ -- yes --> JEVP',
    'JEVP -- "yes, unsure,<br/>or no reading" --> OK',
    'OWN -- no --> NO', 'PLAIN -- no --> NO', 'SHAPE -- no --> NO', 'RUN -- no --> NO', 'QUO -- no --> NO', 'JEVQ -- no --> NO',
    'JEVP -- "a clear no" --> NO',
    'NO -. "Opus fixes it<br/>and tries again" .-> ANS'
  ],
  links: { ANS: 'ckanswer', PLAIN: 'ckplain', SHAPE: 'ckshape', RUN: 'ckrun', JEVQ: 'ckjevq', JEVP: 'ckjevp' },
  leaves: {
    ckanswer: 'One fixed answer',
    ckplain: 'Plain words',
    ckshape: 'A problem names its fix',
    ckrun: 'Held to the newest client check',
    ckjevq: 'Jev on the checks Will approved',
    ckjevp: 'Jev on each fix'
  },

  // Each slide belongs to one view: the part's own slides first, then one or more for each rule.
  deck: [
    { about: ['ccheck'], kicker: 'In order',
      head: 'Code checks the cheap things first, so it reads no source for an answer that cannot save',
      visual: { type: 'gate', rows: [
        ['Its own client', 'A run writes only for its own client.', 'pass'],
        ['Plain words, the shape and a fix for a problem', 'No read is needed for these.', 'pass'],
        ['The newest client check', 'One read of the run that Barbara holds.', 'pass'],
        ['Each quote', 'One read of each mail, call or case reply that it quotes.', 'pass'],
        ['Jev', 'One read for the checks Will approved, and one for all the fixes together.', 'pass']],
        end: ['Saved, or refused with why', 'code'] },
      vcap: 'The client needs no other module’s answer, so it never waits at the rule that makes the campaign modules wait for the account answers. Every refusal ends with “Nothing was saved.”' },
    { about: ['ccheck'], kicker: 'A refusal is a retry',
      head: 'Each refusal says what is wrong and saves nothing, so Opus fixes it and calls again',
      visual: { type: 'flow', rows: [
        { title: 'A cut quote', steps: [['“Anything that changes looks or words …”', 'C2, Nov 1', 'will'], ['“… cuts a sentence … Quote the whole sentence”', 'code’s own words', 'code']], end: [['Nothing was saved', '', 'block']] },
        { title: 'A problem with no fix', steps: [['Bull’s Hedge Funds bid answer, Nov 1', 'a problem, and no fix', 'code'], ['The rule it led to', 'a problem names its fix', 'code']], end: [['Today nothing would save', '', 'block']] },
        { title: 'An old client check', steps: [['A client check over {clientRunAge} hours old', '', 'code'], ['“… is over a day old. Run the module’s check …”', 'code’s own words', 'code']], end: [['Nothing was saved', '', 'block']] }] },
      vcap: 'The cut quote is real, from C2 on Nov 1. Bull’s bid answer saved before the rule and led to it, and no client answer has met an old client check yet.' },

    { about: ['ckanswer'], kicker: 'One fixed answer',
      head: 'Every module answers in the same shape, and The client fills it with the client’s own words',
      visual: { type: 'card', title: 'The answer, part by part, with answer 44’s values', fields: [
        ['The verdict', 'Good, a problem, too few to tell, or ask a person. Answer 44 said a problem.'],
        ['The summary', 'One or two plain sentences for Will.'],
        ['The proof', 'Each fact with its source, and answer 44 had 17.'],
        ['The quotes', 'Each person’s words, in whole sentences, with its kind and its source, and answer 44 had 60.'],
        ['What would prove it wrong', 'The next morning tests it first.'],
        ['Each fix', 'What, why, what it should do, what it waits on, the money a month, and its case. Answer 44 had 5.'],
        ['Each ask', 'Whom to ask, and what. Answer 44 had none.'],
        ['The checks', 'Each listed failure, and each line of its client check by its id. Answer 44 answered 12 in words.'],
        ['The client check it answers', 'The run’s id. Answer 44 named none, because no run was pushed then.']],
        stamp: ['It changes nothing, and the next modules read it', 'code'] },
      vcap: 'The answer has no field of its own for what we told the client or what we owe them, so those live in the summary and the proof.' },

    { about: ['ckplain'], kicker: 'Plain words',
      head: 'Ids, file paths and links stay out of the summary and the fixes',
      visual: { type: 'flow', rows: [
        { title: 'Passes', steps: [['“Spend fell 12% on Oct 12.”', '', 'code']], end: [['Plain words, so it passes', '', 'keep']] },
        { title: 'Refused', steps: [['“Ad group 161332849374 blocks 3 keywords.”', '', 'code']], end: [['“write it in plain words for Will, and put ids, file paths and links in details”', '', 'block']] }] },
      vcap: 'These are code’s own test cases. It checks the summary, and what each fix is and what it should do. The proof may hold ids, because it names sources.' },

    { about: ['ckshape'], kicker: 'A problem names its fix',
      head: 'A problem must propose a fix, and each fix must say what it should do',
      visual: { type: 'flow', rows: [
        { title: 'The rule', steps: [['A verdict of a problem', 'with at least one fix', 'opus'], ['Each fix says its effect', 'what it should do, the number that will show it, and when', 'code']], end: [['It may save', '', 'keep']] },
        { title: 'Answer 44 today', steps: [['A problem with 5 fixes', 'none says its effect, because it saved before the rule', 'code']], end: [['Refused, because each fix needs its effect', '', 'block']] }] },
      vcap: 'A fix that must wait says what it waits on, instead of proposing nothing. The shape also needs a summary, at least one fact of proof with its source, and what would prove the answer wrong.',
      quote: ['NO I want to have as many proposals as needed. But yes a problem should always name a fix. They should be intelligable though and thought through.', 'Nov 1'] },

    { about: ['ckrun'], kicker: 'Held to the newest client check',
      head: 'The answer must name the newest client check, and answer each line of it by its id',
      visual: { type: 'gate', rows: [
        ['It names the newest client check on the whole account', '', 'pass'],
        ['That run is under {clientRunAge} hours old', '', 'pass'],
        ['Each failure and each question is answered by its id', '', 'pass'],
        ['A failure gets no, with its fix or its case', 'and a check that Opus holds wrong goes on the verifiers’ list of misses', 'pass'],
        ['The verdict is not good while a failure stands', '', 'pass']],
        end: ['Its checks hold', 'code'] },
      vcap: 'Until the verifiers push their first module run to Barbara, code compares an answer with nothing, and it saves as before. Answer 44 saved that way, and it answered the run’s 8 failures and 3 could-not-checks in words, with no ids.' },

    { about: ['ckjevq'], kicker: 'Jev on the checks Will approved',
      head: 'On a check Will approved for Jev, Opus’s yes or no must match Jev’s reading',
      visual: { type: 'scale', label: 'Jev’s reading of “Does that later team mail answer what they asked?”',
        lines: [['{clientAsk}', 'the line at {clientAsk}', 'will']],
        dots: [[0.36, 'C2, Nov 1, “Issue with site?”', 'block']],
        zones: [[0, '{clientAsk}', 'Jev reads no', 'block'], ['{clientAsk}', 1, 'Jev reads yes', 'keep']] },
      vcap: 'On Nov 1 Jev read this question inside the verifiers at 0.36, so the check failed. Now the question goes to Opus, and Jev reads Opus’s answer, so if they differ, or Jev gives no reading, nothing saves. Only the inbox has checks that Will approved for Jev, and the meetings and the record have none.' },

    { about: ['ckjevp'], kicker: 'Jev on each fix',
      head: 'Jev reads each fix once, and a clear no refuses it, but an unsure reading lets it save',
      visual: { type: 'scale', label: 'Jev’s reading of “Could the account’s manager act on this fix as written?”',
        lines: [['{clientJevNo}', 'refused at or under {clientJevNo}', 'block'], ['{clientJevYes}', 'sure from {clientJevYes}', 'keep']],
        dots: [[0.08, '“Look at the tags.”', 'block'], [0.93, 'the tag fix, with its day', 'keep']],
        zones: [[0, '{clientJevNo}', 'Refused, because the manager could not act on it', 'block'], ['{clientJevNo}', '{clientJevYes}', 'Unsure, and it saves', 'wait'], ['{clientJevYes}', 1, 'Yes, and it saves', 'keep']] },
      vcap: 'Jev reads what each fix is, why, what it should do, what it waits on and what is at stake. The two dots come from the rule’s own test, because no client answer has a reading on record, and if Jev does not answer, the fixes save unread.' }
  ],

  examples: {
    ANS: { tag: 'real', rows: [{ steps: [['Opus, C2', 'Nov 1, about 4 AM ET, a module test', 'opus']], end: [['One answer for the whole account', 'a problem, with 17 proof lines and 60 quotes', 'opus']] }], note: 'C2’s answer 44, of Nov 1.' },
    OWN: { tag: 'real', rows: [{ steps: [['A run for C2', 'it writes for C2 alone', 'code'], ['The client is a module that Opus answers', 'code answers only In motion and Money', 'code']], end: [['Yes, so on to the next rule', '', 'code']] }], note: 'C2’s answer 44, of Nov 1. A run that names another client is refused with “This run writes only for client 13.”' },
    PLAIN: { tag: 'real', rows: [{ steps: [['Its summary', '“Waylon wants more budget that brings real leads …”', 'opus'], ['No id, file path or link', '', 'code']], end: [['Plain words, so yes', '', 'code']] }], note: 'C2’s answer 44, of Nov 1.' },
    SHAPE: { tag: 'real', rows: [{ steps: [['A problem with 5 fixes', 'each on an open case', 'opus'], ['Does a problem name its fix?', 'yes', 'code']], end: [['It passed', 'before the rule that each fix says its effect', 'code']] }], note: 'C2’s answer 44, of Nov 1. Today each of its fixes would also need its effect.' },
    RUN: { tag: 'real', rows: [{ steps: [['Answer 44’s 12 checks', 'answered in words, with no ids', 'opus'], ['A pushed client check?', 'none on Nov 1', 'code']], end: [['Compared with nothing, so it passes', '', 'code']] }], note: 'C2’s answer 44, of Nov 1. Until the verifiers push module runs, an answer saves as before.' },
    QUO: { tag: 'real', rows: [{ steps: [['60 quotes', '18 from mail and 42 from calls', 'opus']], end: [['Each one found in its source', '', 'keep']] }], note: 'C2’s answer 44, of Nov 1.' },
    JEVQ: { tag: 'made', rows: [{ steps: [['A question from a check Will approved', '“Does that later team mail answer what they asked?”', 'will'], ['Opus says yes, and Jev reads 0.36', 'under the line at {clientAsk}', 'code']], end: [['Refused, because they differ', '', 'block']] }], note: 'Made, because no client answer has met an approved question yet. The 0.36 is Jev’s real reading of C2’s “Issue with site?” inside the verifiers on Nov 1.' },
    JEVP: { tag: 'made', rows: [{ steps: [['A fix that says “Ship the lead-source page.”', 'from answer 44, with no where, from or to', 'opus'], ['Could a manager act on it as written?', 'a clear no', 'code']], end: [['Refused, naming the fix', '', 'block']] }], note: 'Made, because answer 44 saved before Jev read fixes, so no reading exists. The fix itself is real.' },
    NO: { tag: 'real', rows: [{ steps: [['A quote cut from Waylon’s bolded line', 'his mail of Oct 21', 'will'], ['“cuts a sentence … Quote the whole sentence”', '', 'code']], end: [['Nothing was saved, so Opus quoted the line whole', '', 'opus']] }], note: 'C2, Nov 1, from code’s own note on that refusal. Answer 44 holds the quote with its bold marks.' },
    OK: { tag: 'real', rows: [{ steps: [['“Saved answer 44”', 'The client on the whole account, a problem', 'code'], ['Not checked', 'none, because every quote was found', 'code']], end: [['The next modules read it', '', 'code']] }], note: 'C2’s answer 44, of Nov 1.' }
  },

  reviewed: { self: 'cbc034e1', above: 'a94aa4ce', on: '2026-11-07' }
});
