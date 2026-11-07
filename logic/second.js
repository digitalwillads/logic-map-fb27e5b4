// The second opinion (Will, 2026-11-07: "Take clef out ... Then let's try adversarial testing. Use openrouter and
// deepseek ... to run it again and when they disagree then send it to opus again. If it still thinks it was right then
// send it as a case."). Opus settles every search the keyword check does not keep; a second model, which never sees
// Opus's call, judges it again. Built on Nov 7 in ~/Projects/search-terms, merged into main, and tested on copies
// of C2's and ADI's records. Model: deepseek/deepseek-v4.1-flash-1017
// on OpenRouter. Will, Nov 7, chose option 1 for a search DeepSeek cannot know, such as a code: on its second look Opus
// may save a fact with its source, Jev checks the source, and DeepSeek judges once more with the fact; only a
// disagreement after that goes to Will. It holds for every disagreement, not only codes.
LOGIC.flow({
  id: 'second', parent: 'waterfall',
  title: 'The second opinion: DeepSeek judges again', short: 'Second opinion',
  head: 'A second model judges each search again, and Will decides only where the two judges still disagree',
  chart: [
    'flowchart TB',
    'IN(["Opus\'s keep or<br/>block, after<br/>Jev\'s checks"]):::opus',
    'DS["DeepSeek reads<br/>what Opus read, never<br/>Opus\'s call"]:::deep',
    'SAME{"The same call?"}:::code',
    'STAND(["The call stands"]):::keep',
    'AGAIN["Opus looks again,<br/>with both calls<br/>and both reasons"]:::opus',
    'NOW{"Does Opus now<br/>give DeepSeek\'s call?"}:::opus',
    'FACT{"Did Opus save<br/>a new fact that<br/>Jev\'s check passes?"}:::will',
    'ASK{"DeepSeek judges<br/>again with the fact:<br/>the same call now?"}:::deep',
    'CASE(["A case for Will,<br/>with both calls and<br/>both reasons"]):::will',
    'WAIT(["No answer from<br/>OpenRouter, so the search<br/>waits for the next run"]):::code',
    'IN --> DS', 'DS --> SAME', 'SAME -- yes --> STAND', 'SAME -- no --> AGAIN', 'AGAIN --> NOW',
    'NOW -- yes --> STAND', 'NOW -- "no: Opus keeps its call,<br/>or gives a third one" --> FACT',
    'FACT -- yes --> ASK', 'FACT -- no --> CASE', 'ASK -- yes --> STAND', 'ASK -- no --> CASE',
    'DS -. "no answer" .-> WAIT'
  ],
  links: { DS: 'blind', SAME: 'differ', AGAIN: 'relook', FACT: 'addfact', ASK: 'askagain', CASE: 'tocase', WAIT: 'nodeep' },
  leaves: {
    blind: 'What DeepSeek reads',
    differ: 'What counts as a disagreement',
    relook: 'Opus looks again',
    addfact: 'Opus saves a fact',
    askagain: 'DeepSeek judges again with the fact',
    tocase: 'A case for Will',
    nodeep: 'No answer from OpenRouter'
  },

  // Each slide belongs to one view: the part's own slides first, then one for each of its rules.
  deck: [
    { about: ['second'], kicker: 'Will’s test · Nov 7',
      head: 'Opus judges first. DeepSeek, which never sees Opus’s call, judges again.',
      visual: { type: 'card', title: 'The judges, in order', fields: [
        ['The keyword check', 'code: a live keyword of the campaign, word for word, is kept with no judge'],
        ['Opus', 'judges every other search, research first'],
        ['Jev', 'checks Opus’s calls and the facts it saves'],
        ['DeepSeek', 'DeepSeek V4.1 Flash 1017, on OpenRouter: judges the search again, blind'],
        ['Will', 'decides only where the two judges still disagree']], stamp: ['Built Nov 7, and tested on copies of two records', 'code'] },
      vcap: 'Two judges from different makers seldom make the same mistake on the same search, so a call they agree on is safer (Claude’s call). DeepSeek costs $0.15 for each million tokens it reads, and $0.60 for each million it writes.',
      quote: ['Use openrouter and deepseek ... to run it again and when they disagree then send it to opus again. If it still thinks it was right then send it as a case.', 'Nov 7'] },
    { about: ['second'], kicker: 'The test · Nov 7',
      head: 'DeepSeek agrees with Opus on 90% of C2’s searches and 81% of ADI’s',
      visual: { type: 'bars', max: 956, rows: [
        { label: 'C2: 698 searches', parts: [[630, 'keep', '630 agree'], [68, 'block', '68 disagree']] },
        { label: 'ADI: 956 searches', parts: [[776, 'keep', '776 agree'], [180, 'block', '180 disagree']] }] },
      vcap: 'On copies of each record: nothing went to Barbara. 58 of ADI’s 180 disagreements are codes, which DeepSeek cannot know. Both clients cost $0.57 together (listed price $1.54). Opus’s second look did not run in the test.' },
    { about: ['second'], kicker: 'Asked twice',
      head: 'Asked twice, DeepSeek gives the same call for 94% of C2’s searches and 91% of ADI’s',
      visual: { type: 'bars', max: 956, rows: [
        { label: 'C2: 698 searches', parts: [[658, 'keep', '658 the same'], [40, 'block', '40 changed']] },
        { label: 'ADI: 956 searches', parts: [[869, 'keep', '869 the same'], [87, 'block', '87 changed']] }] },
      vcap: 'Most changes go between unclear and a firm call. Of the first run’s disagreements, 54 of 68 on C2 and 142 of 180 on ADI came back in the second run. 13 hosts answered, and no host stands out.' },
    { about: ['blind'], kicker: 'What DeepSeek reads',
      head: 'DeepSeek reads what Opus reads, but never Opus’s call',
      visual: { type: 'gate', rows: [
        ['The business, its services and saved facts', 'the same as Opus', 'pass'],
        ['The campaign, its card and its type’s rule', '', 'pass'],
        ['The search’s words', '', 'pass'],
        ['Opus’s call, why and note', 'never', 'stop'],
        ['The account’s other campaigns', 'never: each campaign is judged on its own (Will, Nov 7)', 'stop']], end: ['DeepSeek’s call: keep, block or unclear, and why', 'deep'] },
      vcap: 'One search a request, at temperature 0. It cannot look things up, so it does not guess what a code is: when no saved fact explains a code, it says unclear. In the first test it made up that DD90-11 is a Dia-Vac pump; Opus had found a Davey water pump. Claude’s calls.' },
    { about: ['differ'], kicker: 'Agree or disagree',
      head: 'A different call is a disagreement',
      visual: { type: 'flow', rows: [
        { title: 'They agree', steps: [['Opus: keep', '', 'keep'], ['DeepSeek: keep', '', 'deep']], end: [['The call stands', '', 'keep']] },
        { title: 'They disagree', steps: [['Opus: keep', '', 'keep'], ['DeepSeek: block', '', 'deep']], end: [['Opus looks again', '', 'opus']] },
        { title: 'Not sure', steps: [['Opus: block', '', 'block'], ['DeepSeek: unclear', '', 'deep']], end: [['Opus looks again', '', 'opus']] }] },
      vcap: 'A call is keep, block or unclear (Will, Nov 7: no routing). DeepSeek checks Opus’s keep and block. It does not check Opus’s unclear, which already goes to a person or to a client question, or a call that came from a client’s answer or from Will. Claude’s calls.' },
    { about: ['relook'], kicker: 'The second look',
      head: 'Opus looks again with both calls and both reasons',
      visual: { type: 'card', title: 'What Opus sees the second time', fields: [
        ['The search and its campaign', 'with the same facts as the first time'],
        ['Its own first call', 'and why'],
        ['DeepSeek’s call', 'and why'],
        ['The ask', 'give your call again, with why'],
        ['A fact', 'it may research and save one, with its source and exact words'],
        ['The wording', 'it pushes neither way: not to change the call, and not to keep it']], stamp: ['Built Nov 7; no real second look has run yet', 'code'] },
      vcap: 'If Opus now gives DeepSeek’s call, the two judges agree, and that call stands. If Opus keeps its call, or gives a third one, the next step asks if it saved a new fact. An old route shows as “an old call from when searches were sent to other campaigns”, so Opus reads no other campaign.',
      quote: ['when they disagree then send it to opus again', 'Nov 7'] },
    { about: ['addfact'], kicker: 'A fact · Will, Nov 7',
      head: 'On its second look, Opus may save what it found as a fact, and Jev checks the source',
      visual: { type: 'flow', rows: [{ steps: [['Opus looks again', 'research first', 'opus'], ['A fact, its source, and the source’s exact words', '', 'opus'], ['Jev reads the words against the fact', 'the same check as for every saved fact', 'will']], end: [['Backed: saved, and both judges read it from now on', '', 'keep'], ['Not backed, or no new fact: a case for Will', '', 'will']] }] },
      vcap: 'Built Nov 7, and tested with stand-ins for Jev and OpenRouter. Will chose this on Nov 7, for every disagreement. A saved fact stays, so the same code is explained on the next run too.' },
    { about: ['askagain'], kicker: 'DeepSeek again',
      head: 'With the fact, DeepSeek judges once more. Only a disagreement after that goes to Will.',
      visual: { type: 'flow', rows: [
        { title: 'Now they agree', steps: [['Opus: block', 'and the fact it saved', 'opus'], ['DeepSeek reads the fact: block', '', 'deep']], end: [['The call stands', '', 'keep']] },
        { title: 'Still not the same', steps: [['Opus: block', 'and the fact it saved', 'opus'], ['DeepSeek: keep', '', 'deep']], end: [['A case for Will', 'both calls, both reasons and the fact', 'will']] }] },
      vcap: 'Once only: a search gets one more answer from DeepSeek, never a loop. Built Nov 7.' },
    { about: ['tocase'], kicker: 'A case for Will',
      head: 'Where the two judges still disagree, Will decides, and his answer stands',
      visual: { type: 'flow', rows: [{ steps: [['The judges still disagree', 'no new fact, or DeepSeek still differs after the fact', 'opus'], ['The review list', 'both calls and both reasons', 'code']], end: [['On Will’s case', 'as for a search Jev holds', 'will'], ['His answer stands', 'no run judges it again', 'will']] }] },
      vcap: 'The same case as for a search that Jev holds (Safety checks). In the test, nothing goes to Barbara: Will sees the cases in the terminal first.',
      quote: ['If it still thinks it was right then send it as a case.', 'Nov 7'] },
    { about: ['nodeep'], kicker: 'No answer',
      head: 'If OpenRouter does not answer, the search waits for the next run, not for Will',
      visual: { type: 'flow', rows: [{ steps: [['No key, an error, or an answer that does not read twice', '', 'code'], ['The search is not settled', 'no negative', 'code']], end: [['The next run asks DeepSeek again', '', 'deep']] }] },
      vcap: 'A missing answer never becomes a case for Will. Claude’s call.' }
  ],

  examples: {
    IN: { tag: 'real', rows: [{ steps: [['creative music agency', 'LA + New York, Nov 6', 'code'], ['Opus: keep', '', 'opus']], end: [['DeepSeek: keep too', 'in the test of Nov 7', 'deep']] }], note: 'A real Opus call of the Nov 6 call, and DeepSeek’s real call in the test of Nov 7.' },
    DS: { tag: 'real', rows: [{ steps: [['knf air pump', 'ADI, EUR EU EN', 'code'], ['DeepSeek judges it', 'it never sees Opus’s keep', 'deep']], end: [['Block', '“a rival’s air pump rather than ADI’s Dia-Vac pumps”', 'deep']] }], note: 'From the test of Nov 7, on a copy of ADI’s record.' },
    SAME: { tag: 'real', rows: [{ steps: [['Opus: keep', '“KNF makes diaphragm air and gas pumps like ADI’s”', 'opus'], ['DeepSeek: block', '“a rival’s air pump”', 'deep']], end: [['Not the same: Opus looks again', 'not run in the test', 'opus']] }], note: 'knf air pump, from the test of Nov 7. Opus judged it on Nov 1.' },
    STAND: { tag: 'real', rows: [{ steps: [['pritanmg com', 'Opus: block, Nov 6', 'opus'], ['DeepSeek: block too', 'in the test of Nov 7', 'deep']], end: [['The call stands', 'on to the safety checks', 'keep']] }], note: 'C2. Opus judged it on Nov 6, and DeepSeek agreed in the test of Nov 7.' },
    AGAIN: { tag: 'made', rows: [{ steps: [['Opus’s first call, and why', '', 'opus'], ['DeepSeek’s call, and why', '', 'deep']], end: [['Opus gives its call again', 'with why, and maybe a fact', 'opus']] }], note: 'Built Nov 7. The test wrote its jobs, 68 searches for C2 and 180 for ADI, and did not run them.' },
    NOW: { tag: 'made', rows: [
      { title: 'Opus changes its call', steps: [['Opus now gives DeepSeek’s call', '', 'opus']], end: [['The call stands', '', 'keep']] },
      { title: 'Opus keeps its call', steps: [['Opus gives its first call again', '', 'opus']], end: [['Did it save a new fact?', '', 'will']] }], note: 'Built Nov 7; no real second look has run yet.' },
    FACT: { tag: 'made', rows: [{ steps: [['dd90 11', 'ADI, EUR EU EN', 'code'], ['Opus: block', '“a Davey DynaDrive water pressure pump”', 'opus'], ['DeepSeek: unclear', '“a code or model number that the facts above do not identify”', 'deep']], end: [['Opus saves the fact, with its source', 'Jev checks it', 'will']] }], note: 'The search and both calls are real: Opus on Nov 1, DeepSeek on Nov 7. The fact step is built; this second look did not run.' },
    ASK: { tag: 'made', rows: [{ steps: [['dd90 11', 'with the saved fact', 'code'], ['DeepSeek judges again', '', 'deep']], end: [['Block: the call stands', '', 'keep'], ['Still not the same: a case for Will', '', 'will']] }], note: 'Built Nov 7, and tested with stand-ins on this search.' },
    CASE: { tag: 'made', rows: [{ steps: [['The search and its campaign', '', 'code'], ['Both calls, both reasons', 'Opus’s and DeepSeek’s', 'code']], end: [['Will’s answer stands', '', 'will']] }], note: 'Built Nov 7: the same case as for the searches Jev holds. No real one yet.' },
    WAIT: { tag: 'real', rows: [{ steps: [['9 searches', 'empty answers from OpenRouter', 'code'], ['Not settled', 'no negative', 'code']], end: [['The next run settled all 9', '', 'deep']] }], note: 'From the first test of Nov 7, on copies of the records.' }
  },

  reviewed: { self: '3c3f4f7f', above: 'f9f28543', on: '2026-11-07' }
});
