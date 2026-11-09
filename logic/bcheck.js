// How code checks the answer: write_module_answer's rules in their own order (comm-chat src/chat/tools/module_tools.rs
// :483-560 `save_answer`): plain words (src/cases/words.rs:55-96, an id of 9 digits or more at :78), the shape
// (src/modules/mod.rs:666-722 `problem` and `model_problem`: a problem names its fix, each fix its effect), the four answers
// again (module_tools.rs:513-517), one of its campaigns today (:358-367 `target_of`), held to its bids check
// (src/modules/run.rs:113-177: the newest run under 24 hours, each FAIL answered no by its id, no good verdict beside a FAIL),
// the quotes at their source (module_tools.rs:436-481 and :619-669; docs/design/modules/README.md:97-122), and Jev's read of
// each proposal (:562-617; src/chat/jev.rs:19, refused at or under 0.30). The answer's fields: mod.rs:441-663. The rule's
// tests: mod.rs:800-821 (Bull's Hedge Funds answer of Nov 1), module_tools.rs:820-840 (the vague proposal). Real answers:
// C2's answers 52 and 53 (Nov 1, read whole on 2026-11-07); Bull's Hedge Funds answer as its last line shows it. Old part:
// retired/2026-11-07-bids-redo/bidanswer.js.
LOGIC.flow({
  id: 'bcheck', parent: 'bids',
  title: 'How code checks the answer', short: 'How code checks it',
  head: 'Code checks the answer before it saves, the cheap rules first, and any miss sends it back to Opus',
  chart: [
    'flowchart TB',
    'ANS["Opus writes one answer: its<br/>verdict, its proof, what would<br/>prove it wrong, each change"]:::opus',
    'SHAPE{"Is it whole and in plain<br/>words, with a fix<br/>for a problem?"}:::code',
    'FRESH{"Are the four account<br/>answers still under<br/>{bidFresh} days old?"}:::code',
    'TGT{"Is it one of this<br/>client’s campaigns<br/>today?"}:::code',
    'RUN{"Does it answer each<br/>failure of today’s<br/>bids check?"}:::code',
    'QUO{"Is each quote<br/>in its source?"}:::code',
    'JEV{"Could a manager act<br/>on each change<br/>as written?"}:::code',
    'NO(["Refused, with why, so<br/>Opus answers again"]):::code',
    'OK(["Saved as the newest answer<br/>for this campaign"]):::code',
    'ANS --> SHAPE',
    'SHAPE -- yes --> FRESH', 'FRESH -- yes --> TGT', 'TGT -- yes --> RUN', 'RUN -- yes --> QUO', 'QUO -- yes --> JEV',
    'JEV -- "yes, unsure,<br/>or no reading" --> OK',
    'SHAPE -- no --> NO', 'FRESH -- no --> NO', 'TGT -- no --> NO', 'RUN -- no --> NO', 'QUO -- no --> NO',
    'JEV -- "a clear no" --> NO',
    'NO -. "Opus fixes it<br/>and tries again" .-> ANS'
  ],
  links: { ANS: 'bkanswer', SHAPE: 'bkshape', RUN: 'bkrun', QUO: 'bkquotes', JEV: 'bkjev' },
  leaves: {
    bkanswer: 'One fixed answer',
    bkshape: 'A problem names its fix',
    bkrun: 'Held to its bids check',
    bkquotes: 'Quotes, read at their source',
    bkjev: 'Jev reads each change'
  },

  // Each slide belongs to one view: the part's own slides first, then one or more for each rule.
  deck: [
    { about: ['bcheck'], kicker: 'In order',
      head: 'Code checks the cheap things first, so it reads no source for an answer that cannot save',
      visual: { type: 'gate', rows: [
        ['The shape', 'No read is needed for the plain words, the proof, a fix for a problem, and an effect for each fix.', 'pass'],
        ['The four answers and the campaign', 'One read of the saved answers and one of the campaign list.', 'pass'],
        ['Its bids check', 'The newest check on this campaign, with each failure answered.', 'pass'],
        ['Each quote', 'One read of each mail, call or case reply that it quotes.', 'pass'],
        ['Jev', 'One read of all the proposed changes together.', 'pass']], end: ['Saved, with the check’s id', 'code'] },
      vcap: 'Each rule that needs no read comes first, so an answer that fails a cheap rule costs no reads.' },

    { about: ['bkanswer'], kicker: 'One fixed answer',
      head: 'Every module saves the same answer, and Bid and budget fills it for one campaign',
      visual: { type: 'card', title: 'The answer, part by part', fields: [
        ['The verdict', 'good, a problem, too few to tell, or ask a person'],
        ['The summary', 'one or two plain sentences for Will'],
        ['The proof', 'each fact with its source'],
        ['The quotes', 'each person’s words, in whole sentences, each with its source'],
        ['What would prove it wrong', 'the next morning tests it first'],
        ['Each change', 'what, why, its effect, what it waits on, the money a month, and its case'],
        ['Each ask', 'whom to ask, and what only they can answer'],
        ['The checks', 'each listed failure, and each failure of its bids check by its id']], stamp: ['It changes nothing, it only answers', 'code'] },
      vcap: 'A module never changes the account. Decide, and then the daily run, carry out what it proposes, inside Will’s limits.' },

    { about: ['bkshape'], kicker: 'A problem names its fix',
      head: 'A problem must name its fix, because Bull’s Hedge Funds answer found $2,142.53 spent with no lead and proposed nothing',
      visual: { type: 'flow', rows: [
        { title: 'Bull, Nov 1, the real answer', steps: [['Hedge Funds and PE', 'no lead since Sep 3, on $2,142.53', 'code'], ['The answer', 'a problem, but keep the $15 bid and $45 a day, and propose nothing', 'opus']], end: [['It saved that day', 'before the rule', 'block']] },
        { title: 'Today', steps: [['The same answer', '', 'opus'], ['Code', 'a problem with no change proposed', 'code']], end: [['Refused, because a problem names its fix', 'and says what the fix waits on', 'block']] }] },
      vcap: 'Kogalla’s PMax answer of Nov 1 did the same, a problem whose cut already waited on Will. Today it must propose that cut, and say that it waits on Will’s yes.',
      quote: ['NO I want to have as many proposals as needed. But yes a problem should always name a fix. They should be intelligable though and thought through.', 'Nov 1'] },
    { about: ['bkshape'], kicker: 'The rest of the shape',
      head: 'Each proposed change must say what, why and its effect, in plain words',
      visual: { type: 'gate', rows: [
        ['A summary, proof, and what would prove it wrong', 'None of them may be blank.', 'pass'],
        ['Plain words', 'No link, file path or id of {bidDigits} or more digits in the summary, in what a change is, or in its effect.', 'pass'],
        ['Each change', 'What and why, then its effect, meaning what it should do, the number that will show it, and when.', 'pass'],
        ['The money a month', 'A number, 0 or more.', 'pass'],
        ['Each ask', 'Who and what, and an ask verdict needs at least one ask.', 'pass']], end: ['A miss is refused, with why', 'block'] },
      vcap: 'The rule’s test writes Bull’s fix as a made-up cut with its effect, and says that it waits on Tyler’s answer on the Hedge Funds review.' },

    { about: ['bkrun'], kicker: 'Held to its bids check',
      head: 'The answer must name today’s bids check on this campaign, and treat each failure as a failure, with its fix or its case',
      visual: { type: 'gate', rows: [
        ['The newest check on this campaign', 'Under {bidRunHours} hours old, and named in the answer.', 'pass'],
        ['Each failure', 'Answered by its id with no, and its fix or its case.', 'pass'],
        ['Yes on a failure', 'Refused, because only the verifiers’ next run can pass it.', 'stop'],
        ['A good verdict beside a failure', 'Refused, because the answer is then a problem, too few to tell, or ask.', 'stop'],
        ['A question for Opus', 'None here, because every bids check is code, so the check asks Opus no question.', 'hold']], end: ['A check that is wrong goes to the misses list, not into the answer', 'will'] },
      vcap: 'On Nov 1 C2’s Brand answer saved as good while its bids check held a failure on brand clicks, because no check was held to an answer yet. Held to its check, that answer is refused.' },

    { about: ['bkquotes'], kicker: 'Quotes',
      head: 'Each person’s words in an answer are read at their source before it saves',
      visual: { type: 'card', title: 'A real quote in a bid answer, C2’s answer 53', fields: [
        ['The words', '“got it okay so if we can get this down to what like 500 of conversion you think that’s worth”'],
        ['Who said them', 'Waylon, on the call of Sep 24'],
        ['Where code reads them', 'in the call’s transcript, where the words must stand'],
        ['Code’s mark', 'checked']], stamp: ['Read at its source', 'keep'] },
      vcap: 'A mail or a case reply must be quoted in whole sentences, and a text is never read here, so it saves as not checked. On Nov 1 code refused Will’s replies on two of Bull’s cases as quotes, so it now reads a case reply too.' },

    { about: ['bkjev'], kicker: 'Jev',
      head: 'Jev asks of each proposed change whether the account’s manager could act on it as written',
      visual: { type: 'scale', label: 'Jev: could a manager act on it as written?',
        lines: [['{bidJev}', 'refused at or under {bidJev}', 'block'], ['{bidJevSure}', 'a clear yes from {bidJevSure}', 'keep']],
        dots: [[0.08, '“Look at the tags.”', 'block'], [0.93, 'the tag fix, with its day', 'keep']],
        zones: [[0, '{bidJev}', 'Refused, by name', 'block'], ['{bidJev}', '{bidJevSure}', 'Unsure, and it saves', 'wait'], ['{bidJevSure}', 1, 'Yes, and it saves', 'keep']] },
      vcap: 'The two dots come from the rule’s test, not from a real bid answer, because none has proposed a change yet. When Jev does not answer, the answer saves unread.' }
  ],

  examples: {
    ANS: { tag: 'real', rows: [{ steps: [['C2’s Competitor campaign', 'Nov 1', 'code'], ['Opus writes', 'too few to tell, 12 proof lines, 2 quotes and 2 checks', 'opus']], end: [['No change proposed', '', 'wait']] }], note: 'C2’s answer 53, of Nov 1.' },
    SHAPE: { tag: 'made', rows: [{ steps: [['Bull’s Hedge Funds answer', 'a problem, and no change proposed', 'opus'], ['Is it whole, with a fix for a problem?', 'no', 'code']], end: [['Refused, so nothing saves', '', 'block']] }], note: 'Made from a real answer. Bull’s Hedge Funds answer of Nov 1 saved before this rule, and the rule’s test replays it.' },
    FRESH: { tag: 'made', rows: [{ steps: [['Bull, Nov 8', 'the four account answers turn {bidFresh} days old', 'code'], ['Still under {bidFresh} days?', 'no', 'code']], end: [['Refused, with “Wait for Tracking, The client, In motion and Money”', '', 'block']] }], note: 'Made, because this is the same rule as the wait at the start, asked again when the answer saves.' },
    TGT: { tag: 'made', rows: [{ steps: [['An answer for a campaign', 'of another client', 'code'], ['One of its campaigns today?', 'no', 'code']], end: [['Refused, so nothing saves', '', 'block']] }], note: 'Made from the module tools’ own test of a campaign of another client.' },
    RUN: { tag: 'made', rows: [{ steps: [['C2’s Brand answer, Nov 1', 'good, while its bids check held a failure on brand clicks', 'opus'], ['Held to that check', 'a good verdict beside a failure', 'code']], end: [['Refused, so nothing saves', '', 'block']] }], note: 'Made from a real answer. C2’s answer 52 of Nov 1 saved as good beside that failure, because no check was held to an answer yet.' },
    QUO: { tag: 'real', rows: [{ steps: [['C2’s answer 53', 'Waylon’s words from the call of Sep 24', 'opus'], ['Read at its source', 'the call’s transcript', 'code']], end: [['Checked', '', 'keep']] }], note: 'C2’s answer 53, of Nov 1.' },
    JEV: { tag: 'made', rows: [{ steps: [['A proposed change', '“Look at the tags.”', 'opus'], ['Jev', '0.08', 'code']], end: [['Refused, by name', '', 'block']] }], note: 'Made from the rule’s test of a vague proposal. No real bid answer has proposed a change yet.' },
    NO: 'SHAPE',
    OK: { tag: 'real', rows: [{ steps: [['C2’s answer 53', 'too few to tell', 'opus'], ['Saved', 'Nov 1', 'code']], end: [['The next morning’s facts show it as the last answer', '', 'code']] }], note: 'C2’s answer 53, of Nov 1. Its two quotes saved as checked.' }
  },

  reviewed: { self: 'a8fedaf1', above: 'a030a55d', on: '2026-11-08' }
});
