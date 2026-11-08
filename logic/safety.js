// Safety checks: what every negative passes before it goes live. The rules are negatives.rs.
// Will, 2026-11-06: a case should come as a reasoned question for the client ("would you do marketing for a
// symphony? And that's what we'd send to the client"): built Nov 7 in the new project (questions.rs). Will, Nov 7: no
// routing ("Judge each campaign on itself"): every negative is a block on its own campaign; the home check left.
// Will, Nov 7: "Don't say have another AI check. That's dumb.", then "1": Jev's checks came out, the second judge of a
// block's negative with them (negatives::second_judge). The code checks stay. Jev keeps the question check (0.50, Will's
// line of Nov 7) and the check of phrase and broad negatives (0.35, wide.rs; in ~/Projects/search-terms no Jev is wired
// to it, so each such negative waits for Will).
// Will, Nov 8: "Why do the negatives need my check? Can't the system take care of it based off all the context?", then
// "Go with 1: Turn on auto-send for exact negatives that pass every code check." So an exact negative that passes every
// code check goes out by itself (AUTO), with a daily list and an undo for Will; an unclear call, a negative a check
// stops, a phrase or broad negative, and every negative of a client Will holds still come to him. Built: the code checks
// (negatives.rs waits_for, the limits and the Performance Max room; questions.rs) and the list of ready negatives (the
// change file and Chad's input). Not built: the send, its daily list and its undo (a program cannot write through
// Barbara, so the daily run's session sends), and a code check of the card's never-negate words (PROT; cards.rs shows
// them to the judge only). The hold is Barbara's (comm-chat src/chat/tools/run_hold.rs: a run's change on a held client
// waits unless Will approved its case). Real case: ADI, Nov 8, held (state/search-terms/adi/2026-11-08/ADI/
// negatives-change.json, the log's "send=4 waits=2 need=23"): of 46 blocks, 4 ready, 2 bought, 23 wait for the
// client's words, 17 blocked by a live negative.
LOGIC.flow({
  id: 'safety', parent: 'waterfall',
  title: 'Safety checks',
  head: 'Every negative passes the same checks',
  chart: [
    'flowchart TB',
    'V["A block, no live<br/>negative yet"]:::code',
    'Q0{"On a case<br/>already?"}:::code',
    'OW(["On its way"]):::keep',
    'W1{"Bought, a keyword,<br/>over Google\'s limits,<br/>or a feed product?"}:::will',
    'PROT{"Not built: does it<br/>block a word the<br/>card protects?"}:::next',
    'WAIT["Waits for Will<br/>on a case"]:::will',
    'SEND["Ready: an exact<br/>negative on the campaign"]:::block',
    'NEEDS{"Does the call rest<br/>on what the<br/>client sells?"}:::code',
    'SETTLED{"Do the client\'s<br/>own words<br/>settle it?"}:::opus',
    'ASK["A reasoned question<br/>for the client"]:::opus',
    'ANS{"The client\'s<br/>answer"}:::will',
    'KEPT(["Kept, no<br/>negative"]):::keep',
    'HELD{"Does Will hold<br/>this client?"}:::code',
    'WILL{"Change check,<br/>Will approves?"}:::will',
    'AUTO["Not built: the change<br/>check, then it goes<br/>out by itself, on<br/>Will\'s daily list"]:::next',
    'GO(["Live"]):::block',
    'V --> Q0', 'Q0 -- yes --> OW', 'Q0 -- no --> W1', 'W1 -- yes --> WAIT', 'W1 -- no --> PROT', 'PROT -- yes --> WAIT', 'PROT -- no --> SEND',
    'SEND --> NEEDS', 'NEEDS -- no --> HELD', 'NEEDS -- yes --> SETTLED', 'SETTLED -- yes --> HELD', 'SETTLED -- no --> ASK', 'ASK --> ANS', 'ANS -- "no, we do not" --> HELD', 'ANS -- "yes, we do" --> KEPT',
    'HELD -- yes --> WILL', 'HELD -- no --> AUTO', 'WAIT --> WILL', 'WILL -- yes --> GO', 'AUTO --> GO'
  ],
  links: { W1: 'limits', PROT: 'protect', NEEDS: 'needwords', SETTLED: 'settled', ASK: 'clientq', HELD: 'held', WILL: 'changecheck', AUTO: 'autosend' },
  leaves: {
    limits: 'Bought, a keyword, over Google’s limits, or a feed product?',
    protect: 'A word the card protects',
    needwords: 'Does the call rest on what the client sells?',
    settled: 'Do the client’s own words settle it?',
    clientq: 'A question for the client',
    held: 'A client Will holds',
    changecheck: 'Change check, Will approves?',
    autosend: 'It goes out by itself'
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
    { about: ['safety'], kicker: 'Will’s choice · Nov 8',
      head: 'An exact negative that passes every code check will go out by itself, and Will still sees the rest',
      visual: { type: 'gate', rows: [
        ['An exact negative that passes every code check', 'it goes out by itself, and Will gets a daily list of them with an undo', 'pass'],
        ['A negative a code check stops', 'such as one that bought, because Will decides if those were real leads', 'hold'],
        ['A phrase or broad negative', 'it blocks every search with its words, so it still comes to Will', 'hold'],
        ['An unclear call', 'Opus could not tell, so Will decides', 'hold'],
        ['Every negative of a client Will holds', 'its cases say “Everything waits for you”', 'hold']], end: ['The send, its daily list and its undo are not built yet', 'next'] },
      vcap: 'Will asked why the negatives need his check, when the system has all the context. The code checks and the list of ready negatives are built, but the send is not. So until it is built, every negative still waits for Will on a case.',
      quote: ["Why do the negatives need my check? Can't the system take care of it based off all the context?", 'Nov 8'] },
    { about: ['safety'], kicker: 'No second judge · Will, Nov 7',
      head: 'No AI reads a block a second time now, so only code checks it',
      visual: { type: 'flow', rows: [
        { title: 'Until Nov 7', steps: [['26 of C2’s blocks', 'on a copy of its record', 'block'], ['Jev’s second look', 'it held 20 of them for a person', 'will']], end: [['Most blocks waited', '', 'will']] },
        { title: 'Now', steps: [['A block', 'Opus’s call', 'block'], ['The code checks', 'a sale, a keyword, the limits, the feed and the client’s words', 'will']], end: [['It passes them all, or it waits for Will', '', 'will']] }] },
      vcap: 'Jev read each block before its negative was ready, and on ADI it held 4 of 25. Will took it out with Jev’s other checks. Jev keeps two jobs elsewhere. It refuses a question for the client when its chance that the client’s words already answer it is {qline} or more. It holds a phrase or broad negative when its chance that a search with those words is a customer is over {wideMax}. The module’s project has no Jev wired to that second job yet, so each phrase or broad negative waits for Will.' },

    { about: ['limits'], kicker: 'Bought, a keyword, over the limits, or a feed product?',
      head: 'Five checks in code can make a negative wait for Will',
      visual: { type: 'gate', rows: [
        ['A sale in the last {boughtDays} days', 'the words say no, but the account says it bought, so Will decides if it was a real lead', 'hold'],
        ['A live keyword of this campaign', 'the negative would stop the keyword, so pause the keyword instead, or keep the search', 'hold'],
        ['Over {maxChars} characters or {maxWords} words', 'Google takes no longer negative, and the module never rewrites one', 'hold'],
        ['A product of the feed, on a Shopping or Performance Max campaign', 'its negative would stop that product’s ad for the search', 'hold'],
        ['Past 10,000 negatives on a Performance Max campaign', 'Google takes no more, so Will makes room first, or picks which go', 'hold']], end: ['Any one, and it waits for Will', 'will'] },
      vcap: 'Will’s own verdict on a search that bought settles it. On ADI, Nov 8, “vacuubrand md 1c” and “dp 10bst” wait, because each one had a single click, and that click bought.' },
    { about: ['protect'], kicker: 'Not built yet',
      head: 'A negative must not block a word its campaign’s card protects, but no code checks that yet',
      visual: { type: 'flow', rows: [
        { title: 'Today', steps: [['The card’s protected words', 'NA US EN protects “diaphragm pump”', 'opus'], ['Only Opus reads them', 'in the card, before it judges', 'opus']], end: [['No code checks a negative against them', '', 'next']] },
        { title: 'Once the check is built', steps: [['varian diaphragm pump', 'ADI, Nov 8, a competitor', 'block'], ['Is the negative itself a protected word or phrase?', 'no, so “diaphragm pump” stays open', 'next']], end: [['It passes', 'Claude’s call', 'next']] }] },
      vcap: 'Each card lists the words its campaign must keep, its core keywords and its brand. An exact negative blocks only its own search, so Claude’s call is that the check stops one only when the negative is a protected word or phrase itself. A phrase or broad negative blocks every search with its words, so it already comes to Will.' },
    { about: ['needwords'], kicker: 'Which negatives · built Nov 7',
      head: 'Only a call about what the client sells, or where it works, needs the client’s words',
      visual: { type: 'gate', rows: [
        ['A service the client does not sell', 'the client’s words decide', 'pass'],
        ['A place the client does not serve', 'the client’s words decide', 'pass'],
        ['A job search', 'no answer changes it, so it goes on without them', 'stop'],
        ['A do-it-yourself search', 'no answer changes it, so it goes on without them', 'stop'],
        ['Another company’s name', 'no answer changes it, so it goes on without them', 'stop']], end: ['The client’s words can help', 'opus'] },
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
        { title: 'The answer', steps: [['“No, we do not”', '', 'code'], ['It goes in the service list', 'with the client’s words', 'opus']], end: [['The negative is ready again', '', 'block']] }] },
      vcap: 'Will, Nov 6: only negatives that the client’s own words do not settle yet get a question. A “yes, we do” keeps the search, and also goes in the service list. Either way, the same question is never asked twice. Built Nov 7: the negative waits while the question is open.',
      quote: ["I want things that come through as a case to come through as a question that's reasoned, right? So like the question for symphony distribution would be, would you do marketing for a symphony? And that's what we'd send to the client.", 'Nov 6'] },
    { about: ['clientq'], kicker: 'The question check · Will set the line, Nov 7',
      head: 'Jev refuses a question the client already answered, or that an open question asks',
      visual: { type: 'scale', label: 'Jev: the chance that the client’s words or an open question already answer it',
        lines: [['{qline}', 'the line: {qline}', 'will']],
        dots: [[0.06, 'new: the lowest', 'keep'], [0.42, 'new: the highest, booking shows', 'keep'], [0.53, 'answered: the lowest, hip-hop', 'block'], [0.99, 'answered: the highest', 'block'], [0.73, 'asked already: the lowest', 'block'], [0.86, 'asked already: the highest', 'block'], [0.53, 'ADI, first try', 'block'], [0.24, 'ADI, second try', 'keep']],
        zones: [[0, '{qline}', 'A new question: on to Will', 'keep'], ['{qline}', 1, 'Refused: Opus writes another', 'block']] },
      vcap: '18 questions on C2’s 32 lines, four asks each: the 9 new ones scored 0.06 to 0.42, the 7 the client answered 0.53 to 0.99, and the 2 asked already 0.73 to 0.86. None crossed {qline} on any ask. Will set {qline} on Nov 7. On ADI, Nov 7, Jev refused “Does ADI sell any pumps that move liquids, such as water, liquid chemicals or slurry?” at 0.53: ADI’s words already rule out pumps that are not diaphragm pumps. Opus asked again, only about liquids, and it passed at 0.24.' },
    { about: ['held'], kicker: 'A client Will holds · built in Barbara',
      head: 'When Will holds a client, every negative waits for him, even one that passes every check',
      visual: { type: 'flow', rows: [{ title: 'ADI, Nov 8', steps: [['4 ready negatives', 'three KNF searches and “varian diaphragm pump”', 'block'], ['Does Will hold ADI?', 'yes, “Will has set everything on LS ADI to wait”', 'code']], end: [['They wait for Will on a case', 'nothing went out', 'will']] }] },
      vcap: 'Will holds a client when he sets its cases to “Everything waits for you”. Barbara checks that on each change a run makes, so a run’s change on a held client goes out only with the case Will approved. That check is built, and the send will go through it.' },
    { about: ['changecheck'], kicker: 'What still comes to Will',
      head: 'Will approves a negative that a check stops, and every negative of a client he holds',
      visual: { type: 'flow', rows: [
        { title: 'A check stops it', steps: [['dp 10bst', 'ADI, SA + ES, it bought in the {boughtDays} days', 'block'], ['Will decides', 'was that a real lead?', 'will']], end: [['Live, or kept with no negative', '', 'will']] },
        { title: 'A client Will holds', steps: [['knf nmp830', 'ADI, SA + ES, it passed every check', 'block'], ['The change check, then Will', 'on a case', 'will']], end: [['Live once Will approves', '', 'block']] }] },
      vcap: 'The change check runs first on each one, so no converting search is lost and no keyword is stopped. On Nov 6, when every negative waited for Will, he kept “dawn miller pr” blocked. A negative always goes on the campaign, also when the call named one ad group (Will, Nov 6).' },
    { about: ['autosend'], kicker: 'ADI · Nov 8',
      head: 'On ADI, 4 of 46 blocks passed every check, and all 4 are competitors’ names',
      visual: { type: 'dots', groups: [[4, 'block', 'ready to go out, three KNF searches and “varian diaphragm pump”'], [2, 'will', 'wait for Will, because they bought in the last {boughtDays} days'], [23, 'opus', 'wait for ADI’s own words on pumps for liquids'], [17, 'code', 'need no new negative, because a live negative already blocks them']] },
      vcap: 'The 23 wait for ADI’s answer to one question, “Does ADI also sell diaphragm pumps for liquids?” Will holds ADI, so none of the 4 went out. On a client he does not hold, these 4 would go out by themselves after the change check, and each one would be on Will’s daily list with an undo.' }
  ],

  examples: {
    V: { tag: 'real', rows: [{ steps: [['symphony distribution', 'a block, Nov 6', 'block'], ['No live negative yet', '', 'code']], end: [['The checks start', '', 'will']] }], note: 'C2, Nov 6.' },
    Q0: { tag: 'made', rows: [{ steps: [['A block already on a case', '', 'code'], ['On a case already?', 'yes', 'code']], end: [['On its way', 'no second case', 'keep']] }], note: 'This check stops the same negative from going on two cases.' },
    OW: 'Q0',
    W1: { tag: 'real', rows: [{ steps: [['vacuubrand md 1c', 'ADI, SA BR PT, Nov 8', 'block'], ['Bought, a keyword, over the limits, or a feed product?', 'it bought in the last {boughtDays} days', 'will']], end: [['Waits for Will', '', 'will']] }], note: 'ADI, Nov 8: one click for $13.28, and that click bought. “dp 10bst” waits for the same reason.' },
    PROT: { tag: 'plan', rows: [{ steps: [['varian diaphragm pump', 'ADI, NA US EN, Nov 8', 'block'], ['Does it block a word the card protects?', 'its card protects “diaphragm pump”', 'next']], end: [['No, it blocks only this one search', 'so it would pass', 'next']] }], note: 'Not built: today only Opus reads the card’s protected words. Claude’s call: the check stops an exact negative only when it is itself a protected word or phrase.' },
    WAIT: { tag: 'real', rows: [{ steps: [['dp 10bst', 'a block on SA + ES that bought', 'block'], ['Waits for Will', 'he decides if it was a real lead', 'will']], end: [['Will decides on the case', '', 'will']] }], note: 'ADI, Nov 8. A search also waits when it is a live keyword here, is over Google’s limits, or names a product of the feed.' },
    SEND: { tag: 'real', rows: [{ steps: [['anotherland label', 'Opus’s block', 'block'], ['Ready', 'an exact negative', 'block']], end: [['Next: does the call rest on what the client sells?', '', 'code']] }], note: 'C2’s data, in the code’s test of Nov 7 with no second judge: the block’s exact negative went on Will’s case.' },
    NEEDS: { tag: 'real', rows: [{ steps: [['symphony distribution', 'a block, Nov 6: a service C2 does not sell', 'block'], ['Does the call rest on what the client sells?', 'yes', 'code']], end: [['Do the client’s own words settle it?', '', 'opus']] }], note: 'C2, Nov 6.' },
    SETTLED: { tag: 'real', rows: [{ title: 'Not settled', steps: [['symphony distribution', 'no line about symphonies', 'code'], ['Do their own words settle it?', 'no: Opus decides', 'opus']], end: [['A question for the client', '', 'opus']] }], note: 'Nov 7: a subagent on a copy of C2’s record. The settled path has no real case yet: a “does not sell” line sends the negative on, with the client’s words.' },
    ASK: { tag: 'real', rows: [{ steps: [['symphony distribution', 'not settled', 'opus'], ['A reasoned question', '“Would you do marketing for a symphony?”', 'opus'], ['The question check', 'Jev: 0.15, a new question', 'code']], end: [['Will sends it to the client', 'the negative waits', 'will']] }], note: 'Nov 7: the real binary on a copy of C2’s record. The question is Will’s own example, Nov 6.' },
    ANS: { tag: 'made', rows: [
      { title: 'No', steps: [['“No, we only work with artists.”', 'a made answer', 'code'], ['It goes in the service list', 'in the client’s words', 'opus']], end: [['The negative is ready again', 'with the client’s words', 'block']] },
      { title: 'Yes', steps: [['“Yes, we do”', '', 'code'], ['It goes in the service list', '', 'opus']], end: [['Kept, no negative', '', 'keep']] }], note: 'Made: no client has answered yet. On a copy of C2’s record, a made “no” put the negative on a case.' },
    KEPT: 'ANS',
    HELD: { tag: 'real', rows: [{ steps: [['knf nmp830', 'ADI, Nov 8, ready', 'block'], ['Does Will hold this client?', 'yes, “Will has set everything on LS ADI to wait”', 'code']], end: [['Waits for Will on a case', 'nothing went out', 'will']] }], note: 'ADI, Nov 8. The other 3 ready negatives wait the same way.' },
    WILL: { tag: 'real', rows: [{ steps: [['2 ready negatives', 'C2, Nov 6', 'block'], ['The change check', 'no converting search lost, no keyword stopped', 'will']], end: [['Will approves the case', 'then they go live', 'will']] }], note: 'C2, Nov 6, when every negative still waited for Will.' },
    AUTO: { tag: 'plan', rows: [{ steps: [['An exact negative that passed every check', 'on a client Will does not hold', 'block'], ['The change check, then it goes out', 'the daily run, with Barbara’s change tool', 'next']], end: [['Live, and on Will’s daily list with an undo', '', 'next']] }], note: 'Not built yet, so no negative has gone out this way.' },
    GO: 'WILL'
  },

  reviewed: { self: 'c770d1a4', above: 'cce35754', on: '2026-11-08' }
});
