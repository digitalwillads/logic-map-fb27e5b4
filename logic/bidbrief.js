// What the brief gives the model: comm-chat src/modules/brief/mod.rs `build` (232-266) puts the parts in this order. The
// numbers are numbers.rs `campaign` (371-406, the bids branch 398-403), the reads reads.rs `bids` (77-90), the failed checks
// checks.rs `failed` (109-124), the memory mod.rs `retest_part` and `memory_part` (159-196). From stored tables alone: no
// model, no network. Sources for each box: HANDOFF-bids-client.md.
LOGIC.flow({
  id: 'bidbrief', parent: 'bids',
  title: 'What the brief gives the model', short: 'The brief',
  head: 'Code hands Opus one brief in a fixed order, from stored tables alone',
  chart: [
    'flowchart TB',
    'B1["Its last answer\'s test:<br/>what would prove it wrong"]:::code',
    'B2["The fixed rules and<br/>the answer\'s fields"]:::code',
    'B3["The question, its words,<br/>and Meta\'s method on Meta"]:::code',
    'B4{"Four account answers<br/>fresh?"}:::code',
    'STOP(["WAIT: the brief<br/>ends here"]):::code',
    'G2["Given: each account<br/>answer\'s summary only"]:::code',
    'B5["The campaign: its job, the<br/>targets that hold, open cases"]:::code',
    'B6["The real cost in each period<br/>of each target, {bidWeeks} weeks,<br/>its changes"]:::code',
    'G1["Not given: a<br/>break-even line"]:::code',
    'B7["Reads no table holds:<br/>the simulator and the shares"]:::code',
    'B8["Its failed checks: its own,<br/>then the account\'s"]:::will',
    'B9["Its check command"]:::will',
    'B10["Its last answer, Will\'s mark,<br/>and what is new since"]:::code',
    'B1 --> B2', 'B2 --> B3', 'B3 --> B4',
    'B4 -- no --> STOP', 'B4 -- yes --> B5',
    'B4 -. "what it holds" .-> G2',
    'B5 --> B6', 'B6 --> B7', 'B6 -. "left out" .-> G1',
    'B7 --> B8', 'B8 --> B9', 'B9 --> B10'
  ],
  links: { B1: 'bidmemory', B10: 'bidmemory', B3: 'bidwords', B5: 'bidtargets', B6: 'bidperiods', B7: 'bidreads', B8: 'bidfailed', G1: 'bidbreakeven', G2: 'bidmotion' },
  leaves: {
    bidmemory: 'Its memory',
    bidwords: "Its words, and Meta's method",
    bidtargets: 'The targets that hold',
    bidperiods: 'The real cost in each period',
    bidreads: 'The simulator and the shares',
    bidfailed: 'Its failed checks',
    bidbreakeven: { title: 'A break-even line', open: {
      q: 'The words say a campaign under break-even gets a proposed cut. The brief gives no break-even. Should code put one in the brief?',
      since: 'Nov 7',
      opts: [
        ['Yes: code writes a break-even line from the margin or the approved lead value, and says when neither is on file', true, 'The cut rule then rests on a number that code reads. A blank shows as a blank, not as a guess.'],
        ['No: Opus finds the margin or the lead value with its read tools', false, 'As today. Kogalla\'s answer found it on the strategy page, and Bull\'s found none.'],
        ['Take the break-even order out of the words until lead values are on file', false, 'It stops an order that the brief cannot support for most lead clients.']] } },
    bidmotion: { title: 'In motion in the brief', open: {
      q: 'The words say to read In motion first and wait on a test, a question or a fresh change. The brief holds only In motion\'s counts. Should it hold its lines?',
      since: 'Nov 7',
      opts: [
        ['Yes: the brief lists In motion\'s lines that name this campaign or the whole account', true, 'A freeze written only on a task then reaches the bids answer. The lines are short, and code already saves them.'],
        ['No: keep the counts, and Opus reads In motion\'s answer when a count is not zero', false, 'As today. The brief stays short, but the wait rests on an extra read by the model.']] } }
  },

  // Each slide belongs to one view: the part's own slides first, then one or more for each rule.
  deck: [
    { about: ['bidbrief'], kicker: 'From stored tables',
      head: 'The brief costs no model and no network, and the model reads the rest itself',
      visual: { type: 'flow', rows: [
        { title: 'Code reads', steps: [['Barbara\'s stored days', 'spend, conversions, clicks, share of searches', 'code'], ['The campaign map', 'type, status, its job', 'code'], ['Targets and open cases', '', 'code']], end: [['One brief, in pages of {bidPage} characters', '', 'code']] },
        { title: 'The model reads', steps: [['The simulator and the shares', 'one query each, as written', 'opus'], ['The bids check', 'run on Will\'s computer', 'will']], end: [['Any other read tool it needs', '', 'opus']] }] },
      vcap: 'Nothing in a brief is cut for length. A long brief reads in pages, and each page says how to read the next.' },
    { about: ['bidbrief'], kicker: 'What it leaves out',
      head: 'Four things the words ask for are not in the brief',
      visual: { type: 'gate', rows: [
        ['A break-even line', 'no margin and no lead value, but the words ask for a cut under break-even', 'stop'],
        ['In motion\'s lines', 'its summary only: counts, not its tests, words and changes', 'hold'],
        ['The hour of a teammate\'s change', 'its day only, but the words ask for a wait under {bidHours} hours', 'hold'],
        ['The simulator\'s numbers', 'a query to run, not its answer', 'hold']] },
      vcap: 'Two of these are questions for Will. The simulator is a query on purpose: no stored table holds it.' },

    { about: ['bidmemory'], kicker: 'Its memory',
      head: 'The brief opens with its last answer\'s test and ends with what is new since',
      visual: { type: 'card', title: 'Kogalla PMax, brief of Nov 7', fields: [
        ['It opens with', 'Your last answer, of 2026-11-01, said this would prove it wrong: PMax returns 167% or more from Oct 26 to Nov 8 ...'],
        ['Last answer', 'Nov 1, Problem: cut; the cut to $16 a day already waits on Will'],
        ['Will\'s mark', 'none yet'],
        ['New since then', '3 changes with no record of who, Nov 3 and Nov 4']], stamp: ['Test it first, from today\'s data', 'code'] },
      vcap: '"New since then" holds only the morning items that name the campaign and came after the last answer. With no answer yet, it reads the last {bidFresh} days.' },
    { about: ['bidwords'], kicker: 'Its words',
      head: 'Opus gets eight short orders, on top of the fixed rules',
      visual: { type: 'card', title: 'The words of Bid and budget', fields: [
        ['Verdict', 'Say keep, raise, cut or too few to tell.'],
        ['Cost', 'Give the real cost on the main conversion for each period of each target.'],
        ['A raise', 'Price a raise per added conversion from Google\'s simulator, beside the target.'],
        ['Held back', 'Say if rank or budget holds it back.'],
        ['More or less', 'Say what a set amount more or less would buy; the split between campaigns is Decide\'s.'],
        ['Break-even', 'A campaign under break-even gets a proposed cut.'],
        ['Cap', 'Unused cap is not money at stake.'],
        ['Wait', 'Read In motion first: a setting with a test, an open question or a teammate\'s change under {bidHours} hours waits.']], stamp: ['Name the fix, and say what it waits on', 'opus'] },
      vcap: 'Each module\'s words come from what the runs of Oct 31 got wrong.' },
    { about: ['bidwords'], kicker: 'On Meta',
      head: 'Meta has no simulator, so a Meta campaign gets its own method',
      visual: { type: 'flow', rows: [
        { title: 'C2, Nov 2', steps: [['Its Meta campaign\'s brief', '2. MOFU/BOFU', 'code'], ['The words', 'price a raise from Google\'s simulator', 'opus']], end: [['Meta has none', 'now a test fails words that name Google with no Meta way', 'block']] },
        { title: 'Now, on a Meta campaign', steps: [['Price a raise', 'from its cost at each budget below', 'opus'], ['Size a budget change', 'daily budget times 7, never one day\'s spend', 'opus']], end: [['Budgets on ad sets; no purchase is zero return; a rising frequency buys repeats', '', 'opus']] }] },
      vcap: 'Meta\'s method follows the words on a Meta campaign.',
      quote: ['We are going to run this on very meta heavy accounts as well', 'Nov 2'] },
    { about: ['bidtargets'], kicker: 'The targets',
      head: 'Each target is one number with a scope and a kind, and the brief shows the most specific ones',
      visual: { type: 'card', title: 'AAFE\'s approved target rows', fields: [
        ['ROAS 300%, soft', 'on *DWa Nonbrand and *DWA - Dentists: a guide, not a stop point'],
        ['ROAS 200%, floor', 'on the same two: stay at or above it'],
        ['ROAS 527%, soft', 'on Google Ads: Barbara\'s rule, from the last 90 settled days'],
        ['$41,040 a month, hard', 'on Google Ads: a limit not to cross']], stamp: ['On Nonbrand, the campaign rows win over the Google row', 'code'] },
      vcap: 'The brief shows only rows in force: approved, not ended, and not moved in from the verifiers\' old file. The verifiers still judge by those moved rows.',
      quote: ['This is the hardest part of working with the clients. They often won\'t accept only one.', 'Oct 17'] },
    { about: ['bidtargets'], kicker: 'The head of the brief',
      head: 'The campaign\'s own job comes first, and with none the strategy page stands in',
      visual: { type: 'card', title: 'Bull Hedge Funds & PE, brief of Nov 7', fields: [
        ['The campaign', 'Search, enabled, non-brand'],
        ['Its job', 'none written: read its type and the strategy page'],
        ['The strategy page', 'its first {bidStrategy} characters'],
        ['Targets that hold', '$300 a lead and $5,800 a month on the whole account: guides, not stop points'],
        ['Open cases on it', '5, from negatives to a sitelink that drops the click id']], stamp: ['Read before the numbers', 'code'] },
      vcap: 'Will\'s rule for several targets lives in the playbook: weigh every target that a change touches. A bids proposal still has one effect line.' },
    { about: ['bidperiods'], kicker: 'Each period',
      head: 'The real cost starts again at each change of target or strategy, on the account\'s own clock',
      visual: { type: 'bars', max: 1000, rows: [
        { label: 'Sep 5 to Oct 4: the 30 days before', parts: [[911.16, 'code', '$911.16, no lead']] },
        { label: 'Oct 6 to Oct 12: after a $20 click ceiling', parts: [[353.23, 'code', '$353.23, no lead']] },
        { label: 'Oct 14 to Oct 31: after the $15 manual bid', parts: [[766.12, 'block', '$766.12, no lead']] }] },
      vcap: 'Bull Hedge Funds & PE, brief of Nov 7. A change day belongs to neither side, as its own day mixes before and after. Periods read back {bidPeriod} days.' },
    { about: ['bidperiods'], kicker: 'A real fix · C2, Nov 4',
      head: 'The $7 cap of Oct 30 showed why a change day is neither before nor after',
      visual: { type: 'timeline', items: [
        ['Oct 30, 2:50 PM PT', 'Isaac sets a $7 cap on LA + New York. $130.72 of that day\'s spend came before it.'],
        ['Nov 4, the old brief', '"Oct 30 to Nov 3, after" the cap: $669.02, with all of Oct 30 and a Nov 3 that still moved at Google.'],
        ['Now', 'After starts on Oct 31, the next full day on the account\'s clock, and ends on the last settled day.'],
        ['The 30 days before', 'Sep 30 to Oct 29: they end the day before the change.']] },
      vcap: 'On Google a budget change starts no new period. On Meta it does, as the budget is the lever there.' },
    { about: ['bidreads'], kicker: 'Reads no table holds',
      head: 'The brief hands Opus each read as a query to run, not as its answer',
      visual: { type: 'flow', rows: [
        { title: 'Google', steps: [['The simulator', 'points for target CPA, target ROAS, budget, CPC bid, impression share', 'code'], ['The shares, 30 days', 'lost to rank, lost to budget, top of page', 'code']], end: [['Opus runs each as written', '', 'opus']] },
        { title: 'Meta', steps: [['The campaign\'s own budget', '', 'code'], ['Each ad set\'s budget and bid', '', 'code'], ['90 days by week, with frequency', '', 'code']], end: [['Money in cents, but spend in whole units', '', 'wait']] },
        { title: 'Microsoft', steps: [['Campaign results, 30 days', 'share lost to budget and to rank', 'code']], end: [['Checked by Chad only: no login reached Microsoft', '', 'next']] }] },
      vcap: 'Google took every query on KDX and ETD on Oct 31. C2\'s Meta campaign held a $20 budget on the campaign, which no ad set read shows.' },
    { about: ['bidreads'], kicker: 'A real simulator read · C2, Nov 1',
      head: 'Each added conversion would cost $1,738, three and a half times the guide',
      visual: { type: 'bars', max: 2000, rows: [
        { label: 'The $500 guide, a soft target', parts: [[500, 'will', '$500']] },
        { label: 'Each added conversion, $6.23 to $10 a day', parts: [[889, 'wait', '$889']] },
        { label: 'Each added conversion, $10 to $199.31 a day', parts: [[1738, 'block', '$1,738']] }] },
      vcap: 'Answer 53 ran the brief\'s simulator query on C2\'s Competitor campaign, for the week of Oct 19 to 25. Its counted clicks ran ahead of the real ones, so only its shape counts.',
      stats: [['44.9%', 'of searches lost to budget, last 30 days', 'real'], ['16.6%', 'of searches lost to rank', 'real']] },
    { about: ['bidfailed'], kicker: 'Its failed checks',
      head: 'The brief lists the newest stored result of each bids goal: the campaign\'s own first, then the account\'s',
      visual: { type: 'card', title: 'Bull Hedge Funds & PE, brief of Nov 7', fields: [
        ['Its own', 'No failed check names this campaign.'],
        ['The account\'s', 'Each bid strategy has enough data to work (Nov 2, failed)'],
        ['The account\'s', 'Targets are realistic against the real results (Nov 2, failed)'],
        ['Could not check', 'Brand clicks are not overpaid'],
        ['Answer each', 'say which part of it, if any, is this campaign\'s']], stamp: ['The newest result of each goal, last {bidChecksDays} days', 'will'] },
      vcap: 'A result that names another campaign stays out, and so does one of another platform. Barbara\'s exam page reads the same results, so the two never disagree.' },
    { about: ['bidbreakeven'], kicker: 'A break-even line',
      head: 'The words ask for a cut under break-even, but code puts no break-even in the brief',
      visual: { type: 'flow', rows: [
        { title: 'Kogalla, Nov 1', steps: [['The strategy page', 'break-even is a 167% return at a 60% margin', 'code']], end: [['Opus judged PMax against it', 'a cut', 'opus']] },
        { title: 'Bull, Nov 1', steps: [['No margin, no lead value', 'the strategy page names none', 'code']], end: [['Opus: only the firm\'s signed clients would set a real break-even', '', 'wait']] }] },
      vcap: 'Money\'s answer lists the margin, but the bids brief takes only Money\'s summary.',
      open: 'bidbreakeven' },
    { about: ['bidmotion'], kicker: 'In motion in the brief',
      head: 'The words say "Read In motion first", but the brief holds only In motion\'s counts',
      visual: { type: 'card', title: 'In motion, as the bids brief shows it (Bull, Nov 7)', fields: [
        ['Its line', '0 tests run, 19 questions wait on a person, 18 people\'s changes and 0 follow-ups are due.'],
        ['Also in the brief', 'the open cases on this campaign, and its changes of {bidChanges} days, by day'],
        ['Not in the brief', 'a teammate\'s word on an open task, a follow-up\'s due day, the hour of a change']], stamp: ['Counts only', 'wait'] },
      vcap: 'Bull, Nov 1: Yasir froze all bids and budgets on Oct 28, only in the comments of two tasks. In motion now lists such words, and the bids brief shows only their count.',
      open: 'bidmotion' }
  ],

  examples: {
    B1: { tag: 'real', rows: [{ steps: [['Bull Hedge Funds & PE', 'Nov 7', 'code'], ['The first lines', 'its Nov 1 answer\'s test', 'code']], end: [['"Test it first, from today\'s data"', '', 'code']] }], note: 'Bull\'s bids brief of Nov 7. The test names the firm\'s leads, searches lost to budget at the $15 bid, a simulator point near $300, and the Nov 11 read.' },
    B2: { tag: 'real', rows: [{ steps: [['Every model module', '', 'code'], ['The fixed rules', 'change nothing, write only the answer, test each number at its source', 'code']], end: [['The answer\'s fields, in words', '', 'code']] }], note: 'The same in each bids brief read on Nov 7 (Bull, Kogalla).' },
    B3: { tag: 'real', rows: [{ steps: [['Kogalla PMax', 'a Google campaign', 'code'], ['Its words', 'the eight orders, with no Meta method', 'code']], end: [['Opus reads them', '', 'opus']] }], note: 'Kogalla\'s bids brief of Nov 7. Its Meta campaign would add Meta\'s method.' },
    B4: { tag: 'real', rows: [{ steps: [['Bull, Nov 7', 'the four answers of Nov 1', 'code'], ['Fresh?', 'yes, for one more day', 'code']], end: [['The brief goes on', '', 'code']] }], note: 'Bull\'s bids briefs of Nov 7.' },
    STOP: { tag: 'made', rows: [{ steps: [['A need older than {bidFresh} days', '', 'code'], ['WAIT', 'say which answer is missing', 'code']], end: [['No numbers, no test', '', 'code']] }], note: 'Made: the brief ends after the WAIT line, and the last answer\'s test is left out too.' },
    G2: { tag: 'real', rows: [{ steps: [['In motion, Bull, Nov 1', '', 'code'], ['The bids brief', 'its summary only', 'code']], end: [['"0 tests run, 19 questions wait on a person ..."', '', 'wait']] }], note: 'Bull\'s bids briefs of Nov 7.' },
    B5: { tag: 'real', rows: [{ steps: [['Bull Hedge Funds & PE', '', 'code'], ['The head', 'no job written; the strategy page; 2 targets; 5 open cases', 'code']], end: [['Opus reads its job first', '', 'opus']] }], note: 'Bull\'s bids brief of Nov 7.' },
    B6: { tag: 'real', rows: [{ steps: [['Bull Hedge Funds & PE', '', 'code'], ['Three periods', 'each one with no lead', 'code']], end: [['{bidWeeks} weeks, and {bidShown} of its 24 changes', '', 'code']] }], note: 'Bull\'s bids brief of Nov 7: "And 16 older changes."' },
    G1: { tag: 'real', rows: [{ steps: [['Bull', 'no margin and no lead value on file', 'code'], ['The bids brief', 'no break-even line', 'code']], end: [['Opus: a real break-even needs the firm\'s signed clients', '', 'wait']] }], note: 'Bull Securities: its answer of Nov 1, as its brief of Nov 7 shows it.' },
    B7: { tag: 'real', rows: [{ steps: [['C2 Competitor', 'the simulator query, run as written', 'opus'], ['Budget points', '$6.23, $10 and $199.31 a day', 'code']], end: [['$1,738 for each added conversion', '', 'block']] }], note: 'C2, Nov 1: answer 53.' },
    B8: { tag: 'real', rows: [{ steps: [['Bull Hedge Funds & PE', '', 'code'], ['Its failed checks', 'none of its own; 2 of the account\'s', 'will']], end: [['Answer each: which part is this campaign\'s?', '', 'opus']] }], note: 'Bull\'s bids brief of Nov 7.' },
    B9: { tag: 'real', rows: [{ steps: [['Bull Hedge Funds & PE', '', 'code'], ['Its check command', 'the bids check, with the client and the campaign', 'will']], end: [['Then act cases push', '', 'code']] }], note: 'Bull\'s bids brief of Nov 7.' },
    B10: { tag: 'real', rows: [{ steps: [['Kogalla PMax', 'Nov 7', 'code'], ['Its memory', 'Nov 1, a problem; 3 changes since', 'code']], end: [['New since then', 'changes with no record of who', 'code']] }], note: 'Kogalla\'s bids brief of Nov 7.' }
  },

  reviewed: { self: '02713076', above: '142877dc', on: '2026-11-07' }
});
