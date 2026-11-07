// Code checks the answer before it saves: comm-chat src/chat/tools/module_tools.rs:483-669 (`save_answer`, in this
// order: plain words, the shape, the needs, the target, the check run, the quotes, Jev on approved lines, Jev on each
// fix), src/modules/mod.rs:665-722 (`Answer::problem`, `model_problem`), src/modules/run.rs:113-177 (`of_answer`,
// `problem`) and 182-266 (`hear`), src/cases/words.rs:89-96 (`plain`), docs/design/modules/README.md (quotes, the run).
// No module run had reached Barbara by its copy of 2026-11-06, so today an answer saves as before, held to no run.
LOGIC.flow({
  id: 'tsave', parent: 'tracking',
  title: 'Code checks the answer before it saves', short: 'The save',
  head: 'Code checks the answer in a fixed order. The first rule it breaks refuses it, with why.',
  chart: [
    'flowchart TB',
    'IN["Opus sends its answer"]:::opus',
    'W{"Plain words: no ids, paths<br/>or links in the summary<br/>and the fixes?"}:::code',
    'S{"The shape: a summary, proof,<br/>what would prove it wrong,<br/>each fix with its effect?"}:::code',
    'P{"Has any check run<br/>reached Barbara yet?"}:::code',
    'R{"Does it name the newest run,<br/>under {runHours} hours old?"}:::code',
    'L{"Each failure and question<br/>answered by its line, and<br/>no failure marked passed?"}:::code',
    'G{"A good verdict while<br/>a failure stands?"}:::code',
    'Q{"Each quote found<br/>whole at its source?"}:::code',
    'H{"Jev, on each line Will<br/>approved: the same<br/>yes or no?"}:::code',
    'J{"Jev: could a person act<br/>on each fix as written?"}:::code',
    'SAVED(["Saved: the next modules<br/>read it, and Will marks it<br/>Right or Wrong"]):::code',
    'REF(["Refused: nothing is saved,<br/>and the refusal says why"]):::code',
    'IN --> W',
    'W -- yes --> S', 'S -- yes --> P', 'P -- yes --> R', 'P -- "no: held to no run" --> Q',
    'R -- yes --> L', 'L -- yes --> G', 'G -- no --> Q', 'Q -- yes --> H', 'H -- yes --> J', 'J -- "yes, or not sure" --> SAVED',
    'W -- no --> REF', 'S -- no --> REF', 'R -- no --> REF', 'L -- no --> REF', 'G -- yes --> REF', 'Q -- no --> REF', 'H -- no --> REF', 'J -- "a clear no" --> REF',
    'REF -. "Opus fixes it,<br/>and sends again" .-> IN'
  ],
  links: { W: 'tswords', S: 'tsshape', P: 'tsrun', R: 'tsrun', L: 'tsrun', G: 'tsrun', H: 'tsrun', Q: 'tsquotes', J: 'tsfix', SAVED: 'tssaved' },
  leaves: { tswords: 'Plain words', tsshape: 'The shape of an answer', tsrun: 'The check run', tsquotes: 'Quotes at their source', tsfix: 'Each fix, read by Jev', tssaved: 'Saved, then marked' },

  deck: [
    { about: ['tsave'], kicker: 'The order',
      head: 'The cheap checks come first, so no source is read for an answer that cannot save',
      visual: { type: 'flow', rows: [{ steps: [['Words', 'plain', 'code'], ['Shape', 'each field it needs', 'code'], ['The check run', 'each line answered', 'code'], ['Quotes', 'found at their source', 'code'], ['Jev', 'each fix a person can act on', 'code']], end: [['Saved', '', 'keep'], ['Refused, with why', '', 'block']] }] },
      vcap: 'Each refusal ends “Nothing was saved.” and names what to fix. Opus fixes it, and sends the answer again.' },
    { about: ['tsave'], kicker: 'Who may save',
      head: 'Only Will, Jacob and their runs save a module’s answer',
      visual: { type: 'gate', rows: [
        ['Will or Jacob', 'their own sessions, and the subagents of their runs', 'pass'],
        ['A run', 'it writes only for its own client', 'pass'],
        ['In motion and Money', 'code answers them: this save refuses a code module', 'stop']] },
      vcap: 'The save changes nothing but the module’s memory. The next module reads it, and Will marks it on Validators, Modules.' },

    { about: ['tswords'], kicker: 'Plain words',
      head: 'The summary and each fix must read as plain words for Will',
      visual: { type: 'card', title: 'What the words must be', fields: [
        ['The summary', 'one or two plain sentences'],
        ['Not in the words', 'ids, file paths or links: those go in the proof'],
        ['Also held to it', 'each fix’s change, and its effect']], stamp: ['A machine word in them refuses the answer', 'block'] },
      vcap: 'C2’s summary of Nov 1 passed: “Google’s lead count is true from Oct 1 and campaigns may be judged on it … so judge Meta on clicks, landing page views and GA4 leads.”' },

    { about: ['tsshape'], kicker: 'The shape of an answer',
      head: 'An answer needs its proof, and a problem needs its fix',
      visual: { type: 'gate', rows: [
        ['A summary', 'one or two plain sentences', 'pass'],
        ['Proof', 'each fact with its source', 'pass'],
        ['What would prove it wrong', 'the next brief tests it first', 'pass'],
        ['A problem names its fix', 'at least one change, with what it waits on', 'pass'],
        ['Each fix: what, why and its effect', 'what it should do, the number that will show it, and when', 'pass'],
        ['Ask a person', 'who, and what to ask them', 'pass']] },
      vcap: 'C2’s fixes of Nov 1 name no effect: they saved before that rule. Today the save would refuse them. The rule that a problem names its fix came from Bull’s bid answer of Nov 1, which found a problem and proposed nothing.' },

    { about: ['tsrun'], kicker: 'The check run',
      head: 'Each failure and question of the run needs an answer by its line',
      visual: { type: 'gate', rows: [
        ['The newest run, under {runHours} hours old', 'and the answer names it', 'pass'],
        ['Each failure: no, as it stands', 'with its fix or its case', 'pass'],
        ['Each question: yes or no', 'by what its yes and no mean', 'pass'],
        ['No yes on a failure', 'only the verifiers’ next run passes it', 'stop'],
        ['No good verdict while a failure stands', 'the answer is a problem, too few to tell, or ask', 'stop']] },
      vcap: 'Opus may hold a check wrong: then it logs a verifier miss. The check never passes here. On a line Will approved, Jev reads Opus’s answer too, and his yes or no must be the same.' },
    { about: ['tsrun'], kicker: 'Today',
      head: 'No tracking run has reached Barbara, so today no answer is held to one',
      visual: { type: 'flow', rows: [
        { title: 'Today', steps: [['No check run in Barbara yet', 'its copy of Nov 6', 'code'], ['The answer saves as before', 'held to no run', 'code']], end: [['Bull, Kogalla and C2, Nov 1', 'saved this way', 'keep']] },
        { title: 'After the first run reaches Barbara', steps: [['Each answer names its run', '', 'code'], ['Each line answered', '', 'code']], end: [['Jev reads each line Will approved', 'none in the tracking trees yet', 'code']] }] },
      vcap: 'The rule is built, and its tests use C2’s real check run of Nov 1. It starts with the first run that reaches Barbara.' },

    { about: ['tsquotes'], kicker: 'Quotes at their source',
      head: 'Each quote must be at its source, in whole sentences',
      visual: { type: 'gate', rows: [
        ['A mail', 'by its Gmail id and its mailbox: whole sentences, never a cut one', 'pass'],
        ['A call', 'by its recording id: the words are in the transcript', 'pass'],
        ['A reply on a case', 'by its number: the reply itself, whole at any length', 'pass'],
        ['A text', 'Barbara cannot read texts: it saves as not checked, with why', 'wait']] },
      vcap: 'Bull’s answer of Nov 1 quoted 8 sentences of mail, and code found each one at its source. The rule came from KDX: a strategy draft of Oct 31 cut a sentence of the client’s mail.',
      quote: ['ok I like that. I think that will help.', 'Nov 1'] },

    { about: ['tsfix'], kicker: 'Each fix, read by Jev',
      head: 'Jev reads each fix once: could the manager act on it as written?',
      visual: { type: 'card', title: 'One fix of C2’s answer, Nov 1', fields: [
        ['What', 'Publish the staged Tag Manager version: pause one Meta Lead tag, and fire the other only on the sent form, with the lead id as its event id.'],
        ['Why', 'Two tags send Lead on every submit attempt, and the live Meta ad set optimizes on Lead.'],
        ['At stake', 'A true Meta lead count, and what the live campaign learns from, at about $33 a day.'],
        ['Its case', '#58, which waits on Will']], stamp: ['A clear no from Jev refuses it. Not sure, or no answer, lets it save.', 'code'] },
      vcap: 'Jev reads where, from and to, the evidence, and the number that will show the effect. A judge that fails never refuses a fix.' },

    { about: ['tssaved'], kicker: 'Saved, then marked',
      head: 'A saved answer is the module’s memory, and Will marks it Right or Wrong',
      visual: { type: 'flow', rows: [{ steps: [['Saved', 'C2, Nov 1, 3:33 AM', 'keep'], ['The campaign modules read its summary', 'for {freshDays} days', 'opus'], ['Will marks it', 'Right or Wrong, with a note', 'will']], end: [['The next brief shows his mark', '', 'code']] }] },
      vcap: 'A second mark replaces the first. A refusal saves nothing, so the last answer stays as it was.' }
  ],

  examples: {
    IN: { tag: 'real', rows: [{ steps: [['C2’s Tracking answer', 'a problem, 25 facts, 4 fixes, 6 checks', 'opus']], end: [['To the save', 'Nov 1, 3:33 AM', 'code']] }], note: 'Barbara’s saved answer, read whole on Nov 7.' },
    W: { tag: 'real', rows: [{ steps: [['C2’s summary', 'two sentences, no ids or links', 'opus'], ['Plain words?', 'yes', 'code']], end: [['On to the shape', '', 'code']] }], note: 'C2, Nov 1.' },
    S: { tag: 'made', rows: [{ steps: [['C2’s 4 fixes', 'none names its effect', 'opus'], ['Each fix with its effect?', 'no', 'code']], end: [['Refused today: each fix needs its effect', '', 'block']] }], note: 'Made from a real answer: C2’s fixes saved on Nov 1, before the effect rule. Today the shape check refuses them.' },
    P: { tag: 'real', rows: [{ steps: [['Bull, Kogalla and C2, Nov 1', '', 'opus'], ['Has a check run reached Barbara?', 'no', 'code']], end: [['Held to no run: on to the quotes', '', 'code']] }], note: 'Barbara’s copy of Nov 6 holds no check run yet.' },
    R: { tag: 'made', rows: [{ steps: [['An answer names an older run', 'not the newest of the module', 'opus'], ['The newest run, named?', 'no', 'code']], end: [['Refused: answer the newest run', '', 'block']] }], note: 'Made up: no run has reached Barbara yet.' },
    L: { tag: 'made', rows: [{ steps: [['C2’s run: each lead counted once? failed', '', 'will'], ['The answer says yes to it', 'it marks the failure passed', 'opus']], end: [['Refused: a failure stands until the next run passes it', '', 'block']] }], note: 'Made up from the save’s own test on C2’s run of Nov 1.' },
    G: { tag: 'made', rows: [{ steps: [['The run holds a failure', '', 'will'], ['The verdict is good', '', 'opus']], end: [['Refused: make it a problem, too few to tell, or ask', '', 'block']] }], note: 'Made up from the save’s own test.' },
    Q: { tag: 'real', rows: [{ steps: [['Bull’s 8 quotes', 'each a whole sentence of mail', 'opus'], ['Found at their source?', 'yes, all 8', 'code']], end: [['Each one saves as checked', '', 'keep']] }], note: 'Bull’s Tracking answer of Nov 1.' },
    H: { tag: 'real', rows: [{ steps: [['The tracking trees', 'no Jev line approved', 'will'], ['Jev on approved lines', 'nothing to read', 'code']], end: [['On to the fixes', '', 'code']] }], note: 'The audit’s, Meta’s and Microsoft’s trees, Nov 7.' },
    J: { tag: 'made', rows: [{ steps: [['A fix: “Clean up the tracking”', 'no place, no from and to', 'opus'], ['Could a person act on it?', 'Jev: a clear no', 'code']], end: [['Refused: name the change, the evidence and the effect', '', 'block']] }], note: 'Made up: no refused fix of a Tracking answer is on record.' },
    SAVED: { tag: 'real', rows: [{ steps: [['C2’s answer', 'every rule of that day passed', 'code']], end: [['Saved: Tracking on the whole account, a problem', 'Nov 1, 3:33 AM', 'keep']] }], note: 'Its campaign modules read it the same morning.' },
    REF: { tag: 'made', rows: [{ steps: [['An answer with a cut quote', 'half a sentence of a mail', 'opus'], ['Found whole at its source?', 'no', 'code']], end: [['Refused: the quote, its source and the whole sentence', 'nothing saved', 'block']] }], note: 'Made up for Tracking. The rule came from KDX’s strategy draft of Oct 31.' }
  },

  reviewed: { self: '00fa454f', above: 'd4e50d2f', on: '2026-11-07' }
});
