// Nov 8, 2026: plain-words pass (Will: "The client module needs a run that removes robot speak. Please make this
// intelligable"). Only the words changed, and the logic and every fact stayed the same. The module is "the client module",
// never "The client" alone; C2's answer 44 is "C2's test answer"; the brief is "the fact sheet". check-plain.cjs judges it.
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
  head: 'Code checks the client module’s answer before it is saved, the cheap checks first, and any miss sends it back to Opus',
  chart: [
    'flowchart TB',
    'ANS["Opus writes one answer, with its<br/>verdict, its proof, what would<br/>prove it wrong, and each fix"]:::opus',
    'OWN{"Is it for this run’s<br/>own client?"}:::code',
    'PLAIN{"Is it in plain words, with<br/>no ids, file paths or links?"}:::code',
    'SHAPE{"Is it complete, and does each<br/>problem come with a fix?"}:::code',
    'RUN{"Does it answer every item from<br/>the newest run of Will’s checks?"}:::code',
    'QUO{"Are the words of each<br/>quote in its source?"}:::code',
    'JEVQ{"On a check Will approved for Jev,<br/>does Opus’s yes or no<br/>match Jev’s reading?"}:::code',
    'JEVP{"Could the account’s manager<br/>act on each fix as written?"}:::code',
    'NO(["Refused, with the reason,<br/>so nothing is saved"]):::code',
    'OK(["Saved as the newest answer<br/>for the whole account"]):::code',
    'ANS --> OWN',
    'OWN -- yes --> PLAIN', 'PLAIN -- yes --> SHAPE', 'SHAPE -- yes --> RUN', 'RUN -- yes --> QUO', 'QUO -- yes --> JEVQ', 'JEVQ -- yes --> JEVP',
    'JEVP -- "yes, or Jev is unsure,<br/>or gives no reading" --> OK',
    'OWN -- no --> NO', 'PLAIN -- no --> NO', 'SHAPE -- no --> NO', 'RUN -- no --> NO', 'QUO -- no --> NO', 'JEVQ -- no --> NO',
    'JEVP -- "a clear no" --> NO',
    'NO -. "Opus fixes it<br/>and tries again" .-> ANS'
  ],
  links: { ANS: 'ckanswer', PLAIN: 'ckplain', SHAPE: 'ckshape', RUN: 'ckrun', JEVQ: 'ckjevq', JEVP: 'ckjevp' },
  leaves: {
    ckanswer: 'Every module answers in the same shape',
    ckplain: 'Plain words',
    ckshape: 'Each problem comes with a fix',
    ckrun: 'It must answer the newest run of Will’s checks',
    ckjevq: 'Jev on the checks Will approved',
    ckjevp: 'Jev reads each fix'
  },

  // Each slide belongs to one view: the part's own slides first, then one or more for each rule.
  deck: [
    { about: ['ccheck'], kicker: 'In order',
      head: 'Code runs the cheap checks first, so it never opens a mail or a call for an answer that would be refused anyway',
      visual: { type: 'gate', rows: [
        ['Its own client', 'A run writes only for its own client.', 'pass'],
        ['Plain words, a complete answer, and a fix for each problem', 'These need nothing opened.', 'pass'],
        ['The newest run of Will’s checks', 'One read of the run that Barbara keeps.', 'pass'],
        ['Each quote', 'One read of each mail, call or case reply that it quotes.', 'pass'],
        ['Jev', 'One read for the checks Will approved, and one for all the fixes together.', 'pass']],
        end: ['Saved, or refused with the reason', 'code'] },
      vcap: 'The client module needs no other module’s answer, so it never waits at the rule that makes the campaign modules wait for the answers about the whole account. Every refusal ends with “Nothing was saved.”' },
    { about: ['ccheck'], kicker: 'A refusal is a retry',
      head: 'Each refusal says what is wrong and saves nothing, so Opus fixes it and tries again',
      visual: { type: 'flow', rows: [
        { title: 'A cut quote', steps: [['“Anything that changes looks or words …”', 'C2, Nov 1', 'will'], ['“… cuts a sentence … Quote the whole sentence”', 'code’s own words', 'code']], end: [['Nothing was saved', '', 'block']] },
        { title: 'A problem with no fix', steps: [['Bull’s bid answer on Hedge Funds, Nov 1', 'a problem, and no fix', 'code'], ['The rule it led to', 'every problem needs a fix', 'code']], end: [['Today nothing would be saved', '', 'block']] },
        { title: 'An old run of Will’s checks', steps: [['A run more than {clientRunAge} hours old', '', 'code'], ['“… is over a day old. Run the module’s check …”', 'code’s own words', 'code']], end: [['Nothing was saved', '', 'block']] }] },
      vcap: 'The cut quote is real, from C2 on Nov 1. Bull’s bid answer was saved before the rule existed, and it is the reason the rule exists. No answer of the client module has met an old run of Will’s checks yet.' },

    { about: ['ckanswer'], kicker: 'The same shape for every module',
      head: 'Every module answers in the same shape, and the client module fills it with the client’s own words',
      visual: { type: 'card', title: 'The answer, part by part, with the values from C2’s test', fields: [
        ['The verdict', 'Good, a problem, too few to tell, or ask a person. C2’s answer said a problem.'],
        ['The summary', 'One or two plain sentences for Will.'],
        ['The proof', 'Each fact with its source. C2’s answer had 17.'],
        ['The quotes', 'Each person’s words, in whole sentences, with the kind of source and where it is. C2’s answer had 60.'],
        ['What would prove it wrong', 'The next morning tests this first.'],
        ['Each fix', 'What, why, what it should change, what it waits on, the money a month, and its case. C2’s answer had 5.'],
        ['Each ask', 'Whom to ask, and what. C2’s answer had none.'],
        ['The checks', 'Each flag that the scorecard raised, and each item from the run of Will’s checks, by its id. C2’s answer answered 12 in words.'],
        ['Which run of Will’s checks it answers', 'The run’s id. C2’s answer named none, because no run had been sent to Barbara then.']],
        stamp: ['The answer changes nothing, and the next modules read it', 'code'] },
      vcap: 'The answer has no field of its own for what we told the client or what we owe them, so those go in the summary and the proof.' },

    { about: ['ckplain'], kicker: 'Plain words',
      head: 'Ids, file paths and links stay out of the summary and the fixes',
      visual: { type: 'flow', rows: [
        { title: 'Passes', steps: [['“Spend fell 12% on Oct 12.”', '', 'code']], end: [['Plain words, so it passes', '', 'keep']] },
        { title: 'Refused', steps: [['“Ad group 161332849374 blocks 3 keywords.”', '', 'code']], end: [['“write it in plain words for Will, and put ids, file paths and links in details”', '', 'block']] }] },
      vcap: 'These are code’s own test cases. Code checks the summary, and what each fix is and what it should change. The proof may hold ids, because it has to say where each fact came from.' },

    { about: ['ckshape'], kicker: 'Each problem comes with a fix',
      head: 'A problem must come with a fix, and each fix must say what it should change',
      visual: { type: 'flow', rows: [
        { title: 'The rule', steps: [['A verdict of a problem', 'with at least one fix', 'opus'], ['Each fix says what it should change', 'and which number will show the change, and when', 'code']], end: [['The answer can be saved', '', 'keep']] },
        { title: 'C2’s test answer today', steps: [['A problem with 5 fixes', 'none says what it should change, because it was saved before the rule', 'code']], end: [['Refused, because each fix must say what it should change', '', 'block']] }] },
      vcap: 'A fix that must wait says what it is waiting on, instead of proposing nothing. The answer also needs a summary, at least one fact of proof with its source, and what would prove it wrong.',
      quote: ['NO I want to have as many proposals as needed. But yes a problem should always name a fix. They should be intelligable though and thought through.', 'Nov 1'] },

    { about: ['ckrun'], kicker: 'The newest run of Will’s checks',
      head: 'The answer must name the newest run of Will’s client checks, and answer each of its items by id',
      visual: { type: 'gate', rows: [
        ['It names the newest run of Will’s checks on the whole account', '', 'pass'],
        ['That run is less than {clientRunAge} hours old', '', 'pass'],
        ['Each failure and each question is answered by its id', '', 'pass'],
        ['A failure gets a no, with its fix or its case', 'and a check that Opus thinks is wrong goes on the verifiers’ list of misses', 'pass'],
        ['The verdict cannot be good while a failure stands', '', 'pass']],
        end: ['The answer meets the checks', 'code'] },
      vcap: 'The verifiers have not sent a module run to Barbara yet. Until a run arrives, code has nothing to compare the answer with, so it skips this check. That is how C2’s test answer was saved, with no run to compare it with. It answered the 8 failed checks and the 3 that could not run in words, without their ids.' },

    { about: ['ckjevq'], kicker: 'Jev on the checks Will approved',
      head: 'On a check that Will approved for Jev, Opus’s yes or no must match Jev’s reading',
      visual: { type: 'scale', label: 'Jev’s reading of “Does that later team mail answer what they asked?”',
        lines: [['{clientAsk}', 'the line at {clientAsk}', 'will']],
        dots: [[0.36, 'C2, Nov 1, “Issue with site?”', 'block']],
        zones: [[0, '{clientAsk}', 'Jev reads no', 'block'], ['{clientAsk}', 1, 'Jev reads yes', 'keep']] },
      vcap: 'On Nov 1, inside the verifiers, Jev scored this question 0.36 for C2’s “Issue with site?”, so the check failed. Now Opus answers the question and Jev reads Opus’s answer, so if they differ, or Jev gives no reading, nothing is saved. Only the inbox has checks that Will approved for Jev, and the meetings and the record have none.' },

    { about: ['ckjevp'], kicker: 'Jev reads each fix',
      head: 'Jev reads each fix once, and a clear no refuses it, but an unsure reading lets it through',
      visual: { type: 'scale', label: 'Jev’s reading of “Could the account’s manager act on this fix as written?”',
        lines: [['{clientJevNo}', 'refused at or under {clientJevNo}', 'block'], ['{clientJevYes}', 'sure from {clientJevYes}', 'keep']],
        dots: [[0.08, '“Look at the tags.”', 'block'], [0.93, 'a fix to the tags that says what to change and by when', 'keep']],
        zones: [[0, '{clientJevNo}', 'Refused, because the manager could not act on it', 'block'], ['{clientJevNo}', '{clientJevYes}', 'Unsure, and it is saved', 'wait'], ['{clientJevYes}', 1, 'Yes, and it is saved', 'keep']] },
      vcap: 'Jev reads what each fix is, why, what it should change, what it waits on and what is at stake. The two dots come from code’s own test cases, because Jev has not read any fix from the client module yet. If Jev does not answer, the fixes are saved unread.' }
  ],

  examples: {
    ANS: { tag: 'real', rows: [{ steps: [['Opus, on C2', 'Nov 1, about 4 AM ET, in a test', 'opus']], end: [['One answer for the whole account', 'it says there is a problem, with 17 facts of proof and 60 quotes', 'opus']] }], note: 'We took this from the answer that the client module wrote for C2 on Nov 1.' },
    OWN: { tag: 'real', rows: [{ steps: [['A run for C2', 'it writes for C2 alone', 'code'], ['Opus answers the client module', 'code answers only the In motion and Money modules', 'code']], end: [['Yes, so on to the next check', '', 'code']] }], note: 'We took this from the answer that the client module wrote for C2 on Nov 1. A run that names another client is refused with “This run writes only for client 13.”' },
    PLAIN: { tag: 'real', rows: [{ steps: [['Its summary', '“Waylon wants more budget that brings real leads …”', 'opus'], ['No id, file path or link', '', 'code']], end: [['It is in plain words, so it passes', '', 'code']] }], note: 'We took this from the answer that the client module wrote for C2 on Nov 1.' },
    SHAPE: { tag: 'real', rows: [{ steps: [['A problem with 5 fixes', 'each on an open case', 'opus'], ['Does each problem come with a fix?', 'yes', 'code']], end: [['It passed', 'before the rule that each fix says what it should change', 'code']] }], note: 'We took this from the answer that the client module wrote for C2 on Nov 1. Today each of its fixes would also have to say what it should change.' },
    RUN: { tag: 'real', rows: [{ steps: [['The 12 checks in C2’s test answer', 'answered in words, with no ids', 'opus'], ['A run of Will’s checks sent to Barbara?', 'none on Nov 1', 'code']], end: [['Nothing to compare with, so it passes', '', 'code']] }], note: 'We took this from the answer that the client module wrote for C2 on Nov 1. Code skips this check until the verifiers send module runs to Barbara.' },
    QUO: { tag: 'real', rows: [{ steps: [['60 quotes', '18 from mail and 42 from calls', 'opus']], end: [['Each one found in its source', '', 'keep']] }], note: 'We took this from the answer that the client module wrote for C2 on Nov 1.' },
    JEVQ: { tag: 'made', rows: [{ steps: [['A question from a check Will approved', '“Does that later team mail answer what they asked?”', 'will'], ['Opus says yes, and Jev reads 0.36', 'under the line at {clientAsk}', 'code']], end: [['Refused, because they differ', '', 'block']] }], note: 'Made up, because no answer of the client module has met an approved question yet. The 0.36 is Jev’s real reading of C2’s “Issue with site?” inside the verifiers on Nov 1.' },
    JEVP: { tag: 'made', rows: [{ steps: [['A fix that says “Ship the lead-source page.”', 'a real fix from C2’s test, which names no place and no change', 'opus'], ['Could a manager act on it as written?', 'a clear no', 'code']], end: [['Refused, naming the fix', '', 'block']] }], note: 'We made this up, because C2’s test answer was saved before Jev started reading fixes. The fix itself is real.' },
    NO: { tag: 'real', rows: [{ steps: [['Opus quoted Waylon’s bold line without its bold marks', 'his mail of Oct 21', 'will'], ['“cuts a sentence … Quote the whole sentence”', '', 'code']], end: [['Nothing was saved, so Opus quoted the line again with its bold marks', '', 'opus']] }], note: 'We took this from code’s record of the client module’s answer for C2 on Nov 1, which shows the refusal. The saved answer keeps the quote, bold marks and all.' },
    OK: { tag: 'real', rows: [{ steps: [['Code replies that the answer is saved', 'its verdict for the whole account is a problem', 'code'], ['Quotes not checked', 'none, because every quote was found', 'code']], end: [['The next modules can now use the answer', '', 'code']] }], note: 'We took this from the answer that the client module saved for C2 on Nov 1.' }
  },

  reviewed: { self: '04904eb1', above: 'f4196f57', on: '2026-11-08' }
});
