// Safety checks: what every negative passes before it goes live. The rules are negatives.rs.
// Will, 2026-11-06: a case should come as a reasoned question for the client ("would you do marketing for a
// symphony? And that's what we'd send to the client"): built Nov 7 in the new project (questions.rs). Will, Nov 7: no
// routing ("Judge each campaign on itself"): every negative is a block on its own campaign; the home check left.
// Will, Nov 7: "Don't say have another AI check. That's dumb.", then "1": Jev's checks came out, the second judge of a
// block's negative with them (negatives::second_judge). Every negative still waits for Will's approval on its case, and
// the code checks stay. Jev keeps the question check (0.50, Will's line of Nov 7) and the check of phrase and broad
// negatives (0.35, wide.rs; in ~/Projects/search-terms no Jev is wired to it, so each such negative waits for Will).
LOGIC.flow({
  id: 'safety', parent: 'waterfall',
  title: 'Safety checks',
  head: 'Every negative passes the same checks',
  chart: [
    'flowchart TB',
    'V["A block, no live<br/>negative yet"]:::code',
    'Q0{"On a case<br/>already?"}:::code',
    'OW(["On its way"]):::keep',
    'W1{"Over the limits,<br/>bought, or<br/>a keyword?"}:::will',
    'WAIT["Waits for<br/>a person"]:::will',
    'SEND["Ready: an exact<br/>negative on the campaign"]:::block',
    'NEEDS{"Does the call rest<br/>on what the<br/>client sells?"}:::code',
    'SETTLED{"Do the client\'s<br/>own words<br/>settle it?"}:::opus',
    'ASK["A reasoned question<br/>for the client"]:::opus',
    'ANS{"The client\'s<br/>answer"}:::will',
    'KEPT(["Kept, no<br/>negative"]):::keep',
    'WILL{"Change check,<br/>Will approves?"}:::will',
    'GO(["Live"]):::block',
    'V --> Q0', 'Q0 -- yes --> OW', 'Q0 -- no --> W1', 'W1 -- no --> SEND', 'W1 -- yes --> WAIT',
    'SEND --> NEEDS', 'NEEDS -- no --> WILL', 'NEEDS -- yes --> SETTLED', 'SETTLED -- yes --> WILL', 'SETTLED -- no --> ASK', 'ASK --> ANS', 'ANS -- "no, we do not" --> WILL', 'ANS -- "yes, we do" --> KEPT',
    'WAIT --> WILL', 'WILL -- yes --> GO'
  ],
  links: { W1: 'limits', NEEDS: 'needwords', SETTLED: 'settled', ASK: 'clientq', WILL: 'changecheck' },
  leaves: {
    limits: 'Over the limits, bought, or a keyword?',
    needwords: 'Does the call rest on what the client sells?',
    settled: 'Do the client’s own words settle it?',
    clientq: 'A question for the client',
    changecheck: 'Change check, Will approves?'
  },

  // Each slide belongs to one view: the part's own slides first, then one or more for each box.
  deck: [
    { about: ['safety'], kicker: 'Why',
      head: 'A bad negative kills sales, and nobody sees it',
      visual: { type: 'flow', rows: [{ steps: [['A buyer searches', '', 'keep'], ['A wrong negative blocks the ad', '', 'block'], ['No click, no sale', '', 'code']], end: [['The report shows nothing missing', '', 'next']] }] },
      vcap: 'So every negative passes the same checks.',
      quote: ['bad negitives are one of the biggest things that kill us', 'the design'] },
    { about: ['safety'], kicker: 'One campaign at a time · Will, Nov 7',
      head: 'Every negative is a block on its own campaign, and no check reads another campaign',
      visual: { type: 'flow', rows: [{ steps: [['symphony distribution', 'on LA + New York', 'code'], ['Not for this campaign', '', 'block']], end: [['An exact negative on LA + New York', 'only there', 'block']] }] },
      vcap: 'Nothing checks if another campaign shows an ad for a search that this campaign blocks.',
      quote: ["I also don't want to do any routing. Judge each campaign on itself and stop trying to think of the rest.", 'Nov 7'] },
    { about: ['safety'], kicker: 'The checks, in order',
      head: 'Each check can hold a negative for a person',
      visual: { type: 'gate', rows: [
        ['On a case already?', 'Yes: it is already on its way.', 'pass'],
        ['Over the limits, bought, or a keyword?', 'Over {maxChars} characters or {maxWords} words, a sale in {boughtDays} days, or a keyword here: it waits.', 'pass'],
        ['Change check, and Will approves', 'No converting search lost, no keyword stopped.', 'pass']], end: ['Live', 'block'] },
      vcap: 'Built Nov 7: no check sends a search to another campaign (Will, Nov 7: judge each campaign on itself). Since Nov 7 no second judge reads a block either, so the code checks and Will decide.' },
    { about: ['safety'], kicker: 'No second judge · Will, Nov 7',
      head: 'No AI reads a block a second time now, so code checks it and Will approves it',
      visual: { type: 'flow', rows: [
        { title: 'Until Nov 7', steps: [['26 of C2’s blocks', 'on a copy of its record', 'block'], ['Jev’s second look', 'it held 20 of them for a person', 'will']], end: [['Most blocks waited', '', 'will']] },
        { title: 'Now', steps: [['A block', 'Opus’s call', 'block'], ['The code checks', 'the limits, a sale, a keyword of this campaign', 'will']], end: [['Will approves it on the case', '', 'will']] }] },
      vcap: 'Jev read each block before its negative was ready, and on ADI it held 4 of 25. Will took it out with Jev’s other checks. Jev keeps two jobs elsewhere. It refuses a question for the client when its chance that the client’s words already answer it is {qline} or more. It holds a phrase or broad negative when its chance that a search with those words is a customer is over {wideMax}. The module’s project has no Jev wired to that second job yet, so each phrase or broad negative waits for Will.' },

    { about: ['limits'], kicker: 'Over the limits, bought, or a keyword?',
      head: 'Three things make a negative wait for a person',
      visual: { type: 'gate', rows: [
        ['Over {maxChars} characters or {maxWords} words', 'Google takes no longer negative, and the module never rewrites one', 'hold'],
        ['A sale in the last {boughtDays} days', 'the words say no, the account says it bought: a person decides if it was a lead', 'hold'],
        ['A keyword of this campaign', 'the negative would stop the keyword: pause the keyword instead, or keep the search', 'hold']], end: ['Any one: it waits for a person', 'will'] },
      vcap: 'Will’s own verdict on a search that bought settles it.' },
    { about: ['needwords'], kicker: 'Which negatives · built Nov 7',
      head: 'Only a call about what the client sells, or where it works, needs the client’s words',
      visual: { type: 'gate', rows: [
        ['A service the client does not sell', 'the client’s words decide', 'pass'],
        ['A place the client does not serve', 'the client’s words decide', 'pass'],
        ['A job search', 'no answer changes it: on to Will', 'stop'],
        ['A do-it-yourself search', 'no answer changes it: on to Will', 'stop'],
        ['Another company’s name', 'no answer changes it: on to Will', 'stop']], end: ['The client’s words can help', 'opus'] },
      vcap: 'Code reads the intent of the call. A job seeker is not a customer, whatever the client sells, so a question would not change the call. Claude’s call, built Nov 7.' },
    { about: ['settled'], kicker: 'Who decides · built Nov 7',
      head: 'Opus decides if the client’s words settle a search, because Jev cannot',
      visual: { type: 'bars', max: 1, rows: [
        { label: 'symphony distribution: not settled (Will’s example)', parts: [[0.99, 'opus', '0.99']] },
        { label: 'song pluggers: not settled', parts: [[0.70, 'opus', '0.70']] },
        { label: 'classical music pr agency: not settled', parts: [[0.08, 'opus', '0.08']] },
        { label: 'music managers nyc: settled', parts: [[0.97, 'code', '0.97']] },
        { label: 'soundon app: settled', parts: [[0.99, 'code', '0.99']] }] },
      vcap: 'Jev’s chance that C2’s words settle each search, Nov 7. Jev reads “symphony distribution” as music distribution, a line C2 has, so no line separates it from the settled ones. So Opus decides, in a subagent, with Will’s rule: a line settles a search only when it covers what the search asks for and who would search it. Jev and Opus also read it as the name of the distributor Symphonic Distribution; the build keeps Will’s reading.' },
    { about: ['clientq'], kicker: 'A question for the client · built Nov 7',
      head: 'Each ready negative becomes a question the client can answer in one line',
      visual: { type: 'flow', rows: [
        { title: 'The question', steps: [['symphony distribution', 'a block, Nov 6', 'block'], ['Why', 'not a customer, and not for this campaign', 'code'], ['The question', '“Would you do marketing for a symphony?”', 'next']], end: [['Will sends it to the client', '', 'will']] },
        { title: 'The answer', steps: [['“No, we do not”', '', 'code'], ['It goes in the service list', 'with the client’s words', 'opus']], end: [['The negative goes on, after Will approves', '', 'block']] }] },
      vcap: 'Will, Nov 6: only negatives that the client’s own words do not settle yet get a question. A “yes, we do” keeps the search, and also goes in the service list. Either way, the same question is never asked twice. Built Nov 7: the negative waits while the question is open.',
      quote: ["I want things that come through as a case to come through as a question that's reasoned, right? So like the question for symphony distribution would be, would you do marketing for a symphony? And that's what we'd send to the client.", 'Nov 6'] },
    { about: ['clientq'], kicker: 'The question check · Will set the line, Nov 7',
      head: 'Jev refuses a question the client already answered, or that an open question asks',
      visual: { type: 'scale', label: 'Jev: the chance that the client’s words or an open question already answer it',
        lines: [['{qline}', 'the line: {qline}', 'will']],
        dots: [[0.06, 'new: the lowest', 'keep'], [0.42, 'new: the highest, booking shows', 'keep'], [0.53, 'answered: the lowest, hip-hop', 'block'], [0.99, 'answered: the highest', 'block'], [0.73, 'asked already: the lowest', 'block'], [0.86, 'asked already: the highest', 'block'], [0.53, 'ADI, first try', 'block'], [0.24, 'ADI, second try', 'keep']],
        zones: [[0, '{qline}', 'A new question: on to Will', 'keep'], ['{qline}', 1, 'Refused: Opus writes another', 'block']] },
      vcap: '18 questions on C2’s 32 lines, four asks each: the 9 new ones scored 0.06 to 0.42, the 7 the client answered 0.53 to 0.99, and the 2 asked already 0.73 to 0.86. None crossed {qline} on any ask. Will set {qline} on Nov 7. On ADI, Nov 7, Jev refused “Does ADI sell any pumps that move liquids, such as water, liquid chemicals or slurry?” at 0.53: ADI’s words already rule out pumps that are not diaphragm pumps. Opus asked again, only about liquids, and it passed at 0.24.' },
    { about: ['changecheck'], kicker: 'The last step',
      head: 'Nothing goes live without Will',
      visual: { type: 'flow', rows: [{ steps: [['2 ready negatives', 'Nov 6 run', 'block'], ['The change check', 'no converting search lost, no keyword stopped', 'will'], ['A case', 'each negative and why', 'code'], ['Will approves', '', 'will']], end: [['Live', '', 'block']] }] },
      vcap: '“dawn miller pr” waited for Will, and he kept it blocked (Nov 6). A negative always goes on the campaign, also when the call named one ad group (Will, Nov 6).' }
  ],

  examples: {
    V: { tag: 'real', rows: [{ steps: [['symphony distribution', 'a block, Nov 6', 'block'], ['No live negative yet', '', 'code']], end: [['The checks start', '', 'will']] }], note: 'C2, Nov 6.' },
    Q0: { tag: 'made', rows: [{ steps: [['A block already on a case', '', 'code'], ['On a case already?', 'yes', 'code']], end: [['On its way', 'no second case', 'keep']] }], note: 'This check stops the same negative from going on two cases.' },
    OW: 'Q0',
    W1: { tag: 'made', rows: [{ steps: [['A search of 11 words', '', 'code'], ['Over the limits?', 'more than {maxWords} words: yes', 'will']], end: [['Waits for a person', '', 'will']] }], note: 'The same happens for a sale in the last {boughtDays} days, or a keyword of this campaign.' },
    WAIT: { tag: 'made', rows: [{ steps: [['A block on a search that bought', 'a sale in the last {boughtDays} days', 'block'], ['Waits for a person', '', 'will']], end: [['Will decides', 'on the case', 'will']] }], note: 'A search also waits when it is over the limits, or is a keyword here.' },
    SEND: { tag: 'real', rows: [{ steps: [['anotherland label', 'Opus’s block', 'block'], ['Ready', 'an exact negative', 'block']], end: [['Next: does the call rest on what the client sells?', '', 'code']] }], note: 'C2’s data, in the code’s test of Nov 7 with no second judge: the block’s exact negative went on Will’s case.' },
    NEEDS: { tag: 'real', rows: [{ steps: [['symphony distribution', 'a block, Nov 6: a service C2 does not sell', 'block'], ['Does the call rest on what the client sells?', 'yes', 'code']], end: [['Do the client’s own words settle it?', '', 'opus']] }], note: 'C2, Nov 6.' },
    SETTLED: { tag: 'real', rows: [{ title: 'Not settled', steps: [['symphony distribution', 'no line about symphonies', 'code'], ['Do their own words settle it?', 'no: Opus decides', 'opus']], end: [['A question for the client', '', 'opus']] }], note: 'Nov 7: a subagent on a copy of C2’s record. The settled path has no real case yet: a “does not sell” line sends the negative on to Will, with the client’s words.' },
    ASK: { tag: 'real', rows: [{ steps: [['symphony distribution', 'not settled', 'opus'], ['A reasoned question', '“Would you do marketing for a symphony?”', 'opus'], ['The question check', 'Jev: 0.15, a new question', 'code']], end: [['Will sends it to the client', 'the negative waits', 'will']] }], note: 'Nov 7: the real binary on a copy of C2’s record. The question is Will’s own example, Nov 6.' },
    ANS: { tag: 'made', rows: [
      { title: 'No', steps: [['“No, we only work with artists.”', 'a made answer', 'code'], ['It goes in the service list', 'in the client’s words', 'opus']], end: [['The negative goes on a case for Will', 'with the client’s words', 'block']] },
      { title: 'Yes', steps: [['“Yes, we do”', '', 'code'], ['It goes in the service list', '', 'opus']], end: [['Kept, no negative', '', 'keep']] }], note: 'Made: no client has answered yet. On a copy of C2’s record, a made “no” put the negative on a case.' },
    KEPT: 'ANS',
    WILL: { tag: 'real', rows: [{ steps: [['2 ready negatives', '', 'block'], ['The change check', 'no converting search lost, no keyword stopped', 'will']], end: [['Will approves the case', 'then they go live', 'will']] }], note: 'Nothing goes live before Will approves.' },
    GO: 'WILL'
  },

  reviewed: { self: 'f3b14534', above: '6182870e', on: '2026-11-07' }
});
