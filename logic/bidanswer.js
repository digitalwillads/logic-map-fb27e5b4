// The answer and its rules: the one fixed answer of every module (comm-chat src/modules/mod.rs:441-722) and each rule
// that write_module_answer checks before it saves, in its own order (src/chat/tools/module_tools.rs:483-558): the shape
// (Answer::model_problem and plain words), the needs, the target, the check run (modules/run.rs), the quotes, then Jev's
// reading of each proposal. Sources for each box: HANDOFF-bids-client.md.
LOGIC.flow({
  id: 'bidanswer', parent: 'bids',
  title: 'The answer and its rules', short: 'The answer',
  head: 'Opus writes one fixed answer, and code checks it before it saves',
  chart: [
    'flowchart TB',
    'A["Opus writes one answer:<br/>verdict, summary, proof,<br/>proposals, checks"]:::opus',
    'S{"The shape: proof, and<br/>a fix for each problem?"}:::code',
    'F{"Account answers still<br/>under {bidFresh} days?"}:::code',
    'T{"One of its<br/>targets today?"}:::code',
    'R{"Each FAIL of today\'s<br/>bids run answered?"}:::code',
    'Q{"Each quote in<br/>its source?"}:::code',
    'J{"Jev: can a manager act<br/>on each proposal?"}:::code',
    'NO(["Refused, with why:<br/>nothing saves"]):::code',
    'OK(["Saved: the newest answer<br/>for this campaign"]):::code',
    'A --> S',
    'S -- yes --> F', 'F -- yes --> T', 'T -- yes --> R', 'R -- yes --> Q', 'Q -- yes --> J',
    'J -- "yes, unsure,<br/>or no reading" --> OK',
    'S -- no --> NO', 'F -- no --> NO', 'T -- no --> NO', 'R -- no --> NO', 'Q -- no --> NO',
    'J -- "a clear no" --> NO',
    'NO -. "Opus fixes it<br/>and tries again" .-> A'
  ],
  links: { A: 'bidverdict', S: 'bidshape', R: 'bidrun', Q: 'bidquotes', J: 'bidjev' },
  leaves: {
    bidverdict: 'Four verdicts',
    bidshape: 'A problem names its fix',
    bidrun: 'Held to its check run',
    bidquotes: 'Quotes, checked at their source',
    bidjev: 'Jev reads each proposal'
  },

  // Each slide belongs to one view: the part's own slides first, then one or more for each rule.
  deck: [
    { about: ['bidanswer'], kicker: 'The fixed answer',
      head: 'Every module saves the same shape, and Bid and budget fills it for one campaign',
      visual: { type: 'card', title: 'The answer, field by field', fields: [
        ['verdict', 'good, problem, too few to tell, or ask'],
        ['summary', 'one or two plain sentences for Will'],
        ['proof', 'each fact with its source'],
        ['quotes', 'each person\'s words, whole sentences, with the source'],
        ['would prove wrong', 'the next brief tests it first'],
        ['proposes', 'what, why, effect, waits on, money a month, its case'],
        ['asks', 'who, and what only they can answer'],
        ['checks', 'each failed check, and each FAIL of its run by its id']], stamp: ['It changes nothing: it only answers', 'code'] },
      vcap: 'A module never changes the account. Decide and then the run, inside the walls, carry out what it proposes.' },
    { about: ['bidanswer'], kicker: 'In order',
      head: 'Code checks the cheap things first, and reads no source for an answer that cannot save',
      visual: { type: 'gate', rows: [
        ['The shape', 'no read: plain words, proof, a fix for a problem, an effect for each fix', 'pass'],
        ['The needs and the campaign', 'one read of the saved answers and of the target list', 'pass'],
        ['Its check run', 'the newest run on this campaign, each FAIL answered', 'pass'],
        ['Each quote', 'one read of each mail, call or case reply', 'pass'],
        ['Jev', 'one read of all the proposals together', 'pass']], end: ['Saved, with the run\'s id', 'code'] },
      vcap: 'No link to the database stays open while a source or Jev is read.' },

    { about: ['bidverdict'], kicker: 'Four verdicts',
      head: 'The words say keep, raise, cut or too few, but code knows only four verdicts',
      visual: { type: 'card', title: 'The four real answers of Nov 1', fields: [
        ['C2 Competitor: "keep it at $10 a day"', 'saved as too few to tell'],
        ['Bull Hedge Funds & PE: "keep the $15 bid"', 'saved as a problem'],
        ['Kogalla PMax: "cut"', 'saved as a problem'],
        ['Bull Securities: "too few to tell"', 'saved as too few to tell']], stamp: ['No rule ties a word to a verdict', 'wait'] },
      vcap: 'The verdict sets the rules: a problem must propose its fix, and an ask must name who. A good verdict cannot stand beside a FAIL of its run.' },
    { about: ['bidshape'], kicker: 'A problem names its fix',
      head: 'Bull\'s Hedge Funds answer found $2,142.53 spent with no lead, and proposed nothing',
      visual: { type: 'flow', rows: [
        { title: 'Bull, Nov 1: the real answer', steps: [['Hedge Funds & PE', 'no lead since Sep 3, on $2,142.53', 'code'], ['The answer', 'a problem: keep the $15 bid and $45 a day, propose nothing', 'opus']], end: [['Saved that day', 'before the rule', 'block']] },
        { title: 'Today', steps: [['The same answer', '', 'opus'], ['Code', 'a problem with no proposal', 'code']], end: [['Refused: "A problem names its fix"', 'say what the fix waits on', 'block']] }] },
      vcap: 'Kogalla\'s PMax answer of Nov 1 did the same: a problem, and its cut already waited on Will. Today it must propose that cut, and say that it waits on Will\'s yes.',
      quote: ['NO I want to have as many proposals as needed. But yes a problem should always name a fix. They should be intelligable though and thought through.', 'Nov 1'] },
    { about: ['bidshape'], kicker: 'The rest of the shape',
      head: 'Each proposal must say what, why and its effect, in plain words',
      visual: { type: 'gate', rows: [
        ['A summary, proof, and what would prove it wrong', 'none may be blank', 'pass'],
        ['Plain words', 'no link, file path or id of {bidDigits} or more digits in the summary, a proposal\'s what or its effect', 'pass'],
        ['Each proposal', 'what and why; then its effect: what it should do, the number that will show it, and when', 'pass'],
        ['Money a month', 'a number, 0 or more', 'pass'],
        ['Each ask', 'who and what; the verdict ask needs one', 'pass']], end: ['A miss: refused, with why', 'block'] },
      vcap: 'The rule\'s test writes Bull\'s fix as a made-up cut, with its effect, and says that it waits on "Tyler\'s answer on the Hedge Funds review".' },
    { about: ['bidrun'], kicker: 'Held to its check run',
      head: 'The answer must name today\'s bids run on this campaign, and answer each FAIL with no',
      visual: { type: 'gate', rows: [
        ['The newest run on this campaign', 'under {bidRunHours} hours old, named in the answer', 'pass'],
        ['Each FAIL', 'answered by its id: no, with its fix or its case', 'pass'],
        ['Yes on a FAIL', 'refused: only the verifiers\' next run passes it', 'stop'],
        ['A good verdict beside a FAIL', 'refused: the answer is a problem, too few or ask', 'stop'],
        ['A QUESTION line', 'none here: every bid check is code, so a bids run asks no question', 'hold']], end: ['A check that is wrong goes to the misses list, not into the answer', 'will'] },
      vcap: 'The four answers of Nov 1 saved before code held answers to their check run, so code compared them with nothing.' },
    { about: ['bidquotes'], kicker: 'Quotes',
      head: 'Each person\'s words in an answer are read at their source before it saves',
      visual: { type: 'card', title: 'A real quote in a bids answer (C2, answer 53)', fields: [
        ['Words', '"got it okay so if we can get this down to what like 500 of conversion you think that\'s worth"'],
        ['Who', 'Waylon, on the call of Sep 24'],
        ['Kind', 'a call: the words must be in its transcript'],
        ['Code\'s mark', 'checked']], stamp: ['Checked at its source', 'keep'] },
      vcap: 'A mail or a case reply must quote whole sentences. A text is never read here: it saves as not checked. Bull, Nov 1: Will\'s replies on two cases were refused as quotes, so code now reads a case reply too.' },
    { about: ['bidjev'], kicker: 'Jev',
      head: 'Jev asks of each proposal: could the account\'s manager act on it as written?',
      visual: { type: 'scale', label: 'Jev: could a manager act on it as written?',
        lines: [['{bidJev}', 'refused at or under {bidJev}', 'block'], ['{bidJevSure}', 'a clear yes from {bidJevSure}', 'keep']],
        dots: [[0.08, '"Look at the tags."', 'block'], [0.93, 'the tag fix, with its day', 'keep']],
        zones: [[0, '{bidJev}', 'Refused, by name', 'block'], ['{bidJev}', '{bidJevSure}', 'Unsure: it saves', 'wait'], ['{bidJevSure}', 1, 'Yes: it saves', 'keep']] },
      vcap: 'The two dots are the test\'s, not a real bids proposal: no real bids answer has proposed a change yet. When Jev does not answer, the answer saves unread.' }
  ],

  examples: {
    A: { tag: 'real', rows: [{ steps: [['C2 Competitor', 'Nov 1', 'code'], ['Opus writes', 'too few to tell, 12 proof lines, 2 quotes, 2 checks', 'opus']], end: [['No proposal', '', 'wait']] }], note: 'C2, Nov 1: answer 53.' },
    S: { tag: 'made', rows: [{ steps: [['Bull Hedge Funds & PE', 'a problem, no proposal', 'opus'], ['The shape', 'a problem names its fix', 'code']], end: [['Refused', 'nothing saves', 'block']] }], note: 'Made from a real answer: Bull\'s Hedge Funds answer of Nov 1 saved before this rule. The rule\'s test replays it.' },
    F: { tag: 'made', rows: [{ steps: [['Bull, Nov 8', 'the account answers turn {bidFresh} days old', 'code'], ['Still fresh?', 'no', 'code']], end: [['Refused: "Wait for Tracking, The client, In motion and Money"', '', 'block']] }], note: 'Made: the same rule as the brief\'s WAIT, asked again when the answer saves.' },
    T: { tag: 'made', rows: [{ steps: [['An answer for a campaign', 'of another client', 'code'], ['One of its targets?', 'no', 'code']], end: [['Refused: nothing was saved', '', 'block']] }], note: 'Made: the module tools\' own test of a target of another client.' },
    R: { tag: 'made', rows: [{ steps: [['A good verdict', 'beside a FAIL of today\'s run', 'opus'], ['Its check run', '', 'code']], end: [['Refused: a FAIL stands until the next run passes it', '', 'block']] }], note: 'Made: no bids answer has met a pushed check run yet.' },
    Q: { tag: 'real', rows: [{ steps: [['C2 answer 53', 'Waylon\'s words from the Sep 24 call', 'opus'], ['Read at its source', 'the call\'s transcript', 'code']], end: [['Checked', '', 'keep']] }], note: 'C2, Nov 1: answer 53.' },
    J: { tag: 'made', rows: [{ steps: [['A proposal', '"Look at the tags."', 'opus'], ['Jev', '0.08', 'code']], end: [['Refused, by name', '', 'block']] }], note: 'Made: the test\'s vague proposal. No real bids answer has proposed a change yet.' },
    NO: 'S',
    OK: { tag: 'real', rows: [{ steps: [['C2 answer 53', 'too few to tell', 'opus'], ['Saved', 'Nov 1', 'code']], end: [['Its next brief shows it', '', 'code']] }], note: 'C2, Nov 1: answer 53. Its two quotes saved as checked.' }
  },

  reviewed: { self: 'f6c9fa6e', above: '142877dc', on: '2026-11-07' }
});
